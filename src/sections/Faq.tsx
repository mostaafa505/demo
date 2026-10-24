import { Plus } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TextLink } from '../components/ui/TextLink'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { useReveal } from '../motion/useReveal'

export function Faq() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(0)
  useReveal(ref)
  const items = t.faq.items
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]

  return (
    <section ref={ref} id="faq" aria-labelledby="faq-title" className="bg-sand py-20 lg:py-32">
      <div className="container-site">
        <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead} action={<TextLink href="/knowledge/faq">{t.faq.viewAll}</TextLink>} />
        <div className="mt-12 grid gap-x-12 lg:mt-16 lg:grid-cols-2">
          {columns.map((col, c) => (
            <ul key={c} data-reveal-group className={`border-t hairline ${c === 1 ? 'max-lg:border-t-0' : ''}`}>
              {col.map((item, i) => {
                const idx = c * half + i
                return <FaqItem key={item.q} q={item.q} a={item.a} open={open === idx} onToggle={() => setOpen(open === idx ? null : idx)} />
              })}
            </ul>
          ))}
        </div>
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
      if (!animate) {
        gsap.set(el, { height: open ? 'auto' : 0 })
        return
      }
      gsap.to(el, { height: open ? 'auto' : 0, duration: open ? 0.65 : 0.45, ease: open ? 'expo.out' : 'power3.inOut', overwrite: true })
      if (open) gsap.fromTo(el.firstElementChild, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.1 })
    },
    { dependencies: [open] },
  )

  return (
    <li data-reveal-item className="border-b hairline">
      <h3>
        <button type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle} className="group/faq flex w-full items-start gap-5 py-6 text-start">
          <span className={`flex-1 text-[1.02rem] font-semibold leading-relaxed transition-colors ${open ? 'text-fg' : 'text-fg/85 group-hover/faq:text-fg'}`}>{q}</span>
          <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${open ? 'border-gold bg-gold text-ink' : 'border-gold/40 text-gold-deep'}`}>
            <Plus className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'rotate-45' : ''}`} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div ref={panelRef} id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="h-0 overflow-hidden" hidden={false}>
        <p className="max-w-[60ch] pb-6 pe-12 text-[0.95rem] leading-relaxed text-muted">{a}</p>
      </div>
    </li>
  )
}
