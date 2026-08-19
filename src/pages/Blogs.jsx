import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, Pending } from '../components/ui/Bits'
import { examUpdates, posts } from '../data/posts'
import { formatDate } from '../data/exams'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'

export default function Blogs() {
  const ref = useReveal()
  const updates = examUpdates(new Date(), 10)

  useSeo({
    title: 'Blogs & updates',
    description:
      'Exam calendar updates drawn straight from official notifications, plus guidance articles from the Dregeup team.',
    path: '/blogs',
  })

  return (
    <>
      <PageHeader
        eyebrow="Blogs & updates"
        title="What changed this"
        mark="week"
        lead="The update feed is generated from the verified exam calendar, so it cannot go stale on its own. The article shelf below is a different matter."
        crumbs={[{ label: 'Blogs' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        {/* live updates */}
        <h2 className="rv text-[22px] font-extrabold tracking-[-0.035em]">Exam calendar updates</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {updates.map((u, i) => (
            <li key={u.slug} className={`rv d${Math.min((i % 6) + 1, 6)}`}>
              <Link
                to={`/exams/${u.examSlug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-350 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-[#EBD9AE] hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex items-center gap-2.5">
                  <span className="rounded-md bg-brand-tint px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-deep">
                    {u.category}
                  </span>
                  <span className="text-[12.5px] font-semibold text-muted">
                    {formatDate(u.date)}
                  </span>
                </span>
                <h3 className="mt-4 text-[16.5px] font-bold leading-snug tracking-[-0.02em]">
                  {u.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-muted">{u.detail}</p>
                <span className="mt-auto pt-5 text-[13.5px] font-bold text-brand-deep">
                  Read the schedule →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* editorial */}
        <h2 className="rv mt-16 text-[22px] font-extrabold tracking-[-0.035em]">Articles</h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {posts.map((p) => (
            <Card key={p.slug} hover={false} className="rv p-7">
              <span className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md border border-line bg-bg px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-muted">
                  {p.category}
                </span>
                <span className="text-[12.5px] font-semibold text-muted">
                  {formatDate(p.date)}
                </span>
              </span>
              <h3 className="mt-4 text-[17px] font-bold leading-snug tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] text-muted">By {p.author}</p>
              <div className="mt-5 border-t border-dashed border-line pt-4">
                <Pending note={`Carried over from ${p.source} by title only.`}>
                  Article body to be added
                </Pending>
              </div>
            </Card>
          ))}

          {/* the honest empty state */}
          <Card
            hover={false}
            className="rv d1 flex flex-col justify-center border-dashed p-7 lg:col-span-2"
          >
            <p className="font-hand text-[26px] text-brand-deep">The shelf is nearly empty.</p>
            <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-muted">
              dregeup.com carries one article, from March 2023, and a news section still filing
              CBSE 2021 and CAT 2022 items. Those were not carried across — a stale feed reads
              worse than an honest gap. The layout is ready; it needs writing.
            </p>
            <div className="mt-6">
              <Button to="/exams" variant="secondary" arrow>
                Meanwhile, see the exam calendar
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
