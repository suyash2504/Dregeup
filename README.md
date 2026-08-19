# Dregeup

**Guiding talents, shaping future.**

A rebuild of [dregeup.com](https://dregeup.com) — an education consultancy and
college-discovery platform based in Wakad, Pune.

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · no animation library

---

## Read this first

**Dregeup is not a college.** It is a consultancy that places students into
*other* institutions — MIT WPU, NMIMS, Christ, Alliance, Symbiosis and others.
It has no campus, no faculty, no degree programmes and no placement cell.

The original brief for this rebuild assumed a university and asked for
programme pages, a faculty directory, departments, campus life, hostel and
placement percentages. None of those exist, so none were built — inventing them
would have produced a site that lies about a real company. The information
architecture below is what Dregeup actually does.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Dev server runs on `http://localhost:5173`. `build` also regenerates
`dist/sitemap.xml` from the router's own data.

---

## Structure

```
src/
  data/              all content; nothing factual is hard-coded in components
    site.js            nav, contact, stats, why-choose, the 4-step process
    catalogue.js       colleges, streams, courses, cities + the filter function
    exams.js           entrance exams, dates, and the verification contract
    assessment.js      the career-assessment questions and scoring
    posts.js           editorial posts + auto-generated exam updates
  lib/
    hooks.js           reveal, count-up, scroll state, scroll lock, escape
    seo.js             per-route title/meta/canonical/OG/JSON-LD
  components/
    layout/            Navbar (+ mobile menu), Footer, PageHeader
    ui/                Button, Bits (Pill/Stat/Card/Pending/…), Sketch, CollegeCard
    sections/          one file per home-page section
    forms/             EnquiryForm
  pages/             Home, Colleges, CollegeDetail, Courses, Exams, ExamDetail,
                     Assessment, Counselling, Blogs, About, Contact, Legal, NotFound
```

Design tokens (colour, type, radii, easing, shadows) live once in
`src/index.css` under `@theme`. Change a value there and it propagates.

---

## The content rules

Three buckets, and they are enforced in the data files rather than by
convention:

**1. Public factual data — sourced freely, from the official body only.**
Exam dates come from the conducting body's own website, never from an
aggregator. Aggregators publish "expected" dates that are routinely wrong —
SNAP 2026 is the live example: aggregators said 5/13/19 December, the official
site says 13/19/26.

Every date in `exams.js` carries `confirmed`. `true` means it was read off the
official site on `verifiedOn`; `false` renders behind a visible "not yet
confirmed by us" badge. Verified at build time (19 Aug 2026):

| Exam | Source | Status |
|---|---|---|
| CAT 2026 | iimcat.ac.in | all dates confirmed |
| SNAP 2026 | snaptest.org | all dates confirmed |
| XAT 2027 | xatonline.in | all dates confirmed |
| NMAT 2026 | mba.com | site unreachable — dates unconfirmed |
| IBSAT 2026 | ibsindia.org | site unreachable — no dates |
| MAH MBA CET | cetcell.mahacet.org | site unreachable — no dates |
| NPAT 2027 | nmimsnpat.in | site unreachable — no dates |

**2. College information — official sources only.**
`catalogue.js` carries name, city and streams: matters of public record. Fees,
cutoffs, placement figures, rankings and accreditation are deliberately absent
and render as labelled gaps on the college page. Do not fill them from
CollegeDekho / Shiksha / Collegedunia — that is both a copyright problem and a
duplicate-content SEO penalty. Use each institute's own site or NIRF, then flip
`dataStatus` to `'verified'`.

**3. Dregeup's own claims — carried over, never invented.**
"98% success rate", "1 Lakh+ students guided", "250+ expert counsellors",
"50+ colleges", "100+ courses", "4.8/5" are the company's published figures and
appear exactly as published, labelled as unaudited on the About page. Nothing
was added to them.

Anything that could not be sourced renders through the `<Pending>` component —
a visible dashed marker, not a silent omission. Grep for it to find every open
item.

---

## What still needs a human

- **Enquiry delivery.** The form validates and is ready, but has no endpoint.
  Set `VITE_ENQUIRY_ENDPOINT` to a form service (Web3Forms, Formspree, a
  Netlify function) and it starts delivering. Until then it tells the student
  to call instead of silently dropping the enquiry.
- **Privacy and Terms.** Structure only — these are binding documents and are
  `noindex` until real copy replaces the outline.
- **Photography.** Four Unsplash stand-ins, credited in
  `public/photos/CREDITS.md`. They are not photographs of Dregeup.
- **Social links.** All four `href` values in `site.js` are `null`, which hides
  the row rather than linking somewhere wrong.
- **Office hours**, leadership, registration details, and how Dregeup is paid —
  all listed as gaps on the About and Contact pages.

---

## Performance and accessibility notes

No animation library. Every transition is CSS transform/opacity, driven by one
`IntersectionObserver` per revealed element, and the whole motion system
collapses under `prefers-reduced-motion`.

Routes are code-split; only Home ships in the initial bundle.

`--color-brand-deep` is the text-safe member of the yellow family. The brief's
`#F4B942` is a *surface* colour — as text it lands near 1.9:1 on the off-white.
The deep value clears 5:1 on tint, background and white. Do not lighten it back
toward the accent yellow without re-checking contrast.
