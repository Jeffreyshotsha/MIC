import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '../../i18n/index.jsx'
import { ROUTES } from '../../data/site.js'
import { cn } from '../../lib/utils.js'
import { Menu, Close, Globe } from '../Icons.jsx'
import { Button } from '../ui/Button.jsx'

/* ------------------------------------------------------------------ Logo */

export function Logo({ className, tone = 'dark', compact = false }) {
  const { t } = useI18n()
  const light = tone === 'light'

  return (
    <Link
      to="/"
      aria-label={t('brand.name')}
      className={cn('group flex items-center gap-3', className)}
    >
      <span
        className={cn(
          'relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl',
          'shadow-soft transition-transform duration-500 group-hover:scale-105',
          light ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white ring-1 ring-sand-200'
        )}
      >
        <img
          src="/images/logo.jpeg"
          alt=""
          className="size-full object-cover"
          width="44"
          height="44"
          loading="eager"
          decoding="async"
        />
      </span>

      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              'font-display text-[1.0625rem] font-bold tracking-tight',
              light ? 'text-white' : 'text-ink-900'
            )}
          >
            {t('brand.short')}
          </span>
          <span
            className={cn(
              'mt-1 hidden text-[0.6875rem] font-semibold tracking-[0.14em] uppercase sm:block',
              light ? 'text-gold-300/90' : 'text-gold-700'
            )}
          >
            {t('brand.slogan')}
          </span>
        </span>
      )}
    </Link>
  )
}

/* ------------------------------------------------------- Language switch */

export function LanguageSwitch({ tone = 'dark', className }) {
  const { lang, setLang, t, available } = useI18n()
  const light = tone === 'light'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full p-1',
        light ? 'bg-white/10 ring-1 ring-white/15' : 'bg-sand-100 ring-1 ring-sand-200',
        className
      )}
      role="group"
      aria-label={t('nav.langLabel')}
    >
      <Globe
        className={cn(
          'ml-2 size-3.5 shrink-0',
          light ? 'text-ink-100/60' : 'text-ink-800/45'
        )}
        aria-hidden="true"
      />
      {available.map((l) => {
        const active = l.code === lang
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.label}
            title={l.label}
            className={cn(
              'relative rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tracking-wider transition-colors duration-300',
              active
                ? light
                  ? 'text-ink-950'
                  : 'text-ink-950'
                : light
                  ? 'text-ink-100/70 hover:text-white'
                  : 'text-ink-800/55 hover:text-ink-900'
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gold-400 shadow-gold"
              />
            )}
            <span className="relative z-10">{l.short}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- Navbar */

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(() => window.location.pathname)
  const location = useLocation()

  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    if (open) setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-50 hidden bg-ink-950 text-ink-100 lg:block">
        <div className="container-mic flex h-9 items-center justify-between text-[0.6875rem] tracking-wide">
          <p className="flex items-center gap-2 text-ink-100/70">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-gold-400" />
            {t('brand.founded')}
          </p>
          <div className="flex items-center gap-5">
            <span className="font-semibold tracking-[0.14em] text-gold-300/90 uppercase">
              {t('brand.devise')}
            </span>
            <Link
              to="/contact"
              className="link-underline text-ink-100/70 transition-colors hover:text-white"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-sand-200/70 bg-sand-50/85 shadow-soft backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <nav
          className="container-mic flex items-center justify-between gap-4 py-3"
          aria-label="Primary"
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {ROUTES.map(({ path, key }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative block rounded-full px-3 py-2 text-[0.8125rem] font-semibold tracking-tight transition-colors duration-300',
                      isActive
                        ? 'text-ink-900'
                        : 'text-ink-800/65 hover:text-ink-900'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-gold-100"
                        />
                      )}
                      <span className="relative z-10">{t(`nav.${key}`)}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden sm:inline-flex" />
            <Button to="/rejoindre" size="sm" className="hidden sm:inline-flex">
              {t('nav.primaryCta')}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={open}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-ink-900 shadow-soft ring-1 ring-sand-200 transition-all hover:bg-ink-900 hover:text-white xl:hidden"
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <button
              type="button"
              aria-label={t('nav.closeMenu')}
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-ink-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-sand-50 shadow-lift"
            >
              <div className="border-b border-sand-200 bg-ink-900 px-6 py-6">
                <p className="font-display text-xl font-bold text-white">
                  {t('common.menu')}
                </p>
                <p className="mt-1 text-[0.75rem] font-semibold tracking-[0.14em] text-gold-300 uppercase">
                  {t('brand.devise')}
                </p>
              </div>

              <ul className="flex flex-col gap-1 p-5">
                {ROUTES.map(({ path, key }, i) => (
                  <motion.li
                    key={path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.4 }}
                  >
                    <NavLink
                      to={path}
                      end={path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold tracking-tight transition-colors',
                          isActive
                            ? 'bg-ink-900 text-white'
                            : 'text-ink-900 hover:bg-white'
                        )
                      }
                    >
                      {t(`nav.${key}`)}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-4 border-t border-sand-200 p-5">
                <LanguageSwitch />
                <Button to="/rejoindre" className="w-full" size="lg">
                  {t('nav.primaryCta')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}