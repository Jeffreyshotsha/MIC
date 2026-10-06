import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useI18n } from '../../i18n/index.jsx'
import { DOMAIN_KEYS } from '../../data/site.js'
import { Reveal, RevealGroup, RevealItem, SectionHeading } from '../ui/Section.jsx'
import { ArrowRight, DOMAIN_ICONS, HandHeart, MessageCircle, Sparkles } from '../Icons.jsx'

/* -------------------------------------------------- Pillars (home/about) */

export function Pillars() {
  const { t } = useI18n()
  const pillars = t('home.pillars')
  const icons = [MessageCircle, Sparkles, HandHeart, DOMAIN_ICONS.education]

  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar, index) => {
        const Icon = icons[index] ?? Sparkles
        return (
          <RevealItem key={pillar.title}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="card card-hover group relative h-full overflow-hidden p-6"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-crimson-500 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:bg-ink-800">
                <Icon className="size-5.5" />
              </span>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-sm font-bold text-gold-600">
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-ink-900">{pillar.title}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-800/72">
                {pillar.text}
              </p>
            </motion.div>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}

/* -------------------------------------------------- Domains (intervention) */

export function DomainsSection({ tone = 'light' }) {
  const { t } = useI18n()
  const domains = t('about.domains')
  const dark = tone === 'dark'

  return (
    <section
      className={`relative overflow-hidden py-20 md:py-28 ${
        dark ? 'bg-ink-950' : 'bg-sand-100'
      }`}
    >
      {dark && <div className="bg-grain absolute inset-0" />}
      <div className="container-mic relative">
        <SectionHeading
          title={t('about.domainsTitle')}
          subtitle={t('about.domainsSubtitle')}
          tone={dark ? 'dark' : 'light'}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {domains.map((domain, index) => {
            const Icon = DOMAIN_ICONS[DOMAIN_KEYS[index]] ?? Sparkles
            return (
              <RevealItem key={domain.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={`group relative h-full overflow-hidden rounded-card border p-6 transition-all duration-500 ${
                    dark
                      ? 'border-white/10 bg-white/[0.04] hover:border-gold-400/40 hover:bg-white/[0.07]'
                      : 'border-sand-200 bg-white shadow-soft hover:border-gold-400 hover:shadow-lift'
                  }`}
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                      dark
                        ? 'bg-gold-400/12 text-gold-300'
                        : 'bg-ink-50 text-ink-700 group-hover:bg-ink-900 group-hover:text-gold-300'
                    }`}
                  >
                    <Icon className="size-5.5" />
                  </span>
                  <h3
                    className={`mt-5 font-display text-lg leading-snug font-bold ${
                      dark ? 'text-white' : 'text-ink-900'
                    }`}
                  >
                    {domain.name}
                  </h3>
                  <p
                    className={`mt-3 text-[0.875rem] leading-relaxed ${
                      dark ? 'text-ink-100/65' : 'text-ink-800/72'
                    }`}
                  >
                    {domain.text}
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

/* -------------------------------------------------------------- CTABanner */

export function CTABanner({
  title,
  text,
  primaryLabel,
  primaryTo = '/rejoindre',
  secondaryLabel,
  secondaryTo = '/contact',
}) {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 md:py-28">
      <div className="absolute inset-0">
        <img
          src="/images/banner.jpeg"
          alt=""
          aria-hidden="true"
          className="animate-kenburns size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/60" />
        <div className="bg-grain absolute inset-0" />
      </div>

      <div className="container-mic relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_auto]">
          <Reveal>
            <span className="eyebrow text-gold-300">
              <span className="h-px w-6 bg-gold-300/60" />
              {t('brand.slogan')}
              <span className="h-px w-6 bg-gold-300/60" />
            </span>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-[clamp(1.75rem,1.2rem+2.6vw,3rem)] leading-[1.1] text-white">
              {title ?? t('home.ctaTitle')}
            </h2>
            <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-ink-100/75">
              {text ?? t('home.ctaText')}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              to={primaryTo}
              className="group/btn inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 px-7 py-3.5 font-semibold text-ink-950 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span>{primaryLabel ?? t('footer.topCtaBtn')}</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <a
              href={secondaryTo}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/30 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink-900"
            >
              {secondaryLabel ?? t('nav.contact')}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}