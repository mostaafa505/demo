import { CalendarDays, Globe2, Landmark, Scale, UsersRound } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import Magnet from '../components/reactbits/Magnet'
import { ButtonLink } from '../components/ui/Button'
import { Medallion } from '../components/ui/Medallion'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap'

const TRUST_ICONS = [UsersRound, Landmark, Globe2]

/**
 * The client's hero: the family-and-skyline photograph across the page, dissolving into
 * ivory behind the copy. Phones get the client's mobile slide above the copy.
 * This is the page's one orchestrated entrance; on scroll the photo drifts slower than the page.
 */
export function Hero() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.fromTo('[data-hero-photo]', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.4 }, 0)
          .from('[data-hero-rule]', { scaleX: 0, duration: 1.1, transformOrigin: lang === 'ar' ? '100% 50%' : '0% 50%' }, 0.55)
          .from('[data-hero-text]', { autoAlpha: 0, y: 18, duration: 0.85, stagger: 0.09, ease: 'power3.out' }, 0.6)
          .from('[data-hero-trust]', { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.95)

        // Headline by lines only — Arabic letters stay joined.
        SplitText.create('[data-hero-title]', {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 1.15, stagger: 0.1, ease: 'expo.out', delay: 0.2 }),
        })

        const scrub = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('[data-hero-drift]', { yPercent: 9, ease: 'none', scrollTrigger: scrub })
        gsap.to('[data-hero-copy]', { y: -40, ease: 'none', scrollTrigger: scrub })
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

      <div className="container-site relative -mt-20 pb-12 sm:-mt-28 lg:mt-0 lg:flex lg:min-h-[clamp(560px,calc(100svh-var(--header-h)),720px)] lg:items-center lg:py-14">
        <div data-hero-copy className="lg:max-w-[min(46rem,54%)]">
          <h1 id="hero-title" data-hero-title className="font-display text-display text-fg">
            {t.hero.title}
          </h1>
          <span data-hero-rule aria-hidden="true" className="mt-6 block h-[2px] w-20 rounded-full bg-gold-grad" />
          <p data-hero-text className="text-lead mt-6 max-w-[56ch] text-muted">
            {t.hero.text}
          </p>
          <div data-hero-text className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
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
                <li key={item} data-hero-trust className="flex items-center gap-3 rounded-[var(--radius-card)] border border-stone/80 bg-white/70 p-3 text-[0.86rem] font-medium leading-snug text-fg/80 shadow-[var(--shadow-card)] backdrop-blur-[2px]">
                  <Medallion size="sm">
                    <Icon strokeWidth={1.6} aria-hidden="true" />
                  </Medallion>
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
