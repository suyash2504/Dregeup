import { Link } from 'react-router-dom'
import { formatDate, upcomingMilestones } from '../../data/exams'

/**
 * Live exam-date ticker. Reads straight from the confirmed dates in exams.js,
 * so it is either accurate or empty — there is no hand-written copy to go
 * stale. If every confirmed date has passed, the strip removes itself rather
 * than scrolling old news.
 */
export default function ExamTicker() {
  const items = upcomingMilestones(8)
  if (items.length === 0) return null

  // Rendered twice; the keyframe translates by -50% for a seamless loop.
  const run = [...items, ...items]

  return (
    <div className="ticker-host overflow-hidden border-y border-line bg-brand">
      <div className="ticker-track py-[15px] text-[14.5px] font-bold tracking-[-0.01em] text-ink">
        {run.map((m, i) => (
          <span key={`${m.slug}-${m.iso}-${i}`} className="mx-7 inline-flex items-center gap-2">
            <Link
              to={`/exams/${m.slug}`}
              className="underline-offset-4 transition-opacity hover:underline hover:opacity-80"
            >
              {m.exam} — {m.label.toLowerCase()} {formatDate(m.iso)}
            </Link>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
