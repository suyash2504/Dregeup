/**
 * Entrance exam data.
 *
 * VERIFICATION CONTRACT — read before editing.
 *
 * Every date carries `confirmed`. `true` means the value was read off the
 * conducting body's OWN website (`official`) on `verifiedOn`. `false` means it
 * is an announced-but-unconfirmed figure and the UI will render it behind a
 * "pending official confirmation" badge that links to `official`.
 *
 * Never promote a date to `confirmed: true` because an aggregator (Shiksha,
 * Careers360, CollegeDekho, MBAUniverse…) agrees with it. Those sites publish
 * "expected" dates that routinely turn out wrong — SNAP 2026 is the live
 * example: aggregators said 5/13/19 December, the official site says 13/19/26.
 *
 * When you re-verify, bump `verifiedOn` even if nothing changed.
 */

export const exams = [
  {
    slug: 'cat',
    name: 'CAT 2026',
    fullName: 'Common Admission Test',
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'IIM Indore',
    official: 'https://iimcat.ac.in',
    verifiedOn: '2026-08-19',
    blurb:
      'The single largest MBA entrance in India. Accepted by all 21 IIMs and several hundred non-IIM business schools.',
    dates: [
      { label: 'Notification released', iso: '2026-07-26', confirmed: true },
      {
        label: 'Registration opens',
        iso: '2026-08-03',
        note: '10:00 AM IST',
        confirmed: true,
      },
      {
        label: 'Registration closes',
        iso: '2026-09-15',
        note: '5:00 PM IST',
        confirmed: true,
        deadline: true,
      },
      { label: 'Admit card download', iso: '2026-11-04', confirmed: true },
      { label: 'Exam day', iso: '2026-11-29', confirmed: true, exam: true },
    ],
    fee: {
      general: '₹2,700',
      reserved: '₹1,350',
      note: 'General / EWS / NC-OBC and SC / ST / PwD respectively.',
      confirmed: false,
    },
    pattern: {
      duration: '120 minutes',
      questions: '66',
      sections: [
        'Verbal Ability & Reading Comprehension',
        'Data Interpretation & Logical Reasoning',
        'Quantitative Ability',
      ],
      confirmed: false,
    },
    eligibility:
      "Bachelor's degree with at least 50% marks (45% for SC / ST / PwD), or an equivalent CGPA. Final-year students may apply.",
    eligibilityConfirmed: false,
    accepted: 'All 21 IIMs plus non-IIM member institutions across 8 states.',
    helpdesk: 'cat2026_helpdesk@iimidr.ac.in',
  },

  {
    slug: 'snap',
    name: 'SNAP 2026',
    fullName: 'Symbiosis National Aptitude Test',
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'Symbiosis International University',
    official: 'https://www.snaptest.org',
    verifiedOn: '2026-08-19',
    blurb:
      'The gateway to Symbiosis. Three sittings, and only your best score counts — there is no normalisation across attempts.',
    dates: [
      { label: 'Registration opens', iso: '2026-08-21', confirmed: true },
      { label: 'Test 1', iso: '2026-12-13', confirmed: true, exam: true },
      { label: 'Test 2', iso: '2026-12-19', confirmed: true, exam: true },
      { label: 'Test 3', iso: '2026-12-26', confirmed: true, exam: true },
    ],
    fee: {
      general: '₹2,550',
      note:
        'Per attempt, plus ₹1,000 per programme registered for. Both are mandatory, non-refundable, and taxes are extra.',
      confirmed: true,
    },
    pattern: {
      duration: 'See official test structure',
      questions: '—',
      sections: [],
      confirmed: false,
      pending: true,
    },
    eligibility:
      'Graduate in any discipline from a recognised university with a minimum of 50% marks (45% for SC / ST candidates). Some programmes add their own requirements.',
    eligibilityConfirmed: true,
    accepted:
      '17 Symbiosis institutes across Pune, Nashik, Nagpur, Hyderabad, NOIDA and Bengaluru, covering 30 MBA programmes.',
    highlight: 'Up to 3 attempts · best score counts · no normalisation',
    session: 'Academic session 2027–28',
  },

  {
    slug: 'xat',
    name: 'XAT 2027',
    fullName: "Xavier Aptitude Test",
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'XLRI Jamshedpur',
    official: 'https://www.xatonline.in',
    verifiedOn: '2026-08-19',
    blurb:
      'Known for its Decision Making section, which no other Indian MBA entrance tests. The registration window is unusually long.',
    dates: [
      { label: 'Registration opens', iso: '2026-07-15', confirmed: true },
      {
        label: 'Registration closes',
        iso: '2026-12-06',
        confirmed: true,
        deadline: true,
      },
      {
        label: 'Admit card download',
        iso: '2026-12-20',
        note: 'Tentative',
        confirmed: true,
      },
      {
        label: 'Exam day',
        iso: '2027-01-03',
        note: '2:00 PM – 5:00 PM',
        confirmed: true,
        exam: true,
      },
    ],
    fee: { pending: true, confirmed: false },
    pattern: {
      duration: '180 minutes',
      questions: '95',
      sections: [
        'Verbal Ability & Logical Reasoning — 26 questions',
        'Decision Making — 21 questions',
        'Quantitative Ability & Data Interpretation — 28 questions',
        'General Knowledge — 20 questions, 10 minutes',
      ],
      marking:
        '1 mark per question, −0.25 for a wrong answer. Eight questions may be skipped free; each further skip costs 0.1. General Knowledge carries no negative marking and does not affect your percentile, but does count in XLRI selection.',
      confirmed: true,
    },
    eligibility: null,
    eligibilityConfirmed: false,
    accepted: 'XLRI and 250+ other management institutes.',
    acceptedConfirmed: false,
  },

  {
    slug: 'nmat',
    name: 'NMAT 2026',
    fullName: 'NMAT by GMAC',
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'Graduate Management Admission Council',
    official: 'https://www.mba.com/exams/nmat',
    verifiedOn: '2026-08-19',
    unreachable: true,
    blurb:
      'A flexible exam — you pick your own slot inside a long window, and you may retake it. No negative marking.',
    dates: [
      { label: 'Registration opens', iso: '2026-08-20', confirmed: false },
      { label: 'Exam window opens', iso: '2026-11-02', confirmed: false },
      { label: 'Exam window closes', iso: '2026-12-20', confirmed: false },
    ],
    fee: { pending: true, confirmed: false },
    pattern: {
      duration: '120 minutes',
      questions: '108',
      sections: [],
      marking: 'No negative marking.',
      confirmed: false,
    },
    eligibility: null,
    eligibilityConfirmed: false,
    accepted: 'NMIMS and other participating business schools.',
    acceptedConfirmed: false,
  },

  {
    slug: 'ibsat',
    name: 'IBSAT 2026',
    fullName: 'IBS Aptitude Test',
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'ICFAI Foundation for Higher Education',
    official: 'https://www.ibsindia.org',
    verifiedOn: '2026-08-19',
    unreachable: true,
    blurb:
      'The entrance for ICFAI Business School campuses. Aptitude-led, with a heavy reading comprehension weighting.',
    dates: [],
    fee: { pending: true, confirmed: false },
    pattern: { questions: '140', sections: [], confirmed: false },
    eligibility: null,
    eligibilityConfirmed: false,
    accepted: 'ICFAI Business School campuses.',
    acceptedConfirmed: false,
  },

  {
    slug: 'mah-mba-cet',
    name: 'MAH MBA CET',
    fullName: 'Maharashtra MBA / MMS Common Entrance Test',
    level: 'PG',
    streams: ['Management'],
    conductedBy: 'State CET Cell, Government of Maharashtra',
    official: 'https://cetcell.mahacet.org',
    verifiedOn: '2026-08-19',
    unreachable: true,
    blurb:
      'The state entrance for MBA and MMS seats across Maharashtra, including the Mumbai and Pune institutes that reserve most seats for CET scorers.',
    dates: [],
    fee: { pending: true, confirmed: false },
    pattern: { sections: [], confirmed: false },
    eligibility: null,
    eligibilityConfirmed: false,
    accepted: 'MBA and MMS programmes across Maharashtra.',
    acceptedConfirmed: false,
  },

  {
    slug: 'npat',
    name: 'NPAT 2027',
    fullName: 'NMIMS Programs After Twelfth',
    level: 'UG',
    streams: ['Management', 'Commerce', 'Science'],
    conductedBy: 'NMIMS',
    official: 'https://www.nmimsnpat.in',
    verifiedOn: '2026-08-19',
    unreachable: true,
    blurb:
      'The undergraduate entrance for NMIMS — the route into its BBA, B.Com (Hons) and allied programmes straight after Class 12.',
    dates: [],
    fee: { pending: true, confirmed: false },
    pattern: { sections: [], confirmed: false },
    eligibility: null,
    eligibilityConfirmed: false,
    accepted: 'NMIMS undergraduate programmes.',
    acceptedConfirmed: false,
  },
]

export const getExam = (slug) => exams.find((e) => e.slug === slug)

/** Sorted upcoming milestones across every exam, for the homepage ticker. */
export function upcomingMilestones(limit = 8, today = new Date()) {
  const t = today.setHours(0, 0, 0, 0)
  return exams
    .flatMap((e) =>
      e.dates
        .filter((d) => d.confirmed && new Date(d.iso).getTime() >= t)
        .map((d) => ({ ...d, exam: e.name, slug: e.slug, isExam: !!d.exam }))
    )
    .sort((a, b) => new Date(a.iso) - new Date(b.iso))
    .slice(0, limit)
}

/**
 * 'open'      — registration window is live right now
 * 'closing'   — registration closes within 21 days
 * 'upcoming'  — registration has not opened yet
 * 'closed'    — registration window has passed
 * 'unknown'   — not enough confirmed dates to say
 */
export function examStatus(exam, today = new Date()) {
  const t = new Date(today).setHours(0, 0, 0, 0)
  const find = (re) =>
    exam.dates.find((d) => d.confirmed && re.test(d.label))
  const opens = find(/opens/i)
  const closes = find(/closes/i)

  if (!opens && !closes) return 'unknown'

  const o = opens ? new Date(opens.iso).getTime() : -Infinity
  const c = closes ? new Date(closes.iso).getTime() : Infinity

  if (t < o) return 'upcoming'
  if (t > c) return 'closed'
  if (c !== Infinity && (c - t) / 86400000 <= 21) return 'closing'
  return 'open'
}

export const daysUntil = (iso, today = new Date()) =>
  Math.ceil(
    (new Date(iso).setHours(0, 0, 0, 0) - new Date(today).setHours(0, 0, 0, 0)) /
      86400000
  )

export function formatDate(iso, opts = {}) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: opts.long ? 'long' : 'short',
    year: 'numeric',
  })
}
