"""Report raw and gzipped weight of the emitted SVGs — gzip is what the CDN
actually ships, so it is the number worth optimising against."""

import glob
import gzip
import os

total_raw = total_gz = 0
for p in sorted(glob.glob("public/brand/*.svg")):
    raw = open(p, "rb").read()
    gz = len(gzip.compress(raw, 9))
    total_raw += len(raw)
    total_gz += gz
    print(f"{os.path.basename(p):<30} {len(raw) / 1024:7.1f} KB   gzip {gz / 1024:6.1f} KB")
print(f"{'TOTAL':<30} {total_raw / 1024:7.1f} KB   gzip {total_gz / 1024:6.1f} KB")
