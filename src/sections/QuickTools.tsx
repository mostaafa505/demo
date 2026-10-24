import { CalendarCheck, ClipboardCheck, LockKeyhole } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { ButtonLink } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const card = {
  '--spotlight-card-surface': '#FFFFFF',
  '--spotlight-card-border': 'var(--color-stone)',
  '--spotlight-card-shadow': 'var(--shadow-card)',
} as React.CSSProperties

function Tool({ icon, title, text, children, badge, muted, extra }: { icon: ReactNode; title: string; text: string; children: ReactNode; badge?: string; muted?: boolean; extra?: ReactNode }) {
  return (
    <SpotlightCard theme="light" spotlightColor="#C9A45C" intensity={0.45} spotlightSize={260} borderGlow={0.9} style={card} className="h-full">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className={`grid size-14 shrink-0 place-items-center rounded-[14px] ${muted ? 'bg-sand text-muted' : 'bg-cream text-gold-deep'} ring-1 ring-inset ring-gold/20 [&_svg]:size-7`}>{icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className={`font-title text-[1.08rem] ${muted ? 'text-fg/75' : 'text-fg'}`}>{title}</h3>
              {badge && <span className="shrink-0 rounded-full bg-sand px-2.5 py-0.5 text-[0.72rem] font-semibold text-gold-ink ring-1 ring-inset ring-gold/30">{badge}</span>}
            </div>
            <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{text}</p>
            {extra}
          </div>
        </div>
        <div className="mt-5 flex justify-center pt-1 sm:mt-auto sm:pt-5">{children}</div>
      </div>
    </SpotlightCard>
  )
}

export function QuickTools() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const tools = t.tools

  return (
    <section ref={ref} id="tools" className="bg-ivory pb-16 pt-6 lg:pb-20">
      <div className="container-site">
        <Panel id="tools-title" title={tools.title} lead={tools.lead}>
          <ul data-reveal-group className="grid gap-4 md:grid-cols-3 md:gap-5">
            <li data-reveal-item>
              <Tool icon={<CalendarCheck strokeWidth={1.4} aria-hidden="true" />} title={tools.booking.title}
                text={tools.booking.text}
                extra={
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {tools.booking.methods.map((m) => (
                      <li key={m} className="rounded-full bg-cream px-2.5 py-0.5 text-[0.75rem] font-medium text-gold-ink ring-1 ring-inset ring-gold/25">
                        {m}
                      </li>
                    ))}
                  </ul>
                }
              >
                <ButtonLink href="/#consultation" variant="outline-dark" size="sm" className="w-full max-w-60">
                  {tools.booking.cta}
                </ButtonLink>
              </Tool>
            </li>
            <li data-reveal-item id="assess" className="scroll-mt-40">
              <Tool icon={<ClipboardCheck strokeWidth={1.4} aria-hidden="true" />} title={tools.assess.title} text={tools.assess.text}>
                <ButtonLink href="/assessment" variant="outline-dark" size="sm" className="w-full max-w-60">
                  {tools.assess.cta}
                </ButtonLink>
              </Tool>
            </li>
            <li data-reveal-item>
              <Tool icon={<LockKeyhole strokeWidth={1.4} aria-hidden="true" />} title={tools.portal.title} text={tools.portal.text} badge={tools.portal.badge} muted>
                <span aria-disabled="true" className="inline-flex h-9 w-full max-w-60 items-center justify-center rounded-[var(--radius-btn)] border border-dashed border-gold/40 text-[0.82rem] font-semibold text-muted">
                  {tools.portal.cta}
                </span>
              </Tool>
            </li>
          </ul>
        </Panel>
      </div>
    </section>
  )
}
