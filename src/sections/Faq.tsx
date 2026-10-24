import { Plus } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { Panel } from '../components/ui/Panel'
import { SmartLink } from '../components/ui/SmartLink'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { useAnim } from '../motion/useAnim'

const chip = 'inline-flex h-8 items-center rounded-full border border-gold-deep/50 bg-white px-4 text-[0.8rem] font-semibold text-gold-ink transition-colors hover:bg-cream'

export function Faq() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useAnim(ref)
  const items = t.faq.items
  const half = Math.ceil(items.length / 2)

  return (
    <section ref={ref} id="faq" className="bg-ivory pb-16 pt-6 lg:pb-20">
      <div className="container-site">
        <Panel
          id="faq-title"
          title={t.faq.title}
          lead={t.faq.lead}
          action={
            <SmartLink href="/knowledge/faq" className={chip}>
              {t.faq.viewAll}
            </SmartLink>
          }
        >
          <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
            {[items.slice(0, half), items.slice(half)].map((col, c) => (
              <ul key={c} data-anim="stagger" className="space-y-3">
                {col.map((item, i) => {
                  const idx = c * half + i
                  return <FaqItem key={item.q} q={item.q} a={item.a} open={open === idx} onToggle={() => setOpen(open === idx ? null : idx)} />
                })}
              </ul>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  )
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useGSAP(
    () => {
      const el = panelRef.current!
      const animate = !first.current && window.matchMedia(MOTION_OK).matches
      first.current = false
      if (!animate) return void gsap.set(el, { height: open ? 'auto' : 0 })
      gsap.to(el, { height: open ? 'auto' : 0, duration: open ? 0.55 : 0.4, ease: open ? 'power3.out' : 'power2.inOut', overwrite: true })
    },
    { dependencies: [open] },
  )

  return (
    <li className={`rounded-[var(--radius-card)] border bg-white shadow-[var(--shadow-card)] transition-colors duration-300 ${open ? 'border-gold/45' : 'border-stone'}`}>
      <h3>
        <button type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle} className="flex w-full items-center gap-4 px-5 py-4 text-start">
          <span className="flex-1 text-[0.95rem] font-semibold leading-relaxed text-fg">{q}</span>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? 'bg-gold-grad text-ink' : 'bg-cream text-gold-deep ring-1 ring-inset ring-gold/30'}`}>
            <Plus className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'rotate-45' : ''}`} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div ref={panelRef} id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="h-0 overflow-hidden">
        <p className="border-t border-stone px-5 pb-5 pt-4 text-[0.9rem] leading-relaxed text-muted">{a}</p>
      </div>
    </li>
  )
}
