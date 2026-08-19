import { exams, formatDate } from './exams'

/**
 * Editorial posts.
 *
 * The live dregeup.com blog carries exactly ONE post, reproduced here by title
 * and byline only — its body was not re-published, and writing a body for
 * someone else's byline would be fabrication. Everything else the live site
 * files under "news" is stale (CBSE 2021, CAT 2022) and has been left out
 * rather than carried across.
 *
 * `body: null` renders the card in a "to be updated" state that still links
 * nowhere. Replace with real copy when it exists.
 */
export const posts = [
  {
    slug: 'cat-2023-gateway-to-premier-b-schools',
    title: 'CAT 2023: gateway to premier B-schools',
    author: 'Mayank Dubey',
    date: '2023-03-03',
    category: 'Exam guidance',
    excerpt: null,
    body: null,
    source: 'dregeup.com',
    stale: true,
  },
]

/**
 * Exam updates, derived from the verified date table rather than written by
 * hand. This is the one part of the news feed that is guaranteed current: if
 * exams.js is accurate, these are accurate, and they re-sort themselves as
 * dates pass. Only `confirmed` dates qualify.
 */
export function examUpdates(today = new Date(), limit = 6) {
  const t = new Date(today).setHours(0, 0, 0, 0)

  return exams
    .flatMap((e) =>
      e.dates
        .filter((d) => d.confirmed)
        .map((d) => {
          const when = new Date(d.iso).getTime()
          const days = Math.ceil((when - t) / 86400000)
          return { exam: e, date: d, when, days }
        })
    )
    .filter(({ days }) => days >= -30 && days <= 200)
    .sort((a, b) => a.when - b.when)
    .slice(0, limit)
    .map(({ exam, date, days }) => ({
      slug: `${exam.slug}-${date.iso}`,
      examSlug: exam.slug,
      category: exam.name,
      date: date.iso,
      title: `${exam.name} — ${date.label.toLowerCase()}`,
      detail: `${formatDate(date.iso, { long: true })}${date.note ? ` · ${date.note}` : ''}`,
      urgency:
        days < 0 ? 'past' : days <= 14 ? 'soon' : days <= 45 ? 'near' : 'later',
      days,
      source: exam.official,
    }))
}
