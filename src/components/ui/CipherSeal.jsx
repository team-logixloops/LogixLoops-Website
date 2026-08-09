"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "0123456789abcdefABCDEF/+=%$&@#*<>[]{}";

/** Fills a buffer with the kind of noise a hex dump of ciphertext looks like. */
function scramble(length) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
  }
  return out;
}

/**
 * LOGIXLOOPS: Cipher Seal
 *
 * The security page's one signature object: a sealed panel that shows what is
 * under it only where you point. Drag the cursor across it and a circle of
 * live ciphertext and brand gradient opens under the pointer, closing again
 * behind it.
 *
 * This is the loud version of the treatment that `.cipher-lens` applies
 * quietly everywhere else, and it exists in exactly one place on the site.
 * Here the metaphor is the argument the page is making, encrypted at rest,
 * legible only to whoever holds the key, so the effect is content. On any
 * other route it would be decoration, which is why the shared utility is the
 * restrained one.
 *
 * Two performance decisions worth keeping:
 *
 *   - The buffer is rewritten on an interval and pushed straight to
 *     `textContent`, never through state. The effect this derives from
 *     regenerated 1,500 characters *and re-rendered React* on every
 *     `pointermove`, which is a full reconcile per frame.
 *   - The mask is moved by writing two custom properties on the wrapper, so
 *     the pointer path costs two style writes and no React work at all.
 *
 * The scramble only runs while the panel is being pointed at, and not at all
 * under reduced motion, where the field is written once and left still.
 *
 * @param {object} props
 * @param {string} props.seal   The text held in the centre disc.
 * @param {string} [props.caption]
 * @param {string} [props.className]
 */
export default function CipherSeal({ seal, caption, className }) {
  const wrapRef = useRef(null);
  const fieldRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    // One pass on mount so the field is already populated the first time the
    // lens opens, rather than filling in visibly under the cursor.
    field.textContent = scramble(1400);
    return () => clearInterval(timerRef.current);
  }, []);

  const startScramble = () => {
    if (timerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => {
      if (fieldRef.current) fieldRef.current.textContent = scramble(1400);
    }, 110);
  };

  const stopScramble = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const track = (event) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    wrap.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    wrap.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  };

  const maskImage =
    "radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), #000 0%, rgba(0,0,0,0.6) 55%, transparent 78%)";

  return (
    <figure className={cn("m-0", className)}>
      <div
        ref={wrapRef}
        onPointerMove={track}
        onPointerEnter={startScramble}
        onPointerLeave={stopScramble}
        className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-[24px] shadow-glass-elevated"
      >
        {/* Sealed state: the panel at rest is a plain hairline grid, the way a
            block of encrypted data looks from outside, structure visible,
            contents not. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(40,104,198,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(40,104,198,0.09)_1px,transparent_1px)] [background-size:28px_28px]"
        />

        {/* Under the lens: brand ramp on deep navy, so the opened circle reads
            as a different material rather than a lighter tint of the same one.
            Royal into the teal is the site's one non-mark hue, it is what the
            palette keeps for data and status, which is what this is. */}
        <div
          aria-hidden="true"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2868c6,#081d4a_55%,#0e7c8b)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div
          aria-hidden="true"
          style={{ maskImage, WebkitMaskImage: maskImage }}
          className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        >
          <p
            ref={fieldRef}
            className="absolute inset-0 p-3 font-mono text-[11px] leading-[1.35] break-all text-tertiary-fixed-dim/90 select-none"
          />
        </div>

        {/* The seal itself. Its own backing disc, so the label survives the
            lens passing directly under it, the one place on this panel where
            something has to stay readable at all times. */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full sm:h-48 sm:w-48">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-surface-bright/85 blur-md"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary/25"
            />
            <span className="relative z-10 font-display text-headline-lg text-on-surface tracking-tight">
              {seal}
            </span>
          </div>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-4 font-body text-body-sm text-on-surface-variant">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
