import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { TeamGrid, ValuesSection } from '../components/sections/Team.jsx'
import { DomainsSection, CTABanner } from '../components/sections/Blocks.jsx'
import { StatsStrip } from '../components/sections/Gallery.jsx'
import { CheckCircle, Compass, Shield, Target } from '../components/Icons.jsx'

/* ------------------------------------------------------------- Prose block */

function Prose({ paragraphs, className, quote }) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <Reveal key={index} delay={index * 0.06} y={20}>
          <p
            className={
              index === 0
                ? 'text-[1.0625rem] leading-relaxed text-ink-900 font-medium md:text-lg'
                : 'mt-5 text-[1rem] leading-relaxed text-ink-800/82'
            }
          >
            {paragraph}
          </p>
        </Reveal>
      ))}
      {quote && (
        <Reveal delay={0.2}>
          <blockquote className="mt-8 border-l-3 border-gold-500 bg-gold-100/50 py-5 pr-5 pl-6 font-display text-lg leading-snug font-semibold text-ink-900 md:text-xl">
            « {quote} »
          </blockquote>
        </Reveal>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ Checklist */

function Checklist({ items, className, columns = 2, tone = 'light' }) {
  const dark = tone === 'dark'

  return (
    <RevealGroup className={`grid gap-3 ${columns === 2 ? 'sm:grid-cols-2' : ''} ${className}`} gap={0.05}>
      {items.map((item) => (
        <RevealItem key={item}>
          <div
            className={`flex items-start gap-3 rounded-xl border p-4 transition-colors duration-300 ${
              dark
                ? 'border-white/10 bg-white/[0.03] hover:border-gold-400/40'
                : 'border-sand-200 bg-white hover:border-gold-300'
            }`}
          >
            <CheckCircle
              className={`mt-0.5 size-4.5 shrink-0 ${dark ? 'text-gold-400' : 'text-leaf-500'}`}
            />
            <span
              className={`text-[0.875rem] leading-relaxed ${
                dark ? 'text-ink-100/75' : 'text-ink-800/80'
              }`}
            >
              {item}
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/* ---------------------------------------------------------------- Sections */

function WhoSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow text-gold-600">
              <span className="h-px w-6 bg-gold-500/60" />
              {t('about.heroEyebrow')}
            </span>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.08] text-ink-900">
              {t('about.whoTitle')}
            </h2>
            <div className="flag-rule mt-7 w-28" />
          </Reveal>

          <Prose
            className="mt-9"
            paragraphs={[t('about.whoP1'), t('about.whoP2'), t('about.whoP3'), t('about.whoP4')]}
          />

          {/* Devise */}
          <Reveal delay={0.15}>
            <div className="mt-10 overflow-hidden rounded-2xl bg-ink-950 p-7 md:p-9">
              <div className="bg-grain absolute" />
              <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-gold-300 uppercase">
                {t('about.deviseLabel')}
              </p>
              <p className="mt-3 font-display text-2xl leading-tight font-bold text-white md:text-3xl">
                {t('about.devise')}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:pt-24">
          <StatsStrip tone="dark" stats={t('testimonials.stats')} />
          <Reveal delay={0.12}>
            <div className="card mt-6 overflow-hidden p-7 md:p-8">
              <Shield className="size-8 text-gold-500" />
              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                {t('about.commitmentTitle')}
              </h3>
              <p className="mt-2 text-[0.875rem] text-ink-800/70">
                {t('about.commitmentText')}
              </p>
              <div className="mt-5 space-y-2.5">
                {t('about.commitments').map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span className="text-[0.875rem] leading-relaxed text-ink-800/78">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-sand-200 pt-5 font-display text-[0.9375rem] leading-relaxed font-semibold text-ink-900 italic">
                {t('about.commitmentClosing')}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HistorySection() {
  const { t } = useI18n()
  const timeline = t('about.timeline')

  return (
    <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('about.historyEyebrow')}
          title={t('about.historyTitle')}
          tone="light"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Prose
            paragraphs={[
              t('about.historyP1'),
              t('about.historyP2'),
              t('about.historyP3'),
              t('about.historyP4'),
            ]}
          />

          <div className="relative">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-gold-500 via-sand-300 to-transparent" />
            <RevealGroup className="flex flex-col gap-8" gap={0.12}>
              {timeline.map((item) => (
                <RevealItem key={item.date}>
                  <div className="relative pl-10">
                    <span className="absolute top-1.5 left-0 flex size-[15px] items-center justify-center rounded-full border-3 border-gold-500 bg-sand-100">
                      <span className="size-1.5 rounded-full bg-gold-600" />
                    </span>
                    <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
                      {item.date}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-800/75">
                      {item.text}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisionMissionSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-32 right-0 size-[28rem] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-mic relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Vision */}
        <div>
          <Reveal>
            <span className="eyebrow text-gold-300">
              <Compass className="size-4" />
              {t('about.visionEyebrow')}
            </span>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.6rem,1rem+2.2vw,2.5rem)] leading-[1.1] text-white">
              {t('about.visionTitle')}
            </h2>
          </Reveal>

          <Prose
            className="mt-8"
            paragraphs={[t('about.visionP1'), t('about.visionP2')]}
          />

          <Reveal delay={0.2}>
            <div className="mt-9 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 p-7 shadow-gold">
              <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-ink-950/70 uppercase">
                {t('about.visionSlogan')}
              </p>
              <p className="mt-2 font-display text-3xl leading-tight font-bold text-ink-950 md:text-4xl">
                « {t('brand.slogan')} »
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-950/75">
                {t('home.ctaText')}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Mission */}
        <div>
          <Reveal>
            <span className="eyebrow text-gold-300">
              <Target className="size-4" />
              {t('about.missionEyebrow')}
            </span>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.6rem,1rem+2.2vw,2.5rem)] leading-[1.1] text-white">
              {t('about.missionTitle')}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink-100/78">
            <Reveal delay={0.06}>
              <p>{t('about.missionP1')}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t('about.missionP2')}</p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <p className="mt-8 mb-4 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-300 uppercase">
              {t('about.missionListTitle')}
            </p>
            <Checklist items={t('about.missionList')} tone="dark" columns={1} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ObjectivesSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow text-gold-600">
              <span className="h-px w-6 bg-gold-500/60" />
              {t('about.goalEyebrow')}
            </span>
            <h2 className="mt-5 text-balance font-display text-[clamp(1.6rem,1rem+2.2vw,2.5rem)] leading-[1.1] text-ink-900">
              {t('about.goalTitle')}
            </h2>
            <p className="mt-5 text-[1rem] leading-relaxed text-ink-800/82">
              {t('about.goalText')}
            </p>
            <div className="mt-8">
              <Button to="/rejoindre" variant="dark">
                {t('common.discover')}
              </Button>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-6 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
                {t('about.objectivesTitle')}
              </p>
              <p className="text-[0.9375rem] text-ink-800/70">{t('about.objectivesIntro')}</p>
            </Reveal>
            <Checklist items={t('about.objectives')} className="mt-7" columns={1} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ConvictionSection() {
  const { t } = useI18n()

  return (
    <section className="relative isolate overflow-hidden bg-ink-900 py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/banner.jpeg"
          alt=""
          aria-hidden="true"
          className="animate-kenburns size-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/90 to-ink-950/70" />
      </div>

      <div className="container-mic relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-gold-300">
            <span className="h-px w-6 bg-gold-300/60" />
            {t('about.convictionTitle')}
            <span className="h-px w-6 bg-gold-300/60" />
          </span>
        </Reveal>

        <Prose
          className="mx-auto mt-10 max-w-3xl text-center [&_p]:text-[1.0625rem] [&_p]:leading-relaxed [&_p]:text-ink-100/80"
          paragraphs={[t('about.convictionP1'), t('about.convictionP2')]}
        />

        <Reveal delay={0.2}>
          <blockquote className="mx-auto mt-12 max-w-3xl border-y border-gold-400/30 py-9 text-center">
            <p className="font-display text-[clamp(1.375rem,0.9rem+2.2vw,2.25rem)] leading-[1.3] font-bold text-white">
              « {t('about.convictionQuote')} »
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.28} className="mt-10 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-center font-display text-xl font-bold tracking-tight text-gold-300 md:text-2xl">
              {t('join.whyP1')}
            </p>
            <Button to="/rejoindre" size="lg">
              {t('home.ctaPrimary')}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function About() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.about.title'),
    description: t('meta.about.description'),
    path: '/a-propos',
  })

  return (
    <>
      <PageHero
        eyebrow={t('about.heroEyebrow')}
        title={t('about.heroTitle')}
        text={t('about.heroText')}
        icon={Shield}
        image="/images/banner.jpeg"
      />

      <WhoSection />
      <HistorySection />
      <VisionMissionSection />
      <ObjectivesSection />
      <ValuesSection />
      <DomainsSection />

      {/* Team */}
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

      <ConvictionSection />
      <CTABanner />
    </>
  )
}