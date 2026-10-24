import { CalendarDays, Globe2, Landmark, Scale, UsersRound } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import Magnet from '../components/reactbits/Magnet'
import { ButtonLink } from '../components/ui/Button'
import { Medallion } from '../components/ui/Medallion'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, useGSAP } from '../motion/gsap'
import { fontsReady, splitLines } from '../motion/splitLines'
import { CLEAR, DURATION, EASE_IN, EASE_LONG, MQ, origins, scale } from '../motion/tokens'

const TRUST_ICONS = [UsersRound, Landmark, Globe2]

/**
 * The client's hero: the family-and-skyline photograph across the page, dissolving into
 * ivory behind the copy. Phones get the client's mobile slide above the copy.
 *
 * One load timeline (not scroll-driven): photo settles 1.08 → 1 · headline by lines from 0.2s ·
 * gold rule from the reading start at 0.7s · lead 0.8s · buttons 1.0s · trust cards 1.2s.
 * On desktop the photo drifts and the copy dims to 0.6 as the hero scrolls away.
 */
export function Hero() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ motion: MQ.motion, mobile: MQ.mobile }, (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean }
        if (!motion) return
        const { y, d } = scale(mobile)
        const o = origins()

        const tl = gsap.timeline({ defaults: { ease: EASE_IN } })
        tl.fromTo('[data-hero-photo]', { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0)
          .fromTo('[data-hero-rule]', { scaleX: 0, transformOrigin: o.start }, { scaleX: 1, duration: d(0.8), ease: EASE_LONG }, 0.7)
          .fromTo('[data-hero-text]', { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: d(DURATION), clearProps: CLEAR }, 0.8)
          .fromTo('[data-hero-cta] > *', { autoAlpha: 0, y }, { autoAlpha: 1, y: 0, duration: d(DURATION), stagger: 0.1, clearProps: CLEAR }, 1.0)
          .fromTo('[data-hero-trust]', { autoAlpha: 0, y: mobile ? 24 : 40 }, { autoAlpha: 1, y: 0, duration: d(DURATION), stagger: 0.12, clearProps: CLEAR }, 1.2)
          .fromTo('[data-hero-icon]', { scale: 0.7 }, { scale: 1, duration: d(0.6), stagger: 0.12, clearProps: CLEAR }, 1.3)

        // Headline by lines (words grouped into lines — Arabic letters stay joined). Waits at most
        // 200ms for the webfont so the lines are the real ones and the headline still starts by 0.3s.
        const t0 = performance.now()
        const title = ref.current!.querySelector<HTMLElement>('[data-hero-title]')!
        let revertTitle = () => {}
        const buildTitle = ctx.add('buildTitle', () => {
          const s = splitLines(title)
          revertTitle = s.revert
          gsap.set(title, { visibility: 'visible' })
          gsap.fromTo(s.lines, { yPercent: 100 }, { yPercent: 0, duration: d(1), stagger: 0.12, ease: EASE_IN, delay: Math.max(0, 0.2 - (performance.now() - t0) / 1000), onComplete: s.revert })
        })
        fontsReady(200).then(() => !ctx.isReverted && buildTitle())

        if (!mobile) {
          const scrub = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
          gsap.fromTo('[data-hero-drift]', { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: scrub })
          gsap.fromTo('[data-hero-copy]', { opacity: 1 }, { opacity: 0.6, ease: 'none', scrollTrigger: scrub })
        }
        return () => revertTitle()
      })
    },
    { scope: ref, dependencies: [lang] },
  )

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ivory">
      {/* Desktop photograph */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block">
        {/* Mirrored in English so the family stays clear of the copy (mirror on the wrapper: GSAP owns the img's transform) */}
        <div data-hero-drift className="absolute inset-x-0 -bottom-[6%] top-0">
          <div className="size-full ltr:-scale-x-100">
            <img
              data-hero-photo
              src={images.hero.src}
              srcSet={images.hero.srcSet}
              sizes="100vw"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover object-[30%_45%]"
            />
          </div>
        </div>
        <div className="absolute inset-0 from-ivory from-[36%] via-ivory/75 via-[48%] to-ivory/0 to-[62%] ltr:bg-gradient-to-r rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-ivory/0" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ivory/50 to-ivory/0" />
      </div>
      <span className="sr-only">{t.hero.imageAlt}</span>

      {/* Phone photograph */}
      <div aria-hidden="true" className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/9] lg:hidden">
        <img
          data-hero-photo
          src={images.heroMobile.src}
          srcSet={images.heroMobile.srcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-[22%_50%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory via-ivory/60 to-ivory/0" />
      </div>

      <div className="container-site relative -mt-20 pb-12 sm:-mt-28 lg:mt-0 lg:flex lg:min-h-[clamp(35rem,calc(100svh-var(--header-h)),45rem)] lg:items-center lg:py-14">
        <div data-hero-copy className="lg:max-w-[min(46rem,54%)]">
          <h1 id="hero-title" data-hero-title className="font-display text-display text-fg">
            {t.hero.title}
          </h1>
          <span data-hero-rule aria-hidden="true" className="mt-6 block h-[0.125rem] w-20 rounded-full bg-gold-grad" />
          <p data-hero-text className="text-lead mt-6 max-w-[56ch] text-muted">
            {t.hero.text}
          </p>
          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnet padding={60} magnetStrength={5} maxOffset={8} spring={{ stiffness: 170, damping: 20 }}>
              <ButtonLink href="/#consultation" variant="gold" size="lg">
                <CalendarDays className="size-5" strokeWidth={1.6} aria-hidden="true" />
                {t.hero.primaryCta}
              </ButtonLink>
            </Magnet>
            <ButtonLink href="/#assess" variant="outline-dark" size="lg">
              <Scale className="size-5" strokeWidth={1.6} aria-hidden="true" />
              {t.hero.secondaryCta}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {t.hero.trust.map((item, i) => {
              const Icon = TRUST_ICONS[i]
              return (
                <li
                  key={item}
                  data-hero-trust
                  className="flex items-center gap-3 rounded-[var(--radius-card)] border border-stone/80 bg-white/70 p-3 text-[0.86rem] font-medium leading-snug text-fg/80 shadow-[var(--shadow-card)] backdrop-blur-[0.125rem] transition-[translate,box-shadow,border-color] duration-300 ease-[var(--ease-out-quart)] can-hover:hover:-translate-y-1 can-hover:hover:border-gold/40 can-hover:hover:shadow-[var(--shadow-lift)]"
                >
                  <span data-hero-icon className="shrink-0">
                    <Medallion size="sm">
                      <Icon strokeWidth={1.6} aria-hidden="true" />
                    </Medallion>
                  </span>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
