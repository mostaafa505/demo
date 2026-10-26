import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import { ar } from './content/ar'
import { en } from './content/en'
import { LanguageProvider } from './i18n/LanguageProvider'
import { SmoothScroll } from './motion/SmoothScroll'

/** Build-time render of a route to static HTML (see scripts/prerender.mjs). */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <LanguageProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </LanguageProvider>
      </StaticRouter>
    </StrictMode>,
  )
  const lang = url === '/en' || url.startsWith('/en/') ? 'en' : 'ar'
  const t = lang === 'en' ? en : ar
  const meta = /\/about$/.test(url) ? t.about.meta : /\/contact$/.test(url) ? t.contact.meta : t.meta
  return { html, lang, dir: lang === 'ar' ? 'rtl' : 'ltr', title: meta.title, description: meta.description }
}
