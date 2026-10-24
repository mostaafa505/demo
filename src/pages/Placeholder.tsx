import { useRef } from 'react'
import { ColumnMark } from '../components/brand/Logo'
import { ForwardArrow } from '../components/ui/Arrow'
import { ButtonLink } from '../components/ui/Button'
import { useLang } from '../i18n/LanguageProvider'
import { useReveal } from '../motion/useReveal'

/** Stand-in for pages planned in later phases. */
export function Placeholder() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="grid min-h-[80svh] place-items-center bg-ivory px-4 pb-24 pt-[calc(var(--header-h-compact)+6rem)] xl:pt-[calc(60px+6rem)]">
      <div className="max-w-xl text-center">
        <ColumnMark className="mx-auto h-14 w-12" />
        <h1 data-reveal="lines" className="font-heading text-h2 mt-8 text-fg">
          {t.placeholder.title}
        </h1>
        <p data-reveal="fade" className="mt-5 text-muted">
          {t.placeholder.text}
        </p>
        <div data-reveal="fade" className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="ink" size="md">
            {t.placeholder.back}
          </ButtonLink>
          <ButtonLink href="/#consultation" variant="gold" size="md">
            {t.header.book}
            <ForwardArrow className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
