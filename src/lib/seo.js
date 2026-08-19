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
    set('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })

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
