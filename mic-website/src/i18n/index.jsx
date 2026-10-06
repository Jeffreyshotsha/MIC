/**
 * Lightweight i18n engine (no external dependency).
 * - Nested dictionary access via dot paths: t('nav.home')
 * - `{0}`, `{1}` … placeholders for interpolation
 * - Persists choice in localStorage, syncs <html lang>
 */
/* oxlint-disable react/only-export-components -- icon map / context helpers */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { dictionaries, DEFAULT_LANG, LANGS } from './dictionaries.js'

const STORAGE_KEY = 'mic.lang'
const LanguageContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && LANGS.some((l) => l.code === stored)) return stored

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || '']

  for (const raw of candidates) {
    const tag = String(raw).toLowerCase()
    const match = LANGS.find(
      (l) => tag === l.code || tag.startsWith(`${l.code}-`) || tag.startsWith(`${l.code}_`)
    )
    if (match) return match.code
  }

  return DEFAULT_LANG
}

function resolve(dictionary, path) {
  return path
    .split('.')
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), dictionary)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = useCallback((next) => {
    if (LANGS.some((l) => l.code === next)) setLangState(next)
  }, [])

  const value = useMemo(() => {
    const dictionary = dictionaries[lang] ?? dictionaries[DEFAULT_LANG]

    /**
     * Translate a dot path. Returns strings, arrays or objects as authored;
     * falls back to FR, then to the path itself for missing strings.
     */
    const t = (path, vars) => {
      let out = resolve(dictionary, path)
      if (out === undefined || out === null) {
        out = resolve(dictionaries[DEFAULT_LANG], path)
      }

      if (vars) {
        if (typeof out !== 'string') return out
        return out.replace(/\{(\d+)\}/g, (match, index) =>
          vars[index] === undefined ? match : String(vars[index])
        )
      }

      if (out === undefined || out === null) return path
      return out
    }

    return {
      lang,
      setLang,
      t,
      isFr: lang === 'fr',
      toggle: () => setLang(lang === 'fr' ? 'en' : 'fr'),
      available: LANGS,
    }
  }, [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}

/** Convenience hook for components that only need `t`. */
export function useT() {
  return useI18n().t
}