import type { RefObject } from 'react'
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from './gsap'

/**
 * Scroll choreography for a section. Mark elements with:
 *
 *   data-reveal="title"   section opener: heading rises line by line from a mask (never split by
 *                         characters — Arabic stays joined), the ornament's hairlines draw, lead follows
 *   data-reveal="panel"   framed panel: lifts and settles; its notch title drops in, ornament draws
 *   data-reveal="card"    large card: opens from a rounded inset (clip-path)
 *   data-reveal="fade"    plain rise + fade
 *   data-reveal-group     container whose [data-reveal-item] children rise in, batched as they
 *                         arrive; a [data-reveal-img] inside an item is uncovered from below
 *   data-drift            photo that travels slower than its frame (scrubbed with the scroll)
 *
 * Entrances play once. With reduced motion nothing animates — content is simply there.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root)
        const once = (el: Element, start = 'top 85%') => ({ trigger: el, start, once: true })

        q('[data-reveal="title"]').forEach((el) => {
          const heading = el.querySelector('h2')
          const tl = gsap.timeline({ scrollTrigger: once(el) })
          if (heading) {
            const split = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
            tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out' })
          }
          const lines = el.querySelectorAll('[data-ornament-line]')
          if (lines.length) tl.from(lines, { scaleX: 0, duration: 1.2, ease: 'expo.out' }, 0.25)
          const rest = el.querySelectorAll(':scope > p, :scope > div')
          if (rest.length) tl.from(rest, { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.35)
        })

        q('[data-reveal="panel"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: once(el, 'top 88%') })
          tl.from(el, { autoAlpha: 0, y: 60, scale: 0.97, duration: 1.2, ease: 'expo.out' })
          const notch = el.querySelector('[data-panel-notch]')
          if (notch) tl.from(notch, { yPercent: -60, autoAlpha: 0, scale: 0.9, duration: 0.9, ease: 'back.out(1.7)' }, 0.3)
          const lines = el.querySelectorAll(':scope > div [data-ornament-line]')
          if (lines.length) tl.from(lines, { scaleX: 0, duration: 1.2, ease: 'expo.out' }, 0.45)
        })

        q('[data-reveal="card"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(8% 5% 8% 5% round 1.5rem)', autoAlpha: 0.4 },
            { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', autoAlpha: 1, duration: 1.5, ease: 'expo.inOut', scrollTrigger: once(el, 'top 80%') },
          )
        })

        q('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 30, duration: 1, ease: 'expo.out', scrollTrigger: once(el, 'top 88%') })
        })

        // Items rise in as they reach the viewport, in batches, so a row arrives together.
        const items = q('[data-reveal-group] [data-reveal-item]')
        if (items.length) {
          gsap.set(items, { autoAlpha: 0, y: 50 })
          const imgs = items.flatMap((item) => Array.from(item.querySelectorAll('[data-reveal-img]')))
          gsap.set(imgs, { clipPath: 'inset(100% 0% 0% 0%)' })
          ScrollTrigger.batch(items, {
            start: 'top 90%',
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out', overwrite: true })
              const batchImgs = batch.flatMap((item) => Array.from(item.querySelectorAll('[data-reveal-img]')))
              if (batchImgs.length) gsap.to(batchImgs, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, stagger: 0.1, delay: 0.15, ease: 'expo.inOut' })
            },
          })
        }

        // Depth: photographs travel slower than their frames.
        q('[data-drift]').forEach((img) => {
          const frame = img.parentElement ?? img
          gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      })
    },
    { scope },
  )
}
