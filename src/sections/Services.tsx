import { useRef } from 'react'
import { images } from '../assets/images'
import { ServiceIcon } from '../components/brand/ServiceIcon'
import { ForwardArrow } from '../components/ui/Arrow'
import { Medallion } from '../components/ui/Medallion'
import { Picture } from '../components/ui/Picture'
import { SectionTitle } from '../components/ui/SectionTitle'
import { SmartLink } from '../components/ui/SmartLink'
import { TextLink } from '../components/ui/TextLink'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

export function Services() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section ref={ref} id="services" aria-labelledby="services-title" className="bg-ivory pb-16 pt-8 lg:pb-20 lg:pt-6">
      <div className="container-site">
        <SectionTitle id="services-title" title={t.services.title} lead={t.services.lead} action={<TextLink href="/services">{t.services.viewAll}</TextLink>} />

        <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 lg:mt-12 lg:gap-6">
          {t.services.items.map((item) => (
            <li key={item.slug} data-reveal-item>
              <SmartLink
                href={item.href}
                className="group/card flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-stone bg-white shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] can-hover:hover:-translate-y-1 can-hover:hover:border-gold/45 can-hover:hover:shadow-[var(--shadow-lift)]"
              >
                <span className="relative block aspect-[16/11] overflow-hidden">
                  <span data-drift className="block size-full">
                    <Picture
                      pic={images.services[item.image]}
                      sizes="(min-width: 1320px) 300px, (min-width: 768px) 24vw, 46vw"
                      alt=""
                      className="size-full object-cover transition-[scale] duration-[1.1s] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.06]"
                    />
                  </span>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" />
                </span>
                <span className="relative flex flex-1 flex-col items-center px-3 pb-4 pt-8 text-center sm:px-5 sm:pb-5">
                  <Medallion size="md" className="absolute -top-6 left-1/2 -translate-x-1/2 transition-colors duration-500 group-hover/card:bg-gold-grad group-hover/card:text-ink">
                    <ServiceIcon name={item.icon} />
                  </Medallion>
                  <span className="font-title text-[0.98rem] text-fg sm:text-[1.08rem]">{item.title}</span>
                  <span className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-muted sm:text-[0.88rem]">{item.description}</span>
                  <span className="mt-auto pt-4 sm:w-full">
                    <span className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-cream text-[0.84rem] font-semibold text-gold-ink ring-1 ring-inset ring-gold/25 transition-colors duration-300 group-hover/card:bg-gold-grad group-hover/card:text-ink group-hover/card:ring-transparent max-sm:h-8 max-sm:px-4">
                      {t.services.explore}
                      <ForwardArrow className="size-3.5 max-sm:hidden" />
                    </span>
                  </span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
