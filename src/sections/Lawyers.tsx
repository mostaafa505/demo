import { useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartLink } from '../components/ui/SmartLink'
import { TextLink } from '../components/ui/TextLink'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

/** Portraits sit in warm monochrome and come to colour on hover. */
const portrait =
  'size-full object-cover object-[50%_25%] [filter:grayscale(0.85)_sepia(0.18)_contrast(1.02)] transition-[filter,scale] duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/lawyer:[filter:none] group-hover/lawyer:scale-[1.03]'

export function Lawyers() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const [lead, ...team] = t.lawyers.items
  useReveal(ref)

  return (
    <section ref={ref} id="lawyers" aria-labelledby="lawyers-title" className="bg-sand py-20 lg:py-32">
      <div className="container-site">
        <SectionHeading id="lawyers-title" eyebrow={t.lawyers.eyebrow} title={t.lawyers.title} lead={t.lawyers.lead} action={<TextLink href="/lawyers">{t.lawyers.viewTeam}</TextLink>} />
      </div>

      <div className="mt-12 lg:container-site lg:mt-16">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-8 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {/* Founder — featured */}
          <li className="w-[84%] shrink-0 snap-start sm:w-[60%] lg:col-span-6 lg:w-auto">
            <SmartLink href={lead.href} className="group/lawyer grid h-full overflow-hidden rounded-[var(--radius-card)] bg-ink text-ivory shadow-[var(--shadow-lift)] lg:grid-cols-2">
              <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
                <img src={images.lawyers[lead.slug]} alt={lead.imageAlt} loading="lazy" className={portrait} />
              </div>
              <div className="flex flex-col p-6 lg:p-8">
                <span aria-hidden="true" className="h-px w-10 bg-gold-grad" />
                <h3 className="font-heading mt-5 text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight">{lead.name}</h3>
                <p className="mt-2 text-[0.9rem] font-medium text-gold-light">{lead.role}</p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ivory/65">{lead.bio}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-gold-light lg:mt-auto lg:pt-6">
                  {t.lawyers.viewProfile}
                  <ForwardArrow className="size-4 transition-transform duration-500 group-hover/lawyer:translate-x-1 rtl:group-hover/lawyer:-translate-x-1" />
                </span>
              </div>
            </SmartLink>
          </li>

          {team.map((member) => (
            <li key={member.slug} className="w-[70%] shrink-0 snap-start sm:w-[42%] lg:col-span-3 lg:w-auto">
              <SmartLink href={member.href} className="group/lawyer flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-gold/15 bg-white shadow-[var(--shadow-card)]">
                <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden">
                  <img src={images.lawyers[member.slug]} alt={member.imageAlt} loading="lazy" className={portrait} />
                </div>
                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <h3 className="font-title text-[1.15rem] leading-tight text-fg ltr:text-[1.4rem]">{member.name}</h3>
                  <p className="mt-1.5 text-[0.85rem] font-medium text-gold-deep">{member.role}</p>
                  <p className="mt-2 text-[0.85rem] text-muted">{member.bio}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.85rem] font-semibold text-fg/80 transition-colors group-hover/lawyer:text-gold-deep">
                    {t.lawyers.viewProfile}
                    <ForwardArrow className="size-4" />
                  </span>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
