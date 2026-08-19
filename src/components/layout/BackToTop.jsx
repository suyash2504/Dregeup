import { useEffect, useState } from 'react'
import { cn } from '../../lib/hooks'

/**
 * Floating back-to-top control, pinned bottom-left.
 *
 * The ring around it tracks scroll progress, which is what earns the button its
 * screen space — it is a position indicator that happens to be clickable, not
 * just a second way to do what the Home key already does.
 *
 * It appears after one viewport of scrolling rather than at rest, because at
 * scroll position 0 the button is inert and would only cover content. Set
 * SHOW_AFTER to 0 for a genuinely always-on button.
 */
const SHOW_AFTER = 1 // in viewport heights

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setVisible(y > window.innerHeight * SHOW_AFTER)
        setProgress(max > 0 ? Math.min(y / max, 1) : 0)
        ticking = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Send focus somewhere sensible rather than leaving it on a vanishing button.
    document.getElementById('main')?.focus?.()
  }

  // r=21 on a 48px box leaves room for the 2.5px stroke without clipping.
  const R = 21
  const C = 2 * Math.PI * R

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'group fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full',
        'border border-line bg-paper/90 text-ink-soft shadow-[var(--shadow-soft)] backdrop-blur-md',
        'transition-[opacity,transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out)]',
        'hover:border-brand hover:bg-brand hover:text-ink hover:shadow-[0_10px_24px_rgb(244_185_66/0.4)]',
        'sm:bottom-7 sm:left-7',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      {/* scroll-progress ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
          className="text-brand transition-[stroke-dashoffset] duration-150 ease-linear group-hover:text-ink/25"
        />
      </svg>

      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="relative transition-transform duration-250 ease-[var(--ease-out)] group-hover:-translate-y-0.5"
      >
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  )
}
