import { useEffect, useRef, useState } from 'react'
import { images } from '../assets/images'
import { ServiceIcon } from '../components/brand/ServiceIcon'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartLink } from '../components/ui/SmartLink'
import { TextLink } from '../components/ui/TextLink'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '../motion/gsap'
import { useReveal } from '../motion/useReveal'

/**
 * Desktop: an editorial index of practice areas beside a sticky photograph that
 * changes with the row in focus (scroll, hover or keyboard).
 * Mobile: a two-column card grid, as in the client's reference.
 */
export function Services() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const prev = useRef(0)
  const items = t.services.items
  useReveal(ref)

  // Follow the reading position on desktop.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-service-row]').forEach((row, i) => {
          ScrollTrigger.create({ trigger: row, start: 'top 58%', end: 'bottom 58%', onToggle: (self) => self.isActive && setActive(i) })
        })
      })
    },
    { scope: ref },
  )

  // Swap photographs with a clip-path wipe.
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || prev.current === active) return
    const layers = panel.querySelectorAll<HTMLElement>('[data-layer]')
    const next = layers[active]
    const last = layers[prev.current]
    layers.forEach((l) => l !== next && l !== last && gsap.set(l, { zIndex: 0 }))
    gsap.set(last, { zIndex: 1 })
    const reduce = !window.matchMedia(MOTION_OK).matches
    if (reduce) {
      gsap.set(next, { zIndex: 2, clipPath: 'inset(0% 0% 0% 0%)' })
    } else {
      gsap.fromTo(next, { zIndex: 2, clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'expo.inOut', overwrite: true })
      gsap.fromTo(next.querySelector('img'), { scale: 1.16 }, { scale: 1.02, duration: 1.4, ease: 'expo.out', overwrite: true })
      gsap.fromTo(panel.querySelectorAll('[data-caption] > *'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, delay: 0.25, overwrite: true })
    }
    prev.current = active
  }, [active])

  const current = items[active]

  return (
    <section ref={ref} id="services" aria-labelledby="services-title" className="bg-ivory py-20 lg:py-32">
      <div className="container-site">
        <SectionHeading id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} action={<TextLink href="/services">{t.services.viewAll}</TextLink>} />

        {/* Desktop index */}
        <div className="mt-16 hidden grid-cols-12 gap-12 lg:grid xl:gap-16">
          <ul data-reveal-group className="col-span-7 border-t hairline">
            {items.map((item, i) => {
              const isActive = i === active
              return (
                <li key={item.slug} data-service-row data-reveal-item className="border-b hairline">
                  <SmartLink
                    href={item.href}
                    data-active={isActive || undefined}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group/row flex items-center gap-6 py-6 xl:py-7"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/30 text-gold-deep transition-[background-color,border-color,color] duration-500 group-data-[active]/row:border-gold group-data-[active]/row:bg-gold group-data-[active]/row:text-ink">
                      <ServiceIcon name={item.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[active]/row:translate-x-2 rtl:group-data-[active]/row:-translate-x-2">
                      <span className="relative inline-block">
                        <span className="font-heading block text-[clamp(1.5rem,1.1rem+1vw,2.1rem)] text-fg/80 transition-colors duration-500 group-data-[active]/row:text-fg">{item.title}</span>
                        <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gold-grad transition-transform duration-700 ease-[var(--ease-out-expo)] group-data-[active]/row:scale-x-100 ltr:origin-left rtl:origin-right" />
                      </span>
                      <span className="mt-2 block text-[0.95rem] text-muted">{item.description}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-[0.85rem] font-semibold text-gold-deep opacity-0 transition-opacity duration-500 group-data-[active]/row:opacity-100">
                      {t.services.explore}
                      <ForwardArrow className="size-4" />
                    </span>
                  </SmartLink>
                </li>
              )
            })}
          </ul>

          <div className="col-span-5">
            <div className="sticky top-[calc(var(--header-h-compact)+2.5rem)]">
              <div data-reveal="image" className="relative aspect-[5/6] max-h-[34rem] w-full overflow-hidden rounded-[var(--radius-card)] bg-navy">
                <div ref={panelRef} className="absolute inset-0">
                  {items.map((item, i) => (
                    <div key={item.slug} data-layer className="absolute inset-0" style={{ zIndex: i === 0 ? 2 : 0 }}>
                      <img src={images.services[item.image]} alt="" loading={i === 0 ? 'eager' : 'lazy'} className="size-full object-cover" />
                    </div>
                  ))}
                  <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <div data-caption className="absolute inset-x-0 bottom-0 z-[4] p-8 text-ivory" aria-live="polite">
                    <p className="font-heading text-[1.9rem] leading-tight">{current.title}</p>
                    <p className="mt-2 max-w-[34ch] text-[0.95rem] text-ivory/75">{current.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet grid */}
        <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:hidden">
          {items.map((item) => (
            <li key={item.slug} data-reveal-item>
              <SmartLink href={item.href} className="group/card flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-gold/15 bg-white shadow-[var(--shadow-card)]">
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <img src={images.services[item.image]} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover/card:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 to-transparent" />
                </span>
                <span className="relative flex flex-1 flex-col px-3.5 pb-4 pt-7 sm:px-5">
                  <span className="absolute -top-5 start-3.5 grid size-10 place-items-center rounded-full border-2 border-white bg-gold-grad text-ink shadow-md sm:start-5">
                    <ServiceIcon name={item.icon} className="size-[18px]" />
                  </span>
                  <span className="font-title text-[0.98rem] leading-snug text-fg sm:text-[1.15rem] ltr:text-[1.12rem]">{item.title}</span>
                  <span className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-muted sm:text-[0.88rem]">{item.description}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-[0.8rem] font-semibold text-gold-deep">
                    {t.services.explore}
                    <ForwardArrow className="size-3.5" />
                  </span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
