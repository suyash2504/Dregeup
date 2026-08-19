import { Link } from 'react-router-dom'
import { cn } from '../../lib/hooks'

export function ArrowRight({ className }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('transition-transform duration-250 ease-[var(--ease-out)] group-hover:translate-x-1', className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

const variants = {
  primary:
    'bg-brand text-ink shadow-[0_1px_2px_rgb(17_24_39/0.06)] hover:bg-brand-bright hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-[0_10px_26px_rgb(244_185_66/0.42)]',
  secondary:
    'bg-paper text-ink border-line hover:-translate-y-0.5 hover:border-ink hover:shadow-[var(--shadow-soft)]',
  dark: 'bg-ink text-white hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgb(17_24_39/0.28)]',
  ghost: 'bg-transparent text-ink border-transparent hover:bg-brand-tint',
}

const sizes = {
  md: 'px-6 py-[15px] text-[15px] rounded-[var(--radius-btn)]',
  sm: 'px-[18px] py-[11px] text-[14px] rounded-xl',
  lg: 'px-8 py-[18px] text-[16px] rounded-[16px]',
}

/**
 * `puck` replaces the trailing arrow with a dark circular badge that rotates
 * on hover. It carries its own padding — a puck needs a tight right edge and a
 * roomy left one — so it deliberately opts out of the `sizes` map rather than
 * fighting it with overrides.
 */
const puckSizes = {
  md: 'py-[7px] pl-6 pr-[9px] text-[15px] gap-3',
  sm: 'py-[6px] pl-5 pr-2 text-[14px] gap-3',
  lg: 'py-[9px] pl-8 pr-[11px] text-[16px] gap-3.5',
}

const puckDims = {
  md: 'h-[34px] w-[34px]',
  sm: 'h-[30px] w-[30px]',
  lg: 'h-[38px] w-[38px]',
}

function Puck({ size, variant }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-full transition-transform duration-250 ease-[var(--ease-out)] group-hover:-rotate-45',
        variant === 'dark' ? 'bg-brand text-ink' : 'bg-ink text-brand',
        puckDims[size]
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  )
}

export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  puck = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-[9px] font-bold border border-transparent cursor-pointer',
    'transition-[transform,box-shadow,background-color,border-color] duration-250 ease-[var(--ease-out)]',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    puck ? cn('rounded-full', puckSizes[size]) : sizes[size],
    className
  )

  const body = (
    <>
      {children}
      {puck ? <Puck size={size} variant={variant} /> : arrow && <ArrowRight />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {body}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {body}
      </a>
    )
  }

  const Tag = as ?? 'button'
  return (
    <Tag className={classes} {...rest}>
      {body}
    </Tag>
  )
}
