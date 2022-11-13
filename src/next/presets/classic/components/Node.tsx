import * as React from 'react'
import { ClassicPreset } from 'rete'
import styled, { css } from 'styled-components'

import { RefComponent } from '../../../ref-component'
import { ClassicScheme, RenderEmit } from '../../../types'
import { $nodecolor, $nodecolorselected, $nodewidth, $socketmargin, $socketsize } from '../vars'

const NodeStyles = styled.div<{ selected: boolean }>`
    background: ${$nodecolor};
    border: 2px solid #4e58bf;
    border-radius: 10px;
    cursor: pointer;
    min-width: ${$nodewidth}px;
    height: auto;
    padding-bottom: 6px;
    box-sizing: content-box;
    position: relative;
    user-select: none;
    &:hover {
        background: lighten(${$nodecolor},4%);
    }
    ${props => props.selected && css`
        background: ${$nodecolorselected};
        border-color: #e3c000;
    `}
    .title {
        color: white;
        font-family: sans-serif;
        font-size: 18px;
        padding: 8px;
    }
    .output {
        text-align: right;
    }
    .input {
        text-align: left;
    }
    .output-socket {
        text-align: right;
        margin-right: -${$socketsize / 2 + $socketmargin}px;
        display: inline-block;
    }
    .input-socket {
        text-align: left;
        margin-left: -${$socketsize / 2 + $socketmargin}px;
        display: inline-block;
    }
    .input-title,.output-title {
        vertical-align: middle;
        color: white;
        display: inline-block;
        font-family: sans-serif;
        font-size: 14px;
        margin: ${$socketmargin}px;
        line-height: ${$socketsize}px;
    }
    .input-control {
        z-index: 1;
        width: calc(100% - ${$socketsize + 2 * $socketmargin}px);
        vertical-align: middle;
        display: inline-block;
    }
    .control {
        display: block;
        padding: ${$socketmargin}px ${$socketsize / 2 + $socketmargin}px;
    }
`

export function Node<Data extends ClassicPreset.Node>(props: { data: Data, emit: RenderEmit<ClassicScheme> }) {
    const inputs = Object.entries(props.data.inputs)
    const outputs = Object.entries(props.data.outputs)
    const controls = Object.entries(props.data.controls)
    const selected = props.data.selected || false

    return (
        <NodeStyles selected={selected}>
            <div className="title">{props.data.label}</div>
            {/* Outputs */}
            {outputs.map(([key, output]) => (
                output && <div className="output" key={key}>
                    <div className="output-title">{output?.label}</div>
                    <RefComponent
                        className='output-socket'
                        init={ref => props.emit({ type: 'render', data: {
                            type: 'socket',
                            side: 'output',
                            key: key,
                            nodeId: props.data.id,
                            element: ref,
                            payload: output.socket
                        } })}
                    />
                </div>
            ))}
            {/* Controls */}
            {controls.map(([key, control]) => {
                if (!control) return null
                return <RefComponent
                    className='control' key={key}
                    init={ref => props.emit({ type: 'render', data: {
                        type: 'control',
                        element: ref,
                        payload: control
                    } })}
                />
            })}
            {/* Inputs */}
            {inputs.map(([key, input]) => (
                input && <div className="input" key={key}>
                    <RefComponent
                        className='input-socket'
                        init={ref => props.emit({ type: 'render', data: {
                            type: 'socket',
                            side: 'input',
                            key: key,
                            nodeId: props.data.id,
                            element: ref,
                            payload: input.socket
                        } })}
                    />
                    {input && (!input.control || !input.showControl) && <div className="input-title">{input?.label}</div>}
                    {input?.control && input?.showControl && <span className="input-control">
                        <RefComponent
                            className='input-control' key={key}
                            init={ref => input.control && props.emit({ type: 'render', data: {
                                type: 'control',
                                element: ref,
                                payload: input.control
                            } })}
                        />
                    </span>
                    }
                </div>
            ))}
        </NodeStyles>
    )
}
