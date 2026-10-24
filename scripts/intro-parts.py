"""Hi-res (3x, 1680x453) intro logo layers.

The client's uae-logo-parts are 560x151 (cut from the site's logo export). This rebuilds the
same layers from the original 1888px logo: every pixel of the high-resolution logo is assigned
to the layer whose 560px footprint contains it, so names, positions and proportions match the
client's parts exactly. Output: public/brand/intro/*.png

Run: python3 scripts/intro-parts.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PARTS = ROOT / "references" / "client" / "uae-logo-parts"
OUT = ROOT / "public" / "brand" / "intro"
NAMES = ["col-top", "col-capital", "col-shaft-1", "col-shaft-2", "col-shaft-3", "col-shaft-4", "col-base", "text-title", "text-subtitle", "underline"]
W, H = 1680, 453


def hires_logo() -> Image.Image:
    import importlib.util

    spec = importlib.util.spec_from_file_location("assets", ROOT / "scripts" / "process-assets.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    src = np.array(Image.open(m.SRC / "logo desktop.png").convert("RGB"))
    rgba = m.crop_to_content(m.color_to_alpha(src, np.array([255, 255, 255])))
    fg = rgba[:, :, :3]
    neutral = (fg.max(axis=2) - fg.min(axis=2)) < 0.14
    fg[neutral] = np.array([0.98, 0.968, 0.945])
    raw = m.crop_to_content_like(src, None).astype(np.float64) / 255.0
    gold = ~neutral & (rgba[:, :, 3] > 0.04)
    fg[gold] = raw[gold]
    rgba[:, :, 3][gold] = np.clip((1 - raw.min(axis=2)[gold]) / 0.3, 0, 1)
    return m.to_image(rgba).resize((W, H), Image.LANCZOS)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    full = hires_logo()
    fa = np.array(full)
    fa[fa[:, :, 3] < 6] = 0  # drop near-invisible scan noise so the PNGs compress
    full = Image.fromarray(fa)
    # Footprint of each layer at 3x: its 560px alpha upscaled and widened by a few pixels.
    # Every high-resolution pixel goes to the layer with the strongest footprint there.
    from PIL import ImageFilter

    footprints = np.stack(
        [np.array(Image.open(PARTS / f"{n}.png").getchannel("A").resize((W, H), Image.BILINEAR).filter(ImageFilter.MaxFilter(9)), dtype=np.float64) for n in NAMES]
    )
    owner = footprints.argmax(axis=0)
    claimed = footprints.max(axis=0) > 0
    cover = np.zeros((H, W), bool)
    for i, name in enumerate(NAMES):
        mask = claimed & (owner == i)
        cover |= mask
        part = fa.copy()
        part[~mask] = 0
        Image.fromarray(part).save(OUT / f"{name}.png", optimize=True)
    full.save(OUT / "logo-full.png", optimize=True)

    visible = fa[:, :, 3] > 20
    print("uncovered visible px:", int((visible & ~cover).sum()), "of", int(visible.sum()))
    # Compare on premultiplied colour (transparent pixels carry no meaning).
    pm = lambda a: a[:, :, :3] * (a[:, :, 3:4] / 255.0)
    ref = np.array(Image.open(PARTS / "logo-full.png").convert("RGBA")).astype(np.float64)
    small = np.array(full.resize((560, 151), Image.LANCZOS)).astype(np.float64)
    print("mean abs difference vs the client's 560px logo (0-255):", round(float(np.abs(pm(ref) - pm(small)).mean()), 2))
