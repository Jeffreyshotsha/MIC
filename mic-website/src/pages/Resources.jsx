import { motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Accordion } from '../components/ui/Accordion.jsx'
import { CTABanner } from '../components/sections/Blocks.jsx'
import { PUBLICATION_IDS } from '../data/site.js'
import { BookOpen, Download, FileText, Folder, Mail, Package } from '../components/Icons.jsx'

/* --------------------------------------------------------- Publications */

function Publications() {
  const { t } = useI18n()
  const pubs = t('resources.pubs')

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('nav.resources')}
          title={t('resources.publicationsTitle')}
          subtitle={t('resources.publicationsSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {PUBLICATION_IDS.map((id) => {
            const pub = pubs[id]
            return (
              <RevealItem key={id}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group card card-hover flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-300 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      <FileText className="size-5.5" />
                    </span>
                    <span className="rounded-md bg-sand-100 px-2 py-1 text-[0.625rem] font-bold tracking-wider text-ink-800/55 uppercase">
                      {pub.type} · {pub.pages}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg leading-snug font-bold text-ink-900">
                    {pub.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-800/70">
                    {pub.text}
                  </p>

                  <div className="mt-6 border-t border-sand-200 pt-4">
                    {/* Replace href with the real PDF path once documents are uploaded. */}
                    <a
                      href="#publications"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex cursor-not-allowed items-center gap-2 text-[0.8125rem] font-semibold text-ink-800/40"
                      aria-disabled="true"
                    >
                      <Download className="size-4" />
                      {t('resources.comingSoon')}
                    </a>
                  </div>
                </motion.article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Kits */

function Kits() {
  const { t } = useI18n()
  const kits = t('resources.kits')

  return (
    <section className="relative overflow-hidden bg-sand-100 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('nav.resources')}
          title={t('resources.kitsTitle')}
          subtitle={t('resources.kitsSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" gap={0.08}>
          {kits.map((kit, index) => (
            <RevealItem key={kit.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-card border border-sand-200 bg-white p-7 shadow-soft transition-all duration-500 hover:border-gold-300 hover:shadow-lift md:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-crimson-500 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex items-start gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 transition-colors duration-500 group-hover:bg-ink-900 group-hover:text-gold-300">
                    <Package className="size-5.5" />
                  </span>
                  <div className="min-w-0">
                    <span className="font-display text-3xl font-bold text-sand-200 transition-colors duration-500 group-hover:text-gold-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink-900">
                      {kit.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-800/72">
                      {kit.text}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-sand-50 p-4 ring-1 ring-sand-200">
                  <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
                    {t('resources.kitContents')}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed font-medium text-ink-800/80">
                    {kit.items}
                  </p>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- FAQ */

function Faq() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow text-gold-600">
            <span className="h-px w-6 bg-gold-500/60" />
            {t('nav.resources')}
            <span className="h-px w-6 bg-gold-500/60" />
          </span>
          <h2 className="mt-5 text-balance font-display text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.08] text-ink-900">
            {t('resources.faqTitle')}
          </h2>
          <p className="mt-5 text-[0.975rem] leading-relaxed text-ink-800/72">
            {t('resources.faqSubtitle')}
          </p>

          <div className="mt-8 rounded-2xl bg-ink-950 p-6">
            <Mail className="size-6 text-gold-400" />
            <p className="mt-4 font-display text-lg font-bold text-white">
              {t('resources.stillHaveQuestion')}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-100/65">
              {t('resources.stillHaveText')}
            </p>
            <Button to="/contact" size="sm" className="mt-5">
              {t('nav.contact')}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Accordion items={t('resources.faq')} />
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Resources() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.resources.title'),
    description: t('meta.resources.description'),
    path: '/ressources',
  })

  return (
    <>
      <PageHero
        eyebrow={t('resources.heroEyebrow')}
        title={t('resources.heroTitle')}
        text={t('resources.heroText')}
        icon={BookOpen}
        image="/images/banner.jpeg"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#publications" variant="outlineLight" size="lg" icon={false}>
            <Folder className="size-4" />
            {t('resources.publicationsTitle')}
          </Button>
          <Button href="#faq" variant="ghost" size="lg" icon={false} className="text-ink-100/80 hover:bg-white/10 hover:text-white">
            {t('resources.faqTitle')}
          </Button>
        </div>
      </PageHero>

      <div id="publications">
        <Publications />
      </div>
      <Kits />
      <div id="faq">
        <Faq />
      </div>

      <CTABanner />
    </>
  )
}