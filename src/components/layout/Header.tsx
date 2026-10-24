import { CalendarDays, ChevronDown, Menu, Phone, Search, Siren, UserRound } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../assets/images'
import { site } from '../../config/site'
import type { NavItem } from '../../content/types'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap'
import { ColumnMark, Logo } from '../brand/Logo'
import { ServiceIcon } from '../brand/ServiceIcon'
import { SocialIcon } from '../brand/SocialIcon'
import { ForwardArrow } from '../ui/Arrow'
import { ButtonLink } from '../ui/Button'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'
import { MobileMenu } from './MobileMenu'

const TOP_ROW_H = 88

export function Header({ overlay }: { overlay: boolean }) {
  const { t } = useLang()
  const headerRef = useRef<HTMLElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const [solid, setSolid] = useState(!overlay)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const lockRef = useRef(false)
  lockRef.current = menuOpen || openIndex !== null

  // Solid + compact after the hero starts scrolling; hide on scroll down, reveal on scroll up.
  useGSAP(
    () => {
      const header = headerRef.current!
      let isSolid = !overlay
      let hidden = false
      const show = (v: boolean) => {
        if (hidden === !v) return
        hidden = !v
        gsap.to(header, { yPercent: v ? 0 : -100, duration: v ? 0.55 : 0.45, ease: v ? 'expo.out' : 'power3.in', overwrite: 'auto' })
      }
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          const nextSolid = !overlay || y > 48
          if (nextSolid !== isSolid) {
            isSolid = nextSolid
            setSolid(nextSolid)
          }
          if (lockRef.current) return show(true)
          if (y > 360 && self.direction === 1) show(false)
          else if (self.direction === -1 || y < 120) show(true)
        },
      })
      return () => st.kill()
    },
    { dependencies: [overlay] },
  )

  // Collapse the desktop top row once the header turns solid.
  useGSAP(
    () => {
      const row = topRowRef.current
      if (!row) return
      gsap.to(row, {
        height: solid ? 0 : TOP_ROW_H,
        autoAlpha: solid ? 0 : 1,
        duration: 0.6,
        ease: 'expo.out',
        overwrite: 'auto',
      })
      if (solid) gsap.fromTo('[data-compact-only]', { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15, ease: 'power3.out' })
    },
    { dependencies: [solid], scope: headerRef },
  )

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[70] -translate-y-24 rounded bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        {t.a11y.skipToContent}
      </a>
      <header
        ref={headerRef}
        data-solid={solid || undefined}
        className="group/header fixed inset-x-0 top-0 z-50 text-ivory"
        onKeyDown={(e) => e.key === 'Escape' && setOpenIndex(null)}
      >
        {/* Background: transparent over the hero, ink with blur once scrolled */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-[background-color,backdrop-filter,box-shadow] duration-500 ${
            solid ? 'bg-ink/88 shadow-[0_1px_0_rgb(201_164_92/0.18),0_18px_40px_-28px_rgb(0_0_0/0.9)] backdrop-blur-xl' : 'bg-gradient-to-b from-ink/80 via-ink/35 to-transparent'
          }`}
        />

        {/* ---------- Desktop ---------- */}
        <div className="relative hidden xl:block">
          <div ref={topRowRef} style={{ height: overlay ? TOP_ROW_H : 0 }} className="overflow-hidden">
            <div className="container-site flex h-[88px] items-center gap-5 2xl:gap-6">
              <SmartLink href="/" aria-label={site.brand.wordmark} className="shrink-0">
                <Logo />
              </SmartLink>
              <HeaderSearch />
              <div className="ms-auto flex items-center gap-4 2xl:gap-5">
                <PhoneBlock />
                <ButtonLink href="/#consultation" variant="gold" size="md">
                  <CalendarDays className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
                  {t.header.book}
                </ButtonLink>
                <ButtonLink href={site.clientPortalUrl} variant="outline-light" size="md" aria-label={t.header.login} className="max-2xl:!w-11 max-2xl:!px-0">
                  <UserRound className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
                  <span className="hidden 2xl:inline">{t.header.login}</span>
                </ButtonLink>
                <LangSwitch />
              </div>
            </div>
          </div>

          <div className={`border-t transition-colors duration-500 ${solid ? 'border-transparent' : 'hairline-dark'}`}>
            <div className="container-site flex h-[60px] items-center gap-4">
              {solid && (
                <SmartLink href="/" aria-label={site.brand.wordmark} data-compact-only className="shrink-0">
                  <ColumnMark className="h-9 w-8" />
                </SmartLink>
              )}
              {/* In the compact bar the mark is the home link, so "Home" steps out. */}
              <DesktopNav items={solid ? t.nav.slice(1) : t.nav} offset={solid ? 1 : 0} openIndex={openIndex} setOpenIndex={setOpenIndex} />
              <div className="ms-auto flex items-center gap-3">
                <ButtonLink href={site.phones.emergency.href} variant="urgent" size="sm" className="!h-8 !rounded-[4px] !px-3 !text-[0.78rem]">
                  <Siren className="size-[15px]" strokeWidth={1.5} aria-hidden="true" />
                  {t.header.emergency}
                </ButtonLink>
                {solid && (
                  <span data-compact-only className="flex items-center gap-3">
                    <ButtonLink href="/#consultation" variant="gold" size="sm">
                      {t.header.book}
                    </ButtonLink>
                    <span className="hidden 2xl:block">
                      <LangSwitch compact />
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile / tablet ---------- */}
        <div className="relative xl:hidden">
          <div className="container-site flex h-[68px] items-center gap-1.5 sm:gap-2.5">
            <SmartLink href="/" aria-label={site.brand.wordmark} className="me-auto shrink-0">
              <Logo size="sm" compact className="max-[374px]:[&_svg]:h-8" />
            </SmartLink>
            <a href={site.phones.mobile.href} aria-label={t.a11y.call} className={iconBtn}>
              <Phone className="size-[17px]" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.whatsapp} className={`${iconBtn} max-[374px]:hidden`}>
              <SocialIcon name="whatsapp" className="size-[17px]" />
            </a>
            <ButtonLink href="/#consultation" variant="gold" size="sm" className="!h-[34px] !px-3">
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
              className="-me-1.5 grid size-10 place-items-center text-ivory"
            >
              <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

const iconBtn =
  'grid size-[34px] shrink-0 place-items-center rounded-full border border-gold/45 text-gold-light transition-colors hover:border-gold hover:bg-gold/10'

function PhoneBlock() {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-3">
      <a href={site.phones.mobile.href} className="group flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold/10">
          <Phone className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="flex flex-col leading-tight">
          <span dir="ltr" className="text-[0.95rem] font-semibold tracking-wide text-ivory">
            {site.phones.mobile.display}
          </span>
          <span className="text-[0.75rem] text-ivory/60">{t.header.phoneCaption}</span>
        </span>
      </a>
      <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label={t.a11y.whatsapp} className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10">
        <SocialIcon name="whatsapp" className="size-[18px]" />
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
    <form role="search" onSubmit={onSubmit} className="relative min-w-0 flex-1 max-w-[26rem] 2xl:max-w-[28rem]">
      <label htmlFor="site-search" className="sr-only">
        {t.header.searchLabel}
      </label>
      <Search className="pointer-events-none absolute start-3.5 top-1/2 size-[17px] -translate-y-1/2 text-ivory/50" strokeWidth={1.5} aria-hidden="true" />
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder={t.header.searchPlaceholder}
        className="h-11 w-full rounded-[var(--radius-btn)] border border-ivory/15 bg-ivory/[0.04] ps-10 pe-4 text-[0.88rem] text-ivory placeholder:text-ivory/45 transition-colors focus:border-gold/70 focus:bg-ivory/[0.07] focus:outline-none"
      />
    </form>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop navigation with mega menu                                   */
/* ------------------------------------------------------------------ */

function DesktopNav({
  items,
  offset,
  openIndex,
  setOpenIndex,
}: {
  items: NavItem[]
  offset: number
  openIndex: number | null
  setOpenIndex: (i: number | null) => void
}) {
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
    <nav ref={navRef} aria-label={t.a11y.mainNav} className="-ms-3" onPointerLeave={scheduleClose} onPointerEnter={() => window.clearTimeout(closeTimer.current)}>
      <ul className="flex items-center">
        {items.map((item, idx) => {
          const i = idx + offset
          const hasMenu = !!item.children?.length
          const open = openIndex === i
          return (
            <li key={item.href} className="relative" onPointerEnter={() => (hasMenu ? scheduleOpen(i) : scheduleClose())}>
              {hasMenu ? (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`menu-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className={navItemClass(open)}
                >
                  {item.label}
                  <ChevronDown className={`size-3.5 opacity-60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} strokeWidth={1.75} aria-hidden="true" />
                  <NavUnderline active={open} />
                </button>
              ) : (
                <SmartLink href={item.href} className={navItemClass(false)}>
                  {item.label}
                  <NavUnderline active={item.href === '/'} />
                </SmartLink>
              )}
              {hasMenu && !item.mega && <Dropdown id={`menu-${i}`} item={item} open={open} onNavigate={() => setOpenIndex(null)} />}
            </li>
          )
        })}
      </ul>
      {items.map((item, idx) =>
        item.mega ? <MegaMenu key={item.href} id={`menu-${idx + offset}`} item={item} open={openIndex === idx + offset} onNavigate={() => setOpenIndex(null)} /> : null,
      )}
    </nav>
  )
}

const navItemClass = (open: boolean) =>
  `group/nav relative flex h-[60px] items-center gap-1.5 whitespace-nowrap px-2.5 text-[0.86rem] font-medium transition-colors 2xl:px-3 2xl:text-[0.9rem] ${
    open ? 'text-gold-light' : 'text-ivory/85 hover:text-ivory'
  }`

function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-2.5 bottom-3 h-px bg-gold-grad transition-transform duration-500 ease-[var(--ease-out-expo)] ltr:origin-left rtl:origin-right 2xl:inset-x-3 ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
      }`}
    />
  )
}

/** Shared open/close choreography: clip from the top, items rise in after. */
function usePanelAnimation(open: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = el.querySelectorAll('[data-menu-item]')
      if (open) {
        gsap.set(el, { visibility: 'visible' })
        gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)', y: -6 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.6, ease: 'expo.out', overwrite: true })
        gsap.fromTo(items, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.035, delay: 0.08, ease: 'power3.out', overwrite: true })
      } else {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.32,
          ease: 'power3.in',
          overwrite: true,
          onComplete: () => gsap.set(el, { visibility: 'hidden' }),
        })
      }
    },
    { dependencies: [open] },
  )
  return ref
}

function Dropdown({ id, item, open, onNavigate }: { id: string; item: NavItem; open: boolean; onNavigate: () => void }) {
  const ref = usePanelAnimation(open)
  return (
    <div ref={ref} id={id} className="invisible absolute start-0 top-full min-w-64 pt-1" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
      <ul className="rounded-[var(--radius-card)] border border-gold/15 bg-navy p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
        {item.children!.map((child) => (
          <li key={child.href} data-menu-item>
            <SmartLink
              href={child.href}
              onClick={onNavigate}
              tabIndex={open ? 0 : -1}
              className="group/item flex items-center justify-between gap-6 rounded-md px-3.5 py-2.5 text-[0.9rem] text-ivory/80 transition-colors hover:bg-ivory/[0.04] hover:text-gold-light"
            >
              {child.label}
              <ForwardArrow className="size-3.5 opacity-0 transition-opacity group-hover/item:opacity-100" />
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
      <div className="border-t border-gold/15 bg-navy shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)]">
        <div className="container-site grid grid-cols-12 gap-10 py-10">
          <div className="col-span-8">
            <div className="flex items-baseline justify-between border-b border-gold/15 pb-4" data-menu-item>
              <p className="font-heading text-[1.5rem] text-ivory">{item.label}</p>
              <SmartLink href={item.href} onClick={onNavigate} tabIndex={open ? 0 : -1} className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-gold-light hover:text-gold">
                {t.header.mega.allServices}
                <ForwardArrow className="size-3.5" />
              </SmartLink>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-x-8">
              {item.children!.map((child, i) => (
                <li key={child.href} data-menu-item>
                  <SmartLink
                    href={child.href}
                    onClick={onNavigate}
                    tabIndex={open ? 0 : -1}
                    className="group/item flex items-start gap-4 border-b border-ivory/[0.06] py-4 transition-colors"
                  >
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-gold/30 text-gold transition-colors group-hover/item:border-gold group-hover/item:bg-gold/10">
                      <ServiceIcon name={services[i]?.icon ?? 'marriage'} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[0.98rem] font-semibold text-ivory transition-colors group-hover/item:text-gold-light">
                        {child.label}
                        <ForwardArrow className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100 rtl:translate-x-1" />
                      </span>
                      <span className="mt-0.5 block text-[0.84rem] leading-relaxed text-ivory/55">{child.description}</span>
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4" data-menu-item>
            <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] border border-gold/20">
              <img src={images.services.international} alt="" className="absolute inset-0 size-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/30" />
              <div className="relative flex h-full flex-col justify-end p-7">
                <p className="font-heading text-[1.5rem] leading-snug text-ivory">{t.header.mega.title}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ivory/70">{t.header.mega.text}</p>
                <ButtonLink href="/#assess" variant="gold" size="md" className="mt-6 self-start" tabIndex={open ? 0 : -1} onClick={onNavigate}>
                  {t.header.mega.cta}
                  <ForwardArrow className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
