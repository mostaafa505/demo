# Images

Every photo on the site is currently a **low-resolution placeholder cropped from the reference designs**
(`references/`, via `scripts/crop-references.py`). Replace each file in `src/assets/images/` with the
client's real photograph, **keeping the same file name**, and the site picks it up automatically.

Export as WebP (quality ~80). Sizes below are the minimum for sharp results on retina screens.

| File | Used in | Aspect | Minimum size | What to shoot |
|---|---|---|---|---|
| `hero-family-skyline.webp` | Hero background (desktop & tablet) | 16:9 | 2880 × 1620 | Golden-hour family facing the Dubai/Abu Dhabi skyline. Keep the subject on one side — the headline sits on the other. In English the photo is mirrored. |
| `hero-scales-desk.webp` | Hero background (phones) | 4:5 | 1200 × 1500 | Warm desk detail: scales, legal books, skyline behind. |
| `service-civil-marriage.webp` | Services | 5:6 | 1200 × 1440 | Rings, signing a marriage contract. |
| `service-divorce.webp` | Services | 5:6 | 1200 × 1440 | Calm, non-dramatic separation imagery (two chairs, documents). |
| `service-children-custody.webp` | Services | 5:6 | 1200 × 1440 | Parent and child, warm light. |
| `service-maintenance.webp` | Services | 5:6 | 1200 × 1440 | Financial documents, calculator, coins — understated. |
| `service-inheritance.webp` | Services | 5:6 | 1200 × 1440 | Family home, keys, estate documents. |
| `service-wills.webp` | Services | 5:6 | 1200 × 1440 | Fountain pen on a will. |
| `service-international.webp` | Services, mega-menu | 5:6 | 1200 × 1440 | Passports, globe, airport at dusk. |
| `service-emirates.webp` | Services | 5:6 | 1200 × 1440 | UAE skyline. |
| `city-abu-dhabi.webp` | Emirates (wide card) | 16:15 | 1600 × 1500 | Sheikh Zayed Grand Mosque / Corniche at golden hour. |
| `city-dubai.webp` | Emirates | 3:5 | 900 × 1500 | Burj Khalifa / Downtown. |
| `city-sharjah.webp` | Emirates | 3:5 | 900 × 1500 | Sharjah waterfront / Al Noor Mosque. |
| `lawyer-ahmed-el-shawi.webp` | Lawyers (featured) | 4:5 | 1200 × 1500 | Professional portrait, neutral warm background, head and shoulders. |
| `lawyer-sara-mahmoud.webp` | Lawyers | 4:5 | 900 × 1125 | Same lighting and background as the others. |
| `lawyer-karim-el-awady.webp` | Lawyers | 4:5 | 900 × 1125 | Same lighting and background as the others. |
| `knowledge-article.webp` | Knowledge (article card) | 4:3 | 1200 × 900 | Article cover. |
| `knowledge-podcast.webp` | Knowledge (podcast card) | 4:3 | 1200 × 900 | Podcast cover / microphone. |
| `knowledge-video.webp` | *(unused — has a baked-in play button)* | — | — | Video thumbnails should be clean frames; the site adds its own play button. |
| `skyline-abu-dhabi-dusk.webp` | "Why us" background, video card placeholder | 16:5 | 2880 × 900 | Abu Dhabi skyline at dusk. |
| `footer-skyline.webp` | Footer horizon | 5:1 | 2880 × 580 | Night skyline with warm lights (an illustration also works). |
| `cta-skyline.webp` | Booking section background | 3:1 | 1800 × 600 | Skyline at dusk. |
| `testimonial-pen.webp`, `knowledge-gavel-books.webp` | *(spare)* | — | — | — |

Portraits are shown in warm monochrome and turn to colour on hover, so consistent lighting matters more
than colour grading.

`public/og-image.webp` is the social-sharing image (1200 × 630 recommended).
