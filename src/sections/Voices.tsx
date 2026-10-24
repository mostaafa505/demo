import { Quote, Star } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import { Panel } from '../components/ui/Panel'
import { SmartLink } from '../components/ui/SmartLink'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const chip = 'inline-flex h-8 items-center rounded-full border border-gold-deep/50 bg-white px-4 text-[0.8rem] font-semibold text-gold-ink transition-colors hover:bg-cream'

/** Client stories and the legal team share a row, as in the client's layout. */
export function Voices() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const stories = t.testimonials.items.slice(0, 2)

  return (
    <section ref={ref} className="bg-ivory pb-16 pt-6 lg:pb-20">
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6 xl:gap-8">
        <Panel
          id="testimonials-title"
          title={t.testimonials.title}
          lead={t.testimonials.lead}
          action={
            <SmartLink href="/testimonials" className={chip}>
              {t.testimonials.viewAll}
            </SmartLink>
          }
        >
          <ul data-reveal-group className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
            {stories.map((s) => (
              <li key={s.initials} data-reveal-item className="w-[85%] shrink-0 snap-center sm:w-auto">
                <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-stone bg-white p-5 shadow-[var(--shadow-card)]">
                  <Quote className="size-6 fill-gold/15 text-gold rtl:-scale-x-100" strokeWidth={1.2} aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-fg/85">{s.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-stone pt-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-[family-name:var(--font-latin-display)] text-[0.95rem] font-semibold text-gold-light ring-2 ring-gold/40 ring-offset-2 ring-offset-white">
                      {s.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9rem] font-semibold text-fg">{s.name}</span>
                      <span className="block text-[0.8rem] text-muted">{s.city}</span>
                    </span>
                    <span role="img" aria-label={t.a11y.rating} className="flex gap-0.5 text-gold">
                      {Array.from({ length: s.rating }, (_, i) => (
                        <Star key={i} className="size-3.5 fill-current" strokeWidth={1} aria-hidden="true" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel id="lawyers-title" title={t.lawyers.title} lead={t.lawyers.lead}>
          <ul data-reveal-group className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {t.lawyers.items.map((l, i) => (
              <li key={l.slug} data-reveal-item className="w-[62%] shrink-0 snap-center sm:w-auto">
                <SmartLink href={l.href} className="group/lawyer flex h-full flex-col items-center rounded-[var(--radius-card)] border border-stone bg-white px-3 pb-4 pt-5 text-center shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[var(--shadow-lift)]">
                  <span className={`relative block overflow-hidden rounded-full ring-2 ring-gold/50 ring-offset-[0.1875rem] ring-offset-white ${i === 0 ? 'size-24' : 'size-[5.25rem]'}`}>
                    <img src={images.lawyers[l.slug]} alt={l.imageAlt} loading="lazy" className="size-full scale-[1.35] object-cover object-[50%_30%] transition-transform duration-700 group-hover/lawyer:scale-[1.42]" />
                  </span>
                  <h3 className="font-title mt-4 text-[1rem] text-fg">{l.name}</h3>
                  <p className="text-[0.8rem] font-medium text-gold-deep">{l.role}</p>
                  <p className="mt-1.5 line-clamp-2 text-[0.78rem] leading-relaxed text-muted">{l.bio}</p>
                  <span className="mt-auto w-full pt-4">
                    <span className="inline-flex h-8 w-full items-center justify-center rounded-[var(--radius-btn)] border border-gold-deep/45 text-[0.78rem] font-semibold text-gold-ink transition-colors duration-300 group-hover/lawyer:bg-cream">
                      {t.lawyers.viewProfile}
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
