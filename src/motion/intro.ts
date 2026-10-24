/**
 * Coordination between the opening intro (components/brand/Intro.tsx) and the page's own load
 * animations. While html.intro-active is set, the header and hero wait for the intro's
 * "reveal" moment before playing their entrances.
 */
export const REVEAL_EVENT = 'intro:reveal'
export const DONE_EVENT = 'intro:done'

const root = () => document.documentElement

export const introActive = () => root().classList.contains('intro-active') && !root().classList.contains('intro-revealed')

/** Run `cb` now, or at the intro's reveal moment if the intro is playing. Returns a canceller. */
export function onIntroReveal(cb: () => void): () => void {
  if (!introActive()) {
    cb()
    return () => {}
  }
  window.addEventListener(REVEAL_EVENT, cb, { once: true })
  return () => window.removeEventListener(REVEAL_EVENT, cb)
}

export function markRevealed() {
  root().classList.add('intro-revealed')
  window.dispatchEvent(new Event(REVEAL_EVENT))
}

export function markDone() {
  if (!root().classList.contains('intro-revealed')) markRevealed()
  root().classList.remove('intro-active', 'intro-revealed')
  window.dispatchEvent(new Event(DONE_EVENT))
}
