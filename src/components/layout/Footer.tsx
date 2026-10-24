import { BookOpen, CalendarDays, ChevronDown, Clock, Globe, Info, Mail, MapPin, MessageSquareQuote, Phone, Scale, ScrollText, UsersRound, type LucideIcon } from 'lucide-react'
import { useId, useState } from 'react'
import { images } from '../../assets/images'
import { site, type SocialKey } from '../../config/site'
import type { Content } from '../../content/types'
import { useLang } from '../../i18n/LanguageProvider'
import { Logo } from '../brand/Logo'
import { SOCIAL_LABELS, SocialIcon } from '../brand/SocialIcon'
import { ForwardChevron } from '../ui/Arrow'
import { ButtonLink } from '../ui/Button'
import { Picture } from '../ui/Picture'
import { SmartLink } from '../ui/SmartLink'
import { LangSwitch } from './LangSwitch'

const SOCIAL_ORDER: SocialKey[] = ['youtube', 'linkedin', 'instagram', 'facebook', 'x', 'whatsapp']

/** Footer from the brand-core references: desktop columns over the night skyline, mobile accordion. */
export function Footer() {
  const { t } = useLang()
  return (
    <footer id="site-footer" className="relative isolate overflow-hidden bg-ink text-ivory">
      <div aria-hidden="true" className="khatam pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />
      <DesktopFooter t={t} />
      <MobileFooter t={t} />
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
            className="grid size-10 place-items-center rounded-full border border-gold/50 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
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
    <h3 className="font-title text-[1.02rem] text-gold-light">
      {children}
      <span aria-hidden="true" className="mt-3 block h-[2px] w-7 rounded-full bg-gold-grad" />
    </h3>
  )
}

function DesktopFooter({ t }: { t: Content }) {
  const { lang } = useLang()
  return (
    <div className="relative hidden lg:block">
      {/* Night skyline and gold horizon from the client's footer artwork */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <Picture pic={images.footerHorizon} sizes="100vw" alt="" className="w-full" loading="lazy" />
      </div>

      <div className="container-site grid grid-cols-[1.25fr_1.15fr_0.8fr_0.95fr_0.95fr_1.35fr] gap-8 pb-[clamp(9rem,14vw,13rem)] pt-16 xl:gap-10">
        {/* Call to action */}
        <div>
          <h2 className="font-display text-[1.3rem] leading-snug text-ivory">
            {t.footer.cta.title}
          </h2>
          <p className="mt-3 text-[0.88rem] leading-relaxed text-ivory/65">{t.footer.cta.text}</p>
          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/#consultation" variant="gold" size="md" className="w-full">
              <CalendarDays className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
              {t.footer.cta.primary}
            </ButtonLink>
            <ButtonLink href="/#assess" variant="outline-gold" size="md" className="w-full">
              <ScrollText className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
              {t.footer.cta.secondary}
            </ButtonLink>
          </div>
        </div>

        {/* Contact */}
        <div className="border-s border-gold/15 ps-8 xl:ps-10">
          <ColumnTitle>{t.footer.contactTitle}</ColumnTitle>
          <ul className="mt-5 space-y-4 text-[0.88rem] text-ivory/80">
            <ContactRow icon={MapPin}>
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                {site.address[lang]}
              </a>
            </ContactRow>
            <ContactRow icon={Phone}>
              <a href={site.phones.office.href} dir="ltr" className="hover:text-ivory">
                {site.phones.office.display}
              </a>
            </ContactRow>
            <ContactRow icon={(p: { className?: string }) => <SocialIcon name="whatsapp" className={p.className} />}>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" dir="ltr" className="hover:text-ivory">
                {site.whatsapp.display}
              </a>
            </ContactRow>
            <ContactRow icon={Mail}>
              <a href={`mailto:${site.email}`} className="hover:text-ivory">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon={Clock}>
              <span className="text-ivory">{t.footer.contact.hours}</span>
              <br />
              <span className="text-ivory/55">{site.hours[lang].days}</span>
              <br />
              <span className="text-ivory/55">{site.hours[lang].time}</span>
            </ContactRow>
          </ul>
        </div>

        {/* Link columns (about, knowledge, services — reading from the contact column outward) */}
        {[t.footer.columns[2], t.footer.columns[1], t.footer.columns[0]].map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <ColumnTitle>{col.title}</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <SmartLink href={link.href} className="group/fl inline-flex items-center gap-2 text-[0.88rem] text-ivory/75 transition-colors hover:text-gold-light">
                    <ForwardChevron className="size-3.5 text-gold/70 transition-transform group-hover/fl:translate-x-0.5 rtl:group-hover/fl:-translate-x-0.5" />
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Brand */}
        <div className="border-s border-gold/15 ps-8 xl:ps-10">
          <Logo variant="light" className="h-14" />
          <p className="mt-6 text-[0.9rem] leading-relaxed text-gold-light/85">{t.footer.about}</p>
          <Socials className="mt-6" />
        </div>
      </div>
    </div>
  )
}

function ContactRow({ icon: Icon, children }: { icon: LucideIcon | ((p: { className?: string }) => React.ReactNode); children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-[18px] shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <div className="leading-relaxed">{children}</div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile footer (client's mobile reference)                           */
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
    <div className="container-site pb-8 pt-12 lg:hidden">
      <div className="flex flex-col items-center text-center">
        <Logo variant="mobile" className="h-12" />
        <p className="mt-5 text-[0.95rem] text-ivory/75">{t.footer.tagline}</p>
        <ButtonLink href="/#consultation" variant="gold" size="lg" className="mt-6 w-full max-w-xs">
          <CalendarDays className="size-5" strokeWidth={1.6} aria-hidden="true" />
          {t.header.book}
        </ButtonLink>
      </div>

      <ul className="mt-9">
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

      <ul className="mt-8 grid grid-cols-2 border-y border-gold/40">
        <MobileContact href={site.phones.mobile.href} icon={<Phone className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.phone} value={<span dir="ltr">{site.phones.mobile.display}</span>} />
        <MobileContact href={site.whatsapp.href} external icon={<SocialIcon name="whatsapp" className="size-6" />} title={t.footer.contact.whatsapp} value={t.footer.contact.chatNow} />
        <MobileContact href={`mailto:${site.email}`} icon={<Mail className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.email} value={site.email} />
        <MobileContact href={site.address.mapUrl} external icon={<MapPin className="size-6" strokeWidth={1.5} aria-hidden="true" />} title={t.footer.contact.office} value={site.address.short[lang]} />
      </ul>

      <Socials className="mt-8 justify-center" />
    </div>
  )
}

function MobileContact({ href, icon, title, value, external }: { href: string; icon: React.ReactNode; title: string; value: React.ReactNode; external?: boolean }) {
  return (
    <li className="border-gold/15 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-e">
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex h-full items-start gap-3 px-2 py-4">
        <span className="text-gold">{icon}</span>
        <span className="min-w-0">
          <span className="block text-[0.9rem] font-semibold text-ivory">{title}</span>
          <span className="block break-all text-[0.78rem] text-ivory/60">{value}</span>
        </span>
      </a>
    </li>
  )
}

function LegalBar({ t }: { t: Content }) {
  return (
    <div className="relative border-t border-gold/25 bg-ink/90 pb-24 lg:pb-0">
      <div className="container-site flex flex-col gap-4 py-5 text-[0.8rem] text-ivory/55 lg:flex-row lg:items-center lg:justify-between">
        <p className="order-3 text-center lg:order-1 lg:text-start">{t.footer.copyright}</p>
        <ul className="order-1 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:order-2">
          {t.footer.legal.map((l) => (
            <li key={l.href}>
              <SmartLink href={l.href} className="transition-colors hover:text-ivory">
                {l.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="order-2 flex items-center justify-center gap-6 lg:hidden">
          <LangSwitch />
          <p>
            {t.footer.trn}: <span dir="ltr">{site.trn}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
