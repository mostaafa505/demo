"""Crop the remaining placeholder photos (lawyers, knowledge still) out of the reference designs.

Low-resolution stand-ins until the client supplies real photography (see IMAGES.md).
Everything else comes from scripts/process-assets.py. Run: python3 scripts/crop-references.py
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "references"
OUT = ROOT / "src" / "assets" / "images"
OUT.mkdir(parents=True, exist_ok=True)

D = REF / "02_HOME" / "01_Home_Desktop.png"
M = REF / "02_HOME" / "02_Home_Mobile.png"

CROPS = {
    # Only what the client has not yet supplied as real photography.
    "lawyer-ahmed-el-shawi": (M, (64, 1326, 250, 1428), 3),
    "lawyer-sara-mahmoud": (M, (266, 1326, 460, 1428), 3),
    "lawyer-karim-el-awady": (M, (477, 1326, 662, 1428), 3),
}

for name, (src, box, scale) in CROPS.items():
    img = Image.open(src).convert("RGB").crop(box)
    w, h = img.size
    img = img.resize((w * scale, h * scale), Image.LANCZOS)
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    img.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6)
    print(f"{name}.webp {img.size}")
