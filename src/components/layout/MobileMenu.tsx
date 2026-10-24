import { CalendarDays, Mail, MapPin, Phone, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'
import { useLenis } from '../../motion/SmoothScroll'
import { Logo } from '../brand/Logo'
import { SocialIcon } from '../brand/SocialIcon'
import { ButtonLink } from '../ui/Button'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useLang()
  const lenis = useLenis()
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState<number | null>(null)

  // Pause page scroll while the overlay is open; return focus on close.
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      opener?.focus({ preventScroll: true })
    }
  }, [open, lenis, onClose])

  useGSAP(
    () => {
      const root = rootRef.current!
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        if (open) {
          gsap.set(root, { visibility: 'visible' })
          const tl = gsap.timeline()
          tl.fromTo(root, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut' })
            .fromTo('[data-mm-link]', { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.045, ease: 'expo.out' }, 0.35)
            .fromTo('[data-mm-fade]', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.6)
        } else {
          gsap.to(root, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.5,
            ease: 'expo.inOut',
            onComplete: () => gsap.set(root, { visibility: 'hidden' }),
          })
        }
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(root, { visibility: open ? 'visible' : 'hidden', clipPath: 'none' })
      })
    },
    { dependencies: [open], scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.a11y.mainNav}
      aria-hidden={!open}
      data-lenis-prevent
      className="invisible fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-ivory xl:hidden"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div className="container-site flex h-[4.5rem] shrink-0 items-center justify-between border-b border-gold/15">
        <SmartLink href="/" onClick={onClose} tabIndex={open ? 0 : -1}>
          <Logo variant="mobile" className="h-9" />
        </SmartLink>
        <div className="flex items-center gap-2">
          <LangSwitch compact />
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.a11y.closeMenu} tabIndex={open ? 0 : -1} className="-me-1.5 grid size-10 place-items-center">
            <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav className="container-site flex-1 py-6">
        <ul>
          {t.nav.map((item, i) => {
            const hasChildren = !!item.children?.length
            const isOpen = expanded === i
            return (
              <li key={item.href} className="border-b border-ivory/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="block overflow-hidden py-1">
                    <span data-mm-link className="block">
                      <SmartLink href={item.href} onClick={onClose} tabIndex={open ? 0 : -1} className="font-heading block py-2.5 text-[1.55rem] text-ivory">
                        {item.label}
                      </SmartLink>
                    </span>
                  </span>
                  {hasChildren && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mm-sub-${i}`}
                      aria-label={item.label}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold"
                    >
                      <Plus className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  )}
                </div>
                {hasChildren && (
                  <div
                    id={`mm-sub-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <ul className="overflow-hidden">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <SmartLink
                            href={child.href}
                            onClick={onClose}
                            tabIndex={open && isOpen ? 0 : -1}
                            className="block py-2 ps-4 text-[0.98rem] text-ivory/70 transition-colors hover:text-gold-light"
                          >
                            {child.label}
                          </SmartLink>
                        </li>
                      ))}
                      <li aria-hidden="true" className="h-3" />
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="container-site shrink-0 pb-8">
        <ButtonLink data-mm-fade href="/#consultation" onClick={onClose} variant="gold" size="lg" className="w-full" tabIndex={open ? 0 : -1}>
          <CalendarDays className="size-5" strokeWidth={1.5} aria-hidden="true" />
          {t.header.book}
        </ButtonLink>
        <p data-mm-fade className="mt-8 text-[0.8rem] text-ivory/50">
          {t.header.menuContactTitle}
        </p>
        <ul data-mm-fade className="mt-3 space-y-3 text-[0.95rem]">
          <li>
            <a href={site.phones.mobile.href} tabIndex={open ? 0 : -1} className="flex items-center gap-3">
              <Phone className="size-[1.125rem] text-gold" strokeWidth={1.5} aria-hidden="true" />
              <span dir="ltr">{site.phones.mobile.display}</span>
            </a>
          </li>
          <li>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="flex items-center gap-3">
              <SocialIcon name="whatsapp" className="size-[1.125rem] text-gold" />
              <span dir="ltr">{site.whatsapp.display}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="flex items-center gap-3">
              <Mail className="size-[1.125rem] text-gold" strokeWidth={1.5} aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li className="flex items-center gap-3 text-ivory/70">
            <MapPin className="size-[1.125rem] text-gold" strokeWidth={1.5} aria-hidden="true" />
            {site.address.short[lang]}
          </li>
        </ul>
      </div>
    </div>
  )
}
