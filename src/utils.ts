import { useEffect } from 'react'
import { flushSync } from 'react-dom'

export function Root({ children, rendered }: { children: JSX.Element | null, rendered: () => void }) {
  useEffect(() => {
    rendered()
  })

  return children
}

export function syncFlush() {
  let ready = false

  return {
    apply(f: () => void) {
      if (ready) {
        try {
          flushSync(f)
        } catch (error) {
          if (error && (error as Error).message.includes('flushSync was called from inside a lifecycle method')) return
          throw error
        }
      } else {
        f()
      }
    },
    ready() {
      setTimeout(() => {
        ready = true
      }, 0)
    }
  }
}
