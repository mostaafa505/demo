import { useRef } from 'react'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'

/** Counts up once when it scrolls into view. */
export function Counter({ to, prefix = '', suffix = '', separator = ',', className = '' }: { to: number; prefix?: string; suffix?: string; separator?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const format = (n: number) => `${prefix}${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}${suffix}`

  useGSAP(() => {
    const el = ref.current!
    if (!window.matchMedia(MOTION_OK).matches) return
    const state = { n: 0 }
    el.textContent = format(0)
    gsap.to(state, {
      n: to,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: () => {
        el.textContent = format(state.n)
      },
    })
  })

  return (
    <span dir="ltr" className={`tabular-nums ${className}`}>
      <span ref={ref} aria-hidden="true">
        {format(to)}
      </span>
      <span className="sr-only">{format(to)}</span>
    </span>
  )
}
