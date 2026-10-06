import { motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { StatsStrip } from '../components/sections/Gallery.jsx'
import { CTABanner } from '../components/sections/Blocks.jsx'
import { PARTNERS, TESTIMONIAL_IDS } from '../data/site.js'
import { HandHeart, Quote, Sparkles, Star } from '../components/Icons.jsx'

/* --------------------------------------------------------- Testimonials */

function TestimonialsSection() {
  const { t } = useI18n()
  const items = t('testimonials.items')

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('testimonials.heroEyebrow')}
          title={t('testimonials.testimonialsTitle')}
          subtitle={t('testimonials.testimonialsSubtitle')}
        />

        <RevealGroup className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3" gap={0.05}>
          {TESTIMONIAL_IDS.map((id, index) => {
            const item = items[id]
            return (
              <RevealItem key={id} className="mb-5 break-inside-avoid">
                <motion.figure
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="card card-hover relative p-7"
                >
                  <Quote className="size-7 text-gold-400" />

                  <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-ink-800/82">
                    {item.text}
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3.5 border-t border-sand-200 pt-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 font-display text-base font-bold text-ink-950">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.875rem] font-bold text-ink-900">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[0.75rem] text-ink-800/55">
                        {item.role}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- Partners */

function PartnersSection() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading
          eyebrow={t('testimonials.partnersTitle')}
          title={t('testimonials.partnersTitle')}
          subtitle={t('testimonials.partnersSubtitle')}
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {PARTNERS.map(({ id, type }) => (
            <RevealItem key={id}>
              <div className="group flex h-full flex-col items-center gap-4 rounded-card border border-dashed border-sand-300 bg-sand-50 p-7 text-center transition-all duration-500 hover:border-gold-400 hover:bg-gold-100/40">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-gold-600 shadow-soft transition-transform duration-500 group-hover:-translate-y-1">
                  <HandHeart className="size-6" />
                </span>
                <span className="font-display text-[0.9375rem] font-bold text-ink-900">
                  {t(`testimonials.partnerTypes.${type}`)}
                </span>
                <span className="text-[0.75rem] text-ink-800/50">
                  {t('resources.comingSoon')}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-ink-800/70">
            {t('testimonials.partnersNote')}
          </p>
          <Button to="/contact" className="mt-6" icon={false}>
            <HandHeart className="size-4" />
            {t('testimonials.partnerCta')}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function Testimonials() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.testimonials.title'),
    description: t('meta.testimonials.description'),
    path: '/temoignages',
  })

  return (
    <>
      <PageHero
        eyebrow={t('testimonials.heroEyebrow')}
        title={t('testimonials.heroTitle')}
        text={t('testimonials.heroText')}
        icon={Quote}
        image="/images/banner.jpeg"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-gold-400/20 px-3.5 py-2 text-[0.75rem] font-bold text-gold-300 ring-1 ring-gold-400/30">
            <Star className="size-3.5" />
            {t('brand.devise')}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-[0.75rem] font-bold text-ink-100/80 ring-1 ring-white/15">
            <Sparkles className="size-3.5" />
            {t('brand.slogan')}
          </span>
        </div>
      </PageHero>

      <StatsStrip stats={t('testimonials.stats')} />
      <TestimonialsSection />
      <PartnersSection />

      <CTABanner />
    </>
  )
}