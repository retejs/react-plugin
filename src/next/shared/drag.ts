type Translate<T> = (dx: number, dy: number, initial: T) => void
type StartEvent = { pageX: number, pageY: number }

export function useDrag<T>(getInitial: () => T, translate: Translate<T>) {
    return {
        start(e: StartEvent) {
            const start= { x: e.pageX, y: e.pageY }
            const initial = getInitial()

            function move(moveEvent: PointerEvent) {
                const dx = start.x - moveEvent.pageX
                const dy = start.y - moveEvent.pageY

                translate(dx, dy, initial)
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
