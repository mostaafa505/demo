# UAE Non-Muslim Family Law — website (Phase 1)

Public website for **Ahmed El-Shawi Legal Consultancy**. Phase 1 covers the brand core (header, footer,
mobile action bar) and the home page, in Arabic (default, RTL) and English (LTR).

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · React Bits ·
lucide-react. Fonts are self-hosted with Fontsource: Noto Kufi Arabic + IBM Plex Sans Arabic (Arabic),
Cormorant Garamond + Manrope (English).

The layout follows the client's reference designs (`references/`, `references/client/` — including
`UAE Family Law - Header Footer Home (pages 4-8).pdf`) section by section.

```bash
npm install
npm run dev       # local development
npm run build     # type-check, client build, then pre-render / and /en to static HTML (scripts/prerender.mjs)
npm run preview   # serve the production build
```

Vercel builds it with the settings in `vercel.json` (Vite, `dist/`, SPA rewrites).

## Where things live

| What | Where |
|---|---|
| All copy (Arabic / English) | `src/content/ar.ts`, `src/content/en.ts` (shape in `types.ts`) |
| Phones, email, address, hours, socials, TRN | `src/config/site.ts` |
| Design tokens (colours, type scale, radii) | `src/styles/index.css` (`@theme`) |
| Smooth scroll + GSAP setup | `src/motion/` |
| Motion tokens (eases, durations, breakpoints) | `src/motion/tokens.ts` |
| Scroll animations declared in markup (`data-anim="section-head" / "title" / "fade-up" / "stagger" / "img-reveal" / "line" / "counter"`) | `src/motion/useAnim.ts` |
| RTL-safe line splitting for heading reveals | `src/motion/splitLines.ts` |
| Header, mega-menu, mobile menu, footer, action bar | `src/components/layout/` |
| Home sections | `src/sections/` |
| React Bits components (Magnet on the hero CTA, SpotlightCard on quick tools) | `src/components/reactbits/` |
| Shared pieces: section title + ornament, legend panel, medallion, arch outline, counter | `src/components/ui/` |
| Photos and logos (generated from `references/client/`) | `src/assets/` — see [IMAGES.md](IMAGES.md) |
| Reference designs from the client | `references/` |

Routes: `/` (Arabic) and `/en` (English). Every other path renders a "page in preparation" placeholder in
the right language, so navigation links already work.

## Motion

- One loop: Lenis (`duration: 1.1`) runs on `gsap.ticker` and feeds `ScrollTrigger.update`.
- Start states live in CSS under `html.js-anim` and only when motion is welcome; an inline script in
  `index.html` adds the class before first paint and removes it if the app has not started within 4s,
  so content is never left hidden.
- Every entrance: `power3.out`, 0.9s, 0.08s stagger, rises 32px (18px on phones, 20% faster), starts at
  `top 85%`, plays once. Long travels use `power2.inOut`. Lines and wipes run from the reading start
  (right in Arabic).
- Headings are split by words grouped into lines (`splitLines.ts`) — never by characters, so Arabic stays
  joined. GSAP's SplitText is not used: its line detection assumes left-to-right text.
- `prefers-reduced-motion`: nothing is hidden and nothing moves; counters show their final value.
- Opening intro (`src/components/brand/Intro.tsx`): once per visit (sessionStorage), never with reduced
  motion; any click, scroll, touch or key ends it. The column is built from its base, the name is
  unmasked, one light passes over the column, then the lock-up flies into the header (GSAP Flip on
  desktop, crossfade on smaller screens where the header shows the three-line mobile logo) while the
  navy screen folds into the header bar. Layers live in `public/brand/intro/` — 3× (1680×453) versions of
  the client's `uae-logo-parts`, rebuilt from the original logo by `scripts/intro-parts.py`. Skipped if the
  layers are not loaded within 1.2s.

## Placeholders to review with the client

- Lawyer portraits (low-resolution crops of the references) — see IMAGES.md.
- Phone numbers, email (`info@uaefamilylaw.ae`), address, TRN and social links in `src/config/site.ts`.
- Testimonials (initials, cities, quotes) and statistics (+15 years, +3,500 consultations, 98%, +1,200 cases).
- FAQ answers — drafted for layout, need legal review.
- Lawyer bios and the knowledge-centre articles.
- The booking form submits to a mock (no backend yet); the client portal is marked "coming soon".
