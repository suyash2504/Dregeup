import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { ArrowRight } from '../components/ui/Button'
import { Card, Pending } from '../components/ui/Bits'
import { daysUntil, examStatus, exams, formatDate } from '../data/exams'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Annotation } from '../components/ui/Sketch'

const statusStyles = {
  open: { label: 'Registration open', className: 'bg-brand text-ink' },
  closing: { label: 'Closing soon', className: 'bg-ink text-white' },
  upcoming: { label: 'Opens later', className: 'bg-brand-tint text-brand-deep' },
  closed: { label: 'Registration closed', className: 'bg-bg text-muted border border-line' },
  unknown: { label: 'Dates pending', className: 'bg-bg text-muted border border-dashed border-line' },
}

export default function Exams() {
  const ref = useReveal()
  const today = new Date()

  useSeo({
    title: 'Entrance exams 2026–27',
    description:
      'CAT, SNAP, XAT, NMAT, IBSAT, MAH MBA CET and NPAT — registration windows, exam dates and patterns, checked against each conducting body’s own website.',
    path: '/exams',
  })

  return (
    <>
      <PageHeader
        eyebrow="2026–27 cycle"
        title="Entrance exams, with dates you can"
        mark="trust"
        lead="Every date below is labelled with where it came from. Confirmed means we read it off the conducting body's own website — not off an aggregator's 'expected dates' table."
        crumbs={[{ label: 'Exams' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        <div className="rv mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-paper px-6 py-4 text-[13.5px]">
          <span className="font-bold text-ink">Legend</span>
          <span className="flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand" />
            Confirmed against the official site
          </span>
          <span className="flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border border-dashed border-muted" />
            Announced, not yet confirmed by us
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {exams.map((exam, i) => {
            const status = examStatus(exam, today)
            const style = statusStyles[status]
            const nextDate = exam.dates.find(
              (d) => d.confirmed && daysUntil(d.iso, today) >= 0
            )
            const confirmedCount = exam.dates.filter((d) => d.confirmed).length

            return (
              <Card key={exam.slug} className={`rv d${Math.min(i + 1, 6)} flex flex-col p-7`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[21px] font-extrabold tracking-[-0.035em]">{exam.name}</h2>
                    <p className="mt-1 text-[13.5px] text-muted">
                      {exam.fullName} · {exam.conductedBy}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em] ${style.className}`}
                  >
                    {style.label}
                  </span>
                </div>

                <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{exam.blurb}</p>

                {nextDate ? (
                  <div className="mt-5 flex items-baseline gap-3 rounded-xl border border-line bg-bg px-4 py-3">
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">
                      Next
                    </span>
                    <span className="text-[14.5px] font-bold text-ink">
                      {nextDate.label} · {formatDate(nextDate.iso)}
                    </span>
                    <span className="ml-auto text-[13px] font-semibold text-brand-deep">
                      {daysUntil(nextDate.iso, today)}d
                    </span>
                  </div>
                ) : (
                  <div className="mt-5">
                    <Pending>
                      {confirmedCount === 0 ? 'Dates pending official confirmation' : 'No upcoming dates'}
                    </Pending>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <Link
                    to={`/exams/${exam.slug}`}
                    className="group inline-flex items-center gap-2 text-[14px] font-bold text-ink transition-colors hover:text-brand-deep"
                  >
                    Full schedule
                    <ArrowRight />
                  </Link>
                  <a
                    href={exam.official}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Official site ↗
                  </a>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="rv mt-10">
          <Annotation>
            Dates change. Always re-check the official site before you pay a fee.
          </Annotation>
        </div>
      </section>
    </>
  )
}
