import { useState } from 'react'
import { motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Field.jsx'
import { isEmail } from '../lib/utils.js'
import { BENEFIT_IDS } from '../data/site.js'
import { CTABanner } from '../components/sections/Blocks.jsx'
import {
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  Lock,
  MessageCircle,
  Shield,
  User,
} from '../components/Icons.jsx'

const BENEFIT_ICONS = {
  documents: FileText,
  activities: CheckCircle,
  forum: MessageCircle,
  notifications: AlertCircle,
  card: Shield,
  impact: User,
}

/* -------------------------------------------------------------- Benefits */

function Benefits() {
  const { t } = useI18n()
  const benefits = t('member.benefits')

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('nav.member')}
          title={t('member.benefitsTitle')}
          subtitle={t('member.heroText')}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {BENEFIT_IDS.map((id) => {
            const benefit = benefits[id]
            const Icon = BENEFIT_ICONS[id] ?? Shield
            return (
              <RevealItem key={id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="card card-hover h-full p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.0625rem] font-bold text-ink-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-800/70">
                    {benefit.text}
                  </p>
                </motion.div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Account */

function AuthCard({ mode }) {
  const { t } = useI18n()
  const isLogin = mode === 'login'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isEmail(email)) {
      setError(t('form.errorEmail'))
      return
    }
    if (password.length < 8) {
      setError(t('form.errorPassword'))
      return
    }
    setError('')
    setStatus('done')
  }

  return (
    <div className="relative h-full overflow-hidden rounded-card bg-white p-7 shadow-lift ring-1 ring-sand-200 md:p-9">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-ink-900 text-gold-300">
          <Lock className="size-4.5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-ink-900">
            {isLogin ? t('member.loginTitle') : t('member.registerTitle')}
          </h2>
          <p className="mt-0.5 text-[0.75rem] text-ink-800/55">
            {isLogin ? t('member.loginText') : t('member.registerText')}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-7 flex flex-col gap-4">
        <Input
          label={t('form.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error && !isEmail(email) ? error : undefined}
          autoComplete="email"
          placeholder="nom@exemple.cd"
        />
        <Input
          label={t('form.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />

        {error && isEmail(email) && (
          <p className="flex items-center gap-2 rounded-xl bg-crimson-100 px-4 py-3 text-[0.8125rem] font-medium text-crimson-700">
            <AlertCircle className="size-4" />
            {error}
          </p>
        )}

        <Button type="submit" className="mt-1 w-full" disabled={status === 'done'}>
          {isLogin ? t('member.loginCta') : t('member.registerCta')}
        </Button>
      </form>

      <p className="mt-5 rounded-xl bg-sand-50 p-3.5 text-[0.75rem] leading-relaxed text-ink-800/60 ring-1 ring-sand-200">
        {t('member.demoNote')}
      </p>

      <p className="mt-5 text-center text-[0.8125rem] text-ink-800/65">
        {isLogin ? t('member.noAccount') : t('member.hasAccount')}{' '}
        <button
          type="button"
          className="link-underline font-semibold text-ink-900"
          onClick={() => {
            setStatus('idle')
            setError('')
          }}
        >
          {isLogin ? t('member.registerCta') : t('member.loginCta')}
        </button>
      </p>
    </div>
  )
}

/* --------------------------------------------------------------- Dashboard */

function Dashboard() {
  const { t } = useI18n()
  const items = t('member.dashboardItems')
  const forum = t('member.forum')

  return (
    <div className="flex flex-col gap-6">
      <Reveal className="overflow-hidden rounded-card bg-ink-950 p-7 md:p-9">
        <div className="bg-grain absolute" />
        <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1.5 text-[0.6875rem] font-bold tracking-wider text-gold-300 uppercase ring-1 ring-gold-400/25">
          <Lock className="size-3" />
          {t('member.dashboardTitle')}
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-white md:text-3xl">
          {t('member.dashboardTitle')}
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/8"
            >
              <p className="font-display text-[0.9375rem] font-bold text-gold-300">
                {item.title}
              </p>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-100/65">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <Button variant="outlineLight" size="sm" className="mt-7" icon={false}>
          <Download className="size-4" />
          {t('resources.download')}
        </Button>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="card p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-ink-900">
              {t('member.forumTitle')}
            </h2>
            <span className="text-[0.75rem] text-ink-800/50">{t('member.lockedNote')}</span>
          </div>

          <ul className="mt-5 divide-y divide-sand-200">
            {forum.map((thread) => (
              <li
                key={thread.title}
                className="group flex items-start gap-4 py-4 transition-colors hover:bg-sand-50"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-sand-100 text-ink-800/60">
                  <MessageCircle className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-semibold text-ink-900">
                    {thread.title}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-2.5 text-[0.6875rem] text-ink-800/50">
                    <span>{thread.author}</span>
                    <span className="size-1 rounded-full bg-sand-300" />
                    <span>{thread.time}</span>
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-sand-100 px-2.5 py-1 text-[0.6875rem] font-bold text-ink-800/60">
                  {thread.replies}
                </span>
              </li>
            ))}
          </ul>

          <Button to="/espace-membre" variant="outline" size="sm" className="mt-4">
            {t('member.forumCta')}
          </Button>
        </div>
      </Reveal>
    </div>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Member() {
  const { t } = useI18n()
  const [mode, setMode] = useState('login')

  useSEO({
    title: t('meta.member.title'),
    description: t('meta.member.description'),
    path: '/espace-membre',
  })

  return (
    <>
      <PageHero
        eyebrow={t('member.heroEyebrow')}
        title={t('member.heroTitle')}
        text={t('member.heroText')}
        icon={User}
        image="/images/banner.jpeg"
      />

      <Benefits />

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-mic grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <AuthCard mode={mode} />
          </Reveal>
          <Reveal delay={0.1}>
            <Dashboard />
          </Reveal>
        </div>

        <div className="container-mic mt-10 flex justify-center gap-3">
          <Button variant="outline" onClick={() => setMode('login')} aria-pressed={mode === 'login'}>
            {t('member.loginTitle')}
          </Button>
          <Button variant="outline" onClick={() => setMode('register')} aria-pressed={mode === 'register'}>
            {t('member.registerTitle')}
          </Button>
        </div>
      </section>

      <CTABanner />
    </>
  )
}