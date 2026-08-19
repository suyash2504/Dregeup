import PageHeader from '../components/layout/PageHeader'
import EnquiryForm from '../components/forms/EnquiryForm'
import { Card } from '../components/ui/Bits'
import { contact, process } from '../data/site'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Doodle, Tape } from '../components/ui/Sketch'

export default function Counselling() {
  const ref = useReveal()

  useSeo({
    title: 'Free counselling',
    description:
      'Request a free call with a Dregeup counsellor — profile analysis, aptitude mapping, college selection and admission support at no cost.',
    path: '/counselling',
  })

  return (
    <>
      <PageHeader
        eyebrow="Free counselling"
        title="One call, and the list gets"
        mark="shorter"
        lead="Every conversation with a Dregeup counsellor is complimentary, at every stage. Leave a number and someone who works this admission cycle will call you back."
        crumbs={[{ label: 'Free counselling' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* form */}
          <Card hover={false} className="rv relative overflow-hidden p-7 sm:p-9">
            <Doodle glyph="plane" size={46} viewBox="0 0 54 52" rotate={-10} className="right-6 top-6 hidden text-brand sm:block" />
            <EnquiryForm heading="Request a free call" subject="Free counselling request" />
          </Card>

          {/* side */}
          <div className="space-y-6">
            <div className="rv d1 relative">
              <div className="relative rounded-[20px] bg-paper p-[13px] shadow-[var(--shadow-lift)] [transform:rotate(1.2deg)]">
                <Tape className="left-[30%]" />
                <img
                  src="/photos/students-talking.jpg"
                  alt="Students talking and laughing together in a lecture hall"
                  width="1000"
                  height="563"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/2.9] w-full rounded-xl object-cover"
                />
              </div>
            </div>

            <Card hover={false} className="rv d2 p-7">
              <h2 className="text-[17px] font-bold tracking-[-0.02em]">What the call covers</h2>
              <ol className="mt-4 space-y-3.5">
                {process.map((p) => (
                  <li key={p.step} className="flex gap-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-tint text-[12px] font-extrabold text-brand-deep">
                      {p.step}
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-bold">{p.title}</span>
                      <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">
                        {p.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card hover={false} className="rv d3 p-7">
              <h2 className="text-[17px] font-bold tracking-[-0.02em]">Rather just call?</h2>
              <p className="mt-3">
                <a
                  href={contact.phoneHref}
                  className="text-[22px] font-extrabold tracking-[-0.035em] text-ink underline-offset-4 hover:underline"
                >
                  {contact.phone}
                </a>
              </p>
              <p className="mt-2 text-[14px] text-muted">
                Or email{' '}
                <a href={contact.emailHref} className="font-semibold text-ink underline underline-offset-4">
                  {contact.email}
                </a>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
