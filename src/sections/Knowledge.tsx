import { CircleHelp, Mic, MonitorPlay, Newspaper, Play, Radio, type LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow } from '../components/ui/Arrow'
import { Panel } from '../components/ui/Panel'
import { Picture } from '../components/ui/Picture'
import { SmartLink } from '../components/ui/SmartLink'
import type { Content } from '../content/types'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

type CategoryKey = Content['knowledge']['categories'][number]['key']

const CATEGORY_ICONS: Record<CategoryKey, LucideIcon> = { articles: Newspaper, videos: MonitorPlay, podcast: Mic, webinars: Radio, faq: CircleHelp }
// Article thumbnails reuse the client's photography until real covers exist.
const ARTICLE_IMAGES = { video: images.services.inheritance, article: images.services.divorce, podcast: images.services.maintenance }

const chip = 'inline-flex h-8 items-center gap-1.5 rounded-full border border-gold-deep/50 bg-white px-4 text-[0.8rem] font-semibold text-gold-ink transition-colors hover:bg-cream'

export function Knowledge() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const fmt = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section ref={ref} id="knowledge" className="bg-ivory pb-16 pt-6 lg:pb-20">
      <div className="container-site">
        <Panel
          id="knowledge-title"
          title={t.knowledge.title}
          lead={t.knowledge.lead}
          action={
            <SmartLink href="/knowledge" className={chip}>
              {t.knowledge.viewAll}
            </SmartLink>
          }
        >
          {/* Desktop: formats beside the library still, as in the client's layout */}
          <div className="hidden gap-3 lg:grid lg:grid-cols-[1.25fr_repeat(5,1fr)]">
            <div data-reveal="fade" className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
              <Picture pic={images.knowledgeGavel} sizes="(min-width: 1440px) 18vw, 260px" alt="" data-drift className="absolute inset-0 size-full object-cover object-[38%_60%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
            <ul data-reveal-group className="contents">
              {t.knowledge.categories.map((c) => {
                const Icon = CATEGORY_ICONS[c.key]
                return (
                  <li key={c.key} data-reveal-item>
                    <SmartLink href={c.href} className="group/cat flex h-full flex-col rounded-[var(--radius-card)] border border-stone bg-white p-4 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500 hover:border-gold/45 hover:shadow-[var(--shadow-lift)]">
                      <span className="grid size-11 place-items-center rounded-[0.75rem] bg-cream text-gold-deep ring-1 ring-inset ring-gold/20">
                        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span className="font-title mt-3 block text-[0.98rem] leading-snug text-fg">{c.title}</span>
                      <span className="mt-1 block text-[0.8rem] leading-relaxed text-muted">{c.text}</span>
                      <span className="mt-auto pt-4">
                        <span className="inline-flex h-8 w-full items-center justify-center rounded-[var(--radius-btn)] bg-cream text-[0.8rem] font-semibold text-gold-ink ring-1 ring-inset ring-gold/25 transition-colors duration-300 group-hover/cat:bg-gold-grad group-hover/cat:text-ink">
                          {c.cta}
                        </span>
                      </span>
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile & tablet: latest posts, as in the client's mobile layout */}
          <ul data-reveal-group className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:hidden">
            {t.knowledge.articles.map((a) => (
              <li key={a.href} data-reveal-item className="w-[72%] shrink-0 snap-center sm:w-[44%]">
                <SmartLink href={a.href} className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-stone bg-white shadow-[var(--shadow-card)]">
                  <span data-reveal-img className="relative block aspect-[16/10] overflow-hidden">
                    <Picture pic={ARTICLE_IMAGES[a.image]} sizes="72vw" alt="" className="size-full object-cover" />
                    <span className="absolute bottom-2 end-2 rounded-full bg-ink/80 px-2.5 py-0.5 text-[0.72rem] font-semibold text-gold-light backdrop-blur-sm">{a.category}</span>
                    {a.image === 'video' && (
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid size-12 place-items-center rounded-full bg-ink/55 text-ivory ring-1 ring-ivory/50 backdrop-blur-sm">
                          <Play className="size-5 translate-x-0.5 fill-current" strokeWidth={1} aria-hidden="true" />
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-4">
                    <span className="font-title text-[0.95rem] leading-snug text-fg">{a.title}</span>
                    <span className="mt-auto flex items-center justify-between pt-3 text-[0.78rem] text-muted">
                      <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
                      <ForwardArrow className="size-4 text-gold-deep" />
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
