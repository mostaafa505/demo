import { Consultation } from '../sections/Consultation'
import { Emirates } from '../sections/Emirates'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Knowledge } from '../sections/Knowledge'
import { Lawyers } from '../sections/Lawyers'
import { QuickTools } from '../sections/QuickTools'
import { Services } from '../sections/Services'
import { Testimonials } from '../sections/Testimonials'
import { WhyUs } from '../sections/WhyUs'

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <QuickTools />
      <WhyUs />
      <Emirates />
      <Lawyers />
      <Testimonials />
      <Knowledge />
      <Faq />
      <Consultation />
    </>
  )
}
