# CyberHaxs — Portfolio Website

Premium, production-ready marketing site for **CyberHaxs**, a software
development / IT services company (web, mobile, ERP, CRM).

Built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion + Lucide React**.

---

## Quick start

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint      # ESLint
```

## Project structure

```
src/
  main.jsx                entry point (fonts + global styles)
  App.jsx                 shell: preloader → navbar → page → footer
  pages/
    Home.jsx              assembles all sections
  sections/               one file per page section
    Hero  Statement  About  Services  Work  WhyUs
    Technology  Process  Solutions  Stats  Testimonials
    BigCTA  Contact
  components/
    layout/               Navbar, MobileMenu, Footer, Preloader
    ui/                   Button, Reveal, TextReveal, SectionHeading,
                          Counter, Marquee, FormField, Logo
    visuals/              SVG/CSS generated UI mockups & decorative layers
  data/
    site.js               ⚠ ALL site content (replace placeholder data here)
    config.js             ⚠ site config: contact endpoint, socials, legal, nav
  lib/
    animation.js          shared Framer Motion variants & easing
    formStyles.js         contact form control class names
    utils.js              cn() helper
  hooks/
    index.js              reduced motion, scroll lock, media query, count-up
  styles/
    index.css             Tailwind v4 theme tokens + global styles
```

## ⚠ Placeholders you must replace before publishing

Nothing real about CyberHaxs was invented. The following are clearly marked
placeholders:

| What | Where |
|---|---|
| Projects / case studies | `src/data/site.js` → `projects` (`isPlaceholder: true`, `url: null`) |
| Statistics | `src/data/site.js` → `stats` (`value: null` renders `XX`) |
| Testimonials | `src/data/site.js` → `testimonials` |
| Contact endpoint | `src/data/config.js` → `contactEndpoint: null` |
| Business email | `src/data/config.js` → `contactEmail: null` |
| Social URLs | `src/data/config.js` → `socials` |
| Privacy / Terms links | `src/data/config.js` → `legal` |
| Canonical domain | `src/data/config.js` → `siteUrl` + `index.html` meta |

## Contact form integration

The form **never fakes a submission**.

1. Set `contactEndpoint` in `src/data/config.js` to your API
   (e.g. `/api/contact`, Formspree, Web3Forms…).
2. The form POSTs JSON:
   `{ name, email, phone, company, service, budget, message, source }`
3. Handle CORS on your endpoint.
4. Until an endpoint exists, valid submissions surface an honest error state
   (development mode explains exactly what to configure).

Validation, loading, error and success states are all implemented client-side.

## Design system

- **Type:** Space Grotesk (display) + Inter Variable (body), self-hosted
- **Palette:** deep navy `#070C22`, royal blue `#2563EB`, violet `#7C3AED`,
  cyan `#22D3EE` on off-white `#F5F7FC`
- **Motion:** one shared easing `cubic-bezier(0.16, 1, 0.3, 1)`; scroll
  reveals, masked text reveals, parallax, counters, marquees
- **Accessibility:** semantic landmarks, single H1, skip link, visible focus
  rings, keyboard-operable menu/slider/form, `prefers-reduced-motion`
  respected globally
- **Responsive:** tested at 375 / 768 / 1024 / 1440 / 1920 px with no
  horizontal overflow

## SEO

Title, description, canonical, Open Graph, Twitter card and Organization
JSON-LD live in `index.html`. Update the URL when your domain is final.
