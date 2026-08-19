import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, Pending } from '../components/ui/Bits'
import { daysUntil, formatDate, getExam } from '../data/exams'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'

function DateRow({ date, today }) {
  const days = daysUntil(date.iso, today)
  const past = days < 0

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
      <span
        aria-hidden="true"
        className={[
          'h-2.5 w-2.5 shrink-0 rounded-full',
          date.confirmed
            ? past
              ? 'bg-line'
              : date.exam
                ? 'bg-ink'
                : 'bg-brand'
            : 'border border-dashed border-muted',
        ].join(' ')}
      />
      <span className={`min-w-0 flex-1 text-[15px] font-bold ${past ? 'text-muted line-through' : 'text-ink'}`}>
        {date.label}
      </span>
      <span className={`text-[14.5px] ${past ? 'text-muted' : 'font-semibold text-ink-soft'}`}>
        {formatDate(date.iso, { long: true })}
        {date.note && <span className="text-muted"> · {date.note}</span>}
      </span>
      <span className="w-16 shrink-0 text-right text-[13px] font-semibold text-muted">
        {past ? 'passed' : days === 0 ? 'today' : `${days}d`}
      </span>
      {!date.confirmed && (
        <span className="w-full">
          <Pending className="mt-1">Not yet confirmed by us</Pending>
        </span>
      )}
    </li>
  )
}

export default function ExamDetail() {
  const { slug } = useParams()
  const exam = getExam(slug)
  const ref = useReveal()
  const today = new Date()

  useSeo({
    title: exam?.name,
    description: exam
      ? `${exam.name} (${exam.fullName}) — registration dates, exam dates, pattern and eligibility, checked against ${exam.conductedBy}'s official site.`
      : undefined,
    path: `/exams/${slug}`,
  })

  if (!exam) return <Navigate to="/exams" replace />

  const hasDates = exam.dates.length > 0

  return (
    <>
      <PageHeader
        eyebrow={exam.conductedBy}
        title={exam.name}
        lead={exam.blurb}
        crumbs={[{ label: 'Exams', to: '/exams' }, { label: exam.name }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href={exam.official} target="_blank" rel="noopener noreferrer" arrow>
            Official site
          </Button>
          <Button to="/counselling" variant="secondary">
            Get guidance on this exam
          </Button>
        </div>
      </PageHeader>

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-10 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* schedule */}
          <Card hover={false} className="rv p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[20px] font-extrabold tracking-[-0.035em]">Important dates</h2>
              <span className="text-[12.5px] font-semibold text-muted">
                Last checked {formatDate(exam.verifiedOn)}
              </span>
            </div>

            {hasDates ? (
              <ul className="mt-4 divide-y divide-line">
                {exam.dates.map((d) => (
                  <DateRow key={`${d.label}-${d.iso}`} date={d} today={today} />
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-line bg-bg p-6">
                <Pending>No dates published yet</Pending>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {exam.conductedBy}'s site could not be read automatically when this page was
                  built, so nothing is shown rather than something guessed. Check the official
                  site, or ask a counsellor who tracks this cycle.
                </p>
              </div>
            )}

            {exam.session && (
              <p className="mt-5 border-t border-line pt-4 text-[13.5px] text-muted">
                For the {exam.session} academic session.
              </p>
            )}
          </Card>

          {/* facts */}
          <div className="space-y-4">
            <Card hover={false} className="rv d1 p-7">
              <h2 className="text-[17px] font-bold tracking-[-0.02em]">Fee</h2>
              {exam.fee?.pending ? (
                <div className="mt-3">
                  <Pending>To be verified</Pending>
                </div>
              ) : (
                <>
                  <p className="mt-3 text-[24px] font-extrabold tracking-[-0.04em]">
                    {exam.fee.general}
                    {exam.fee.reserved && (
                      <span className="text-[16px] font-bold text-muted"> / {exam.fee.reserved}</span>
                    )}
                  </p>
                  {exam.fee.note && (
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{exam.fee.note}</p>
                  )}
                  {!exam.fee.confirmed && (
                    <div className="mt-3">
                      <Pending>Not yet confirmed by us</Pending>
                    </div>
                  )}
                </>
              )}
            </Card>

            {exam.highlight && (
              <div className="rv d2 rounded-[var(--radius-card)] border border-[#EBD9AE] bg-brand-tint p-6">
                <p className="font-hand text-[21px] leading-snug text-brand-deep">{exam.highlight}</p>
              </div>
            )}

            <Card hover={false} className="rv d3 p-7">
              <h2 className="text-[17px] font-bold tracking-[-0.02em]">Who accepts it</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{exam.accepted}</p>
              {exam.acceptedConfirmed === false && (
                <div className="mt-3">
                  <Pending>Not yet confirmed by us</Pending>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* pattern + eligibility */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card hover={false} className="rv p-7">
            <h2 className="text-[17px] font-bold tracking-[-0.02em]">Exam pattern</h2>
            {exam.pattern?.pending || (!exam.pattern?.sections?.length && !exam.pattern?.questions) ? (
              <div className="mt-3">
                <Pending>To be verified</Pending>
              </div>
            ) : (
              <>
                <div className="mt-4 flex flex-wrap gap-6">
                  {exam.pattern.questions && exam.pattern.questions !== '—' && (
                    <div>
                      <div className="text-[22px] font-extrabold tracking-[-0.04em]">
                        {exam.pattern.questions}
                      </div>
                      <div className="text-[12.5px] font-semibold text-muted">Questions</div>
                    </div>
                  )}
                  {exam.pattern.duration && (
                    <div>
                      <div className="text-[22px] font-extrabold tracking-[-0.04em]">
                        {exam.pattern.duration}
                      </div>
                      <div className="text-[12.5px] font-semibold text-muted">Duration</div>
                    </div>
                  )}
                </div>

                {exam.pattern.sections?.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {exam.pattern.sections.map((s) => (
                      <li key={s} className="flex gap-2.5 text-[14.5px] leading-relaxed text-ink-soft">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}

                {exam.pattern.marking && (
                  <p className="mt-5 border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted">
                    {exam.pattern.marking}
                  </p>
                )}

                {!exam.pattern.confirmed && (
                  <div className="mt-4">
                    <Pending>Not yet confirmed by us</Pending>
                  </div>
                )}
              </>
            )}
          </Card>

          <Card hover={false} className="rv d1 p-7">
            <h2 className="text-[17px] font-bold tracking-[-0.02em]">Eligibility</h2>
            {exam.eligibility ? (
              <>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">{exam.eligibility}</p>
                {!exam.eligibilityConfirmed && (
                  <div className="mt-4">
                    <Pending>Not yet confirmed by us</Pending>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-3">
                <Pending>To be verified</Pending>
              </div>
            )}

            {exam.helpdesk && (
              <p className="mt-5 border-t border-line pt-4 text-[13.5px] text-muted">
                Official helpdesk:{' '}
                <a href={`mailto:${exam.helpdesk}`} className="font-semibold text-ink underline-offset-4 hover:underline">
                  {exam.helpdesk}
                </a>
              </p>
            )}
          </Card>
        </div>
      </section>
    </>
  )
}
