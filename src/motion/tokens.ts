/**
 * Motion tokens — one vocabulary for the whole site.
 * Calm and assured: no bounce, no elastic, no glow.
 */
export const EASE_IN = 'power3.out' // entrances
export const EASE_LONG = 'power2.inOut' // long travels, opening/closing
export const DURATION = 0.9
export const STAGGER = 0.08
export const START = 'clamp(top 85%)' // clamp(): elements near the page end still trigger

/** False when the page was revealed without animation (inline fallback after a very slow load). */
export const animating = () => typeof document !== 'undefined' && document.documentElement.classList.contains('js-anim')

export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px)',
  desktop: '(min-width: 768px)',
} as const

/** Distances and durations for the current breakpoint (phones: shorter travel, 20% faster). */
export function scale(isMobile: boolean) {
  const k = isMobile ? 0.8 : 1
  return {
    y: isMobile ? 18 : 32,
    d: (seconds: number) => seconds * k,
  }
}

/** Inline-start/end as transform origins, so lines and wipes run right-to-left in Arabic. */
export function origins() {
  const rtl = document.documentElement.dir === 'rtl'
  return {
    start: rtl ? '100% 50%' : '0% 50%', // grows from the reading start
    end: rtl ? '0% 50%' : '100% 50%',
    rtl,
  }
}

/**
 * Props to clear once an entrance has finished, so CSS hover transforms take over cleanly.
 * Opacity/visibility/clip-path are left inline on purpose: their CSS initial state is "hidden".
 */
export const CLEAR = 'transform,translate,scale,rotate,willChange'
