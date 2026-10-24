import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageProvider'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Internal paths go through the router (and get the language prefix); everything else is a plain anchor. */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink({ href, ...rest }, ref) {
  const { localize } = useLang()
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith('http')
    return <a ref={ref} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest} />
  }
  if (href.startsWith('#')) return <a ref={ref} href={href} {...rest} />
  return <Link ref={ref} to={localize(href)} {...rest} />
})
