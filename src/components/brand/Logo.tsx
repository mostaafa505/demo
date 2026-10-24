import { useId } from 'react'
import { site } from '../../config/site'

/** Ionic column mark, drawn as a thin gold line icon. */
export function ColumnMark({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 48 56" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E6CB8E" />
          <stop offset=".5" stopColor="#C9A45C" />
          <stop offset="1" stopColor="#9C7A3C" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5h38" />
        <path d="M9 9.5h30" />
        <path d="M9 9.5c-3.2 0-4.4 4.6-1.2 5.4 1.8.4 3-1 2.6-2.4" />
        <path d="M39 9.5c3.2 0 4.4 4.6 1.2 5.4-1.8.4-3-1-2.6-2.4" />
        <path d="M13 15.5h22" />
        <path d="M15.5 18.5v24M21 18.5v24M27 18.5v24M32.5 18.5v24" />
        <path d="M12 45.5h24" />
        <path d="M8.5 49.5h31" />
        <path d="M6 53h36" />
      </g>
    </svg>
  )
}

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Hide the byline for very compact placements. */
  compact?: boolean
}

const SIZES = {
  sm: { mark: 'h-9 w-8', word: 'text-[0.95rem]', by: 'text-[0.6rem]', gap: 'gap-2.5' },
  md: { mark: 'h-11 w-10', word: 'text-[1.12rem] xl:text-[1.22rem]', by: 'text-[0.66rem]', gap: 'gap-3' },
  lg: { mark: 'h-14 w-12', word: 'text-[1.45rem]', by: 'text-[0.75rem]', gap: 'gap-3.5' },
}

/** Brand lock-up. Always set left-to-right: it is an English wordmark. */
export function Logo({ size = 'md', className = '', compact = false }: LogoProps) {
  const s = SIZES[size]
  return (
    <span dir="ltr" className={`inline-flex items-center ${s.gap} ${className}`}>
      <ColumnMark className={`${s.mark} shrink-0`} />
      <span className="flex flex-col text-start">
        <span
          className={`font-[family-name:var(--font-latin-display)] whitespace-nowrap font-semibold uppercase leading-[1.02] tracking-[0.045em] text-ivory ${s.word}`}
        >
          UAE Non-Muslim
          <br />
          Family Law
        </span>
        {!compact && (
          <span className={`mt-1 whitespace-nowrap border-t border-gold/35 pt-1 font-[family-name:var(--font-latin)] font-medium tracking-[0.02em] text-gold ${s.by}`}>
            {site.brand.byline}
          </span>
        )}
      </span>
    </span>
  )
}
