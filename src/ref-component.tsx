import * as React from 'react'

type Init = (ref: HTMLElement) => void

export function RefComponent<Props extends { init: Init, className: string }>({ init, ...props }: Props) {
  return <span {...props} ref={ref => {
    if (ref) {
      // console.log('ref', ref)
      init(ref)
    }
  }}/>
}
