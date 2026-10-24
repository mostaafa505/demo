import { CalendarDays, Globe2, Landmark, Scale, UsersRound } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import Magnet from '../components/reactbits/Magnet'
import { ArchOutline } from '../components/ui/ArchOutline'
import { ButtonLink } from '../components/ui/Button'
import { Medallion } from '../components/ui/Medallion'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap'

const TRUST_ICONS = [UsersRound, Landmark, Globe2]

/**
 * The client's hero — copy on one side, photograph on the other — with the
 * photograph set in an arched window traced by a gold hairline.
 * The page's single orchestrated moment: arch draws, photo rises inside it, headline follows.
 */
export function Hero() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        requestAnimationFrame(() => {
          const arch = ref.current?.querySelector<SVGPathElement>('[data-arch-line]')
          if (!arch) return
          const len = arch.getTotalLength()
          gsap.fromTo(arch, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' })
        })
        tl.fromTo('[data-arch-photo]', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0.1)
          .from('[data-arch-photo] img', { scale: 1.12, duration: 1.8 }, 0.1)
          .from('[data-hero-text]', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.55)
          .from('[data-hero-trust]', { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, 0.9)

        // Headline by lines only — Arabic letters stay joined.
        SplitText.create('[data-hero-title]', {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 1.1, stagger: 0.1, ease: 'expo.out', delay: 0.25 }),
        })
      })
    },
    { scope: ref, dependencies: [lang] },
  )

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="paper relative overflow-hidden bg-ivory">
      {/* Soft light pooling behind the arch */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 end-[-10%] size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(236_211_152/0.38),transparent)]" />

      <div className="container-site relative grid items-center gap-x-12 gap-y-10 pb-12 pt-8 lg:grid-cols-12 lg:gap-y-9 lg:pb-12 lg:pt-12">
        {/* Copy */}
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6">
          <h1 id="hero-title" data-hero-title className="font-display text-display text-fg">
            {t.hero.title}
          </h1>
          <span data-hero-text aria-hidden="true" className="mt-6 block h-[2px] w-20 rounded-full bg-gold-grad" />
          <p data-hero-text className="text-lead mt-6 max-w-[54ch] text-muted">
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

        </div>

        {/* Arched window */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6">
          <div className="relative mx-auto aspect-[100/92] w-full max-w-[34rem] lg:aspect-[100/100] lg:max-w-none xl:max-w-[34rem]">
            <ArchOutline offset={14} className="text-gold max-lg:hidden" />
            <div data-arch-photo className="absolute inset-0 overflow-hidden rounded-t-[999px] rounded-b-[14px] bg-sand shadow-[var(--shadow-lift)] max-lg:rounded-t-[220px]">
              <img
                src={images.hero.src}
                srcSet={images.hero.srcSet}
                sizes="(min-width: 1024px) 46vw, 92vw"
                alt={t.hero.imageAlt}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover object-[42%_50%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
        {/* Trust points */}
        <ul className="order-3 grid gap-4 border-t border-stone pt-7 sm:grid-cols-3 sm:gap-6 lg:col-span-12">
          {t.hero.trust.map((item, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <li key={item} data-hero-trust className="flex items-center gap-3 text-[0.9rem] font-medium leading-snug text-fg/80">
                <Medallion size="sm">
                  <Icon strokeWidth={1.6} aria-hidden="true" />
                </Medallion>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
