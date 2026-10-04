import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

// Fade + rise on scroll. Hidden state only applies when JS runs (see index.css),
// so prerendered content stays visible to crawlers. `delay` (ms) staggers items.
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
