import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Counter } from '../components/ui/Effects.jsx'
import { Gallery } from '../components/sections/Gallery.jsx'
import { CTABanner } from '../components/sections/Blocks.jsx'
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Flag,
  Graduation,
  HandHeart,
  Leaf,
  Megaphone,
  MessageCircle,
  Shield,
  Sparkles,
  Target,
  Users,
} from '../components/Icons.jsx'

const STATUS_STYLES = {
  ongoing: 'bg-leaf-100 text-leaf-600 ring-leaf-600/25',
  pilot: 'bg-gold-100 text-gold-700 ring-gold-600/25',
  upcoming: 'bg-ink-50 text-ink-700 ring-ink-600/20',
}

const PROJECT_ICONS = [BookOpen, Shield, Users, HandHeart, Leaf, Graduation]

/* ---------------------------------------------------------------- Projects */

function Projects() {
  const { t } = useI18n()
  const projects = t('actions.projects')
  const [openId, setOpenId] = useState(projects[0].key)

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('actions.projectsEyebrow')}
          title={t('actions.projectsTitle')}
          subtitle={t('actions.projectsSubtitle')}
        />

        <div className="mt-16 flex flex-col gap-4">
          {projects.map((project, index) => {
            const Icon = PROJECT_ICONS[index] ?? Sparkles
            const open = openId === project.key
            const statusLabel = t(`actions.statusLabels.${project.status}`)

            return (
              <motion.div
                key={project.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
                className={`overflow-hidden rounded-card border bg-white transition-all duration-500 ${
                  open
                    ? 'border-gold-400 shadow-lift'
                    : 'border-sand-200 shadow-soft hover:border-sand-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : project.key)}
                  aria-expanded={open}
                  className="flex w-full cursor-pointer items-start gap-5 p-6 text-left md:gap-7 md:p-8"
                >
                  <span
                    className={`flex size-13 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
                      open
                        ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950'
                        : 'bg-ink-900 text-gold-300'
                    }`}
                  >
                    <Icon className="size-6" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-xl font-bold text-ink-900 md:text-2xl">
                        {project.title}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-wider uppercase ring-1 ${STATUS_STYLES[project.status]}`}
                      >
                        {statusLabel}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.75rem] font-semibold tracking-wide text-gold-700 uppercase">
                      {project.category}
                    </span>
                    <span
                      className={`mt-3 block max-w-3xl text-[0.9375rem] leading-relaxed text-ink-800/78 ${
                        open ? '' : 'line-clamp-2 md:line-clamp-1'
                      }`}
                    >
                      {project.objective}
                    </span>
                  </span>

                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-400 ${
                      open ? 'rotate-45 bg-ink-900 text-white' : 'bg-sand-100 text-ink-800'
                    }`}
                  >
                    <ArrowRight className="size-4 -rotate-45" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-sand-200 bg-sand-50/60 px-6 py-7 md:px-8 md:py-8">
                        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                          {/* Steps */}
                          <div>
                            <p className="mb-5 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
                              {t('actions.projectsEyebrow')}
                            </p>
                            <ol className="flex flex-col gap-4">
                              {project.steps.map((step, i) => (
                                <li key={step} className="flex gap-4">
                                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-900 text-[0.6875rem] font-bold text-gold-300">
                                    {i + 1}
                                  </span>
                                  <div>
                                    <p className="text-[0.75rem] font-bold tracking-wide text-ink-800/50 uppercase">
                                      {t('actions.stepLabels')[i]}
                                    </p>
                                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-800/85">
                                      {step}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Expected results */}
                          <div className="rounded-2xl bg-white p-6 ring-1 ring-sand-200">
                            <span className="flex size-10 items-center justify-center rounded-xl bg-leaf-100 text-leaf-600">
                              <Award className="size-5" />
                            </span>
                            <p className="mt-4 text-[0.6875rem] font-bold tracking-[0.16em] text-leaf-600 uppercase">
                              {t('actions.achievementsEyebrow')}
                            </p>
                            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-800/85">
                              {project.results}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- Achievements */

function Achievements() {
  const { t } = useI18n()
  const items = t('actions.achievements')
  const list = t('actions.achievementsList')

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-ink-500/15 blur-3xl" />

      <div className="container-mic relative">
        <SectionHeading
          eyebrow={t('actions.achievementsEyebrow')}
          title={t('actions.achievementsTitle')}
          subtitle={t('actions.achievementsSubtitle')}
          tone="dark"
        />

        {/* Counters */}
        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {items.map((item) => (
            <RevealItem key={item.label}>
              <div className="h-full bg-ink-950/70 p-7 text-center">
                <Counter
                  value={item.value}
                  className="block font-display text-[clamp(2rem,1.2rem+2.6vw,3rem)] leading-none font-bold text-gradient-gold"
                />
                <p className="mt-3.5 text-[0.875rem] font-semibold text-white">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-snug text-ink-100/50">
                  {item.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* List */}
        <RevealGroup className="mt-12 grid gap-3 md:grid-cols-2" gap={0.07}>
          {list.map((item) => (
            <RevealItem key={item}>
              <div className="flex h-full items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/[0.06]">
                <Check className="mt-0.5 size-4.5 shrink-0 text-gold-400" />
                <p className="text-[0.9375rem] leading-relaxed text-ink-100/78">{item}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Approach */

function Approach() {
  const { t } = useI18n()
  const approach = t('about.approach')
  const icons = [Megaphone, Graduation, Users, Target]

  return (
    <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading title={t('about.approachTitle')} subtitle={t('about.approachText')} />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {approach.map((item, index) => {
            const Icon = icons[index] ?? Sparkles
            return (
              <RevealItem key={index}>
                <div className="card card-hover group h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="font-display text-5xl font-bold text-sand-200">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-800/82">
                    {item}
                  </p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Domains */

function DomainsBrief() {
  const { t } = useI18n()
  const domains = t('about.domains')
  const icons = [Graduation, MessageCircle, Shield, Users, HandHeart, Megaphone, Flag, Leaf]

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          title={t('actions.heroTitle')}
          subtitle={t('actions.heroText')}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {domains.map((domain, index) => {
            const Icon = icons[index] ?? Sparkles
            return (
              <RevealItem key={domain.name}>
                <div className="group h-full rounded-2xl border border-sand-200 bg-sand-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lift">
                  <Icon className="size-6 text-gold-600 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="mt-4 font-display text-[0.9375rem] font-bold text-ink-900">
                    {domain.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-800/68">
                    {domain.text}
                  </p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Actions() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.actions.title'),
    description: t('meta.actions.description'),
    path: '/nos-actions',
  })

  return (
    <>
      <PageHero
        eyebrow={t('actions.heroEyebrow')}
        title={t('actions.heroTitle')}
        text={t('actions.heroText')}
        icon={Target}
        image="/images/banner.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/rejoindre" size="lg">
            {t('home.ctaPrimary')}
          </Button>
          <Button to="/ressources" variant="outlineLight" size="lg">
            {t('nav.resources')}
          </Button>
        </div>
      </PageHero>

      <Projects />
      <Achievements />
      <Approach />
      <DomainsBrief />
      <Gallery />
      <CTABanner
        title={t('home.ctaTitle')}
        text={t('home.ctaText')}
        primaryLabel={t('home.ctaPrimary')}
      />
    </>
  )
}