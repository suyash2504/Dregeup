/**
 * Writes dist/sitemap.xml from the same data the router uses, so a new college
 * or exam cannot appear on the site without appearing in the sitemap. Run after
 * `vite build` — see the `build` script in package.json.
 */
import { writeFileSync } from 'node:fs'
import { colleges } from '../src/data/catalogue.js'
import { exams } from '../src/data/exams.js'

const ORIGIN = process.env.SITE_ORIGIN ?? 'https://suyash2504.github.io/Dregeup'

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/colleges', priority: '0.9', changefreq: 'weekly' },
  { path: '/courses', priority: '0.8', changefreq: 'monthly' },
  { path: '/exams', priority: '0.9', changefreq: 'daily' },
  { path: '/assessment', priority: '0.8', changefreq: 'monthly' },
  { path: '/counselling', priority: '0.8', changefreq: 'monthly' },
  { path: '/blogs', priority: '0.6', changefreq: 'weekly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
]

// /privacy and /terms are deliberately excluded — they are noindex until drafted.
const routes = [
  ...staticRoutes,
  ...colleges.map((c) => ({ path: `/colleges/${c.slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...exams.map((e) => ({ path: `/exams/${e.slug}`, priority: '0.8', changefreq: 'weekly' })),
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(new URL('../dist/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml — ${routes.length} URLs`)
