/**
 * LOGIXLOOPS: Page surface
 *
 * The sheet the page's real content sits on, and the other half of the
 * full-viewport hero.
 *
 * A hero that owns a whole screen needs somewhere for that screen to go. If
 * the next section just abuts it, the hero reads as a screenshot with content
 * stapled underneath. This gives the content a physical edge and slides it up
 * over the hero's last few percent, so leaving the hero is one movement
 * instead of two adjacent bands changing places.
 *
 * The three details that carry it:
 *
 *   - A negative top margin, so the sheet genuinely overlaps the hero rather
 *     than starting where it ends. This is what makes the edge read as
 *     *over* the field instead of *after* it.
 *   - An upward shadow. Shadows on this site fall down from cards; this one
 *     is the only one that falls up, because it is cast by a sheet lifted off
 *     the surface behind it. That inversion is what sells the depth.
 *   - A hairline along the top edge, brightest at the centre and dissolving
 *     at both corners, matching the way the contour fields fade rather than
 *     stopping.
 *
 * All three are dialled well down from where they started. The first pass ran
 * a 7vh overlap, a 2.5rem radius and a 64px shadow, and at full page width
 * that does not read as a sheet, it reads as a white slab dropped on the
 * page, with a heavy dark line under a corner radius big enough to look like
 * a modal. The edge only has to be legible, not announced: 3.5vh of overlap,
 * a radius near the one the cards below it use, and a shadow you notice as
 * depth rather than as a border.
 *
 * Server component on purpose. It is layout and paint with no state, so it
 * imposes no client boundary on the pages that use it, several of them
 * (`/about`, `/blog`, `/services`) are server-rendered and should stay that
 * way.
 */
export default function PageSurface({
  children,
  /* Top padding inside the sheet. `lg` is the default because the sheet's own
     edge already reads as a break; pages that open on a full-bleed band
     immediately below the edge pass `none` and set their own. */
  spacing = "lg",
  className = "",
}) {
  const padTop =
    spacing === "none" ? "" : spacing === "sm" ? "pt-stack-md" : "pt-stack-lg";

  return (
    <div
      className={`relative z-10 -mt-[3.5vh] rounded-t-[1rem] sm:rounded-t-[1.5rem] bg-background shadow-[0_-14px_36px_-22px_rgba(8,29,74,0.16)] ${padTop} ${className}`}
    >
      {/* Sits on the edge itself, not inside the padding, so the sheet reads
          as a cut sheet of material rather than a bordered box. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-gradient-to-r from-transparent via-outline-variant/70 to-transparent"
      />
      {children}
    </div>
  );
}
