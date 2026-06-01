import { useEffect, useState } from 'react'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

export function useCountdown(targetDate: Date | null): Countdown {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  })

  useEffect(() => {
    if (!targetDate) return

    const tick = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true })
        return
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return countdown
}
