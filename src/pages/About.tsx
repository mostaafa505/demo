import { Award, BadgeCheck, CalendarDays, Clock3, Eye, FileText, Gem, Globe2, Handshake, MessagesSquare, Scale, Settings2, ShieldCheck, Target, UsersRound, Video, type LucideIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow, ForwardChevron } from '../components/ui/Arrow'
import { ButtonLink } from '../components/ui/Button'
import { Ornament } from '../components/ui/Ornament'
import { Picture } from '../components/ui/Picture'
import { SectionTitle } from '../components/ui/SectionTitle'
import { SmartLink } from '../components/ui/SmartLink'
import { useLang } from '../i18n/LanguageProvider'
import { useAnim } from '../motion/useAnim'

const HIGHLIGHT_ICONS: LucideIcon[] = [Handshake, Globe2, FileText, UsersRound, Scale]
const VALUE_ICONS: LucideIcon[] = [UsersRound, Award, Handshake, ShieldCheck]
const HELP_ICONS: LucideIcon[] = [MessagesSquare, Video, Clock3]

/**
 * About us — the client's page 9 (references/client/about), drawn with the home page's system:
 * ink and gold, sand panels, ornament under headings, the same data-anim choreography.
 */
export function About() {
  const { t } = useLang()
  const a = t.about
  const ref = useRef<HTMLDivElement>(null)
  useAnim(ref)

  useEffect(() => {
    document.title = a.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', a.meta.description)
  }, [a])

  return (
    <div ref={ref} className="paper bg-ivory">
      {/* ---------- Page hero ---------- */}
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-ink text-ivory">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 end-0 w-full overflow-hidden lg:w-[68%]">
            {/* mirrored in English so the scales stay on the outer edge (mirror on a wrapper: GSAP owns the img transform) */}
            <div className="size-full ltr:-scale-x-100">
              <Picture pic={images.heroMobile} sizes="(min-width: 1024px) 68vw, 100vw" alt="" loading="eager" data-parallax className="size-full object-cover object-[25%_55%]" />
            </div>
          </div>
          <div className="absolute inset-0 from-ink from-[32%] via-ink/85 via-[48%] to-ink/10 ltr:bg-gradient-to-r rtl:bg-gradient-to-l max-lg:bg-gradient-to-t max-lg:from-ink max-lg:from-[45%] max-lg:via-ink/80 max-lg:to-ink/30" />
          <div className="khatam absolute inset-0 opacity-[0.04]" />
        </div>

        <div className="container-site flex min-h-[clamp(26rem,52vh,32rem)] flex-col justify-end pb-24 pt-14 lg:justify-center lg:pb-28">
          <div className="max-w-[40rem]">
            <nav aria-label={a.breadcrumbHome} data-anim="fade-up">
              <ol className="flex items-center gap-2 text-[0.86rem] text-ivory/65">
                <li>
                  <SmartLink href="/" className="transition-colors hover:text-gold-light">
                    {a.breadcrumbHome}
                  </SmartLink>
                </li>
                <li aria-hidden="true">
                  <ForwardChevron className="size-3.5 text-gold" />
                </li>
                <li aria-current="page" className="text-gold-light">
                  {a.title}
                </li>
              </ol>
            </nav>
            <h1 id="about-title" data-anim="title" className="font-display text-display mt-4 text-ivory">
              {a.title}
            </h1>
            <span data-anim="line" aria-hidden="true" className="mt-5 block h-[0.125rem] w-20 rounded-full bg-gold-grad" />
            <p data-anim="fade-up" className="font-title mt-5 text-[clamp(1.15rem,1rem+0.6vw,1.55rem)] leading-[1.6] text-gold-light">
              {a.subtitle}
            </p>
            <p data-anim="fade-up" className="mt-4 max-w-[56ch] text-ivory/75">
              {a.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Our story ---------- */}
      <section aria-labelledby="story-title" className="relative z-10 -mt-14 pb-14 lg:-mt-16 lg:pb-16">
        <div className="container-site">
          <div data-anim="fade-up" className="grid overflow-hidden rounded-[1.5rem] border border-stone bg-white shadow-[var(--shadow-lift)] lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-6 lg:order-1 lg:self-center lg:p-12">
              <h2 id="story-title" data-anim="title" className="font-display text-h2 text-fg">
                {a.story.title}
              </h2>
              <Ornament className="mt-3 !justify-start" />
              <p data-anim="fade-up" className="mt-5 text-[1.02rem] leading-[1.95] text-muted">
                {a.story.text}
              </p>
              <div data-anim="fade-up" className="mt-8">
                <ButtonLink href="/#consultation" variant="outline-dark" size="lg">
                  {a.story.cta}
                  <ForwardArrow className="size-4" />
                </ButtonLink>
              </div>
            </div>
            <figure className="relative lg:col-span-6 lg:order-2">
              <div data-anim="img-reveal" className="relative aspect-[1798/1100] h-full overflow-hidden lg:aspect-auto lg:min-h-[28rem]">
                <Picture pic={images.about.founder} sizes="(min-width: 1024px) 50vw, 100vw" alt={a.story.founderAlt} className="absolute inset-0 size-full object-cover object-[58%_30%]" />
              </div>
              <figcaption data-anim="fade-up" className="absolute bottom-4 start-4 max-w-[19rem] rounded-[var(--radius-card)] border border-gold/45 bg-ink/85 px-5 py-4 text-ivory backdrop-blur-[2px] sm:bottom-6 sm:start-6">
                <span className="font-title block text-[1.15rem] text-gold-light">{a.story.founderName}</span>
                <span className="block text-[0.88rem] text-ivory/85">{a.story.founderRole}</span>
                <span className="mt-0.5 block text-[0.8rem] leading-relaxed text-ivory/60">{a.story.founderFocus}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Highlights ---------- */}
      <section className="pb-14 lg:pb-16">
        <div className="container-site">
          <ul data-anim="stagger" className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {a.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i]
              return (
                <li key={h.value} className={`flex flex-col items-center px-4 text-center ${i > 0 ? 'lg:border-s lg:border-stone' : ''} ${i === a.highlights.length - 1 ? 'max-sm:col-span-2' : ''}`}>
                  <Icon className="size-10 text-gold-deep" strokeWidth={1.3} aria-hidden="true" />
                  <span className="font-title mt-4 text-[1.3rem] text-fg">{h.value}</span>
                  <span className="mt-1 max-w-[18ch] text-[0.88rem] leading-relaxed text-muted">{h.label}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Mission & vision ---------- */}
      <section aria-label={`${a.mission.title} · ${a.vision.title}`} className="pb-6">
        <div className="container-site">
          <div data-anim="stagger" className="grid gap-px overflow-hidden rounded-[1.25rem] border border-stone bg-sand/70 lg:grid-cols-2">
            {[
              { icon: Target, ...a.mission },
              { icon: Eye, ...a.vision },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title} className={`flex gap-5 p-7 sm:p-9 ${i === 1 ? 'border-stone max-lg:border-t lg:border-s' : ''}`}>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cream text-gold-deep ring-1 ring-gold/35 ring-offset-2 ring-offset-sand">
                  <Icon className="size-7" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-title text-[1.4rem] text-fg">{title}</h2>
                  <p className="mt-2 leading-[1.9] text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Approach & values ---------- */}
      <section aria-label={`${a.approach.title} · ${a.values.title}`} className="pb-16 pt-6 lg:pb-20">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <article data-anim="fade-up" className="relative isolate flex min-h-[22rem] overflow-hidden rounded-[1.25rem] bg-ink text-ivory lg:col-span-7">
            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <Picture pic={images.about.approach} sizes="(min-width: 1024px) 58vw, 100vw" alt="" data-parallax className="size-full object-cover object-[30%_50%]" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 from-ink/95 via-ink/80 to-ink/20 ltr:bg-gradient-to-r rtl:bg-gradient-to-l max-sm:bg-ink/75 max-sm:bg-none" />
            <div className="flex max-w-[30rem] flex-col justify-center p-7 sm:p-10">
              <h2 className="font-title flex items-center gap-3 text-[1.6rem] text-ivory">
                <Settings2 className="size-8 text-gold" strokeWidth={1.3} aria-hidden="true" />
                {a.approach.title}
              </h2>
              <p className="mt-4 leading-[1.95] text-ivory/80">{a.approach.text}</p>
            </div>
            <span className="sr-only">{a.approach.imageAlt}</span>
          </article>

          <article data-anim="fade-up" className="relative isolate flex flex-col overflow-hidden rounded-[1.25rem] bg-ink p-7 text-ivory sm:p-10 lg:col-span-5">
            <div aria-hidden="true" className="khatam absolute inset-0 -z-10 opacity-[0.05]" />
            <h2 className="font-title flex items-center gap-3 text-[1.6rem] text-ivory">
              <Gem className="size-8 text-gold" strokeWidth={1.3} aria-hidden="true" />
              {a.values.title}
            </h2>
            <ul data-anim="stagger" className="my-auto grid grid-cols-2 gap-x-4 gap-y-7 pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {a.values.items.map((v, i) => {
                const Icon = VALUE_ICONS[i] ?? BadgeCheck
                return (
                  <li key={v} className="flex flex-col items-center text-center">
                    <span className="grid size-[4.5rem] place-items-center rounded-full border border-gold/60 text-gold">
                      <Icon className="size-8" strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <span className="font-title mt-3 text-[1rem] text-ivory">{v}</span>
                  </li>
                )
              })}
            </ul>
          </article>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section aria-labelledby="team-title" className="pb-16 lg:pb-20">
        <div className="container-site">
          <SectionTitle id="team-title" title={a.team.title} lead={a.team.text} />
          <ul data-anim="stagger" className="mt-10 grid gap-4 sm:grid-cols-[1.1fr_1fr_1.1fr] lg:mt-12 lg:gap-5">
            {images.about.team.map((pic, i) => (
              <li key={i}>
                <div data-anim="img-reveal" className="relative h-[clamp(12rem,17vw,18rem)] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                  <Picture pic={pic} sizes="(min-width: 640px) 33vw, 100vw" alt={a.team.imageAlts[i]} className="size-full object-cover transition-[scale] duration-[1.1s] ease-[var(--ease-out-expo)] can-hover:hover:scale-[1.04]" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Let us help ---------- */}
      <section aria-labelledby="help-title" className="pb-16 lg:pb-20">
        <div className="container-site">
          <div data-anim="card" className="grid overflow-hidden rounded-[1.5rem] border border-stone bg-white shadow-[var(--shadow-lift)] lg:grid-cols-12">
            <ul data-anim="stagger" className="grid content-center gap-3 p-6 sm:grid-cols-3 sm:p-8 lg:col-span-7">
              {a.help.items.map((item, i) => {
                const Icon = HELP_ICONS[i]
                return (
                  <li key={item.title} className="flex items-center gap-4 rounded-[var(--radius-card)] border border-stone bg-ivory/60 p-4 sm:flex-col sm:text-center">
                    <span className="grid size-14 shrink-0 place-items-center rounded-[0.9rem] bg-cream text-gold-deep ring-1 ring-inset ring-gold/25">
                      <Icon className="size-7" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-title block text-[1.02rem] text-fg">{item.title}</span>
                      <span className="mt-0.5 block text-[0.85rem] text-muted">{item.text}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="relative isolate overflow-hidden bg-ink p-7 text-ivory sm:p-10 lg:col-span-5">
              <div aria-hidden="true" className="absolute inset-0 -z-10">
                <Picture pic={images.ctaBand} sizes="(min-width: 1024px) 40vw, 100vw" alt="" className="size-full object-cover object-[50%_65%] opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
              </div>
              <h2 id="help-title" data-anim="title" className="font-display text-h2 text-ivory">
                {a.help.title}
              </h2>
              <p data-anim="fade-up" className="mt-3 max-w-[36ch] text-ivory/80">
                {a.help.text}
              </p>
              <div data-anim="fade-up" className="mt-7">
                <ButtonLink href="/#consultation" variant="gold" size="lg">
                  <CalendarDays className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  {a.help.cta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
