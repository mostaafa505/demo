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
npm run build     # type-check + production build into dist/
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
| Scroll reveals (`data-reveal="title" / "panel" / "fade"`, `data-reveal-group`) | `src/motion/useReveal.ts` |
| Header, mega-menu, mobile menu, footer, action bar | `src/components/layout/` |
| Home sections | `src/sections/` |
| React Bits components (Magnet on the hero CTA, SpotlightCard on quick tools) | `src/components/reactbits/` |
| Shared pieces: section title + ornament, legend panel, medallion, arch outline, counter | `src/components/ui/` |
| Photos and logos (generated from `references/client/`) | `src/assets/` — see [IMAGES.md](IMAGES.md) |
| Reference designs from the client | `references/` |

Routes: `/` (Arabic) and `/en` (English). Every other path renders a "page in preparation" placeholder in
the right language, so navigation links already work.

## Motion

One loop drives everything: Lenis runs on `gsap.ticker` and feeds `ScrollTrigger.update`. Motion is
deliberately quiet: one hero entrance (the arch outline draws, the photo rises inside it, the headline
follows by lines — Arabic is never split by characters), then short once-only reveals and counters.
With `prefers-reduced-motion`, Lenis stops smoothing and nothing animates. Skills used: `.claude/skills/frontend-design`,
`.claude/skills/web-motion`.

## Placeholders to review with the client

- Lawyer portraits (low-resolution crops of the references) — see IMAGES.md.
- Phone numbers, email (`info@uaefamilylaw.ae`), address, TRN and social links in `src/config/site.ts`.
- Testimonials (initials, cities, quotes) and statistics (+15 years, +3,500 consultations, 98%, +1,200 cases).
- FAQ answers — drafted for layout, need legal review.
- Lawyer bios and the knowledge-centre articles.
- The booking form submits to a mock (no backend yet); the client portal is marked "coming soon".
