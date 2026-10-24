import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from './gsap'
import { fontsReady, splitLines, type SplitLines } from './splitLines'
import { CLEAR, DURATION, EASE_IN, EASE_LONG, MQ, origins, scale, STAGGER, START } from './tokens'

/*
 * Reusable scroll animations, declared in markup:
 *
 *   data-anim="section-head"  unified section opener — frame (if data-anim-frame), capsule
 *                             ([data-anim-capsule]), heading by lines, ornament hairlines growing
 *                             outward from the mark, mark, then [data-anim-lead] items
 *   data-anim="title"         heading rises line by line from a mask (split by words → lines, never
 *                             by characters, so Arabic stays joined; see splitLines.ts)
 *   data-anim="fade-up"       opacity 0 → 1, y 32 → 0
 *   data-anim="stagger"       direct children fade up in turn, batched so a row arrives together;
 *                             an img-reveal inside a child plays with it
 *   data-anim="img-reveal"    clip-path inset(100% 0 0 0) → inset(0), inner <img> 1.15 → 1
 *   data-anim="line"          hairline grows from the reading start (right in Arabic)
 *   data-anim="counter"       counts to data-to (keeps data-prefix / data-suffix / data-separator)
 *   data-anim="card"          large card opens from a rounded inset
 *   data-parallax             photo drifts against the scroll inside its frame (desktop only)
 *
 * Initial states live in CSS under `.js-anim` (styles/index.css), so nothing is hidden if the
 * script never runs, and nothing is hidden at all with prefers-reduced-motion. Every entrance
 * starts at "top 85%" and plays once.
 */
export function useAnim(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean }
        if (!motion) return
        const { y, d } = scale(mobile)
        const o = origins()
        const q = gsap.utils.selector(root)
        const trigger = (el: Element) => ({ trigger: el, start: START, once: true })
        const splits: SplitLines[] = []
        const split = (el: HTMLElement) => {
          const s = splitLines(el)
          splits.push(s)
          return s
        }

        /* ---------------- unified section opener ---------------- */
        // Built once webfonts are in, so headings are split into their real lines.
        const heads = q('[data-anim="section-head"]')
        const buildHeads = ctx.add('buildHeads', () =>
          heads.forEach((head) => {
            const tl = gsap.timeline({ scrollTrigger: trigger(head), defaults: { ease: EASE_IN } })
            if (head.hasAttribute('data-anim-frame')) {
              tl.fromTo(head, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: d(0.9), clearProps: CLEAR })
            }
            const at = head.hasAttribute('data-anim-frame') ? 0.15 : 0
            const capsule = head.querySelector('[data-anim-capsule]')
            if (capsule) tl.fromTo(capsule, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: d(0.7), clearProps: CLEAR }, at)

            const heading = head.querySelector('h2')
            if (heading) {
              const s = split(heading)
              gsap.set(heading, { visibility: 'visible' })
              tl.fromTo(s.lines, { yPercent: 100 }, { yPercent: 0, duration: d(1), stagger: 0.1, onComplete: s.revert }, at + 0.1)
            }

            const lines = head.querySelectorAll<HTMLElement>('[data-ornament-line]')
            lines.forEach((line, i) => {
              // grow outward from the mark: the first line's mark-side is its inline end
              const fromMark = i === 0 ? o.end : o.start
              tl.fromTo(line, { scaleX: 0, transformOrigin: fromMark }, { scaleX: 1, duration: d(0.8), ease: EASE_LONG }, at + 0.35)
            })
            const mark = head.querySelector('[data-ornament-mark]')
            if (mark) tl.fromTo(mark, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: d(0.6) }, at + 0.4)

            const lead = head.querySelectorAll('[data-anim-lead]')
            if (lead.length) tl.fromTo(lead, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: d(DURATION), stagger: STAGGER, clearProps: CLEAR }, at + 0.55)
          }),
        )
        const titles = q('[data-anim="title"]')
        const buildTitles = ctx.add('buildTitles', () =>
          titles.forEach((el) => {
            const s = split(el)
            gsap.set(el, { visibility: 'visible' })
            gsap.fromTo(s.lines, { yPercent: 100 }, { yPercent: 0, duration: d(1), stagger: 0.1, ease: EASE_IN, scrollTrigger: trigger(el), onComplete: s.revert })
          }),
        )
        if (heads.length || titles.length)
          fontsReady().then(() => {
            if (ctx.isReverted) return
            buildHeads()
            buildTitles()
          })

        /* ---------------- simple entrances ---------------- */
        q('[data-anim="fade-up"]').forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: d(DURATION), ease: EASE_IN, clearProps: CLEAR, scrollTrigger: trigger(el) })
        })

        q('[data-anim="line"]').forEach((el) => {
          gsap.fromTo(el, { scaleX: 0, transformOrigin: o.start }, { scaleX: 1, duration: d(0.8), ease: EASE_LONG, scrollTrigger: trigger(el) })
        })

        const revealImage = (wrap: Element, tl: gsap.core.Timeline | typeof gsap, at?: number) => {
          const img = wrap.querySelector('img')
          tl.fromTo(wrap, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: d(1.2), ease: EASE_LONG }, at)
          if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: d(1.2), ease: EASE_IN, clearProps: 'scale,transform' }, at)
        }

        q('[data-anim="img-reveal"]').forEach((wrap) => {
          if (wrap.closest('[data-anim="stagger"]')) return // plays with its card
          revealImage(wrap, gsap.timeline({ scrollTrigger: trigger(wrap) }), 0)
        })

        /* ---------------- groups ---------------- */
        q('[data-anim="stagger"]').forEach((group) => {
          const items = Array.from(group.children)
          if (!items.length) return
          ScrollTrigger.batch(items, {
            start: START,
            once: true,
            onEnter: (batch) => {
              batch.forEach((item, i) => {
                const tl = gsap.timeline({ delay: i * STAGGER * 1.25, defaults: { ease: EASE_IN } })
                tl.fromTo(item, { autoAlpha: 0, y: y + 8 }, { autoAlpha: 1, y: 0, duration: d(DURATION), clearProps: CLEAR }, 0)
                item.querySelectorAll('[data-anim="img-reveal"]').forEach((wrap) => revealImage(wrap, tl, 0.05))
              })
            },
          })
        })

        /* ---------------- numbers ---------------- */
        q('[data-anim="counter"]').forEach((el) => {
          const to = Number(el.getAttribute('data-to') ?? 0)
          const prefix = el.getAttribute('data-prefix') ?? ''
          const suffix = el.getAttribute('data-suffix') ?? ''
          const sep = el.getAttribute('data-separator') ?? ''
          const out = el.querySelector('[data-counter-value]') ?? el
          const format = (n: number) =>
            `${prefix}${Math.round(n)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, sep)}${suffix}`
          const state = { n: 0 }
          out.textContent = format(0)
          gsap.to(state, { n: to, duration: 1.8, ease: 'power2.out', scrollTrigger: trigger(el), onUpdate: () => void (out.textContent = format(state.n)) })
        })

        /* ---------------- large card ---------------- */
        q('[data-anim="card"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(6% 4% 6% 4% round 2rem)' },
            { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', duration: d(1.4), ease: EASE_LONG, clearProps: 'clipPath', scrollTrigger: trigger(el) },
          )
        })

        /* ---------------- depth (desktop only) ---------------- */
        if (!mobile) {
          q('[data-parallax]').forEach((img) => {
            const frame = img.parentElement ?? img
            gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } })
          })
        }

        return () => splits.forEach((s) => s.revert())
      })
    },
    { scope },
  )
}
