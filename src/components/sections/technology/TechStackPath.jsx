"use client";

import MarqueeAlongSvgPath from "@/components/ui/MarqueeAlongSvgPath";
import { TECH_LOGOS } from "@/data/tech-logos";
import { useMediaQuery } from "@/hooks";

/**
 * TECH STACK PATH
 *
 * The overture to the /technology ecosystem grid: the stack itself, moving,
 * before the page settles down and lists it properly. The grid below answers
 * *what we build on*; this band only has to make the answer feel like a
 * system rather than a spec sheet.
 *
 * Why a curve and not a straight marquee, the site already has one of those
 * (`ScrollMarquee`, in the footer band). A straight line reads as a ticker;
 * a curve that rises and falls reads as a system under load, which is nearer
 * the thing this page is about.
 *
 * It used to be a curve that crossed itself. The crossing was the point, logos
 * passing behind one another supplied the depth, but it cost more height than
 * the hero has: a band tall enough to hold the loop overran
 * `min-h-[calc(100svh-5rem)]` and `PageHero`'s `overflow-hidden` cut the
 * bottom off. What survived on screen was the loop alone, a ring of grey
 * glyphs with no curve attached to it. A wide, shallow wave is legible in a
 * third of the height, so that is what runs here now.
 */

/* Two routes, not one scaled route.
 *
 * The desktop wave is 6:1 and spends its whole width; the same shape squeezed
 * into 390px would put its two bends within 130px of each other and read as a
 * wobble. The narrow viewport gets one bend instead.
 *
 * Both paths start and end *outside* their viewBox on the x axis. The items
 * wrap from 100% back to 0%, and that jump has to happen where nobody is
 * looking, which here means past the edge, under the wrapper's mask.
 *
 * On the y axis the box has to clear the curve by half a tile or the crests
 * get shaved. Desktop tiles are 64px, so the wave is kept inside y 40 → 200 of
 * a 240 box. Mobile tiles are 56px, kept inside y 44 → 156 of a 200 box. A
 * cubic never leaves its control hull, so those bounds can be read straight
 * off the control points below. Re-check them if either path is redrawn. */
const DESKTOP_PATH =
  "M-60 170C160 60 380 56 600 130C820 204 1020 200 1200 120C1300 76 1400 58 1500 52";
const DESKTOP_VIEWBOX = "0 0 1440 240";

const MOBILE_PATH =
  "M-30 128C60 52 150 46 230 108C290 154 340 148 420 96";
const MOBILE_VIEWBOX = "0 0 390 200";

/* The phone gets ten of the twenty. Items are spread by percentage of path
 * length, so the full set over a ~470px curve lands them 23px apart against a
 * 28px glyph, which is not a stream, it is a pile. Ten is what fits, and the
 * ten are the ones the lead paragraph directly above already names. */
const MOBILE_LOGO_COUNT = 10;

export default function TechStackPath() {
  // Starts false on the server and on the first client frame, so the narrow
  // route is the one that renders before the query resolves. Mobile-first by
  // accident of the hook, but the right way round: the phone path is the
  // cheaper one to have been wrong about.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const path = isDesktop ? DESKTOP_PATH : MOBILE_PATH;
  const viewBox = isDesktop ? DESKTOP_VIEWBOX : MOBILE_VIEWBOX;
  const logos = isDesktop ? TECH_LOGOS : TECH_LOGOS.slice(0, MOBILE_LOGO_COUNT);

  return (
    <section
      aria-labelledby="tech-stack-path"
      className="relative w-full overflow-hidden pb-stack-md"
    >
      <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
        <p
          id="tech-stack-path"
          className="font-label text-label-caps text-on-surface-variant uppercase tracking-[0.2em]"
        >
          Twenty years of tooling, in current use
        </p>
      </div>

      {/* The band is full-bleed on purpose, the curve needs to run off both
          edges, or its ends read as a beginning and an end rather than as a
          loop the page has caught mid-turn. */}
      <div
        className={[
          "relative w-full",
          // Aspect ratio, not fixed heights. `responsive` scales the field to
          // *fit* its wrapper, so a wrapper shorter than the viewBox's own
          // ratio makes height the limiting factor, the band then shrinks to
          // ~75% and strands a couple of hundred pixels of dead space down
          // each side. Matching the wrapper to the viewBox makes width the
          // limit instead, so the curve spans the full bleed. The cap stops
          // ultrawide viewports from turning a decorative band into a screen.
          //
          // The cap is 300px, not 560. This band sits inside a hero that is
          // already a viewport tall and clips what does not fit, so its budget
          // is whatever the copy above it leaves, not whatever the curve would
          // like. At 6:1 the cap only engages past ~1800px wide, and the mask
          // hides the small side inset it costs there.
          "aspect-[390/200] md:aspect-[1440/240] max-h-[300px]",
          // Fade the content itself rather than laying a gradient over it:
          // a mask survives the sheet's background changing, and it does not
          // put a stacking-context sandwich between the logos and the page.
          "[mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
        ].join(" ")}
      >
        <MarqueeAlongSvgPath
          // Remount on the breakpoint flip. The two routes have different
          // viewBoxes and different item spacing; carrying the old offset
          // across the swap makes the band visibly jump.
          key={isDesktop ? "desktop" : "mobile"}
          path={path}
          viewBox={viewBox}
          responsive
          // One copy. The path is now long enough to carry the whole set at a
          // readable interval, and a second ring would halve that interval
          // back to where the glyphs touch.
          repeat={1}
          baseVelocity={isDesktop ? 4 : 3}
          // Upright, always. `offset-rotate` defaults to `auto`, which tumbles
          // each item to the curve's tangent, fine for photographs, wrong for
          // eighteen logos that each have a right way up.
          offsetRotate="0deg"
          slowdownOnHover
          slowDownFactor={0.15}
          draggable
          grabCursor
          dragSensitivity={0.08}
          enableRollingZIndex
          zIndexRange={20}
          className="h-full w-full"
        >
          {logos.map((logo) => (
            <div
              key={logo.slug}
              className="group grid size-14 place-items-center md:size-16"
            >
              <svg
                role="img"
                aria-label={logo.name}
                viewBox="0 0 24 24"
                fill="currentColor"
                className={[
                  "size-7 md:size-8",
                  // Resting state is quiet, the grid below is the content,
                  // and eighteen logos at full contrast would out-shout it.
                  "text-on-surface-variant/45",
                  "transition-[color,transform] duration-500 ease-out",
                  "group-hover:scale-125 group-hover:text-primary",
                ].join(" ")}
              >
                {logo.paths.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </svg>
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
