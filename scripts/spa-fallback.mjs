/**
 * GitHub Pages has no rewrite rules, so a deep link like /Dregeup/exams/cat
 * would 404. Pages serves 404.html for any missing path; making it a copy of
 * index.html lets the router pick the route up client-side.
 */
import { copyFileSync } from 'node:fs'

copyFileSync(new URL('../dist/index.html', import.meta.url), new URL('../dist/404.html', import.meta.url))
console.log('404.html — SPA fallback for GitHub Pages')
