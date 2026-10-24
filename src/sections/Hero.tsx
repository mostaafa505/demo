import { CalendarDays, Globe2, Landmark, Scale, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import Magnet from '../components/reactbits/Magnet'
import ShinyText from '../components/reactbits/ShinyText'
import { ButtonLink } from '../components/ui/Button'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, MOTION_REDUCED, SplitText, useGSAP } from '../motion/gsap'

const TRUST_ICONS = [ShieldCheck, Landmark, Globe2]

export function Hero() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        const origin = lang === 'ar' ? '100% 50%' : '0% 50%'

        // Slow settle of the photograph, independent of the text sequence.
        gsap.fromTo('[data-hero-img]', { scale: 1.14 }, { scale: 1.04, duration: 2.6, ease: 'expo.out' })

        // One orchestrated entrance (< 1.6s). Arabic is split by words inside masked lines — never by characters.
        SplitText.create('[data-hero-title]', {
          type: 'words,lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
            tl.from(self.words, { yPercent: 115, duration: 1.05, stagger: 0.045 }, 0.1)
              .from('[data-hero-eyebrow]', { autoAlpha: 0, y: 10, duration: 0.8 }, 0.15)
              .from('[data-hero-rule]', { scaleX: 0, transformOrigin: origin, duration: 1 }, 0.55)
              .from('[data-hero-text]', { autoAlpha: 0, y: 18, duration: 0.9, ease: 'power3.out' }, 0.62)
              .from('[data-hero-cta]', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.78)
              .from('[data-hero-trust]', { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.95)
              .from('[data-hero-trust-rule]', { scaleX: 0, transformOrigin: origin, duration: 1.2 }, 0.9)
            return tl
          },
        })

        // Scroll: the photograph drifts slower than the page, the copy eases away.
        gsap.to('[data-hero-bg]', {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-content]', {
          y: -60,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom 20%', scrub: true },
        })
      })

      mm.add(MOTION_REDUCED, () => {
        gsap.from('[data-hero-content], [data-hero-trust]', { autoAlpha: 0, duration: 0.6 })
      })
    },
    { scope: ref, dependencies: [lang] },
  )

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory">
      {/* Background photograph */}
      <div data-hero-bg aria-hidden="true" className="absolute inset-0 -z-10 will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={images.heroMobile} />
          <img
            data-hero-img
            src={images.hero}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-[30%_55%] ltr:-scale-x-100 max-md:object-[20%_40%]"
          />
        </picture>
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute inset-0 from-ink via-ink/80 to-ink/5 ltr:bg-gradient-to-r rtl:bg-gradient-to-l max-md:bg-none" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent md:h-1/2" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
        <div className="grain absolute inset-0" />
      </div>
      <span className="sr-only">{t.hero.imageAlt}</span>

      <div className="container-site relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+4rem)] md:justify-center md:pb-16">
        <div data-hero-content className="max-w-[46rem]">
          <p data-hero-eyebrow lang={lang === 'ar' ? 'en' : 'ar'} className={`text-gold-light ${lang === 'ar' ? 'eyebrow' : 'eyebrow-ar'}`}>
            {t.hero.eyebrow}
          </p>
          <h1 id="hero-title" data-hero-title className="font-heading text-display mt-5 text-ivory">
            {t.hero.title}
          </h1>
          <span data-hero-rule aria-hidden="true" className="mt-7 block h-px w-28 bg-gold-grad" />
          <p data-hero-text className="text-lead mt-7 max-w-[56ch] text-ivory/75">
            {t.hero.text}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <div data-hero-cta>
              <Magnet padding={70} magnetStrength={4} maxOffset={10} spring={{ stiffness: 160, damping: 18 }}>
                <ButtonLink href="/#consultation" variant="gold" size="lg">
                  <CalendarDays className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  <ShinyText color="#0A0F1A" shineColor="#8A6A2E" speed={2.6} delay={4.5} angle={110} shineWidth={24} direction={lang === 'ar' ? 'right' : 'left'}>
                    {t.hero.primaryCta}
                  </ShinyText>
                </ButtonLink>
              </Magnet>
            </div>
            <div data-hero-cta>
              <ButtonLink href="/#assess" variant="outline-light" size="lg">
                <Scale className="size-5" strokeWidth={1.5} aria-hidden="true" />
                {t.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site relative pb-24 md:pb-10">
        <span data-hero-trust-rule aria-hidden="true" className="block h-px w-full bg-gold/25" />
        <ul className="grid gap-4 pt-6 sm:grid-cols-3 sm:gap-8">
          {t.hero.trust.map((item, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <li key={item} data-hero-trust className="flex items-center gap-3.5 text-[0.9rem] leading-snug text-ivory/80">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/35 text-gold">
                  <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
