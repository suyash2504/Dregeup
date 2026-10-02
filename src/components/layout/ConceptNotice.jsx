/**
 * Dregeup is a real company and this build is an unsolicited redesign, not
 * their site. Anyone landing here from a shared link has to be able to tell
 * that at a glance — it carries their real phone number and email.
 */
const CASE_STUDY = 'https://s7labs.in/work/dregeup'

export default function ConceptNotice() {
  return (
    <div className="bg-ink text-[13px] text-white/85">
      <p className="mx-auto max-w-[1240px] px-5 py-2 text-center sm:px-8">
        <span className="font-semibold text-brand">Concept redesign</span> by S7 Labs — not the official Dregeup
        website.{' '}
        <a href={CASE_STUDY} className="font-semibold text-white underline underline-offset-2 hover:text-brand">
          Read the case study
        </a>
      </p>
    </div>
  )
}
