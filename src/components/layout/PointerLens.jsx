"use client";

import { useEffect } from "react";

/**
 * LOGIXLOOPS: Pointer Lens Driver
 *
 * Writes `--mx` / `--my` onto whichever `.cipher-lens` element the pointer is
 * currently over. The presentation, the ciphertext field, the mask, the
 * drift, lives in `globals.css`; this only supplies the coordinates.
 *
 * One delegated listener on the document covers every lensed card on every
 * route, including cards that mount later (filtered grids, route changes),
 * which a per-card `onMouseMove` cannot do without re-binding. Renders
 * nothing.
 *
 * Mounted once in the root layout. It is inert on the homepage simply because
 * nothing there carries the class.
 */
export default function PointerLens() {
  useEffect(() => {
    // Coarse pointers never hover, so the lens can never be shown on them and
    // tracking would be pure cost. Also skips the listener entirely for
    // readers who have asked for reduced motion.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    let frame = 0;
    let pending = null;

    // `pointermove` fires faster than the compositor paints. Coalescing to one
    // write per frame means a fast drag across a grid costs one style write,
    // not thirty.
    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      pending = null;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${x - rect.left}px`);
      el.style.setProperty("--my", `${y - rect.top}px`);
    };

    const onMove = (event) => {
      const el = event.target.closest?.(".cipher-lens");
      if (!el) return;
      pending = { el, x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
