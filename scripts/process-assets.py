"""Turn the client's source files (references/client) into web assets.

- Photos  -> responsive WebP (several widths) in src/assets/images/
- Logos   -> transparent WebP (light-on-dark and original) in src/assets/brand/
- Footer  -> skyline/horizon art strip

Run: python3 scripts/process-assets.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "references" / "client"
IMG = ROOT / "src" / "assets" / "images"
BRAND = ROOT / "src" / "assets" / "brand"
IMG.mkdir(parents=True, exist_ok=True)
BRAND.mkdir(parents=True, exist_ok=True)

PHOTOS = {
    # source file: (output name, widths, optional crop box as fractions l,t,r,b)
    "الزواج المدني.jpg": ("service-civil-marriage", (480, 800, 1200), None),
    "الطلاق و الانفصال.jpg": ("service-divorce", (480, 800, 1200), None),
    "الاطفال والحضانه.jpg": ("service-children-custody", (480, 800, 1200), None),
    "النفقه و المسائل الماليه .jpg": ("service-maintenance", (480, 800, 1200), None),
    "الميراث.jpg": ("service-inheritance", (480, 800, 1200), None),
    "الوصايا.jpg": ("service-wills", (480, 800, 1200), None),
    "الفضايه لادوليه.jpg": ("service-international", (480, 800, 1200), None),
    "الامارات والمدن.jpg": ("service-emirates", (480, 800, 1200, 2000), None),
    "ابو ظبي.jpg": ("city-abu-dhabi", (480, 800, 1200), None),
    "دبي.jpg": ("city-dubai", (480, 800, 1200), None),
    "الشارقه.jpg": ("city-sharjah", (480, 800, 1200), None),
    "slide mobil.png": ("hero-slide", (800, 1280, 1774), None),
}


def save_widths(img: Image.Image, name: str, widths, quality=78):
    for w in widths:
        w = min(w, img.width)
        h = round(img.height * w / img.width)
        out = img.resize((w, h), Image.LANCZOS) if w != img.width else img
        out.save(IMG / f"{name}-{w}.webp", "WEBP", quality=quality, method=6)
        print(f"{name}-{w}.webp", out.size)


def color_to_alpha(rgb: np.ndarray, bg: np.ndarray, lighter_only=False) -> np.ndarray:
    """GIMP-style colour-to-alpha: remove `bg` while keeping anti-aliased edges.

    lighter_only ignores pixels darker than the ground (texture noise on a dark backdrop).
    """
    c = rgb.astype(np.float64) / 255.0
    b = bg.astype(np.float64) / 255.0
    up = c > b
    down = 0 if lighter_only else (b - c) / np.maximum(b, 1e-6)
    a = np.where(up, (c - b) / np.maximum(1 - b, 1e-6), down)
    alpha = a.max(axis=2, keepdims=True)
    fg = np.where(alpha > 1e-6, (c - b) / np.maximum(alpha, 1e-6) + b, 0)
    return np.concatenate([np.clip(fg, 0, 1), np.clip(alpha, 0, 1)], axis=2)


_last_box = None


def crop_to_content(rgba: np.ndarray, pad=12) -> np.ndarray:
    global _last_box
    ys, xs = np.where(rgba[:, :, 3] > 0.04)
    _last_box = (max(ys.min() - pad, 0), ys.max() + pad, max(xs.min() - pad, 0), xs.max() + pad)
    t, b, l, r = _last_box
    return rgba[t:b, l:r]


def crop_to_content_like(arr: np.ndarray, _ref) -> np.ndarray:
    t, b, l, r = _last_box
    return arr[t:b, l:r]


def to_image(rgba: np.ndarray) -> Image.Image:
    return Image.fromarray((rgba * 255).round().astype(np.uint8), "RGBA")


def logos():
    ivory = np.array([0.98, 0.968, 0.945])
    # Desktop logo on white: keep the gold, turn the black lettering ivory for dark grounds.
    src = np.array(Image.open(SRC / "logo desktop.png").convert("RGB"))
    rgba = crop_to_content(color_to_alpha(src, np.array([255, 255, 255])))
    original = rgba.copy()
    fg = rgba[:, :, :3]
    neutral = (fg.max(axis=2) - fg.min(axis=2)) < 0.14
    fg[neutral] = ivory
    # Gold keeps its printed colour and full opacity (colour-to-alpha would thin it out on dark grounds).
    raw = crop_to_content_like(src, original).astype(np.float64) / 255.0
    gold = ~neutral & (rgba[:, :, 3] > 0.04)
    fg[gold] = raw[gold]
    rgba[:, :, 3][gold] = np.clip((1 - raw.min(axis=2)[gold]) / 0.3, 0, 1)
    for img, name in ((to_image(rgba), "logo-desktop-light"), (to_image(original), "logo-desktop-dark")):
        img.thumbnail((560, 560), Image.LANCZOS)
        img.save(BRAND / f"{name}.webp", "WEBP", quality=92, method=6)
        print(name, img.size)

    # Mobile logo on navy: knock the navy out.
    src = np.array(Image.open(SRC / "LOGO MOBIL.png").convert("RGB"))
    bg = np.median(src[:20, :20].reshape(-1, 3), axis=0)
    rgba = color_to_alpha(src, bg, lighter_only=True)
    # The navy is textured with a soft vignette; drop the faint residue so no box shows on other darks.
    a = rgba[:, :, 3]
    rgba[:, :, 3] = np.clip((a - 0.1) / 0.9, 0, 1)
    rgba = crop_to_content(rgba)
    img = to_image(rgba)
    img.thumbnail((480, 480), Image.LANCZOS)
    img.save(BRAND / "logo-mobile-light.webp", "WEBP", quality=92, method=6)
    print("logo-mobile-light", img.size, "bg", bg)


def footer_art():
    img = Image.open(SRC / "fotter dektob.png").convert("RGB")
    w, h = img.size
    strip = img.crop((0, int(h * 0.44), w, h))  # skyline + gold horizon, below the baked-in logo
    strip.save(IMG / "footer-horizon-2167.webp", "WEBP", quality=80, method=6)
    strip.resize((1200, round(strip.height * 1200 / w)), Image.LANCZOS).save(IMG / "footer-horizon-1200.webp", "WEBP", quality=80, method=6)
    print("footer-horizon", strip.size)


if __name__ == "__main__":
    import sys
    if "--logos" not in sys.argv:
        for file, (name, widths, _) in PHOTOS.items():
            save_widths(Image.open(SRC / file).convert("RGB"), name, widths)
    logos()
    footer_art()
