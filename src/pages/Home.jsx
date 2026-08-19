import { useSeo, organisationSchema } from '../lib/seo'
import Hero from '../components/sections/Hero'
import ExamTicker from '../components/sections/ExamTicker'
import WhyChoose from '../components/sections/WhyChoose'
import Explore from '../components/sections/Explore'
import Process from '../components/sections/Process'
import FeaturedColleges from '../components/sections/FeaturedColleges'
import NewsStrip from '../components/sections/NewsStrip'

export default function Home() {
  useSeo({
    title: null,
    description:
      'Explore top colleges, discover the right courses and get free admission guidance — all in one place. 50+ colleges, 100+ courses, 250+ expert counsellors.',
    path: '/',
    schema: organisationSchema,
  })

  return (
    <>
      <Hero />
      <ExamTicker />
      <WhyChoose />
      <Explore />
      <Process />
      <FeaturedColleges />
      <NewsStrip />
    </>
  )
}
