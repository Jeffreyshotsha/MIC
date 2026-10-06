import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { cn } from '../../lib/utils.js'

/** Counts up to `value` when scrolled into view. */
export function Counter({ value, duration = 1800, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  // Values that are not plain numbers (dates like 26/09/2023) are shown as-is.
  const numeric = /^\d+$/.test(String(value).trim())
  const target = numeric ? Number(value) : 0

  useEffect(() => {
    if (!inView || !numeric) return undefined

    let frame
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, numeric, target, duration])

  return (
    <span ref={ref} className={className}>
      {numeric ? display : value}
    </span>
  )
}

/** Marquee strip (infinite horizontal scroll). */
export function Marquee({ children, className, speed = 40 }) {
  return (
    <div className={cn('pause-on-hover relative overflow-hidden', className)}>
      <div
        className="animate-marquee flex w-max"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}

/** Animated word rotator (used in the hero). */
export function TypewriterWords({ words, className, interval = 2600 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={cn('relative inline-grid', className)}>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            'col-start-1 row-start-1 transition-all duration-500',
            i === index
              ? 'translate-y-0 opacity-100 blur-0'
              : 'pointer-events-none absolute translate-y-3 opacity-0 blur-sm'
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}