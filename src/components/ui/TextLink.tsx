import type { ReactNode } from 'react'
import { ForwardArrow } from './Arrow'
import { SmartLink } from './SmartLink'

/** Inline link with a gold underline that draws in on hover. */
export function TextLink({ href, children, tone = 'light', className = '' }: { href: string; children: ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <SmartLink
      href={href}
      className={`group/link inline-flex items-center gap-2 text-[0.92rem] font-semibold ${tone === 'dark' ? 'text-gold-light' : 'text-gold-deep'} ${className}`}
    >
      <span className="relative">
        {children}
        <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100 ltr:origin-left rtl:origin-right" />
      </span>
      <ForwardArrow className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
    </SmartLink>
  )
}
