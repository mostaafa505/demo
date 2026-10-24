import { Building2, CalendarCheck, ClipboardCheck, LockKeyhole, PhoneCall, Video } from 'lucide-react'
import { useRef, useState } from 'react'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { ForwardArrow } from '../components/ui/Arrow'
import { ButtonLink } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const METHOD_ICONS = [Building2, PhoneCall, Video]
export const METHOD_EVENT = 'consultation:method'

const lightCard = {
  '--spotlight-card-surface': '#FFFFFF',
  '--spotlight-card-border': 'rgb(201 164 92 / 0.2)',
  '--spotlight-card-shadow': 'var(--shadow-card)',
} as React.CSSProperties

export function QuickTools() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const [method, setMethod] = useState(2)
  useReveal(ref)

  const pick = (i: number) => {
    setMethod(i)
    window.dispatchEvent(new CustomEvent(METHOD_EVENT, { detail: i }))
  }

  return (
    <section ref={ref} id="tools" aria-labelledby="tools-title" className="bg-sand py-20 lg:py-28">
      <div className="container-site">
        <SectionHeading id="tools-title" eyebrow={t.tools.eyebrow} title={t.tools.title} lead={t.tools.lead} />

        <div data-reveal-group className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          {/* Booking — the primary tool */}
          <div data-reveal-item className="md:col-span-2 lg:col-span-6">
            <SpotlightCard
              theme="dark"
              spotlightColor="#C9A45C"
              intensity={0.22}
              spotlightSize={320}
              borderGlow={0.7}
              style={{ '--spotlight-card-surface': '#0A0F1A', '--spotlight-card-border': 'rgb(201 164 92 / 0.25)', '--spotlight-card-shadow': 'var(--shadow-lift)' } as React.CSSProperties}
              className="h-full p-7 text-ivory sm:p-9"
            >
              <div className="flex h-full flex-col">
                <span className="grid size-12 place-items-center rounded-full border border-gold/40 text-gold">
                  <CalendarCheck className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="font-title text-h3 mt-6 !text-[1.5rem]">{t.tools.booking.title}</h3>
                <p className="mt-2 max-w-[42ch] text-ivory/65">{t.tools.booking.text}</p>
                <div role="radiogroup" aria-label={t.tools.booking.title} className="mt-7 grid grid-cols-3 gap-2 sm:max-w-md">
                  {t.tools.booking.methods.map((m, i) => {
                    const Icon = METHOD_ICONS[i]
                    const on = method === i
                    return (
                      <button
                        key={m}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => pick(i)}
                        className={`flex flex-col items-center gap-2 rounded-[var(--radius-btn)] border px-2 py-3.5 text-[0.85rem] font-medium transition-colors duration-300 ${
                          on ? 'border-gold bg-gold/12 text-gold-light' : 'border-ivory/12 text-ivory/70 hover:border-ivory/30 hover:text-ivory'
                        }`}
                      >
                        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                        {m}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <ButtonLink href="/#consultation" variant="gold" size="md">
                    {t.tools.booking.cta}
                    <ForwardArrow className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Assess first */}
          <div data-reveal-item id="assess" className="scroll-mt-28 lg:col-span-3">
            <SpotlightCard theme="light" spotlightColor="#C9A45C" intensity={0.5} borderGlow={0.8} style={lightCard} className="h-full p-7">
              <div className="flex h-full flex-col">
                <span className="grid size-12 place-items-center rounded-full border border-gold/40 text-gold-deep">
                  <ClipboardCheck className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="font-title text-h3 mt-6 text-fg">{t.tools.assess.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{t.tools.assess.text}</p>
                <ol className="mt-6 space-y-2.5 border-t hairline pt-5">
                  {t.tools.assess.steps.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-[0.88rem] text-fg/80">
                      <span dir="ltr" className="font-[family-name:var(--font-latin)] text-[0.75rem] font-semibold tracking-[0.1em] text-gold-deep">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <ButtonLink href="/assessment" variant="outline-dark" size="md">
                    {t.tools.assess.cta}
                    <ForwardArrow className="size-4" />
                  </ButtonLink>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Client portal — optional, later phase */}
          <div data-reveal-item className="lg:col-span-3">
            <SpotlightCard theme="light" spotlightColor="#C9A45C" intensity={0.35} borderGlow={0.5} style={{ ...lightCard, '--spotlight-card-surface': '#FBF8F2' } as React.CSSProperties} className="h-full p-7">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-fg/15 text-muted">
                    <LockKeyhole className="size-[22px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="rounded-[4px] border border-gold/50 px-2.5 py-1 text-[0.75rem] font-semibold text-gold-deep">{t.tools.portal.badge}</span>
                </div>
                <h3 className="font-title text-h3 mt-6 text-fg/80">{t.tools.portal.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{t.tools.portal.text}</p>
                <ul className="mt-6 space-y-2.5 border-t hairline pt-5">
                  {t.tools.portal.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[0.88rem] text-muted">
                      <LockKeyhole className="size-3.5 text-muted/60" strokeWidth={1.5} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <span aria-disabled="true" className="inline-flex h-11 items-center gap-2 text-[0.92rem] font-semibold text-muted/70">
                    {t.tools.portal.cta}
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  )
}
