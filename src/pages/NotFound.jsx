import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useReveal } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { Doodle, Marked } from '../components/ui/Sketch'

const suggestions = [
  { to: '/colleges', label: 'Explore colleges' },
  { to: '/exams', label: 'Entrance exams' },
  { to: '/assessment', label: 'Career assessment' },
  { to: '/counselling', label: 'Free counselling' },
]

export default function NotFound() {
  const ref = useReveal()
  useSeo({ title: 'Page not found', noindex: true })

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div aria-hidden="true" className="paper-grid paper-fade absolute inset-0" />
      <Doodle glyph="plane" size={56} viewBox="0 0 54 52" rotate={-14} className="left-[10%] top-24 hidden text-brand md:block" />
      <Doodle glyph="star" size={46} float="doodle-float-slower" className="right-[12%] top-40 hidden text-brand md:block" />

      <div className="relative mx-auto w-full max-w-[720px] px-5 py-28 text-center sm:px-8">
        <p className="rv font-hand text-[64px] leading-none text-brand">404</p>
        <h1 className="rv d1 mt-3 text-[clamp(30px,4.4vw,46px)] leading-tight">
          That page took a <Marked>gap year</Marked>.
        </h1>
        <p className="rv d2 mx-auto mt-5 max-w-md text-[16.5px] leading-relaxed text-muted">
          The link is broken or the page has moved. Here is where most people were heading.
        </p>

        <ul className="rv d3 mt-9 flex flex-wrap justify-center gap-2.5">
          {suggestions.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="inline-flex rounded-full border border-line bg-paper px-5 py-2.5 text-[14px] font-semibold text-ink-soft transition-[transform,background-color,border-color,box-shadow] duration-250 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-ink hover:shadow-[0_6px_16px_rgb(244_185_66/0.32)]"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="rv d4 mt-9">
          <Button to="/" arrow>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
