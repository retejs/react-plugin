import * as React from 'react'

type RefUpdate = (ref: HTMLElement) => void
type BaseProps = { init: RefUpdate, unmount: RefUpdate } & Record<string, unknown>

export function RefComponent<Props extends BaseProps>({ init, unmount, ...props }: Props) {
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
