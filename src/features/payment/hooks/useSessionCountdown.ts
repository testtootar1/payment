import { useEffect, useState } from 'react'

const SESSION_DURATION_SECONDS = 15 * 60

export function useSessionCountdown(active: boolean): string {
  const [remainingSeconds, setRemainingSeconds] = useState(
    SESSION_DURATION_SECONDS,
  )

  useEffect(() => {
    if (!active) {
      return
    }

    setRemainingSeconds(SESSION_DURATION_SECONDS)

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1))
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [active])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
