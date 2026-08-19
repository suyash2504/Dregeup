import { Link } from 'react-router-dom'
import { contact, footerLinks, site, socials } from '../../data/site'
import { useReveal } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { Doodle, Marked } from '../ui/Sketch'

export default function Footer() {
  const ref = useReveal()
  const live = socials.filter((s) => s.href)

  return (
    <footer ref={ref} className="mt-24">
      {/* Final CTA */}
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-paper px-6 py-14 text-center shadow-[var(--shadow-soft)] sm:px-12 sm:py-16">
          <div aria-hidden="true" className="paper-grid absolute inset-0 opacity-70" />
          <Doodle glyph="cap" size={58} viewBox="0 0 54 40" rotate={-8} className="left-[6%] top-8 hidden text-brand sm:block" />
          <Doodle glyph="star" size={46} float="doodle-float-slower" className="right-[7%] top-12 hidden text-brand sm:block" />

          <div className="relative">
            <h2 className="rv text-[clamp(30px,4.4vw,50px)] leading-[1.05]">
              Your future <Marked>starts here</Marked>.
            </h2>
            <p className="rv d1 mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-muted">
              One conversation with a counsellor costs nothing and usually saves a month
              of guessing.
            </p>
            <div className="rv d2 mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/counselling" size="lg" arrow>
                Talk to a counsellor
              </Button>
              <Button to="/assessment" variant="secondary" size="lg">
                Take the free assessment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div className="mt-16 border-t border-line">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
            <div>
              <Link to="/" className="flex items-center gap-[9px] text-[20px] font-extrabold tracking-[-0.045em]">
                <span aria-hidden="true" className="block h-[9px] w-[9px] rotate-45 rounded-[3px] bg-brand" />
                dregeup
              </Link>
              <p className="mt-3 max-w-xs text-[14.5px] leading-relaxed text-muted">
                {site.description}
              </p>
              <p className="mt-5 font-hand text-[20px] text-brand-deep">{site.tagline}</p>
            </div>

            {footerLinks.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[12.5px] font-extrabold uppercase tracking-[0.12em] text-ink">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[14.5px] text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 border-t border-line pt-8 text-[14px] text-muted sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="font-semibold text-ink">Dregeup Education Consultancy</p>
              <p className="max-w-sm leading-relaxed">{contact.address}</p>
            </div>
            <div className="space-y-1.5 sm:text-right">
              <p>
                <a href={contact.phoneHref} className="font-semibold text-ink transition-colors hover:text-brand-deep">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={contact.emailHref} className="transition-colors hover:text-ink">
                  {contact.email}
                </a>
              </p>
              {live.length > 0 && (
                <p className="flex gap-4 sm:justify-end">
                  {live.map((s) => (
                    <a key={s.label} href={s.href} className="transition-colors hover:text-ink">
                      {s.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Dregeup. All rights reserved.</p>
            <p className="flex gap-5">
              <Link to="/privacy" className="transition-colors hover:text-ink">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-ink">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
