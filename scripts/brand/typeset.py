"""
Set the wordmark and tagline from their real typefaces instead of tracing them
out of the JPEG.

Tracing type is always a compromise: the outline it recovers is the raster's
blurred edge, so stems wobble, corners round off, and counters drift. The
original was set in Orbitron and Inter, so the exact curves already exist —
this module lays the strings out, fits size/position/tracking to the artwork by
maximising overlap with the source mask, and emits the font's own outlines.

The fit is measured, not assumed: `fit_text` reports an IoU against the source
mask so a wrong weight or a wrong family is obvious rather than silent.
"""

from __future__ import annotations

import os

import numpy as np
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw

FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")


class Face:
    def __init__(self, family, weight):
        self.family, self.weight = family, weight
        self.path = os.path.join(FONT_DIR, f"{family}-{weight}.ttf")
        self.font = TTFont(self.path)
        self.upem = self.font["head"].unitsPerEm
        self.glyphs = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.hmtx = self.font["hmtx"]
        os2 = self.font["OS/2"]
        self.cap = getattr(os2, "sCapHeight", None) or self.upem * 0.7

    def name(self, ch):
        return self.cmap[ord(ch)]

    def advance(self, ch):
        return self.hmtx[self.name(ch)][0]

    def kern(self, a, b):
        """Flat kern-table lookup. GPOS pair positioning is ignored on purpose:
        the fitted tracking absorbs uniform spacing, and these two faces carry
        no per-pair kerning large enough to move a stem by a source pixel."""
        try:
            kt = self.font["kern"].kernTables[0].kernTable
        except Exception:
            return 0
        return kt.get((self.name(a), self.name(b)), 0)


def _quad_to_cubic(p0, c, p1):
    return ((p0[0] + 2 / 3 * (c[0] - p0[0]), p0[1] + 2 / 3 * (c[1] - p0[1])),
            (p1[0] + 2 / 3 * (c[0] - p1[0]), p1[1] + 2 / 3 * (c[1] - p1[1])))


def glyph_contours(face, gname):
    """Font-unit contours for one glyph, as [(start, [segments])].

    TrueType stores quadratics with implied on-curve points midway between
    consecutive off-curve points; those are reconstructed here and every curve
    is promoted to a cubic so the output matches what the tracer emits.
    """
    # Decomposing, not plain recording: Inter builds 'i' out of components
    # (dotless stem + tittle), and a plain recording pen hands back
    # `addComponent` calls rather than outlines — the glyph silently vanishes.
    pen = DecomposingRecordingPen(face.glyphs)
    face.glyphs[gname].draw(pen)

    out, start, cur, segs = [], None, None, []
    for op, args in pen.value:
        if op == "moveTo":
            if start is not None and segs:
                out.append((start, segs))
            start = cur = args[0]
            segs = []
        elif op == "lineTo":
            segs.append(("L", args[0]))
            cur = args[0]
        elif op == "curveTo":
            segs.append(("C", args[0], args[1], args[2]))
            cur = args[2]
        elif op == "qCurveTo":
            pts = list(args)
            if pts[-1] is None:            # all-off-curve closed contour
                pts = pts[:-1]
                implied = ((pts[0][0] + pts[-1][0]) / 2, (pts[0][1] + pts[-1][1]) / 2)
                start = cur = implied
                pts = pts + [implied]
            on = pts[-1]
            offs = pts[:-1]
            for i, c in enumerate(offs):
                end = on if i == len(offs) - 1 else ((c[0] + offs[i + 1][0]) / 2,
                                                    (c[1] + offs[i + 1][1]) / 2)
                c1, c2 = _quad_to_cubic(cur, c, end)
                segs.append(("C", c1, c2, end))
                cur = end
        elif op == "closePath":
            if start is not None and segs:
                out.append((start, segs))
            start, segs = None, []
    if start is not None and segs:
        out.append((start, segs))
    return out


def place(contours, size, upem, x, baseline, xscale=1.0):
    """Font units (y up, origin at baseline) -> image pixels (y down).

    `xscale` condenses horizontally. The artwork's type is narrower than the
    typeface's natural widths, so without it the fit can only match the set
    width by crushing the tracking until letters collide.
    """
    k = size / upem

    def T(p):
        return (x + p[0] * k * xscale, baseline - p[1] * k)

    out = []
    for st, segs in contours:
        ns = [("L", T(s[1])) if s[0] == "L" else ("C", T(s[1]), T(s[2]), T(s[3]))
              for s in segs]
        out.append((T(st), ns))
    return out


def text_subpaths(face, text, size, x0, baseline, tracking=0.0, per_glyph=None,
                  xscale=1.0):
    """Lay out `text` and return (subpaths, per_glyph_subpaths, advance_px).

    `tracking` is extra letter-spacing in pixels. `per_glyph` optionally adds a
    per-character pixel nudge, used to absorb the last fraction of drift after
    the global fit.
    """
    k = size / face.upem
    pen_x = x0
    whole, groups = [], []
    for i, ch in enumerate(text):
        if ch == " ":
            pen_x += face.advance(ch) * k * xscale + tracking
            groups.append([])
            continue
        dx = per_glyph[i] if per_glyph else 0.0
        sp = place(glyph_contours(face, face.name(ch)), size, face.upem,
                   pen_x + dx, baseline, xscale)
        whole.extend(sp)
        groups.append(sp)
        kern = face.kern(ch, text[i + 1]) if i + 1 < len(text) else 0
        pen_x += (face.advance(ch) + kern) * k * xscale + tracking
    return whole, groups, pen_x - x0


# ─── Fitting ───────────────────────────────────────────────────────────────

def coverage(subpaths, w, h, ss=4):
    """Anti-aliased coverage in [0, 1], even-odd, at `ss` supersampling.

    Fitting against binary masks stalls: the objective can only see whole
    pixels, so a half-pixel size error is invisible until it tips a whole rim
    of pixels at once, and the search settles on whichever weight happens to
    cover the most area. Grey coverage makes the objective continuous, and the
    fit lands on the sub-pixel.
    """
    acc = _binary(subpaths, w * ss, h * ss, ss)
    if ss == 1:
        return acc.astype(np.float32)
    return acc.reshape(h, ss, w, ss).mean(axis=(1, 3)).astype(np.float32)


def _binary(subpaths, W, H, ss):
    acc = np.zeros((H, W), dtype=bool)
    for st, segs in subpaths:
        pts, cur = [st], st
        for s in segs:
            if s[0] == "L":
                pts.append(s[1])
                cur = s[1]
            else:
                c1, c2, e = s[1], s[2], s[3]
                for j in range(1, 13):
                    t = j / 12
                    m = 1 - t
                    pts.append((m ** 3 * cur[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t ** 3 * e[0],
                                m ** 3 * cur[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t ** 3 * e[1]))
                cur = e
        if len(pts) < 3:
            continue
        layer = Image.new("1", (W, H), 0)
        ImageDraw.Draw(layer).polygon([(x * ss, y * ss) for x, y in pts], fill=1)
        acc ^= np.asarray(layer, dtype=bool)
    return acc


def iou(a, b):
    """Overlap of two coverage maps, thresholded at half a pixel. Reported
    rather than optimised — it is the intuitive number, not the useful one."""
    a, b = a > 0.5, b > 0.5
    union = (a | b).sum()
    return float((a & b).sum()) / float(union) if union else 0.0


def source_coverage(rgb, bg, ink_rgb):
    """Recover per-pixel ink coverage from the artwork.

    A pixel on a glyph edge is a blend of the ink colour and the paper, so its
    distance from the paper, over the full ink's distance from the paper, is
    how much of the pixel the glyph covers.
    """
    full = np.linalg.norm(np.asarray(ink_rgb, np.float32) - bg)
    d = np.linalg.norm(rgb - bg, axis=2)
    return np.clip(d / max(full, 1e-6), 0.0, 1.0).astype(np.float32)


def rmse(a, b):
    return float(np.sqrt(((a - b) ** 2).mean()))


def seed_params(face, text, mask):
    """First guess from the mask's own geometry: cap height sets the size, the
    baseline sits at the bottom of the capitals, and tracking is whatever makes
    the set width match."""
    ys, xs = np.where(mask)
    x0, x1 = xs.min(), xs.max()
    # Capitals define the top and the baseline; descenders (g, p) would drag a
    # naive bottom measurement down, so the baseline is taken from the leftmost
    # capital's own column range.
    cap_col = mask[:, x0:x0 + max(4, (x1 - x0) // 40)]
    cys = np.where(cap_col.any(axis=1))[0]
    cap_px = cys.max() - cys.min() + 1
    size = cap_px * face.upem / face.cap
    baseline = float(cys.max()) + 1.0

    k = size / face.upem
    natural = sum(face.advance(c) * k for c in text)
    natural += sum(face.kern(text[i], text[i + 1]) * k for i in range(len(text) - 1))
    # Absorb the width difference into a condense factor rather than tracking:
    # crushed tracking collides letters, a condense keeps their rhythm.
    xscale = (x1 - x0 + 1) / natural if natural else 1.0
    return dict(size=float(size), x0=float(x0), baseline=baseline,
                tracking=0.0, xscale=float(min(max(xscale, 0.6), 1.4)))


def fit_text(face, text, target, seed_mask, rounds=3, ss=4):
    """Coordinate descent on (size, x0, baseline, tracking).

    Minimises RMSE against the artwork's coverage map. Lower is better.
    """
    h, w = target.shape
    p = seed_params(face, text, seed_mask)

    def score(q):
        sp, _, _ = text_subpaths(face, text, q["size"], q["x0"], q["baseline"],
                                 q["tracking"], xscale=q["xscale"])
        return rmse(coverage(sp, w, h, ss), target)

    best = score(p)
    steps = {"size": p["size"] * 0.05, "x0": 4.0, "baseline": 4.0,
             "tracking": 2.0, "xscale": 0.04}
    for _ in range(rounds):
        for key in ("size", "baseline", "xscale", "x0", "tracking"):
            step = steps[key]
            while step > 0.02:
                improved = False
                for d in (step, -step):
                    q = dict(p)
                    q[key] += d
                    s = score(q)
                    if s < best - 1e-6:
                        p, best, improved = q, s, True
                        break
                if not improved:
                    step /= 2
    return p, best


def refine_per_glyph(face, text, target, p, span=5.0, ss=4):
    """Nudge individual glyphs to soak up per-pair spacing differences left
    over from the global fit."""
    h, w = target.shape
    nudges = [0.0] * len(text)

    def score(n):
        sp, _, _ = text_subpaths(face, text, p["size"], p["x0"], p["baseline"],
                                 p["tracking"], per_glyph=n, xscale=p["xscale"])
        return rmse(coverage(sp, w, h, ss), target)

    best = score(nudges)
    for i, ch in enumerate(text):
        if ch == " ":
            continue
        step = span
        while step > 0.05:
            improved = False
            for d in (step, -step):
                cand = list(nudges)
                cand[i] += d
                s = score(cand)
                if s < best - 1e-6:
                    nudges, best, improved = cand, s, True
                    break
            if not improved:
                step /= 2
    return nudges, best


def split_dot(subpaths, baseline, size, face):
    """Separate the tittle of an 'i' from its stem.

    Orbitron draws both in one glyph, but the artwork colours the dot
    differently, so it has to come out as its own path. The tittle is the only
    contour that sits entirely above the x-height.
    """
    x_height = baseline - size * (getattr(face.font["OS/2"], "sxHeight", face.upem * 0.5) / face.upem)
    dots, rest = [], []
    for sp in subpaths:
        ys = [sp[0][1]] + [s[-1][1] for s in sp[1]]
        (dots if max(ys) < x_height else rest).append(sp)
    return dots, rest
