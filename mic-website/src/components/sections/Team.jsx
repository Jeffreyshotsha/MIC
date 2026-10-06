import { useState } from 'react'
import { motion } from 'motion/react'
import { useI18n } from '../../i18n/index.jsx'
import { TEAM, VALUE_KEYS } from '../../data/site.js'
import { RevealGroup, RevealItem, SectionHeading } from '../ui/Section.jsx'
import { Modal } from '../ui/Modal.jsx'
import { Expand, Sparkles, VALUE_ICONS } from '../Icons.jsx'

/**
 * Team grid with lightbox.
 * `tone="dark"` renders on dark backgrounds.
 */
export function TeamGrid({ tone = 'light', limit, columns = 4 }) {
  const { t } = useI18n()
  const [active, setActive] = useState(null)

  const members = limit ? TEAM.slice(0, limit) : TEAM

  const colClass =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <>
      <RevealGroup className={`grid gap-5 ${colClass}`} gap={0.07}>
        {members.map((member, index) => {
          const role = t(`about.team.${member.key}.role`)

          return (
            <RevealItem key={member.key}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`group relative h-full overflow-hidden rounded-card border shadow-soft transition-shadow duration-500 hover:shadow-lift ${
                  tone === 'dark'
                    ? 'border-white/10 bg-white/5'
                    : 'border-sand-200 bg-white'
                }`}
              >
                <div className="relative aspect-4/5 overflow-hidden bg-sand-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="800"
                    className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

                  {/* Featured badge */}
                  {member.primary && (
                    <span className="absolute top-3 left-3 rounded-full bg-gold-400 px-3 py-1 text-[0.625rem] font-bold tracking-wider text-ink-950 uppercase">
                      {t('about.teamEyebrow')}
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg leading-tight font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 text-[0.75rem] leading-snug font-medium text-gold-300">
                      {role}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`${t('common.discover')} — ${member.name}`}
                    className="absolute top-3 right-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/85 text-ink-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 hover:bg-white md:opacity-100"
                  >
                    <Expand className="size-4" />
                  </button>
                </div>
              </motion.article>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <Modal open={active !== null} onClose={() => setActive(null)}>
        {active !== null && (
          <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            <img
              src={members[active].image}
              alt={members[active].name}
              className="h-64 w-full object-cover object-top md:h-full"
            />
            <div className="p-7 md:p-9">
              <span className="eyebrow text-gold-600">{t('about.teamTitle')}</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink-900 md:text-3xl">
                {members[active].name}
              </h3>
              <p className="mt-3 text-[0.9375rem] font-semibold text-gold-700">
                {t(`about.team.${members[active].key}.role`)}
              </p>
              <div className="flag-rule mt-6 w-24" />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-800/75">
                {t('about.commitmentClosing')}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

/* ------------------------------------------------------- Full team block */

export function TeamSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('about.teamEyebrow')}
          title={t('about.teamTitle')}
          subtitle={t('about.teamSubtitle')}
        />
        <div className="mt-14">
          <TeamGrid />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ Values + domains */

export function ValuesSection() {
  const { t } = useI18n()
  const values = t('about.values')

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-ink-500/15 blur-3xl" />

      <div className="container-mic relative">
        <SectionHeading
          eyebrow={t('about.valuesEyebrow')}
          title={t('about.valuesTitle')}
          subtitle={t('about.valuesSubtitle')}
          tone="dark"
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {values.map((value, index) => (
            <RevealItem key={value.name}>
              <ValueCard value={value} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function ValueCard({ value, index }) {
  const Icon = VALUE_ICONS[VALUE_KEYS[index]] ?? Sparkles

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/40 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-xl bg-gold-400/12 text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold-400/20">
          <Icon className="size-5" />
        </span>
        <span className="font-display text-4xl font-bold text-white/6 transition-colors duration-500 group-hover:text-gold-400/20">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-bold text-white">{value.name}</h3>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-100/65">{value.text}</p>

      <span className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-400 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  )
}
