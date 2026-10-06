import { useState } from 'react'
import { motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import {
  Checkbox,
  Honeypot,
  Input,
  OptionCards,
  Select,
  Textarea,
} from '../components/ui/Field.jsx'
import { submitForm } from '../lib/submitForm.js'
import { formatDate, isEmail } from '../lib/utils.js'
import { EVENTS } from '../data/site.js'
import { CTABanner } from '../components/sections/Blocks.jsx'
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle,
  HandHeart,
  Heart,
  Lock,
  MapPin,
  Shield,
  Sparkles,
} from '../components/Icons.jsx'

/* ------------------------------------------------------------------- Why */

function WhySection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            {t('nav.join')}
            <span className="h-px w-6 bg-gold-500/60" />
          </span>
          <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.08] text-ink-900">
            {t('join.whyTitle')}
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed font-medium text-ink-900 md:text-lg">
            {t('join.whyP1')}
          </p>
          <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
            {t('join.whyP2')}
          </p>

          <RevealGroup className="mt-6 flex flex-col gap-2.5" gap={0.05}>
            {t('join.whyList').map((item) => (
              <RevealItem key={item}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-4.5 shrink-0 text-leaf-500" />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-800/82">{item}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.12}>
            <div className="card overflow-hidden p-7 md:p-9">
              <HandHeart className="size-8 text-gold-500" />
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-800/80">
                {t('join.whyClosing')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="overflow-hidden rounded-card bg-ink-950 p-7 md:p-9">
              <div className="bg-grain absolute" />
              <p className="text-[0.9375rem] leading-relaxed text-ink-100/78">
                {t('join.whyClosing2')}
              </p>
              <p className="mt-6 border-t border-white/10 pt-5 font-display text-lg font-bold text-gold-300">
                {t('footer.topCtaText')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- Steps */

function StepsSection() {
  const { t } = useI18n()
  const steps = t('join.steps')

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <div className="container-mic">
        <SectionHeading title={t('join.stepsTitle')} />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4" gap={0.09}>
          {steps.map((step, index) => (
            <RevealItem key={step.title}>
              <div className="group relative h-full rounded-2xl border border-sand-200 bg-sand-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-ink-900 text-[0.8125rem] font-bold text-gold-300 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden size-4 text-sand-300 lg:block" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-[0.9375rem] leading-snug font-bold text-ink-900">
                  {step.title.replace(/^\d+\.\s*/, '')}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-800/70">
                  {step.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ----------------------------------------------------- Membership form */

function MembershipForm() {
  const { t, lang } = useI18n()
  const options = t('join.membershipOptions')

  const [values, setValues] = useState({
    membershipType: 'member',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    gender: '',
    occupation: '',
    motivation: '',
    newsletter: true,
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
    if (!values.firstName.trim()) next.firstName = t('form.errorRequired')
    if (!values.lastName.trim()) next.lastName = t('form.errorRequired')
    if (!isEmail(values.email)) next.email = t('form.errorEmail')
    if (values.phone && !/^[+()\d\s.-]{6,20}$/.test(values.phone)) {
      next.phone = t('form.errorPhone')
    }
    if (values.motivation && values.motivation.trim().length < 20) {
      next.motivation = t('form.errorMinLength')
    }
    if (!values.acceptTerms) next.acceptTerms = t('form.errorTerms')
    return next
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (honeypot) return // bot detected — silently drop

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus?.()
      return
    }

    setStatus('loading')
    try {
      await submitForm({ ...values, lang }, { formName: 'membership' })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <Reveal className="relative">
        <div className="rounded-card bg-leaf-100 p-9 text-center ring-1 ring-leaf-600/25 md:p-14">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-leaf-600 text-white">
            <CheckCircle className="size-8" />
          </span>
          <h3 className="mt-6 font-display text-2xl font-bold text-ink-900 md:text-3xl">
            {t('common.success')}
          </h3>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-800/78">
            {t('join.formText')}
          </p>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal className="relative">
      <form
        onSubmit={onSubmit}
        noValidate
        className="relative overflow-hidden rounded-card bg-white p-6 shadow-lift ring-1 ring-sand-200 md:p-10"
      >
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <span className="eyebrow text-gold-600">
          <Sparkles className="size-4" />
          {t('join.formEyebrow')}
        </span>
        <h2 className="mt-4 text-balance font-display text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] leading-tight text-ink-900">
          {t('join.formTitle')}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-800/72">
          {t('join.formText')}
        </p>

        {/* Membership type */}
        <div className="mt-8">
          <p className="mb-3.5 text-[0.8125rem] font-semibold text-ink-800">
            {t('join.membershipOptionsTitle')}
          </p>
          <OptionCards
            value={values.membershipType}
            onChange={(key) => setValues((p) => ({ ...p, membershipType: key }))}
            options={options}
          />
        </div>

        {/* Fields */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Input
            label={t('form.firstName')}
            required
            value={values.firstName}
            onChange={set('firstName')}
            error={errors.firstName}
            autoComplete="given-name"
            placeholder="Babeth"
          />
          <Input
            label={t('form.lastName')}
            required
            value={values.lastName}
            onChange={set('lastName')}
            error={errors.lastName}
            autoComplete="family-name"
            placeholder="Kapeta"
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
            hint={`${t('common.optional')}`}
          />
          <Input
            label={t('form.city')}
            value={values.city}
            onChange={set('city')}
            autoComplete="address-level2"
            placeholder="Kinshasa"
          />
          <Select
            label={t('form.province')}
            value={values.province}
            onChange={set('province')}
            options={t('form.provinces')}
            placeholder={t('form.selectProvince')}
          />
          <Select
            label={t('form.gender')}
            value={values.gender}
            onChange={set('gender')}
            options={[
              { value: 'male', label: t('form.genderOptions.male') },
              { value: 'female', label: t('form.genderOptions.female') },
              { value: 'other', label: t('form.genderOptions.other') },
            ]}
            placeholder={t('form.selectPlaceholder')}
          />
          <Input
            label={t('form.occupation')}
            value={values.occupation}
            onChange={set('occupation')}
            placeholder={t('form.selectPlaceholder')}
          />
        </div>

        <div className="mt-5">
          <Textarea
            label={t('form.motivation')}
            rows={4}
            value={values.motivation}
            onChange={set('motivation')}
            error={errors.motivation}
            placeholder={t('form.motivationPlaceholder')}
            maxLength={600}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Checkbox
            label={t('form.newsletter')}
            checked={values.newsletter}
            onChange={set('newsletter')}
          />
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

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={status === 'loading'}>
            {status === 'loading' ? t('common.submitting') : t('form.submitJoin')}
          </Button>
          <p className="flex items-center gap-1.5 text-[0.6875rem] text-ink-800/50">
            <Lock className="size-3.5" />
            {t('join.donateSecure')}
          </p>
        </div>
      </form>
    </Reveal>
  )
}

/* ------------------------------------------------------------- Events */

function EventsSection() {
  const { t, lang } = useI18n()
  const events = t('join.events')

  return (
    <section id="evenements" className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('join.eventsEyebrow')}
          title={t('join.eventsTitle')}
          subtitle={t('join.eventsSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" gap={0.08}>
          {events.map((event, index) => (
            <RevealItem key={event.title}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-card border border-sand-200 bg-white p-6 shadow-soft transition-colors duration-500 hover:border-gold-300 hover:shadow-lift md:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-crimson-500 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex items-start gap-5">
                  {/* Date badge */}
                  <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink-950 text-white transition-colors duration-500 group-hover:bg-ink-900">
                    <span className="font-display text-xl leading-none font-bold text-gold-300">
                      {new Date(`${EVENTS[index]?.date ?? '2026-01-01'}T00:00:00`).getDate()}
                    </span>
                    <span className="mt-1 text-[0.5625rem] font-bold tracking-[0.14em] uppercase">
                      {new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
                        month: 'short',
                      }).format(new Date(`${EVENTS[index]?.date ?? '2026-01-01'}T00:00:00`))}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[0.625rem] font-bold tracking-wider text-gold-700 uppercase">
                        {event.type}
                      </span>
                      <span className="flex items-center gap-1 text-[0.6875rem] font-medium text-ink-800/55">
                        <MapPin className="size-3" />
                        {event.location}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-lg leading-snug font-bold text-ink-900 md:text-xl">
                      {event.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-800/72">
                      {event.text}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 text-[0.75rem] font-semibold text-gold-700">
                      <Calendar className="size-3.5" />
                      {formatDate(EVENTS[index]?.date, lang)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button to="/contact" size="sm" variant="outline" icon={false}>
                    {t('form.submitVolunteer')}
                  </Button>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Donate */

function DonateSection() {
  const { t, lang } = useI18n()
  const amounts = t('join.donateAmounts')

  const [frequency, setFrequency] = useState('once')
  const [amount, setAmount] = useState('20 $')
  const [custom, setCustom] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const active = custom.trim() ? custom.trim() : amount
  const impact =
    amounts.find((a) => a.amount === amount)?.impact ?? amounts[amounts.length - 1].impact

  const onDonate = async (event) => {
    event.preventDefault()
    setError('')

    if (!isEmail(email)) {
      setError(t('form.errorEmail'))
      return
    }

    setStatus('loading')
    try {
      await submitForm(
        {
          amount: active,
          frequency,
          email,
          lang,
          // NOTE: never collect card data here.
          // Redirect to a PCI-DSS compliant provider checkout
          // (e.g. Stripe Checkout / Mobile Money / bank transfer instructions).
          intent: 'donation_intent',
        },
        { formName: 'donation' }
      )
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="don" className="relative isolate overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-24 right-0 size-[30rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-mic relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow text-gold-300">
            <Heart className="size-4" />
            {t('join.donateEyebrow')}
          </span>
          <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.08] text-white">
            {t('join.donateTitle')}
          </h2>
          <p className="mt-6 text-[1rem] leading-relaxed text-ink-100/78">
            {t('join.donateText')}
          </p>

          <div className="mt-8 rounded-2xl border border-gold-400/25 bg-gold-400/8 p-6">
            <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-gold-300 uppercase">
              {t('join.donateImpactTitle')}
            </p>
            <p className="mt-2.5 font-display text-lg leading-snug font-bold text-white">
              {impact}
            </p>
          </div>

          <p className="mt-7 flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink-100/55">
            <Shield className="mt-0.5 size-4 shrink-0 text-gold-400" />
            {t('join.donateNote')}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          {status === 'done' ? (
            <div className="rounded-card bg-leaf-100 p-9 text-center ring-1 ring-leaf-600/25">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-leaf-600 text-white">
                <CheckCircle className="size-8" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">
                {t('common.success')}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-800/75">
                {t('join.donateSecure')}
              </p>
            </div>
          ) : (
            <form
              onSubmit={onDonate}
              noValidate
              className="relative rounded-card bg-white p-6 shadow-lift md:p-9"
            >
              {/* Frequency */}
              <p className="text-[0.8125rem] font-semibold text-ink-800">
                {t('join.donateFrequency')}
              </p>
              <div className="mt-2.5 inline-flex rounded-full bg-sand-100 p-1">
                {[
                  { key: 'once', label: t('join.donateOnce') },
                  { key: 'monthly', label: t('join.donateMonthly') },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFrequency(opt.key)}
                    className={`relative rounded-full px-5 py-2 text-[0.8125rem] font-semibold transition-colors duration-300 ${
                      frequency === opt.key
                        ? 'text-ink-950'
                        : 'text-ink-800/60 hover:text-ink-900'
                    }`}
                  >
                    {frequency === opt.key && (
                      <motion.span
                        layoutId="donate-freq"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gold-400 shadow-gold"
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Amounts */}
              <p className="mt-7 text-[0.8125rem] font-semibold text-ink-800">
                {t('join.donateAmountLabel')}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {amounts.map((opt) => {
                  const activeAmount = amount === opt.amount && !custom
                  return (
                    <button
                      key={opt.amount}
                      type="button"
                      onClick={() => {
                        setAmount(opt.amount)
                        setCustom('')
                      }}
                      className={`rounded-xl border py-3.5 font-display text-lg font-bold transition-all duration-300 ${
                        activeAmount
                          ? 'border-gold-500 bg-gold-100/60 text-ink-950 shadow-[0_0_0_3px_rgba(212,160,23,0.18)]'
                          : 'border-sand-200 bg-white text-ink-800 hover:-translate-y-0.5 hover:border-gold-400'
                      }`}
                    >
                      {opt.amount}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Input
                  label={t('join.donateCustom')}
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value)
                    setError('')
                  }}
                  placeholder={t('join.donateCustomPlaceholder')}
                />
                <Input
                  label={t('form.email')}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  error={error}
                  placeholder="nom@exemple.cd"
                />
              </div>

              {/* Selected impact */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex items-start gap-3 rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200"
              >
                <Sparkles className="mt-0.5 size-4.5 shrink-0 text-gold-600" />
                <div>
                  <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-ink-800/50 uppercase">
                    {t('join.donateImpactTitle')}
                  </p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed font-medium text-ink-900">
                    {impact}
                  </p>
                </div>
              </motion.div>

              {status === 'error' && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-crimson-100 px-4 py-3 text-[0.8125rem] font-medium text-crimson-700">
                  <AlertCircle className="size-4" />
                  {t('common.error')}
                </p>
              )}

              <Button type="submit" size="lg" className="mt-6 w-full" disabled={status === 'loading'}>
                {status === 'loading' ? t('common.submitting') : t('join.donateCta')}
              </Button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.6875rem] text-ink-800/50">
                <Lock className="size-3" />
                {t('join.donateSecure')}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Join() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.join.title'),
    description: t('meta.join.description'),
    path: '/rejoindre',
  })

  return (
    <>
      <PageHero
        eyebrow={t('join.heroEyebrow')}
        title={t('join.heroTitle')}
        text={t('join.heroText')}
        icon={HandHeart}
        image="/images/banner.jpeg"
      />

      <WhySection />

      {/* Membership */}
      <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
        <div className="container-mic">
          <MembershipForm />
        </div>
      </section>

      <StepsSection />
      <EventsSection />
      <DonateSection />
      <CTABanner />
    </>
  )
}