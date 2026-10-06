import { useEffect } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { SITE_URL } from '../data/site.js'

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => {
      if (k.startsWith('property:')) el.setAttribute('property', k.slice(9))
      else if (k.startsWith('name:')) el.setAttribute('name', k.slice(5))
      else if (k === 'charset') el.setAttribute('charset', v)
      else if (k === 'content') el.setAttribute('content', v)
    })
    document.head.appendChild(el)
    return
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'charset') el.setAttribute('charset', v)
    else if (k === 'content') el.setAttribute('content', v)
  })
}

/**
 * Updates document title, description, canonical URL, Open Graph and
 * Twitter tags whenever the route or the active language changes.
 */
export function useSEO({ title, description, path = '/', image = '/images/banner.jpeg' }) {
  const { lang } = useI18n()

  useEffect(() => {
    const full = title ? `${title} | MIC` : 'MIC — Imposons le Changement'
    const url = `${SITE_URL}${path}`
    const img = image.startsWith('http') ? image : `${SITE_URL}${image}`

    document.title = full

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description ?? '',
    })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: full })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description ?? '',
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: img })
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: lang === 'fr' ? 'fr_CD' : 'en_US',
    })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: full })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description ?? '',
    })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: img })

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url

    document.documentElement.lang = lang
  }, [title, description, path, image, lang])
}

/** Adds JSON-LD structured data for the given object. */
export function useStructuredData(data) {
  useEffect(() => {
    if (!data) return undefined
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => script.remove()
  }, [data])
}