import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { ArrowRight } from '../components/ui/Button'
import { courses, streamLabel } from '../data/catalogue'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Annotation } from '../components/ui/Sketch'

const levels = [
  { key: '', label: 'All' },
  { key: 'UG', label: 'Undergraduate' },
  { key: 'PG', label: 'Postgraduate' },
]

export default function Courses() {
  const [level, setLevel] = useState('')
  const ref = useReveal()

  const shown = level ? courses.filter((c) => c.level === level) : courses

  useSeo({
    title: 'Courses',
    description:
      'MBA, B.Tech, MBBS, BBA, B.Com, LLB and more — duration, entry point and the colleges that teach them.',
    path: '/courses',
  })

  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="Start from the qualification, not the"
        mark="brochure"
        lead="Twelve course families across nine streams. Pick one to see which colleges in the catalogue teach it."
        crumbs={[{ label: 'Courses' }]}
      >
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setLevel(l.key)}
              aria-pressed={level === l.key}
              className={[
                'rounded-full border px-4 py-2 text-[13.5px] font-semibold',
                'transition-[transform,background-color,border-color,box-shadow] duration-250 ease-[var(--ease-out)]',
                level === l.key
                  ? 'border-brand bg-brand text-ink shadow-[0_6px_16px_rgb(244_185_66/0.32)]'
                  : 'border-line bg-paper text-ink-soft hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint',
              ].join(' ')}
            >
              {l.label}
            </button>
          ))}
        </div>
      </PageHeader>

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        <p className="rv text-[14.5px] font-semibold text-ink-soft" role="status" aria-live="polite">
          {shown.length} course {shown.length === 1 ? 'family' : 'families'}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Link
              key={c.slug}
              to={`/colleges?stream=${c.stream}`}
              className={`rv d${Math.min((i % 6) + 1, 6)} group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-350 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-[#EBD9AE] hover:shadow-[var(--shadow-lift)]`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-tint to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"
              />
              <span className="relative flex flex-1 flex-col">
                <span className="flex items-center gap-2">
                  <span className="rounded-md bg-brand-tint px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-deep">
                    {c.level}
                  </span>
                  <span className="text-[12.5px] font-semibold text-muted">
                    {streamLabel(c.stream)}
                  </span>
                </span>

                <h2 className="mt-4 text-[24px] font-extrabold tracking-[-0.04em]">{c.name}</h2>
                <p className="mt-1.5 text-[14px] text-muted">
                  {c.years} · after {c.after}
                </p>

                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[13.5px] font-bold text-ink">
                  See colleges
                  <ArrowRight />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="rv mt-10">
          <Annotation>
            Specialisations, fees and curricula come from each college — ask a counsellor.
          </Annotation>
        </div>
      </section>
    </>
  )
}
