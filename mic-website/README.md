# MIC — Mouvement Imposons le Changement

Site vitrine bilingue (français / anglais) du Mouvement Imposons le Changement,
mouvement citoyen et social non partisan fondé en RDC le 26 septembre 2023.

## Stack

- Vite 8 + React 19
- Tailwind CSS 4 (`@tailwindcss/vite`, configuration CSS dans `src/index.css`)
- Motion (animations d'entrée, respect de `prefers-reduced-motion`)
- React Router 7 (routage + scroll restoration)
- Oxlint

## Scripts

```bash
npm run dev      # serveur de développement (port 5173)
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
npm run lint     # oxlint
```

## Structure

```
src/
  components/
    Icons.jsx        icônes SVG (aucune dépendance externe)
    layout/          Navbar, Footer, Layout, BackToTop
    sections/        Team, Blocks (piliers/domaines/CTA), Gallery
    ui/              Button, Section/Reveal, Field, Accordion, Modal, Effects
  data/site.js       données non-linguistiques : routes, équipe, dates, socials
  i18n/              moteur i18n + dictionnaires fr.js / en.js
  lib/               seo.js (métadonnées + JSON-LD), submitForm.js, motion.js, utils.js
  pages/             une page par route + NotFound
```

Les textes vivent uniquement dans `src/i18n/fr.js` et `src/i18n/en.js`.
`src/data/site.js` ne contient que la structure (clés, chemins d'images, dates).

## Configuration à remplacer avant mise en ligne

Ces valeurs sont des **placeholders** et doivent être confirmées :

| Quoi | Où |
| --- | --- |
| Domaine canonique `https://mic-rdc.org` | `src/data/site.js` (`SITE_URL`), `index.html`, `public/sitemap.xml`, `public/robots.txt` |
| E-mail, téléphone, WhatsApp | `src/data/site.js` (`CONTACT`) |
| Liens réseaux sociaux | `src/data/site.js` (`SOCIALS`) |
| Adresses du siège et des structures | `src/i18n/fr.js` / `en.js` → `contact.offices`, `footer.address` |
| Dates des événements | `src/data/site.js` (`EVENTS`) |
| Dates et durées de lecture des articles | `src/data/site.js` (`ARTICLE_META`) |
| Textes des témoignages (anonymes, illustratifs) | `src/i18n/fr.js` / `en.js` → `testimonials.items` |
| Logos et noms des partenaires (emplacements vides) | `src/data/site.js` (`PARTNERS`) |
| Liens de téléchargement des publications | `src/pages/Resources.jsx` (bloc `Publications`) |
| Portraits de l'équipe (basse résolution) | `public/images/team/*.jpeg` |

## Formulaires

Sans configuration, les formulaires (adhésion, contact, bénévolat, newsletter)
fonctionnent en **mode démo** : validation côté client puis message de succès.

Pour envoyer réellement les données, créer un `.env` :

```
VITE_FORM_ENDPOINT=https://votre-api.example.com/forms
VITE_FORM_PROVIDER=web3forms   # web3forms | formspree | custom
```

Voir `src/lib/submitForm.js` pour le comportement exact.

## Dons

La section « Donner » enregistre une **intention de don** : aucun paiement n'est
effectué et aucune donnée bancaire n'est collectée. Le branchement d'un
prestataire (Mobile Money, carte, etc.) reste à faire.

## Espace membre

`/espace-membre` est une démonstration d'interface : aucune authentification
réelle, aucun compte créé, aucun document privé exposé. Le forum affiché est
statique.

## Langues

La langue est détectée depuis le navigateur puis mémorisée dans
`localStorage` (`mic.lang`). Elle pilote `<html lang>`, les dictionnaires et les
métadonnées Open Graph.