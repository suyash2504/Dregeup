import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../../data/site'
import { cn, useEscape, useScrolled, useScrollLock } from '../../lib/hooks'
import { Button } from '../ui/Button'

function Logo({ className }) {
  return (
    <Link
      to="/"
      className={cn('flex items-center gap-[9px] text-[19px] font-extrabold tracking-[-0.045em]', className)}
      aria-label="Dregeup — home"
    >
      <span aria-hidden="true" className="block h-[9px] w-[9px] rotate-45 rounded-[3px] bg-brand" />
      dregeup
    </Link>
  )
}

export default function Navbar() {
  const scrolled = useScrolled(12)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useScrollLock(open)
  useEscape(open, () => setOpen(false))
  useEffect(() => setOpen(false), [pathname])

  const linkClass = ({ isActive }) =>
    cn(
      'relative py-[3px] text-[14px] font-semibold transition-colors',
      'after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:rounded-sm after:bg-brand after:transition-[right] after:duration-300 after:ease-[var(--ease-out)] after:content-[""]',
      isActive
        ? 'text-ink after:right-0'
        : 'text-ink-soft after:right-full hover:text-ink hover:after:right-0'
    )

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[padding] duration-300 ease-[var(--ease-out)]',
        scrolled ? 'pt-2' : 'pt-4'
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <nav
          aria-label="Primary"
          className={cn(
            'flex items-center gap-7 rounded-full border border-line bg-white/82 backdrop-blur-xl',
            'transition-[padding,box-shadow,background-color] duration-300 ease-[var(--ease-out)]',
            scrolled
              ? 'py-[7px] pl-5 pr-[7px] shadow-[var(--shadow-lift)]'
              : 'py-[11px] pl-6 pr-[11px] shadow-[var(--shadow-soft)]'
          )}
        >
          <Logo className="mr-auto" />

          <ul className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="hidden text-[14px] font-semibold text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Contact
          </Link>

          {/* Wrapped rather than given `hidden` directly: Button's base class
              carries `inline-flex`, and two display utilities on one element
              resolve by stylesheet order, not by class order. */}
          <span className="hidden sm:block">
            <Button to="/counselling" size="sm" className="rounded-full">
              Free Counselling
            </Button>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink transition-colors hover:bg-brand-tint lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-[13px] w-[19px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'absolute left-0 block h-[2px] w-full rounded-sm bg-current transition-all duration-300 ease-[var(--ease-out)]',
                    i === 0 && (open ? 'top-1.5 rotate-45' : 'top-0'),
                    i === 1 && (open ? 'top-1.5 opacity-0' : 'top-1.5'),
                    i === 2 && (open ? 'top-1.5 -rotate-45' : 'top-3')
                  )}
                />
              ))}
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile menu — a composed panel, not a squashed desktop bar. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 lg:hidden"
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="absolute inset-0 bg-ink/25 backdrop-blur-[3px]" />
        <div className="absolute inset-x-3 top-[86px] overflow-hidden rounded-[24px] border border-line bg-paper shadow-[var(--shadow-lift)]">
          <ul className="divide-y divide-line">
            {nav.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-6 py-[18px] text-[17px] font-bold tracking-[-0.02em] transition-colors',
                      isActive ? 'bg-brand-tint text-ink' : 'text-ink hover:bg-bg'
                    )
                  }
                >
                  {item.label}
                  <span aria-hidden="true" className="font-hand text-[17px] text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5 border-t border-line bg-bg p-5">
            <Button to="/counselling" arrow className="w-full">
              Free Counselling
            </Button>
            <Button to="/contact" variant="secondary" className="w-full">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
