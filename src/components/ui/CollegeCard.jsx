import { Link } from 'react-router-dom'
import { streamLabel } from '../../data/catalogue'
import { cn } from '../../lib/hooks'
import { ArrowRight } from './Button'

/** Deterministic initials so every college has a stable mark without a logo file. */
const initials = (name) =>
  name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

export default function CollegeCard({ college, className }) {
  return (
    <Link
      to={`/colleges/${college.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-[var(--shadow-soft)]',
        'transition-[transform,box-shadow,border-color] duration-350 ease-[var(--ease-out)]',
        'hover:-translate-y-1.5 hover:border-[#EBD9AE] hover:shadow-[var(--shadow-lift)]',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-tint to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"
      />

      <span className="relative flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-line bg-bg text-[15px] font-extrabold tracking-[-0.03em] text-brand-deep">
          {initials(college.name)}
        </span>
        <span className="min-w-0">
          <h3 className="text-[16.5px] font-bold leading-snug tracking-[-0.025em]">
            {college.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[13.5px] text-muted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
            {college.city}
          </p>
        </span>
      </span>

      <span className="relative mt-5 flex flex-wrap gap-1.5">
        {college.streams.map((s) => (
          <span
            key={s}
            className="rounded-md border border-line bg-bg px-2 py-[3px] text-[11.5px] font-semibold text-ink-soft"
          >
            {streamLabel(s)}
          </span>
        ))}
      </span>

      <span className="relative mt-auto flex items-center gap-2 pt-6 text-[13.5px] font-bold text-ink">
        View college
        <ArrowRight />
      </span>
    </Link>
  )
}
