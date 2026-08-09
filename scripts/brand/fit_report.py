"""
Try every downloaded weight against the artwork and report the fit, so the
weight the logo was actually set in is picked on evidence rather than by eye.

    python scripts/brand/fit_report.py
"""

import json
import os
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import foxlib as F  # noqa: E402
import typeset as T  # noqa: E402

SRC = os.environ.get("BRAND_SRC", r"D:\Downloads\Fix_fox_ear_texture_2K_202608082028.jpeg")
OUT = os.environ.get("BRAND_DEBUG_DIR", ".")

JOBS = [
    dict(name="wordmark", text="LogixLoops", family="Orbitron",
         weights=[500, 600, 700, 800, 900], box=(370, 1225, 1679, 1451),
         ink=(6, 25, 68), drop_rules=False),
    dict(name="tagline", text="Your Unfair Advantage", family="Inter",
         weights=[400, 500, 600, 700, 800, 900], box=(407, 1480, 1640, 1550),
         ink=(51, 107, 175), drop_rules=True),
]
MARGIN = 10


def region(img, bg, box, ink_rgb, drop_rules):
    """Coverage map plus a binary seed mask for one type region.

    The mask is ink coverage, NOT the filled silhouette the fox uses: a
    letter's counter is background, and filling it makes every heavier weight
    score better than the right one.
    """
    x0, y0, x1, y1 = box
    cx0, cy0 = x0 - MARGIN, y0 - MARGIN
    crop = img.crop((cx0, cy0, x1 + MARGIN + 1, y1 + MARGIN + 1))
    rgb = np.asarray(crop, dtype=np.float32)

    cov = T.source_coverage(rgb, bg, ink_rgb)
    mask = F.despeckle(cov > 0.5, 24)

    if drop_rules:
        # The tagline's two flanking rules are the same colour as the type and
        # would drag the fit's width and baseline. They are the only components
        # far wider than they are tall.
        lab, n = F.ndimage.label(mask)
        for i in range(1, n + 1):
            ys, xs = np.where(lab == i)
            w, h = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
            if w > 6 * h:
                mask[lab == i] = False
                cov[lab == i] = 0.0
    cov = np.where(mask | (cov < 0.5), cov, cov)
    return cov, mask, (cx0, cy0)


def main():
    img = Image.open(SRC).convert("RGB")
    full = np.asarray(img, dtype=np.float32)
    corners = np.concatenate([full[:80, :80], full[:80, -80:], full[-80:, :80], full[-80:, -80:]])
    bg = corners.reshape(-1, 3).mean(axis=0)

    chosen = {}
    for job in JOBS:
        cov, mask, origin = region(img, bg, job["box"], job["ink"], job["drop_rules"])
        h, w = cov.shape
        print(f"\n{job['name']}: '{job['text']}'  {w}x{h}  ink {mask.sum():,} px")

        results = []
        for wt in job["weights"]:
            face = T.Face(job["family"], wt)
            p, err = T.fit_text(face, job["text"], cov, mask)
            sp, _, _ = T.text_subpaths(face, job["text"], p["size"], p["x0"],
                                       p["baseline"], p["tracking"], xscale=p["xscale"])
            ov = T.iou(T.coverage(sp, w, h), cov)
            results.append((err, wt, p))
            print(f"   {job['family']} {wt:>3}  rmse {err:.4f}  IoU {ov:.4f}   "
                  f"size={p['size']:7.2f} x0={p['x0']:7.2f} base={p['baseline']:7.2f} "
                  f"track={p['tracking']:6.2f} xscale={p['xscale']:5.3f}")

        results.sort(key=lambda r: r[0])
        err, wt, p = results[0]
        face = T.Face(job["family"], wt)
        nudges, err2 = T.refine_per_glyph(face, job["text"], cov, p)
        sp, _, _ = T.text_subpaths(face, job["text"], p["size"], p["x0"], p["baseline"],
                                   p["tracking"], per_glyph=nudges, xscale=p["xscale"])
        got = T.coverage(sp, w, h)
        print(f"   BEST {job['family']} {wt}: rmse {err:.4f} -> {err2:.4f}  "
              f"IoU {T.iou(got, cov):.4f}")

        chosen[job["name"]] = dict(family=job["family"], weight=wt, origin=list(origin),
                                   params=p, nudges=nudges, rmse=err2,
                                   iou=T.iou(got, cov))

        vis = np.full(cov.shape + (3,), 255, np.uint8)
        d = got - cov
        vis[..., 0] = np.clip(255 - np.clip(-d, 0, 1) * 255 - np.clip(d, 0, 1) * 30, 0, 255)
        vis[..., 1] = np.clip(255 - np.abs(d) * 255, 0, 255)
        vis[..., 2] = np.clip(255 - np.clip(d, 0, 1) * 255 - np.clip(-d, 0, 1) * 30, 0, 255)
        Image.fromarray(vis).save(os.path.join(OUT, f"fit-{job['name']}.png"))

    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "typefit.json"), "w") as fh:
        json.dump(chosen, fh, indent=2)
        fh.write("\n")
    print(f"\nwrote scripts/brand/typefit.json")


if __name__ == "__main__":
    main()
