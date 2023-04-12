import * as React from 'react'
import { BaseSchemes, Scope } from 'rete'
import { Area2DInherited } from 'rete-area-plugin'

import { RenderPreset } from './presets/types'
import { getRenderer, Renderer } from './renderer'
import { ExtraRender, Position } from './types'
import { Root } from './utils'

export * as Presets from './presets'
export { RefComponent } from './ref-component'
export * from './types'
export { useRete } from './utils'

type Produces<Schemes extends BaseSchemes> =
    | { type: 'connectionpath', data: { payload: Schemes['Connection'], path?: string, points: Position[] } }

type Props = {
    createRoot?: (container: Element | DocumentFragment) => any
}

export class ReactRenderPlugin<Schemes extends BaseSchemes, T extends ExtraRender = never> extends Scope<Produces<Schemes>, Area2DInherited<Schemes, T>> {
  renderer: Renderer
  presets: RenderPreset<Schemes, T>[] = []
  // buffer: ({ type: 'mount', priority: number, reactElement: any, element: any } | { type: 'unmount', element: any })[] = []

  constructor(props?: Props) {
    super('react-render')
    this.renderer = getRenderer({ createRoot: props?.createRoot })

    this.addPipe(context => {
      if (!('type' in context)) return context
      if (context.type === 'unmount') {
        this.unmount(context.data.element)
      } else if (context.type === 'render') {
        if ('filled' in context.data && context.data.filled) {
          return context
        }
        if (this.mount(context.data.element, context as Extract<T, { type: 'render' }>)) {
          return {
            ...context,
            data: {
              ...context.data,
              filled: true
            }
          }
        }
      }

      return context
    })

    // const frame = () => {
    //     this.buffer.sort((a, b) => {
    //         if (a.type !== 'mount' || b.type !== 'mount') return 0
    //         return a.priority - b.priority
    //     })

    //     while(this.buffer.length) {
    //         const item = this.buffer.shift()

    //         if (item?.type === 'mount') {
    //             if (this.buffer.find(n => n.element === item.element)) {
    //                 continue
    //             }
    //             this.renderer.mount(item.reactElement, item.element)
    //         } else if (item?.type === 'unmount') {
    //             this.renderer.unmount(item.element)
    //         }
    //     }
    //     requestAnimationFrame(() => frame())
    // }
    // frame()
  }

  private mount(element: HTMLElement, context: Extract<T, { type: 'render' }>) {
    const parent = this.parentScope()

    for (const preset of this.presets) {
      const result = preset.render(context, this)

      if (!result) continue

      const reactElement = (
        <Root rendered={() => parent.emit({ type: 'rendered', data: context.data })}>
          {result}
        </Root>
      )

      // requestAnimationFrame(() => // TODO stabilization
      this.renderer.mount(reactElement, element)
      // )
      // this.buffer.push({ type: 'mount', reactElement, element, priority: context.data.type === 'node' ? 1 : 0 })
      return true
    }
  }

  private unmount(element: HTMLElement) {
    // this.buffer.push({ type: 'unmount', element })
    // requestAnimationFrame(() => // TODO stabilization
    this.renderer.unmount(element)
    // )
  }

  public addPreset<K>(preset: RenderPreset<Schemes, K extends T ? K : T>) {
    this.presets.push(preset as RenderPreset<Schemes, T>)
  }
}
