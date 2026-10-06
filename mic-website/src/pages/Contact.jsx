import { useState } from 'react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Checkbox, Honeypot, Input, Select, Textarea } from '../components/ui/Field.jsx'
import { submitForm } from '../lib/submitForm.js'
import { isEmail, isPhone } from '../lib/utils.js'
import { CONTACT, SOCIALS } from '../data/site.js'
import { CTABanner } from '../components/sections/Blocks.jsx'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from '../components/Icons.jsx'

/* ------------------------------------------------------------------ Form */

function ContactForm() {
  const { t, lang } = useI18n()

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    acceptTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [honeypot, setHoneypot] = useState('')

  const set = (key) => (event) => {
    const value =
      event?.target?.type === 'checkbox' ? event.target.checked : event?.target?.value ?? event
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = t('form.errorRequired')
    if (!isEmail(values.email)) next.email = t('form.errorEmail')
    if (values.phone && !isPhone(values.phone)) next.phone = t('form.errorPhone')
    if (values.message.trim().length < 20) next.message = t('form.errorMinLength')
    if (!values.acceptTerms) next.acceptTerms = t('form.errorTerms')
    return next
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (honeypot) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus?.()
      return
    }

    setStatus('loading')
    try {
      await submitForm({ ...values, lang }, { formName: 'contact' })
      setStatus('done')
      setValues({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        acceptTerms: false,
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <Reveal>
        <div className="relative rounded-card bg-leaf-100 p-9 text-center ring-1 ring-leaf-600/25 md:p-14">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-leaf-600 text-white">
            <CheckCircle className="size-8" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold text-ink-900 md:text-3xl">
            {t('contact.successTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-800/78">
            {t('contact.successText')}
          </p>
          <Button onClick={() => setStatus('idle')} variant="outline" className="mt-7">
            {t('form.submitContact')}
          </Button>
        </div>
      </Reveal>
    )
  }

  const subjectKeys = ['general', 'join', 'donation', 'press', 'partnership', 'events']

  return (
    <Reveal>
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative overflow-hidden rounded-card bg-white p-6 shadow-lift ring-1 ring-sand-200 md:p-10"
      >
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <h2 className="text-balance font-display text-2xl font-bold text-ink-900 md:text-3xl">
          {t('contact.formTitle')}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-800/72">
          {t('contact.formText')}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Input
            label={t('form.fullName')}
            required
            value={values.name}
            onChange={set('name')}
            error={errors.name}
            autoComplete="name"
            placeholder="Babeth Tshibola Kapeta"
          />
          <Input
            label={t('form.email')}
            type="email"
            required
            value={values.email}
            onChange={set('email')}
            error={errors.email}
            autoComplete="email"
            placeholder="nom@exemple.cd"
          />
          <Input
            label={t('form.phone')}
            type="tel"
            value={values.phone}
            onChange={set('phone')}
            error={errors.phone}
            autoComplete="tel"
            placeholder="+243 8XX XXX XXX"
            hint={t('common.optional')}
          />
          <Select
            label={t('form.subject')}
            value={values.subject}
            onChange={set('subject')}
            options={subjectKeys.map((key) => ({ value: key, label: t(`contact.subjects.${key}`) }))}
          />
        </div>

        <div className="mt-5">
          <Textarea
            label={t('form.message')}
            required
            rows={6}
            value={values.message}
            onChange={set('message')}
            error={errors.message}
            placeholder={t('form.motivationPlaceholder')}
            maxLength={2000}
          />
        </div>

        <div className="mt-6">
          <Checkbox
            label={t('form.acceptTerms')}
            required
            checked={values.acceptTerms}
            onChange={set('acceptTerms')}
            error={errors.acceptTerms}
          />
        </div>

        {status === 'error' && (
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-crimson-100 px-4 py-3 text-[0.8125rem] font-medium text-crimson-700">
            <AlertCircle className="size-4" />
            {t('common.error')}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg" disabled={status === 'loading'}>
            {status === 'loading' ? t('common.submitting') : t('form.submitContact')}
          </Button>
          <p className="flex items-center gap-1.5 text-[0.6875rem] text-ink-800/50">
            <Send className="size-3.5" />
            {t('contact.formText')}
          </p>
        </div>
      </form>
    </Reveal>
  )
}

/* ------------------------------------------------------------ Info blocks */

function InfoSection() {
  const { t } = useI18n()
  const offices = t('contact.offices')

  return (
    <div className="flex flex-col gap-6">
      {/* Contact details */}
      <Reveal>
        <div className="card p-7">
          <h2 className="font-display text-xl font-bold text-ink-900">
            {t('contact.infoTitle')}
          </h2>
          <div className="flag-rule mt-4 w-20" />

          <ul className="mt-6 space-y-5 text-[0.9375rem]">
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Mail className="size-4.5" />
              </span>
              <span>
                <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-ink-800/45 uppercase">
                  {t('contact.emailLabel')}
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-underline mt-1 block font-medium text-ink-900"
                >
                  {CONTACT.email}
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Phone className="size-4.5" />
              </span>
              <span>
                <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-ink-800/45 uppercase">
                  {t('contact.phoneLabel')}
                </span>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="link-underline mt-1 block font-medium text-ink-900"
                >
                  {CONTACT.phone}
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Clock className="size-4.5" />
              </span>
              <span>
                <span className="block text-[0.6875rem] font-bold tracking-[0.14em] text-ink-800/45 uppercase">
                  {t('contact.hoursLabel')}
                </span>
                <span className="mt-1 block font-medium text-ink-900">{t('contact.hours')}</span>
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      {/* Addresses */}
      <Reveal delay={0.1}>
        <div className="card p-7">
          <h2 className="font-display text-xl font-bold text-ink-900">
            {t('contact.addressesTitle')}
          </h2>
          <div className="flag-rule mt-4 w-20" />

          <ul className="mt-6 flex flex-col gap-5">
            {offices.map((office) => (
              <li key={office.label} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-300">
                  <MapPin className="size-4.5" />
                </span>
                <span>
                  <span className="block text-[0.875rem] font-bold text-ink-900">
                    {office.label}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-800/70">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Socials */}
      <Reveal delay={0.18}>
        <div className="overflow-hidden rounded-card bg-ink-950 p-7">
          <div className="bg-grain absolute" />
          <h2 className="font-display text-xl font-bold text-white">
            {t('contact.socialTitle')}
          </h2>
          <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-100/65">
            {t('contact.socialText')}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {SOCIALS.map(({ key, label, href, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-11 items-center justify-center rounded-full bg-white/8 text-ink-100/70 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 hover:text-ink-950 hover:ring-gold-400"
                >
                  <Icon className="size-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Contact() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.contact.title'),
    description: t('meta.contact.description'),
    path: '/contact',
  })

  return (
    <>
      <PageHero
        eyebrow={t('contact.heroEyebrow')}
        title={t('contact.heroTitle')}
        text={t('contact.heroText')}
        icon={Mail}
        image="/images/banner.jpeg"
      />

      <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
        <div className="container-mic grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <ContactForm />
          <InfoSection />
        </div>
      </section>

      {/* Map / location */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="container-mic">
          <RevealGroup className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <RevealItem>
              <span className="eyebrow text-gold-600">
                <MapPin className="size-4" />
                {t('contact.mapTitle')}
              </span>
              <h2 className="mt-5 text-balance font-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight text-ink-900">
                {t('contact.addressMain.label')}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-800/72">
                {t('contact.mapNote')}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href="https://www.google.com/maps/search/?api=1&query=Kinshasa+Ngaliema"
                  variant="outline"
                  icon={false}
                >
                  <MapPin className="size-4" />
                  {t('contact.mapTitle')}
                </Button>
                <Button href={CONTACT.whatsapp} variant="dark" icon={false}>
                  WhatsApp
                </Button>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="relative overflow-hidden rounded-card border border-sand-200 bg-sand-100 shadow-soft">
                <iframe
                  title={t('contact.mapTitle')}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=15.19%2C-4.40%2C15.42%2C-4.25&layer=mapnik"
                  className="h-72 w-full md:h-96"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-sand-200" />
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <CTABanner />
    </>
  )
}