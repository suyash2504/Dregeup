import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, Pending, Stat } from '../components/ui/Bits'
import { contact, process, stats } from '../data/site'
import { useReveal } from '../lib/hooks'
import { useSeo, organisationSchema } from '../lib/seo'
import { Doodle, Marked, Tape } from '../components/ui/Sketch'

/**
 * Sections we have structure for but no verified content. Listed explicitly so
 * the gap is a visible to-do rather than a page that quietly omits the things
 * a student would want to check before trusting a consultancy.
 */
const unverified = [
  { heading: 'Founding story', blurb: 'When Dregeup started, who started it, and why.' },
  { heading: 'Leadership', blurb: 'Names, roles and backgrounds of the people running it.' },
  { heading: 'Registration details', blurb: 'Legal entity, registration number and registered address.' },
  { heading: 'College partnerships', blurb: 'Which institutes Dregeup has a formal relationship with.' },
  { heading: 'How Dregeup is paid', blurb: 'If counselling is free to students, who pays — and how that affects recommendations.' },
]

export default function About() {
  const ref = useReveal()

  useSeo({
    title: 'About',
    description:
      'Dregeup is an education consultancy in Wakad, Pune, helping students find colleges and courses and guiding them through admission — at no cost to the student.',
    path: '/about',
    schema: organisationSchema,
  })

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An admission consultancy, not a"
        mark="college"
        lead="Dregeup does not teach or award degrees. It helps students find the institute that fits and walks them through getting in — and the counselling costs the student nothing."
        crumbs={[{ label: 'About' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        {/* intro + photo */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rv">
            <h2 className="text-[clamp(24px,3.2vw,34px)] leading-tight">
              Don't guess your future. <Marked>Design it.</Marked>
            </h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-muted">
              <p>
                Most students pick a college from a ranking list, a cousin's advice and whatever
                came up first in search. That is a fifteen-lakh decision made on very thin
                information.
              </p>
              <p>
                Dregeup exists to put something better in front of that decision: an assessment
                that maps what you actually enjoy onto streams that suit it, a catalogue you can
                filter properly, and a counsellor who has worked the admission cycle at these
                institutes before.
              </p>
              <p className="font-hand text-[22px] text-brand-deep">Guiding talents, shaping future.</p>
            </div>
          </div>

          <div className="rv d2 relative">
            <div className="relative rounded-[20px] bg-paper p-[13px] shadow-[var(--shadow-lift)] [transform:rotate(-1.4deg)]">
              <Tape className="left-[38%]" />
              <img
                src={`${import.meta.env.BASE_URL}photos/graduate.jpg`}
                alt="A graduating student in cap and gown, smiling"
                width="900"
                height="506"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3.2] w-full rounded-xl object-cover"
              />
            </div>
            <Doodle glyph="star" size={50} className="-left-7 bottom-8 hidden text-brand sm:block" />
          </div>
        </div>

        {/* stats */}
        <div className="rv mt-16 grid grid-cols-2 overflow-hidden rounded-[22px] border border-line bg-paper shadow-[var(--shadow-soft)] sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="border-b border-r border-line last:border-r-0 lg:border-b-0">
              <Stat value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
        <p className="rv mt-3 text-[13px] text-muted">
          Figures as published by Dregeup. They are the company's own numbers and have not been
          independently audited.
        </p>

        {/* what we do */}
        <div className="mt-16">
          <h2 className="rv text-[22px] font-extrabold tracking-[-0.035em]">How the service works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Card key={p.step} className={`rv d${i + 1} p-6`}>
                <span className="font-hand text-[30px] leading-none text-brand">{p.step}</span>
                <h3 className="mt-3 text-[16.5px] font-bold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
              </Card>
            ))}
          </ol>
        </div>

        {/* the honest gaps */}
        <div className="mt-16">
          <div className="rv rounded-[var(--radius-card)] border border-[#EBD9AE] bg-brand-tint p-6 sm:p-7">
            <h2 className="text-[18px] font-bold tracking-[-0.025em]">
              What this page still needs
            </h2>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
              An About page for a consultancy should answer who runs it and how it makes money.
              Neither was published in a verifiable form, so both are listed here as gaps rather
              than filled with plausible copy.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {unverified.map((u, i) => (
              <Card key={u.heading} hover={false} className={`rv d${Math.min(i + 1, 6)} p-6`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-bold tracking-[-0.02em]">{u.heading}</h3>
                  <Pending className="shrink-0">Missing</Pending>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{u.blurb}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* contact */}
        <Card hover={false} className="rv mt-16 p-7 sm:p-9">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <h2 className="text-[20px] font-extrabold tracking-[-0.035em]">Where we are</h2>
              <address className="mt-3 not-italic text-[15px] leading-relaxed text-muted">
                {contact.address}
              </address>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <Button href={contact.phoneHref}>{contact.phone}</Button>
              <Button to="/contact" variant="secondary" arrow>
                Contact page
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
