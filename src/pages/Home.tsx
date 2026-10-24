import { Consultation } from '../sections/Consultation'
import { Faq } from '../sections/Faq'
import { Hero } from '../sections/Hero'
import { Knowledge } from '../sections/Knowledge'
import { QuickTools } from '../sections/QuickTools'
import { Services } from '../sections/Services'
import { Voices } from '../sections/Voices'
import { WhyEmirates } from '../sections/WhyEmirates'

export function Home() {
  return (
    <div className="paper bg-ivory">
      <Hero />
      <Services />
      <QuickTools />
      <WhyEmirates />
      <Voices />
      <Knowledge />
      <Faq />
      <Consultation />
    </div>
  )
}
