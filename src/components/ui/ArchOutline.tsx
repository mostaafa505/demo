import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Gold hairline tracing a round-headed arch around its parent, measured in real
 * pixels so the stroke stays 1px and the draw-on animation covers the full line.
 */
export function ArchOutline({ offset = 12, className = '' }: { offset?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [box, setBox] = useState<{ w: number; h: number } | null>(null)

  useLayoutEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    const measure = () => setBox({ w: parent.clientWidth + offset * 2, h: parent.clientHeight + offset * 2 })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [offset])

  const w = box?.w ?? 0
  const h = box?.h ?? 0
  const r = w / 2
  const d = box ? `M0.5 ${h} V${r} A${r - 0.5} ${r - 0.5} 0 0 1 ${w - 0.5} ${r} V${h}` : ''

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w || 1} ${h || 1}`}
      className={`pointer-events-none absolute overflow-visible ${className}`}
      style={{ top: -offset, left: -offset }}
    >
      {box && <path data-arch-line d={d} fill="none" stroke="currentColor" strokeWidth="1" />}
    </svg>
  )
}
