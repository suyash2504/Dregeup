import { Link } from 'react-router-dom'
import { useReveal } from '../../lib/hooks'
import { Doodle, Marked } from '../ui/Sketch'
import { Eyebrow } from '../ui/Bits'

export default function PageHeader({ eyebrow, title, mark, lead, crumbs, children }) {
  const ref = useReveal()

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div aria-hidden="true" className="paper-grid paper-fade absolute inset-0" />
      <Doodle glyph="star" size={44} className="right-[8%] top-16 hidden text-brand md:block" />
      <Doodle
        glyph="plane"
        size={52}
        viewBox="0 0 54 52"
        rotate={-12}
        float="doodle-float-slow"
        className="left-[4%] top-28 hidden text-brand lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-4 pt-14 sm:px-8 sm:pt-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="rv mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {c.to ? (
                    <Link to={c.to} className="transition-colors hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && <Eyebrow className="rv mb-3">{eyebrow}</Eyebrow>}

        <h1 className="rv d1 max-w-4xl text-[clamp(34px,5vw,60px)] leading-[1.03]">
          {title}
          {mark && (
            <>
              {' '}
              <Marked>{mark}</Marked>
            </>
          )}
        </h1>

        {lead && (
          <p className="rv d2 mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">{lead}</p>
        )}

        {children && <div className="rv d3 mt-8">{children}</div>}
      </div>
    </section>
  )
}
