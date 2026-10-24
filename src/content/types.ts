export type Lang = 'ar' | 'en'

export interface Link {
  label: string
  href: string
}

export interface SubLink extends Link {
  description?: string
}

export interface NavItem extends Link {
  children?: SubLink[]
  /** Renders the wide services mega-menu instead of a simple dropdown. */
  mega?: boolean
}

export type ServiceIcon =
  | 'marriage'
  | 'divorce'
  | 'children'
  | 'maintenance'
  | 'inheritance'
  | 'wills'
  | 'international'
  | 'emirates'

export type ServiceImage =
  | 'civil-marriage'
  | 'divorce'
  | 'children-custody'
  | 'maintenance'
  | 'inheritance'
  | 'wills'
  | 'international'
  | 'emirates'

export interface Service {
  slug: string
  icon: ServiceIcon
  image: ServiceImage
  title: string
  description: string
  href: string
}

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  separator?: string
  label: string
}

export interface Content {
  meta: { title: string; description: string }
  a11y: {
    skipToContent: string
    openMenu: string
    closeMenu: string
    mainNav: string
    call: string
    whatsapp: string
    switchLanguage: string
    previous: string
    next: string
    rating: string
    opensInNewTab: string
  }
  langSwitch: { current: string; other: string; otherFull: string }
  header: {
    searchLabel: string
    searchPlaceholder: string
    phoneCaption: string
    book: string
    bookShort: string
    login: string
    emergency: string
    menuContactTitle: string
    mega: { title: string; text: string; cta: string; allServices: string }
  }
  nav: NavItem[]
  hero: {
    eyebrow: string
    title: string
    text: string
    primaryCta: string
    secondaryCta: string
    trust: string[]
    imageAlt: string
  }
  services: {
    eyebrow: string
    title: string
    lead: string
    explore: string
    viewAll: string
    items: Service[]
  }
  tools: {
    eyebrow: string
    title: string
    lead: string
    booking: { title: string; text: string; methods: string[]; cta: string }
    assess: { title: string; text: string; steps: string[]; cta: string }
    portal: { title: string; text: string; features: string[]; badge: string; cta: string }
  }
  why: {
    eyebrow: string
    title: string
    lead: string
    pillars: { title: string; text: string }[]
    stats: Stat[]
  }
  emirates: {
    eyebrow: string
    title: string
    lead: string
    items: { slug: string; name: string; text: string; cta: string; href: string; imageAlt: string }[]
  }
  lawyers: {
    eyebrow: string
    title: string
    lead: string
    viewProfile: string
    viewTeam: string
    items: { slug: string; name: string; role: string; bio: string; href: string; imageAlt: string }[]
  }
  testimonials: {
    eyebrow: string
    title: string
    lead: string
    viewAll: string
    items: { quote: string; initials: string; name: string; city: string; matter: string; rating: number }[]
  }
  knowledge: {
    eyebrow: string
    title: string
    lead: string
    viewAll: string
    readMore: string
    latest: string
    categories: { key: 'articles' | 'videos' | 'podcast' | 'webinars' | 'faq'; title: string; text: string; href: string }[]
    articles: {
      category: string
      title: string
      date: string
      readTime: string
      href: string
      image: 'article' | 'podcast' | 'video'
    }[]
  }
  faq: {
    eyebrow: string
    title: string
    lead: string
    viewAll: string
    items: { q: string; a: string }[]
  }
  consultation: {
    eyebrow: string
    title: string
    lead: string
    reassurance: string[]
    callTitle: string
    emailTitle: string
    officeTitle: string
    hoursTitle: string
    form: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      type: string
      typePlaceholder: string
      typeOptions: string[]
      method: string
      methods: string[]
      message: string
      messagePlaceholder: string
      optional: string
      consent: string
      consentLink: string
      submit: string
      submitting: string
      errors: { name: string; email: string; type: string; method: string; consent: string }
      success: { title: string; text: string; again: string }
    }
  }
  footer: {
    about: string
    tagline: string
    columns: { title: string; links: Link[] }[]
    contactTitle: string
    contact: { phone: string; whatsapp: string; email: string; office: string; hours: string; chatNow: string }
    cta: { title: string; text: string; primary: string; secondary: string }
    legal: Link[]
    copyright: string
    trn: string
    followUs: string
    mobileNav: { label: string; href: string; icon: 'services' | 'emirates' | 'international' | 'knowledge' | 'lawyers' | 'stories' | 'about' }[]
  }
  actionBar: { book: string; whatsapp: string; call: string; emergency: string }
  placeholder: { title: string; text: string; back: string }
}
