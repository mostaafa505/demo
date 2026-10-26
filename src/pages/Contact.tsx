import { Building2, CalendarDays, Check, ChevronDown, Clock, ExternalLink, LoaderCircle, Mail, MapPin, MapPinned, Navigation, Pencil, Phone, Send, UserRound } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { images } from '../assets/images'
import { SocialIcon } from '../components/brand/SocialIcon'
import { ForwardArrow, ForwardChevron } from '../components/ui/Arrow'
import { Button, ButtonLink } from '../components/ui/Button'
import { Ornament } from '../components/ui/Ornament'
import { Picture } from '../components/ui/Picture'
import { SmartLink } from '../components/ui/SmartLink'
import { site } from '../config/site'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { useAnim } from '../motion/useAnim'
import { FaqItem } from '../sections/Faq'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const COUNTRY_CODES = ['+971', '+966', '+965', '+974', '+973', '+968', '+20', '+44', '+1', '+91', '+33', '+49']

/**
 * Contact us — the client's page 10 (references/client/about/UAEFamilyLaw_pages_9-10.pdf),
 * built from the same components, tokens and data-anim choreography as the rest of the site.
 */
export function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  useAnim(ref)

  useEffect(() => {
    document.title = c.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description)
  }, [c])

  const cards = [
    { icon: <MapPin />, title: c.cards.office.title, value: site.address.short[lang], note: site.address[lang], href: site.address.mapUrl, external: true },
    { icon: <Mail />, title: c.cards.email.title, value: site.email, note: c.cards.email.note, href: `mailto:${site.email}` },
    { icon: <SocialIcon name="whatsapp" />, title: c.cards.whatsapp.title, value: site.whatsapp.display, note: c.cards.whatsapp.note, href: site.whatsapp.href, external: true, ltr: true },
    { icon: <Phone />, title: c.cards.call.title, value: site.phones.mobile.display, note: c.cards.call.note, href: site.phones.mobile.href, ltr: true },
  ]

  return (
    <div ref={ref} className="paper bg-ivory">
      {/* ---------- Page hero ---------- */}
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-ink text-ivory">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 overflow-hidden">
            {/* mirrored in English so the meeting stays on the side away from the copy */}
            <div className="size-full ltr:-scale-x-100">
              <Picture pic={images.contact.meeting} sizes="100vw" alt="" loading="eager" data-parallax className="size-full object-cover object-[30%_50%]" />
            </div>
          </div>
          <div className="absolute inset-0 from-ink from-[30%] via-ink/85 via-[46%] to-ink/5 ltr:bg-gradient-to-r rtl:bg-gradient-to-l max-lg:bg-gradient-to-t max-lg:from-ink max-lg:from-[45%] max-lg:via-ink/80 max-lg:to-ink/30" />
          <div className="khatam absolute inset-0 opacity-[0.04]" />
        </div>

        <div className="container-site flex min-h-[clamp(26rem,52vh,32rem)] flex-col justify-end pb-24 pt-14 lg:justify-center lg:pb-28">
          <div className="max-w-[38rem]">
            <nav aria-label={t.about.breadcrumbHome} data-anim="fade-up">
              <ol className="flex items-center gap-2 text-[0.86rem] text-ivory/65">
                <li>
                  <SmartLink href="/" className="transition-colors hover:text-gold-light">
                    {t.about.breadcrumbHome}
                  </SmartLink>
                </li>
                <li aria-hidden="true">
                  <ForwardChevron className="size-3.5 text-gold" />
                </li>
                <li aria-current="page" className="text-gold-light">
                  {c.title}
                </li>
              </ol>
            </nav>
            <h1 id="contact-title" data-anim="title" className="font-display text-display mt-4 text-ivory">
              {c.title}
            </h1>
            <p data-anim="fade-up" lang={lang === 'ar' ? 'en' : 'ar'} className="mt-1 text-[clamp(1.4rem,1.1rem+1vw,2.1rem)] text-gold-light ltr:font-[family-name:var(--font-latin)] ltr:font-semibold rtl:font-[family-name:var(--font-latin-display)] rtl:font-medium">
              {c.subtitle}
            </p>
            <span data-anim="line" aria-hidden="true" className="mt-5 block h-[0.125rem] w-20 rounded-full bg-gold-grad" />
            <p data-anim="fade-up" className="mt-5 max-w-[56ch] text-ivory/75">
              {c.intro}
            </p>
            <div data-anim="fade-up" className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#consultation" variant="gold" size="lg">
                <CalendarDays className="size-5" strokeWidth={1.6} aria-hidden="true" />
                {c.bookCta}
              </ButtonLink>
              <ButtonLink href={site.whatsapp.href} variant="outline-gold" size="lg">
                <SocialIcon name="whatsapp" className="size-5" />
                {c.whatsappCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contact methods ---------- */}
      <section aria-label={c.title} className="relative z-10 -mt-14 pb-12 lg:-mt-16 lg:pb-14">
        <div className="container-site">
          <ul data-anim="stagger" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {cards.map((card) => (
              <li key={card.title}>
                <a
                  href={card.href}
                  {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group/card flex h-full flex-col items-center rounded-[var(--radius-card)] border border-stone bg-white px-3 py-6 text-center shadow-[var(--shadow-card)] transition-[translate,box-shadow,border-color] duration-500 ease-[var(--ease-out-quart)] can-hover:hover:-translate-y-1 can-hover:hover:border-gold/45 can-hover:hover:shadow-[var(--shadow-lift)] sm:px-5"
                >
                  <span className="grid size-14 place-items-center rounded-full bg-cream text-gold-deep ring-1 ring-gold/35 ring-offset-2 ring-offset-white [&_svg]:size-6 [&_svg]:stroke-[1.5]">{card.icon}</span>
                  <span className="font-title mt-4 text-[1.02rem] text-fg">{card.title}</span>
                  <span dir={card.ltr ? 'ltr' : undefined} className="mt-1 text-[0.82rem] font-semibold text-fg/85 [overflow-wrap:anywhere] xs:text-[0.9rem] sm:text-[1.02rem]">
                    {card.value}
                  </span>
                  <span className="mt-1 text-[0.8rem] leading-relaxed text-muted">{card.note}</span>
                  <span className="mt-auto pt-4">
                    <ForwardArrow className="size-4 text-gold-deep transition-transform duration-300 group-hover/card:translate-x-1 rtl:group-hover/card:-translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Message form + promise ---------- */}
      <section aria-labelledby="message-title" className="pb-12 lg:pb-14">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div data-anim="fade-up" className="rounded-[1.25rem] border border-stone bg-white p-6 shadow-[var(--shadow-card)] sm:p-9 lg:col-span-7">
            <h2 id="message-title" data-anim="title" className="font-display text-h2 text-fg">
              {c.form.title}
            </h2>
            <Ornament className="mt-3 !justify-start" />
            <p className="mt-3 text-muted">{c.form.lead}</p>
            <MessageForm />
          </div>

          <figure data-anim="fade-up" className="flex flex-col overflow-hidden rounded-[1.25rem] bg-ink text-ivory shadow-[var(--shadow-card)] lg:col-span-5">
            <div data-anim="img-reveal" className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[20rem] lg:flex-1">
              <Picture pic={images.contact.scales} sizes="(min-width: 1024px) 40vw, 100vw" alt="" className="absolute inset-0 size-full object-cover object-[30%_55%]" />
            </div>
            <figcaption className="relative p-7 text-center sm:p-9">
              <div aria-hidden="true" className="khatam absolute inset-0 opacity-[0.05]" />
              <p className="mx-auto max-w-[34ch] text-[1.02rem] leading-[1.9] text-ivory/90">{c.promise}</p>
              <span aria-hidden="true" className="mx-auto mt-5 block h-[0.125rem] w-12 rounded-full bg-gold-grad" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Office + reach ---------- */}
      <section aria-labelledby="office-title" className="pb-12 lg:pb-14">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div data-anim="fade-up" className="grid overflow-hidden rounded-[1.25rem] border border-stone bg-white shadow-[var(--shadow-card)] md:grid-cols-2 lg:col-span-8">
            <div className="p-6 sm:p-8">
              <h2 id="office-title" className="font-title text-[1.4rem] text-fg">
                {c.office.title}
              </h2>
              <ul className="mt-5 space-y-4 text-[0.95rem] text-fg/85">
                <OfficeRow icon={<MapPin />}>{site.address[lang]}</OfficeRow>
                <OfficeRow icon={<Phone />}>
                  <a href={site.phones.office.href} dir="ltr" className="hover:text-gold-deep">
                    {site.phones.office.display}
                  </a>
                </OfficeRow>
                <OfficeRow icon={<Mail />}>
                  <a href={`mailto:${site.email}`} className="hover:text-gold-deep">
                    {site.email}
                  </a>
                </OfficeRow>
              </ul>
              <ButtonLink href={site.address.directionsUrl} variant="outline-dark" size="md" className="mt-7">
                <Navigation className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                {c.office.directions}
              </ButtonLink>
            </div>
            <div className="relative min-h-[16rem] overflow-hidden bg-sand md:min-h-full">
              {/* Shown until (or if) the map loads */}
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                <div className="khatam absolute inset-0 opacity-[0.12]" />
                <span className="relative flex flex-col items-center gap-2 text-gold-deep">
                  <MapPin className="size-10" strokeWidth={1.3} />
                  <span className="font-title text-[1.05rem] text-fg">{site.address.short[lang]}</span>
                </span>
              </div>
              <iframe
                title={c.office.mapTitle}
                src={site.address.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 bg-transparent [filter:sepia(0.25)_saturate(0.85)]"
              />
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 start-4 inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-ink/90 px-4 py-2.5 text-[0.85rem] font-semibold text-ivory shadow-[var(--shadow-lift)] transition-colors hover:bg-ink"
              >
                <ExternalLink className="size-4 text-gold" strokeWidth={1.6} aria-hidden="true" />
                {c.office.openMap}
              </a>
            </div>
          </div>

          <ul data-anim="stagger" className="grid gap-4 lg:col-span-4">
            {c.reach.map((r, i) => {
              const Icon = i === 0 ? Building2 : MapPinned
              return (
                <li key={r.title} className="flex gap-4 rounded-[1.25rem] border border-stone bg-white p-6 shadow-[var(--shadow-card)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[0.8rem] bg-cream text-gold-deep ring-1 ring-inset ring-gold/25">
                    <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-title text-[1.05rem] text-fg">{r.title}</h3>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted">{r.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Hours + ready / FAQ ---------- */}
      <section aria-labelledby="ready-title" className="pb-16 lg:pb-20">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <div data-anim="fade-up" className="relative isolate overflow-hidden rounded-[1.25rem] bg-ink text-ivory lg:col-span-7">
            <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
              <div className="size-full ltr:-scale-x-100">
                <Picture pic={images.contact.meeting} sizes="(min-width: 1024px) 58vw, 100vw" alt="" data-parallax className="size-full object-cover object-[32%_50%]" />
              </div>
            </div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 from-ink from-[35%] via-ink/85 to-ink/20 ltr:bg-gradient-to-r rtl:bg-gradient-to-l max-sm:bg-ink/80 max-sm:bg-none" />
            <div className="max-w-[26rem] p-7 sm:p-9">
              <div className="flex gap-4">
                <Clock className="mt-1 size-8 shrink-0 text-gold" strokeWidth={1.3} aria-hidden="true" />
                <div>
                  <h3 className="font-title text-[1.25rem] text-ivory">{c.hours.title}</h3>
                  <p className="mt-1 text-ivory/80">{site.hours[lang].days}</p>
                  <p className="text-ivory/80">{site.hours[lang].time}</p>
                  <p className="text-[0.82rem] text-ivory/55">{c.hours.note}</p>
                </div>
              </div>
              <h2 id="ready-title" className="font-display mt-8 text-[clamp(1.5rem,1.25rem+1vw,2.1rem)] text-ivory">
                {c.ready.title}
              </h2>
              <p className="mt-2 leading-[1.9] text-ivory/80">{c.ready.text}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/#consultation" variant="gold" size="md">
                  <CalendarDays className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                  {c.bookCta}
                </ButtonLink>
                <ButtonLink href={site.whatsapp.href} variant="outline-gold" size="md">
                  <SocialIcon name="whatsapp" className="size-[1.125rem]" />
                  {c.whatsappCta}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div data-anim="fade-up" className="rounded-[1.25rem] border border-stone bg-sand/70 p-5 sm:p-7 lg:col-span-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-title text-[1.3rem] text-fg">{c.faq.title}</h2>
              <SmartLink href="/knowledge/faq" className="inline-flex h-8 shrink-0 items-center rounded-full border border-gold-deep/50 bg-white px-4 text-[0.8rem] font-semibold text-gold-ink transition-colors hover:bg-cream">
                {c.faq.viewAll}
              </SmartLink>
            </div>
            <ul className="mt-5 space-y-3">
              {c.faq.items.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function OfficeRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-gold-deep [&_svg]:size-5 [&_svg]:stroke-[1.5]" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Message form (no backend yet: submission is simulated)              */
/* ------------------------------------------------------------------ */

type Fields = { name: string; email: string; code: string; phone: string; type: string; message: string; consent: boolean }
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'type' | 'message' | 'consent', string>>
const EMPTY: Fields = { name: '', email: '', code: '+971', phone: '', type: '', message: '', consent: false }

function MessageForm() {
  const { t } = useLang()
  const f = t.contact.form
  const uid = useId()
  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const validate = (v: Fields): Errors => {
    const e: Errors = {}
    if (v.name.trim().length < 2) e.name = f.errors.name
    if (!EMAIL_RE.test(v.email.trim())) e.email = f.errors.email
    if (v.phone.replace(/\D/g, '').length < 7) e.phone = f.errors.phone
    if (!v.type) e.type = f.errors.type
    if (v.message.trim().length < 5) e.message = f.errors.message
    if (!v.consent) e.consent = f.errors.consent
    return e
  }
  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...fields, [key]: value }
    setFields(next)
    if (tried) setErrors(validate(next))
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTried(true)
    const errs = validate(fields)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) return document.getElementById(`${uid}-${first}`)?.focus()
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 1000)
  }

  useGSAP(
    () => {
      if (status !== 'sent' || !successRef.current) return
      successRef.current.focus()
      if (!window.matchMedia(MOTION_OK).matches) return
      gsap
        .timeline()
        .from(successRef.current, { autoAlpha: 0, y: 10, duration: 0.45 })
        .fromTo('[data-check-circle]', { strokeDashoffset: 176 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.1)
        .fromTo('[data-check-mark]', { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 0.7)
    },
    { dependencies: [status], scope: formRef },
  )

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setTried(false)
    setStatus('idle')
  }

  return (
    <div ref={formRef} className="mt-7">
      {status === 'sent' ? (
        <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[20rem] flex-col items-center justify-center text-center outline-none">
          <svg viewBox="0 0 64 64" className="size-16 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle data-check-circle cx="32" cy="32" r="28" strokeDasharray="176" />
            <path data-check-mark d="M21 33l7 7 15-16" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" />
          </svg>
          <h3 className="font-display mt-5 text-[1.6rem] text-fg">{f.success.title}</h3>
          <p className="mt-2 max-w-[44ch] text-muted">{f.success.text}</p>
          <Button type="button" variant="outline-dark" size="md" className="mt-7" onClick={reset}>
            {f.success.again}
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-labelledby="message-title" className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id={`${uid}-name`} label={f.name} icon={<UserRound />} error={errors.name}>
              <input id={`${uid}-name`} type="text" autoComplete="name" value={fields.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={inputClass(!!errors.name)} />
            </Field>
            <Field id={`${uid}-email`} label={f.email} icon={<Mail />} error={errors.email}>
              <input id={`${uid}-email`} type="email" dir="ltr" autoComplete="email" inputMode="email" value={fields.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} className={`${inputClass(!!errors.email)} rtl:text-right`} />
            </Field>
          </div>

          <Field id={`${uid}-phone`} label={f.phone} icon={<Phone />} error={errors.phone}>
            <div dir="ltr" className="flex gap-2">
              <div className="relative shrink-0">
                <label htmlFor={`${uid}-code`} className="sr-only">
                  {f.countryCode}
                </label>
                <select id={`${uid}-code`} value={fields.code} onChange={(e) => update('code', e.target.value)} className={`${inputClass(false)} w-[6.5rem] appearance-none pe-8`}>
                  {COUNTRY_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <input id={`${uid}-phone`} type="tel" autoComplete="tel-national" inputMode="tel" value={fields.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} className={inputClass(!!errors.phone)} />
            </div>
          </Field>

          <Field id={`${uid}-type`} label={f.type} icon={<Pencil />} error={errors.type}>
            <div className="relative">
              <select id={`${uid}-type`} value={fields.type} onChange={(e) => update('type', e.target.value)} aria-invalid={!!errors.type} aria-describedby={errors.type ? `${uid}-type-err` : undefined} className={`${inputClass(!!errors.type)} appearance-none pe-11 ${fields.type ? '' : 'text-muted'}`}>
                <option value="" disabled>
                  {f.typePlaceholder}
                </option>
                {t.consultation.form.typeOptions.map((o) => (
                  <option key={o} value={o} className="text-fg">
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
            </div>
          </Field>

          <Field id={`${uid}-message`} label={f.message} error={errors.message}>
            <textarea id={`${uid}-message`} rows={4} placeholder={f.messagePlaceholder} value={fields.message} onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-message-err` : undefined} className={`${inputClass(!!errors.message)} h-auto resize-y py-3 leading-relaxed`} />
          </Field>

          <div>
            <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
              <input id={`${uid}-consent`} type="checkbox" checked={fields.consent} onChange={(e) => update('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? `${uid}-consent-err` : undefined} className="peer sr-only" />
              <span aria-hidden="true" className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-[5px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${fields.consent ? 'border-gold-deep bg-gold-deep text-white' : errors.consent ? 'border-urgent' : 'border-fg/25'}`}>
                {fields.consent && <Check className="size-3.5" strokeWidth={2.5} />}
              </span>
              <span>
                {f.consent}{' '}
                <SmartLink href="/privacy" className="font-semibold text-gold-deep underline decoration-gold/40 underline-offset-4 hover:decoration-gold-deep">
                  {f.consentLink}
                </SmartLink>
                .
              </span>
            </label>
            {errors.consent && <ErrorText id={`${uid}-consent-err`}>{errors.consent}</ErrorText>}
          </div>

          <Button type="submit" variant="gold" size="lg" disabled={status === 'sending'} className="w-full disabled:cursor-wait disabled:opacity-80">
            {status === 'sending' ? (
              <>
                <LoaderCircle className="size-5 animate-spin" strokeWidth={1.6} aria-hidden="true" />
                {f.submitting}
              </>
            ) : (
              <>
                <Send className="size-[1.125rem] rtl:-scale-x-100" strokeWidth={1.6} aria-hidden="true" />
                {f.submit}
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-[var(--radius-btn)] border bg-ivory/60 px-4 text-[0.95rem] text-fg placeholder:text-muted/60 transition-[border-color,box-shadow,background-color] duration-300 focus:bg-white focus:outline-none focus:ring-4 ${
    invalid ? 'border-urgent/70 focus:border-urgent focus:ring-urgent/10' : 'border-fg/12 hover:border-fg/25 focus:border-gold focus:ring-gold/15'
  }`

function Field({ id, label, icon, error, children }: { id: string; label: string; icon?: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-[0.88rem] font-semibold text-fg">
        {icon && (
          <span className="text-gold-deep [&_svg]:size-4 [&_svg]:stroke-[1.6]" aria-hidden="true">
            {icon}
          </span>
        )}
        {label}
        <span className="text-urgent" aria-hidden="true">
          *
        </span>
      </label>
      {children}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.82rem] text-urgent">
      {children}
    </p>
  )
}
