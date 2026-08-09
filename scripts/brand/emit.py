"""
Compose traced geometry into the shipped asset set: SVGs, PNGs and icons.

Transforms are baked into the coordinates rather than expressed as SVG
`transform` attributes, so the PNG rasteriser and the SVG describe exactly the
same numbers and a raster export is a true render of the vector.
"""

from __future__ import annotations

import os

from PIL import Image

import foxlib as F

PAD_ICON = 0.06   # breathing room inside square icons, as a fraction of the side
WHITE = "#FFFFFF"


def xform(subpaths, s=1.0, dx=0.0, dy=0.0):
    def T(p):
        return (p[0] * s + dx, p[1] * s + dy)

    out = []
    for start, segs in subpaths:
        ns = []
        for seg in segs:
            ns.append(("L", T(seg[1])) if seg[0] == "L"
                      else ("C", T(seg[1]), T(seg[2]), T(seg[3])))
        out.append((T(start), ns))
    return out


class Asset:
    """A composed artwork: painted layers plus the viewBox that hugs them."""

    def __init__(self, layers, pad=0.0):
        # layers: [(group_id, [(subpaths, fill)])] in paint order
        self.layers = layers
        allsp = [sp for _, members in layers for sp, _ in members]
        x0, y0, x1, y1 = F.bbox_all(allsp)
        x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
        self.w, self.h = x1 - x0, y1 - y0
        self.layers = [
            (gid, [(xform(sp, 1.0, -x0, -y0), fill) for sp, fill in members])
            for gid, members in layers
        ]

    def squared(self, pad_frac=PAD_ICON):
        """Re-centre into a square viewBox with proportional padding."""
        side = max(self.w, self.h) * (1 + 2 * pad_frac)
        dx, dy = (side - self.w) / 2, (side - self.h) / 2
        a = Asset.__new__(Asset)
        a.w = a.h = side
        a.layers = [(gid, [(xform(sp, 1.0, dx, dy), fill) for sp, fill in members])
                    for gid, members in self.layers]
        return a

    def recolour(self, fill):
        a = Asset.__new__(Asset)
        a.w, a.h = self.w, self.h
        a.layers = [(gid, [(sp, fill) for sp, _ in members]) for gid, members in self.layers]
        return a

    def svg(self, label, title=None, prec=1):
        # One decimal on a ~1300-unit viewBox is a 0.008% coordinate error —
        # far below a device pixel at any size the logo is used, and it nearly
        # halves the path data versus two decimals.
        groups = []
        for gid, members in self.layers:
            paths = []
            for sp, fill in members:
                d = F.path_d(sp, 0, 0, 1.0, prec)
                paths.append((d, fill, None))
            groups.append((gid, None, paths))
        return F.svg(round(self.w, 2), round(self.h, 2), label, groups, title)

    def png(self, out_w, ss=4, bg=None):
        flat = [(sp, fill) for _, members in self.layers for sp, fill in members]
        im = F.rasterize(flat, self.w, self.h, out_w, ss=ss)
        if bg:
            plate = Image.new("RGBA", im.size, F._hex_rgb(bg) + (255,))
            plate.alpha_composite(im)
            im = plate
        return im


def write(path, text):
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
    return os.path.getsize(path)


def write_all(geo, COL, out):
    os.makedirs(out, exist_ok=True)
    written = []

    def rec(name, size):
        written.append((name, size))
        print(f"    {name:<34} {size / 1024:7.1f} KB", flush=True)

    fox, word, tag = geo["fox"], geo["wordmark"], geo["tagline"]

    fox_layers = [(c, COL[c]) for c in F.Z_ORDER if c in fox and c != "white"]
    fox_full = [("fox", [(fox["white"], WHITE)] + [(fox[c], col) for c, col in fox_layers])]
    fox_knock = [("fox", [(fox[c], col) for c, col in fox_layers])]

    # Type layers come from the fonts, so they are keyed by role rather than by
    # colour class: the letters, the separately-coloured tittle, and the rules
    # that flank the tagline.
    word_layers = [("wordmark",
                    [(word["text"], COL["navy"])]
                    + ([(word["dot"], COL["blue"])] if "dot" in word else []))]
    tag_layers = [("tagline",
                   [(tag["text"], COL["steel"])]
                   + ([(tag["rules"], COL["steel"])] if "rules" in tag else []))]

    A_fox = Asset(fox_full)
    A_fox_knock = Asset(fox_knock)
    A_word = Asset(word_layers)
    A_tag = Asset(tag_layers)
    A_full = Asset(fox_full + word_layers + tag_layers)
    A_lockup = Asset(fox_full + word_layers)

    # ─── Horizontal lockup ────────────────────────────────────────────────
    # Mark set to twice the wordmark's cap block, optically centred, with a
    # gap keyed to the wordmark height so it survives any rescale.
    fb, wb = F.bbox_all([sp for sp, _ in A_fox.layers[0][1]]), F.bbox_all([sp for sp, _ in A_word.layers[0][1]])
    fw, fh = fb[2] - fb[0], fb[3] - fb[1]
    ww, wh = wb[2] - wb[0], wb[3] - wb[1]
    k = (wh * 2.0) / fh
    gap = wh * 0.55
    fox_h = [(gid, [(xform(sp, k, 0, 0), fill) for sp, fill in members]) for gid, members in A_fox.layers]
    fox_h_h = fh * k
    cy = max(fox_h_h, wh) / 2
    fox_h = [(gid, [(xform(sp, 1.0, 0, cy - fox_h_h / 2), fill) for sp, fill in members]) for gid, members in fox_h]
    word_h = [(gid, [(xform(sp, 1.0, fw * k + gap, cy - wh / 2), fill) for sp, fill in members])
              for gid, members in A_word.layers]
    A_horiz = Asset(fox_h + word_h)

    # ─── SVGs ─────────────────────────────────────────────────────────────
    SVGS = [
        ("logo-full.svg", A_full, "LogixLoops", "LogixLoops — Your Unfair Advantage"),
        ("logo-lockup.svg", A_lockup, "LogixLoops", "LogixLoops"),
        ("logo-horizontal.svg", A_horiz, "LogixLoops", "LogixLoops"),
        ("logo-fox.svg", A_fox, "LogixLoops fox mark", "LogixLoops"),
        ("logo-fox-knockout.svg", A_fox_knock, "LogixLoops fox mark", "LogixLoops"),
        ("logo-wordmark.svg", A_word, "LogixLoops", "LogixLoops"),
        ("logo-tagline.svg", A_tag, "Your Unfair Advantage", "Your Unfair Advantage"),
        ("icon.svg", A_fox.squared(), "LogixLoops", "LogixLoops"),
    ]
    for fn, asset, label, title in SVGS:
        rec(fn, write(os.path.join(out, fn), asset.svg(label, title)))

    # ─── Single-colour variants ───────────────────────────────────────────
    mono_fox = [("fox", [(fox["_mono"], COL["navy"])])]
    mono_full = [("fox", [(fox["_mono"], COL["navy"])]),
                 ("wordmark", [(word["_mono"], COL["navy"])]),
                 ("tagline", [(tag["_mono"], COL["navy"])])]
    A_mono_fox = Asset(mono_fox)
    A_mono_full = Asset(mono_full)
    MONO = [
        ("logo-full-navy.svg", A_mono_full, COL["navy"]),
        ("logo-full-white.svg", A_mono_full, "#FFFFFF"),
        ("logo-fox-navy.svg", A_mono_fox, COL["navy"]),
        ("logo-fox-white.svg", A_mono_fox, "#FFFFFF"),
        ("logo-wordmark-navy.svg", Asset([("wordmark", [(word["_mono"], COL["navy"])])]), COL["navy"]),
        ("logo-wordmark-white.svg", Asset([("wordmark", [(word["_mono"], COL["navy"])])]), "#FFFFFF"),
    ]
    for fn, asset, fill in MONO:
        rec(fn, write(os.path.join(out, fn), asset.recolour(fill).svg("LogixLoops", "LogixLoops")))

    # ─── Rasters ──────────────────────────────────────────────────────────
    png_dir = os.path.join(out, "png")
    os.makedirs(png_dir, exist_ok=True)

    def save_png(asset, name, width, ss=4, bg=None, sub=png_dir):
        im = asset.png(width, ss=ss, bg=bg)
        p = os.path.join(sub, name)
        im.save(p, optimize=True)
        rec(os.path.relpath(p, out).replace("\\", "/"), os.path.getsize(p))
        return im

    for w in (256, 512, 1024):
        save_png(A_fox, f"logo-fox-{w}.png", w, ss=4 if w <= 512 else 3)
    for w in (512, 1024, 2048):
        save_png(A_full, f"logo-full-{w}.png", w, ss=4 if w <= 512 else 2)
    save_png(A_word, "logo-wordmark-1024.png", 1024, ss=3)
    save_png(A_horiz, "logo-horizontal-1024.png", 1024, ss=3)
    save_png(A_mono_full.recolour("#FFFFFF"), "logo-full-white-1024.png", 1024, ss=3)

    # ─── Icons ────────────────────────────────────────────────────────────
    sq = A_fox.squared()
    icons = {}
    for w in (16, 32, 48, 64, 96, 128, 180, 192, 256, 512):
        icons[w] = sq.png(w, ss=8 if w <= 64 else 4)

    for w in (192, 512):
        p = os.path.join(out, f"icon-{w}.png")
        icons[w].save(p, optimize=True)
        rec(f"icon-{w}.png", os.path.getsize(p))

    # Maskable icons are cropped to a platform-chosen shape; keep the art
    # inside the 80% safe circle and give it an opaque plate.
    maskable = A_fox.squared(pad_frac=0.30).png(512, ss=4, bg=WHITE)
    p = os.path.join(out, "icon-512-maskable.png")
    maskable.save(p, optimize=True)
    rec("icon-512-maskable.png", os.path.getsize(p))

    apple = A_fox.squared(pad_frac=0.11).png(180, ss=6, bg=WHITE)
    p = os.path.join(out, "apple-touch-icon.png")
    apple.save(p, optimize=True)
    rec("apple-touch-icon.png", os.path.getsize(p))

    ico = os.path.join(out, "favicon.ico")
    icons[256].save(ico, format="ICO",
                    sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
    rec("favicon.ico", os.path.getsize(ico))

    total = sum(s for _, s in written)
    print(f"\n  {len(written)} files, {total / 1024:.1f} KB total", flush=True)
    return written
