import type { ReactNode } from 'react'

/** Icon set in a gold-ringed medallion — the recurring icon frame across the site. */
export function Medallion({ children, size = 'md', tone = 'cream', className = '' }: { children: ReactNode; size?: 'sm' | 'md' | 'lg'; tone?: 'cream' | 'gold' | 'ink'; className?: string }) {
  const sizes = { sm: 'size-10 [&_svg]:size-[1.125rem]', md: 'size-12 [&_svg]:size-[1.375rem]', lg: 'size-14 [&_svg]:size-6' }
  const tones = {
    cream: 'bg-cream text-gold-deep ring-1 ring-gold/35 ring-offset-2 ring-offset-white',
    gold: 'bg-gold-grad text-ink shadow-[var(--shadow-gold)]',
    ink: 'bg-ink text-gold-light ring-1 ring-gold/40',
  }
  return <span className={`grid shrink-0 place-items-center rounded-full ${sizes[size]} ${tones[tone]} ${className}`}>{children}</span>
}
