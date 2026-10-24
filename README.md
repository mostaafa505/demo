# UAE Non-Muslim Family Law — website (Phase 1)

Public website for **Ahmed El-Shawi Legal Consultancy**. Phase 1 covers the brand core (header, footer,
mobile action bar) and the home page, in Arabic (default, RTL) and English (LTR).

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · React Bits ·
lucide-react. Fonts are self-hosted with Fontsource: Reem Kufi + IBM Plex Sans Arabic (Arabic),
Cormorant Garamond + Manrope (English).

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
| Scroll reveals (`data-reveal="lines" / "fade" / "image" / "rule"`, `data-parallax`) | `src/motion/useReveal.ts` |
| Header, mega-menu, mobile menu, footer, action bar | `src/components/layout/` |
| Home sections | `src/sections/` |
| React Bits components (CountUp, Magnet, ShinyText, SpotlightCard) | `src/components/reactbits/` |
| Placeholder photos | `src/assets/images/` — see [IMAGES.md](IMAGES.md) |
| Reference designs from the client | `references/` |

Routes: `/` (Arabic) and `/en` (English). Every other path renders a "page in preparation" placeholder in
the right language, so navigation links already work.

## Motion

One loop drives everything: Lenis runs on `gsap.ticker` and feeds `ScrollTrigger.update`. Arabic text is
only ever split by words or lines, never by characters. With `prefers-reduced-motion`, Lenis stops
smoothing and every reveal becomes a short fade. Skills used: `.claude/skills/frontend-design`,
`.claude/skills/web-motion`.

## Placeholders to review with the client

- All photography (low-resolution crops of the references) — see IMAGES.md.
- Phone numbers, email (`info@uaefamilylaw.ae`), address, TRN and social links in `src/config/site.ts`.
- Testimonials (initials, cities, quotes) and statistics (+15 years, +3,500 consultations, 98%, +1,200 cases).
- FAQ answers — drafted for layout, need legal review.
- Lawyer bios and the knowledge-centre articles.
- The booking form submits to a mock (no backend yet); the client portal is marked "coming soon".
