"""Crop placeholder photos out of the reference designs.

These are low-resolution stand-ins until the client supplies real photography
(see IMAGES.md). Run: python3 scripts/crop-references.py
"""
from pathlib import Path
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "references"
OUT = ROOT / "src" / "assets" / "images"
OUT.mkdir(parents=True, exist_ok=True)

D = REF / "02_HOME" / "01_Home_Desktop.png"
M = REF / "02_HOME" / "02_Home_Mobile.png"
H = REF / "01_BRAND_CORE" / "01_Header_Desktop.png"
F = REF / "01_BRAND_CORE" / "02_Footer_Desktop.png"

CROPS = {
    # name: (source, box, upscale)
    "hero-family-skyline": (D, (0, 72, 600, 302), 3),
    "hero-scales-desk": (M, (0, 80, 420, 396), 3),
    "service-civil-marriage": (M, (485, 548, 699, 625), 3),
    "service-divorce": (M, (256, 548, 469, 625), 3),
    "service-children-custody": (M, (26, 548, 240, 625), 3),
    "service-wills": (M, (485, 743, 699, 818), 3),
    "service-inheritance": (M, (256, 743, 469, 818), 3),
    "service-maintenance": (M, (26, 743, 240, 818), 3),
    "service-international": (D, (160, 352, 274, 411), 4),
    "service-emirates": (D, (37, 352, 149, 411), 4),
    "city-abu-dhabi": (M, (485, 1009, 699, 1095), 3),
    "city-dubai": (M, (256, 1009, 469, 1095), 3),
    "city-sharjah": (M, (26, 1009, 240, 1095), 3),
    "lawyer-ahmed-el-shawi": (M, (64, 1326, 250, 1428), 3),
    "lawyer-sara-mahmoud": (M, (266, 1326, 460, 1428), 3),
    "lawyer-karim-el-awady": (M, (477, 1326, 662, 1428), 3),
    "testimonial-pen": (M, (457, 1533, 725, 1688), 3),
    "knowledge-gavel-books": (D, (892, 1032, 1098, 1140), 3),
    "knowledge-article": (M, (485, 1752, 699, 1800), 3),
    "knowledge-podcast": (M, (256, 1752, 469, 1798), 3),
    "knowledge-video": (M, (26, 1752, 240, 1798), 3),
    "skyline-abu-dhabi-dusk": (H, (1150, 0, 2172, 158), 2),
    "footer-skyline": (F, (0, 445, 860, 612), 2),
    "cta-skyline": (D, (0, 1252, 212, 1324), 4),
}

for name, (src, box, scale) in CROPS.items():
    img = Image.open(src).convert("RGB").crop(box)
    w, h = img.size
    img = img.resize((w * scale, h * scale), Image.LANCZOS)
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
    img.save(OUT / f"{name}.webp", "WEBP", quality=82, method=6)
    print(f"{name}.webp {img.size}")
