import { Star } from 'lucide-react'
import { useRef, useState, type PointerEvent } from 'react'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TextLink } from '../components/ui/TextLink'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, SplitText, useGSAP } from '../motion/gsap'
import { useReveal } from '../motion/useReveal'

const pad = (n: number) => String(n).padStart(2, '0')

export function Testimonials() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const items = t.testimonials.items
  const [index, setIndex] = useState(0)
  const busy = useRef(false)
  const dragX = useRef<number | null>(null)
  useReveal(ref)

  // Incoming quote: masked line reveal (Arabic-safe), meta follows.
  useGSAP(
    () => {
      if (!window.matchMedia(MOTION_OK).matches) return
      const quote = stageRef.current?.querySelector('[data-quote]')
      if (!quote) return
      const split = SplitText.create(quote, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      gsap.from(split.lines, { yPercent: 110, duration: 1, stagger: 0.07, ease: 'expo.out' })
      gsap.from('[data-quote-meta]', { autoAlpha: 0, y: 10, duration: 0.6, delay: 0.25 })
      return () => split.revert()
    },
    { dependencies: [index, lang], scope: stageRef, revertOnUpdate: true },
  )

  const go = (dir: 1 | -1) => {
    if (busy.current) return
    const next = (index + dir + items.length) % items.length
    if (!window.matchMedia(MOTION_OK).matches) return setIndex(next)
    busy.current = true
    gsap.to(stageRef.current!.querySelectorAll('[data-quote], [data-quote-meta]'), {
      autoAlpha: 0,
      y: -14,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(stageRef.current!.querySelectorAll('[data-quote], [data-quote-meta]'), { clearProps: 'all' })
        setIndex(next)
        busy.current = false
      },
    })
  }

  // Swipe on touch: in RTL, swiping toward the start means "next".
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') dragX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < 50) return
    const forward = lang === 'ar' ? dx > 0 : dx < 0
    go(forward ? 1 : -1)
  }

  const item = items[index]

  return (
    <section ref={ref} id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-hidden bg-navy py-20 text-ivory lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="testimonials-title" tone="dark" layout="stacked" eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} lead={t.testimonials.lead} />
          <div data-reveal="fade" className="mt-10 flex items-center gap-5">
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={t.a11y.previous} className={navBtn}>
                <ForwardArrow className="size-5 rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.a11y.next} className={navBtn}>
                <ForwardArrow className="size-5" />
              </button>
            </div>
            <p dir="ltr" className="font-[family-name:var(--font-latin)] text-[0.85rem] tracking-[0.2em] text-ivory/50" aria-hidden="true">
              <span className="text-gold-light">{pad(index + 1)}</span> / {pad(items.length)}
            </p>
          </div>
          <div data-reveal="fade" className="mt-10 hidden lg:block">
            <TextLink href="/testimonials" tone="dark">
              {t.testimonials.viewAll}
            </TextLink>
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <svg aria-hidden="true" viewBox="0 0 64 48" className="h-16 w-20 text-gold lg:h-24 lg:w-32 rtl:-scale-x-100" fill="currentColor">
            <path d="M0 48V28.8C0 12.6 8.4 2.8 25.2 0l2.4 5.6C19.2 8 14.8 13.2 14.4 21.2H26V48H0Zm36 0V28.8C36 12.6 44.4 2.8 61.2 0l2.4 5.6C55.2 8 50.8 13.2 50.4 21.2H62V48H36Z" opacity=".9" />
          </svg>
          <div
            ref={stageRef}
            aria-live="polite"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="mt-6 min-h-[17rem] touch-pan-y select-none sm:min-h-[14rem] lg:mt-8"
          >
            <blockquote key={`${lang}-${index}`}>
              <p data-quote className="font-quote text-[clamp(1.35rem,1.05rem+1.25vw,2.15rem)] leading-[1.6] text-ivory ltr:leading-[1.35]">
                {item.quote}
              </p>
              <footer data-quote-meta className="mt-10 flex flex-wrap items-center gap-5 border-t border-gold/15 pt-6">
                <span className="grid size-14 place-items-center rounded-full border border-gold/50 font-[family-name:var(--font-latin-display)] text-[1.1rem] font-semibold text-gold-light">
                  {item.initials}
                </span>
                <div className="me-auto">
                  <cite className="block not-italic text-[1rem] font-semibold text-ivory">{item.name}</cite>
                  <span className="text-[0.85rem] text-ivory/55">{item.city}</span>
                </div>
                <span className="rounded-[4px] border border-gold/30 px-2.5 py-1 text-[0.78rem] text-gold-light">{item.matter}</span>
                <span role="img" aria-label={t.a11y.rating} className="flex gap-1 text-gold">
                  {Array.from({ length: item.rating }, (_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={1} aria-hidden="true" />
                  ))}
                </span>
              </footer>
            </blockquote>
          </div>

          {/* Progress */}
          <div className="mt-10 flex gap-2" aria-hidden="true">
            {items.map((_, i) => (
              <span key={i} className="h-px flex-1 overflow-hidden bg-ivory/15">
                <span className={`block h-full bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] ltr:origin-left rtl:origin-right ${i <= index ? 'scale-x-100' : 'scale-x-0'}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const navBtn =
  'grid size-12 place-items-center rounded-full border border-ivory/20 text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink'
