"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { isEmbedded } from "@/lib/embed";

/* Whether this document is framed never changes after load, so the store has
   nothing to subscribe to. `useSyncExternalStore` is still the right tool: it
   renders the server snapshot during hydration and swaps to the client value
   immediately after, which is precisely the hydration-safe read this needs,
   and unlike an effect it does not schedule a second state update. */
const noopSubscribe = () => () => {};

/**
 * Positions a `ShaderField` behind a section's content and keeps the WebGL
 * code out of the route's first-load bundle.
 *
 * `ssr: false` is not an optimisation here, it is a requirement: the field
 * reads `devicePixelRatio`, `matchMedia` and a live GL context, none of which
 * exist during prerender. Per the Next lazy-loading guide the flag is only
 * legal inside a Client Component, which is why this wrapper exists at all,
 * it lets server-rendered routes like `/about` and `/blog` drop a field in
 * without becoming client components themselves.
 *
 * There is no `loading` placeholder on purpose. A skeleton for a decorative
 * background would be a visible flash of something that is not the design;
 * the section's own background colour is already the correct "not loaded yet"
 * state, and it is also the permanent state on hardware without WebGL2.
 *
 * The wrapper is `pointer-events-none` so the canvas never intercepts a click
 * meant for the copy above it. The field's pointer tracking is unaffected,
 * it listens on `window` and tests the cursor against this element's box
 * rather than waiting for events the layer can no longer receive.
 */
const ShaderField = dynamic(() => import("./ShaderField"), { ssr: false });

export default function FieldBackdrop({
  preset = "home",
  overrides,
  /* Tailwind positioning for the layer. The default covers the section; pass
     something narrower for a field that should only occupy, say, the top
     half of a tall page. */
  className = "absolute inset-0",
  /* Softens the field into the section boundary. `bottom` is the common
     case, a hero handing off to the band below it. */
  fade = "none",
}) {
  /* A second GL context inside a 393px-wide device frame costs a full shader
     compile and its own rAF loop to render something nobody can read at that
     size. The section's background colour is already the documented fallback,
     so embedded copies simply keep it. See lib/embed.js. */
  const embedded = useSyncExternalStore(noopSubscribe, isEmbedded, () => false);

  const maskStyle =
    fade === "bottom"
      ? {
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }
      : fade === "top"
        ? {
            maskImage: "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 55%, transparent 100%)",
          }
        : undefined;

  return (
    <div
      aria-hidden="true"
      className={`${className} z-0 overflow-hidden pointer-events-none`}
      style={maskStyle}
    >
      {!embedded && <ShaderField preset={preset} overrides={overrides} />}
    </div>
  );
}
