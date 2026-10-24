import { CircleHelp, Mic, MonitorPlay, Newspaper, Play, Radio, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartLink } from '../components/ui/SmartLink'
import { TextLink } from '../components/ui/TextLink'
import type { Content } from '../content/types'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

type CategoryKey = Content['knowledge']['categories'][number]['key']

const CATEGORY_ICONS: Record<CategoryKey, LucideIcon> = {
  articles: Newspaper,
  videos: MonitorPlay,
  podcast: Mic,
  webinars: Radio,
  faq: CircleHelp,
}

export function Knowledge() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const fmt = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const [featured, ...rest] = t.knowledge.articles

  return (
    <section ref={ref} id="knowledge" aria-labelledby="knowledge-title" className="bg-ivory py-20 lg:py-32">
      <div className="container-site">
        <SectionHeading id="knowledge-title" eyebrow={t.knowledge.eyebrow} title={t.knowledge.title} lead={t.knowledge.lead} action={<TextLink href="/knowledge">{t.knowledge.viewAll}</TextLink>} />

        {/* Formats */}
        <ul data-reveal-group className="no-scrollbar -mx-4 mt-12 flex snap-x gap-0 overflow-x-auto border-y hairline px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {t.knowledge.categories.map((c, i) => {
            const Icon = CATEGORY_ICONS[c.key]
            return (
              <li key={c.key} data-reveal-item className={`w-[62%] shrink-0 snap-start sm:w-[36%] lg:w-auto ${i > 0 ? 'border-s hairline' : ''}`}>
                <SmartLink href={c.href} className="group/cat flex h-full flex-col gap-3 px-5 py-6 transition-colors hover:bg-sand/60 lg:px-6 lg:py-7">
                  <Icon className="size-6 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                  <span className="mt-2 flex items-center gap-2 font-semibold text-fg">
                    {c.title}
                    <ForwardArrow className="size-3.5 text-gold-deep opacity-0 transition-all duration-300 group-hover/cat:opacity-100" />
                  </span>
                  <span className="text-[0.85rem] leading-relaxed text-muted">{c.text}</span>
                </SmartLink>
              </li>
            )
          })}
        </ul>

        {/* Latest */}
        <p data-reveal="fade" className="mt-14 text-[0.9rem] font-semibold text-fg lg:mt-20">
          {t.knowledge.latest}
        </p>
        <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0">
          {[featured, ...rest].map((a, i) => {
            const isFeatured = i === 0
            return (
              <li key={a.href} className={`w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto ${isFeatured ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
                <SmartLink href={a.href} className="group/art flex h-full flex-col">
                  <div data-reveal="image" className={`relative overflow-hidden rounded-[var(--radius-card)] bg-navy ${isFeatured ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <img src={images.knowledge[a.image]} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/art:scale-105" />
                    {a.image === 'video' && (
                      <span className="absolute inset-0 grid place-items-center bg-ink/25">
                        <span className="grid size-16 place-items-center rounded-full border border-ivory/60 bg-ink/40 text-ivory backdrop-blur-sm transition-transform duration-500 group-hover/art:scale-110">
                          <Play className="size-6 translate-x-0.5 fill-current" strokeWidth={1} aria-hidden="true" />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-[0.8rem]">
                    <span className="rounded-[4px] border border-gold/40 px-2 py-0.5 font-semibold text-gold-deep">{a.category}</span>
                    <time dateTime={a.date} className="text-muted">
                      {fmt.format(new Date(a.date))}
                    </time>
                  </div>
                  <h3 className={`mt-3 leading-snug text-fg transition-colors group-hover/art:text-gold-deep ${isFeatured ? 'font-heading text-[clamp(1.4rem,1.15rem+0.9vw,1.9rem)]' : 'font-title text-[1.05rem] ltr:text-[1.3rem]'}`}>{a.title}</h3>
                  <span className="mt-auto pt-3 text-[0.82rem] text-muted">{a.readTime}</span>
                </SmartLink>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
