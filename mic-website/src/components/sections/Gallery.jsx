import { useState } from 'react'
import { motion } from 'motion/react'
import { useI18n } from '../../i18n/index.jsx'
import { Reveal, SectionHeading } from '../ui/Section.jsx'
import { Modal } from '../ui/Modal.jsx'
import { Expand } from '../Icons.jsx'

export function Gallery({ tone = 'light' }) {
  const { t } = useI18n()
  const [active, setActive] = useState(null)
  const items = t('actions.gallery')
  const dark = tone === 'dark'

  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${dark ? 'bg-ink-950' : 'bg-white'}`}>
      {dark && <div className="bg-grain absolute inset-0" />}
      <div className="container-mic relative">
        <SectionHeading
          eyebrow={t('actions.galleryEyebrow')}
          title={t('actions.galleryTitle')}
          subtitle={t('actions.gallerySubtitle')}
          tone={dark ? 'dark' : 'light'}
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (index % 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl ${
                item.tall ? 'row-span-2' : ''
              } ${dark ? 'bg-white/5' : 'bg-sand-100'}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-[0.8125rem] font-semibold text-white">
                  {item.caption}
                </span>
              </span>
              <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/85 text-ink-900 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} className="max-w-4xl">
        {active !== null && (
          <figure>
            <img
              src={items[active].src}
              alt={items[active].caption}
              className="max-h-[70vh] w-full bg-ink-950 object-contain"
            />
            <figcaption className="px-6 py-5 text-center text-[0.9375rem] font-medium text-ink-800">
              {items[active].caption}
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  )
}

/* ------------------------------------------------------------ ShareBar */

const SHARE_KEYS = ['facebook', 'x', 'linkedin', 'whatsapp', 'telegram']

export function ShareBar({ className }) {
  const { t, lang } = useI18n()

  const share = (network) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://x.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${title}`,
    }
    window.open(targets[network], '_blank', 'noopener,noreferrer,width=640,height=560')
  }

  return (
    <div className={className}>
      <span className="text-[0.6875rem] font-bold tracking-[0.16em] text-ink-800/45 uppercase">
        {t('common.share')}
      </span>
      <div className="mt-3 flex flex-wrap gap-2">
        {SHARE_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => share(key)}
            title={t('common.shareOn', key)}
            className="rounded-full border border-sand-200 bg-white px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-wider text-ink-800/70 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:bg-ink-900 hover:text-white"
          >
            {key}
          </button>
        ))}
        <span className="sr-only">{lang}</span>
      </div>
    </div>
  )
}

/* --------------------------------------------------------- StatsStrip */

export function StatsStrip({ stats, tone = 'dark' }) {
  const { t } = useI18n()
  const dark = tone === 'dark'
  const items = stats ?? t('home.stats')

  return (
    <Reveal
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl ring-1 md:grid-cols-4 ${
        dark ? 'bg-white/10 ring-white/10' : 'bg-sand-200 ring-sand-200'
      }`}
      y={24}
    >
      {items.map((stat) => (
        <div
          key={stat.label}
          className={`px-5 py-7 text-center ${
            dark ? 'bg-ink-950/60' : 'bg-white'
          }`}
        >
          <div
            className={`font-display text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] leading-none font-bold ${
              dark ? 'text-gold-300' : 'text-ink-900'
            }`}
          >
            {stat.value}
          </div>
          <div
            className={`mt-2.5 text-[0.75rem] leading-snug font-medium ${
              dark ? 'text-ink-100/65' : 'text-ink-800/60'
            }`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </Reveal>
  )
}