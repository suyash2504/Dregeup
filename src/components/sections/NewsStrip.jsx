import { Link } from 'react-router-dom'
import { examUpdates } from '../../data/posts'
import { formatDate } from '../../data/exams'
import { useReveal } from '../../lib/hooks'
import { ArrowRight } from '../ui/Button'
import { SectionHeading } from '../ui/Bits'

const urgencyStyles = {
  soon: 'bg-brand text-ink',
  near: 'bg-brand-tint text-brand-deep',
  later: 'bg-bg text-muted border border-line',
  past: 'bg-bg text-muted border border-line',
}

const urgencyLabel = ({ urgency, days }) => {
  if (urgency === 'past') return 'Done'
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  return `In ${days} days`
}

export default function NewsStrip() {
  const ref = useReveal()
  const updates = examUpdates(new Date(), 6)
  if (updates.length === 0) return null

  return (
    <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-24 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="News & updates"
          title="What's happening"
          mark="right now"
          lead="Generated from the verified exam calendar, so this list re-sorts itself as dates pass."
        />
        <Link
          to="/exams"
          className="rv group hidden items-center gap-2 text-[15px] font-bold text-ink transition-colors hover:text-brand-deep sm:inline-flex"
        >
          View all exams
          <ArrowRight />
        </Link>
      </div>

      <ul className="mt-10 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-[var(--shadow-soft)]">
        {updates.map((u, i) => (
          <li key={u.slug} className={`rv d${Math.min(i + 1, 6)}`}>
            <Link
              to={`/exams/${u.examSlug}`}
              className="group flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-5 transition-colors duration-300 hover:bg-brand-tint/45 sm:px-7"
            >
              <span
                className={`inline-flex shrink-0 rounded-full px-3 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.08em] ${urgencyStyles[u.urgency]}`}
              >
                {urgencyLabel(u)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-bold tracking-[-0.02em]">{u.title}</span>
                <span className="mt-0.5 block text-[13.5px] text-muted">{u.detail}</span>
              </span>
              <span className="hidden shrink-0 text-[13px] font-semibold text-muted sm:block">
                {formatDate(u.date)}
              </span>
              <ArrowRight className="shrink-0 text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
