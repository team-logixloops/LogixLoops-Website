"""
Shared machinery for the LogixLoops logo pipeline.

The source is a 2048x2048 JPEG of a flat-colour logo lockup. Everything here
exists to recover the *intended* flat shapes from a lossy raster and re-emit
them as vectors, without inheriting JPEG mush or anti-alias fringing.

Two ideas do most of the work:

1. Core-then-propagate classification. Anti-aliased boundary pixels are
   blends of two brand colours, so nearest-colour on the full silhouette
   invents a one-pixel band of whichever palette entry happens to sit near
   the midpoint. Instead only high-confidence interior pixels are classified,
   and the boundary ring inherits its label from the nearest classified pixel
   via a Euclidean distance transform. Boundaries then land exactly where the
   two regions meet.

2. Supersampled masks. The image is resampled up before classification, so a
   traced edge is quantised at half (or a third of) a source pixel. Curves come
   out visibly smoother, and the coordinates are divided back down on emit.
"""

from __future__ import annotations

import math
import re

import numpy as np
import potrace
from PIL import Image, ImageDraw
from scipy import ndimage

# ─── Brand palette ─────────────────────────────────────────────────────────
# Anchors are seeds, not the final answer: refine_palette() replaces each with
# the median of the pixels that chose it, so the emitted hexes are the
# artwork's own colours rather than these approximations.
ANCHORS = {
    "navy": (10, 31, 70),
    "blue": (48, 132, 228),
    # The ear's leaf and the darker tail sweeps are a deeper royal blue, not a
    # shade of either neighbour. Without it as its own entry the whole leaf
    # sits too far from every anchor to be trusted and gets absorbed by the
    # navy outline around it.
    "royal": (45, 102, 204),
    "mist": (200, 216, 228),
    "steel": (44, 100, 172),
    "white": (255, 255, 255),
}

# Which palette entries may appear in which part of the lockup. Restricting
# this is what stops the tagline's steel from being detected inside the fox.
REGION_PALETTE = {
    "fox": ["navy", "blue", "royal", "mist"],
    "wordmark": ["navy", "blue"],
    "tagline": ["steel"],
}

# Paint order, back to front. Navy is the outline and goes last so it covers
# every seam underneath it.
Z_ORDER = ["white", "mist", "blue", "royal", "steel", "navy"]

INK_T = 18.0    # distance from background that counts as "not background"
# A pixel seeds a class only if it is both near its colour in absolute terms
# and decisively nearer to it than to the runner-up. The absolute bound alone
# cannot work: palette spacing is uneven (royal/blue are 47 apart, navy/white
# 250), so one threshold is either too loose for the close pair or too tight
# for the far one. The ratio test is spacing-free — a true blend of two
# palette colours sits near the midpoint and scores ~1.0.
CORE_ABS = 45.0
CORE_RATIO = 0.55


# ─── Source loading ────────────────────────────────────────────────────────

def load(path: str, scale: int = 2):
    """Return (rgb, bg, scale). rgb is float32 HxWx3 at `scale`x the source."""
    img = Image.open(path).convert("RGB")
    if scale != 1:
        img = img.resize((img.width * scale, img.height * scale), Image.LANCZOS)
    rgb = np.asarray(img, dtype=np.float32)
    corners = np.concatenate([rgb[:80, :80], rgb[:80, -80:], rgb[-80:, :80], rgb[-80:, -80:]])
    bg = corners.reshape(-1, 3).mean(axis=0)
    return rgb, bg, scale


def ink_mask(rgb, bg, t: float = INK_T):
    return np.linalg.norm(rgb - bg, axis=2) > t


def row_bands(ink, floor_frac=0.0015, min_h=8):
    """Split the ink mask into horizontal content bands."""
    h, w = ink.shape
    row = ink.sum(axis=1)
    floor = max(3, int(w * floor_frac))
    out, start = [], None
    for y in range(h):
        if row[y] > floor and start is None:
            start = y
        elif row[y] <= floor and start is not None:
            if y - start > min_h:
                out.append((start, y - 1))
            start = None
    if start is not None:
        out.append((start, h - 1))
    return out


# ─── Classification ────────────────────────────────────────────────────────

def _nearest(rgb, cols):
    """Per-pixel nearest palette index, its distance, and the runner-up's.

    One colour at a time: the broadcast form allocates HxWxKx3 floats and is
    the peak-memory step of the whole pipeline at supersampled sizes.
    """
    h, w, _ = rgb.shape
    best = np.full((h, w), np.inf, dtype=np.float32)
    second = np.full((h, w), np.inf, dtype=np.float32)
    nearest = np.zeros((h, w), dtype=np.int16)
    for j, c in enumerate(cols):
        d = np.linalg.norm(rgb - np.asarray(c, dtype=np.float32), axis=2)
        closer = d < best
        second = np.where(closer, best, np.minimum(second, d))
        best = np.where(closer, d, best)
        nearest[closer] = j
    return nearest, best, second


def _is_core(best, second):
    return (best < CORE_ABS) & (best < CORE_RATIO * second)


def refine_palette(rgb, names, rounds=3):
    """Median-refine the anchors against the pixels that actually chose them.

    White is held fixed — it is the paper, not a measured brand colour, and
    letting it drift would pull it into the pale shading tint.
    """
    cols = np.array([ANCHORS[n] for n in names], dtype=np.float32)
    for _ in range(rounds):
        lab, best, second = _nearest(rgb, cols)
        core = _is_core(best, second)
        for j, n in enumerate(names):
            if n == "white":
                continue
            sel = rgb[(lab == j) & core]
            if len(sel) > 200:
                cols[j] = np.median(sel, axis=0)
    return {n: tuple(int(round(v)) for v in c) for n, c in zip(names, cols)}


def classify(rgb, names, palette):
    """Label EVERY pixel, background included, with a palette index.

    Anti-aliased pixels are blends of two brand colours and land far from
    every anchor, so they are deliberately left unlabelled and then filled
    from the nearest confident pixel. The boundary lands at the midpoint of
    the blend, which is where the two flat regions actually meet — rather
    than wherever a third palette entry happens to sit near the midpoint.
    """
    cols = np.array([palette[n] for n in names], dtype=np.float32)
    nearest, best, second = _nearest(rgb, cols)
    core = _is_core(best, second)
    labels = np.full(nearest.shape, -1, dtype=np.int16)
    labels[core] = nearest[core]
    return propagate(labels, np.ones(labels.shape, bool), core)


def propagate(labels, domain, seeds):
    """Fill unlabelled pixels of `domain` from the nearest seed's label."""
    if not seeds.any():
        return labels
    _, idx = ndimage.distance_transform_edt(~seeds, return_indices=True)
    filled = labels[idx[0], idx[1]]
    out = np.where(domain & (labels < 0), filled, labels)
    out[~domain] = -1
    return out.astype(np.int16)


def smooth_labels(labels, domain, k, n_classes):
    """Box-vote smoothing of a label map.

    The boundary between two classes comes out of a distance transform, which
    is exact but pixel-staircased; potrace then faithfully traces the
    staircase and the path data balloons. A local majority vote straightens
    those boundaries without moving them.
    """
    size = 2 * k + 1
    votes = np.stack([
        ndimage.uniform_filter((labels == j).astype(np.float32), size=size)
        for j in range(n_classes)
    ])
    out = votes.argmax(0).astype(np.int16)
    out[~domain] = -1
    return out


def enclosed_by(mask, host, min_frac=0.75, ring=3):
    """Keep only the components of `mask` whose border is mostly against
    `host`.

    The ear's leaf is a deliberate flat tone ringed by the navy outline. The
    same colour also turns up as the dark end of a gradient inside the blue
    sweeps, where it is not a shape at all — just where a smooth ramp happens
    to cross a palette boundary, which is what breaks those sweeps into
    blotches. Being surrounded by the outline is what separates the two.
    """
    lab, n = ndimage.label(mask)
    keep = np.zeros_like(mask)
    for i in range(1, n + 1):
        comp = lab == i
        border = ndimage.binary_dilation(comp, np.ones((ring, ring), bool)) & ~comp
        total = border.sum()
        if total and (border & host).sum() / total >= min_frac:
            keep |= comp
    return keep


def exterior(white_mask):
    """The background component(s) of the white class — everything reachable
    from the crop border. What's left is enclosed fur."""
    lab, n = ndimage.label(white_mask)
    if n == 0:
        return np.zeros_like(white_mask)
    edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    edge = edge[edge != 0]
    return np.isin(lab, edge)


def fill_small_holes(mask, max_px):
    """Close pinholes without filling the counters of an 'o'."""
    holes = ndimage.binary_fill_holes(mask) & ~mask
    lab, n = ndimage.label(holes)
    if n == 0:
        return mask
    sizes = ndimage.sum_labels(holes, lab, range(1, n + 1))
    small = np.isin(lab, 1 + np.flatnonzero(sizes <= max_px))
    return mask | small


def despeckle(mask, min_px):
    """Drop connected components below min_px."""
    lab, n = ndimage.label(mask)
    if n == 0:
        return mask
    sizes = ndimage.sum_labels(mask, lab, range(1, n + 1))
    keep = np.isin(lab, 1 + np.flatnonzero(sizes >= min_px))
    return keep


def open_close(mask, open_r=0, close_r=0):
    """Morphological cleanup with a disc kernel."""
    def disc(r):
        y, x = np.ogrid[-r:r + 1, -r:r + 1]
        return x * x + y * y <= r * r
    if open_r:
        mask = ndimage.binary_opening(mask, disc(open_r))
    if close_r:
        mask = ndimage.binary_closing(mask, disc(close_r))
    return mask


# ─── Tracing ───────────────────────────────────────────────────────────────

def _xy(p):
    """potracer hands back either a Point or a plain pair."""
    if hasattr(p, "x"):
        return float(p.x), float(p.y)
    return float(p[0]), float(p[1])


def trace(mask, turdsize=4, alphamax=1.0, opttolerance=0.2):
    """Vectorise a boolean mask. Returns a list of subpaths.

    Each subpath is (start_xy, [segments]) where a segment is either
    ('L', end) or ('C', c1, c2, end).
    """
    if not mask.any():
        return []
    # potracer's Bitmap assumes image convention (high = white = background)
    # and unconditionally inverts, so hand it the complement of our mask.
    bmp = potrace.Bitmap(~mask.astype(bool))
    path = bmp.trace(
        turdsize=turdsize,
        turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
        alphamax=alphamax,
        opticurve=True,
        opttolerance=opttolerance,
    )
    out = []
    for curve in path:
        segs = []
        for seg in curve:
            if seg.is_corner:
                segs.append(("L", _xy(seg.c)))
                segs.append(("L", _xy(seg.end_point)))
            else:
                segs.append(("C", _xy(seg.c1), _xy(seg.c2), _xy(seg.end_point)))
        out.append((_xy(curve.start_point), segs))
    return out


def _n(v, prec):
    """Shortest round-trip-safe decimal for an SVG coordinate."""
    s = f"{v:.{prec}f}".rstrip("0").rstrip(".")
    return "0" if s in ("", "-0") else s


def path_d(subpaths, ox=0.0, oy=0.0, scale=1.0, prec=2):
    """Emit SVG path data, translated to a local origin and scaled down."""
    def T(p):
        return ((p[0] - ox) / scale, (p[1] - oy) / scale)

    parts = []
    for start, segs in subpaths:
        x, y = T(start)
        parts.append(f"M{_n(x, prec)} {_n(y, prec)}")
        for seg in segs:
            if seg[0] == "L":
                x, y = T(seg[1])
                parts.append(f"L{_n(x, prec)} {_n(y, prec)}")
            else:
                c1, c2, e = T(seg[1]), T(seg[2]), T(seg[3])
                parts.append(
                    f"C{_n(c1[0], prec)} {_n(c1[1], prec)} "
                    f"{_n(c2[0], prec)} {_n(c2[1], prec)} "
                    f"{_n(e[0], prec)} {_n(e[1], prec)}"
                )
        parts.append("Z")
    d = "".join(parts)
    # `L` after a coordinate needs no separator; squeeze the ones that crept in.
    return re.sub(r"\s+([A-Z])", r"\1", d)


# ─── Rasterising our own output (verification + PNG export) ────────────────
# No SVG rasteriser is installed, and shelling one out would put the exports
# a step further from the paths actually shipped. Flattening the same curves
# we emit means a PNG export IS a render of the SVG.

def _flatten(subpaths, tol=0.25):
    polys = []
    for start, segs in subpaths:
        pts = [start]
        cur = start
        for seg in segs:
            if seg[0] == "L":
                pts.append(seg[1])
                cur = seg[1]
            else:
                c1, c2, e = seg[1], seg[2], seg[3]
                # Subdivision count from control-polygon length keeps small
                # curves cheap and long sweeps smooth.
                ln = (math.dist(cur, c1) + math.dist(c1, c2) + math.dist(c2, e))
                n = max(3, min(64, int(ln / max(tol, 0.05))))
                for i in range(1, n + 1):
                    t = i / n
                    mt = 1 - t
                    x = (mt ** 3 * cur[0] + 3 * mt * mt * t * c1[0]
                         + 3 * mt * t * t * c2[0] + t ** 3 * e[0])
                    y = (mt ** 3 * cur[1] + 3 * mt * mt * t * c1[1]
                         + 3 * mt * t * t * c2[1] + t ** 3 * e[1])
                    pts.append((x, y))
                cur = e
        polys.append(pts)
    return polys


def _hex_rgb(c):
    c = c.lstrip("#")
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def rasterize(layers, vb_w, vb_h, out_w, ss=4):
    """Render [(path_d_subpaths, '#rrggbb'), ...] to an RGBA image.

    `layers` carries subpaths already expressed in the SVG's own user units
    (same numbers as the emitted `d`), so this is a render of the shipped
    vector, not a second pass over the JPEG.

    Even-odd fill is XOR of each contour's coverage — exactly what the rule
    means for the non-self-intersecting contours potrace produces.
    """
    out_h = max(1, int(round(out_w * vb_h / vb_w)))
    w, h = out_w * ss, out_h * ss
    k = w / vb_w
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    for subpaths, colour in layers:
        acc = np.zeros((h, w), dtype=bool)
        for poly in _flatten(subpaths, tol=0.6 / k):
            if len(poly) < 3:
                continue
            layer = Image.new("1", (w, h), 0)
            ImageDraw.Draw(layer).polygon([(px * k, py * k) for px, py in poly], fill=1)
            acc ^= np.asarray(layer, dtype=bool)
        if not acc.any():
            continue
        tile = Image.new("RGBA", (w, h), _hex_rgb(colour) + (255,))
        canvas.paste(tile, (0, 0), Image.fromarray((acc * 255).astype(np.uint8), "L"))
    return canvas.resize((out_w, out_h), Image.LANCZOS)


# ─── SVG assembly ──────────────────────────────────────────────────────────

SVG_OPEN = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
    'width="{w}" height="{h}" fill="none" role="img" aria-label="{label}">'
)


def svg(w, h, label, groups, title=None):
    """groups: [(group_id, transform_or_None, [(d, fill, path_id), ...]), ...]
    in paint order."""
    out = [SVG_OPEN.format(w=_n(w, 2), h=_n(h, 2), label=label)]
    if title:
        out.append(f"<title>{title}</title>")
    for gid, tf, members in groups:
        tfattr = f' transform="{tf}"' if tf else ""
        out.append(f'<g id="{gid}"{tfattr}>')
        for d, fill, pid in members:
            idattr = f' id="{pid}"' if pid else ""
            out.append(f'<path{idattr} fill="{fill}" fill-rule="evenodd" d="{d}"/>')
        out.append("</g>")
    out.append("</svg>")
    return "".join(out) + "\n"


def to_native(subpaths, ox, oy, scale):
    """Map traced crop-space coordinates back to source-pixel coordinates."""
    def T(p):
        return (ox + p[0] / scale, oy + p[1] / scale)

    out = []
    for start, segs in subpaths:
        ns = []
        for seg in segs:
            ns.append(("L", T(seg[1])) if seg[0] == "L"
                      else ("C", T(seg[1]), T(seg[2]), T(seg[3])))
        out.append((T(start), ns))
    return out


def bbox(subpaths):
    """Tight bounds of the flattened geometry."""
    xs, ys = [], []
    for poly in _flatten(subpaths, tol=0.4):
        for x, y in poly:
            xs.append(x)
            ys.append(y)
    if not xs:
        return None
    return min(xs), min(ys), max(xs), max(ys)


def bbox_all(groups):
    boxes = [bbox(sp) for sp in groups if sp]
    boxes = [b for b in boxes if b]
    if not boxes:
        return None
    return (min(b[0] for b in boxes), min(b[1] for b in boxes),
            max(b[2] for b in boxes), max(b[3] for b in boxes))


def shift(subpaths, dx, dy):
    def T(p):
        return (p[0] + dx, p[1] + dy)

    out = []
    for start, segs in subpaths:
        ns = []
        for seg in segs:
            ns.append(("L", T(seg[1])) if seg[0] == "L"
                      else ("C", T(seg[1]), T(seg[2]), T(seg[3])))
        out.append((T(start), ns))
    return out
