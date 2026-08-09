"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

/**
 * LogoPuzzle, a 20-piece jigsaw of the fox mark, cut with classic
 * interlocking tabs and assembled by dragging.
 *
 * The cut geometry is the well-known Bezier tab construction: each internal
 * boundary is generated once as a `Side`, then handed to the piece above it
 * as-is and to the piece below it reversed, so neighbouring outlines are
 * exact complements and merged groups have no seam artefacts.
 *
 * Coordinate system: pieces live in *source* space (0,0 → imgW,imgH) and a
 * group carries a single (x, y) translation. Two groups are therefore
 * correctly aligned precisely when their offsets match, which is what makes
 * snapping a distance test on the offsets rather than per-piece geometry.
 *
 * Decoration only, every real navigation target on the 404 page lives in
 * the link columns below, so there is no keyboard drag equivalent here.
 */

const SRC = "/brand/logo-fox-white.svg";
const FOX_W = 947.42;
const FOX_H = 745.84;

const NX = 5; // columns
const NY = 4; // rows
const BOARD_RATIO = 0.68; // board height as a fraction of its width
const IMG_FRACTION = 0.6; // assembled image width as a fraction of the board
const SOLVE_MS = 900;
const HINT_MS = 700;

// Scatter grid. Wider than the piece grid so there are spare cells to draw
// from, and the top-right ones are skipped outright, that corner belongs to
// the reference plate, and a piece that starts underneath it reads as a
// missing piece.
const SCATTER_COLS = 6;
const SCATTER_ROWS = 4;
const RESERVED_ROWS = 2; // rows of the last column skipped

// The reference plate's box, mirroring the classes on the <figure>. Skipping
// cells is not enough on its own: a piece's bounding box includes its tabs,
// which makes it wider than a cell, so a neighbouring cell can still reach
// under the plate. The scatter uses this as a hard keep-out.
const REF_PAD = 8; // right-2 / top-2
const REF_FRACTION = 0.14; // w-[14%]
const REF_MIN = 64; // min-w-[64px]
const REF_MAX = 104; // max-w-[104px]
const REF_CAPTION = 20; // mt-1 + the 11px caption line

const referenceBox = (boardW) => {
  const w = clamp(boardW * REF_FRACTION, REF_MIN, REF_MAX);
  return {
    x0: boardW - REF_PAD - w,
    y0: REF_PAD,
    y1: REF_PAD + w * (FOX_H / FOX_W) + REF_CAPTION,
  };
};

const rnd = (min, max) => min + (max - min) * Math.random();
const lerp = (p0, p1, a) => ({
  x: p0.x * (1 - a) + p1.x * a,
  y: p0.y * (1 - a) + p1.y * a,
});
const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/* ─────────────────────────────────────────────────────────────
 * Geometry
 * ───────────────────────────────────────────────────────────── */

class Side {
  constructor(p0, p1) {
    this.type = "d"; // "d" straight, "z" tabbed
    this.points = [p0, p1];
  }

  reversed() {
    const s = new Side();
    s.type = this.type;
    s.points = this.points.slice().reverse();
    return s;
  }

  draw(path, first) {
    if (first) path.moveTo(this.points[0].x, this.points[0].y);
    if (this.type === "d") {
      path.lineTo(this.points[1].x, this.points[1].y);
      return;
    }
    for (let k = 1; k < this.points.length - 1; k += 3) {
      path.bezierCurveTo(
        this.points[k].x,
        this.points[k].y,
        this.points[k + 1].x,
        this.points[k + 1].y,
        this.points[k + 2].x,
        this.points[k + 2].y
      );
    }
  }
}

/**
 * Turns a straight side into the classic tabbed one. `ca`/`cb` are the two
 * corners of the opposite side, they define which way the tab bulges, so
 * passing the corners of either adjoining piece flips tab vs blank.
 */
function twist(side, ca, cb) {
  const p0 = side.points[0];
  const p1 = side.points[1];
  const dxh = p1.x - p0.x;
  const dyh = p1.y - p0.y;

  const mid0 = lerp(p0, p1, 0.5);
  const mid1 = lerp(ca, cb, 0.5);
  const dxv = mid1.x - mid0.x;
  const dyv = mid1.y - mid0.y;

  const scalex = rnd(0.8, 1);
  const scaley = rnd(0.9, 1);
  const mid = rnd(0.45, 0.55);

  const at = (ch, cv) => ({
    x: p0.x + ch * dxh + cv * dxv,
    y: p0.y + ch * dyh + cv * dyv,
  });

  const pa = at(mid - (1 / 12) * scalex, (1 / 12) * scaley);
  const pb = at(mid - (2 / 12) * scalex, (3 / 12) * scaley);
  const pc = at(mid, (4 / 12) * scaley);
  const pd = at(mid + (2 / 12) * scalex, (3 / 12) * scaley);
  const pe = at(mid + (1 / 12) * scalex, (1 / 12) * scaley);

  side.points = [
    p0,
    { x: p0.x + (5 / 12) * dxh * 0.52, y: p0.y + (5 / 12) * dyh * 0.52 },
    { x: pa.x - (1 / 12) * dxv * 0.72, y: pa.y - (1 / 12) * dyv * 0.72 },
    pa,
    { x: pa.x + (1 / 12) * dxv * 0.72, y: pa.y + (1 / 12) * dyv * 0.72 },
    { x: pb.x - (1 / 12) * dxv * 0.92, y: pb.y - (1 / 12) * dyv * 0.92 },
    pb,
    { x: pb.x + (1 / 12) * dxv * 0.52, y: pb.y + (1 / 12) * dyv * 0.52 },
    { x: pc.x - (2 / 12) * dxh * 0.4, y: pc.y - (2 / 12) * dyh * 0.4 },
    pc,
    { x: pc.x + (2 / 12) * dxh * 0.4, y: pc.y + (2 / 12) * dyh * 0.4 },
    { x: pd.x + (1 / 12) * dxv * 0.52, y: pd.y + (1 / 12) * dyv * 0.52 },
    pd,
    { x: pd.x - (1 / 12) * dxv * 0.92, y: pd.y - (1 / 12) * dyv * 0.92 },
    { x: pe.x + (1 / 12) * dxv * 0.72, y: pe.y + (1 / 12) * dyv * 0.72 },
    pe,
    { x: pe.x - (1 / 12) * dxv * 0.72, y: pe.y - (1 / 12) * dyv * 0.72 },
    { x: p1.x - (5 / 12) * dxh * 0.52, y: p1.y - (5 / 12) * dyh * 0.52 },
    p1,
  ];
  side.type = "z";
}

function bboxOfSides(sides) {
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;
  sides.forEach((s) =>
    s.points.forEach((p) => {
      if (p.x < minx) minx = p.x;
      if (p.x > maxx) maxx = p.x;
      if (p.y < miny) miny = p.y;
      if (p.y > maxy) maxy = p.y;
    })
  );
  return { minx, maxx, miny, maxy };
}

/**
 * Cuts an imgW x imgH rectangle into NX x NY pieces. Sides are generated per
 * boundary, not per piece, so each shared edge exists exactly once.
 */
function buildPieces(imgW, imgH) {
  const pw = imgW / NX;
  const ph = imgH / NY;
  const at = (kx, ky) => ({ x: kx * pw, y: ky * ph });

  // hSides[ky][kx], horizontal boundary above row ky, running left → right.
  // vSides[ky][kx], vertical boundary left of column kx, running top → bottom.
  const hSides = [];
  const vSides = [];

  for (let ky = 0; ky <= NY; ky++) {
    hSides[ky] = [];
    for (let kx = 0; kx < NX; kx++) {
      const side = new Side(at(kx, ky), at(kx + 1, ky));
      if (ky > 0 && ky < NY) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        twist(side, at(kx, ky + dir), at(kx + 1, ky + dir));
      }
      hSides[ky][kx] = side;
    }
  }

  for (let ky = 0; ky < NY; ky++) {
    vSides[ky] = [];
    for (let kx = 0; kx <= NX; kx++) {
      const side = new Side(at(kx, ky), at(kx, ky + 1));
      if (kx > 0 && kx < NX) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        twist(side, at(kx + dir, ky), at(kx + dir, ky + 1));
      }
      vSides[ky][kx] = side;
    }
  }

  const pieces = [];
  for (let ky = 0; ky < NY; ky++) {
    for (let kx = 0; kx < NX; kx++) {
      // Clockwise: top left→right, right top→bottom, bottom right→left,
      // left bottom→top. listLoops() depends on this winding.
      const ts = hSides[ky][kx];
      const rs = vSides[ky][kx + 1];
      const bs = hSides[ky + 1][kx].reversed();
      const ls = vSides[ky][kx].reversed();
      const piece = { kx, ky, ts, rs, bs, ls };
      Object.assign(piece, bboxOfSides([ts, rs, bs, ls]));
      pieces.push(piece);
    }
  }
  return pieces;
}

/* ─────────────────────────────────────────────────────────────
 * Groups of connected pieces
 * ───────────────────────────────────────────────────────────── */

// Where to look for the next boundary edge, per edge we are standing on.
const TRIES = [
  [
    { dkx: 0, dky: 0, edge: 1 },
    { dkx: 1, dky: 0, edge: 0 },
    { dkx: 1, dky: -1, edge: 3 },
  ],
  [
    { dkx: 0, dky: 0, edge: 2 },
    { dkx: 0, dky: 1, edge: 1 },
    { dkx: 1, dky: 1, edge: 0 },
  ],
  [
    { dkx: 0, dky: 0, edge: 3 },
    { dkx: -1, dky: 0, edge: 2 },
    { dkx: -1, dky: 1, edge: 1 },
  ],
  [
    { dkx: 0, dky: 0, edge: 0 },
    { dkx: 0, dky: -1, edge: 3 },
    { dkx: -1, dky: -1, edge: 2 },
  ],
];

class PolyPiece {
  constructor(piece) {
    this.pieces = [piece];
    this.x = 0;
    this.y = 0;
    this.refresh();
  }

  refresh() {
    Object.assign(
      this,
      bboxOfSides(this.pieces.flatMap((p) => [p.ts, p.rs, p.bs, p.ls]))
    );
    this.listLoops();
    this.buildPaths();
  }

  /**
   * Walks the group's unshared edges into closed loops. A group can have more
   * than one loop (a ring of pieces with a hole in it), hence the outer list.
   */
  listLoops() {
    const has = (kx, ky) =>
      this.pieces.some((p) => p.kx === kx && p.ky === ky);

    const free = [];
    this.pieces.forEach((p, kp) => {
      if (!has(p.kx, p.ky - 1)) free.push({ kx: p.kx, ky: p.ky, edge: 0, kp });
      if (!has(p.kx + 1, p.ky)) free.push({ kx: p.kx, ky: p.ky, edge: 1, kp });
      if (!has(p.kx, p.ky + 1)) free.push({ kx: p.kx, ky: p.ky, edge: 2, kp });
      if (!has(p.kx - 1, p.ky)) free.push({ kx: p.kx, ky: p.ky, edge: 3, kp });
    });

    const indexOfEdge = (kx, ky, edge) =>
      free.findIndex((e) => e.kx === kx && e.ky === ky && e.edge === edge);

    const loops = [];
    while (free.length > 0) {
      const loop = [free.shift()];
      for (;;) {
        const cur = loop[loop.length - 1];
        let found = -1;
        for (let t = 0; t < 3; t++) {
          const step = TRIES[cur.edge][t];
          found = indexOfEdge(cur.kx + step.dkx, cur.ky + step.dky, step.edge);
          if (found !== -1) break;
        }
        if (found === -1) break; // loop closed
        loop.push(free.splice(found, 1)[0]);
      }
      loops.push(loop);
    }

    const sideOf = (e) => {
      const piece = this.pieces[e.kp];
      return [piece.ts, piece.rs, piece.bs, piece.ls][e.edge];
    };
    this.tbLoops = loops.map((loop) => loop.map(sideOf));
  }

  // Only the outline is drawn. Connected pieces read flat, no seam between
  // them, so a joined group looks like one solid shard of the image.
  buildPaths() {
    this.srcPath = new Path2D();
    this.tbLoops.forEach((loop) => {
      const sub = new Path2D();
      loop.forEach((side, k) => side.draw(sub, k === 0));
      this.srcPath.addPath(sub);
    });
  }

  /** True when `other` is both a grid neighbour and dropped close enough. */
  ifNear(other, dConnect) {
    if (Math.hypot(this.x - other.x, this.y - other.y) >= dConnect) return false;
    return this.pieces.some((a) =>
      other.pieces.some(
        (b) =>
          (a.kx === b.kx && Math.abs(a.ky - b.ky) === 1) ||
          (a.ky === b.ky && Math.abs(a.kx - b.kx) === 1)
      )
    );
  }

  /** Absorbs `other`; this group's offset wins, so `other` snaps into place. */
  absorb(other) {
    this.pieces.push(...other.pieces);
    this.refresh();
  }
}

/* ─────────────────────────────────────────────────────────────
 * Drawing
 * ───────────────────────────────────────────────────────────── */

function strokeEmboss(ctx, path, thickness, alpha) {
  ctx.lineWidth = thickness * 1.5;
  ctx.save();
  ctx.translate(thickness / 2, -thickness / 2);
  ctx.strokeStyle = `rgba(8, 29, 74, ${0.4 * alpha})`;
  ctx.stroke(path);
  ctx.translate(-thickness, thickness);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * alpha})`;
  ctx.stroke(path);
  ctx.restore();
}

/**
 * The finished picture: the fox on the same gradient the pieces are cut
 * from. Used both as the reference plate and as the static fallback.
 */
function FoxPlate({ className = "", style }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        aspectRatio: `${FOX_W} / ${FOX_H}`,
        background:
          "linear-gradient(135deg, #081d4a 0%, #2868c6 55%, #378ce7 100%)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC}
        alt="LogixLoops fox mark"
        width={FOX_W}
        height={FOX_H}
        className="w-[84%] select-none"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Component
 * ───────────────────────────────────────────────────────────── */

export default function LogoPuzzle({ className = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const resetRef = useRef(null);
  const hintRef = useRef(null);
  const [playable, setPlayable] = useState(false);
  // "intact", assembled, waiting for Shuffle. "playing", scattered.
  const [phase, setPhase] = useState("intact");
  const [showReference, setShowReference] = useState(true);
  const solved = phase === "solved";

  // Reduced motion or a phone-sized viewport gets the assembled logo instead:
  // dragging a board on a narrow screen fights the page scroll.
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 639px)");
    const update = () => setPlayable(!still.matches && !narrow.matches);
    update();
    still.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      still.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!playable) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let frame = 0;
    let dirty = true;
    let solvedAt = 0;

    let hintAt = 0;
    let hintPoly = null;
    let scattered = false;
    let boardW = 0;
    let boardH = 0;
    let imgW = 0;
    let imgH = 0;
    let dpr = 1;
    let emboss = 2;
    let dConnect = 24;
    let srcImage = null;
    let polys = [];
    let drag = null;

    const image = new Image();

    /** Renders the fox onto a brand gradient at board resolution. */
    const paintSource = () => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(imgW * dpr));
      off.height = Math.max(1, Math.round(imgH * dpr));
      const octx = off.getContext("2d");

      const grad = octx.createLinearGradient(0, 0, off.width, off.height);
      grad.addColorStop(0, "#081d4a");
      grad.addColorStop(0.55, "#2868c6");
      grad.addColorStop(1, "#378ce7");
      octx.fillStyle = grad;
      octx.fillRect(0, 0, off.width, off.height);

      const avail = 0.84;
      const scale = Math.min(
        (off.width * avail) / FOX_W,
        (off.height * avail) / FOX_H
      );
      const dw = FOX_W * scale;
      const dh = FOX_H * scale;
      octx.drawImage(
        image,
        (off.width - dw) / 2,
        (off.height - dh) / 2,
        dw,
        dh
      );
      srcImage = off;
    };

    /**
     * Cuts a fresh puzzle. Intact means every piece joined and centred, the
     * plain logo, so the first thing you see is what you are being asked to
     * rebuild. Scattering is what Shuffle does.
     */
    const build = (shouldScatter) => {
      polys = buildPieces(imgW, imgH).map((p) => new PolyPiece(p));
      dConnect = Math.min(imgW / NX, imgH / NY) / 4;
      scattered = shouldScatter;
      solvedAt = 0;
      hintAt = 0;
      hintPoly = null;
      drag = null;
      dirty = true;

      if (!shouldScatter) {
        const whole = polys[0];
        for (let k = 1; k < polys.length; k++) whole.absorb(polys[k]);
        polys = [whole];
        whole.x = (boardW - imgW) / 2;
        whole.y = (boardH - imgH) / 2;
        setPhase("intact");
        return;
      }

      const cellW = boardW / SCATTER_COLS;
      const cellH = boardH / SCATTER_ROWS;
      const cells = [];
      for (let i = 0; i < SCATTER_COLS * SCATTER_ROWS; i++) {
        const col = i % SCATTER_COLS;
        const row = Math.floor(i / SCATTER_COLS);
        if (col === SCATTER_COLS - 1 && row < RESERVED_ROWS) continue;
        cells.push(i);
      }
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }

      const ref = referenceBox(boardW);

      polys.forEach((poly, i) => {
        const cell = cells[i % cells.length];
        const cx = (cell % SCATTER_COLS) * cellW + cellW / 2;
        const cy = Math.floor(cell / SCATTER_COLS) * cellH + cellH / 2;
        const pw = poly.maxx - poly.minx;
        const ph = poly.maxy - poly.miny;
        poly.x = clamp(
          cx - pw / 2 - poly.minx + rnd(-cellW * 0.12, cellW * 0.12),
          -poly.minx + 2,
          boardW - poly.maxx - 2
        );
        poly.y = clamp(
          cy - ph / 2 - poly.miny + rnd(-cellH * 0.12, cellH * 0.12),
          -poly.miny + 2,
          boardH - poly.maxy - 2
        );

        // Clear of the plate: slide left if there is room, otherwise drop
        // below it. Left first, it keeps the scatter's vertical spread.
        const overlapsRef =
          poly.x + poly.maxx > ref.x0 &&
          poly.y + poly.miny < ref.y1 &&
          poly.y + poly.maxy > ref.y0;
        if (overlapsRef) {
          const toLeft = ref.x0 - 4 - poly.maxx;
          const below = ref.y1 + 4 - poly.miny;
          if (toLeft >= -poly.minx + 2) poly.x = toLeft;
          else if (below <= boardH - poly.maxy - 2) poly.y = below;
        }
      });

      setPhase("playing");
    };

    /**
     * Joins one true neighbour pair for the player and flashes the result,
     * so a stuck board always has a way forward. The smaller group is the
     * one that moves.
     */
    const applyHint = () => {
      if (!srcImage || polys.length < 2) return;

      const pairs = [];
      for (let i = 0; i < polys.length; i++) {
        for (let j = i + 1; j < polys.length; j++) {
          if (polys[i].ifNear(polys[j], Infinity)) pairs.push([polys[i], polys[j]]);
        }
      }
      if (pairs.length === 0) return;

      const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      const host = a.pieces.length >= b.pieces.length ? a : b;
      const guest = host === a ? b : a;

      host.absorb(guest);
      polys.splice(polys.indexOf(guest), 1);
      // The merged group is larger than either half, so it can now stick out
      // of the board, pull it back in before drawing.
      host.x = clamp(host.x, -host.minx + 2, boardW - host.maxx - 2);
      host.y = clamp(host.y, -host.miny + 2, boardH - host.maxy - 2);
      polys.splice(polys.indexOf(host), 1);
      polys.push(host);

      hintPoly = host;
      hintAt = performance.now();
      dirty = true;
      if (polys.length === 1) {
        solvedAt = performance.now();
        setPhase("solved");
      }
    };

    const layout = () => {
      const width = Math.max(280, Math.round(wrap.clientWidth));
      boardW = width;
      boardH = Math.round(width * BOARD_RATIO);
      imgW = Math.round(boardW * IMG_FRACTION);
      imgH = Math.round(imgW * (FOX_H / FOX_W));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      emboss = Math.max(1.5, imgW / NX / 34);

      canvas.width = Math.round(boardW * dpr);
      canvas.height = Math.round(boardH * dpr);
      canvas.style.width = `${boardW}px`;
      canvas.style.height = `${boardH}px`;

      paintSource();
      // A relayout re-cuts the board, so keep whichever state it was in.
      build(scattered);
    };

    const render = (now) => {
      frame = requestAnimationFrame(render);

      const t = solvedAt ? clamp((now - solvedAt) / SOLVE_MS, 0, 1) : 0;
      if (solvedAt && t < 1) dirty = true;

      const hintT = hintAt ? clamp((now - hintAt) / HINT_MS, 0, 1) : 0;
      if (hintAt) {
        dirty = true; // one last frame at hintT === 1 clears the highlight
        if (hintT >= 1) {
          hintAt = 0;
          hintPoly = null;
        }
      }

      if (!dirty) return;
      dirty = false;

      const solveGlow = solvedAt ? Math.sin(t * Math.PI) * 0.9 : 0;
      const hintGlow = hintAt ? Math.sin(hintT * Math.PI) * 0.9 : 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, boardW, boardH);

      polys.forEach((poly) => {
        const matrix = new DOMMatrix([1, 0, 0, 1, poly.x, poly.y]);
        const path = new Path2D();
        path.addPath(poly.srcPath, matrix);
        poly.playPath = path;

        // Drop shadow, or the solve/hint glow, comes from filling the
        // outline opaque; the image is painted over it immediately after.
        const glow = solveGlow || (poly === hintPoly ? hintGlow : 0);
        ctx.save();
        if (glow > 0) {
          ctx.shadowColor = `rgba(55, 140, 231, ${0.85 * glow})`;
          ctx.shadowBlur = 10 + 26 * glow;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } else {
          ctx.shadowColor = "rgba(8, 29, 74, 0.32)";
          ctx.shadowBlur = poly === drag?.poly ? 14 : 6;
          ctx.shadowOffsetX = -3;
          ctx.shadowOffsetY = 4;
        }
        ctx.fillStyle = "#081d4a";
        ctx.fill(path);
        if (glow > 0) ctx.fill(path);
        ctx.restore();

        ctx.save();
        ctx.clip(path);
        ctx.drawImage(srcImage, poly.x, poly.y, imgW, imgH);
        strokeEmboss(ctx, path, emboss, 1);
        ctx.restore();
      });
    };

    const posOf = (event) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointerDown = (event) => {
      if (solvedAt || polys.length === 1) return;
      const pos = posOf(event);
      ctx.setTransform(1, 0, 0, 1, 0, 0); // hit test in CSS pixels
      for (let k = polys.length - 1; k >= 0; k--) {
        const poly = polys[k];
        if (!poly.playPath) continue;
        if (!ctx.isPointInPath(poly.playPath, pos.x, pos.y)) continue;
        polys.splice(k, 1);
        polys.push(poly); // topmost
        drag = { poly, dx: pos.x - poly.x, dy: pos.y - poly.y };
        canvas.setPointerCapture(event.pointerId);
        dirty = true;
        return;
      }
    };

    const onPointerMove = (event) => {
      if (!drag) return;
      const pos = posOf(event);
      const { poly } = drag;
      poly.x = clamp(
        pos.x - drag.dx,
        -poly.minx + 2,
        boardW - poly.maxx - 2
      );
      poly.y = clamp(
        pos.y - drag.dy,
        -poly.miny + 2,
        boardH - poly.maxy - 2
      );
      dirty = true;
    };

    const onPointerUp = (event) => {
      if (!drag) return;
      let poly = drag.poly;
      drag = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }

      // Chain merges: absorbing one neighbour can bring the group within
      // range of another, so keep going until nothing else connects.
      for (;;) {
        const near = polys.find((o) => o !== poly && poly.ifNear(o, dConnect));
        if (!near) break;
        near.absorb(poly);
        polys.splice(polys.indexOf(poly), 1);
        poly = near;
      }

      dirty = true;
      if (polys.length === 1) {
        solvedAt = performance.now();
        setPhase("solved");
      }
    };

    const start = () => {
      if (cancelled) return;
      layout();
      frame = requestAnimationFrame(render);
    };

    // A failed logo load must not take the 404 page down with it, fall back
    // to the static branch and leave the navigation untouched.
    image.decoding = "async";
    image.addEventListener("load", start);
    image.addEventListener("error", () => {
      if (!cancelled) setPlayable(false);
    });
    image.src = SRC;

    // Only relayout on real width changes; mobile browser chrome resizing the
    // viewport should not wipe a half-finished puzzle.
    let lastW = 0;
    const observer = new ResizeObserver(() => {
      if (!srcImage) return;
      const width = Math.round(wrap.clientWidth);
      if (Math.abs(width - lastW) < 24) return;
      lastW = width;
      layout();
    });
    lastW = Math.round(wrap.clientWidth);
    observer.observe(wrap);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    resetRef.current = () => {
      if (srcImage) build(true);
    };
    hintRef.current = applyHint;

    return () => {
      cancelled = true;
      resetRef.current = null;
      hintRef.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      image.removeEventListener("load", start);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [playable]);

  const shuffle = useCallback(() => resetRef.current?.(), []);
  const hint = useCallback(() => hintRef.current?.(), []);

  return (
    <div className={className}>
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low"
        style={{ aspectRatio: `1 / ${BOARD_RATIO}` }}
      >
        {playable ? (
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Jigsaw puzzle of the LogixLoops fox mark"
            className="block cursor-grab touch-none select-none active:cursor-grabbing"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FoxPlate className="rounded-lg" style={{ width: `${IMG_FRACTION * 100}%` }} />
          </div>
        )}

        {/* The box lid, for once the picture is in pieces. Tucked into the
            corner the scatter keeps clear, click-through so it never steals a
            drag, and absent while the board is still intact, there is nothing
            to reference when the whole mark is sitting right there. */}
        {playable && phase !== "intact" && showReference && (
          <figure className="pointer-events-none absolute right-2 top-2 m-0 w-[14%] min-w-[64px] max-w-[104px]">
            <FoxPlate className="rounded-md border border-white/25 shadow-md" />
            <figcaption className="mt-1 text-center font-label text-label-sm uppercase tracking-widest text-on-surface-variant">
              Reference
            </figcaption>
          </figure>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {playable && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={shuffle}
              icon="shuffle"
              iconPosition="left"
            >
              {phase === "intact" ? "Break it apart" : "Shuffle"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={hint}
              disabled={phase !== "playing"}
              icon="lightbulb"
              iconPosition="left"
            >
              Hint
            </Button>
            {phase !== "intact" && (
              <Button
                variant="text"
                size="sm"
                onClick={() => setShowReference((v) => !v)}
              >
                {showReference ? "Hide reference" : "Show reference"}
              </Button>
            )}
          </>
        )}
        <Button href="/" size="sm" icon="arrow_forward">
          Back home
        </Button>
      </div>

      <p
        aria-live="polite"
        className="mt-3 font-body text-body-sm text-on-surface-variant"
      >
        {!playable
          ? "The mark, whole."
          : phase === "intact"
            ? "The mark, whole, for now. Break it apart to play."
            : solved
              ? "Solved. That one we can fix."
              : "Drag the pieces together to rebuild the mark. Hint joins one pair for you."}
      </p>
    </div>
  );
}
