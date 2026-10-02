/**
 * Site-wide content. Everything here that is a factual claim about Dregeup was
 * taken from dregeup.com on 19 Aug 2026 — do not invent new figures. Anything
 * we could not source is `null` and renders as a "to be updated" state.
 */

export const site = {
  name: 'Dregeup',
  tagline: 'Guiding talents, shaping future.',
  // Hosted as a concept, not on Dregeup's own domain — see ConceptNotice.
  url: 'https://dregeup-concept.netlify.app',
  /** Whole site is noindex: it must never compete with dregeup.com in search. */
  noindex: true,
  description:
    'Explore top colleges, discover the right courses and get free admission guidance — all in one place.',
}

export const nav = [
  { label: 'Colleges', to: '/colleges' },
  { label: 'Courses', to: '/courses' },
  { label: 'Exams', to: '/exams' },
  { label: 'Assessment', to: '/assessment' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
]

export const contact = {
  address:
    'The Address Commercia, Hinjawadi Rd, Shankar Kalat Nagar, Wakad, Pimpri-Chinchwad, Pune, Maharashtra 411057',
  addressShort: 'Wakad, Pune — Maharashtra 411057',
  phone: '+91 8770579905',
  phoneHref: 'tel:+918770579905',
  email: 'dregeupeducation@gmail.com',
  emailHref: 'mailto:dregeupeducation@gmail.com',
  /** Not published on the current site — shown as "to be updated" until confirmed. */
  hours: null,
  mapQuery:
    'The Address Commercia, Hinjawadi Road, Wakad, Pimpri-Chinchwad, Maharashtra 411057',
}

/**
 * Social handles exist on the live site but the profile URLs were not
 * resolvable from it. `href: null` hides the link rather than guessing a URL.
 */
export const socials = [
  { label: 'Instagram', href: null },
  { label: 'LinkedIn', href: null },
  { label: 'Facebook', href: null },
  { label: 'YouTube', href: null },
]

/** Dregeup's own published figures. Source: dregeup.com, 19 Aug 2026. */
export const stats = [
  { value: 50, suffix: '+', label: 'Colleges' },
  { value: 100, suffix: '+', label: 'Courses' },
  { value: 1, suffix: ' Lakh+', label: 'Students guided' },
  { value: 250, suffix: '+', label: 'Expert counsellors' },
  { value: 98, suffix: '%', label: 'Success rate' },
]

export const ratingStat = { value: '4.8', outOf: '5', label: 'Student rating' }

export const whyChoose = [
  {
    title: 'Free counselling, always',
    body: 'Every conversation with a Dregeup counsellor is complimentary. No consultation fee at any stage.',
    icon: 'chat',
  },
  {
    title: 'Data-driven matching',
    body: 'An 8-minute assessment maps your aptitude to streams and courses before anyone recommends a college.',
    icon: 'compass',
  },
  {
    title: '250+ expert counsellors',
    body: 'Advisors who work with these institutions every admission cycle and know how each one actually shortlists.',
    icon: 'users',
  },
  {
    title: '50+ colleges, one place',
    body: 'Compare institutes across nine streams and ten cities without opening fifteen browser tabs.',
    icon: 'grid',
  },
  {
    title: 'Guidance through to admission',
    body: 'Profile analysis, aptitude mapping, college selection and then the application itself — one thread, one team.',
    icon: 'flag',
  },
]

/** Source: dregeup.com — "A Simple 4-Step Journey to Your Dream College". */
export const process = [
  {
    step: '01',
    title: 'Profile analysis',
    body: 'Marks, entrance scores, budget, location and what you actually want out of the next three years.',
  },
  {
    step: '02',
    title: 'Aptitude mapping',
    body: 'The assessment turns preferences into a shortlist of streams and courses that fit how you think.',
  },
  {
    step: '03',
    title: 'College selection',
    body: 'A ranked set of institutes matched to your profile — with the honest reasoning behind each one.',
  },
  {
    step: '04',
    title: 'Secured admission',
    body: 'Applications, deadlines, documents and follow-ups, tracked until you have a confirmed seat.',
  },
]

export const footerLinks = [
  {
    heading: 'Explore',
    links: [
      { label: 'All colleges', to: '/colleges' },
      { label: 'All courses', to: '/courses' },
      { label: 'Entrance exams', to: '/exams' },
      { label: 'Career assessment', to: '/assessment' },
    ],
  },
  {
    heading: 'Streams',
    links: [
      { label: 'Management', to: '/colleges?stream=management' },
      { label: 'Engineering', to: '/colleges?stream=engineering' },
      { label: 'Medical', to: '/colleges?stream=medical' },
      { label: 'Commerce', to: '/colleges?stream=commerce' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Blogs & news', to: '/blogs' },
      { label: 'Free counselling', to: '/counselling' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]
