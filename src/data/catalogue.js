/**
 * Colleges, streams and courses.
 *
 * SOURCING RULE — the college list, the stream counts and the city list are
 * taken from dregeup.com (19 Aug 2026). Each college carries only facts that
 * are matters of public record: its name, the city it operates from, and the
 * streams it teaches.
 *
 * Fees, cutoffs, placement figures, rankings, accreditation and intake are
 * DELIBERATELY absent. They were not published on dregeup.com in a form we
 * could verify, and inventing them would be worse than showing a gap. Fill
 * them in from each institute's own site or the NIRF listing, then flip
 * `dataStatus` to 'verified'.
 */

export const streams = [
  { slug: 'management', label: 'Management', count: 37 },
  { slug: 'science', label: 'Science', count: 6 },
  { slug: 'engineering', label: 'Engineering', count: 4 },
  { slug: 'medical', label: 'Medical', count: 3 },
  { slug: 'arts', label: 'Arts', count: 3 },
  { slug: 'commerce', label: 'Commerce', count: 2 },
  { slug: 'pharmacy', label: 'Pharmacy', count: 2 },
  { slug: 'design', label: 'Design', count: 1 },
  { slug: 'law', label: 'Law', count: 1 },
]

export const cities = [
  'Pune',
  'Mumbai',
  'New Delhi',
  'Bengaluru',
  'Chennai',
  'Hyderabad',
  'Ahmedabad',
  'Jaipur',
  'Raipur',
  'Bhubaneswar',
]

/** Source: dregeup.com "Top Courses" and course filters. */
export const courses = [
  { slug: 'mba', name: 'MBA', level: 'PG', stream: 'management', years: '2 years', after: 'Graduation' },
  { slug: 'bba', name: 'BBA', level: 'UG', stream: 'management', years: '3 years', after: 'Class 12' },
  { slug: 'mca', name: 'MCA', level: 'PG', stream: 'science', years: '2 years', after: 'Graduation' },
  { slug: 'btech', name: 'B.Tech', level: 'UG', stream: 'engineering', years: '4 years', after: 'Class 12' },
  { slug: 'mtech', name: 'M.Tech', level: 'PG', stream: 'engineering', years: '2 years', after: 'Graduation' },
  { slug: 'mbbs', name: 'MBBS', level: 'UG', stream: 'medical', years: '5.5 years', after: 'Class 12' },
  { slug: 'bcom', name: 'B.Com', level: 'UG', stream: 'commerce', years: '3 years', after: 'Class 12' },
  { slug: 'bsc', name: 'B.Sc', level: 'UG', stream: 'science', years: '3 years', after: 'Class 12' },
  { slug: 'llb', name: 'LLB', level: 'UG', stream: 'law', years: '3 years', after: 'Graduation' },
  { slug: 'bpharma', name: 'B.Pharma', level: 'UG', stream: 'pharmacy', years: '4 years', after: 'Class 12' },
  { slug: 'barch', name: 'B.Arch', level: 'UG', stream: 'design', years: '5 years', after: 'Class 12' },
  { slug: 'med', name: 'M.Ed', level: 'PG', stream: 'arts', years: '2 years', after: 'Graduation' },
]

const c = (name, city, streamList, note) => ({
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  name,
  city,
  streams: streamList,
  note: note ?? null,
  /** 'partial' → the detail page shows verified-gap placeholders. */
  dataStatus: 'partial',
})

/** Source: the "Featured Colleges" and stream quick-links on dregeup.com. */
export const colleges = [
  c('Symbiosis Institute of Business Management, Pune', 'Pune', ['management']),
  c('MIT World Peace University', 'Pune', ['management', 'engineering', 'design']),
  c('Sri Balaji University', 'Pune', ['management']),
  c('Lexicon MILE', 'Pune', ['management']),
  c('ISBM', 'Pune', ['management']),
  c('Xavier Institute of Management', 'Bhubaneswar', ['management']),
  c('NMIMS', 'Mumbai', ['management', 'commerce', 'science']),
  c('Welingkar Institute of Management', 'Mumbai', ['management']),
  c('MET Institute', 'Mumbai', ['management', 'medical', 'pharmacy']),
  c('SOIL Institute of Management', 'Gurugram', ['management']),
  c('FOSTIIMA Business School', 'New Delhi', ['management']),
  c('Jagan Institute of Management Studies', 'New Delhi', ['management']),
  c('Institute of Management Technology', 'Ghaziabad', ['management']),
  c('Alliance University', 'Bengaluru', ['management', 'engineering', 'law']),
  c('Christ University', 'Bengaluru', ['commerce', 'management', 'arts']),
  c('Great Lakes Institute of Management', 'Chennai', ['management']),
  c('Christian Medical College, Vellore', 'Vellore', ['medical']),
  c("People's University", 'Bhopal', ['medical', 'engineering', 'pharmacy']),
]

export const getCollege = (slug) => colleges.find((x) => x.slug === slug)
export const getCourse = (slug) => courses.find((x) => x.slug === slug)
export const streamLabel = (slug) =>
  streams.find((s) => s.slug === slug)?.label ?? slug

export function filterColleges({ q = '', stream = '', city = '' } = {}) {
  const needle = q.trim().toLowerCase()
  return colleges.filter((col) => {
    if (stream && !col.streams.includes(stream)) return false
    if (city && col.city !== city) return false
    if (!needle) return true
    return (
      col.name.toLowerCase().includes(needle) ||
      col.city.toLowerCase().includes(needle) ||
      col.streams.some((s) => streamLabel(s).toLowerCase().includes(needle))
    )
  })
}
