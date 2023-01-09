import * as React from 'react'
import { classicConnectionPath, loopConnectionPath } from 'rete-render-utils'
import styled from 'styled-components'

import { ClassicScheme } from '../../../types'
import { useConnection } from './ConnectionWrapper'

const Svg = styled.svg`
    overflow: visible !important;
    position: absolute;
    pointer-events: none;
    width: 9999px;
    height: 9999px;
`

const Path = styled.path<{ styles?: (props: any) => any }>`
    fill: none;
    stroke-width: 5px;
    stroke: steelblue;
    pointer-events: auto;
    ${props => props.styles && props.styles(props)}
`

export function Connection(props: { data: ClassicScheme['Connection'] & { isLoop?: boolean }, styles?: () => any }) {
    const { start, end } = useConnection()
    const points = start && end && [start.x, start.y, end.x, end.y]
    const curvature = 0.3

    return points && (
        <Svg>
            <Path
                styles={props.styles}
                d={props.data.isLoop
                    ? loopConnectionPath(points, curvature, 120)
                    : classicConnectionPath(points, curvature)
                } />
        </Svg>
    )
}
