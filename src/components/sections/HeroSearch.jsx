import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { courses, cities } from '../../data/catalogue'

/**
 * The search band that sits between the hero and the stats card.
 *
 * It is a real form, not a decorative input: submitting hands the query to the
 * College Explorer, which already reads `q` from the URL. That means one search
 * implementation, not two — the hero is just another way to set the same
 * parameter.
 */
const SUGGESTIONS = [
  ...courses.slice(0, 3).map((c) => c.name),
  ...cities.slice(0, 2),
]

export default function HeroSearch() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const value = q.trim()
    navigate(value ? `/colleges?q=${encodeURIComponent(value)}` : '/colleges')
  }

  return (
    <div className="rv d4 mt-12">
      <form
        onSubmit={submit}
        role="search"
        className="flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[22px] border border-line bg-paper p-5 shadow-[var(--shadow-lift)] sm:flex-nowrap sm:p-6"
      >
        <div className="flex w-full items-baseline gap-3 sm:w-auto sm:shrink-0">
          <span className="text-[15px] font-extrabold tracking-[-0.02em]">
            Start your search
          </span>
          <span className="font-hand text-[18px] leading-none text-brand-deep sm:hidden">
            50+ colleges
          </span>
        </div>

        <div className="flex w-full min-w-0 flex-1 items-center gap-2 rounded-2xl border border-line bg-bg py-1.5 pl-4 pr-1.5 transition-[border-color,box-shadow] duration-300 focus-within:border-brand focus-within:bg-paper focus-within:shadow-[0_0_0_4px_rgb(244_185_66/0.18)]">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>

          <label htmlFor="hero-search" className="sr-only">
            Search colleges, courses or cities
          </label>
          <input
            id="hero-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="College, course ya city…"
            className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[15px] text-ink outline-none placeholder:text-muted"
          />

          <button
            type="submit"
            className="group shrink-0 rounded-xl bg-brand px-5 py-2.5 text-[14px] font-bold text-ink transition-[background-color,transform,box-shadow] duration-250 ease-[var(--ease-out)] hover:-translate-y-px hover:bg-brand-bright hover:shadow-[0_8px_20px_rgb(244_185_66/0.4)]"
          >
            Search
          </button>
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
          <span className="mr-1 text-[12.5px] font-semibold text-muted">Popular:</span>
          {SUGGESTIONS.map((s) => (
            <Link
              key={s}
              to={`/colleges?q=${encodeURIComponent(s)}`}
              className="rounded-full border border-line bg-bg px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft transition-[transform,background-color,border-color] duration-250 ease-[var(--ease-out)] hover:-translate-y-px hover:border-brand hover:bg-brand hover:text-ink"
            >
              {s}
            </Link>
          ))}
        </div>
      </form>
    </div>
  )
}
