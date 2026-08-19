import PageHeader from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, Pending } from '../components/ui/Bits'
import { contact } from '../data/site'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'

/**
 * Privacy and Terms are legal documents. Drafting them from scratch and
 * presenting them as Dregeup's policy would be inventing a legal commitment on
 * the company's behalf — so these pages carry the required structure and an
 * explicit gap, not invented clauses. They are noindexed until real copy lands.
 */
const content = {
  privacy: {
    title: 'Privacy Policy',
    lead: 'What Dregeup collects when you use this site, why, and what happens to it afterwards.',
    sections: [
      'What we collect — the fields in the enquiry form, and any analytics the site runs.',
      'Why we collect it — matching you to counsellors, and following up on your enquiry.',
      'Who it is shared with — in particular, whether your details reach the colleges you enquire about.',
      'How long it is kept, and how to ask for it to be deleted.',
      'Cookies and third-party embeds — this site currently embeds a Google Map on the contact page.',
      'Grievance officer contact, as required under the Indian IT Rules.',
    ],
  },
  terms: {
    title: 'Terms of Use',
    lead: 'The terms on which Dregeup provides guidance through this site.',
    sections: [
      'What the service is — guidance and application support, not a guarantee of admission.',
      'Accuracy of information — exam dates and college details change, and the official source governs.',
      'What is expected of you — accurate details in enquiries, and your own verification before paying any fee.',
      'Fees — counselling is advertised as free to students; any exceptions belong here.',
      'Limitation of liability, and the governing law and jurisdiction.',
    ],
  },
}

export default function Legal({ kind = 'privacy' }) {
  const doc = content[kind] ?? content.privacy
  const ref = useReveal()

  useSeo({
    title: doc.title,
    description: doc.lead,
    path: `/${kind}`,
    noindex: true,
  })

  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} lead={doc.lead} crumbs={[{ label: doc.title }]} />

      <section ref={ref} className="mx-auto w-full max-w-[820px] px-5 pt-8 sm:px-8">
        <Card hover={false} className="rv border-dashed p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[19px] font-bold tracking-[-0.03em]">Not yet drafted</h2>
            <Pending>Awaiting legal copy</Pending>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            This is a binding document, so it is left empty rather than filled with generic
            boilerplate presented as Dregeup's policy. The headings below are what it needs to
            cover; the page is excluded from search indexing until real copy replaces this.
          </p>

          <ul className="mt-7 space-y-3">
            {doc.sections.map((s) => (
              <li key={s} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="text-[14px] text-muted">
              Questions in the meantime:{' '}
              <a href={contact.emailHref} className="font-semibold text-ink underline underline-offset-4">
                {contact.email}
              </a>
            </p>
            <div className="mt-5">
              <Button to="/" variant="secondary" arrow>
                Back to home
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  )
}
