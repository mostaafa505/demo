import { Coins, Gem, Globe, HeartCrack, Landmark, MapPin, ScrollText, UsersRound, type LucideProps } from 'lucide-react'
import type { ServiceIcon as ServiceIconKey } from '../../content/types'

const ICONS = {
  marriage: Gem,
  divorce: HeartCrack,
  children: UsersRound,
  maintenance: Coins,
  inheritance: Landmark,
  wills: ScrollText,
  international: Globe,
  emirates: MapPin,
} satisfies Record<ServiceIconKey, unknown>

export function ServiceIcon({ name, ...props }: { name: ServiceIconKey } & LucideProps) {
  const Icon = ICONS[name]
  return <Icon strokeWidth={1.5} aria-hidden="true" {...props} />
}
