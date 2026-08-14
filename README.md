# Pixel Studio — Wedding Photography Website

A premium, cinematic wedding photography website for **Pixel Studio** (Jaora, Ratlam, M.P.), built with React, Vite, Tailwind CSS and Framer Motion. Fully frontend — no backend, everything runs on mock data/services.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first theme, see `src/index.css`)
- React Router DOM (client-side routing)
- Framer Motion (scroll reveals, page transitions, hero/nav animation)
- Lucide React (icons)
- Plain JavaScript — no TypeScript, no backend, no database

## Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, about preview, services, featured work, stats, testimonials, FAQ preview, final CTA |
| `/portfolio` | Portfolio — filterable masonry gallery with lightbox |
| `/wedding-films` | Wedding Films — video gallery |
| `/packages` | Wedding & pre-wedding packages/pricing, add-ons, FAQ |
| `/about` | About the studio, philosophy, stats |
| `/contact` | Booking/enquiry form ("Check Your Wedding Date") |
| `/login` | Mock login + forgot-password modal |
| `/register` | Mock registration |
| `/account` | Example **protected route** (requires mock login) |
| `*` | 404 |

## Project Structure

```
src/
├── assets/          # logo files + the 8 provided photographs
├── components/      # Navbar, Footer, Lightbox, PackageCard, FAQAccordion, etc.
├── context/          # AuthContext (mock session state)
├── hooks/            # useAuth, useScrollPosition, useCountUp
├── layouts/          # MainLayout (navbar/footer/page-transition wrapper)
├── mock/             # mock "database" — packages, portfolio, videos, testimonials, faqs, users
├── pages/            # one file per route
└── services/         # the mock API layer pages/components actually call
```

## Mock API Layer — Important

**There is no backend.** Every "API call" in this project is a function in `src/services/*` that reads from
`src/mock/*` (optionally with a small artificial delay). This was deliberate, per the brief, so the architecture is
ready to swap for real endpoints later:

- `authService.js` → replace with real signup/login/JWT endpoints. Currently stores users **in plain text in
  localStorage** — fine for a demo, **not safe for production**.
- `bookingService.js` → replace with a real backend or a form provider (Formspree, EmailJS, etc.) — right now
  submissions are only logged to the console and localStorage, no email is sent.
- `portfolioService.js`, `videoService.js`, `packageService.js`, `testimonialService.js`, `faqService.js` → swap the
  mock data source for a real CMS/API call; the function signatures can stay the same.

## Where To Replace Things

| What | Where |
|---|---|
| Logo | `src/assets/logo/` (`icon-mark.png` for the navbar, `full-lockup-transparent.png` for the footer) |
| Photos | `src/assets/photos/` + `src/mock/portfolio.js` (add an entry per new photo) |
| Wedding films | Drop `.mp4` files in `src/assets/videos/`, then set `src` (and swap `thumbnail`) per entry in `src/mock/videos.js`. No video files were included in the original upload, so the Wedding Films page currently shows a "coming soon" state until real files are added. |
| Package pricing | `src/mock/packages.js` — this already reflects Pixel Studio's real quotation sheets |
| Testimonials | `src/mock/testimonials.js` — currently placeholder quotes, swap for real client reviews |
| FAQs | `src/mock/faqs.js` |
| Contact info / phone / address | `src/components/Footer.jsx`, `src/pages/Contact.jsx`, `src/components/FloatingActions.jsx` (WhatsApp number) |
| Colors / fonts | `src/index.css` → the `@theme` block (Tailwind v4 CSS-first config) |

## Design System

- **Typography**: Cormorant Garamond (display/serif, matching the studio's wordmark) + Manrope (body/UI).
- **Palette**: near-black ink background with an antique-gold accent, pulled from the studio's own gold-on-charcoal
  quotation sheets, plus a small "facet" chip palette sampled directly from the eight triangles in the Pixel Studio
  logo mark (`src/components/FacetMark.jsx` — used as the site's recurring signature motif in dividers, the loading
  screen, and the final CTA).

## Known Limitations (by design, for this demo)

- Authentication is **mock only** — no server, no hashing, no real sessions.
- The booking form does not send real emails.
- Three video files were referenced in the original brief but not included in the source upload — the Wedding Films
  page is fully built and ready, just waiting on real `.mp4` files.
