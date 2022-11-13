import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { Position } from '../../../types'

export type ConnectionContextValue = { start: Position | null, end: Position | null }

export const ConnectionContext = createContext<ConnectionContextValue>({ start: null, end: null })

type PositionWatcher = (cb: (value: Position) => void) => (() => void)

type Props = { children: JSX.Element, start: Position | PositionWatcher, end: Position | PositionWatcher }

export function ConnectionWrapper(props: Props) {
    const { children } = props
    const [start, setStart] = useState<Position | null>(null)
    const [end, setEnd] = useState<Position| null>(null)

    useEffect(() => {
        const unwatch1 = typeof props.start === 'function' && props.start(setStart)
        const unwatch2 = typeof props.end === 'function' && props.end(setEnd)

        return () => {
            unwatch1 && unwatch1()
            unwatch2 && unwatch2()
        }
    }, [])

    return (
        <ConnectionContext.Provider value={{
            start: 'x' in props.start ? props.start : start,
            end: 'x' in props.end ? props.end : end
        }}>
            {children}
        </ConnectionContext.Provider>
    )
}

export function useConnection() {
    return useContext(ConnectionContext)
}
