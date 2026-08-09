"""
Fidelity check: composite a rendered export over white, line it up with the
same crop of the source JPEG, and report how far apart they are.

The render comes from the shipped curves, so this measures the whole chain —
classification, cleanup, tracing, curve fitting — not just one stage.

    python scripts/brand/verify.py public/brand/png/logo-full-2048.png [...]
"""

import sys

import numpy as np
from PIL import Image

SRC = r"D:\Downloads\Fix_fox_ear_texture_2K_202608082028.jpeg"
# Ink bounding box of the full lockup, from analyze.py.
BOX = (370, 432, 1680, 1551)


def compare(path):
    render = Image.open(path).convert("RGBA")
    plate = Image.new("RGBA", render.size, (255, 255, 255, 255))
    plate.alpha_composite(render)
    a = np.asarray(plate.convert("RGB"), dtype=np.float32)

    src = Image.open(SRC).convert("RGB").crop(BOX).resize(render.size, Image.LANCZOS)
    b = np.asarray(src, dtype=np.float32)

    diff = np.linalg.norm(a - b, axis=2)
    px = diff.size
    print(f"{path}")
    print(f"   size           {render.size[0]}x{render.size[1]}")
    print(f"   mean abs diff  {np.abs(a - b).mean():6.2f} / 255")
    print(f"   rms colour     {np.sqrt((diff ** 2).mean()):6.2f}")
    print(f"   >12  (visible) {(diff > 12).sum() / px * 100:6.2f}%")
    print(f"   >48  (wrong)   {(diff > 48).sum() / px * 100:6.2f}%")
    print(f"   >128 (severe)  {(diff > 128).sum() / px * 100:6.2f}%")
    return diff, a, b


if __name__ == "__main__":
    paths = sys.argv[1:] or ["public/brand/png/logo-full-2048.png"]
    for p in paths:
        d, a, b = compare(p)
        heat = np.clip(d / 96 * 255, 0, 255).astype(np.uint8)
        Image.fromarray(heat).save(p.replace(".png", "-diff.png"))
