import { flushSync } from 'react-dom'

/**
 * apply flushSync to setState hooks when ready (e.g. after lifecycle method is performed to prevent warning)
 */
export function syncSetter() {
    let ready = false

    return {
        apply<T extends any[]>(cb: (...args: T) => void) {

            return (...local: T) => {
                if (ready) {
                    flushSync(() => cb(...local))
                } else {
                    cb(...local)
                }
            }
        },
        ready() {
            ready = true
        }
    }
}
