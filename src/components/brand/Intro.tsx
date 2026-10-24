import { useRef } from 'react'
import { site } from '../../config/site'
import { Flip, gsap, useGSAP } from '../../motion/gsap'
import { markDone, markRevealed } from '../../motion/intro'
import { EASE_IN, EASE_LONG } from '../../motion/tokens'

const BASE = '/brand/intro/'
const COLUMN = ['col-base', 'col-shaft-1', 'col-shaft-2', 'col-shaft-3', 'col-shaft-4', 'col-capital', 'col-top'] as const
const TEXT = ['text-title', 'text-subtitle', 'underline'] as const
const LAYERS = [...COLUMN, ...TEXT]

// Pivot points measured from the layers (560×151 grid): the base's centre, the shafts' foot,
// the rule's start beside the column, and the column's width for the light band.
const BASE_CENTRE = '9.73% 50%'
const SHAFT_FOOT = '50% 82.1%'
const RULE_START = '21.8% 50%'
const COLUMN_WIDTH = 0.195

/**
 * Opening sequence on every load of the home page: the column is built from its base up, the name is set beside
 * it, a single light passes over the column, then the whole lock-up travels into the header
 * (GSAP Flip on desktop; a crossfade on smaller screens, where the header uses the three-line
 * mobile lock-up) while the navy screen folds up into the header bar.
 *
 * Shown whenever the inline script in index.html set html.intro-active (every load of the home
 * page, motion welcome). A click/tap or a key ends it at its final state; scrolling does not.
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = document.documentElement
      if (!root.classList.contains('intro-active')) return
      ;(window as Window & { __introStarted?: boolean }).__introStarted = true

      const el = ref.current!
      const logo = el.querySelector<HTMLElement>('[data-intro-logo]')!
      const veil = el.querySelector<HTMLElement>('[data-intro-veil]')!
      const q = gsap.utils.selector(el)
      const layer = (name: string) => q(`[data-layer="${name}"]`)
      let tl: gsap.core.Timeline | null = null
      let finished = false

      const finish = () => {
        if (finished) return
        finished = true
        removeSkips()
        markDone()
      }
      const skip = () => (tl ? tl.progress(1) : finish())
      // A click/tap or a key ends it; scrolling does not.
      const events = ['click', 'keydown'] as const
      const removeSkips = () => events.forEach((e) => window.removeEventListener(e, skip))
      events.forEach((e) => window.addEventListener(e, skip, { passive: true }))

      // Too late to be worth it (very slow load), or layers not decoded within 3s: skip.
      if (performance.now() > 5000) return void finish()
      const imgs = Array.from(el.querySelectorAll('img'))
      const ready = Promise.all(imgs.map((img) => img.decode().catch(() => undefined)))
      const timeout = new Promise<'late'>((r) => setTimeout(() => r('late'), 3000))

      Promise.race([ready, timeout]).then((result) => {
        if (finished) return
        if (result === 'late') return finish()
        tl = build()
      })

      function build() {
        const mobile = window.matchMedia('(max-width: 767px)').matches
        const k = mobile ? 0.73 : 1 // ~1.9s on phones, ~2.6s on desktop
        const at = (s: number) => s * k
        const dur = (s: number) => s * k

        const desktopTarget = document.querySelector<HTMLElement>('[data-header-logo="desktop"] img')
        const useFlip = !!desktopTarget && desktopTarget.offsetParent !== null
        const mobileTarget = document.querySelector<HTMLElement>('[data-header-logo="mobile"] img')
        const headerH = document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0

        const t = gsap.timeline({ onComplete: finish })
        // 1 · base, from the centre
        t.fromTo(layer('col-base'), { scaleX: 0 }, { scaleX: 1, transformOrigin: BASE_CENTRE, duration: dur(0.35), ease: EASE_IN }, at(0))
          // 2 · shafts rise from below: the inner pair, then the outer pair
          .fromTo([layer('col-shaft-2'), layer('col-shaft-3')].flat(), { scaleY: 0 }, { scaleY: 1, transformOrigin: SHAFT_FOOT, duration: dur(0.55), ease: 'expo.out' }, at(0.3))
          .fromTo([layer('col-shaft-1'), layer('col-shaft-4')].flat(), { scaleY: 0 }, { scaleY: 1, transformOrigin: SHAFT_FOOT, duration: dur(0.47), ease: 'expo.out' }, at(0.38))
          // 3 · capital, 4 · top slab
          .fromTo(layer('col-capital'), { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: dur(0.35), ease: EASE_IN }, at(0.75))
          .fromTo(layer('col-top'), { y: -10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: dur(0.3), ease: EASE_IN }, at(0.85))
          // 5 · title and 6 · firm name, unmasked left to right (English); 7 · rule from the column side
          .fromTo(layer('text-title'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: dur(0.45), ease: EASE_IN }, at(1.0))
          .fromTo(layer('text-subtitle'), { clipPath: 'inset(0 100% 0 0)', y: 6 }, { clipPath: 'inset(0 0% 0 0)', y: 0, duration: dur(0.4), ease: EASE_IN }, at(1.2))
          .fromTo(layer('underline'), { scaleX: 0 }, { scaleX: 1, transformOrigin: RULE_START, duration: dur(0.4), ease: EASE_IN }, at(1.35))
          // 8 · one light passes over the column only
          .fromTo(q('[data-intro-sheen]'), { xPercent: -100 }, { xPercent: 230, duration: dur(0.4), ease: 'power1.inOut' }, at(1.55))

        // 9 · into the header
        const travel = dur(0.6)
        if (useFlip) {
          t.add(Flip.fit(logo, desktopTarget!, { duration: travel, ease: EASE_LONG, scale: true }) as gsap.core.Tween, at(2.0))
        } else if (mobileTarget) {
          const from = logo.getBoundingClientRect()
          const to = mobileTarget.getBoundingClientRect()
          const s = to.height / from.height
          t.to(
            logo,
            { x: to.left + to.width / 2 - (from.left + from.width / 2), y: to.top + to.height / 2 - (from.top + from.height / 2), scale: s, autoAlpha: 0, duration: travel, ease: EASE_LONG },
            at(2.0),
          )
          t.fromTo(mobileTarget, { opacity: 0 }, { opacity: 1, duration: travel, ease: EASE_LONG, clearProps: 'opacity' }, at(2.0))
        }
        t.fromTo(veil, { clipPath: 'inset(0 0 0% 0)' }, { clipPath: `inset(0 0 calc(100% - ${headerH}px) 0)`, duration: travel, ease: EASE_LONG }, at(2.0))
        t.call(markRevealed, [], at(2.2))
        return t
      }

      return () => {
        removeSkips()
        tl?.kill()
      }
    },
    { scope: ref },
  )

  const columnMask = COLUMN.map((n) => `url(${BASE}${n}.webp)`).join(',')

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <div data-intro-veil className="fixed inset-0 z-[45] bg-ink">
        <div className="khatam absolute inset-0 opacity-[0.05]" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
        <div data-intro-logo className="relative aspect-[1680/453] w-[min(80vw,34rem)]">
          <span className="sr-only">{site.brand.wordmark}</span>
          {LAYERS.map((name) => (
            <img key={name} data-layer={name} src={`${BASE}${name}.webp`} alt="" width={1680} height={453} decoding="async" className="absolute inset-0 size-full" />
          ))}
          {/* Light band, masked by the column layers so it never touches the lettering */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{
              width: `${COLUMN_WIDTH * 100}%`,
              maskImage: columnMask,
              WebkitMaskImage: columnMask,
              maskSize: `${100 / COLUMN_WIDTH}% 100%`,
              WebkitMaskSize: `${100 / COLUMN_WIDTH}% 100%`,
              maskPosition: '0 0',
              WebkitMaskPosition: '0 0',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <span data-intro-sheen className="absolute inset-y-0 left-0 w-[45%] -translate-x-full bg-[linear-gradient(100deg,transparent,rgb(255_246_222/0.55)_50%,transparent)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
