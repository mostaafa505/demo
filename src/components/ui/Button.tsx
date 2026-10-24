import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { SmartLink } from './SmartLink'

type Variant = 'gold' | 'outline-light' | 'outline-dark' | 'urgent' | 'ink'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  gold: 'bg-gold-grad text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-14px_rgb(201_164_92/0.9)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_14px_30px_-12px_rgb(201_164_92/0.95)] hover:brightness-[1.04]',
  'outline-light': 'border border-ivory/30 text-ivory hover:border-gold hover:text-gold-light',
  'outline-dark': 'border border-fg/20 text-fg hover:border-gold-deep hover:text-gold-deep',
  urgent: 'bg-urgent text-white hover:bg-urgent-deep',
  ink: 'bg-ink text-ivory hover:bg-navy',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.82rem] gap-2',
  md: 'h-11 px-5 text-[0.92rem] gap-2.5',
  lg: 'h-[3.4rem] px-7 text-[1rem] gap-3',
}

export const buttonClass = (variant: Variant = 'gold', size: Size = 'md', className = '') =>
  `group/btn relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--radius-btn)] font-semibold transition-[background-color,border-color,color,box-shadow,filter] duration-300 ${VARIANTS[variant]} ${SIZES[size]} ${className}`

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
