import { ArrowRight, ChevronRight, type LucideProps } from 'lucide-react'

/** "Forward" arrow: points right in English, left in Arabic. */
export function ForwardArrow({ className = 'size-4', ...props }: LucideProps) {
  return <ArrowRight strokeWidth={1.5} aria-hidden="true" className={`rtl:-scale-x-100 ${className}`} {...props} />
}

export function ForwardChevron({ className = 'size-4', ...props }: LucideProps) {
  return <ChevronRight strokeWidth={1.5} aria-hidden="true" className={`rtl:-scale-x-100 ${className}`} {...props} />
}
