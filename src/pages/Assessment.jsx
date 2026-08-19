import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Bits'
import { questions, scoreAnswers, streamNotes } from '../data/assessment'
import { streamLabel } from '../data/catalogue'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Annotation, Doodle, Marked } from '../components/ui/Sketch'

export default function Assessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const ref = useReveal()

  useSeo({
    title: 'Free career assessment',
    description:
      'An eight-question sorter that maps what you enjoy and how you think onto the streams and courses worth a serious look.',
    path: '/assessment',
  })

  const total = questions.length
  const q = questions[step]
  const result = useMemo(() => (done ? scoreAnswers(answers) : null), [done, answers])

  const choose = (index) => {
    setAnswers((prev) => ({ ...prev, [q.id]: index }))
    // Small pause so the selected state is visible before the card advances.
    setTimeout(() => {
      if (step + 1 >= total) setDone(true)
      else setStep((s) => s + 1)
    }, 220)
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setDone(false)
  }

  const progress = done ? 100 : Math.round((step / total) * 100)

  return (
    <>
      <PageHeader
        eyebrow="Career assessment"
        title="Eight questions. Then a real"
        mark="conversation"
        lead="This is a sorter, not a verdict. It narrows nine streams down to the two or three worth talking about — a counsellor takes it from there."
        crumbs={[{ label: 'Assessment' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[820px] px-5 pt-8 sm:px-8">
        {/* progress */}
        <div className="rv mb-7">
          <div className="mb-2.5 flex items-center justify-between text-[13px] font-semibold">
            <span className="text-muted">
              {done ? 'Complete' : `Question ${step + 1} of ${total}`}
            </span>
            <span className="text-brand-deep">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-500 ease-[var(--ease-out)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!done ? (
          <Card hover={false} className="rv d1 relative overflow-hidden p-7 sm:p-9">
            <Doodle glyph="spark" size={40} viewBox="0 0 52 54" className="right-6 top-6 hidden text-brand sm:block" />

            <h2 className="max-w-lg text-[clamp(21px,2.6vw,27px)] leading-snug">{q.prompt}</h2>

            <div className="mt-7 space-y-2.5">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => choose(i)}
                    className={[
                      'flex w-full items-center gap-4 rounded-2xl border p-4 text-left',
                      'transition-[transform,background-color,border-color,box-shadow] duration-250 ease-[var(--ease-out)]',
                      selected
                        ? 'border-brand bg-brand-tint shadow-[0_6px_18px_rgb(244_185_66/0.28)]'
                        : 'border-line bg-paper hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint/50',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-[13px] font-extrabold',
                        selected
                          ? 'border-brand bg-brand text-ink'
                          : 'border-line bg-bg text-muted',
                      ].join(' ')}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[15.5px] font-semibold leading-snug text-ink">
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-[14px] font-bold text-muted transition-colors hover:text-ink disabled:opacity-40 disabled:hover:text-muted"
              >
                ← Back
              </button>
              <span className="font-hand text-[18px] text-muted">
                No wrong answers here
              </span>
            </div>
          </Card>
        ) : (
          <Result result={result} onRestart={restart} />
        )}

        <div className="rv mt-8">
          <Annotation>Nothing is stored — this runs entirely in your browser.</Annotation>
        </div>
      </section>
    </>
  )
}

function Result({ result, onRestart }) {
  const { ranked, confidence } = result

  if (confidence === 'none') {
    return (
      <Card hover={false} className="rv d1 p-7 text-center sm:p-10">
        <h2 className="text-[26px]">That one's genuinely open.</h2>
        <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-muted">
          You skipped the questions that carry the signal, which is a fair answer in itself —
          plenty of students arrive undecided. This is exactly the case a counsellor is useful for.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/counselling" arrow>
            Talk to a counsellor
          </Button>
          <Button variant="secondary" onClick={onRestart}>
            Start again
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card hover={false} className="rv d1 relative overflow-hidden p-7 sm:p-9">
        <Doodle glyph="star" size={48} className="right-7 top-6 hidden text-brand sm:block" />

        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-muted">
          Your result
        </p>
        <h2 className="mt-3 text-[clamp(24px,3.2vw,34px)] leading-tight">
          {confidence === 'clear' ? (
            <>
              You lean clearly towards <Marked>{streamLabel(ranked[0].slug)}</Marked>.
            </>
          ) : (
            <>
              You sit between a <Marked>few streams</Marked>.
            </>
          )}
        </h2>
        <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted">
          {confidence === 'clear'
            ? 'One stream pulled well ahead of the rest. That is a strong starting point — but worth pressure-testing against fees, entrance exams and where you can realistically study.'
            : 'No single stream ran away with it, which usually means your interests are genuinely broad rather than that the quiz failed. The shortlist below is where to start looking.'}
        </p>

        <ol className="mt-8 space-y-3">
          {ranked.map((r, i) => (
            <li
              key={r.slug}
              className={[
                'flex gap-4 rounded-2xl border p-5',
                i === 0 ? 'border-brand bg-brand-tint' : 'border-line bg-bg',
              ].join(' ')}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-paper text-[14px] font-extrabold text-brand-deep">
                {i + 1}
              </span>
              <span>
                <h3 className="text-[17.5px] font-bold tracking-[-0.025em]">
                  {streamLabel(r.slug)}
                </h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">
                  {streamNotes[r.slug]}
                </p>
                <Link
                  to={`/colleges?stream=${r.slug}`}
                  className="mt-2.5 inline-block text-[13.5px] font-bold text-brand-deep underline-offset-4 hover:underline"
                >
                  See {streamLabel(r.slug).toLowerCase()} colleges →
                </Link>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-7 border-t border-line pt-5 text-[13.5px] leading-relaxed text-muted">
          This is an interest sorter built by Dregeup, not a psychometric instrument, and it does
          not account for your marks, budget or entrance scores. Treat it as the first ten minutes
          of a longer conversation.
        </p>
      </Card>

      <div className="rv d2 mt-6 flex flex-wrap gap-3">
        <Button to="/counselling" size="lg" arrow>
          Discuss this with a counsellor
        </Button>
        <Button variant="secondary" size="lg" onClick={onRestart}>
          Retake the assessment
        </Button>
      </div>
    </>
  )
}
