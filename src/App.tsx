import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Intro } from './components/brand/Intro'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileActionBar } from './components/layout/MobileActionBar'
import { useLang } from './i18n/LanguageProvider'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'

export function App() {
  const { lang } = useLang()
  const { pathname } = useLocation()

  // Animation start states (styles/index.css) apply only once the app is running; the inline
  // script in index.html adds the class before first paint and lifts it if the app never starts.
  useLayoutEffect(() => {
    const w = window as Window & { __appReady?: boolean; __animFallback?: boolean }
    w.__appReady = true
    // If the inline fallback already revealed everything (very slow load), keep it that way.
    if (!w.__animFallback) document.documentElement.classList.add('js-anim')
  }, [])

  // Keying by language remounts every section, so split headings and ScrollTrigger
  // re-measure for the new direction and typeface.
  return (
    <div key={lang}>
      <Intro />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/en/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/en/contact" element={<Contact />} />
          <Route path="*" element={<Placeholder key={pathname} />} />
        </Routes>
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  )
}
