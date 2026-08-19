import { cn, useCountUp } from '../../lib/hooks'
import { Marked } from './Sketch'

/** Small rounded status chip — "Counselling open for 2026–27". */
export function Pill({ children, tone = 'default', className }) {
  const tones = {
    default: 'bg-paper border-line text-ink-soft',
    dark: 'bg-white/8 border-white/16 text-white',
    tint: 'bg-brand-tint border-[#EBD9AE] text-brand-deep',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[9px] rounded-full border py-[7px] pl-[9px] pr-4 text-[13px] font-semibold shadow-[var(--shadow-soft)]',
        tones[tone],
        className
      )}
    >
      <span
        aria-hidden="true"
        className="block h-2 w-2 shrink-0 rounded-full bg-brand shadow-[0_0_0_4px_rgb(244_185_66/0.22)]"
      />
      {children}
    </span>
  )
}

/** Section eyebrow: uppercase label with the short yellow rule. */
export function Eyebrow({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted',
        className
      )}
    >
      <i aria-hidden="true" className="block h-0.5 w-[22px] rounded-sm bg-brand" />
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, mark, lead, align = 'left', className }) {
  return (
    <div
      className={cn(
        'rv',
        align === 'center' && 'mx-auto text-center',
        align === 'center' ? 'max-w-2xl' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(28px,3.8vw,44px)] leading-[1.08]">
        {title}
        {mark && (
          <>
            {' '}
            <Marked>{mark}</Marked>
          </>
        )}
      </h2>
      {lead && (
        <p
          className={cn(
            'mt-4 text-[16.5px] leading-relaxed text-muted',
            align === 'center' && 'mx-auto'
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

export function Stat({ value, suffix = '', label, dark = false }) {
  const [ref, current] = useCountUp(value)
  return (
    <div ref={ref} className="px-5 py-[26px] text-center">
      <div
        className={cn(
          'text-[clamp(26px,2.5vw,34px)] font-extrabold leading-none tracking-[-0.04em]',
          dark ? 'text-white' : 'text-ink'
        )}
      >
        {current}
        {suffix}
      </div>
      <div
        className={cn(
          'mt-1.5 text-[12.5px] font-semibold',
          dark ? 'text-white/60' : 'text-muted'
        )}
      >
        {label}
      </div>
    </div>
  )
}

/**
 * The honest gap marker. Used wherever the real site had no verifiable data —
 * it is deliberately visible rather than a silent empty state, so nobody
 * mistakes a missing figure for a real one.
 */
export function Pending({ children = 'Content to be updated', className, note }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-dashed border-line bg-bg px-2.5 py-1 text-[12.5px] font-semibold text-muted',
        className
      )}
      title={note ?? undefined}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4.5" />
        <path d="M12 16.2v.1" />
      </svg>
      {children}
    </span>
  )
}

export function Card({ as: Tag = 'div', className, hover = true, children, ...rest }) {
  return (
    <Tag
      className={cn(
        'rounded-[var(--radius-card)] border border-line bg-paper shadow-[var(--shadow-soft)]',
        hover &&
          'transition-[transform,box-shadow,border-color] duration-350 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:border-[#EBD9AE] hover:shadow-[var(--shadow-lift)]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
