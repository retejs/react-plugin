import * as React from 'react'
import styled from 'styled-components'
import { useElementSize } from 'usehooks-ts'

import { Rect, Translate } from '../types'
import { px } from '../utils'
import { MiniNode } from './MiniNode'
import { MiniViewport } from './MiniViewport'

const Styles = styled.div<{ size: number }>`
    position: absolute;
    right: 24px;
    bottom: 24px;
    background: rgba(229, 234, 239, 0.65);
    padding: 20px;
    overflow: hidden;
    border: 1px solid #b1b7ff;
    border-radius: 8px;
    box-sizing: border-box;
`

export function Minimap(props: { size: number, ratio: number, nodes: Rect[], viewport: any, translate: Translate }) {
    const [containerRef, { width: containerWidth }] = useElementSize()
    const scale = (v: number) => v * containerWidth

    return <Styles
        size={props.size}
        style={{
            width: px(props.size * props.ratio),
            height: px(props.size)
        }}
        onPointerDown={e => {
            e.stopPropagation()
            e.preventDefault()
        }}
        ref={containerRef}
    >
        {containerWidth && props.nodes.map((node, i) => (
            <MiniNode
                key={i}
                left={scale(node.left)}
                top={scale(node.top)}
                width={scale(node.width)}
                height={scale(node.height)}
            />
        ))}
        <MiniViewport
            {...props.viewport}
            containerWidth={containerWidth}
            translate={props.translate}
        />
    </Styles>
}
