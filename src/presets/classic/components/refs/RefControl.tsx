import * as React from 'react'
import { ClassicPreset } from 'rete'

import { RefComponent } from '../../../../ref-component'
import { ClassicScheme, GetControls, ReactArea2D } from '../../types'

type Props<Scheme extends ClassicScheme> = {
  name: string
  emit: (props: ReactArea2D<Scheme>) => void
  payload: ClassicPreset.Control
}

export function RefControl<Scheme extends ClassicScheme>({ name, emit, payload, ...props }: Props<Scheme>) {
  return <RefComponent
    {...props}
    className={name}
    init={ref => {
      emit({ type: 'render',
        data: {
          type: 'control',
          element: ref,
          payload: payload as GetControls<Scheme['Node']>
        } })
    }}
    unmount={ref => {
      emit({ type: 'unmount', data: { element: ref } })
    }}
  />
}
