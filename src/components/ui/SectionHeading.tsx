import type { ReactNode } from 'react'
import { useLang } from '../../i18n/LanguageProvider'

interface Props {
  id: string
  eyebrow: string
  title: string
  lead?: string
  action?: ReactNode
  tone?: 'light' | 'dark'
  /** split: heading on the start side, lead + action on the end side (desktop). */
  layout?: 'split' | 'stacked'
  className?: string
}

/**
 * Section opener. The eyebrow is the section name in the *other* language
 * (English over Arabic headings, Arabic over English ones).
 */
export function SectionHeading({ id, eyebrow, title, lead, action, tone = 'light', layout = 'split', className = '' }: Props) {
  const { lang } = useLang()
  const dark = tone === 'dark'
  const eyebrowLang = lang === 'ar' ? 'en' : 'ar'

  const heading = (
    <div>
      <p lang={eyebrowLang} data-reveal="fade" className={`flex items-center gap-3 ${dark ? 'text-gold' : 'text-gold-deep'} ${eyebrowLang === 'en' ? 'eyebrow' : 'eyebrow-ar'}`}>
        <span data-reveal="rule" aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-70" />
        {eyebrow}
      </p>
      <h2 id={id} data-reveal="lines" className={`font-heading text-h2 mt-4 ${dark ? 'text-ivory' : 'text-fg'}`}>
        {title}
      </h2>
    </div>
  )

  if (layout === 'stacked') {
    return (
      <div className={`max-w-3xl ${className}`}>
        {heading}
        {lead && (
          <p data-reveal="fade" className={`text-lead mt-5 max-w-[58ch] ${dark ? 'text-ivory/70' : 'text-muted'}`}>
            {lead}
          </p>
        )}
        {action && <div data-reveal="fade" className="mt-7">{action}</div>}
      </div>
    )
  }

  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div className="lg:col-span-7">{heading}</div>
      {(lead || action) && (
        <div className="flex flex-col gap-5 lg:col-span-5 lg:items-start">
          {lead && (
            <p data-reveal="fade" className={`max-w-[52ch] ${dark ? 'text-ivory/70' : 'text-muted'}`}>
              {lead}
            </p>
          )}
          {action && <div data-reveal="fade">{action}</div>}
        </div>
      )}
    </div>
  )
}
