import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

type DebouncFunc = (() => void) & { cancel(): void }

export function useDebounce(cb: () => void, timeout: number): [null | DebouncFunc, () => void] {
    const ref = useRef<DebouncFunc>()
    const [func, setFunc] = useState<null | DebouncFunc>(null)

    function cancel() {
        ref.current && ref.current.cancel()
    }

    useEffect(() => {
        const debounceCallback = debounce(cb, timeout)

        cancel()
        ref.current = debounceCallback
        setFunc(() => debounceCallback)
    }, [cb, timeout])
    useEffect(() => cancel, [])

    return [
        func,
        cancel
    ]
}
