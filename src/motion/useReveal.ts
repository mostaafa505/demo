import type { RefObject } from 'react'
import { gsap, MOTION_OK, useGSAP } from './gsap'

/**
 * Quiet scroll reveals for a section. Mark elements with:
 *
 *   data-reveal="title"   section opener: rises 16px, the ornament's hairlines draw outward
 *   data-reveal="panel"   framed panel: rises 20px
 *   data-reveal="fade"    plain rise + fade
 *   data-reveal-group     container whose [data-reveal-item] children stagger in
 *   data-drift            image that drifts a few percent against the scroll inside its frame
 *
 * Everything plays once. With reduced motion nothing animates — content is simply there.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const once = (el: Element, start = 'top 88%') => ({ trigger: el, start, once: true })

        q('[data-reveal="title"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el) })
          tl.from(el, { autoAlpha: 0, y: 16, duration: 0.8, ease: 'power3.out' })
          const lines = el.querySelectorAll('[data-ornament-line]')
          if (lines.length) tl.from(lines, { scaleX: 0, duration: 1, ease: 'expo.out' }, 0.2)
        })

        q('[data-reveal="panel"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el, 'top 90%') })
          tl.from(el, { autoAlpha: 0, y: 24, duration: 0.9, ease: 'power3.out' })
          const notch = el.querySelector('[data-panel-notch]')
          if (notch) tl.from(notch, { y: -14, autoAlpha: 0, duration: 0.8, ease: 'back.out(1.6)' }, 0.25)
          const lines = el.querySelectorAll(':scope > div [data-ornament-line]')
          if (lines.length) tl.from(lines, { scaleX: 0, duration: 1, ease: 'expo.out' }, 0.35)
        })

        q('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 20, duration: 0.85, ease: 'power3.out', scrollTrigger: once(el, 'top 90%') })
        })

        // Depth: photographs travel slightly slower than their frames.
        q('[data-drift]').forEach((img) => {
          const frame = img.parentElement ?? img
          gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
        })

        q('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]')
          if (items.length) gsap.from(items, { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.06, ease: 'power3.out', scrollTrigger: once(group, 'top 88%') })
        })
      })
    },
    { scope },
  )
}
