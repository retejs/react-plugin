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
