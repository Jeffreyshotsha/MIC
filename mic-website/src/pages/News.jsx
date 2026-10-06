import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { PageHero, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { FilterTabs } from '../components/ui/Accordion.jsx'
import { Modal } from '../components/ui/Modal.jsx'
import { ShareBar } from '../components/sections/Gallery.jsx'
import { CTABanner } from '../components/sections/Blocks.jsx'
import { ARTICLE_CATEGORIES, ARTICLE_IDS, ARTICLE_META } from '../data/site.js'
import { formatDate } from '../lib/utils.js'
import {
  ArrowRight,
  BookOpen,
  Clock,
  MessageCircle,
  Quote,
  Sparkles,
  User,
} from '../components/Icons.jsx'

/* ------------------------------------------------------------ ArticleCard */

function ArticleCard({ id, article, featured = false }) {
  const { t, lang } = useI18n()
  const meta = ARTICLE_META[id]
  const [open, setOpen] = useState(false)

  const categoryLabel = t(`news.categories.${article.category}`)

  return (
    <>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`group card card-hover flex h-full cursor-pointer flex-col overflow-hidden ${
          featured ? 'lg:flex-row' : ''
        }`}
        onClick={() => setOpen(true)}
      >
        <div
          className={`relative overflow-hidden bg-ink-900 ${
            featured ? 'lg:w-1/2' : ''
          } aspect-16/10 lg:aspect-auto lg:min-h-56`}
        >
          {/* Decorative cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-950" />
          <div className="bg-grain absolute inset-0" />
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-gold-500/15 blur-2xl transition-transform duration-700 group-hover:scale-125" />

          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold-400/25">
              <BookOpen className="size-5.5" />
            </span>

            <div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.625rem] font-bold tracking-wider text-gold-300 uppercase ring-1 ring-white/15">
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        <div className={`flex flex-1 flex-col p-6 ${featured ? 'lg:w-1/2 lg:p-9' : ''}`}>
          <div className="flex items-center gap-4 text-[0.6875rem] font-medium text-ink-800/55">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3" />
              {t('news.readTime', meta?.readTime ?? 4)}
            </span>
            <span className="size-1 rounded-full bg-sand-300" />
            <time dateTime={meta?.date}>{formatDate(meta?.date, lang)}</time>
          </div>

          <h3
            className={`mt-3.5 font-display leading-snug font-bold text-ink-900 transition-colors duration-300 group-hover:text-ink-700 ${
              featured ? 'text-2xl md:text-3xl' : 'text-lg'
            }`}
          >
            {article.title}
          </h3>

          <p
            className={`mt-3 flex-1 leading-relaxed text-ink-800/72 ${
              featured ? 'text-[1rem]' : 'text-[0.875rem]'
            }`}
          >
            {article.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-900">
            <span className="transition-colors group-hover:text-gold-700">
              {t('common.readMore')}
            </span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-gold-700" />
          </span>
        </div>
      </motion.article>

      {/* Reader modal */}
      <Modal open={open} onClose={() => setOpen(false)} className="max-w-3xl" label={article.title}>
        <article className="p-7 md:p-11">
          <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-[0.625rem] font-bold tracking-wider text-gold-700 uppercase">
            {categoryLabel}
          </span>

          <h2 className="mt-5 text-balance font-display text-2xl leading-tight font-bold text-ink-900 md:text-4xl">
            {article.title}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-sand-200 pb-6 text-[0.75rem] font-medium text-ink-800/55">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {t('news.readTime', meta?.readTime ?? 4)}
            </span>
            <span className="size-1 rounded-full bg-sand-300" />
            <time dateTime={meta?.date}>{formatDate(meta?.date, lang)}</time>
          </div>

          <p className="mt-7 font-display text-lg leading-relaxed font-semibold text-ink-900 italic md:text-xl">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-col gap-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-[1rem] leading-[1.8] text-ink-800/85">
                {paragraph}
              </p>
            ))}
          </div>

          <ShareBar className="mt-9 border-t border-sand-200 pt-6" />
        </article>
      </Modal>
    </>
  )
}

/* ---------------------------------------------------------------- Sections */

function FeaturedSection() {
  const { t } = useI18n()
  const featured = t('news.articles.a1')

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <div className="container-mic">
        <Reveal className="mb-10 flex items-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full bg-gold-100 px-4 py-2 text-[0.6875rem] font-bold tracking-[0.16em] text-gold-700 uppercase">
            <Sparkles className="size-3.5" />
            {t('news.featuredLabel')}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-gold-300 to-transparent" />
        </Reveal>

        <Reveal>
          <ArticleCard id="a1" article={featured} featured />
        </Reveal>
      </div>
    </section>
  )
}

function ArticlesSection() {
  const { t } = useI18n()
  const articles = t('news.articles')
  const [filter, setFilter] = useState('all')

  const tabs = ARTICLE_CATEGORIES.map((key) => ({
    key,
    label: t(`news.categories.${key}`),
  }))

  const visible = useMemo(
    () =>
      ARTICLE_IDS.filter((id) => id !== 'a1').filter((id) => {
        if (filter === 'all') return true
        return articles[id].category === filter
      }),
    [filter, articles]
  )

  return (
    <section className="relative overflow-hidden bg-sand-50 py-20 md:py-28">
      <div className="container-mic">
        <SectionHeading title={t('news.allLabel')} />

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <FilterTabs options={tabs} value={filter} onChange={setFilter} className="justify-center" />
        </Reveal>

        {visible.length === 0 ? (
          <Reveal delay={0.2} className="mt-14 text-center">
            <p className="text-ink-800/60">{t('news.emptyState')}</p>
          </Reveal>
        ) : (
          <RevealGroup
            key={filter}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            gap={0.07}
          >
            {visible.map((id) => (
              <RevealItem key={id}>
                <ArticleCard id={id} article={articles[id]} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}

function InterviewsSection() {
  const { t } = useI18n()
  const interviews = t('news.interviews')

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-20 left-1/3 size-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-mic relative">
        <SectionHeading
          eyebrow={t('news.interviewsLabel')}
          title={t('news.interviewsTitle')}
          subtitle={t('news.interviewsSubtitle')}
          tone="dark"
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" gap={0.08}>
          {interviews.map((interview, index) => (
            <RevealItem key={interview.name}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-card border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/40 hover:bg-white/[0.07] md:p-9"
              >
                <Quote className="size-8 text-gold-400/50 transition-colors duration-500 group-hover:text-gold-400" />

                <p className="mt-5 font-display text-lg leading-snug font-bold text-gold-300 md:text-xl">
                  {interview.question}
                </p>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-100/72">
                  {interview.excerpt}
                </p>

                <div className="mt-7 flex items-center gap-3.5 border-t border-white/10 pt-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950">
                    <User className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[0.875rem] font-bold text-white">
                      {interview.name}
                    </span>
                    <span className="mt-0.5 block text-[0.75rem] text-gold-300/80">
                      {interview.role}
                    </span>
                  </span>
                </div>

                <span className="pointer-events-none absolute right-6 bottom-5 font-display text-6xl font-bold text-white/4">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Page */

export default function News() {
  const { t } = useI18n()

  useSEO({
    title: t('meta.news.title'),
    description: t('meta.news.description'),
    path: '/actualites',
  })

  return (
    <>
      <PageHero
        eyebrow={t('news.heroEyebrow')}
        title={t('news.heroTitle')}
        text={t('news.heroText')}
        icon={BookOpen}
        image="/images/banner.jpeg"
      />

      <FeaturedSection />
      <ArticlesSection />
      <InterviewsSection />

      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="container-mic">
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <MessageCircle className="size-8 text-gold-500" />
            <h2 className="max-w-xl text-balance font-display text-2xl font-bold text-ink-900 md:text-3xl">
              {t('news.newsletterTitle')}
            </h2>
            <p className="max-w-lg text-[0.9375rem] leading-relaxed text-ink-800/70">
              {t('news.newsletterText')}
            </p>
            <Button href="#newsletter" variant="dark" className="mt-2">
              {t('form.submitNewsletter')}
            </Button>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  )
}