import { useEffect } from 'react'

export function useClickOutSideElement(
  element: HTMLElement | null,
  handler: () => void,
  condition?: boolean
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!condition && element && !element.contains(event.target as Node)) {
        handler()
      }
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [element, handler, condition])
}
