import { CalendarDays, Phone, Siren } from 'lucide-react'
import { useRef } from 'react'
import { site } from '../../config/site'
import { useLang } from '../../i18n/LanguageProvider'
import { gsap, ScrollTrigger, useGSAP } from '../../motion/gsap'
import { SocialIcon } from '../brand/SocialIcon'
import { SmartLink } from '../ui/SmartLink'

/** Sticky bottom actions on phones and tablets; steps aside once the footer is in view. */
export function MobileActionBar() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bar = ref.current!
    const footer = document.getElementById('site-footer')
    if (!footer) return
    const st = ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom-=40',
      onToggle: (self) => gsap.to(bar, { yPercent: self.isActive ? 110 : 0, duration: 0.5, ease: self.isActive ? 'power3.in' : 'expo.out', overwrite: true }),
    })
    return () => st.kill()
  })

  const cell = 'flex flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold'
  return (
    <div ref={ref} className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden">
      <nav aria-label={t.actionBar.book} className="grid h-16 grid-cols-[1.6fr_1fr_1fr_1fr]">
        <SmartLink href="/#consultation" className={`${cell} bg-gold-grad text-ink`}>
          <CalendarDays className="size-5" strokeWidth={1.5} aria-hidden="true" />
          {t.actionBar.book}
        </SmartLink>
        <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${cell} text-ivory`}>
          <SocialIcon name="whatsapp" className="size-5 text-gold" />
          {t.actionBar.whatsapp}
        </a>
        <a href={site.phones.mobile.href} className={`${cell} border-x border-gold/15 text-ivory`}>
          <Phone className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
          {t.actionBar.call}
        </a>
        <a href={site.phones.emergency.href} className={`${cell} bg-urgent text-white`}>
          <Siren className="size-5" strokeWidth={1.5} aria-hidden="true" />
          {t.actionBar.emergency}
        </a>
      </nav>
    </div>
  )
}
