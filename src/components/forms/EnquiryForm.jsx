import { useState } from 'react'
import { Button } from '../ui/Button'
import { contact } from '../../data/site'
import { streams } from '../../data/catalogue'

/**
 * Enquiry form.
 *
 * There is no backend in this project, so submission goes to whatever endpoint
 * `VITE_ENQUIRY_ENDPOINT` names (Web3Forms, Formspree, a Netlify function —
 * anything that accepts a JSON POST). With the variable unset the form still
 * validates and still tells the student exactly what to do instead, rather
 * than pretending to send and silently dropping the enquiry.
 */
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT ?? ''

const stages = [
  'In Class 11 or 12',
  'Taking a gap year',
  'In the final year of a degree',
  'Graduated, and working',
]

function Field({ label, hint, error, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[13.5px] font-bold text-ink">
          {label}
          {required && <span className="text-brand-deep"> *</span>}
        </span>
        {hint && <span className="text-[12.5px] text-muted">{hint}</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-[12.5px] font-semibold text-[#B3261E]">
          {error}
        </span>
      )}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-muted focus:border-brand focus:shadow-[0_0_0_4px_rgb(244_185_66/0.18)]'

export default function EnquiryForm({ heading, subject = 'Counselling enquiry' }) {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    stage: '',
    stream: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | sent | unconfigured | error

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    // Indian mobile numbers: 10 digits, optionally with +91 / 0 prefix.
    const digits = values.phone.replace(/[^\d]/g, '')
    if (!digits) next.phone = 'We need a number to call you back on.'
    else if (!/^(\+?91)?0?[6-9]\d{9}$/.test(values.phone.replace(/[\s-]/g, '')))
      next.phone = 'That does not look like a 10-digit mobile number.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = 'Check the email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (!ENDPOINT) {
      setState('unconfigured')
      return
    }

    setState('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, subject }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-[var(--radius-card)] border border-[#EBD9AE] bg-brand-tint p-8 text-center">
        <p className="font-hand text-[30px] text-brand-deep">Got it!</p>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          A counsellor will call you on {values.phone}. If it is urgent, ring{' '}
          <a href={contact.phoneHref} className="font-bold underline underline-offset-4">
            {contact.phone}
          </a>{' '}
          instead.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {heading && <h2 className="text-[21px] font-extrabold tracking-[-0.035em]">{heading}</h2>}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} required>
          <input
            type="text"
            value={values.name}
            onChange={set('name')}
            autoComplete="name"
            className={inputClass}
            placeholder="Riya Sharma"
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label="Mobile number" error={errors.phone} required>
          <input
            type="tel"
            value={values.phone}
            onChange={set('phone')}
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="98765 43210"
            aria-invalid={!!errors.phone}
          />
        </Field>
      </div>

      <Field label="Email" hint="optional" error={errors.email}>
        <input
          type="email"
          value={values.email}
          onChange={set('email')}
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Where are you now?" hint="optional">
          <select value={values.stage} onChange={set('stage')} className={inputClass}>
            <option value="">Select one</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Stream you're considering" hint="optional">
          <select value={values.stream} onChange={set('stream')} className={inputClass}>
            <option value="">Not sure yet</option>
            {streams.map((s) => (
              <option key={s.slug} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Anything else?" hint="optional">
        <textarea
          value={values.message}
          onChange={set('message')}
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Colleges you're looking at, entrance exams you've taken, budget — whatever helps."
        />
      </Field>

      {state === 'unconfigured' && (
        <div role="alert" className="rounded-xl border border-dashed border-line bg-bg p-4 text-[14px] leading-relaxed text-ink-soft">
          <p className="font-bold text-ink">This form has no endpoint wired up yet.</p>
          <p className="mt-1.5 text-muted">
            Set <code className="rounded bg-paper px-1.5 py-0.5 text-[13px]">VITE_ENQUIRY_ENDPOINT</code>{' '}
            to a form service URL and this will start delivering. Until then, call{' '}
            <a href={contact.phoneHref} className="font-semibold text-ink underline underline-offset-4">
              {contact.phone}
            </a>{' '}
            or email{' '}
            <a href={contact.emailHref} className="font-semibold text-ink underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </div>
      )}

      {state === 'error' && (
        <div role="alert" className="rounded-xl border border-[#E9C3BF] bg-[#FDF3F2] p-4 text-[14px] leading-relaxed">
          <p className="font-bold text-[#B3261E]">That did not go through.</p>
          <p className="mt-1 text-ink-soft">
            Please call{' '}
            <a href={contact.phoneHref} className="font-semibold underline underline-offset-4">
              {contact.phone}
            </a>{' '}
            instead — we would rather you reach someone than retry a form.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" arrow disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Request a free call'}
        </Button>
        <p className="text-[13px] text-muted">No fee. No obligation.</p>
      </div>
    </form>
  )
}
