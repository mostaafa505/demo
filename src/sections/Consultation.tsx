import { Building2, Check, ChevronDown, Clock, LoaderCircle, Mail, MapPin, Phone, PhoneCall, Video } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { images } from '../assets/images'
import { Button } from '../components/ui/Button'
import { ForwardArrow } from '../components/ui/Arrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SmartLink } from '../components/ui/SmartLink'
import { site } from '../config/site'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { useReveal } from '../motion/useReveal'
import { METHOD_EVENT } from './QuickTools'

const METHOD_ICONS = [Building2, PhoneCall, Video]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Fields = { name: string; email: string; type: string; method: number | null; message: string; consent: boolean }
type Errors = Partial<Record<'name' | 'email' | 'type' | 'method' | 'consent', string>>

export function Consultation() {
  const { t, lang } = useLang()
  const f = t.consultation.form
  const ref = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const [fields, setFields] = useState<Fields>({ name: '', email: '', type: '', method: null, message: '', consent: false })
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  useReveal(ref)

  // The quick-tools booking card can preselect the meeting method.
  useEffect(() => {
    const onPick = (e: Event) => setFields((s) => ({ ...s, method: (e as CustomEvent<number>).detail }))
    window.addEventListener(METHOD_EVENT, onPick)
    return () => window.removeEventListener(METHOD_EVENT, onPick)
  }, [])

  const validate = (v: Fields): Errors => {
    const e: Errors = {}
    if (v.name.trim().length < 2) e.name = f.errors.name
    if (!EMAIL_RE.test(v.email.trim())) e.email = f.errors.email
    if (!v.type) e.type = f.errors.type
    if (v.method === null) e.method = f.errors.method
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
    const firstInvalid = Object.keys(errs)[0]
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus()
      return
    }
    setStatus('sending')
    // No backend in phase 1: simulate the request.
    window.setTimeout(() => setStatus('sent'), 1100)
  }

  useGSAP(
    () => {
      if (status !== 'sent' || !successRef.current) return
      successRef.current.focus()
      if (!window.matchMedia(MOTION_OK).matches) return
      const tl = gsap.timeline()
      tl.from(successRef.current, { autoAlpha: 0, y: 12, duration: 0.5 })
        .fromTo('[data-check-circle]', { strokeDashoffset: 176 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.1)
        .fromTo('[data-check-mark]', { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 0.75)
        .from('[data-success-copy] > *', { autoAlpha: 0, y: 10, stagger: 0.08, duration: 0.5 }, 0.8)
    },
    { dependencies: [status], scope: ref },
  )

  const reset = () => {
    setFields({ name: '', email: '', type: '', method: null, message: '', consent: false })
    setErrors({})
    setTried(false)
    setStatus('idle')
  }

  return (
    <section ref={ref} id="consultation" aria-labelledby="consultation-title" className="scroll-mt-20 bg-ivory py-20 lg:py-32">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-gold/20 bg-white shadow-[var(--shadow-lift)] lg:grid-cols-12">
          {/* Context panel */}
          <div className="relative isolate overflow-hidden bg-ink p-7 text-ivory sm:p-10 lg:col-span-5 lg:p-12">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 overflow-hidden">
              <img data-parallax="8" src={images.ctaSkyline} alt="" loading="lazy" className="absolute inset-x-0 -bottom-[14%] h-[135%] w-full object-cover opacity-35" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink/30" />
            </div>
            <SectionHeading id="consultation-title" tone="dark" layout="stacked" eyebrow={t.consultation.eyebrow} title={t.consultation.title} lead={t.consultation.lead} />
            <ul data-reveal-group className="mt-9 space-y-3.5">
              {t.consultation.reassurance.map((r) => (
                <li key={r} data-reveal-item className="flex items-start gap-3 text-[0.93rem] text-ivory/80">
                  <Check className="mt-1 size-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-6 border-t border-gold/15 pt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Info icon={<Phone className="size-[18px]" strokeWidth={1.5} />} title={t.consultation.callTitle}>
                <a href={site.phones.office.href} dir="ltr" className="hover:text-gold-light">
                  {site.phones.office.display}
                </a>
              </Info>
              <Info icon={<Mail className="size-[18px]" strokeWidth={1.5} />} title={t.consultation.emailTitle}>
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">
                  {site.email}
                </a>
              </Info>
              <Info icon={<MapPin className="size-[18px]" strokeWidth={1.5} />} title={t.consultation.officeTitle}>
                {site.address.short[lang]}
              </Info>
              <Info icon={<Clock className="size-[18px]" strokeWidth={1.5} />} title={t.consultation.hoursTitle}>
                {site.hours[lang].days}
                <br />
                {site.hours[lang].time}
              </Info>
            </dl>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-10 lg:col-span-7 lg:p-12">
            {status === 'sent' ? (
              <div ref={successRef} tabIndex={-1} className="flex h-full flex-col items-start justify-center py-10 outline-none" role="status">
                <svg viewBox="0 0 64 64" className="size-16 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <circle data-check-circle cx="32" cy="32" r="28" strokeDasharray="176" />
                  <path data-check-mark d="M21 33l7 7 15-16" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" />
                </svg>
                <div data-success-copy>
                  <h3 className="font-heading text-h3 mt-6 !text-[1.9rem] text-fg">{f.success.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-muted">{f.success.text}</p>
                  <Button type="button" variant="outline-dark" size="md" className="mt-8" onClick={reset}>
                    {f.success.again}
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} aria-labelledby="consultation-title" data-reveal="fade">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id={`${uid}-name`} label={f.name} error={errors.name}>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      autoComplete="name"
                      placeholder={f.namePlaceholder}
                      value={fields.name}
                      onChange={(e) => update('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>
                  <Field id={`${uid}-email`} label={f.email} error={errors.email}>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={f.emailPlaceholder}
                      value={fields.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      className={`${inputClass(!!errors.email)} rtl:text-right`}
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field id={`${uid}-type`} label={f.type} error={errors.type}>
                    <div className="relative">
                      <select
                        id={`${uid}-type`}
                        value={fields.type}
                        onChange={(e) => update('type', e.target.value)}
                        aria-invalid={!!errors.type}
                        aria-describedby={errors.type ? `${uid}-type-err` : undefined}
                        className={`${inputClass(!!errors.type)} appearance-none pe-11 ${fields.type ? '' : 'text-muted/80'}`}
                      >
                        <option value="" disabled>
                          {f.typePlaceholder}
                        </option>
                        {f.typeOptions.map((o) => (
                          <option key={o} value={o} className="text-fg">
                            {o}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </Field>
                </div>

                <fieldset className="mt-6" aria-describedby={errors.method ? `${uid}-method-err` : undefined}>
                  <legend className="text-[0.88rem] font-semibold text-fg">{f.method}</legend>
                  <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                    {f.methods.map((m, i) => {
                      const Icon = METHOD_ICONS[i]
                      const checked = fields.method === i
                      return (
                        <label
                          key={m}
                          className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-[var(--radius-btn)] border px-2 py-4 text-[0.88rem] font-medium transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                            checked ? 'border-gold bg-gold/10 text-fg' : errors.method ? 'border-urgent/50 text-muted' : 'border-fg/12 text-muted hover:border-gold/50'
                          }`}
                        >
                          <input
                            id={i === 0 ? `${uid}-method` : undefined}
                            type="radio"
                            name={`${uid}-method`}
                            className="sr-only"
                            checked={checked}
                            onChange={() => update('method', i)}
                          />
                          <Icon className={`size-5 ${checked ? 'text-gold-deep' : ''}`} strokeWidth={1.5} aria-hidden="true" />
                          {m}
                          {checked && <Check className="absolute end-2 top-2 size-3.5 text-gold-deep" strokeWidth={2} aria-hidden="true" />}
                        </label>
                      )
                    })}
                  </div>
                  {errors.method && <ErrorText id={`${uid}-method-err`}>{errors.method}</ErrorText>}
                </fieldset>

                <div className="mt-6">
                  <Field id={`${uid}-message`} label={f.message} hint={f.optional}>
                    <textarea
                      id={`${uid}-message`}
                      rows={4}
                      placeholder={f.messagePlaceholder}
                      value={fields.message}
                      onChange={(e) => update('message', e.target.value)}
                      className={`${inputClass(false)} h-auto resize-y py-3 leading-relaxed`}
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
                    <input
                      id={`${uid}-consent`}
                      type="checkbox"
                      checked={fields.consent}
                      onChange={(e) => update('consent', e.target.checked)}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-[4px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                        fields.consent ? 'border-gold-deep bg-gold-deep text-white' : errors.consent ? 'border-urgent' : 'border-fg/25'
                      }`}
                    >
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

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Button type="submit" variant="gold" size="lg" disabled={status === 'sending'} className="disabled:cursor-wait disabled:opacity-80 max-sm:w-full">
                    {status === 'sending' ? (
                      <>
                        <LoaderCircle className="size-5 animate-spin" strokeWidth={1.5} aria-hidden="true" />
                        {f.submitting}
                      </>
                    ) : (
                      <>
                        {f.submit}
                        <ForwardArrow className="size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-[var(--radius-btn)] border bg-ivory/60 px-4 text-[0.95rem] text-fg placeholder:text-muted/60 transition-[border-color,box-shadow,background-color] duration-300 focus:bg-white focus:outline-none focus:ring-4 ${
    invalid ? 'border-urgent/70 focus:border-urgent focus:ring-urgent/10' : 'border-fg/12 hover:border-fg/25 focus:border-gold focus:ring-gold/15'
  }`

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.88rem] font-semibold text-fg">
        {label}
        {hint && <span className="text-[0.8rem] font-normal text-muted">{hint}</span>}
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

function Info({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-gold" aria-hidden="true">
        {icon}
      </span>
      <div>
        <dt className="text-[0.8rem] text-ivory/50">{title}</dt>
        <dd className="mt-1 text-[0.93rem] text-ivory/90">{children}</dd>
      </div>
    </div>
  )
}
