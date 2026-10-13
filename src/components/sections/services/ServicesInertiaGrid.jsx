"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import { LINES } from "@/data/lines";

/* 3x3: the six lines, then the kits, pricing and a closing call to action. */
const TILES = [
  ...LINES.map((line) => ({ key: line.slug, label: line.label, href: `/services/${line.slug}`, art: line.art })),
  { key: "kits", label: "All Advantage Kits", href: "/kits", art: "/services/saas-platforms.svg" },
  { key: "pricing", label: "Pricing", href: "/pricing", art: "/services/enterprise-software.svg" },
  { key: "start-a-project", label: "Start a Project", href: "/contact", art: "/services/start-a-project.svg" },
];

/**
 * Where each tile drifts while the headline owns the screen, normalized to
 * the stage *below the navbar*, ordered to match TILES. A ring: four along the
 * top, two on the flanks, three across the bottom, middle left clear for the
 * headline. `s` is the drifting scale, `r` the tilt each tile unwinds from as
 * it settles into its grid slot. Every point is clamped at measure time, so
 * these are intent, not a promise, nothing can land off-screen.
 */
const FLOAT_POINTS = [
  { x: 0.16, y: 0.14, r: -11, s: 0.8 },
  { x: 0.38, y: 0.08, r: 8, s: 0.7 },
  { x: 0.62, y: 0.08, r: -7, s: 0.7 },
  { x: 0.84, y: 0.14, r: 12, s: 0.8 },
  { x: 0.09, y: 0.5, r: -9, s: 0.88 },
  { x: 0.91, y: 0.5, r: 10, s: 0.88 },
  { x: 0.2, y: 0.86, r: 7, s: 0.78 },
  { x: 0.5, y: 0.93, r: -13, s: 0.66 },
  { x: 0.8, y: 0.86, r: 11, s: 0.78 },
];

/* The navbar floats over the top of the viewport; the drift ring lives
   entirely below it. Matches the `lg:pt-[120px]` on the stage. */
const NAV_CLEARANCE = 120;
/* Breathing room between a drifting tile and the edge of the stage. */
const EDGE_MARGIN = 12;

/* Below this stage width the ring closes on both the viewport edges and the
   headline's own box, so the drifting tiles are shrunk to keep clear of both. */
const NARROW_STAGE = 1280;
const NARROW_SCALE = 0.72;

/* Tiles wait for the heading to land before fading up at their drift points. */
const INTRO_DELAY = 0.55;

const clamp = (v, min, max) => (min > max ? (min + max) / 2 : Math.min(Math.max(v, min), max));

/**
 * The services constellation.
 *
 * Desktop: a sticky stage holds one viewport still while the page scrolls past
 * it. All nine tiles start drifting around the headline (`children`) at reduced
 * scale; a scrubbed timeline carries each to its 3x3 grid slot while the
 * headline fades back. Because the stage is pinned, the grid is standing still
 * as the tiles land on it, and the pin outlasts the travel by a settle buffer,
 * so the finished grid is held on screen before the page moves on. Scrolling
 * back up lifts everything out again.
 *
 * The tiles are also throwable: grab one and it follows the pointer, keeps its
 * momentum on release, then springs back to where it belongs.
 *
 * Mobile / coarse pointers: none of that. Scroll-linked transforms on nine
 * elements buy nothing on a phone and cost frames, so the stage is a plain
 * screen of headline-over-grid and the tiles just fade in.
 *
 * Each tile is three nested transforms, which is what lets all of this coexist
 * without any two layers writing the same property on the same element:
 *
 *   [data-tile-drag]    grid slot, untransformed. Draggable's x/y
 *     [data-tile-travel]  the scroll timeline's x/y/scale/rotate
 *       <a>               the link, so the hit area follows both
 *         [data-inertia-art]  the hover flick
 *
 * Drag sits outermost so its ancestors are transform-free (Draggable maps
 * pointer movement 1:1 there), and the pointer still finds it because hit
 * testing runs against the rendered, transformed descendants.
 *
 * The tiles only ever exist once in the DOM, in the grid, the markup a
 * crawler sees is the plain grid of eight services and a CTA.
 * `prefers-reduced-motion` drops every layer.
 */
export default function ServicesInertiaGrid({ children }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const gridRef = useRef(null);

  /**
   * When the last context menu opened.
   *
   * Right-clicking a tile was navigating to the service page. A plain <Link>
   * does not do that — a secondary button fires `contextmenu`, not `click` —
   * so something in the pointer path is delivering a primary click alongside
   * the menu. Guarding on `event.button` does not help, because the stray
   * click reports button 0 like any other.
   *
   * Timestamping the context menu and swallowing a click that arrives right
   * behind it catches the anomaly wherever it originates. A genuine left
   * click has no `contextmenu` in front of it, so it is never affected, and
   * the browser's own menu is left completely alone — this only stops the
   * navigation that should not have been queued.
   */
  const contextMenuAt = useRef(0);

  /* Drift-to-settle travel, plus drag. Layout effect so the tiles commit to
     their drift positions before first paint, no flash inside the grid. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const grid = gridRef.current;
    if (!root || !stage || !grid) return;

    const drags = Array.from(grid.querySelectorAll("[data-tile-drag]"));
    const travels = Array.from(grid.querySelectorAll("[data-tile-travel]"));
    const labels = grid.querySelectorAll("[data-tile-label]");
    const copy = stage.querySelector("[data-hero-copy]");
    if (!travels.length) return;

    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

    const settle = () => {
      gsap.set(travels, { x: 0, y: 0, scale: 1, rotate: 0 });
      gsap.set(drags, { x: 0, y: 0, zIndex: 1 });
      gsap.set(labels, { opacity: 1 });
      if (copy) gsap.set(copy, { opacity: 1, y: 0 });
    };

    const mm = gsap.matchMedia();

    /* Travel is desktop-only: wide enough for the ring to clear the headline
       box, and a pointer fine enough that the page isn't being flung by a
       thumb. Must stay in step with the `lg:` classes below, a viewport that
       gets the 240svh track without the animation is 140svh of dead scroll. */
    mm.add(
      {
        travels:
          "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions.travels) {
          settle();
          return;
        }

        /* Offsets are re-derived on every ScrollTrigger refresh (resize, font
           swap, Lenis remeasure). Transforms are zeroed first so the rects
           read are the true grid slots, not a tile caught mid-travel. */
        const offsets = travels.map(() => ({ x: 0, y: 0, rotate: 0, scale: 1 }));
        const measure = () => {
          gsap.set(travels, { x: 0, y: 0, scale: 1, rotate: 0 });
          gsap.set(drags, { x: 0, y: 0 });

          const stageRect = stage.getBoundingClientRect();
          const shrink = stageRect.width < NARROW_STAGE ? NARROW_SCALE : 1;
          /* The ring is laid out across the band under the navbar, not the
             whole stage, otherwise the top row hides behind the nav and the
             bottom row walks off the fold. */
          const bandTop = stageRect.top + NAV_CLEARANCE;
          const bandHeight = stageRect.height - NAV_CLEARANCE;

          travels.forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const point = FLOAT_POINTS[i % FLOAT_POINTS.length];
            const scale = point.s * shrink;
            const halfW = (rect.width * scale) / 2 + EDGE_MARGIN;
            const halfH = (rect.height * scale) / 2 + EDGE_MARGIN;

            const cx = clamp(
              stageRect.left + point.x * stageRect.width,
              stageRect.left + halfW,
              stageRect.right - halfW
            );
            const cy = clamp(
              bandTop + point.y * bandHeight,
              bandTop + halfH,
              stageRect.bottom - halfH
            );

            offsets[i] = {
              x: cx - (rect.left + rect.width / 2),
              y: cy - (rect.top + rect.height / 2),
              rotate: point.r,
              scale,
            };
          });
        };
        measure();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            /* One viewport of scroll to land everything. The sticky stage
               stays pinned past this point (root is taller), which is the
               settle buffer, the grid is held still, fully assembled, before
               the page scrolls on. Without it the scrub lag would still be
               catching up as the stage released. */
            end: () => `+=${window.innerHeight}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
          },
        });

        /* Every tile lands by 1.0, the stagger only offsets their starts, so
           nothing is still moving when the travel window closes. */
        travels.forEach((el, i) => {
          tl.fromTo(
            el,
            {
              x: () => offsets[i].x,
              y: () => offsets[i].y,
              scale: () => offsets[i].scale,
              rotate: () => offsets[i].rotate,
            },
            { x: 0, y: 0, scale: 1, rotate: 0, ease: "none", duration: 0.85 },
            (i / (travels.length - 1)) * 0.15
          );
        });

        if (copy) {
          tl.fromTo(
            copy,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -32, ease: "none", duration: 0.35 },
            0.15
          );
        }

        /* Labels are noise at drift scale, they arrive once tiles are home. */
        tl.fromTo(labels, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.25 }, 0.75);

        /* Throw a tile and it keeps its momentum, then springs home. Springing
           back matters: the scroll timeline assumes each tile's drag offset is
           zero, so a tile abandoned mid-flight would settle into a crooked
           grid. Bounds are deliberately omitted, the drag element sits in its
           grid slot while the icon you grabbed is drawn somewhere else
           entirely, so any bounds box would fence the wrong rectangle. */
        const springHome = (el) =>
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 1.1,
            ease: "elastic.out(1, 0.62)",
            overwrite: true,
            onComplete: () => gsap.set(el, { zIndex: 1 }),
          });

        const draggables = Draggable.create(drags, {
          type: "x,y",
          inertia: true,
          dragClickables: true,
          allowNativeTouchScrolling: true,
          cursor: "grab",
          activeCursor: "grabbing",
          onPress() {
            gsap.killTweensOf(this.target);
            gsap.set(this.target, { zIndex: 30 });
          },
          onThrowComplete() {
            springHome(this.target);
          },
          onRelease() {
            /* No throw tween means no onThrowComplete, a tap, or a drag
               released at a standstill. Send it home anyway. */
            if (!this.tween) springHome(this.target);
          },
        });

        return () => {
          draggables.forEach((d) => d.kill());
          tl.scrollTrigger?.kill();
          tl.kill();
          gsap.killTweensOf(drags);
          settle();
        };
      }
    );

    return () => mm.revert();
  }, []);

  /* Entrance: tiles fade up where they start, at their drift points on
     desktop, in the grid on mobile. Opacity only; the scroll timeline owns
     every transform. */
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const fades = grid.querySelectorAll("[data-tile-fade]");
    if (!fades.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fades, { opacity: 1 });
      return;
    }

    const tween = gsap.fromTo(
      fades,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power3.out", delay: INTRO_DELAY, stagger: 0.06 }
    );

    return () => tween.kill();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    gsap.registerPlugin(InertiaPlugin);

    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const onMove = (e) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };
    grid.addEventListener("mousemove", onMove);

    const tiles = Array.from(grid.querySelectorAll("[data-inertia-tile]"));
    const cleanups = tiles.map((tile) => {
      const art = tile.querySelector("[data-inertia-art]");
      /* Raising the link itself would do nothing, its siblings' stacking is
         decided one level up, on the grid cell. */
      const cell = tile.closest("[data-tile-drag]");

      const onEnter = () => {
        /* A tile mid-drag is already raised and about to spring home; leave
           its stacking alone rather than dropping it under its neighbours. */
        if (gsap.isTweening(cell)) return;

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(cell, { zIndex: 1 });
            tl.kill();
          },
        });
        tl.timeScale(1.2);

        gsap.set(cell, { zIndex: 20 });

        tl.to(art, {
          inertia: {
            x: { velocity: deltaX * 30, end: 0 },
            y: { velocity: deltaY * 30, end: 0 },
          },
        });
        tl.fromTo(
          art,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      };

      tile.addEventListener("mouseenter", onEnter);
      return () => tile.removeEventListener("mouseenter", onEnter);
    });

    return () => {
      grid.removeEventListener("mousemove", onMove);
      cleanups.forEach((fn) => fn());
      gsap.killTweensOf(grid.querySelectorAll("[data-inertia-art]"));
    };
  }, []);

  return (
    /* Desktop gets 240svh of scroll track behind a 100svh sticky stage: 100
       for the travel, the rest as settle buffer. The negative top margin
       cancels the page's own navbar padding so the stage is stuck, and
       therefore exactly one viewport, from the very first pixel of scroll;
       without it the whole ring renders 120px low and the bottom row falls
       off the fold. Below `lg` there is no travel, so the track collapses to
       the stage itself and the page padding stands. */
    <div
      ref={rootRef}
      className="relative w-full overflow-x-clip lg:-mt-[120px] lg:h-[240svh]"
    >
      <div
        ref={stageRef}
        className="relative flex flex-col items-center justify-center gap-stack-md h-[calc(100svh-120px)] lg:h-svh lg:gap-0 lg:pt-[120px] lg:pb-6 lg:sticky lg:top-0"
      >
        {/* In flow on small screens, a centered overlay on desktop so the grid
            gets the whole stage to land in once the copy has faded back. */}
        <div
          data-hero-copy
          className="shrink-0 w-full lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:justify-center lg:px-margin-x-desktop lg:pointer-events-none"
        >
          {children}
        </div>

        {/* The grid is sized by the height it is given, not by its content:
            `h-full` + `aspect-square` keeps all nine on screen at once, and
            `max-w-full` clamps the width on tall/narrow windows (rows go
            rectangular rather than overflow). */}
        <div className="flex-1 min-h-0 w-full flex items-center justify-center">
          <div
            ref={gridRef}
            className="grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 lg:gap-x-8 lg:gap-y-6 isolate h-full aspect-square max-w-full max-h-[46rem]"
          >
            {TILES.map((tile) => (
              <div
                key={tile.key}
                data-tile-drag
                className="relative z-[1] h-full w-full touch-pan-y"
              >
                <div data-tile-travel className="h-full w-full will-change-transform">
                  <Link
                    href={tile.href}
                    data-inertia-tile
                    aria-label={tile.label}
                    onContextMenu={() => {
                      contextMenuAt.current = Date.now();
                    }}
                    onClick={(event) => {
                      if (Date.now() - contextMenuAt.current < 500) {
                        event.preventDefault();
                      }
                    }}
                    className="absolute inset-0 block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
                  >
                    <span data-tile-fade className="absolute inset-0 block">
                      <span
                        data-inertia-art
                        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 px-1 sm:px-2 will-change-transform"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tile.art}
                          alt=""
                          width={64}
                          height={64}
                          className="w-[62%] sm:w-[70%] h-auto max-h-[58%] max-w-[190px] object-contain select-none"
                          draggable={false}
                        />
                        <span
                          data-tile-label
                          className="font-label text-[10px] sm:text-label-caps text-on-surface-variant uppercase text-center leading-tight tracking-widest"
                        >
                          {tile.label}
                        </span>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
