import { BookOpen, ChevronDown, Clock, Globe, Info, Mail, MapPin, MessageSquareQuote, Phone, Scale, UsersRound, type LucideIcon } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { images } from '../../assets/images'
import { site, type SocialKey } from '../../config/site'
import type { Content } from '../../content/types'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../../motion/gsap'
import { useReveal } from '../../motion/useReveal'
import { Logo } from '../brand/Logo'
import { SOCIAL_LABELS, SocialIcon } from '../brand/SocialIcon'
import { ForwardArrow, ForwardChevron } from '../ui/Arrow'
import { ButtonLink } from '../ui/Button'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'

const SOCIAL_ORDER: SocialKey[] = ['youtube', 'linkedin', 'instagram', 'facebook', 'x', 'whatsapp']

export function Footer({ showCta = true }: { showCta?: boolean }) {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  // The gold horizon line draws itself as the footer arrives.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<SVGPathElement>('[data-horizon]').forEach((path) => {
          const len = path.getTotalLength()
          gsap.fromTo(
            path,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', scrollTrigger: { trigger: path, start: 'top 98%', once: true } },
          )
        })
      })
    },
    { scope: ref },
  )

  return (
    <footer ref={ref} id="site-footer" className="relative overflow-hidden bg-ink text-ivory">
      {/* CTA band — hidden on the home page, where the booking form sits right above */}
      {showCta && (
        <div className="container-site pt-16 lg:pt-24">
          <div className="grid gap-8 border-b border-gold/15 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
            <div className="lg:col-span-7">
              <h2 data-reveal="lines" className="font-heading text-h2 text-ivory">
                {t.footer.cta.title}
              </h2>
              <p data-reveal="fade" className="mt-4 max-w-[48ch] text-ivory/65">
                {t.footer.cta.text}
              </p>
            </div>
            <div data-reveal="fade" className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <ButtonLink href="/#consultation" variant="gold" size="lg">
                {t.footer.cta.primary}
                <ForwardArrow className="size-4" />
              </ButtonLink>
              <ButtonLink href="/#assess" variant="outline-light" size="lg">
                <Scale className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
                {t.footer.cta.secondary}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}

      <DesktopColumns t={t} />
      <MobileFooter t={t} />

      {/* Skyline horizon */}
      <div aria-hidden="true" className="pointer-events-none relative -mt-6 h-40 sm:h-52 lg:-mt-24 lg:h-72">
        <img
          src={images.footerSkyline}
          alt=""
          loading="lazy"
          className="absolute inset-x-0 bottom-0 h-full w-full object-cover object-bottom opacity-70 [mask-image:linear-gradient(to_top,black_35%,transparent)]"
        />
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-6 h-32 w-full lg:h-44">
          <defs>
            <linearGradient id="horizon" x1="0" x2="1">
              <stop offset="0" stopColor="#9C7A3C" stopOpacity="0" />
              <stop offset=".25" stopColor="#E6CB8E" />
              <stop offset=".6" stopColor="#C9A45C" />
              <stop offset="1" stopColor="#9C7A3C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path data-horizon d="M0 168 C 320 150 520 40 860 70 S 1260 150 1440 40" fill="none" stroke="url(#horizon)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <LegalBar t={t} />
    </footer>
  )
}

function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {SOCIAL_ORDER.map((key) => (
        <li key={key}>
          <a
            href={site.socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LABELS[key]}
            className="grid size-10 place-items-center rounded-full border border-gold/30 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
          >
            <SocialIcon name={key} />
          </a>
        </li>
      ))}
    </ul>
  )
}

function ColumnTitle({ children }: { children: string }) {
  return (
    <h3 className="text-[0.95rem] font-semibold text-gold-light">
      {children}
      <span aria-hidden="true" className="mt-3 block h-px w-8 bg-gold/60" />
    </h3>
  )
}

function DesktopColumns({ t }: { t: Content }) {
  const { lang } = useLang()
  return (
    <div className="container-site relative z-10 hidden py-16 lg:block">
      <div data-reveal-group className="grid grid-cols-12 gap-8 xl:gap-10">
        <div data-reveal-item className="col-span-4 xl:col-span-3">
          <Logo size="lg" />
          <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-ivory/65">{t.footer.about}</p>
          <Socials className="mt-7" />
        </div>
        {t.footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} data-reveal-item className="col-span-2">
            <ColumnTitle>{col.title}</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <SmartLink href={link.href} className="group/fl inline-flex items-center gap-2 text-[0.9rem] text-ivory/70 transition-colors hover:text-ivory">
                    <ForwardChevron className="size-3.5 text-gold/70 transition-transform group-hover/fl:translate-x-0.5 rtl:group-hover/fl:-translate-x-0.5" />
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div data-reveal-item className="col-span-12 xl:col-span-3">
          <ColumnTitle>{t.footer.contactTitle}</ColumnTitle>
          <ul className="mt-5 grid gap-4 text-[0.9rem] text-ivory/75 xl:grid-cols-1 lg:grid-cols-4">
            <ContactRow icon={MapPin} label={t.footer.contact.office}>
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                {site.address.short[lang]}
              </a>
            </ContactRow>
            <ContactRow icon={Phone} label={t.footer.contact.phone}>
              <a href={site.phones.office.href} dir="ltr" className="hover:text-ivory">
                {site.phones.office.display}
              </a>
            </ContactRow>
            <ContactRow icon={(p: { className?: string }) => <SocialIcon name="whatsapp" className={p.className} />} label={t.footer.contact.whatsapp}>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-ivory">
                {site.whatsapp.display}
              </a>
            </ContactRow>
            <ContactRow icon={Mail} label={t.footer.contact.email}>
              <a href={`mailto:${site.email}`} className="hover:text-ivory">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon={Clock} label={t.footer.contact.hours}>
              {site.hours[lang].days}
              <br />
              <span className="text-ivory/55">{site.hours[lang].time}</span>
            </ContactRow>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ContactRow({ icon: Icon, label, children }: { icon: LucideIcon | ((p: { className?: string }) => React.ReactNode); label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-1 size-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <span className="sr-only">{label}: </span>
        {children}
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile footer                                                       */
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
    <div className="container-site relative z-10 py-12 lg:hidden">
      <div className="flex flex-col items-center text-center">
        <Logo size="md" />
        <p className="mt-5 text-[0.95rem] text-ivory/70">{t.footer.tagline}</p>
        <ButtonLink href="/#consultation" variant="gold" size="lg" className="mt-7">
          {t.header.book}
          <ForwardArrow className="size-4" />
        </ButtonLink>
      </div>

      <ul className="mt-10 border-t border-gold/15">
        {t.footer.mobileNav.map((entry, i) => {
          const Icon = MOBILE_ICONS[entry.icon]
          const children = t.nav.find((n) => n.href === entry.href)?.children
          const isOpen = open === i
          const rowClass = 'flex w-full items-center gap-4 py-4 text-start text-[1rem] text-ivory'
          return (
            <li key={entry.href} className="border-b border-gold/15">
              {children ? (
                <>
                  <button type="button" aria-expanded={isOpen} aria-controls={`${baseId}-${i}`} onClick={() => setOpen(isOpen ? null : i)} className={rowClass}>
                    <Icon className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    <span className="flex-1">{entry.label}</span>
                    <ChevronDown className={`size-4 text-gold transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} aria-hidden="true" />
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

      <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-gold/15 bg-gold/15">
        <MobileContact href={site.phones.mobile.href} icon={<Phone className="size-5" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.phone} value={<span dir="ltr">{site.phones.mobile.display}</span>} />
        <MobileContact href={site.whatsapp.href} external icon={<SocialIcon name="whatsapp" className="size-5" />} title={t.footer.contact.whatsapp} value={t.footer.contact.chatNow} />
        <MobileContact href={`mailto:${site.email}`} icon={<Mail className="size-5" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.email} value={site.email} />
        <MobileContact href={site.address.mapUrl} external icon={<MapPin className="size-5" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.office} value={site.address.short[lang]} />
      </ul>

      <Socials className="mt-8 justify-center" />
    </div>
  )
}

function MobileContact({ href, icon, title, value, external }: { href: string; icon: React.ReactNode; title: string; value: React.ReactNode; external?: boolean }) {
  return (
    <li className="bg-ink">
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex h-full flex-col gap-1 p-4">
        <span className="text-gold">{icon}</span>
        <span className="mt-1 text-[0.9rem] font-semibold text-ivory">{title}</span>
        <span className="break-all text-[0.8rem] text-ivory/60">{value}</span>
      </a>
    </li>
  )
}

function LegalBar({ t }: { t: Content }) {
  return (
    <div className="relative border-t border-gold/15 bg-ink pb-24 lg:pb-0">
      <div className="container-site flex flex-col gap-5 py-6 text-[0.8rem] text-ivory/50 lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:order-2 lg:justify-end">
          {t.footer.legal.map((l) => (
            <li key={l.href}>
              <SmartLink href={l.href} className="transition-colors hover:text-ivory">
                {l.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-3 lg:order-1 lg:flex-row lg:gap-6">
          <p>{t.footer.copyright}</p>
          <p className="lg:hidden">
            {t.footer.trn}: <span dir="ltr">{site.trn}</span>
          </p>
          <div className="lg:hidden">
            <LangSwitch />
          </div>
        </div>
      </div>
    </div>
  )
}
