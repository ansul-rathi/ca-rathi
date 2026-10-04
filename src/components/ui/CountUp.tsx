import { useEffect, useRef, useState } from 'react'

// Count-up that starts when scrolled into view. Server/initial render shows the
// final value so crawlers and no-JS users always see the real number.
export function CountUp({
  end,
  suffix = '',
  duration = 1400,
  animate = true,
  className = '',
}: {
  end: number
  suffix?: string
  duration?: number
  animate?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(end)

  useEffect(() => {
    const el = ref.current
    if (!el || !animate) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          setValue(Math.round((1 - Math.pow(1 - p, 3)) * end))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration, animate])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
