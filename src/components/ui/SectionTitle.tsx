import type { ReactNode } from 'react'
import { Ornament } from './Ornament'

interface Props {
  id: string
  title: string
  lead?: string
  tone?: 'light' | 'dark'
  /** Small link pinned to the inline-end corner (e.g. "view all"). */
  action?: ReactNode
  className?: string
}

/** Centred section opener used across the home page, as in the client's layout (animated by data-anim="section-head"). */
export function SectionTitle({ id, title, lead, tone = 'light', action, className = '' }: Props) {
  const dark = tone === 'dark'
  return (
    <div className={`relative text-center ${className}`} data-anim="section-head">
      <h2 id={id} className={`font-display text-h2 ${dark ? 'text-ivory' : 'text-fg'}`}>
        {title}
      </h2>
      <Ornament className="mt-3" tone={tone} />
      {lead && <p data-anim-lead className={`mx-auto mt-3 max-w-[60ch] text-[0.98rem] ${dark ? 'text-ivory/70' : 'text-muted'}`}>{lead}</p>}
      {action && <div data-anim-lead className="mt-5 flex justify-center lg:absolute lg:end-0 lg:top-1 lg:mt-0">{action}</div>}
    </div>
  )
}
