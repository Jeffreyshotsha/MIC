/**
 * Static, language-independent site data.
 * Every label lives in src/i18n/{fr,en}.js — this file only holds structure,
 * routes, image paths and non-linguistic values (dates, slugs, keys).
 */

import * as Icons from '../components/Icons.jsx'

export const SITE_URL = 'https://mic-rdc.org'

export const ROUTES = [
  { path: '/', key: 'home', icon: Icons.Compass },
  { path: '/a-propos', key: 'about', icon: Icons.Shield },
  { path: '/nos-actions', key: 'actions', icon: Icons.Target },
  { path: '/rejoindre', key: 'join', icon: Icons.HandHeart },
  { path: '/actualites', key: 'news', icon: Icons.BookOpen },
  { path: '/ressources', key: 'resources', icon: Icons.Folder },
  { path: '/temoignages', key: 'testimonials', icon: Icons.Quote },
  { path: '/contact', key: 'contact', icon: Icons.Mail },
  { path: '/espace-membre', key: 'member', icon: Icons.User },
]

/** Footer “take action” column (subset of routes). */
export const FOOTER_ACTION_ROUTES = ['join', 'actions', 'news', 'member']

export const SOCIALS = [
  { key: 'facebook', label: 'Facebook', href: 'https://facebook.com/mic-rdc', Icon: Icons.Facebook },
  { key: 'x', label: 'X', href: 'https://x.com/mic_rdc', Icon: Icons.XIcon },
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/mic_rdc', Icon: Icons.Instagram },
  { key: 'youtube', label: 'YouTube', href: 'https://youtube.com/@mic-rdc', Icon: Icons.Youtube },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/mic-rdc', Icon: Icons.Linkedin },
  { key: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/243000000000', Icon: Icons.Whatsapp },
  { key: 'telegram', label: 'Telegram', href: 'https://t.me/mic_rdc', Icon: Icons.Telegram },
  { key: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@mic_rdc', Icon: Icons.Tiktok },
]

export const CONTACT = {
  email: 'contact@mic-rdc.org',
  phone: '+243 000 000 000',
  whatsapp: 'https://wa.me/243000000000',
}

/**
 * National office — `key` maps to `about.team.<key>.role` in the dictionaries.
 * Replace `/images/team/*.jpeg` files with higher-resolution portraits when available.
 */
export const TEAM = [
  { key: 'babeth', name: 'Babeth Tshibola Kapeta', image: '/images/team/babeth-tshibola-kapeta.jpeg', primary: true },
  { key: 'jose', name: 'Jose Mutima Vela', image: '/images/team/jose-mutima-vela.jpeg' },
  { key: 'diane', name: 'Diane Tshibola Madiya', image: '/images/team/diane-tshibola-madiya.jpeg' },
  { key: 'marc', name: 'Marc Mukuna Buja', image: '/images/team/marc-mukuna-buja.jpeg' },
  { key: 'franky', name: 'Francky Tshimbalanga Tshimbalanga', image: '/images/team/franky-tshimbalanga.jpeg' },
  { key: 'walter', name: 'Walter Mulumba Nyengele', image: '/images/team/walter-mulumba-nyengele.jpeg' },
  { key: 'djifferdin', name: 'Djifferdin Masudi Mendes', image: '/images/team/djifferdin-masudi-mendes.jpeg' },
]

/** Domain → icon key used in `DOMAIN_ICONS`. */
export const DOMAIN_KEYS = [
  'education',
  'mindset',
  'antivaleurs',
  'youth',
  'women',
  'community',
  'dialogue',
  'environment',
]

/** Value → icon key used in `VALUE_ICONS`. */
export const VALUE_KEYS = [
  'action',
  'discipline',
  'change',
  'integrity',
  'patriotism',
  'responsibility',
  'solidarity',
  'exemplarity',
]

/** Article metadata (dates / reading time) keyed by dictionary id. */
export const ARTICLE_META = {
  a1: { date: '2026-09-14', readTime: 6 },
  a2: { date: '2026-09-02', readTime: 4 },
  a3: { date: '2026-08-21', readTime: 5 },
  a4: { date: '2026-08-05', readTime: 5 },
  a5: { date: '2026-07-19', readTime: 4 },
  a6: { date: '2026-07-01', readTime: 6 },
}

export const ARTICLE_IDS = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6']

export const ARTICLE_CATEGORIES = ['all', 'analysis', 'impact', 'values', 'youth']

export const PUBLICATION_IDS = ['p1', 'p2', 'p3', 'p4']

export const TESTIMONIAL_IDS = ['t1', 't2', 't3', 't4', 't5', 't6']

export const BENEFIT_IDS = [
  'documents',
  'activities',
  'forum',
  'notifications',
  'card',
  'impact',
]

/**
 * Partner slots — replace `placeholder` with real organisations and
 * drop an SVG logo into /public/images/partners/<id>.svg
 */
export const PARTNERS = [
  { id: 'institution', type: 'institution' },
  { id: 'academic', type: 'academic' },
  { id: 'religious', type: 'religious' },
  { id: 'media', type: 'media' },
  { id: 'private', type: 'private' },
  { id: 'civil', type: 'civil' },
]

/**
 * Events — `date` values are placeholders; replace with confirmed dates.
 */
export const EVENTS = [
  { id: 'e1', date: '2026-11-14', status: 'upcoming' },
  { id: 'e2', date: '2026-11-28', status: 'upcoming' },
  { id: 'e3', date: '2026-12-12', status: 'upcoming' },
  { id: 'e4', date: '2026-12-19', status: 'upcoming' },
]