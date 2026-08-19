import { cn } from '../../lib/hooks'

/**
 * The hand-drawn layer. Every glyph here is a single stroked path so it can
 * draw itself in via `.sketch-draw` (stroke-dashoffset) — no fills, no images.
 *
 * Doodles are decorative by definition: they all carry aria-hidden and none of
 * them are focusable or hit-testable.
 */

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Underline({ className }) {
  return (
    <svg viewBox="0 0 300 22" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M4 15 C 62 4, 128 20, 296 8" />
    </svg>
  )
}

/** Wraps a word in the yellow hand-drawn underline that draws in on reveal. */
export function Marked({ children, className }) {
  return (
    <span className={cn('sketch-underline', className)}>
      {children}
      <Underline />
    </span>
  )
}

const glyphs = {
  star: (
    <path d="M30 6 L34 22 L50 26 L34 30 L30 46 L26 30 L10 26 L26 22 Z" />
  ),
  cap: (
    <>
      <path d="M4 20 L27 8 L50 20 L27 32 Z" />
      <path d="M46 22 v9" />
      <path d="M14 25 v7 c0 3 6 5 13 5 s13 -2 13 -5 v-7" />
    </>
  ),
  arrow: (
    <>
      <path d="M2 4 C 14 2, 24 10, 30 19" />
      <path d="M24 19 L31 20 L29 13" />
    </>
  ),
  bulb: (
    <>
      <path d="M20 34 a12 12 0 1 1 12 0 v5 h-12 z" />
      <path d="M21 44 h10" />
      <path d="M23 49 h6" />
    </>
  ),
  book: (
    <>
      <path d="M4 8 h16 a5 5 0 0 1 5 5 v25 a4 4 0 0 0 -4 -4 H4 Z" />
      <path d="M46 8 H30 a5 5 0 0 0 -5 5 v25 a4 4 0 0 1 4 -4 h17 Z" />
    </>
  ),
  plane: (
    <>
      <path d="M4 24 L48 6 L34 46 L26 30 Z" />
      <path d="M26 30 L48 6" />
    </>
  ),
  spark: (
    <>
      <path d="M26 6 v14" />
      <path d="M26 34 v14" />
      <path d="M6 27 h14" />
      <path d="M32 27 h14" />
    </>
  ),
  check: <path d="M8 26 L22 39 L46 11" />,
}

export function Doodle({
  glyph = 'star',
  size = 54,
  className,
  rotate,
  float = 'doodle-float',
  viewBox = '0 0 60 60',
  ...rest
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox={viewBox}
      className={cn('pointer-events-none absolute sketch-draw', float, className)}
      style={rotate ? { '--doodle-rot': `${rotate}deg` } : undefined}
      {...strokeProps}
      {...rest}
    >
      {glyphs[glyph] ?? glyphs.star}
    </svg>
  )
}

/** The little handwritten aside used next to CTAs and stats. */
export function Annotation({ children, className, arrow = true }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-hand text-[19px] leading-none text-brand-deep',
        className
      )}
    >
      {arrow && (
        <svg
          width="40"
          height="22"
          viewBox="0 0 42 24"
          aria-hidden="true"
          className="sketch-draw shrink-0"
          {...strokeProps}
          strokeWidth={2}
        >
          <path d="M2 4 C 14 2, 24 10, 30 19" />
          <path d="M24 19 L31 20 L29 13" />
        </svg>
      )}
      {children}
    </span>
  )
}

/** Masking-tape strip used on photo frames. */
export function Tape({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute left-1/2 top-[-15px] h-[30px] w-[112px] -translate-x-1/2 -rotate-2 rounded-[2px] bg-brand/50 shadow-[0_2px_8px_rgb(17_24_39/0.08)]',
        className
      )}
    />
  )
}
