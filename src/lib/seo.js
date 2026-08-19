import { useEffect } from 'react'
import { site } from '../data/site'

const set = (selector, attrs) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(attrs.tag ?? 'meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'tag' || v == null) return
    el.setAttribute(k, v)
  })
  return el
}

/**
 * Per-route title, description, canonical, Open Graph and JSON-LD.
 * Router-driven rather than server-rendered, so it updates on navigation.
 */
export function useSeo({ title, description, path, schema, noindex } = {}) {
  useEffect(() => {
    const full = title ? `${title} — ${site.name}` : `${site.name} — ${site.description}`
    const desc = description ?? site.description
    const url = `${site.url}${path ?? window.location.pathname}`

    document.title = full

    set('meta[name="description"]', { name: 'description', content: desc })
    set('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: url })
    set('meta[property="og:title"]', { property: 'og:title', content: full })
    set('meta[property="og:description"]', { property: 'og:description', content: desc })
    set('meta[property="og:url"]', { property: 'og:url', content: url })
    set('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    set('meta[property="og:site_name"]', { property: 'og:site_name', content: site.name })

    // Kept in sync with the static tags in index.html. Note that social
    // crawlers never see these — they do not run JavaScript, so index.html is
    // what governs link previews. These exist so the DOM is self-consistent
    // for anything that inspects the live page.
    const image = `${site.url}/og-image.png`
    set('meta[property="og:image"]', { property: 'og:image', content: image })
    set('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' })
    set('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' })

    set('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    set('meta[name="twitter:title"]', { name: 'twitter:title', content: full })
    set('meta[name="twitter:description"]', { name: 'twitter:description', content: desc })
    set('meta[name="twitter:image"]', { name: 'twitter:image', content: image })

    const robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      set('meta[name="robots"]', { name: 'robots', content: 'noindex,follow' })
    } else if (robots) {
      robots.remove()
    }

    let ld = document.getElementById('ld-json')
    if (schema) {
      if (!ld) {
        ld = document.createElement('script')
        ld.id = 'ld-json'
        ld.type = 'application/ld+json'
        document.head.appendChild(ld)
      }
      ld.textContent = JSON.stringify(schema)
    } else if (ld) {
      ld.remove()
    }
  }, [title, description, path, schema, noindex])
}

export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Dregeup',
  description: site.description,
  url: site.url,
  telephone: '+91 8770579905',
  email: 'dregeupeducation@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'The Address Commercia, Hinjawadi Rd, Shankar Kalat Nagar, Wakad',
    addressLocality: 'Pimpri-Chinchwad',
    addressRegion: 'Maharashtra',
    postalCode: '411057',
    addressCountry: 'IN',
  },
}
