import * as React from 'react'
import { CanAssignSignal, ClassicPreset } from 'rete'
import { AreaPlugin } from 'rete-area-plugin'
import { classicConnectionPath, loopConnectionPath, SocketPositionWatcher, useDOMSocketPosition } from 'rete-render-utils'

import { ClassicScheme, ExtractPayload, ExtraRender, Position, ReactArea2D, RenderPayload } from '../../types'
import { RenderPreset } from '../types'
import { Connection } from './components/Connection'
import { ConnectionWrapper } from './components/ConnectionWrapper'
import { Control } from './components/Control'
import { Node } from './components/Node'
import { Socket } from './components/Socket'

export { Connection } from './components/Connection'
export { useConnection } from './components/ConnectionWrapper'
export { Control } from './components/Control'
export { Node, NodeStyles } from './components/Node'
export { Socket } from './components/Socket'

type CustomizationProps <Schemes extends ClassicScheme>= {
    node?: (data: ExtractPayload<Schemes, 'node'>) => typeof Node | null
    connection?: (data: ExtractPayload<Schemes, 'connection'>) => typeof Connection | null
    socket?: (data: ExtractPayload<Schemes, 'socket'>) => typeof Socket | null
    control?: <N extends ClassicPreset.Control>(data: ExtractPayload<Schemes, 'control'>)
        => ((props: { data: N }) => React.ReactElement<{ data: N }>) | null
}

type IsCompatible<K> = Extract<K, { type: 'render' | 'rendered' }> extends { type: 'render' | 'rendered', data: infer P } ? CanAssignSignal<P, RenderPayload<ClassicScheme>> : false // TODO should add type: 'render' ??
type Substitute<K, Schemes extends ClassicScheme> = IsCompatible<K> extends true ? K : ReactArea2D<Schemes>

type ClasssicProps<Schemes extends ClassicScheme, K extends ExtraRender> = (
  | { socketPositionWatcher: SocketPositionWatcher }
  | { area: AreaPlugin<Schemes, Substitute<K, Schemes>> }
) & {
    customize?: CustomizationProps<Schemes>
}

export function setup<Schemes extends ClassicScheme, K extends ExtraRender>(
  props: ClasssicProps<Schemes, K>
): RenderPreset<Schemes, ReactArea2D<Schemes> | K> {
  const positionWatcher = 'socketPositionWatcher' in props
    ? props.socketPositionWatcher
    : useDOMSocketPosition(props.area as AreaPlugin<Schemes, ReactArea2D<Schemes>>)
  const { node, connection, socket, control } = props.customize || {}

  return {
    // eslint-disable-next-line max-statements, complexity
    render(context, plugin) {
      if (context.data.type === 'node') {
        const parent = plugin.parentScope()
        const Component = node ? node(context.data) : Node

        return (Component &&
                    <Component
                      data={context.data.payload}
                      emit={data => parent.emit(data as any)}
                    />
        )
      } else if (context.data.type === 'connection') {
        const Component = connection ? connection(context.data) : Connection
        const payload = context.data.payload
        const { sourceOutput, targetInput, source, target } = payload

        return (Component &&
                    <ConnectionWrapper
                      start={context.data.start || (change => positionWatcher(source, 'output', sourceOutput, change))}
                      end={context.data.end || (change => positionWatcher(target, 'input', targetInput, change))}
                      path={async (start, end) => {
                        const response = await plugin.emit({ type: 'connectionpath', data: { payload, points: [start, end] } })
                        const { path, points } = response.data
                        const curvature = 0.3

                        if (!path && points.length !== 2) throw new Error('cannot render connection with a custom number of points')
                        if (!path) return payload.isLoop
                          ? loopConnectionPath(points as [Position, Position], curvature, 120)
                          : classicConnectionPath(points as [Position, Position], curvature)

                        return path
                      }}
                    >
                      <Component data={context.data.payload} />
                    </ConnectionWrapper>
        )
      } else if (context.data.type === 'socket') {
        const Component = socket ? socket(context.data) : Socket

        return (Component && context.data.payload &&
                    <Component data={context.data.payload} />
        )
      } else if (context.data.type === 'control') {
        if (control && context.data.payload) {
          const Component = control(context.data)

          return Component && <Component data={context.data.payload} />
        }

        return context.data.payload instanceof ClassicPreset.InputControl
          ? <Control data={context.data.payload} />
          : null
      }
    }
  }
}
