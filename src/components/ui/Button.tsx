import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { SmartLink } from './SmartLink'

type Variant = 'gold' | 'outline-gold' | 'outline-dark' | 'soft' | 'urgent' | 'ink' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // Primary: gold leaf with a fine top highlight
  gold: 'sheen bg-gold-grad text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.4),var(--shadow-gold)] hover:brightness-[1.05]',
  // Gold outline on dark grounds
  'outline-gold': 'border border-gold/70 text-gold-light hover:bg-gold/10 hover:border-gold',
  // Gold outline on light grounds
  'outline-dark': 'border border-gold-deep/60 bg-white/60 text-gold-ink hover:border-gold-deep hover:bg-cream',
  // Quiet sand chip ("Explore")
  soft: 'bg-cream text-gold-ink ring-1 ring-inset ring-gold/25 hover:bg-gold-grad hover:text-ink hover:ring-transparent',
  urgent: 'bg-urgent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-urgent-deep',
  ink: 'bg-ink text-ivory hover:bg-navy',
  'outline-light': 'border border-ivory/30 text-ivory hover:border-gold hover:text-gold-light',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.82rem] gap-2',
  md: 'h-11 px-5 text-[0.9rem] gap-2.5',
  lg: 'h-[3.25rem] px-7 text-[0.98rem] gap-3',
}

export const buttonClass = (variant: Variant = 'gold', size: Size = 'md', className = '') =>
  `group/btn relative inline-flex shrink-0 items-center justify-center whitespace-nowrap [&_svg]:shrink-0 rounded-[var(--radius-btn)] font-semibold transition-[background-color,border-color,color,box-shadow,filter] duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export const ButtonLink = forwardRef<HTMLAnchorElement, CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }>(function ButtonLink(
  { variant, size, className, children, href, ...rest },
  ref,
) {
  return (
    <SmartLink ref={ref} href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </SmartLink>
  )
})

export function Button({ variant, size, className, children, ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}
