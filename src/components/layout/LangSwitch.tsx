import { Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageProvider'

export function LangSwitch({ compact = false, tone = 'dark' }: { compact?: boolean; tone?: 'dark' | 'light' }) {
  const { t, switchHref } = useLang()
  const base = tone === 'dark' ? 'text-ivory/60' : 'text-muted'
  if (compact) {
    return (
      <Link
        to={switchHref}
        aria-label={t.a11y.switchLanguage}
        hrefLang={t.langSwitch.other.toLowerCase()}
        className={`grid h-[34px] min-w-[34px] place-items-center px-1 font-[family-name:var(--font-latin)] text-[0.78rem] font-semibold tracking-[0.12em] transition-colors hover:text-gold-light ${tone === 'dark' ? 'text-ivory' : 'text-fg'}`}
      >
        {t.langSwitch.other}
      </Link>
    )
  }
  return (
    <div className={`flex items-center gap-2 font-[family-name:var(--font-latin)] text-[0.8rem] font-semibold tracking-[0.12em] ${base}`}>
      <Globe className="size-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <span dir="ltr" className="flex items-center gap-2">
        {(['AR', 'EN'] as const).map((code, i) => {
          const current = code === t.langSwitch.current
          return (
            <span key={code} className="flex items-center gap-2">
              {i === 1 && <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />}
              {current ? (
                <span aria-current="true" className="text-gold-light">
                  {code}
                </span>
              ) : (
                <Link to={switchHref} hrefLang={code.toLowerCase()} aria-label={t.a11y.switchLanguage} className="transition-colors hover:text-ivory">
                  {code}
                </Link>
              )}
            </span>
          )
        })}
      </span>
    </div>
  )
}
