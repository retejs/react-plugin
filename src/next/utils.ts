import { useEffect } from 'react'

export function Root({ children, rendered }: { children: JSX.Element | null, rendered: () => void }) {
    useEffect(() => {
        rendered()
    })

    return children
}
