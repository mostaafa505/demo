import { Award, FileCheck2, Globe2, MapPin, ShieldCheck } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow } from '../components/ui/Arrow'
import { Counter } from '../components/ui/Counter'
import { Panel } from '../components/ui/Panel'
import { Picture } from '../components/ui/Picture'
import { SmartLink } from '../components/ui/SmartLink'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const PILLAR_ICONS = [Award, FileCheck2, ShieldCheck, Globe2]

/** "Why us" and "Emirates & cities" share a row, as in the client's layout. */
export function WhyEmirates() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} className="bg-ivory pb-16 pt-6 lg:pb-20">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6 xl:gap-8">
        <Panel id="why-title" title={t.why.title} lead={t.why.lead}>
          <ul data-reveal-group className="grid gap-3 sm:grid-cols-2">
            {t.why.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i]
              return (
                <li key={p.title} data-reveal-item className="flex items-start gap-3.5 rounded-[var(--radius-card)] border border-stone bg-white p-4 shadow-[var(--shadow-card)]">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-cream text-gold-deep ring-1 ring-inset ring-gold/20">
                    <Icon className="size-[22px]" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <h3 className="font-title text-[0.98rem] leading-snug text-fg">{p.title}</h3>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{p.text}</p>
                  </span>
                </li>
              )
            })}
          </ul>
          <dl data-reveal-group className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {t.why.stats.map((s) => (
              <div key={s.label} data-reveal-item className="flex flex-col items-center rounded-[var(--radius-card)] border border-stone bg-white px-3 py-4 text-center">
                <dd className="order-1 font-[family-name:var(--font-latin)] text-[1.7rem] font-bold leading-tight text-gold-ink">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} separator={s.separator ?? ''} />
                </dd>
                <dt className="order-2 mt-1 text-[0.82rem] text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel id="emirates-title" title={t.emirates.title} lead={t.emirates.lead}>
          <ul data-reveal-group className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {t.emirates.items.map((city) => (
              <li key={city.slug} data-reveal-item>
                <SmartLink href={city.href} className="group/city flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-stone bg-white shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[var(--shadow-lift)]">
                  <span className="relative block aspect-[4/3.4] overflow-hidden">
                    <Picture pic={images.cities[city.slug]} sizes="(min-width: 1024px) 200px, 31vw" alt={city.imageAlt} className="size-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover/city:scale-[1.07]" />
                  </span>
                  <span className="relative flex flex-1 flex-col items-center px-2 pb-3 pt-6 text-center sm:px-3 sm:pb-4">
                    <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-stone bg-white px-3.5 py-1 font-title text-[0.9rem] text-fg shadow-[var(--shadow-card)] sm:text-[1rem]">
                      <MapPin className="size-3.5 text-gold-deep" strokeWidth={1.8} aria-hidden="true" />
                      {city.name}
                    </span>
                    <span className="hidden text-[0.8rem] leading-relaxed text-muted sm:block">{city.text}</span>
                    <span className="mt-auto hidden w-full pt-3 sm:block">
                      <span className="inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[var(--radius-btn)] bg-cream text-[0.8rem] font-semibold text-gold-ink ring-1 ring-inset ring-gold/25 transition-colors duration-300 group-hover/city:bg-gold-grad group-hover/city:text-ink">
                        {city.cta}
                        <ForwardArrow className="size-3.5" />
                      </span>
                    </span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </section>
  )
}
