import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { LanguageProvider } from './i18n/LanguageProvider'
import { SmoothScroll } from './motion/SmoothScroll'
import './motion/gsap'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
