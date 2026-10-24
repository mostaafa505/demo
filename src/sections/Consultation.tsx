import { Building2, Check, ChevronDown, LoaderCircle, Mail, Phone, PhoneCall, Video } from 'lucide-react'
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { images } from '../assets/images'
import { SocialIcon } from '../components/brand/SocialIcon'
import { ForwardArrow } from '../components/ui/Arrow'
import { Button } from '../components/ui/Button'
import { Ornament } from '../components/ui/Ornament'
import { Picture } from '../components/ui/Picture'
import { SmartLink } from '../components/ui/SmartLink'
import { site } from '../config/site'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, MOTION_OK, useGSAP } from '../motion/gsap'
import { useAnim } from '../motion/useAnim'

const METHOD_ICONS = [Building2, PhoneCall, Video]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Fields = {
  name: string
  email: string
  type: string
  method: number | null
  message: string
  consent: boolean
}
type Errors = Partial<Record<'name' | 'email' | 'type' | 'method' | 'consent', string>>

/** The client's dark booking band: invitation and meeting methods on one side, the form on the other. */
export function Consultation() {
  const { t } = useLang()
  const f = t.consultation.form
  const ref = useRef<HTMLElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    type: '',
    method: null,
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  useAnim(ref)

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
    const first = Object.keys(errs)[0]
    if (first) return document.getElementById(`${uid}-${first}`)?.focus()
    setStatus('sending')
    // No backend in phase 1: simulate the request.
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
    { dependencies: [status], scope: ref },
  )

  const reset = () => {
    setFields({
      name: '',
      email: '',
      type: '',
      method: null,
      message: '',
      consent: false,
    })
    setErrors({})
    setTried(false)
    setStatus('idle')
  }

  return (
    <section ref={ref} id="consultation" aria-labelledby="consultation-title" className="scroll-mt-24 bg-ivory pb-16 pt-6 lg:pb-20">
      {/* An ink card set into the ivory page, so it never sits flush against the dark footer */}
      <div className="container-site">
        <div data-anim="card" className="relative isolate overflow-hidden rounded-[1.5rem] bg-ink text-ivory shadow-[0_2.5rem_5rem_-2.5rem_rgb(10_15_26/0.55)]">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Picture pic={images.ctaBand} sizes="100vw" alt="" data-parallax className="size-full object-cover object-[50%_60%] opacity-40" />
            <div className="absolute inset-0 from-ink via-ink/90 to-ink/50 ltr:bg-gradient-to-l rtl:bg-gradient-to-r" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
            <div className="khatam absolute inset-0 opacity-[0.05]" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-gold/25" />

          <div className="grid gap-10 px-5 py-10 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-14">
            {/* Invitation */}
            <div className="lg:col-span-5" data-anim="fade-up">
              <h2 id="consultation-title" className="font-display text-h2 text-ivory">
                {t.consultation.title}
              </h2>
              <Ornament className="mt-3 !justify-start" tone="dark" />
              <p className="mt-4 max-w-[46ch] text-ivory/72">{t.consultation.lead}</p>
              <ul className="mt-7 space-y-2.5">
                {t.consultation.reassurance.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[0.92rem] text-ivory/80">
                    <Check className="mt-1 size-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-gold/20 pt-6 text-[0.86rem]">
                <ContactItem icon={<Phone className="size-[1.125rem]" strokeWidth={1.5} />} href={site.phones.office.href} label={t.consultation.callTitle} value={site.phones.office.display} ltr />
                <ContactItem icon={<SocialIcon name="whatsapp" className="size-[1.125rem]" />} href={site.whatsapp.href} label={t.footer.contact.whatsapp} value={site.whatsapp.display} ltr external />
                <ContactItem icon={<Mail className="size-[1.125rem]" strokeWidth={1.5} />} href={`mailto:${site.email}`} label={t.consultation.emailTitle} value={site.email} />
              </ul>
            </div>

            {/* Form */}
            <div className="lg:col-span-7" data-anim="fade-up">
              <div className="rounded-[1.125rem] border border-gold/25 bg-ink-2/80 p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] backdrop-blur-[0.125rem] sm:p-7">
                {status === 'sent' ? (
                  <div ref={successRef} tabIndex={-1} role="status" className="flex min-h-[22rem] flex-col items-center justify-center text-center outline-none">
                    <svg viewBox="0 0 64 64" className="size-16 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <circle data-check-circle cx="32" cy="32" r="28" strokeDasharray="176" />
                      <path data-check-mark d="M21 33l7 7 15-16" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" />
                    </svg>
                    <h3 className="font-display mt-5 text-[1.6rem] text-ivory">{f.success.title}</h3>
                    <p className="mt-2 max-w-[44ch] text-ivory/70">{f.success.text}</p>
                    <Button type="button" variant="outline-gold" size="md" className="mt-7" onClick={reset}>
                      {f.success.again}
                    </Button>
                  </div>
                ) : (
                  <form noValidate onSubmit={onSubmit} aria-labelledby="consultation-title">
                    <fieldset aria-describedby={errors.method ? `${uid}-method-err` : undefined}>
                      <legend className="text-[0.85rem] font-semibold text-ivory/85">{f.method}</legend>
                      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                        {f.methods.map((m, i) => {
                          const Icon = METHOD_ICONS[i]
                          const checked = fields.method === i
                          return (
                            <label
                              key={m}
                              className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-[0.86rem] font-medium transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                                checked ? 'border-gold bg-gold-grad text-ink' : errors.method ? 'border-urgent/70 text-ivory/80' : 'border-ivory/18 text-ivory/80 hover:border-gold/60'
                              }`}
                            >
                              <input id={i === 0 ? `${uid}-method` : undefined} type="radio" name={`${uid}-method`} className="sr-only" checked={checked} onChange={() => update('method', i)} />
                              <Icon className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                              {m}
                            </label>
                          )
                        })}
                      </div>
                      {errors.method && <ErrorText id={`${uid}-method-err`}>{errors.method}</ErrorText>}
                    </fieldset>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

                    <div className="mt-4">
                      <Field id={`${uid}-type`} label={f.type} error={errors.type}>
                        <div className="relative">
                          <select
                            id={`${uid}-type`}
                            value={fields.type}
                            onChange={(e) => update('type', e.target.value)}
                            aria-invalid={!!errors.type}
                            aria-describedby={errors.type ? `${uid}-type-err` : undefined}
                            className={`${inputClass(!!errors.type)} appearance-none pe-11 ${fields.type ? '' : 'text-muted'}`}
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
                          <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-gold-deep" strokeWidth={1.6} aria-hidden="true" />
                        </div>
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field id={`${uid}-message`} label={f.message} hint={f.optional}>
                        <textarea
                          id={`${uid}-message`}
                          rows={3}
                          placeholder={f.messagePlaceholder}
                          value={fields.message}
                          onChange={(e) => update('message', e.target.value)}
                          className={`${inputClass(false)} h-auto resize-y py-3 leading-relaxed`}
                        />
                      </Field>
                    </div>

                    <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <label className="flex cursor-pointer items-start gap-3 text-[0.84rem] leading-relaxed text-ivory/70">
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
                            className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-[0.3125rem] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${fields.consent ? 'border-gold bg-gold text-ink' : errors.consent ? 'border-urgent' : 'border-ivory/35'}`}
                          >
                            {fields.consent && <Check className="size-3.5" strokeWidth={2.5} />}
                          </span>
                          <span>
                            {f.consent}{' '}
                            <SmartLink href="/privacy" className="font-semibold text-gold-light underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                              {f.consentLink}
                            </SmartLink>
                            .
                          </span>
                        </label>
                        {errors.consent && <ErrorText id={`${uid}-consent-err`}>{errors.consent}</ErrorText>}
                      </div>
                      <Button type="submit" variant="gold" size="lg" disabled={status === 'sending'} className="shrink-0 disabled:cursor-wait disabled:opacity-80 max-sm:w-full">
                        {status === 'sending' ? (
                          <>
                            <LoaderCircle className="size-5 animate-spin" strokeWidth={1.6} aria-hidden="true" />
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
        </div>
      </div>
    </section>
  )
}

const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-[var(--radius-btn)] border bg-ivory px-4 text-[0.93rem] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4 ${
    invalid ? 'border-urgent focus:ring-urgent/25' : 'border-transparent focus:border-gold focus:ring-gold/25'
  }`

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[0.85rem] font-semibold text-ivory/85">
        {label}
        {hint && <span className="text-[0.78rem] font-normal text-ivory/50">{hint}</span>}
      </label>
      {children}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.8rem] text-[#F4A29A]">
      {children}
    </p>
  )
}

function ContactItem({ icon, href, label, value, ltr, external }: { icon: ReactNode; href: string; label: string; value: string; ltr?: boolean; external?: boolean }) {
  return (
    <li>
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full border border-gold/40 text-gold transition-colors group-hover:bg-gold/10" aria-hidden="true">
          {icon}
        </span>
        <span className="leading-tight">
          <span className="block text-[0.75rem] text-ivory/50">{label}</span>
          <span dir={ltr ? 'ltr' : undefined} className="block font-semibold text-ivory transition-colors group-hover:text-gold-light">
            {value}
          </span>
        </span>
      </a>
    </li>
  )
}
