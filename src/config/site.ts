/**
 * Single source of truth for every contact detail on the site.
 * All values below are placeholders until the client confirms them.
 */
export const site = {
  domain: 'https://uaefamilylaw.ae',
  brand: {
    wordmark: 'UAE Non-Muslim Family Law',
    byline: 'by Ahmed El-Shawi Legal Consultancy',
  },
  phones: {
    office: { display: '+971 2 123 4567', href: 'tel:+97121234567' },
    mobile: { display: '+971 50 123 4567', href: 'tel:+971501234567' },
    emergency: { display: '+971 50 123 4567', href: 'tel:+971501234567' },
  },
  whatsapp: {
    display: '+971 50 123 4567',
    href: 'https://wa.me/971501234567',
  },
  email: 'info@uaefamilylaw.ae',
  address: {
    ar: 'المعمورة، أبوظبي، الإمارات العربية المتحدة',
    en: 'Al Mamoura, Abu Dhabi, United Arab Emirates',
    short: { ar: 'أبوظبي، المعمورة', en: 'Abu Dhabi, Al Mamoura' },
    mapUrl: 'https://maps.google.com/?q=Al+Mamoura+Abu+Dhabi',
  },
  hours: {
    ar: { days: 'الأحد – الخميس', time: '9:00 ص – 5:00 م' },
    en: { days: 'Sunday – Thursday', time: '9:00 AM – 5:00 PM' },
  },
  socials: {
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    x: 'https://x.com/',
    whatsapp: 'https://wa.me/971501234567',
  },
  trn: '100000000000000',
  clientPortalUrl: '#',
} as const

export type SocialKey = keyof typeof site.socials
