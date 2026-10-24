---
name: web-motion
description: Motion and scroll toolkit for this site — GSAP (+ ScrollTrigger, SplitText, Flip), Lenis smooth scroll, and React Bits animated components. Use when adding animation, scroll-driven effects, smooth scrolling, text reveals, animated backgrounds, or interactive micro-interactions to the website. Pair with the frontend-design skill, which decides *whether* a moment deserves motion; this skill covers *how* to build it.
---

# Web Motion: GSAP + Lenis + React Bits

Three libraries, each with one job:

| Library | Job | Source |
| --- | --- | --- |
| **GSAP** | Timelines, tweens, scroll-driven animation (ScrollTrigger), text splitting (SplitText), layout transitions (Flip) | https://github.com/greensock/GSAP |
| **Lenis** | Smooth, inertial page scroll that stays in sync with GSAP | https://github.com/darkroomengineering/lenis |
| **React Bits** | Ready-made animated React components and backgrounds (text effects, cursors, galleries, shader backgrounds) | https://github.com/DavidHDev/react-bits |

Full upstream docs are in `references/` (`gsap-readme.md`, `lenis-readme.md`). Read the Lenis one for the complete settings, methods and events tables.

## Ground rules (from frontend-design)

- **One orchestrated moment beats scattered effects.** Pick the single place motion earns attention (usually the hero load or one scroll reveal). Do not fade-and-slide-up every section or add hover motion to every card.
- **Motion that answers a user's action is welcome** (open, expand, confirm, drag).
- **Respect `prefers-reduced-motion`.** Lenis does this by default (`respectReducedMotion: true`). For GSAP, wrap animations in `gsap.matchMedia()` (example below).
- Don't stack effects: a React Bits background + a SplitText headline + a cursor effect on the same screen is too much. Choose one.

## Installation

### Plain HTML (no build step)

```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.27/dist/lenis.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.27/dist/lenis.min.js"></script>
```

### npm (React / Next.js / Vite)

```bash
npm i gsap @gsap/react lenis
```

GSAP is 100% free including all former bonus plugins (SplitText, MorphSVG, ScrollSmoother, etc.), even for commercial use.

## Lenis + GSAP ScrollTrigger: the canonical setup

Always drive Lenis from GSAP's ticker when both are present, so there is one animation loop:

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ anchors: true })   // anchors: smooth-scroll in-page links

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000)) // GSAP time is seconds, Lenis wants ms
gsap.ticker.lagSmoothing(0)
```

Without GSAP, use `new Lenis({ autoRaf: true })` instead. Never use both `autoRaf` and the ticker.

Useful Lenis details:
- Scrollable modals / nested panels: add `data-lenis-prevent` to the element (or `allowNestedScroll: true`, slower).
- Programmatic scroll: `lenis.scrollTo('#section', { offset: -80 })`; pause with `lenis.stop()` / `lenis.start()` (e.g. when a menu is open).
- Always include `lenis.css`.

## GSAP patterns

### Reduced-motion-safe, responsive animations

```js
const mm = gsap.matchMedia()

mm.add({
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 768px)',
}, (ctx) => {
  const { motion, desktop } = ctx.conditions
  if (!motion) return            // reduced motion: leave elements in their final state

  gsap.from('.hero-title', { yPercent: 100, duration: 1, ease: 'power4.out' })
  if (desktop) {
    gsap.to('.hero-media', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    })
  }
})
```

### A single orchestrated page-load sequence

```js
const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
tl.from('.site-header', { autoAlpha: 0, y: -20 })
  .from('.hero-title', { yPercent: 110 }, '-=0.4')
  .from('.hero-cta', { autoAlpha: 0 }, '-=0.3')
```

### Text reveal with SplitText

```js
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(SplitText)

SplitText.create('.hero-title', {
  type: 'lines,words',
  mask: 'lines',
  autoSplit: true,                 // re-split on resize / font load
  onSplit: (self) => gsap.from(self.words, { yPercent: 100, stagger: 0.04, duration: 0.8, ease: 'power4.out' }),
})
```

For Arabic / RTL text, split by `lines` or `words` only — never `chars`, which breaks letter joining.

### React: use `useGSAP`, not `useEffect`

```jsx
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)

export function Hero() {
  const root = useRef(null)
  useGSAP(() => {
    gsap.from('.hero-title', { yPercent: 100, duration: 1 })  // selectors scoped to root
  }, { scope: root })
  return <section ref={root}>…</section>
}
```

`useGSAP` reverts animations and ScrollTriggers on unmount automatically.

### React: Lenis

```jsx
import { ReactLenis } from 'lenis/react'
// Wrap the app; for GSAP sync, pass autoRaf: false and drive lenis.raf from gsap.ticker (see lenis/react README).
<ReactLenis root options={{ anchors: true }}>{children}</ReactLenis>
```

## React Bits

215+ animated components in 5 categories: Text Animations, Animations (cursor/hover/borders), Components (cards, nav, carousels, galleries), Micro (buttons, toggles), Backgrounds (gradients, particles, shaders). Browse at https://reactbits.dev — every component has a live demo with controls.

Each component ships in four flavors; the suffix picks it: `JS`/`TS` + `CSS`/`TW` (Tailwind).

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
# or
npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW
```

To let the agent discover components through the shadcn MCP server, add to `components.json`:

```json
{ "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
```

Then `npx shadcn@latest mcp init --client claude`.

Notes:
- Components are copied into the project as source — edit them freely to match the site's tokens (colors, fonts, timing). Don't ship a component with its demo defaults.
- Many depend on GSAP, Motion, or three.js/OGL; the CLI installs those. Shader backgrounds are heavy: lazy-load them and give a static fallback for reduced motion and low-power devices.
- React Bits is React-only (official ports exist for Vue and Svelte). For a plain HTML site, build the effect with GSAP directly instead.
- License: MIT + Commons Clause — free for personal and commercial use in a site; you may not resell the components themselves.

## Quality checklist

- [ ] Only one "headline" motion moment per page
- [ ] Works with `prefers-reduced-motion: reduce` (content visible, no scrubbed parallax)
- [ ] No layout shift: animate `transform`/`opacity` (`x`, `y`, `yPercent`, `scale`, `autoAlpha`), not `top`/`width`/`margin`
- [ ] ScrollTriggers refresh after images/fonts load (`ScrollTrigger.refresh()` if layout changes)
- [ ] Lenis driven by exactly one loop; `lenis.css` included; modals use `data-lenis-prevent`
- [ ] Tested on mobile (touch scroll feels native) and with RTL if the page is Arabic
