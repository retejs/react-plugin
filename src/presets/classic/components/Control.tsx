import * as React from 'react'
import { ClassicPreset } from 'rete'
import styled from 'styled-components'

const Input = styled.input<{ styles?: (props: any) => any }>`
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  box-sizing: border-box;
  ${props => props.styles && props.styles(props)}
`

export function Control<N extends 'text' | 'number', T extends ClassicPreset.InputControl<N>>(props: { data: T, styles?: () => any }) {
  const [value, setValue] = React.useState(props.data.value)

  React.useEffect(() => {
    setValue(props.data.value)
  }, [props.data.value])

  return (
    <Input
      value={value}
      type={props.data.type}
      onPointerDown={e => e.stopPropagation()}
      readOnly={props.data.readonly}
      onChange={e => {
        const val = (props.data.type === 'number'
          ? +e.target.value
          : e.target.value) as T['value']

        setValue(val)
        props.data.setValue(val)
      }}
      styles={props.styles}
    />
  )
}
