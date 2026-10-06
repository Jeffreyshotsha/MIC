/** Tiny class-name joiner. */
export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(' ')
}

/** Format an ISO date in the active language. */
export function formatDate(iso, lang = 'fr') {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateShort(iso, lang = 'fr') {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
export const PHONE_RE = /^[+()\d\s.-]{6,20}$/

export function isEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

export function isPhone(value) {
  return PHONE_RE.test(String(value).trim())
}