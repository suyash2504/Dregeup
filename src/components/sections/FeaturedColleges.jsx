import { Link } from 'react-router-dom'
import { colleges } from '../../data/catalogue'
import { useReveal } from '../../lib/hooks'
import { ArrowRight, Button } from '../ui/Button'
import { SectionHeading } from '../ui/Bits'
import CollegeCard from '../ui/CollegeCard'
import { Doodle } from '../ui/Sketch'

export default function FeaturedColleges() {
  const ref = useReveal()
  const featured = colleges.slice(0, 6)

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1240px] px-5 pt-24 sm:px-8">
      <Doodle glyph="spark" size={44} viewBox="0 0 52 54" className="right-[4%] top-14 hidden text-brand lg:block" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Colleges"
          title="Institutes students ask us about"
          mark="most"
          lead="Filter by stream, course or city — or let a counsellor cut the list down for you."
        />
        <Link
          to="/colleges"
          className="rv group hidden items-center gap-2 text-[15px] font-bold text-ink transition-colors hover:text-brand-deep sm:inline-flex"
        >
          View all colleges
          <ArrowRight />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c, i) => (
          <CollegeCard key={c.slug} college={c} className={`rv d${Math.min(i + 1, 6)}`} />
        ))}
      </div>

      <div className="rv mt-8 sm:hidden">
        <Button to="/colleges" variant="secondary" arrow className="w-full">
          View all colleges
        </Button>
      </div>
    </section>
  )
}
