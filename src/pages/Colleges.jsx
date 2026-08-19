import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import CollegeCard from '../components/ui/CollegeCard'
import { Button } from '../components/ui/Button'
import { cities, filterColleges, streams } from '../data/catalogue'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Annotation } from '../components/ui/Sketch'

/**
 * The College Explorer. Filter state lives in the URL, not in component state,
 * so a filtered view is linkable, shareable and survives a refresh — and the
 * footer's "Management" style links are just this page with a query string.
 */
export default function Colleges() {
  const [params, setParams] = useSearchParams()
  const ref = useReveal()

  const q = params.get('q') ?? ''
  const stream = params.get('stream') ?? ''
  const city = params.get('city') ?? ''

  const results = useMemo(() => filterColleges({ q, stream, city }), [q, stream, city])
  const activeCount = [q, stream, city].filter(Boolean).length

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const streamName = streams.find((s) => s.slug === stream)?.label

  useSeo({
    title: streamName ? `${streamName} colleges` : 'Explore colleges',
    description:
      'Filter colleges by stream, city or name, and get free admission guidance from a Dregeup counsellor.',
    path: '/colleges',
  })

  return (
    <>
      <PageHeader
        eyebrow="College Explorer"
        title="Find the college that fits"
        mark="you"
        lead="Filter by stream, city or name. Every result links to a counsellor who knows that institute's admission process."
        crumbs={[{ label: 'Colleges' }]}
      >
        {/* search */}
        <div className="flex w-full max-w-[690px] items-center gap-2 rounded-[18px] border border-line bg-paper py-[9px] pl-5 pr-[9px] shadow-[var(--shadow-lift)] transition-[box-shadow,border-color] duration-300 focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgb(244_185_66/0.18),var(--shadow-lift)]">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <label htmlFor="college-search" className="sr-only">
            Search colleges
          </label>
          <input
            id="college-search"
            type="search"
            value={q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search colleges, cities or streams"
            className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[15.5px] text-ink outline-none placeholder:text-muted"
          />
        </div>
      </PageHeader>

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pb-4 pt-8 sm:px-8">
        {/* filters */}
        <div className="rv space-y-4">
          <div>
            <h2 className="mb-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Stream
            </h2>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={!stream} onClick={() => update('stream', '')}>
                All
              </FilterChip>
              {streams.map((s) => (
                <FilterChip
                  key={s.slug}
                  active={stream === s.slug}
                  onClick={() => update('stream', stream === s.slug ? '' : s.slug)}
                >
                  {s.label}
                </FilterChip>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              City
            </h2>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={!city} onClick={() => update('city', '')}>
                All
              </FilterChip>
              {cities.map((c) => (
                <FilterChip
                  key={c}
                  active={city === c}
                  onClick={() => update('city', city === c ? '' : c)}
                >
                  {c}
                </FilterChip>
              ))}
            </div>
          </div>
        </div>

        {/* result count */}
        <div className="rv d1 mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[14.5px] font-semibold text-ink-soft" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? 'college' : 'colleges'}
            {activeCount > 0 && <span className="text-muted"> · {activeCount} filter{activeCount > 1 ? 's' : ''} on</span>}
          </p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="text-[14px] font-bold text-brand-deep underline-offset-4 transition-opacity hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* results */}
        {results.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c, i) => (
              <CollegeCard key={c.slug} college={c} className={`rv d${Math.min((i % 6) + 1, 6)}`} />
            ))}
          </div>
        ) : (
          <div className="rv mt-6 rounded-[var(--radius-card)] border border-dashed border-line bg-paper px-6 py-16 text-center">
            <p className="font-hand text-[26px] text-brand-deep">Nothing matched that.</p>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
              The catalogue covers {streams.length} streams across {cities.length} cities. Try a
              broader filter — or just ask a counsellor, who can search a lot more than this page can.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                onClick={() => setParams(new URLSearchParams(), { replace: true })}
              >
                Clear filters
              </Button>
              <Button to="/counselling" arrow>
                Ask a counsellor
              </Button>
            </div>
          </div>
        )}

        <div className="rv mt-10">
          <Annotation>Can't find your college? A counsellor probably can.</Annotation>
        </div>
      </section>
    </>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-full border px-4 py-2 text-[13.5px] font-semibold',
        'transition-[transform,background-color,border-color,box-shadow] duration-250 ease-[var(--ease-out)]',
        active
          ? 'border-brand bg-brand text-ink shadow-[0_6px_16px_rgb(244_185_66/0.32)]'
          : 'border-line bg-paper text-ink-soft hover:-translate-y-0.5 hover:border-brand hover:bg-brand-tint',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
