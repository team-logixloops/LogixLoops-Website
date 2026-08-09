"""
Step 1 of the logo vectorisation pipeline: understand the source raster before
touching it. Prints the palette, the ink extent, and the horizontal bands that
separate the fox mark from the wordmark from the tagline.

Nothing is written here — this is measurement only, so the numbers that drive
build.py are observed rather than guessed.
"""

import sys
from collections import Counter

import numpy as np
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else r"D:\Downloads\Fix_fox_ear_texture_2K_202608082028.jpeg"

img = Image.open(SRC).convert("RGB")
a = np.asarray(img).astype(np.float64)
h, w, _ = a.shape
print(f"source      : {SRC}")
print(f"dimensions  : {w} x {h}")

# ─── Background ────────────────────────────────────────────────────────────
# The corners are guaranteed background on a centred logo lockup.
corners = np.concatenate([a[:40, :40], a[:40, -40:], a[-40:, :40], a[-40:, -40:]]).reshape(-1, 3)
bg = corners.mean(axis=0)
print(f"background  : rgb({bg[0]:.1f}, {bg[1]:.1f}, {bg[2]:.1f})  std={corners.std(axis=0).round(2)}")

# ─── Ink mask ──────────────────────────────────────────────────────────────
dist = np.linalg.norm(a - bg, axis=2)
for t in (8, 12, 16, 20, 28, 40):
    print(f"  ink@dist>{t:<3}: {(dist > t).sum():>9,} px  ({(dist > t).mean() * 100:5.2f}%)")

INK_T = 18
ink = dist > INK_T
ys, xs = np.where(ink)
print(f"ink bbox    : x {xs.min()}..{xs.max()}   y {ys.min()}..{ys.max()}  (threshold {INK_T})")

# ─── Horizontal bands ──────────────────────────────────────────────────────
# Row occupancy, then split on runs of near-empty rows. A handful of stray
# JPEG-noise pixels must not count as content, hence the small floor.
row = ink.sum(axis=1)
FLOOR = max(3, int(w * 0.0015))
bands, start = [], None
for y in range(h):
    if row[y] > FLOOR and start is None:
        start = y
    elif row[y] <= FLOOR and start is not None:
        if y - start > 8:
            bands.append((start, y - 1))
        start = None
if start is not None:
    bands.append((start, h - 1))

print(f"row floor   : {FLOOR}px")
print(f"bands       : {len(bands)}")
for i, (y0, y1) in enumerate(bands):
    seg = ink[y0:y1 + 1]
    sx = np.where(seg.any(axis=0))[0]
    print(f"  band {i}: y {y0}..{y1}  (h={y1 - y0 + 1})   x {sx.min()}..{sx.max()}  (w={sx.max() - sx.min() + 1})   px={seg.sum():,}")

# ─── Palette ───────────────────────────────────────────────────────────────
# k-means over ink pixels only. Background would otherwise swallow a centroid.
pts = a[ink]
print(f"\nk-means over {len(pts):,} ink px")
rng = np.random.default_rng(7)


def kmeans(pts, k, iters=60):
    # k-means++ seeding — random init on a 3-tone logo collapses centroids.
    c = pts[rng.integers(len(pts))][None, :]
    for _ in range(k - 1):
        d = ((pts[:, None, :] - c[None, :, :]) ** 2).sum(2).min(1)
        c = np.vstack([c, pts[rng.choice(len(pts), p=d / d.sum())]])
    for _ in range(iters):
        lab = ((pts[:, None, :] - c[None, :, :]) ** 2).sum(2).argmin(1)
        new = np.array([pts[lab == j].mean(0) if (lab == j).any() else c[j] for j in range(k)])
        if np.allclose(new, c, atol=0.05):
            c = new
            break
        c = new
    lab = ((pts[:, None, :] - c[None, :, :]) ** 2).sum(2).argmin(1)
    inertia = ((pts - c[lab]) ** 2).sum(1).mean()
    return c, lab, inertia


sample = pts[rng.choice(len(pts), size=min(60000, len(pts)), replace=False)]
for k in (2, 3, 4, 5, 6):
    c, lab, inertia = kmeans(sample, k)
    order = np.argsort(c.sum(1))
    hexes = []
    for j in order:
        r, g, b = c[j]
        share = (lab == j).mean() * 100
        hexes.append(f"#{int(round(r)):02x}{int(round(g)):02x}{int(round(b)):02x} {share:4.1f}%")
    print(f"  k={k}  rmse={np.sqrt(inertia):6.2f}   " + " | ".join(hexes))

# ─── Exact-colour census ───────────────────────────────────────────────────
q = (a[ink] // 8 * 8).astype(int)
top = Counter(map(tuple, q)).most_common(12)
print("\nmost common ink colours (8-step buckets)")
for (r, g, b), n in top:
    print(f"  #{r:02x}{g:02x}{b:02x}  {n:>8,}  ({n / ink.sum() * 100:5.2f}%)")
