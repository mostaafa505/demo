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
    const instance = new Lenis({ lerp: 0.1, anchors: { offset: -88 }, stopInertiaOnNavigate: true })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  // Route changes start at the top, or at the requested section.
  useEffect(() => {
    if (!lenis) return
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        requestAnimationFrame(() => lenis.scrollTo(target as HTMLElement, { offset: -88 }))
        return
      }
    }
    lenis.scrollTo(0, { immediate: true, force: true })
  }, [pathname, hash, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
