import * as React from 'react'
import { ClassicPreset } from 'rete'
import { AreaPlugin } from 'rete-area-plugin'
import { SocketPositionWatcher, useDOMSocketPosition } from 'rete-render-utils'

import { ClassicScheme, ExtractPayload, ReactArea2D } from '../../types'
import { RenderPreset } from '../types'
import { Connection } from './components/Connection'
import { ConnectionWrapper } from './components/ConnectionWrapper'
import { Control } from './components/Control'
import { Node } from './components/Node'
import { Socket } from './components/Socket'

export { Connection } from './components/Connection'
export { Control } from './components/Control'
export { Node } from './components/Node'
export { Socket } from './components/Socket'

type CustomizationProps <Schemes extends ClassicScheme>= {
    node?: (data: ExtractPayload<Schemes, 'node'>) => typeof Node | null
    connection?: (data: ExtractPayload<Schemes, 'connection'>) => typeof Connection | null
    socket?: (data: ExtractPayload<Schemes, 'socket'>) => typeof Socket | null
    control?: <N extends ClassicPreset.Control>(data: ExtractPayload<Schemes, 'control'>)
        => ((props: { data: N }) => React.ReactElement<{ data: N }>) | null
}

type ClasssicProps<Schemes extends ClassicScheme> = (
  | { socketPositionWatcher: SocketPositionWatcher }
  | { area: AreaPlugin<Schemes, ReactArea2D<Schemes>> }
) & {
    customize?: CustomizationProps<Schemes>
}

export function setup<Schemes extends ClassicScheme>(
    props: ClasssicProps<Schemes>
): RenderPreset<Schemes, ReactArea2D<Schemes>> {
    const positionWatcher = 'socketPositionWatcher' in props
        ? props.socketPositionWatcher
        : useDOMSocketPosition(props.area)
    const { node, connection, socket, control } = props.customize || {}

    return {
        // eslint-disable-next-line max-statements
        render(context, plugin) {
            if (context.data.type === 'node') {
                const Component = node ? node(context.data) : Node

                return (Component &&
                    <Component
                        data={context.data.payload}
                        emit={data => plugin.getParentScope().emit(data)}
                    />
                )
            } else if (context.data.type === 'connection') {
                const Component = connection ? connection(context.data) : Connection
                const { sourceOutput, targetInput, source, target } = context.data.payload
                const { start, end } = context.data

                return (Component &&
                    <ConnectionWrapper
                        start={start || (change => positionWatcher(source, 'output', sourceOutput, change))}
                        end={end || (change => positionWatcher(target, 'input', targetInput, change))}
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
