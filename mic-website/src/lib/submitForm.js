/**
 * Form submission layer.
 *
 * The site ships with no backend by design: card data and personal data must
 * never transit our own servers. Wire an endpoint here and every form on the
 * site will post to it.
 *
 * Recommended providers (all handle TLS, spam filtering and rate limiting):
 *   • Formspree        POST JSON  →  https://formspree.io/f/<id>
 *   • Web3Forms        POST JSON  →  https://api.web3forms.com/submit
 *   • Netlify Forms    POST urlencoded with `form-name`
 *   • your own API     POST JSON
 *
 * Set the endpoint in `.env`:
 *   VITE_FORM_ENDPOINT="https://formspree.io/f/xxxxxxxx"
 *   VITE_FORM_PROVIDER="json"   (json | urlencoded)
 */

const ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT ?? ''
const PROVIDER = import.meta.env?.VITE_FORM_PROVIDER ?? 'json'
const HONEYPOT_FIELD = 'mic_website'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * @param {Record<string, unknown>} values
 * @param {{ formName: string, simulateMs?: number }} options
 * @returns {Promise<{ ok: true }>}
 * @throws  {Error}
 */
export async function submitForm(values, { formName, simulateMs = 900 } = {}) {
  const payload = {
    ...values,
    formName,
    _honeypot: '',
    submittedAt: new Date().toISOString(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    locale: typeof document !== 'undefined' ? document.documentElement.lang : 'fr',
  }

  // No endpoint configured → demo mode (accept + short delay).
  if (!ENDPOINT) {
    await wait(simulateMs)
    return { ok: true, demo: true }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const isUrlencoded = PROVIDER === 'urlencoded'
    const body = isUrlencoded
      ? new URLSearchParams(
          Object.fromEntries(
            Object.entries(payload).map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v) : String(v)])
          )
        )
      : JSON.stringify(payload)

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: isUrlencoded
        ? { 'Content-Type': 'application/x-www-form-urlencoded' }
        : { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    })

    if (!res.ok) throw new Error(`Form submission failed: ${res.status}`)
    return { ok: true }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export const HONEYPOT = HONEYPOT_FIELD
export const IS_DEMO = !ENDPOINT