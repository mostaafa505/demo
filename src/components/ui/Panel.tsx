import type { ReactNode } from 'react'
import { Ornament } from './Ornament'

interface Props {
  id: string
  title: string
  lead?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Sand panel whose title sits in a notch on the top border, like a legend —
 * the framing device from the client's layout, drawn with a gold hairline.
 */
export function Panel({ id, title, lead, action, children, className = '' }: Props) {
  return (
    <section aria-labelledby={id} className={`relative flex min-w-0 flex-col rounded-[20px] border border-stone bg-sand/70 px-4 pb-5 pt-10 sm:px-6 sm:pb-6 ${className}`} data-reveal="panel">
      <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center">
        <h2 id={id} data-panel-notch className="font-display rounded-full border border-stone bg-ivory px-7 py-1.5 text-[clamp(1.25rem,1.1rem+0.5vw,1.6rem)] leading-normal text-fg">
          {title}
        </h2>
      </div>
      <div className="text-center">
        <Ornament />
        {lead && <p className="mx-auto mt-2 max-w-[52ch] text-[0.92rem] text-muted">{lead}</p>}
      </div>
      {action && <div className="mt-4 flex justify-center sm:absolute sm:end-5 sm:top-5 sm:mt-0">{action}</div>}
      <div className="mt-6 flex flex-1 flex-col [&>*]:flex-1">{children}</div>
    </section>
  )
}
