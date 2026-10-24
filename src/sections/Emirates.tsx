import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { images } from '../assets/images'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartLink } from '../components/ui/SmartLink'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

const SPANS = ['lg:col-span-6', 'lg:col-span-3', 'lg:col-span-3']

export function Emirates() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="emirates" aria-labelledby="emirates-title" className="bg-ivory py-20 lg:py-32">
      <div className="container-site">
        <SectionHeading id="emirates-title" eyebrow={t.emirates.eyebrow} title={t.emirates.title} lead={t.emirates.lead} />
      </div>

      <div className="mt-12 lg:container-site lg:mt-16">
        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-8 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {t.emirates.items.map((city, i) => (
            <li key={city.slug} className={`w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto ${SPANS[i]}`}>
              <SmartLink
                href={city.href}
                className="group/city relative block h-[26rem] overflow-hidden rounded-[var(--radius-card)] bg-navy text-ivory sm:h-[30rem] lg:h-[34rem]"
              >
                <div data-reveal="image" className="absolute inset-0">
                  <img
                    src={images.cities[city.slug]}
                    alt={city.imageAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover/city:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/0 transition-opacity duration-700 can-hover:opacity-80 can-hover:group-hover/city:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <span className="flex items-center gap-2 text-[0.8rem] text-gold-light">
                    <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
                    <span lang="en" className="eyebrow !tracking-[0.18em]">{city.slug.replace('-', ' ')}</span>
                  </span>
                  <h3 className="font-heading mt-3 text-[clamp(2rem,1.6rem+1.4vw,2.9rem)] leading-none">{city.name}</h3>
                  <span aria-hidden="true" className="mt-5 block h-px w-12 bg-gold-grad transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover/city:w-24" />
                  <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] can-hover:grid-rows-[0fr] can-hover:opacity-0 can-hover:group-hover/city:grid-rows-[1fr] can-hover:group-hover/city:opacity-100 can-hover:group-focus-visible/city:grid-rows-[1fr] can-hover:group-focus-visible/city:opacity-100">
                    <div className="overflow-hidden">
                      <p className="max-w-[40ch] pt-4 text-[0.92rem] leading-relaxed text-ivory/75">{city.text}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-gold-light">
                        {city.cta}
                        <ForwardArrow className="size-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
