import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import { SmoothScroll } from './motion/SmoothScroll'
import './motion/gsap'
import './styles/index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

// Hydrate the pre-rendered page when it is the one being visited; other routes render fresh.
const prerendered = container.dataset.prerendered
const path = location.pathname.replace(/\/$/, '') || '/'
if (prerendered && prerendered === path) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
