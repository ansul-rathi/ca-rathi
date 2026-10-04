import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll on route change (or scrolls to #hash), skipping the first load.
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}
