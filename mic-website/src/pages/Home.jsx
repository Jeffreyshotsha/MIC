import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { Button } from '../components/ui/Button.jsx'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Section.jsx'
import { Marquee } from '../components/ui/Effects.jsx'
import { TeamGrid } from '../components/sections/Team.jsx'
import { Pillars, DomainsSection, CTABanner } from '../components/sections/Blocks.jsx'
import { StatsStrip } from '../components/sections/Gallery.jsx'
import { Quote, Sparkles, ChevronDown, Shield, Target } from '../components/Icons.jsx'

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const { t } = useI18n()
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative isolate min-h-[92svh] overflow-hidden bg-ink-950">
      {/* Background image with parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <img
          src="/images/banner.jpeg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/92 via-ink-950/78 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />
        <div className="bg-grain absolute inset-0" />
      </motion.div>

      {/* Decorative glows */}
      <div className="animate-float absolute -top-20 -left-24 -z-10 size-[34rem] rounded-full bg-ink-500/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 -z-10 size-[30rem] rounded-full bg-gold-500/12 blur-3xl" />

      {/* Rotating badge */}
      <div className="animate-spin-slow pointer-events-none absolute top-1/2 right-6 -z-10 hidden size-52 lg:block xl:right-16">
        <svg viewBox="0 0 200 200" className="size-full">
          <defs>
            <path
              id="mic-circle"
              d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
              fill="none"
            />
          </defs>
          <text className="fill-gold-400/70 text-[13px] font-semibold tracking-[0.28em] uppercase">
            <textPath href="#mic-circle">
              Action · Discipline · Changement ·&nbsp;
            </textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-gold-400/40 bg-ink-950/50 backdrop-blur">
            <Quote className="size-6 text-gold-300" />
          </span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-mic flex min-h-[92svh] flex-col justify-center pt-28 pb-20 md:pt-32"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full bg-white/8 px-4 py-2 text-[0.6875rem] font-bold tracking-[0.16em] text-ink-100/85 uppercase ring-1 ring-white/15 backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-gold-400" />
          </span>
          {t('home.badge')}
        </motion.span>

        <h1 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,1.3rem+5.4vw,5.25rem)] leading-[1.02] font-bold text-white">
          <motion.span
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {t('home.titleLine1')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="text-gradient-gold block"
          >
            {t('home.titleAccent')}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
          className="mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-100/78 md:text-lg"
        >
          {t('home.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button to="/rejoindre" size="lg">
            {t('home.ctaPrimary')}
          </Button>
          <Button to="/nos-actions" variant="outlineLight" size="lg">
            {t('home.ctaSecondary')}
          </Button>
          <Button to="/rejoindre#don" variant="ghost" size="lg" icon={false} className="text-ink-100/80 hover:bg-white/10 hover:text-white">
            {t('home.ctaDonate')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14 flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.2em] text-ink-100/45 uppercase"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex size-9 items-center justify-center rounded-full ring-1 ring-white/15"
          >
            <ChevronDown className="size-4" />
          </motion.span>
          {t('home.scrollHint')}
        </motion.div>
      </motion.div>

      <div className="flag-rule absolute inset-x-0 bottom-0 h-1" />
    </section>
  )
}

/* ------------------------------------------------------------ Devise bar */

function DeviseBar() {
  const { t } = useI18n()
  const words = t('brand.devise').split(' · ')

  return (
    <div className="relative z-10 -mt-px border-y border-sand-200 bg-white py-6">
      <Marquee speed={26}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-10 px-5">
            {words.map((word, i) => (
              <span key={`${dup}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-xl font-bold tracking-tight text-ink-900 md:text-2xl">
                  {word}
                </span>
                <span className="size-1.5 rounded-full bg-gold-500" />
              </span>
            ))}
            <span className="font-display text-xl font-bold tracking-tight text-gold-600 italic md:text-2xl">
              « {t('brand.slogan')} »
            </span>
            <span className="size-1.5 rounded-full bg-crimson-500" />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

/* --------------------------------------------------------------- Summary */

function Summary() {
  const { t } = useI18n()
  const points = [t('home.summaryPoint1'), t('home.summaryPoint2'), t('home.summaryPoint3')]

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow text-gold-600">
              <span className="h-px w-6 bg-gold-500/60" />
              {t('home.summaryEyebrow')}
            </span>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.08] text-ink-900">
              {t('home.summaryTitle')}
            </h2>
            <div className="flag-rule mt-7 w-28" />
            <div className="mt-8">
              <StatsStrip tone="light" />
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <p className="text-[1.0625rem] leading-relaxed text-ink-800/85 md:text-lg">
                {t('home.summaryBody')}
              </p>
            </Reveal>

            <RevealGroup className="mt-2 flex flex-col gap-4" gap={0.12}>
              {points.map((point, index) => (
                <RevealItem key={index}>
                  <div className="group flex gap-5 rounded-2xl border border-sand-200 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lift">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-gold-300 transition-transform duration-500 group-hover:scale-110">
                      {index === 0 ? (
                        <Sparkles className="size-5" />
                      ) : index === 1 ? (
                        <Target className="size-5" />
                      ) : (
                        <Shield className="size-5" />
                      )}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-800/85">
                      {point}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <Button to="/a-propos" variant="outline">
                {t('common.learnMore')}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Pillars */

function PillarsSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
      <div className="container-mic">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            {t('about.approachTitle')}
            <span className="h-px w-6 bg-gold-500/60" />
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.1] text-ink-900">
            {t('home.pillarsTitle')}
          </h2>
        </Reveal>
        <Pillars />
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- Quote */

function QuoteBand() {
  const { t } = useI18n()

  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-20 left-1/4 size-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-mic relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto size-10 text-gold-400" />
          <blockquote className="mt-8 font-display text-[clamp(1.5rem,1rem+2.6vw,2.75rem)] leading-[1.25] font-semibold text-white">
            « {t('about.convictionQuote')} »
          </blockquote>
          <p className="mt-7 text-[0.6875rem] font-bold tracking-[0.24em] text-gold-300 uppercase">
            {t('about.convictionTitle')} — {t('brand.name')}
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/a-propos" variant="outlineLight" size="md">
              {t('common.learnMore')}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Home() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.home.title'),
    description: t('meta.home.description'),
    path: '/',
  })

  return (
    <>
      <Hero />
      <DeviseBar />
      <Summary />
      <PillarsSection />
      <DomainsSection />
      <QuoteBand />

      {/* Team preview */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="container-mic">
          <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-gold-600">
              <span className="h-px w-6 bg-gold-500/60" />
              {t('about.teamEyebrow')}
              <span className="h-px w-6 bg-gold-500/60" />
            </span>
            <h2 className="max-w-2xl text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.1] text-ink-900">
              {t('home.teamTitle')}
            </h2>
            <p className="max-w-xl text-[0.975rem] leading-relaxed text-ink-800/70">
              {t('home.teamSubtitle')}
            </p>
          </Reveal>

          <TeamGrid limit={4} />

          <Reveal delay={0.15} className="mt-12 flex justify-center">
            <Button to="/a-propos" variant="outline" size="lg">
              {t('common.seeAll')}
            </Button>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  )
}