import { BookOpen, CalendarDays, ChevronDown, Clock, FileText, Globe, Info, Mail, MapPin, MessageSquareQuote, Phone, Scale, UsersRound, type LucideIcon } from 'lucide-react'
import { useId, useRef, useState, type ReactNode } from 'react'
import { images } from '../../assets/images'
import { site, type SocialKey } from '../../config/site'
import type { Content } from '../../content/types'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'
import { Logo } from '../brand/Logo'
import { SOCIAL_LABELS, SocialIcon } from '../brand/SocialIcon'
import { ForwardChevron } from '../ui/Arrow'
import { ButtonLink } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'

const SOCIAL_ORDER: SocialKey[] = ['youtube', 'linkedin', 'instagram', 'facebook', 'x', 'whatsapp']

/*
 * Desktop footer, composed on the client's footer artwork (references/client/fotter dektob.png).
 * The art is 2167×726 and everything is measured against the footer's own width (cqw):
 *   - the art is pinned to the bottom at full width, so the skyline always sits under the
 *     brand column and the gold sweep under the call-to-action column;
 *   - the gold horizon is 83.6% down the art, so the legal bar is 16.4% of the art's height
 *     (16.4% × 726/2167 = 5.49cqw) and always starts exactly on the line;
 *   - the columns follow the reference's divider positions (26 / 40 / 52 / 63 / 80%).
 */
const ART_BAR = '5.49cqw'

export function Footer() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  // On arrival: columns settle in, then a light passes along the gold horizon.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const st = { trigger: ref.current, start: 'top 85%', once: true }
        gsap.from('[data-footer-col]', { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.07, ease: 'power3.out', scrollTrigger: st })
        gsap.fromTo('[data-footer-sheen]', { xPercent: -100, autoAlpha: 1 }, { xPercent: 260, duration: 3.2, ease: 'power2.inOut', delay: 0.5, scrollTrigger: st, onComplete: () => gsap.set('[data-footer-sheen]', { autoAlpha: 0 }) })
      })
    },
    { scope: ref },
  )

  return (
    <footer ref={ref} id="site-footer" className="relative isolate overflow-hidden bg-[#010d16] text-ivory">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <DesktopFooter t={t} />
      <MobileFooter t={t} />
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop                                                             */
/* ------------------------------------------------------------------ */

function DesktopFooter({ t }: { t: Content }) {
  const { lang, dir } = useLang()
  const linkCols = { services: t.footer.columns[0], knowledge: t.footer.columns[1], about: t.footer.columns[2] }

  return (
    <div className="hidden xl:block">
      {/* Physical layout is fixed (brand left, call to action right) in both languages, as in the reference. */}
      <div dir="ltr" className="@container relative mx-auto aspect-[2167/726] w-full max-w-[1920px]">
        {/* Artwork, pinned to the bottom and faded into the ground beyond 1920px */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 border-0 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] min-[1921px]:[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <Picture pic={images.footerArt} sizes="100vw" alt="" className="block w-full" />
          {/* Light travelling along the horizon */}
          <div className="absolute start-0 w-[76%] overflow-hidden mix-blend-screen" style={{ bottom: `calc(${ART_BAR} - 0.5cqw)`, height: '1cqw' }}>
            <span data-footer-sheen className="invisible absolute inset-y-0 start-0 w-1/4 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(255_230_170/0.9),transparent)] blur-[2px]" />
          </div>
        </div>

        <div
          className="grid grid-cols-[21fr_14fr_13fr_10.5fr_17.5fr_17fr]"
          style={{ paddingInline: '4cqw', paddingTop: '3.4cqw', paddingBottom: `calc(${ART_BAR} + 3cqw)` }}
        >
          {/* Brand — sits above the skyline */}
          <Col dir={dir} first>
            <Logo variant="light" className="h-[clamp(52px,3.6cqw,66px)]" />
            <span aria-hidden="true" className="mt-[1.3cqw] block h-px w-full bg-gradient-to-r from-gold/0 via-gold/45 to-gold/0" />
            <p className="mt-[1.2cqw] text-[clamp(14px,0.95cqw,17px)] leading-[1.85] text-gold-light/90">{t.footer.about}</p>
            <Socials className="mt-[1.4cqw]" />
          </Col>

          <LinkColumn dir={dir} title={linkCols.services.title} links={linkCols.services.links} />
          <LinkColumn dir={dir} title={linkCols.knowledge.title} links={linkCols.knowledge.links} />
          <LinkColumn dir={dir} title={linkCols.about.title} links={linkCols.about.links} />

          {/* Contact */}
          <Col dir={dir}>
            <ColumnTitle>{t.footer.contactTitle}</ColumnTitle>
            <ul className="mt-[1.3cqw] space-y-[0.95cqw] text-[clamp(14px,0.92cqw,16.5px)] text-ivory/85">
              <ContactRow icon={MapPin}>
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-light">
                  {site.address[lang]}
                </a>
              </ContactRow>
              <ContactRow icon={Phone}>
                <a href={site.phones.office.href} dir="ltr" className="transition-colors hover:text-gold-light">
                  {site.phones.office.display}
                </a>
              </ContactRow>
              <ContactRow icon={(p: { className?: string }) => <SocialIcon name="whatsapp" className={p.className} />}>
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="transition-colors hover:text-gold-light">
                  {site.whatsapp.display}
                </a>
              </ContactRow>
              <ContactRow icon={Mail}>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-light">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock}>
                <span className="text-ivory">{t.footer.contact.hours}</span>
                <span className="block text-ivory/55">{site.hours[lang].days}</span>
                <span className="block text-ivory/55">{site.hours[lang].time}</span>
              </ContactRow>
            </ul>
          </Col>

          {/* Call to action — sits above the gold sweep */}
          <Col dir={dir} className="!pl-[1.8cqw] !pr-0">
            <h2 className="font-display text-[clamp(19px,1.4cqw,28px)] leading-[1.45] text-ivory">
              {t.footer.cta.title} <span className="block text-[1.18em] text-gold-light">{t.footer.cta.titleAccent}</span>
            </h2>
            <p className="mt-[0.8cqw] text-[clamp(14px,0.92cqw,16.5px)] leading-relaxed text-ivory/65">{t.footer.cta.text}</p>
            <div className="mt-[1.4cqw] flex flex-col gap-[0.8cqw]">
              <ButtonLink href="/#consultation" variant="gold" size="md" className="w-full">
                <CalendarDays className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
                {t.footer.cta.primary}
              </ButtonLink>
              <ButtonLink href="/#assess" variant="outline-gold" size="md" className="w-full">
                <FileText className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
                {t.footer.cta.secondary}
              </ButtonLink>
            </div>
          </Col>
        </div>

        {/* Legal bar — starts exactly on the art's gold horizon */}
        <div className="absolute inset-x-0 bottom-0 flex items-center" style={{ height: ART_BAR, paddingInline: '4cqw' }}>
          <div dir={dir} className="flex w-full items-center justify-between gap-8 text-[clamp(12.5px,0.8cqw,14.5px)] text-ivory/55">
            <p>
              <Copyright text={t.footer.copyright} />
            </p>
            <ul className="flex flex-wrap items-center">
              {t.footer.legal.map((l, i) => (
                <li key={l.href} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-[1cqw] h-3.5 w-px bg-ivory/20" />}
                  <SmartLink href={l.href} className="transition-colors hover:text-gold-light">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Keeps the English brand name in one left-to-right run inside Arabic copy. */
function Copyright({ text }: { text: string }) {
  const [before, after] = text.split(site.brand.wordmark)
  if (after === undefined) return <>{text}</>
  return (
    <>
      {before}
      <bdi dir="ltr">{site.brand.wordmark}</bdi>
      {after}
    </>
  )
}

function Col({ dir, first, className = '', children }: { dir: 'rtl' | 'ltr'; first?: boolean; className?: string; children: ReactNode }) {
  return (
    <div dir={dir} data-footer-col className={`min-w-0 px-[1.3cqw] ${first ? '!pl-0 !pr-[2cqw]' : 'border-l border-gold/15'} ${className}`}>
      {children}
    </div>
  )
}

function ColumnTitle({ children }: { children: string }) {
  return (
    <h3 className="font-title text-[clamp(16px,1.08cqw,19px)] text-gold-light">
      {children}
      <span aria-hidden="true" className="mt-[0.7cqw] block h-[2px] w-[1.8cqw] min-w-6 rounded-full bg-gold-grad" />
    </h3>
  )
}

function LinkColumn({ dir, title, links }: { dir: 'rtl' | 'ltr'; title: string; links: { label: string; href: string }[] }) {
  return (
    <Col dir={dir}>
      <nav aria-label={title}>
        <ColumnTitle>{title}</ColumnTitle>
        <ul className="mt-[1.3cqw] space-y-[0.75cqw]">
          {links.map((link) => (
            <li key={link.href + link.label}>
              <SmartLink href={link.href} className="group/fl inline-flex items-center gap-2 text-[clamp(13.5px,0.92cqw,16.5px)] text-ivory/80 transition-colors hover:text-gold-light">
                <ForwardChevron className="size-3.5 shrink-0 text-gold/75 transition-transform duration-300 group-hover/fl:translate-x-0.5 rtl:group-hover/fl:-translate-x-0.5" />
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>
    </Col>
  )
}

function ContactRow({ icon: Icon, children }: { icon: LucideIcon | ((p: { className?: string }) => ReactNode); children: ReactNode }) {
  return (
    <li className="flex gap-[0.8cqw]">
      <Icon className="mt-[0.2em] size-[1.15em] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <div className="min-w-0 leading-relaxed">{children}</div>
    </li>
  )
}

function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-[0.5cqw] ${className}`}>
      {SOCIAL_ORDER.map((key) => (
        <li key={key}>
          <a
            href={site.socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LABELS[key]}
            className="grid size-[clamp(34px,2.3cqw,42px)] place-items-center rounded-full border border-gold/55 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink [&_svg]:size-[45%]"
          >
            <SocialIcon name={key} />
          </a>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile & tablet (client's mobile reference)                         */
/* ------------------------------------------------------------------ */

const MOBILE_ICONS: Record<Content['footer']['mobileNav'][number]['icon'], LucideIcon> = {
  services: UsersRound,
  emirates: MapPin,
  international: Globe,
  knowledge: BookOpen,
  lawyers: Scale,
  stories: MessageSquareQuote,
  about: Info,
}

function MobileFooter({ t }: { t: Content }) {
  const { lang } = useLang()
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()
  return (
    <div className="xl:hidden">
      <div className="mx-auto max-w-2xl px-4 pb-6 pt-12 sm:px-8">
        <div data-footer-col className="flex flex-col items-center text-center">
          <Logo variant="mobile" className="h-12" />
          <p className="mt-5 text-[0.95rem] text-ivory/80">{t.footer.tagline}</p>
          <ButtonLink href="/#consultation" variant="gold" size="lg" className="mt-6 w-full max-w-xs">
            <CalendarDays className="size-5" strokeWidth={1.6} aria-hidden="true" />
            {t.header.book}
            <ForwardChevron className="size-4" />
          </ButtonLink>
        </div>

        <ul data-footer-col className="mt-9">
          {t.footer.mobileNav.map((entry, i) => {
            const Icon = MOBILE_ICONS[entry.icon]
            const children = t.nav.find((n) => n.href === entry.href)?.children
            const isOpen = open === i
            const rowClass = 'flex w-full items-center gap-4 py-3.5 text-start text-[1rem] text-ivory'
            return (
              <li key={entry.href} className="border-b border-gold/20">
                {children ? (
                  <>
                    <button type="button" aria-expanded={isOpen} aria-controls={`${baseId}-${i}`} onClick={() => setOpen(isOpen ? null : i)} className={rowClass}>
                      <Icon className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                      <span className="flex-1">{entry.label}</span>
                      <ChevronDown className={`size-4 text-gold transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.6} aria-hidden="true" />
                    </button>
                    <div id={`${baseId}-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <ul className="overflow-hidden ps-9">
                        {children.map((c) => (
                          <li key={c.href}>
                            <SmartLink href={c.href} tabIndex={isOpen ? 0 : -1} className="block py-2 text-[0.92rem] text-ivory/65">
                              {c.label}
                            </SmartLink>
                          </li>
                        ))}
                        <li aria-hidden="true" className="h-3" />
                      </ul>
                    </div>
                  </>
                ) : (
                  <SmartLink href={entry.href} className={rowClass}>
                    <Icon className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    <span className="flex-1">{entry.label}</span>
                    <ForwardChevron className="size-4 text-gold" />
                  </SmartLink>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Contact strip between two gold rules, as in the mobile reference */}
      <div className="border-y border-gold/60">
        <ul className="mx-auto grid max-w-2xl grid-cols-2 px-4 sm:grid-cols-4 sm:px-8">
          <MobileContact href={site.phones.mobile.href} icon={<Phone className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.phone} value={<span dir="ltr">{site.phones.mobile.display}</span>} />
          <MobileContact href={site.whatsapp.href} external icon={<SocialIcon name="whatsapp" className="size-6" />} title={t.footer.contact.whatsapp} value={t.footer.contact.chatNow} />
          <MobileContact href={`mailto:${site.email}`} icon={<Mail className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.email} value={site.email} />
          <MobileContact href={site.address.mapUrl} external icon={<MapPin className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.office} value={site.address.short[lang]} />
        </ul>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-24 pt-7 sm:px-8">
        <MobileSocials />
        <ul className="mt-7 flex flex-wrap justify-center gap-x-4 gap-y-2 border-y border-gold/30 py-4 text-[0.82rem] text-ivory/70">
          {t.footer.legal.slice(0, 5).map((l) => (
            <li key={l.href}>
              <SmartLink href={l.href} className="hover:text-gold-light">
                {l.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between gap-4 text-[0.8rem] text-ivory/60">
          <LangSwitch />
          <p>
            {t.footer.trn}: <span dir="ltr">{site.trn}</span>
          </p>
        </div>
        <p className="mt-4 text-center text-[0.78rem] text-ivory/50">
          <Copyright text={t.footer.copyright} />
        </p>
      </div>
    </div>
  )
}

function MobileSocials() {
  return (
    <ul className="flex justify-center gap-3">
      {SOCIAL_ORDER.filter((k) => k !== 'whatsapp').map((key) => (
        <li key={key}>
          <a href={site.socials[key]} target="_blank" rel="noopener noreferrer" aria-label={SOCIAL_LABELS[key]} className="grid size-11 place-items-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold hover:text-ink">
            <SocialIcon name={key} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function MobileContact({ href, icon, title, value, external }: { href: string; icon: ReactNode; title: string; value: ReactNode; external?: boolean }) {
  return (
    <li className="border-gold/20 max-sm:[&:nth-child(-n+2)]:border-b max-sm:[&:nth-child(odd)]:border-e sm:[&:not(:last-child)]:border-e">
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex h-full items-center gap-3 px-2 py-4">
        <span className="text-gold">{icon}</span>
        <span className="min-w-0">
          <span className="block text-[0.9rem] font-semibold text-ivory">{title}</span>
          <span className="block break-all text-[0.76rem] text-ivory/60">{value}</span>
        </span>
      </a>
    </li>
  )
}
