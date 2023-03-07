import * as React from 'react'
import styled, { css } from 'styled-components'

import { RefComponent } from '../../../ref-component'
import { ClassicScheme, GetControls, GetSockets, RenderEmit } from '../../../types'
import { $nodecolor, $nodecolorselected, $nodewidth, $socketmargin, $socketsize } from '../vars'

type NodeExtraData = { width?: number, height?: number }

export const NodeStyles = styled.div<NodeExtraData & { selected: boolean, styles?: (props: any) => any }>`
    background: ${$nodecolor};
    border: 2px solid #4e58bf;
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
    width: ${props => Number.isFinite(props.width) ? `${props.width}px` : `${$nodewidth}px`};
    height: ${props => Number.isFinite(props.height) ? `${props.height}px` : 'auto'};
    padding-bottom: 6px;
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
    ${props => props.styles && props.styles(props)}
`

function sortByIndex<T extends [string, undefined | { index?: number }][]>(entries: T) {
  entries.sort((a, b) => {
    const ai = a[1]?.index || 0
    const bi = b[1]?.index || 0

    return ai - bi
  })
}

type Props<S extends ClassicScheme> = {
    data: S['Node'] & NodeExtraData
    styles?: () => any
    emit: RenderEmit<S>
}
export type NodeComponent<Scheme extends ClassicScheme> = (props: Props<Scheme>) => JSX.Element

// eslint-disable-next-line max-statements
export function Node<Scheme extends ClassicScheme>(props: Props<Scheme>) {
  const inputs = Object.entries(props.data.inputs)
  const outputs = Object.entries(props.data.outputs)
  const controls = Object.entries(props.data.controls)
  const selected = props.data.selected || false
  const { id, label, width, height } = props.data

  sortByIndex(inputs)
  sortByIndex(outputs)
  sortByIndex(controls)

  return (
    <NodeStyles
      selected={selected}
      width={width}
      height={height}
      styles={props.styles}
      data-testid="node"
    >
      <div className="title" data-testid="title">{label}</div>
      {/* Outputs */}
      {outputs.map(([key, output]) => (
        output && <div className="output" key={key} data-testid={`output-${key}`}>
          <div
            className="output-title"
            data-testid="output-title"
          >{output?.label}</div>
          <RefComponent
            className='output-socket'
            init={ref => props.emit({ type: 'render', data: {
              type: 'socket',
              side: 'output',
              key: key,
              nodeId: id,
              element: ref,
              payload: output.socket as GetSockets<Scheme['Node']>
            } })}
            data-testid="output-socket"
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
            payload: control as GetControls<Scheme['Node']>
          } })}
          data-testid={`control-${key}`}
        />
      })}
      {/* Inputs */}
      {inputs.map(([key, input]) => (
        input && <div className="input" key={key} data-testid={`input-${key}`}>
          <RefComponent
            className='input-socket'
            init={ref => props.emit({ type: 'render', data: {
              type: 'socket',
              side: 'input',
              key: key,
              nodeId: id,
              element: ref,
              payload: input.socket as GetSockets<Scheme['Node']>
            } })}
            data-testid="input-socket"
          />
          {input && (!input.control || !input.showControl) && <div
            className="input-title"
            data-testid="input-title"
          >{input?.label}</div>}
          {input?.control && input?.showControl && <span className="input-control">
            <RefComponent
              className='input-control' key={key}
              init={ref => input.control && props.emit({ type: 'render', data: {
                type: 'control',
                element: ref,
                payload: input.control as GetControls<Scheme['Node']>
              } })}
              data-testid="input-control"
            />
          </span>
          }
        </div>
      ))}
    </NodeStyles>
  )
}