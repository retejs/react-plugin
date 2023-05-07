import * as React from 'react'
import { BaseSchemes, CanAssignSignal, Scope } from 'rete'

import { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import { Position, RenderSignal } from './types'
import { Root } from './utils'

export * as Presets from './presets'
export type { ClassicScheme, ReactArea2D, RenderEmit } from './presets/classic'
export { RefComponent } from './ref-component'
export * from './shared'
export * from './types'
export { useRete } from './utils'

type Produces<Schemes extends BaseSchemes> =
| { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

type Requires<Schemes extends BaseSchemes> =
  | RenderSignal<'node', { payload: Schemes['Node'] }>
  | RenderSignal<'connection', { payload: Schemes['Connection'], start?: Position, end?: Position }>
  | { type: 'unmount', data: { element: HTMLElement } }

type Props = {
  createRoot?: (container: Element | DocumentFragment) => any
}

export class ReactRenderPlugin<Schemes extends BaseSchemes, T = Requires<Schemes>> extends Scope<Produces<Schemes>, [Requires<Schemes> | T]> {
  renderer: Renderer
  presets: RenderPreset<Schemes, T>[] = []

  constructor(props?: Props) {
    super('react-render')
    this.renderer = getRenderer({ createRoot: props?.createRoot })

    this.addPipe(context => {
      if (!context || typeof context !== 'object' || !('type' in context)) return context
      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true
            }
          } as typeof context
        }
      }

      return context
    })
  }

  setParent(scope: Scope<Requires<Schemes> | T>): void {
    super.setParent(scope)

    this.presets.forEach(preset => {
      if (preset.attach) preset.attach(this)
    })
  }

  private mount(element: HTMLElement, context: Requires<Schemes>) {
    const parent = this.parentScope()

    for (const preset of this.presets) {
      const result = preset.render(context as any, this)

      if (!result) continue

      const reactElement = (
        <Root rendered={() => parent.emit({ type: 'rendered', data: context.data } as T)}>
          {result}
        </Root>
      )

      this.renderer.mount(reactElement, element)
      return true
    }
  }

  private unmount(element: HTMLElement) {
    this.renderer.unmount(element)
  }

  public addPreset<K>(preset: RenderPreset<Schemes, CanAssignSignal<T, K> extends true ? K : 'Cannot apply preset. Provided signals are not compatible'>) {
    const local = preset as RenderPreset<Schemes, T>

    if (local.attach) local.attach(this)
    this.presets.push(local)
  }
}
