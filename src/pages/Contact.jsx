import PageHeader from '../components/layout/PageHeader'
import EnquiryForm from '../components/forms/EnquiryForm'
import { Card, Pending } from '../components/ui/Bits'
import { contact, socials } from '../data/site'
import { useReveal } from '../lib/hooks'
import { useSeo, organisationSchema } from '../lib/seo'

export default function Contact() {
  const ref = useReveal()
  const live = socials.filter((s) => s.href)

  useSeo({
    title: 'Contact',
    description: `Dregeup — ${contact.addressShort}. Call ${contact.phone} or email ${contact.email}.`,
    path: '/contact',
    schema: organisationSchema,
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a real"
        mark="person"
        lead="Wakad, Pune. Call, email, or leave your number and a counsellor will ring you back."
        crumbs={[{ label: 'Contact' }]}
      />

      <section ref={ref} className="mx-auto w-full max-w-[1240px] px-5 pt-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* left — details */}
          <div className="space-y-4">
            <Card hover={false} className="rv p-7">
              <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Office
              </h2>
              <address className="mt-3 not-italic text-[15px] leading-relaxed text-ink-soft">
                {contact.address}
              </address>
            </Card>

            <Card hover={false} className="rv d1 p-7">
              <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Phone
              </h2>
              <p className="mt-3">
                <a
                  href={contact.phoneHref}
                  className="text-[22px] font-extrabold tracking-[-0.035em] underline-offset-4 hover:underline"
                >
                  {contact.phone}
                </a>
              </p>
            </Card>

            <Card hover={false} className="rv d2 p-7">
              <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Email
              </h2>
              <p className="mt-3">
                <a
                  href={contact.emailHref}
                  className="break-all text-[16px] font-bold underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </Card>

            <Card hover={false} className="rv d3 p-7">
              <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Office hours
              </h2>
              <div className="mt-3">
                {contact.hours ? (
                  <p className="text-[15px] text-ink-soft">{contact.hours}</p>
                ) : (
                  <Pending note="Not published on dregeup.com — confirm before publishing.">
                    To be updated
                  </Pending>
                )}
              </div>
            </Card>

            {live.length > 0 && (
              <Card hover={false} className="rv d4 p-7">
                <h2 className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-muted">
                  Social
                </h2>
                <ul className="mt-3 flex flex-wrap gap-4">
                  {live.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-semibold underline-offset-4 hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* right — form */}
          <Card hover={false} className="rv d1 p-7 sm:p-9">
            <EnquiryForm heading="Send an enquiry" subject="Website contact enquiry" />
          </Card>
        </div>

        {/* map */}
        <div className="rv mt-10 overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-soft)]">
          <iframe
            title="Dregeup office location on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0 grayscale-[0.25]"
          />
        </div>
      </section>
    </>
  )
}
