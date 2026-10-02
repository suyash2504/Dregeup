import { Link } from 'react-router-dom'
import { stats } from '../../data/site'
import { examStatus, exams, formatDate } from '../../data/exams'
import { useReveal } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { Annotation, Doodle, Marked, Tape } from '../ui/Sketch'
import { Pill, Stat } from '../ui/Bits'
import HeroSearch from './HeroSearch'

/**
 * Picks the most useful live fact for the hero badge: the nearest confirmed
 * registration deadline. Falls back to the generic admission-cycle line only
 * when nothing is confirmed — never invents a date.
 */
function useHeadlineDeadline() {
  const today = new Date()
  const t = today.setHours(0, 0, 0, 0)

  const next = exams
    .flatMap((e) =>
      e.dates
        .filter((d) => d.confirmed && d.deadline && new Date(d.iso).getTime() >= t)
        .map((d) => ({ exam: e, date: d }))
    )
    .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))[0]

  if (!next) return null
  return {
    label: next.exam.name,
    when: formatDate(next.date.iso),
    status: examStatus(next.exam, today),
    to: `/exams/${next.exam.slug}`,
  }
}

export default function Hero() {
  const ref = useReveal({ threshold: 0.05 })
  const deadline = useHeadlineDeadline()

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div aria-hidden="true" className="paper-grid paper-fade absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-6 pt-12 sm:px-8 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          {/* ---------------- copy ---------------- */}
          <div>
            <div className="rv">
              {deadline ? (
                <Link to={deadline.to} className="inline-block">
                  <Pill className="transition-transform duration-250 ease-[var(--ease-out)] hover:-translate-y-0.5">
                    {deadline.label} registration closes{' '}
                    <em className="not-italic font-normal text-muted">{deadline.when}</em>
                  </Pill>
                </Link>
              ) : (
                <Pill>
                  Counselling open for{' '}
                  <em className="not-italic font-normal text-muted">2026–27</em>
                </Pill>
              )}
            </div>

            <h1 className="rv d1 mt-6 text-[clamp(38px,5.1vw,68px)] leading-[1.02]">
              Guiding talents,
              <br />
              shaping <Marked>futures</Marked>.
            </h1>

            <p className="rv d2 mt-6 max-w-[520px] text-[clamp(16px,1.2vw,18.5px)] leading-relaxed text-muted">
              Explore top colleges, discover the right courses and get admission guidance —
              all in one place. Counselling is free, at every stage.
            </p>

            <div className="rv d3 mt-8 flex flex-wrap gap-3">
              <Button to="/colleges" arrow>
                Explore Colleges
              </Button>
              <Button to="/assessment" variant="secondary">
                Take Free Assessment
              </Button>
            </div>

            <div className="rv d4 mt-7">
              <Annotation>Takes about 8 minutes</Annotation>
            </div>
          </div>

          {/* ---------------- taped photo ---------------- */}
          <div className="relative">
            <div className="rv d3 relative rounded-[20px] bg-paper p-[13px] shadow-[var(--shadow-lift)] [transform:rotate(-1.6deg)] transition-transform duration-500 ease-[var(--ease-out)] hover:[transform:rotate(-0.4deg)_translateY(-4px)]">
              <Tape />
              <img
                src={`${import.meta.env.BASE_URL}photos/hero-lecture.jpg`}
                alt="Students seated together in a lecture hall, listening and taking notes"
                width="1200"
                height="675"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3.35] w-full rounded-xl object-cover"
              />
            </div>

            <span className="rv d5 absolute right-2 top-8 z-10 rounded-[16px_16px_16px_4px] bg-ink px-[19px] py-[11px] font-hand text-[20px] leading-none text-white shadow-[var(--shadow-lift)] sm:-right-6">
              Dream Big!
            </span>

            <Doodle
              glyph="star"
              size={58}
              className="-left-4 bottom-10 text-brand sm:-left-11"
            />
            <Doodle
              glyph="cap"
              size={54}
              viewBox="0 0 54 40"
              rotate={8}
              float="doodle-float-slow"
              className="-bottom-9 right-6 text-brand sm:-right-7 sm:bottom-4"
            />
          </div>
        </div>

        {/* ---------------- search ---------------- */}
        <HeroSearch />

        {/* ---------------- stats card ---------------- */}
        <div className="rv d5 mt-5 grid grid-cols-2 overflow-hidden rounded-[22px] border border-line bg-paper shadow-[var(--shadow-lift)] sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => {
            // Five cells into a 2-col grid leaves the last one stranded beside
            // an empty box, so it spans the full row instead. The 3-col
            // breakpoint divides evenly enough to leave alone.
            const orphan2col = i === stats.length - 1 && stats.length % 2 === 1

            return (
              <div
                key={s.label}
                className={[
                  'transition-colors duration-300 hover:bg-brand-tint/60',
                  'border-b border-r border-line',
                  orphan2col ? 'col-span-2 border-r-0 sm:col-span-1' : '',
                  'last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0',
                  'lg:border-b-0 lg:border-r lg:last:border-r-0',
                ].join(' ')}
              >
                <Stat value={s.value} suffix={s.suffix} label={s.label} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
