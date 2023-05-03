import * as React from 'react'

type Translate = (dx: number, dy: number) => void
type StartEvent = { pageX: number, pageY: number }

export function useDrag(translate: Translate) {
  return {
    start(e: StartEvent) {
      let previous = { x: e.pageX, y: e.pageY }

      function move(moveEvent: PointerEvent) {
        const dx = moveEvent.pageX - previous.x
        const dy = moveEvent.pageY - previous.y

        previous = { x: moveEvent.pageX, y: moveEvent.pageY }

        translate(dx, dy)
      }
      function up() {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
      }

      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    }
  }
}

export function useNoDrag(ref: React.MutableRefObject<HTMLElement | null>, disabled?: boolean) {
  React.useEffect(() => {
    const handleClick = (e: PointerEvent) => !disabled && e.stopPropagation()
    const el = ref.current

    el?.addEventListener('pointerdown', handleClick)

    return () => {
      el?.removeEventListener('pointerdown', handleClick)
    }
  }, [ref, disabled])
}

export function NoDrag(props: { children: React.ReactNode, disabled?: boolean }) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  useNoDrag(ref, props.disabled)

  return <span ref={ref}>{props.children}</span>
}
