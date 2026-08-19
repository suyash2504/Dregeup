import { whyChoose } from '../../data/site'
import { useReveal } from '../../lib/hooks'
import { Card, SectionHeading } from '../ui/Bits'
import { Doodle } from '../ui/Sketch'

const icons = {
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5Z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5.3-5.3 2.2 2.2-5.3Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.8 14.6a5.5 5.5 0 0 1 2.7 4.9" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4.5h11l-2 3.5 2 3.5H5" />
    </>
  ),
}

export default function WhyChoose() {
  const ref = useReveal()

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1240px] px-5 pt-24 sm:px-8">
      <Doodle
        glyph="bulb"
        size={50}
        rotate={10}
        float="doodle-float-slower"
        className="right-[3%] top-16 hidden text-brand lg:block"
      />

      <SectionHeading
        eyebrow="Why Dregeup"
        title="Why students pick"
        mark="Dregeup"
        lead="Not a directory you scroll alone. A shortlist built around your profile, and a person attached to it."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((item, i) => (
          <Card key={item.title} className={`rv d${Math.min(i + 1, 6)} group p-7`}>
            <span className="mb-5 grid h-[46px] w-[46px] place-items-center rounded-[14px] bg-brand-tint text-brand-deep transition-transform duration-350 ease-[var(--ease-out)] group-hover:scale-110 group-hover:-rotate-6">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[item.icon]}
              </svg>
            </span>
            <h3 className="text-[17.5px] font-bold tracking-[-0.02em]">{item.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.body}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
