import * as React from 'react'
import { classicConnectionPath } from 'rete-render-utils'
import styled from 'styled-components'

import { ClassicScheme } from '../../../types'
import { useConnection } from './ConnectionWrapper'

const Svg = styled.svg`
    overflow: visible !important;
    position: absolute;
    pointer-events: none;
    width: 9999px;
    height: 9999px;
    > * {
        pointer-events: all;
    }
`

const Path = styled.path`
    fill: none;
    stroke-width: 5px;
    stroke: steelblue;
`

export function Connection(_props: { data: ClassicScheme['Connection'] }) {
    const { start, end } = useConnection()

    return start && end && (
        <Svg>
            <Path d={classicConnectionPath([start.x, start.y, end.x, end.y], 0.3)} />
        </Svg>
    )
}
