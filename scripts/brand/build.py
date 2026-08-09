"""
Build the LogixLoops brand asset set from the source logo raster.

    python scripts/brand/build.py [--scale 3] [--src PATH] [--out DIR]

The fox is cropped, upscaled, colour-classified, cleaned and traced. The type
is NOT traced: the lockup is set in Orbitron and Inter, so those outlines
already exist and `typeset.py` fits them to the artwork instead. Tracing type
inherits the raster's blurred edge — wobbling stems, rounded corners, drifting
counters — which is exactly what a logo cannot afford.

Everything is re-composed in the source's own pixel coordinate space, so each
piece stays usable on its own while the combined lockup keeps the original
spacing.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import foxlib as F  # noqa: E402
import typeset as T  # noqa: E402

# Region boxes measured by analyze.py (inclusive, source pixels).
REGIONS = {
    "fox": dict(
        box=(551, 432, 1497, 1177),
        palette=F.REGION_PALETTE["fox"],
        white=True,
        royal_enclosed=True,
        merge={"mist": "white"},
    ),
}
# Type regions, laid out from their real typefaces. Boxes match fit_report.py.
TYPE = {
    # Only the wordmark's tittle is a different colour from its letters, so it
    # is the only one that gets split out into its own path.
    "wordmark": dict(box=(370, 1225, 1679, 1451), text="LogixLoops",
                     rules=False, split_tittle=True),
    "tagline": dict(box=(407, 1480, 1640, 1550), text="Your Unfair Advantage",
                    rules=True, split_tittle=False),
}
MARGIN = 10  # source px of slack around each crop so edges are never clipped

WHITE = "#FFFFFF"


def log(msg):
    print(msg, flush=True)


def build_region(img, bg, name, cfg, scale):
    """Classify and trace one region. Returns {class_name: subpaths} in source
    pixel coordinates, plus the resolved palette."""
    x0, y0, x1, y1 = cfg["box"]
    cx0, cy0 = max(0, x0 - MARGIN), max(0, y0 - MARGIN)
    cx1, cy1 = min(img.width - 1, x1 + MARGIN), min(img.height - 1, y1 + MARGIN)

    crop = img.crop((cx0, cy0, cx1 + 1, cy1 + 1))
    if scale != 1:
        crop = crop.resize((crop.width * scale, crop.height * scale), Image.LANCZOS)
    rgb = np.asarray(crop, dtype=np.float32)
    s = scale

    # White is a full palette member, not the absence of ink: the fur bands
    # inside the fox are white on purpose and the background is the same
    # colour, so the two are separated by connectivity rather than by value.
    names = cfg["palette"] + ["white"]
    palette = F.refine_palette(rgb, names)
    labels = F.classify(rgb, names, palette)

    # The outer silhouette comes from a threshold on distance-from-background,
    # which follows the artwork's own anti-aliased edge and is therefore
    # smooth. Class boundaries *inside* the silhouette come from the label
    # map. Deriving the outline from the label map instead would put a
    # distance-transform staircase on the logo's most visible edge.
    ink = F.ink_mask(rgb, bg)
    solid = ~F.exterior(~ink)
    solid = F.despeckle(solid, 60 * s * s)
    solid = F.fill_small_holes(solid, 30 * s * s)

    labels = np.where(solid, labels, -1).astype(np.int16)
    labels = F.propagate(labels, solid, (labels >= 0) & solid)
    labels = F.smooth_labels(labels, solid, k=s, n_classes=len(names))

    # ─── Per-class cleanup ────────────────────────────────────────────────
    # Thresholds are written in source pixels and squared by the supersample
    # factor, so the result is the same shape at any scale.
    masks = {}
    for j, cname in enumerate(names):
        m = (labels == j) & solid
        if cname == "mist":
            # Real shading bands are 15-40 source px wide; anything thinner is
            # a gradient tail, not a shape.
            m = F.open_close(m, open_r=2 * s, close_r=2 * s)
            m = F.despeckle(m, 300 * s * s)
        elif cname in ("blue", "royal"):
            m = F.open_close(m, open_r=1 * s, close_r=1 * s)
            m = F.despeckle(m, 100 * s * s)
        elif cname == "white":
            m = F.open_close(m, open_r=1 * s)
        else:
            m = F.open_close(m, close_r=1 * s)
            m = F.despeckle(m, 60 * s * s)
        masks[cname] = m

    # Royal is a real flat tone in one place only — the ear's leaf. Everywhere
    # else it is the dark end of a gradient inside a blue sweep, and keeping it
    # there shatters the sweep into patches.
    if cfg.get("royal_enclosed") and "royal" in masks:
        real = F.enclosed_by(masks["royal"], masks.get("navy", np.zeros_like(solid)))
        masks["blue"] = masks["blue"] | (masks["royal"] & ~real)
        masks["royal"] = real

    # The pale bands read as drop shadows rather than as part of the mark, so
    # they fold into the white they sit on. Flat and crisp beats shaded.
    for src_class, dst_class in (cfg.get("merge") or {}).items():
        if src_class in masks:
            masks[dst_class] = masks.get(dst_class, np.zeros_like(solid)) | masks.pop(src_class)
            if src_class in names:
                names = [n for n in names if n != src_class]

    # Pixels evicted by cleanup would otherwise punch holes; hand each to the
    # nearest surviving class.
    kept = np.zeros_like(solid)
    for m in masks.values():
        kept |= m
    relab = np.full(solid.shape, -1, dtype=np.int16)
    for j, cname in enumerate(names):
        relab[masks[cname]] = j
    relab = F.propagate(relab, solid, kept)
    for j, cname in enumerate(names):
        masks[cname] = relab == j
    del masks["white"]

    if cfg["white"]:
        # A base plate under everything: the enclosed fur reads white, and any
        # sub-pixel seam between two traced layers reads white too, not
        # whatever the logo happens to be sitting on.
        masks["white"] = solid

    # ─── Trace ────────────────────────────────────────────────────────────
    out = {}
    turd = max(2, int(2.5 * s * s))
    # potrace's tolerances are in device pixels; scaling them by the
    # supersample factor keeps the curve fit at a constant visual tightness
    # instead of chasing sub-pixel noise (and inflating the path data) as the
    # trace resolution goes up.
    opttol = 0.5 * s
    for cname in F.Z_ORDER:
        m = masks.get(cname)
        if m is None or not m.any():
            continue
        # Lower layers are grown by roughly one source pixel so no hairline of
        # background survives between two adjacent flat colours. Navy is the
        # top layer and white is the base plate; neither needs it.
        if cname not in ("navy", "white") and s > 1:
            m = ndimage.binary_dilation(m, np.ones((s, s), bool))
        t = time.time()
        sp = F.trace(m, turdsize=turd, alphamax=1.0, opttolerance=opttol)
        out[cname] = F.to_native(sp, cx0, cy0, s)
        log(f"    {name}/{cname:<5} {m.sum() // (s * s):>8,} px  "
            f"{len(sp):>3} contours  {time.time() - t:5.2f}s")

    # Single-colour variant: the ink that carries the drawing, minus the pale
    # shading. Merging mist in too would fill the gaps that separate the tail
    # sweeps and flatten the mark into a blob.
    mono = np.zeros_like(solid)
    for cname in ("navy", "blue", "royal", "steel"):
        if cname in masks:
            mono |= masks[cname]
    mono = F.open_close(mono, close_r=1 * s)
    out["_mono"] = F.to_native(F.trace(mono, turdsize=turd, opttolerance=opttol), cx0, cy0, s)

    return out, palette


def build_type(img, bg, name, cfg, fit):
    """Lay one string out in its real typeface, positioned by the fitted
    parameters, and return subpaths in source pixel coordinates.

    Anything in the region that is not type — the tagline's flanking rules —
    is traced from the artwork, since no font supplies it.
    """
    face = T.Face(fit["family"], fit["weight"])
    p = fit["params"]
    ox, oy = fit["origin"]

    sp, _, _ = T.text_subpaths(face, cfg["text"], p["size"], p["x0"], p["baseline"],
                               p["tracking"], per_glyph=fit["nudges"], xscale=p["xscale"])
    # Orbitron draws the 'i' and its tittle as one glyph; the artwork colours
    # the wordmark's tittle separately, so there it comes out as its own path.
    if cfg["split_tittle"]:
        dots, body = T.split_dot(sp, p["baseline"], p["size"], face)
    else:
        dots, body = [], sp

    out = {"text": F.shift(body, ox, oy)}
    if dots:
        out["dot"] = F.shift(dots, ox, oy)
    out["_mono"] = F.shift(sp, ox, oy)
    log(f"    {name}/type   {fit['family']} {fit['weight']}  "
        f"{len(body)} contours + {len(dots)} tittle   IoU {fit['iou']:.3f}")

    if cfg["rules"]:
        x0, y0, x1, y1 = cfg["box"]
        crop = img.crop((x0 - MARGIN, y0 - MARGIN, x1 + MARGIN + 1, y1 + MARGIN + 1))
        rgb = np.asarray(crop, dtype=np.float32)
        ink = F.despeckle(F.ink_mask(rgb, bg), 24)
        lab, n = ndimage.label(ink)
        rules = np.zeros_like(ink)
        for i in range(1, n + 1):
            ys, xs = np.where(lab == i)
            w, h = xs.max() - xs.min() + 1, ys.max() - ys.min() + 1
            if w > 6 * h:
                rules |= lab == i
        if rules.any():
            traced = F.to_native(F.trace(rules, turdsize=4, opttolerance=0.3),
                                 x0 - MARGIN, y0 - MARGIN, 1)
            out["rules"] = traced
            log(f"    {name}/rules  {len(traced)} contours")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=r"D:\Downloads\Fix_fox_ear_texture_2K_202608082028.jpeg")
    ap.add_argument("--out", default=os.path.join("public", "brand"))
    ap.add_argument("--scale", type=int, default=3)
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    img = Image.open(args.src).convert("RGB")
    full = np.asarray(img, dtype=np.float32)
    corners = np.concatenate([full[:80, :80], full[:80, -80:], full[-80:, :80], full[-80:, -80:]])
    bg = corners.reshape(-1, 3).mean(axis=0)
    log(f"source {img.width}x{img.height}  bg={tuple(round(float(v), 1) for v in bg)}  scale={args.scale}x")

    geo, palettes = {}, {}
    for name, cfg in REGIONS.items():
        log(f"  region {name}")
        geo[name], palettes[name] = build_region(img, bg, name, cfg, args.scale)

    fit_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "typefit.json")
    if not os.path.exists(fit_path):
        raise SystemExit("missing scripts/brand/typefit.json — run fit_report.py first")
    with open(fit_path) as fh:
        fits = json.load(fh)
    for name, cfg in TYPE.items():
        log(f"  region {name}")
        geo[name] = build_type(img, bg, name, cfg, fits[name])

    # Resolved brand colours, straight from the artwork.
    COL = {
        "navy": "#%02X%02X%02X" % palettes["fox"]["navy"],
        "blue": "#%02X%02X%02X" % palettes["fox"]["blue"],
        "royal": "#%02X%02X%02X" % palettes["fox"]["royal"],
        "steel": "#336BAF",
    }
    COL["wordmark_navy"] = COL["navy"]
    COL["wordmark_blue"] = COL["blue"]
    log(f"  palette {json.dumps(COL)}")

    tokens = {
        "palette": COL,
        "source": os.path.basename(args.src),
        "supersample": args.scale,
        "regions": {**{k: v["box"] for k, v in REGIONS.items()},
                    **{k: v["box"] for k, v in TYPE.items()}},
        "type": {k: dict(family=v["family"], weight=v["weight"],
                         condense=round(v["params"]["xscale"], 4),
                         iou=round(v["iou"], 4)) for k, v in fits.items()},
    }
    with open(os.path.join(args.out, "tokens.json"), "w") as fh:
        json.dump(tokens, fh, indent=2)
        fh.write("\n")

    # Hand geometry to the emit stage in memory rather than via disk — the
    # curve data is large and only ever consumed by the next step.
    import emit  # noqa: E402
    emit.write_all(geo, COL, args.out)


if __name__ == "__main__":
    main()
