import logoDark from '../../assets/brand/logo-desktop-dark.webp'
import logoLight from '../../assets/brand/logo-desktop-light.webp'
import logoMobile from '../../assets/brand/logo-mobile-light.webp'
import { site } from '../../config/site'

type Variant = 'light' | 'dark' | 'mobile'

const SOURCES: Record<Variant, { src: string; w: number; h: number }> = {
  light: { src: logoLight, w: 560, h: 151 }, // ivory lettering, for dark grounds
  dark: { src: logoDark, w: 560, h: 151 }, // black lettering, for light grounds
  mobile: { src: logoMobile, w: 480, h: 112 }, // three-line mobile lock-up, for dark grounds
}

/** The client's logo files (references/client), knocked out by scripts/process-assets.py. */
export function Logo({ variant = 'light', className = '' }: { variant?: Variant; className?: string }) {
  const s = SOURCES[variant]
  return <img src={s.src} width={s.w} height={s.h} alt={`${site.brand.wordmark} — ${site.brand.byline}`} className={`block w-auto ${className}`} decoding="async" />
}

/** Just the gold column from the logo, for the compact header. */
export function LogoMark({ className = 'h-10' }: { className?: string }) {
  return (
    <span className={`block aspect-[0.78] overflow-hidden ${className}`} aria-hidden="true">
      <img src={logoLight} alt="" className="h-full w-auto max-w-none" decoding="async" />
    </span>
  )
}
