import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LanguageProvider, useI18n } from './i18n/index.jsx'
import { Layout, ScrollToTop } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'

function RouteFallback() {
  const { t } = useI18n()
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-sand-50">
      <div className="flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-2 border-sand-300 border-t-gold-500" />
        <p className="text-[0.8125rem] font-medium text-ink-800/55">{t('common.loading')}</p>
      </div>
    </div>
  )
}

/** Wraps a page in <Suspense> so routes can be code-split. */
function page(loader) {
  const Page = lazy(loader)
  return function PageRoute() {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Page />
      </Suspense>
    )
  }
}

const About = page(() => import('./pages/About.jsx'))
const Actions = page(() => import('./pages/Actions.jsx'))
const Join = page(() => import('./pages/Join.jsx'))
const News = page(() => import('./pages/News.jsx'))
const Resources = page(() => import('./pages/Resources.jsx'))
const Testimonials = page(() => import('./pages/Testimonials.jsx'))
const Contact = page(() => import('./pages/Contact.jsx'))
const Member = page(() => import('./pages/Member.jsx'))
const NotFound = page(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="a-propos" element={<About />} />
            <Route path="nos-actions" element={<Actions />} />
            <Route path="rejoindre" element={<Join />} />
            <Route path="actualites" element={<News />} />
            <Route path="ressources" element={<Resources />} />
            <Route path="temoignages" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
            <Route path="espace-membre" element={<Member />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}