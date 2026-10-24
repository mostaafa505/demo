import { createContext, useContext, useLayoutEffect, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ar } from '../content/ar'
import { en } from '../content/en'
import type { Content, Lang } from '../content/types'

interface LanguageValue {
  lang: Lang
  dir: 'rtl' | 'ltr'
  t: Content
  /** Prefixes an internal path with the active language (`/en/...`). */
  localize: (href: string) => string
  /** The same page in the other language. */
  switchHref: string
}

const LanguageContext = createContext<LanguageValue | null>(null)

const isExternal = (href: string) => /^(https?:|tel:|mailto:|#)/.test(href)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const lang: Lang = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar'

  const value = useMemo<LanguageValue>(() => {
    const t = lang === 'en' ? en : ar
    const prefix = (path: string) => (lang === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path)
    const localize = (href: string) => {
      if (isExternal(href)) return href
      const [path, anchor] = href.split('#')
      return prefix(path || '/') + (anchor ? `#${anchor}` : '')
    }
    const basePath = lang === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname
    const switchHref = (lang === 'en' ? basePath : basePath === '/' ? '/en' : `/en${basePath}`) + hash
    return { lang, dir: lang === 'ar' ? 'rtl' : 'ltr', t, localize, switchHref }
  }, [lang, pathname, hash])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = value.dir
    document.title = value.t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t.meta.description)
  }, [lang, value])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
