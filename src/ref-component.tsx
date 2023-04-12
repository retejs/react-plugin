import * as React from 'react'

type Init = (ref: HTMLElement) => void

export function RefComponent<Props extends { init: Init, unmount: Init, className: string }>({ init, unmount, ...props }: Props) {
  const r = React.useRef<HTMLSpanElement | null>()

  return <span {...props} ref={ref => {
    if (r.current) {
      unmount(r.current)
    }
    if (ref) {
      r.current = ref
      init(ref)
    }
  }}/>
}
