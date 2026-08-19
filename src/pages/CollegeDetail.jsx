import { Navigate, useParams, Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, Pending } from '../components/ui/Bits'
import CollegeCard from '../components/ui/CollegeCard'
import { colleges, getCollege, streamLabel } from '../data/catalogue'
import { contact } from '../data/site'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Doodle } from '../components/ui/Sketch'

/**
 * A college page with the gaps left visible.
 *
 * Fees, cutoffs, placements, rankings and accreditation are the fields a
 * student most wants and the fields we could not verify. Rather than filling
 * them with plausible-looking numbers, each renders a labelled gap and a route
 * to a counsellor who can actually answer. Wire real data into catalogue.js and
 * these sections light up on their own.
 */
const gapSections = [
  {
    key: 'courses',
    heading: 'Courses & intake',
    blurb: 'Programme list, seats per programme, and the specialisations on offer.',
  },
  {
    key: 'fees',
    heading: 'Fees & scholarships',
    blurb: 'Year-wise tuition, hostel and one-time charges, plus any scholarship or waiver schemes.',
  },
  {
    key: 'admissions',
    heading: 'Admission process',
    blurb: 'Accepted entrance exams, cutoff trend, selection rounds and the document checklist.',
  },
  {
    key: 'placements',
    heading: 'Placements',
    blurb: 'Placement percentage, median and highest package, and the recruiters who actually visit.',
  },
  {
    key: 'campus',
    heading: 'Campus & facilities',
    blurb: 'Hostel, library, labs, sports and the student clubs worth knowing about.',
  },
]

export default function CollegeDetail() {
  const { slug } = useParams()
  const college = getCollege(slug)
  const ref = useReveal()

  useSeo({
    title: college?.name,
    description: college
      ? `${college.name}, ${college.city} — courses, admissions and free counselling through Dregeup.`
      : undefined,
    path: `/colleges/${slug}`,
    schema: college
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollegeOrUniversity',
          name: college.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: college.city,
            addressCountry: 'IN',
          },
        }
      : undefined,
  })

  if (!college) return <Navigate to="/colleges" replace />

  const related = colleges
    .filter(
      (c) =>
        c.slug !== college.slug &&
        (c.city === college.city || c.streams.some((s) => college.streams.includes(s)))
    )
    .slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={college.city}
        title={college.name}
        lead={`Teaching ${college.streams.map(streamLabel).join(', ').toLowerCase()}. Talk to a counsellor who has worked this institute's admission cycle before.`}
        crumbs={[{ label: 'Colleges', to: '/colleges' }, { label: college.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/counselling" arrow>
            Get free guidance
          </Button>
          <Button href={contact.phoneHref} variant="secondary">
            Call {contact.phone}
          </Button>
        </div>
      </PageHeader>

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-10 sm:px-8">
        {/* honest data banner */}
        <div className="rv relative overflow-hidden rounded-[var(--radius-card)] border border-[#EBD9AE] bg-brand-tint p-6 sm:p-7">
          <Doodle glyph="bulb" size={46} className="right-6 top-4 hidden text-brand-deep/40 sm:block" />
          <h2 className="text-[17px] font-bold tracking-[-0.02em]">
            What we publish, and what we don't
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
            Dregeup lists this institute, so its name, city and streams are shown here. Fees,
            cutoffs, placement figures and rankings are not — those were not published in a form
            we could verify, and a wrong number costs a student a year. A counsellor has the
            current figures and will walk you through them.
          </p>
        </div>

        {/* quick facts */}
        <dl className="rv d1 mt-6 grid gap-4 sm:grid-cols-3">
          <Card hover={false} className="p-6">
            <dt className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">City</dt>
            <dd className="mt-2 text-[19px] font-bold tracking-[-0.03em]">{college.city}</dd>
          </Card>
          <Card hover={false} className="p-6">
            <dt className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">Streams</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {college.streams.map((s) => (
                <Link
                  key={s}
                  to={`/colleges?stream=${s}`}
                  className="rounded-md border border-line bg-bg px-2 py-1 text-[12.5px] font-semibold text-ink-soft transition-colors hover:border-brand hover:bg-brand/20"
                >
                  {streamLabel(s)}
                </Link>
              ))}
            </dd>
          </Card>
          <Card hover={false} className="p-6">
            <dt className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Accreditation
            </dt>
            <dd className="mt-2">
              <Pending>To be verified</Pending>
            </dd>
          </Card>
        </dl>

        {/* the gaps, made explicit */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {gapSections.map((s, i) => (
            <Card key={s.key} hover={false} className={`rv d${Math.min(i + 1, 6)} p-7`}>
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[17px] font-bold tracking-[-0.02em]">{s.heading}</h2>
                <Pending className="shrink-0">To be updated</Pending>
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.blurb}</p>
              <div className="mt-5 border-t border-dashed border-line pt-4">
                <Link
                  to="/counselling"
                  className="text-[14px] font-bold text-brand-deep underline-offset-4 hover:underline"
                >
                  Ask a counsellor for this →
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="rv text-[22px] font-extrabold tracking-[-0.035em]">
              Similar colleges
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <CollegeCard key={c.slug} college={c} className={`rv d${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
