import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingOverlay } from '../LoadingOverlay'

const MIN_VISIBLE_MS = 350

/**
 * Shows a global loader on route changes. Uses useLocation only so it works
 * with BrowserRouter (useNavigation requires a data router).
 */
export function RouteTransitionLoader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setVisible(true)
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
    }
    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
    }, MIN_VISIBLE_MS)

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
    }
  }, [location.pathname, location.search, location.key])

  if (!visible) {
    return null
  }

  return <LoadingOverlay />
}
