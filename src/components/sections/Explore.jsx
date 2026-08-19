import { Link } from 'react-router-dom'
import { courses, streams } from '../../data/catalogue'
import { useReveal } from '../../lib/hooks'
import { ArrowRight, Button } from '../ui/Button'
import { SectionHeading } from '../ui/Bits'
import { Doodle } from '../ui/Sketch'

export default function Explore() {
  const ref = useReveal()
  const featured = courses.slice(0, 8)

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1240px] px-5 pt-24 sm:px-8">
      <Doodle glyph="book" size={52} viewBox="0 0 50 46" rotate={-9} className="left-[2%] top-20 hidden text-brand xl:block" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Courses"
          title="Explore your"
          mark="possibilities"
          lead="Twelve course families across nine streams. Start from the qualification you want, not from a college brochure."
        />
        <Link
          to="/courses"
          className="rv group hidden items-center gap-2 text-[15px] font-bold text-ink transition-colors hover:text-brand-deep sm:inline-flex"
        >
          View all courses
          <ArrowRight />
        </Link>
      </div>

      {/* stream chips */}
      <div className="rv d1 mt-8 flex flex-wrap gap-2">
        {streams.map((s) => (
          <Link
            key={s.slug}
            to={`/colleges?stream=${s.slug}`}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[13.5px] font-semibold text-ink-soft transition-[transform,background-color,border-color,box-shadow] duration-250 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-ink hover:shadow-[0_6px_16px_rgb(244_185_66/0.32)]"
          >
            {s.label}
            <span className="text-[12px] text-muted transition-colors group-hover:text-ink/60">
              {s.count}
            </span>
          </Link>
        ))}
      </div>

      {/* course cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((c, i) => (
          <Link
            key={c.slug}
            to={`/colleges?stream=${c.stream}`}
            className={`rv d${Math.min(i + 1, 6)} group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-350 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-[#EBD9AE] hover:shadow-[var(--shadow-lift)]`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-tint to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"
            />
            <span className="relative">
              <span className="inline-flex rounded-md bg-brand-tint px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-deep">
                {c.level}
              </span>
              <h3 className="mt-4 text-[21px] font-extrabold tracking-[-0.035em]">{c.name}</h3>
              <p className="mt-1.5 text-[14px] text-muted">
                {c.years} · after {c.after}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-ink">
                View colleges
                <ArrowRight />
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="rv mt-8 sm:hidden">
        <Button to="/courses" variant="secondary" arrow className="w-full">
          View all courses
        </Button>
      </div>
    </section>
  )
}
