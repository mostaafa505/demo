import { Award, Globe2, ListChecks, LockKeyhole } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import CountUp from '../components/reactbits/CountUp'
import { SectionHeading } from '../components/ui/SectionHeading'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const PILLAR_ICONS = [Award, ListChecks, LockKeyhole, Globe2]

export function WhyUs() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="why-us" aria-labelledby="why-title" className="relative isolate overflow-hidden bg-ink py-20 text-ivory lg:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[70%] overflow-hidden">
        <img data-parallax="6" src={images.skylineDusk} alt="" loading="lazy" className="absolute inset-x-0 -bottom-[12%] h-[130%] w-full object-cover object-bottom opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink/40" />
      </div>

      <div className="container-site">
        <SectionHeading id="why-title" tone="dark" eyebrow={t.why.eyebrow} title={t.why.title} lead={t.why.lead} />

        <ul data-reveal-group className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.why.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i]
            return (
              <li key={p.title} data-reveal-item className="bg-ink/95 p-7 lg:p-8">
                <Icon className="size-7 text-gold" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="font-title mt-8 text-[1.15rem] leading-snug text-ivory ltr:text-[1.35rem]">{p.title}</h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-ivory/60">{p.text}</p>
              </li>
            )
          })}
        </ul>

        <dl data-reveal-group className="mt-16 grid grid-cols-2 gap-y-10 lg:mt-20 lg:grid-cols-4">
          {t.why.stats.map((s, i) => (
            <div key={s.label} data-reveal-item className={`flex flex-col gap-2 px-2 sm:px-6 ${i % 2 === 1 ? 'border-s border-gold/20' : ''} lg:border-s lg:border-gold/20 ${i === 0 ? 'lg:border-s-0 lg:ps-0' : ''}`}>
              <dt className="order-2 text-[0.9rem] text-ivory/60">{s.label}</dt>
              <dd dir="ltr" className="order-1 font-[family-name:var(--font-latin)] text-[clamp(2.5rem,1.8rem+2.8vw,4.2rem)] font-extralight leading-none tracking-[-0.02em] text-gold-light rtl:text-end">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} separator={s.separator ?? ''} mode="roll" easing="expo" duration={2} trigger="view" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
