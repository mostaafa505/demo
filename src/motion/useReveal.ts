import type { RefObject } from 'react'
import { gsap, MOTION_OK, MOTION_REDUCED, SplitText, useGSAP } from './gsap'

/**
 * Declarative scroll reveals for a section. Mark elements with:
 *
 *   data-reveal="lines"   masked line reveal (headings — Arabic-safe: never splits chars)
 *   data-reveal="fade"    small rise + fade
 *   data-reveal="image"   clip-path reveal, inner <img> settles from 1.08 → 1
 *   data-reveal="rule"    gold hairline drawn from the inline-start edge
 *   data-reveal-group     container whose [data-reveal-item] children stagger in
 *   data-parallax="10"    subtle scrubbed parallax (yPercent range)
 *
 * With reduced motion everything simply fades in.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(MOTION_REDUCED, () => {
        q('[data-reveal], [data-reveal-item]').forEach((el) => {
          gsap.from(el, { autoAlpha: 0, duration: 0.5, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        })
      })

      mm.add(MOTION_OK, () => {
        const origin = document.documentElement.dir === 'rtl' ? '100% 50%' : '0% 50%'

        q('[data-reveal="lines"]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.15,
                ease: 'expo.out',
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })

        q('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 24,
            duration: 0.9,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        q('[data-reveal="rule"]').forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: origin,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          })
        })

        q('[data-reveal="image"]').forEach((el) => {
          const img = el.querySelector('img')
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'expo.inOut' })
          if (img) tl.from(img, { scale: 1.08, duration: 1.6, ease: 'expo.out' }, 0.15)
        })

        q('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]')
          if (!items.length) return
          gsap.from(items, {
            autoAlpha: 0,
            y: 26,
            duration: 0.85,
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        })

        q('[data-parallax]').forEach((el) => {
          const amount = Number((el as HTMLElement).dataset.parallax) || 8
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })

    },
    { scope },
  )
}
