import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger } from './gsap'

const LenisContext = createContext<Lenis | null>(null)

/**
 * One animation loop for the whole site: Lenis is driven by gsap.ticker and
 * feeds ScrollTrigger on every scroll (see .claude/skills/web-motion).
 * Lenis honours prefers-reduced-motion on its own (respectReducedMotion).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out: settles without drift
      anchors: { offset: -88 },
      stopInertiaOnNavigate: true,
    })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    // Re-measure once fonts and images are in (photos sit in fixed-ratio frames, so lazy
    // images arriving later never move the layout and need no refresh of their own).
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  // Route changes start at the top, or at the requested section, then re-measure triggers.
  useEffect(() => {
    if (!lenis) return
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { offset: -88 }))
        return () => cancelAnimationFrame(refresh)
      }
    }
    lenis.scrollTo(0, { immediate: true, force: true })
    return () => cancelAnimationFrame(refresh)
  }, [pathname, hash, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
