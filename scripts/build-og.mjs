/**
 * Renders scripts/og-template.html to public/og-image.png at 1200x630.
 *
 * This is a one-off generator, not part of `npm run build` — the card only
 * changes when the tagline or the stats do, and nobody should need Playwright
 * installed just to build the site. Run it by hand after editing the template:
 *
 *   node scripts/build-og.mjs
 *
 * Playwright is borrowed from the sibling S7-labs project rather than added as
 * a dependency here; a ~300MB browser download to regenerate one image
 * occasionally is not worth carrying in this project's lockfile.
 */
import { chromium } from '../../S7-labs/node_modules/playwright/index.mjs'
import { copyFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

// The template references the photo relatively, so stage a copy beside it.
const staged = join(here, 'hero-lecture.jpg')
copyFileSync(join(root, 'public/photos/hero-lecture.jpg'), staged)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})

await page.goto(`file://${join(here, 'og-template.html').replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle',
})
// Webfonts land after networkidle often enough to be worth waiting on.
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(400)

const out = join(root, 'public/og-image.png')
await page.screenshot({ path: out, type: 'png' })
await browser.close()

rmSync(staged, { force: true })
console.log(`og-image.png written — 1200x630`)
