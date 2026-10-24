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
  const isHome = pathname === '/' || pathname === '/en' || pathname === '/en/'

  // Keying by language remounts every section, so SplitText and ScrollTrigger
  // re-measure for the new direction and typeface.
  return (
    <div key={lang}>
      <Header overlay={isHome} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<Home />} />
          <Route path="*" element={<Placeholder key={pathname} />} />
        </Routes>
      </main>
      <Footer showCta={!isHome} />
      <MobileActionBar />
    </div>
  )
}
