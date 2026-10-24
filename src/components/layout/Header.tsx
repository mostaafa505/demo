import { CalendarDays, ChevronDown, Home, Menu, Phone, Search, Siren, UserRound } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../assets/images'
import { site } from '../../config/site'
import type { NavItem } from '../../content/types'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap'
import { Logo, LogoMark } from '../brand/Logo'
import { ServiceIcon } from '../brand/ServiceIcon'
import { SocialIcon } from '../brand/SocialIcon'
import { ForwardArrow, ForwardChevron } from '../ui/Arrow'
import { ButtonLink } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'
import { MobileMenu } from './MobileMenu'

const TOP_ROW_H = 92

/**
 * Two-row header from the brand-core reference: identity, search and actions on
 * top; navigation below. Fixed, with a spacer so nothing jumps when the top row
 * folds away on scroll.
 */
export function Header() {
  const { t } = useLang()
  const headerRef = useRef<HTMLElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const lockRef = useRef(false)
  lockRef.current = menuOpen || openIndex !== null

  useGSAP(() => {
    const header = headerRef.current!
    let isCompact = false
    let hidden = false
    const show = (v: boolean) => {
      if (hidden === !v) return
      hidden = !v
      gsap.to(header, { yPercent: v ? 0 : -100, duration: v ? 0.5 : 0.4, ease: v ? 'power3.out' : 'power2.in', overwrite: 'auto' })
    }
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        const next = y > 140
        if (next !== isCompact) {
          isCompact = next
          setCompact(next)
        }
        if (lockRef.current) return show(true)
        if (y > 520 && self.direction === 1) show(false)
        else if (self.direction === -1 || y < 200) show(true)
      },
    })
    const progress = gsap.to('[data-progress]', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.4 } })
    return () => {
      st.kill()
      progress.scrollTrigger?.kill()
      progress.kill()
    }
  }, { scope: headerRef })

  useGSAP(
    () => {
      const row = topRowRef.current
      if (!row) return
      gsap.to(row, { height: compact ? 0 : TOP_ROW_H, autoAlpha: compact ? 0 : 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
      if (compact) gsap.fromTo('[data-compact-only]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, delay: 0.1 })
    },
    { dependencies: [compact], scope: headerRef },
  )

  return (
    <>
      <a href="#main" className="fixed start-4 top-3 z-[70] -translate-y-24 rounded bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0">
        {t.a11y.skipToContent}
      </a>
      <div aria-hidden="true" style={{ height: 'var(--header-h)' }} />
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-ink text-ivory" onKeyDown={(e) => e.key === 'Escape' && setOpenIndex(null)}>
        <div aria-hidden="true" className="khatam pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
        {/* Reading progress: a gold hairline that fills as the page scrolls */}
        <div aria-hidden="true" data-progress className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gold-grad rtl:origin-right" />

        {/* ---------- Desktop ---------- */}
        <div className="relative hidden xl:block">
          <div ref={topRowRef} style={{ height: TOP_ROW_H }} className="overflow-hidden">
            <div className="container-site flex h-[92px] items-center gap-6">
              <SmartLink href="/" aria-label={site.brand.wordmark} className="shrink-0">
                <Logo variant="light" className="h-[58px]" />
              </SmartLink>
              <HeaderSearch />
              <div className="ms-auto flex items-center gap-5">
                <PhoneBlock />
                <ButtonLink href="/#consultation" variant="gold" size="md">
                  <CalendarDays className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  {t.header.book}
                </ButtonLink>
                <ButtonLink href={site.clientPortalUrl} variant="outline-gold" size="md">
                  <UserRound className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  {t.header.login}
                </ButtonLink>
                <LangSwitch />
              </div>
            </div>
          </div>

          <div className="border-t border-gold/12">
            <div className="container-site flex h-14 items-center gap-3">
              {compact && (
                <SmartLink href="/" aria-label={site.brand.wordmark} data-compact-only className="me-2 shrink-0">
                  <LogoMark className="h-9" />
                </SmartLink>
              )}
              <DesktopNav items={t.nav} openIndex={openIndex} setOpenIndex={setOpenIndex} />
              <div className="ms-auto flex items-center gap-3">
                <ButtonLink href={site.phones.emergency.href} variant="urgent" size="sm">
                  <Siren className="size-4" strokeWidth={1.6} aria-hidden="true" />
                  {t.header.emergency}
                </ButtonLink>
                {compact && (
                  <span data-compact-only>
                    <ButtonLink href="/#consultation" variant="gold" size="sm">
                      <CalendarDays className="size-4" strokeWidth={1.6} aria-hidden="true" />
                      {t.header.book}
                    </ButtonLink>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile / tablet ---------- */}
        <div className="relative xl:hidden">
          <div className="container-site flex h-[72px] items-center gap-1.5 xs:gap-2 sm:gap-3">
            <SmartLink href="/" aria-label={site.brand.wordmark} className="me-auto min-w-0 shrink">
              <Logo variant="mobile" className="h-9 max-[379px]:h-[30px] sm:h-10" />
            </SmartLink>
            <a href={site.phones.mobile.href} aria-label={t.a11y.call} className={iconBtn}>
              <Phone className="size-[17px]" strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.whatsapp} className={`${iconBtn} max-[399px]:hidden`}>
              <SocialIcon name="whatsapp" className="size-[17px]" />
            </a>
            <ButtonLink href="/#consultation" variant="gold" size="sm" className="max-sm:!px-3">
              <CalendarDays className="size-4 max-sm:hidden" strokeWidth={1.6} aria-hidden="true" />
              <span className="sm:hidden">{t.header.bookShort}</span>
              <span className="hidden sm:inline">{t.header.book}</span>
            </ButtonLink>
            <LangSwitch compact />
            <button
              type="button"
              aria-label={t.a11y.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="-me-1 grid size-10 shrink-0 place-items-center border-s border-gold/25 ps-1 text-gold-light"
            >
              <Menu className="size-6" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

const iconBtn = 'grid size-9 shrink-0 place-items-center rounded-full border border-gold/60 text-gold-light transition-colors hover:bg-gold/10'

function PhoneBlock() {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-3">
      <a href={site.phones.mobile.href} className="group flex items-center gap-2.5">
        <Phone className="size-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
        <span className="flex flex-col leading-tight">
          <span dir="ltr" className="font-[family-name:var(--font-latin)] text-[0.95rem] font-semibold tracking-wide text-ivory transition-colors group-hover:text-gold-light">
            {site.phones.mobile.display}
          </span>
          <span className="text-[0.74rem] text-ivory/60">{t.header.phoneCaption}</span>
        </span>
      </a>
      <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.whatsapp} className="grid size-10 place-items-center rounded-full bg-gold-grad text-ink shadow-[var(--shadow-gold)] transition-[filter] hover:brightness-105">
        <SocialIcon name="whatsapp" className="size-5" />
      </a>
    </div>
  )
}

function HeaderSearch() {
  const { t, localize } = useLang()
  const navigate = useNavigate()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim()
    if (q) navigate(`${localize('/search')}?q=${encodeURIComponent(q)}`)
  }
  return (
    <form role="search" onSubmit={onSubmit} className="relative min-w-0 max-w-[25rem] flex-1">
      <label htmlFor="site-search" className="sr-only">
        {t.header.searchLabel}
      </label>
      <Search className="pointer-events-none absolute start-3.5 top-1/2 size-[18px] -translate-y-1/2 text-ivory/55" strokeWidth={1.6} aria-hidden="true" />
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder={t.header.searchPlaceholder}
        className="h-11 w-full rounded-[var(--radius-btn)] border border-ivory/20 bg-ink/60 pe-4 ps-10 text-[0.86rem] text-ivory placeholder:text-ivory/45 transition-colors focus:border-gold/70 focus:outline-none"
      />
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop navigation with mega menu                                   */
/* ------------------------------------------------------------------ */

function DesktopNav({ items, openIndex, setOpenIndex }: { items: NavItem[]; openIndex: number | null; setOpenIndex: (i: number | null) => void }) {
  const { t } = useLang()
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const openTimer = useRef<number | undefined>(undefined)

  const scheduleOpen = (i: number) => {
    window.clearTimeout(closeTimer.current)
    window.clearTimeout(openTimer.current)
    openTimer.current = window.setTimeout(() => setOpenIndex(i), openIndex === null ? 90 : 0)
  }
  const scheduleClose = useCallback(() => {
    window.clearTimeout(openTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 160)
  }, [setOpenIndex])

  useEffect(() => {
    const onDoc = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIndex(null)
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [setOpenIndex])

  return (
    <nav ref={navRef} aria-label={t.a11y.mainNav} onPointerLeave={scheduleClose} onPointerEnter={() => window.clearTimeout(closeTimer.current)}>
      <ul className="flex h-14 items-center">
        {items.map((item, i) => {
          const hasMenu = !!item.children?.length
          const open = openIndex === i
          const isHome = item.href === '/'
          return (
            <li key={item.href} className="relative flex h-full items-center" onPointerEnter={() => (hasMenu ? scheduleOpen(i) : scheduleClose())}>
              {i > 1 && <span aria-hidden="true" className="h-4 w-px bg-ivory/12" />}
              {isHome ? (
                <SmartLink href="/" aria-current="page" className="me-1 flex h-10 items-center gap-2 rounded-[var(--radius-btn)] bg-gold-grad px-4 text-[0.88rem] font-semibold text-ink shadow-[var(--shadow-gold)]">
                  <Home className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  {item.label}
                </SmartLink>
              ) : hasMenu ? (
                <button type="button" aria-expanded={open} aria-controls={`menu-${i}`} onClick={() => setOpenIndex(open ? null : i)} className={navItemClass(open)}>
                  {item.label}
                  <ChevronDown className={`size-3.5 opacity-60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={1.8} aria-hidden="true" />
                  <NavUnderline active={open} />
                </button>
              ) : (
                <SmartLink href={item.href} className={navItemClass(false)}>
                  {item.label}
                  <NavUnderline active={false} />
                </SmartLink>
              )}
              {hasMenu && !item.mega && <Dropdown id={`menu-${i}`} item={item} open={open} onNavigate={() => setOpenIndex(null)} />}
            </li>
          )
        })}
      </ul>
      {items.map((item, i) => (item.mega ? <MegaMenu key={item.href} id={`menu-${i}`} item={item} open={openIndex === i} onNavigate={() => setOpenIndex(null)} /> : null))}
    </nav>
  )
}

const navItemClass = (open: boolean) =>
  `group/nav relative flex h-full items-center gap-1.5 whitespace-nowrap px-3 text-[0.88rem] font-medium transition-colors 2xl:px-4 2xl:text-[0.92rem] ${open ? 'text-gold-light' : 'text-ivory/85 hover:text-ivory'}`

function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-3 bottom-2.5 h-px bg-gold-grad transition-transform duration-500 ease-[var(--ease-out-expo)] ltr:origin-left rtl:origin-right 2xl:inset-x-4 ${active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'}`}
    />
  )
}

/** Shared open/close: clip from the top, items follow. */
function usePanelAnimation(open: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = el.querySelectorAll('[data-menu-item]')
      if (open) {
        gsap.set(el, { visibility: 'visible' })
        gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'expo.out', overwrite: true })
        gsap.fromTo(items, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.03, delay: 0.06, ease: 'power3.out', overwrite: true })
      } else {
        gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.28, ease: 'power2.in', overwrite: true, onComplete: () => gsap.set(el, { visibility: 'hidden' }) })
      }
    },
    { dependencies: [open] },
  )
  return ref
}

function Dropdown({ id, item, open, onNavigate }: { id: string; item: NavItem; open: boolean; onNavigate: () => void }) {
  const ref = usePanelAnimation(open)
  return (
    <div ref={ref} id={id} className="invisible absolute start-0 top-full min-w-64 pt-px" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      <ul className="rounded-b-[var(--radius-card)] border border-t-0 border-gold/20 bg-ink-2 p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
        {item.children!.map((child) => (
          <li key={child.href} data-menu-item>
            <SmartLink
              href={child.href}
              onClick={onNavigate}
              tabIndex={open ? 0 : -1}
              className="group/item flex items-center justify-between gap-6 rounded-md px-3.5 py-2.5 text-[0.9rem] text-ivory/80 transition-colors hover:bg-ivory/[0.04] hover:text-gold-light"
            >
              {child.label}
              <ForwardChevron className="size-3.5 text-gold opacity-0 transition-opacity group-hover/item:opacity-100" />
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function MegaMenu({ id, item, open, onNavigate }: { id: string; item: NavItem; open: boolean; onNavigate: () => void }) {
  const { t } = useLang()
  const ref = usePanelAnimation(open)
  const services = t.services.items
  return (
    <div ref={ref} id={id} className="invisible absolute inset-x-0 top-full" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      <div className="border-b border-gold/25 bg-ink-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)]">
        <div className="container-site grid grid-cols-12 gap-10 py-9">
          <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-1">
            {item.children!.map((child, i) => (
              <li key={child.href} data-menu-item>
                <SmartLink href={child.href} onClick={onNavigate} tabIndex={open ? 0 : -1} className="group/item flex items-center gap-4 rounded-[var(--radius-card)] p-3 transition-colors hover:bg-ivory/[0.04]">
                  <span className="relative block size-16 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-gold/25">
                    <Picture pic={images.services[services[i]?.image ?? 'civil-marriage']} sizes="64px" alt="" className="size-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-[0.98rem] font-semibold text-ivory transition-colors group-hover/item:text-gold-light">
                      <ServiceIcon name={services[i]?.icon ?? 'marriage'} className="size-4 text-gold" />
                      {child.label}
                    </span>
                    <span className="mt-0.5 block text-[0.84rem] leading-relaxed text-ivory/55">{child.description}</span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
          <div className="col-span-4" data-menu-item>
            <div className="relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-gold/25 p-7">
              <Picture pic={images.services.international} sizes="400px" alt="" className="absolute inset-0 size-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/85 to-ink-2/20" />
              <div className="relative">
                <p className="font-display text-[1.35rem] text-ivory">{t.header.mega.title}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/70">{t.header.mega.text}</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/#assess" variant="gold" size="md" tabIndex={open ? 0 : -1} onClick={onNavigate}>
                    {t.header.mega.cta}
                  </ButtonLink>
                  <SmartLink href={item.href} onClick={onNavigate} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-gold-light hover:text-gold">
                    {t.header.mega.allServices}
                    <ForwardArrow className="size-3.5" />
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
