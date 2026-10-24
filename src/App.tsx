import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { useLang } from './i18n/LanguageProvider'
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'

export function App() {
  const { lang } = useLang()
  const { pathname } = useLocation()

  // Animation start states (styles/index.css) apply only once the app is running; the inline
  // script in index.html adds the class before first paint and lifts it if the app never starts.
  useLayoutEffect(() => {
    ;(window as Window & { __appReady?: boolean }).__appReady = true
    document.documentElement.classList.add('js-anim')
  }, [])

  // Keying by language remounts every section, so split headings and ScrollTrigger
  // re-measure for the new direction and typeface.
  return (
    <div key={lang}>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="*" element={<Placeholder key={pathname} />} />
        </Routes>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
