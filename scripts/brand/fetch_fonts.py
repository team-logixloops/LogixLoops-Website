"""
Fetch the two typefaces the lockup is set in, as variable TTFs from the
upstream google/fonts repository, then freeze the weights we need into static
instances.

Upstream rather than the Google Fonts CSS API on purpose: the API's legacy
endpoint no longer serves plain sfnt data, and its modern endpoint serves
woff2, which needs a Brotli decoder before fontTools can open it. The repo
serves the real variable TTF.

    python scripts/brand/fetch_fonts.py
"""

import os
import urllib.request

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")

SOURCES = {
    "Orbitron": (
        "https://raw.githubusercontent.com/google/fonts/main/ofl/orbitron/Orbitron%5Bwght%5D.ttf",
        [400, 500, 600, 700, 800, 900],
    ),
    "Inter": (
        "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf",
        [400, 500, 600, 700, 800, 900],
    ),
}


def main():
    os.makedirs(DEST, exist_ok=True)
    for family, (url, weights) in SOURCES.items():
        var_path = os.path.join(DEST, f"{family}-variable.ttf")
        if not os.path.exists(var_path):
            req = urllib.request.Request(url, headers={"User-Agent": "brand-pipeline"})
            with urllib.request.urlopen(req, timeout=120) as r:
                data = r.read()
            assert data[:4] in (b"\x00\x01\x00\x00", b"true", b"OTTO"), f"not sfnt: {data[:4]!r}"
            with open(var_path, "wb") as fh:
                fh.write(data)
            print(f"  {family} variable  {len(data) / 1024:7.1f} KB")

        for w in weights:
            out = os.path.join(DEST, f"{family}-{w}.ttf")
            if os.path.exists(out):
                continue
            font = TTFont(var_path)
            axes = {"wght": w}
            # Inter is a two-axis font; pin optical size to its text end so the
            # instance matches what a browser renders at wordmark sizes.
            if "opsz" in {a.axisTag for a in font["fvar"].axes}:
                axes["opsz"] = 14
            instancer.instantiateVariableFont(font, axes, inplace=True, updateFontNames=False)
            font.save(out)
            print(f"  {family} {w:>3}     {os.path.getsize(out) / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
