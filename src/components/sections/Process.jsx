import { process } from '../../data/site'
import { useReveal } from '../../lib/hooks'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/Bits'
import { Doodle, Tape } from '../ui/Sketch'

export default function Process() {
  const ref = useReveal()

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1240px] px-5 pt-24 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* photo */}
        <div className="relative order-2 lg:order-1">
          <div className="rv d2 relative rounded-[20px] bg-paper p-[13px] shadow-[var(--shadow-lift)] [transform:rotate(1.4deg)] transition-transform duration-500 ease-[var(--ease-out)] hover:[transform:rotate(0.3deg)_translateY(-4px)]">
            <Tape className="left-[22%]" />
            <img
              src="/photos/students-collab.jpg"
              alt="A group of students working together around a laptop"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3.4] w-full rounded-xl object-cover"
            />
          </div>
          <Doodle glyph="arrow" size={48} viewBox="0 0 42 24" rotate={-14} className="-right-4 -top-6 text-brand" />
          <span className="absolute -bottom-5 left-4 rounded-[16px_16px_4px_16px] bg-brand px-4 py-2 font-hand text-[19px] leading-none text-ink shadow-[var(--shadow-soft)]">
            No fee, ever
          </span>
        </div>

        {/* steps */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="How it works"
            title="A simple 4-step journey to your"
            mark="dream college"
            lead="The same sequence every time, so you always know what happens next."
          />

          <ol className="mt-10 space-y-1">
            {process.map((p, i) => (
              <li
                key={p.step}
                className={`rv d${Math.min(i + 1, 6)} group flex gap-5 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-line hover:bg-paper`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-[14px] font-extrabold text-brand-deep transition-transform duration-350 ease-[var(--ease-out)] group-hover:scale-110">
                  {p.step}
                </span>
                <span>
                  <h3 className="text-[17px] font-bold tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                </span>
              </li>
            ))}
          </ol>

          <div className="rv d5 mt-8">
            <Button to="/counselling" arrow>
              Start with a free call
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
