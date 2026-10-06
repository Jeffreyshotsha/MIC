import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/index.jsx'
import { CONTACT, FOOTER_ACTION_ROUTES, ROUTES, SOCIALS } from '../../data/site.js'
import { submitForm } from '../../lib/submitForm.js'
import { cn } from '../../lib/utils.js'
import { Button } from '../ui/Button.jsx'
import { Reveal } from '../ui/Section.jsx'
import { Logo, LanguageSwitch } from './Navbar.jsx'
import {
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Clock,
  Lock,
} from '../Icons.jsx'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t, lang } = useI18n()

  const navRoutes = ROUTES.filter((r) => !FOOTER_ACTION_ROUTES.includes(r.key))
  const actionRoutes = ROUTES.filter((r) => FOOTER_ACTION_ROUTES.includes(r.key))

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-ink-100">
      {/* Pre-footer CTA */}
      <div className="relative border-b border-white/10">
        <div className="container-mic py-16 md:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_auto]">
            <Reveal>
              <h2 className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)] leading-tight text-white">
                {t('footer.topCtaTitle')}
              </h2>
              <p className="mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-ink-100/70">
                {t('footer.topCtaText')}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="flex flex-wrap items-center gap-3">
              <Button to="/rejoindre" size="lg">
                {t('footer.topCtaBtn')}
              </Button>
              <Button to="/contact" variant="outlineLight" size="lg" icon={false}>
                {t('nav.contact')}
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="flag-rule absolute inset-x-0 bottom-0 h-1" />
      </div>

      {/* Newsletter */}
      <div className="container-mic py-14 md:py-16">
        <Newsletter lang={lang} />
      </div>

      {/* Main footer */}
      <div className="border-t border-white/10 bg-ink-950">
        <div className="container-mic grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-ink-100/65">
              {t('footer.about')}
            </p>
            <p className="mt-6 text-[0.75rem] font-semibold tracking-[0.16em] text-gold-300/90 uppercase">
              {t('brand.devise')}
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[0.75rem] font-bold tracking-[0.16em] text-white uppercase">
              {t('footer.navTitle')}
            </h3>
            <ul className="space-y-3">
              {navRoutes.map(({ path, key }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="link-underline text-[0.875rem] text-ink-100/65 transition-colors hover:text-gold-300"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 text-[0.75rem] font-bold tracking-[0.16em] text-white uppercase">
              {t('footer.actionTitle')}
            </h3>
            <ul className="space-y-3">
              {actionRoutes.map(({ path, key }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="link-underline text-[0.875rem] text-ink-100/65 transition-colors hover:text-gold-300"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-5 text-[0.75rem] font-bold tracking-[0.16em] text-white uppercase">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-4 text-[0.875rem] text-ink-100/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-underline transition-colors hover:text-gold-300"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="link-underline transition-colors hover:text-gold-300"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{t('contact.hours')}</span>
              </li>
            </ul>

            <div className="mt-7">
              <p className="mb-3 text-[0.75rem] font-bold tracking-[0.16em] text-white uppercase">
                {t('contact.followUs')}
              </p>
              <ul className="flex flex-wrap gap-2">
                {SOCIALS.map(({ key, label, href, Icon }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex size-10 items-center justify-center rounded-full bg-white/8 text-ink-100/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:text-ink-950 hover:ring-gold-400"
                    >
                      <Icon className="size-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-mic flex flex-col items-center justify-between gap-5 py-7 md:flex-row">
            <p className="text-[0.75rem] text-ink-100/50">
              © {YEAR} {t('brand.name')}. {t('footer.rights')}
            </p>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.75rem] text-ink-100/55">
              {['legal', 'privacy', 'charter'].map((key) => (
                <li key={key}>
                  <Link to="/ressources" className="transition-colors hover:text-gold-300">
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            <LanguageSwitch tone="light" />
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------------------------------------------------- Newsletter */

function Newsletter({ lang }) {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) {
      setError(t('form.errorEmail'))
      return
    }

    setStatus('loading')
    try {
      await submitForm({ email, source: 'newsletter', lang }, { formName: 'newsletter' })
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
        id="newsletter"
        className="grid scroll-mt-32 items-center gap-8 rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 md:grid-cols-[1fr_1.1fr] md:p-10"
      >
      <div>
        <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
          {t('footer.newsletterTitle')}
        </h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-100/65">
          {t('footer.newsletterText')}
        </p>
      </div>

      {status === 'done' ? (
        <div className="flex items-center gap-3 rounded-2xl bg-leaf-100/10 px-5 py-4 ring-1 ring-leaf-500/30">
          <CheckCircle className="size-5 shrink-0 text-leaf-500" />
          <p className="text-[0.875rem] font-medium text-white">{t('common.success')}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              {t('form.email')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder={t('form.email')}
              className={cn(
                'min-w-0 flex-1 rounded-xl border bg-white/5 px-4 py-3 text-[0.9375rem] text-white',
                'placeholder:text-ink-100/35 focus:bg-white/10 focus:outline-none',
                error
                  ? 'border-crimson-400'
                  : 'border-white/15 focus:border-gold-400'
              )}
            />
            <Button type="submit" disabled={status === 'loading'} className="shrink-0">
              {status === 'loading' ? t('common.submitting') : t('form.submitNewsletter')}
            </Button>
          </div>
          <p className="flex items-center gap-1.5 text-[0.6875rem] text-ink-100/40">
            <Lock className="size-3" />
            {t('join.donateSecure')}
          </p>
        </form>
      )}
    </div>
  )
}
