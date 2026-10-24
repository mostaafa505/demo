/** Ionic-capital divider, drawn from the column in the logo. */
export function Ornament({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const line = tone === 'dark' ? 'via-gold/60' : 'via-gold/70'
  return (
    <span className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true" data-ornament>
      <span data-ornament-line className={`h-px w-12 bg-gradient-to-r from-transparent ${line} to-gold sm:w-16 rtl:bg-gradient-to-l`} />
      <svg viewBox="0 0 40 14" className="h-3.5 w-10 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M9 4.5h22" />
        <path d="M9 4.5c-3.6 0-5 4.6-1.6 5.4 2 .5 3.2-1 2.7-2.4-.4-1-1.6-1.2-2.2-.5" />
        <path d="M31 4.5c3.6 0 5 4.6 1.6 5.4-2 .5-3.2-1-2.7-2.4.4-1 1.6-1.2 2.2-.5" />
        <path d="M14 8.5h12" />
        <path d="M20 1.5v1" />
      </svg>
      <span data-ornament-line className={`h-px w-12 bg-gradient-to-l from-transparent ${line} to-gold sm:w-16 rtl:bg-gradient-to-r`} />
    </span>
  )
}
