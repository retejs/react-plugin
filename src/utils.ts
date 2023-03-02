import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

export function Root({ children, rendered }: { children: JSX.Element | null, rendered: () => void }) {
  useEffect(() => {
    rendered()
  })

  return children
}

export function syncFlush() {
  const ready = useRef(false)

  useEffect(() => {
    ready.current = true
  }, [])

  return {
    apply(f: () => void) {
      if (ready.current) {
        try {
          flushSync(f)
        } catch (error) {
          const message = error ? (error as Error).message : null

          if (message && (
            message.includes('flushSync was called from inside a lifecycle method')
            || message.includes('React error #187')
          )) return
          throw error
        }
      } else {
        f()
      }
    }
  }
}
