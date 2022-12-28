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

const Path = styled.path`
    fill: none;
    stroke-width: 5px;
    stroke: steelblue;
    pointer-events: auto;
`

export function Connection(props: { data: ClassicScheme['Connection'] & { isLoop?: boolean } }) {
    const { start, end } = useConnection()
    const points = start && end && [start.x, start.y, end.x, end.y]
    const curvature = 0.3

    return points && (
        <Svg>
            <Path d={props.data.isLoop
                ? loopConnectionPath(points, curvature, 120)
                : classicConnectionPath(points, curvature)
            } />
        </Svg>
    )
}
