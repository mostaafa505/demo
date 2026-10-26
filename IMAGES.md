# Images

Source files from the client live in `references/client/`. `scripts/process-assets.py` turns them into the
web assets in `src/assets/` (responsive WebP at several widths, plus the knocked-out logos):

```bash
python3 scripts/process-assets.py          # photos + logos + footer artwork
python3 scripts/process-assets.py --only=logos,footer,hero-desktop  # selected outputs
```

To replace a photo, drop the new file into `references/client/` under the same name and run the script.

## Client photography (in use)

| Source file | Output | Used in |
|---|---|---|
| `slide dektop.png` | `hero-desktop-*.webp` | Hero background on tablet/desktop (mirrored in English) |
| `slide mobil.png` | `hero-slide-*.webp` | Hero photo on phones |
| `الزواج المدني.jpg` | `service-civil-marriage-*.webp` | Services |
| `الطلاق و الانفصال.jpg` | `service-divorce-*.webp` | Services, prenup article card (mobile) |
| `الاطفال والحضانه.jpg` | `service-children-custody-*.webp` | Services |
| `النفقه و المسائل الماليه .jpg` | `service-maintenance-*.webp` | Services, podcast card (mobile) |
| `الميراث.jpg` | `service-inheritance-*.webp` | Services, video card (mobile) |
| `الوصايا.jpg` | `service-wills-*.webp` | Services |
| `الفضايه لادوليه.jpg` | `service-international-*.webp` | Services, mega-menu |
| `صوره مركز المعرفه.jpg` | `knowledge-gavel-*.webp` | Knowledge centre (desktop) |
| `about/Cinematic Executive Portrait in Warm Office.png` | `about-founder-*.webp` | About: our story (founder) |
| `about/Luxurious Conference Room with Skyline Views.png` | `about-approach-*.webp` | About: our approach |
| `about/Corporate Skyline Collaboration and Signing.png` | `about-team-1..3-*.webp` (three panels cut out) | About: team |
| `contact/Gemini_Generated_Image_7tdemg7tdemg7tde.jpg` | `contact-meeting-*.webp` | Contact: hero and "ready to help" card |
| `contact/Gemini_Generated_Image_pcrd02pcrd02pcrd.jpg` | `contact-scales-*.webp` | Contact: beside the message form |
| `الامارات والمدن.jpg` | `service-emirates-*.webp` | Services, booking band background |
| `ابو ظبي.jpg`, `دبي.jpg`, `الشارقه.jpg` | `city-*.webp` | Emirates & cities |
| `fotter dektob.png` | `footer-art-*.webp` | Desktop footer background (baked-in logo removed; the real logo is set in code) |
| `logo desktop.png` | `brand/logo-desktop-light.webp` (ivory lettering), `brand/logo-desktop-dark.webp` | Desktop header, footer |
| `LOGO MOBIL.png` | `brand/logo-mobile-light.webp` | Mobile header, mobile menu, mobile footer |

## Still placeholders (low resolution, cropped from the reference designs)

| File | Used in | Needed |
|---|---|---|
| `lawyer-ahmed-el-shawi.webp` | Lawyers | Portrait, 4:5, at least 800 × 1000, head and shoulders, plain warm background |
| `lawyer-sara-mahmoud.webp` | Lawyers | Same lighting and background as the others |
| `lawyer-karim-el-awady.webp` | Lawyers | Same lighting and background as the others |

Regenerate the portraits with `python3 scripts/crop-references.py`, or replace the files with real photos of the same name.
`public/og-image.webp` (social sharing, 1200 × 630) should also be replaced.
