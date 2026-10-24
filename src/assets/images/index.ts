// Placeholder photography cropped from the reference designs (low resolution).
// Replace each file with the client's real photo at the size listed in IMAGES.md.
import heroFamily from './hero-family-skyline.webp'
import heroScales from './hero-scales-desk.webp'
import civilMarriage from './service-civil-marriage.webp'
import divorce from './service-divorce.webp'
import childrenCustody from './service-children-custody.webp'
import maintenance from './service-maintenance.webp'
import inheritance from './service-inheritance.webp'
import wills from './service-wills.webp'
import international from './service-international.webp'
import emirates from './service-emirates.webp'
import abuDhabi from './city-abu-dhabi.webp'
import dubai from './city-dubai.webp'
import sharjah from './city-sharjah.webp'
import ahmed from './lawyer-ahmed-el-shawi.webp'
import sara from './lawyer-sara-mahmoud.webp'
import karim from './lawyer-karim-el-awady.webp'
import testimonialPen from './testimonial-pen.webp'
import gavelBooks from './knowledge-gavel-books.webp'
import article from './knowledge-article.webp'
import podcast from './knowledge-podcast.webp'
import video from './knowledge-video.webp'
import skylineDusk from './skyline-abu-dhabi-dusk.webp'
import footerSkyline from './footer-skyline.webp'
import ctaSkyline from './cta-skyline.webp'
import type { ServiceImage } from '../../content/types'

export const images = {
  hero: heroFamily,
  heroMobile: heroScales,
  services: {
    'civil-marriage': civilMarriage,
    divorce,
    'children-custody': childrenCustody,
    maintenance,
    inheritance,
    wills,
    international,
    emirates,
  } satisfies Record<ServiceImage, string>,
  cities: { 'abu-dhabi': abuDhabi, dubai, sharjah } as Record<string, string>,
  lawyers: { 'ahmed-el-shawi': ahmed, 'sara-mahmoud': sara, 'karim-el-awady': karim } as Record<string, string>,
  // The reference's video still has a play button baked in, so a skyline stands in.
  knowledge: { article, podcast, video: skylineDusk, gavelBooks, videoStill: video },
  testimonialPen,
  skylineDusk,
  footerSkyline,
  ctaSkyline,
}
