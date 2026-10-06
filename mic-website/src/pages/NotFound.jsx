import { useI18n } from '../i18n/index.jsx'
import { useSEO } from '../lib/seo.js'
import { Reveal } from '../components/ui/Section.jsx'
import { Button } from '../components/ui/Button.jsx'
import { ROUTES } from '../data/site.js'
import { Compass, Home, MapPin } from '../components/Icons.jsx'

export default function NotFound() {
  const { t } = useI18n()

  useSEO({
    title: t('notFound.title'),
    description: t('notFound.text'),
    path: '/404',
  })

  const quickLinks = ROUTES.filter((route) => route.path !== '/')

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 py-20 md:py-28">
      <div className="bg-grain absolute inset-0" />
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 size-96 rounded-full bg-crimson-500/10 blur-3xl" />

      <div className="container-mic relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-2 text-[0.6875rem] font-bold tracking-[0.18em] text-gold-300 uppercase ring-1 ring-gold-400/25">
            <MapPin className="size-3.5" />
            {t('notFound.code')}
          </span>

          <p className="mt-8 font-display text-[clamp(5rem,16vw,11rem)] leading-none font-bold text-gold-400/90">
            404
          </p>

          <h1 className="mt-4 text-balance font-display text-2xl leading-tight font-bold text-white md:text-4xl">
            {t('notFound.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[0.975rem] leading-relaxed text-ink-100/70">
            {t('notFound.text')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg" icon={false}>
              <Home className="size-4" />
              {t('nav.home')}
            </Button>
            <Button to="/contact" variant="outlineLight" size="lg">
              {t('nav.contact')}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-16 max-w-4xl">
          <p className="flex items-center justify-center gap-2 text-[0.6875rem] font-bold tracking-[0.16em] text-ink-100/40 uppercase">
            <Compass className="size-3.5" />
            {t('notFound.linksTitle')}
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {quickLinks.map((route) => (
              <li key={route.path}>
                <Button to={route.path} variant="ghost" size="sm" className="text-ink-100/70 hover:bg-white/10 hover:text-white">
                  {t(`nav.${route.key}`)}
                </Button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}