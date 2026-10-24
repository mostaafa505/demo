// Client photography (references/client), exported by scripts/process-assets.py as responsive WebP.
// Lawyer portraits are still low-resolution crops of the reference — see IMAGES.md.
import cityAbuDhabi1200 from './city-abu-dhabi-1200.webp'
import cityAbuDhabi480 from './city-abu-dhabi-480.webp'
import cityAbuDhabi800 from './city-abu-dhabi-800.webp'
import cityDubai1200 from './city-dubai-1200.webp'
import cityDubai480 from './city-dubai-480.webp'
import cityDubai800 from './city-dubai-800.webp'
import citySharjah1200 from './city-sharjah-1200.webp'
import citySharjah480 from './city-sharjah-480.webp'
import citySharjah800 from './city-sharjah-800.webp'
import footerArt1400 from './footer-art-1400.webp'
import footerArt2167 from './footer-art-2167.webp'
import heroDesktop1024 from './hero-desktop-1024.webp'
import heroDesktop1440 from './hero-desktop-1440.webp'
import heroDesktop1774 from './hero-desktop-1774.webp'
import heroSlide1280 from './hero-slide-1280.webp'
import heroSlide1774 from './hero-slide-1774.webp'
import heroSlide800 from './hero-slide-800.webp'
import gavel1024 from './knowledge-gavel-1024.webp'
import gavel480 from './knowledge-gavel-480.webp'
import gavel800 from './knowledge-gavel-800.webp'
import ahmed from './lawyer-ahmed-el-shawi.webp'
import karim from './lawyer-karim-el-awady.webp'
import sara from './lawyer-sara-mahmoud.webp'
import children1200 from './service-children-custody-1200.webp'
import children480 from './service-children-custody-480.webp'
import children800 from './service-children-custody-800.webp'
import marriage1200 from './service-civil-marriage-1200.webp'
import marriage480 from './service-civil-marriage-480.webp'
import marriage800 from './service-civil-marriage-800.webp'
import divorce1200 from './service-divorce-1200.webp'
import divorce480 from './service-divorce-480.webp'
import divorce800 from './service-divorce-800.webp'
import emirates1200 from './service-emirates-1200.webp'
import emirates2000 from './service-emirates-2000.webp'
import emirates480 from './service-emirates-480.webp'
import emirates800 from './service-emirates-800.webp'
import inheritance1200 from './service-inheritance-1200.webp'
import inheritance480 from './service-inheritance-480.webp'
import inheritance800 from './service-inheritance-800.webp'
import international1200 from './service-international-1200.webp'
import international480 from './service-international-480.webp'
import international800 from './service-international-800.webp'
import maintenance1200 from './service-maintenance-1200.webp'
import maintenance480 from './service-maintenance-480.webp'
import maintenance800 from './service-maintenance-800.webp'
import wills1200 from './service-wills-1200.webp'
import wills480 from './service-wills-480.webp'
import wills800 from './service-wills-800.webp'
import type { ServiceImage } from '../../content/types'

export interface Picture {
  src: string
  srcSet: string
}

const pic = (sources: Record<number, string>): Picture => {
  const widths = Object.keys(sources).map(Number).sort((a, b) => a - b)
  return { src: sources[widths[Math.min(1, widths.length - 1)]], srcSet: widths.map((w) => `${sources[w]} ${w}w`).join(', ') }
}

export const images = {
  hero: pic({ 1024: heroDesktop1024, 1440: heroDesktop1440, 1774: heroDesktop1774 }),
  heroMobile: pic({ 800: heroSlide800, 1280: heroSlide1280, 1774: heroSlide1774 }),
  services: {
    'civil-marriage': pic({ 480: marriage480, 800: marriage800, 1200: marriage1200 }),
    divorce: pic({ 480: divorce480, 800: divorce800, 1200: divorce1200 }),
    'children-custody': pic({ 480: children480, 800: children800, 1200: children1200 }),
    maintenance: pic({ 480: maintenance480, 800: maintenance800, 1200: maintenance1200 }),
    inheritance: pic({ 480: inheritance480, 800: inheritance800, 1200: inheritance1200 }),
    wills: pic({ 480: wills480, 800: wills800, 1200: wills1200 }),
    international: pic({ 480: international480, 800: international800, 1200: international1200 }),
    emirates: pic({ 480: emirates480, 800: emirates800, 1200: emirates1200 }),
  } satisfies Record<ServiceImage, Picture>,
  cities: {
    'abu-dhabi': pic({ 480: cityAbuDhabi480, 800: cityAbuDhabi800, 1200: cityAbuDhabi1200 }),
    dubai: pic({ 480: cityDubai480, 800: cityDubai800, 1200: cityDubai1200 }),
    sharjah: pic({ 480: citySharjah480, 800: citySharjah800, 1200: citySharjah1200 }),
  } as Record<string, Picture>,
  lawyers: { 'ahmed-el-shawi': ahmed, 'sara-mahmoud': sara, 'karim-el-awady': karim } as Record<string, string>,
  ctaBand: pic({ 800: emirates800, 1200: emirates1200, 2000: emirates2000 }),
  footerArt: pic({ 1400: footerArt1400, 2167: footerArt2167 }),
  knowledgeGavel: pic({ 480: gavel480, 800: gavel800, 1024: gavel1024 }),
}
