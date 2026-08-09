"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Pin, a push pin seen head-on, as if the card were tacked to a board.
 *
 * The previous mark was a flat line-art pin: a single-colour silhouette that
 * read as an icon of a pin rather than as a pin. What sells a real one is
 * entirely light, a dome that falls off from a hot spot near the top-left,
 * one specular highlight, a dimple where the plastic sinks toward the needle,
 * and a contact shadow underneath. All four are here.
 *
 * `currentColor` still drives the body, so the per-step theme classes work
 * exactly as before.
 */
const Pin = ({ className }) => {
  // Gradient ids must be unique per instance, six of these render on the
  // page, and duplicate ids mean every pin resolves to the first one's fill.
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`dome-${uid}`} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#081d4a" stopOpacity="0.42" />
        </radialGradient>
        <radialGradient id={`dimple-${uid}`} cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#081d4a" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#081d4a" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Contact shadow, offset down, not centred, so the pin sits above the
          card rather than floating in front of it. */}
      <ellipse cx="20.5" cy="32.5" rx="10" ry="3" fill="#081d4a" opacity="0.16" />

      {/* Body, then the light on top of it */}
      <circle cx="20" cy="20" r="12.5" fill="currentColor" />
      <circle cx="20" cy="20" r="12.5" fill={`url(#dome-${uid})`} />
      <circle
        cx="20"
        cy="20"
        r="12.5"
        fill="none"
        stroke="#081d4a"
        strokeOpacity="0.22"
      />

      {/* Where the plastic sinks toward the needle */}
      <circle cx="20" cy="20" r="4.2" fill={`url(#dimple-${uid})`} />

      {/* Single specular highlight. Two would read as two light sources. */}
      <ellipse
        cx="15.2"
        cy="14.6"
        rx="4.1"
        ry="2.5"
        fill="#ffffff"
        opacity="0.7"
        transform="rotate(-32 15.2 14.6)"
      />
    </svg>
  );
};

const defaultBgColors = {
  primary: "bg-primary/5",
  secondary: "bg-secondary/5",
  tertiary: "bg-tertiary/5",
};
const defaultTextColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};
const defaultBorderColors = {
  primary: "border-primary/20",
  secondary: "border-secondary/20",
  tertiary: "border-tertiary/20",
};

const Card = ({
  index,
  number,
  title,
  description,
  colorTheme = "primary",
  className,
  rotate,
  colors: customColors,
}) => {
  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      data-step={index}
      className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      {/* `step-body` and `step-watermark` are the handles the scroll driver
          toggles through `.is-active` on the wrapper. The rules live in
          globals.css and are gated to md+, so on mobile, where there is no
          route and no fox, every card is simply bright. */}
      <div className="step-body bg-white p-2 rounded-[25px] shadow-[0px_10px_20px_0px_rgba(8,29,74,0.10)] border border-outline-variant/40">
        <Pin className={`w-9 h-9 ${textColor} z-20 mb-5 mx-auto`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[15px] p-[15px] h-full flex flex-col relative overflow-hidden`}
        >
          {/* Stamped when the fox arrives. Knockout so the step's tint reads
              through the fur instead of a white plate covering it.
              eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-fox-knockout.svg"
            alt=""
            aria-hidden="true"
            width={948}
            height={746}
            loading="lazy"
            decoding="async"
            className="step-watermark pointer-events-none select-none absolute -right-6 -bottom-5 w-32 max-w-none"
          />
          <span className={`${textColor} font-display text-4xl font-bold mb-5 relative`}>
            {number}
          </span>
          <h3 className="font-heading text-2xl font-semibold text-on-surface leading-none mb-[10px] relative">
            {title}
          </h3>
          <p className="font-body text-on-surface-variant text-sm/5 tracking-tight relative">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Tilt is `md:` for the same reason the absolute positions are: it is part of
 * the scattered desktop board, where a card can lean because it has space
 * around it. In the single mobile column a ±8° card just collides with its
 * neighbours' corners and reads as a rendering fault.
 */
const DEFAULT_CARD_POSITIONS = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "md:rotate-8" },
  { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "md:-rotate-8" },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "md:rotate-8" },
  { className: "md:absolute md:top-[570px] md:right-[10%]", rotate: "md:-rotate-8" },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "md:rotate-8" },
  { className: "md:absolute md:top-[970px] md:right-[15%]", rotate: "md:-rotate-8" },
];

const VB_WIDTH = 1000;
const TRAVELLER_PX = 44;

export default function HowItWorks({ features, className, stepPositions }) {
  const data = features && features.length > 0 ? features : [];
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  const root = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const progressRef = useRef(null);
  const travellerRef = useRef(null);
  const walkerRef = useRef(null);

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else if (data.length === 5) height = 1130;
  else height = 1350;

  // Kept as separate legs rather than one string: each leg ends on a card, so
  // measuring the path one leg at a time gives the arc length at which each
  // card should light up.
  const LEGS = [
    "M 290 150 C 500 150, 550 270, 710 270",
    " C 850 270, 500 350, 290 450",
    " C 290 600, 550 720, 750 720",
    " C 950 720, 500 800, 290 850",
    " C 450 950, 600 1010, 750 1010",
  ];
  const legs = LEGS.slice(0, Math.max(0, data.length - 1));
  const pathD = legs.join("");

  useGSAP(
    () => {
      /*
       * Everything below is desktop-only: the route, the fox and the dimmed
       * cards are all `md:`, on a phone the section is a plain stack. Running
       * the driver there measured a `display: none` SVG, which reports zero
       * for `clientWidth` and `getTotalLength()`, so every card read as
       * "reached" at once.
       *
       * `gsap.matchMedia` rather than a bare `matchMedia` check so that
       * crossing the breakpoint, including by rotating a phone, tears the
       * whole thing down and rebuilds it against real measurements.
       */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const path = pathRef.current;
        const progress = progressRef.current;
        const svg = svgRef.current;
        const traveller = travellerRef.current;
        const walker = walkerRef.current;
        if (!path || !progress || !svg || !traveller || !walker) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const length = path.getTotalLength();
      const steps = Array.from(root.current.querySelectorAll("[data-step]"));

      /*
       * Arc length at which each card sits, measured by walking the route one
       * leg at a time, each leg ends on a card. Measured rather than
       * hard-coded so it stays correct if the route is ever redrawn.
       *
       * The measuring is done by borrowing the progress path, which already
       * has its `d` driven imperatively, and restoring it immediately.
       * Previously this appended a throwaway <path> into the React-rendered
       * <svg> and removed it again; if anything in between threw, the stray
       * node stayed, and React's next reconciliation of that subtree died
       * with "removeChild: node to be removed is not a child of this node".
       * Mutating one attribute React owns and putting it straight back cannot
       * desynchronise the tree the way inserting a node can.
       */
      const stepAt = [0];
      let acc = "";
      legs.forEach((leg) => {
        acc += leg;
        progress.setAttribute("d", acc);
        stepAt.push(progress.getTotalLength());
      });
      progress.setAttribute("d", "");

      /*
       * The travelled line is redrawn as real geometry each frame, sampled
       * from the same path, up to the same arc length the fox is at, rather
       * than revealed with a stroke-dashoffset.
       *
       * Dashoffset was the bug behind the line trailing the fox by a third of
       * the route. `getTotalLength()` reports user units, but the path is
       * marked `vector-effect: non-scaling-stroke` inside a
       * `preserveAspectRatio="none"` viewBox, so the browser lays dashes out
       * in *screen* space along the transformed path. The two measurements
       * only agree when both axes happen to scale identically, and they
       * don't here. Sampling makes the line end exactly where the fox stands
       * by construction, at any viewport width, instead of relying on two
       * different coordinate spaces agreeing.
       */
      const SAMPLES = 180;
      const drawTo = (at) => {
        if (at < 1) {
          progress.setAttribute("d", "");
          return;
        }
        const stride = at / SAMPLES;
        let d = "";
        for (let i = 0; i <= SAMPLES; i++) {
          const pt = path.getPointAtLength(i * stride);
          d += `${i ? "L" : "M"}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        }
        progress.setAttribute("d", d);
      };

      const markSteps = (at) => {
        steps.forEach((el, i) => {
          el.classList.toggle("is-active", at >= (stepAt[i] ?? Infinity));
        });
      };

      if (reduced) {
        // Show the finished route and park the fox, rather than leaving a
        // blank line, a token stuck at step one and every card dimmed.
        drawTo(length);
        markSteps(length);
        gsap.set(traveller, { autoAlpha: 0 });
        // Same teardown as the animated branch, dropping below the
        // breakpoint must not strand `is-active` on the mobile layout.
        return () => {
          steps.forEach((el) => el.classList.remove("is-active"));
          progress.setAttribute("d", "");
        };
      }

      /*
       * The SVG is `preserveAspectRatio="none"` over a 1000-unit viewBox, so
       * its two axes scale independently. That is fine for the route itself
       * but would squash anything travelling along it, which is why the fox
       * is an HTML element positioned in pixels rather than an <image> inside
       * the SVG: converting the point out of user units keeps it circular at
       * every width.
       */
      const place = (p) => {
        const sx = svg.clientWidth / VB_WIDTH;
        const sy = svg.clientHeight / height;

        const at = Math.max(0, Math.min(length, p * length));
        const pt = path.getPointAtLength(at);
        // A step back along the path gives the heading. The fox faces the way
        // it is travelling, and flips when you scroll back up.
        const prev = path.getPointAtLength(Math.max(0, at - 2));
        const facing = pt.x - prev.x >= 0 ? 1 : -1;

        // Bob tied to distance covered, not to elapsed time, so it reads as
        // walking the route rather than idling on the spot. Stops when you do.
        const bob = Math.sin(at / 18) * 3;

        traveller.style.transform = `translate3d(${pt.x * sx - TRAVELLER_PX / 2}px, ${
          pt.y * sy - TRAVELLER_PX / 2 + bob
        }px, 0)`;
        walker.style.transform = `scaleX(${facing})`;
      };

      const render = (p) => {
        const at = Math.max(0, Math.min(length, p * length));
        drawTo(at);
        place(p);
        markSteps(at);
      };

      render(0);

      /*
       * One tween over a proxy value drives all three. `scrub` only smooths a
       * linked animation, on a bare `ScrollTrigger.create` it is silently
       * ignored, so this both makes the scrub real and guarantees the line,
       * the fox and the card states can never read different progress values.
       */
      const state = { p: 0 };
      const tween = gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => render(state.p),
        scrollTrigger: {
          trigger: root.current,
          start: "top 72%",
          end: "bottom 82%",
          scrub: 0.6,
        },
      });

        // Card positions are percentage-based, so a resize moves the route out
        // from under the fox unless everything is re-placed.
        const onResize = () => render(state.p);
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          tween.scrollTrigger?.kill();
          tween.kill();
          // Leave no state behind for the mobile layout to inherit: without
          // this, dropping below the breakpoint keeps whichever cards were
          // lit at the time and dims the rest permanently.
          steps.forEach((el) => el.classList.remove("is-active"));
          progress.setAttribute("d", "");
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [pathD, height] }
  );

  return (
    <div ref={root} className={`relative max-md:pt-10 max-md:pb-16 md:py-20 px-8 ${className || ""}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {/*
          The measured height belongs to the md+ layout only, where the cards
          are absolutely positioned and the stage has to reserve room for them.
          It used to be applied as an inline `height`, which beats the `h-auto`
          class at every breakpoint, so on phones the stage was pinned to
          ~1130px while six cards stacked in flow needed roughly twice that, and
          the overflow landed on top of whatever section came next. The variable
          is named `--md-height` because that was always the intent; the media
          query that scoped it is in globals.css.
        */}
        <div
          className="how-it-works-stage relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block"
          style={{ "--md-height": `${height}px` }}
        >
          {data.length > 1 && (
            <>
              <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 ${VB_WIDTH} ${height}`}
                preserveAspectRatio="none"
              >
                {/* The route not yet taken. Dashed and static, it used to
                    march on a loop, which competed with the scroll-driven
                    fill for attention and never meant anything. */}
                <path
                  ref={pathRef}
                  d={pathD}
                  stroke="currentColor"
                  className="text-outline/55"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* The route already walked, drawn over it: solid, brand
                    royal, thicker. Driven by scroll offset, so it retracts
                    when you scroll back up. */}
                <path
                  ref={progressRef}
                  d={pathD}
                  stroke="currentColor"
                  className="text-primary"
                  strokeWidth="2.75"
                  fill="none"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* The fox walks its own process. A generic dot or car would do
                  the same job; this one is the mark.

                  `z-0` and placed before the cards in the DOM, so it passes
                  *behind* them, the route runs under the cards, and a token
                  riding over the copy was covering the text it was meant to
                  be leading you through. No disc either: bare mark with a
                  drop shadow, which is what keeps it legible over the pale
                  ground without boxing it in. */}
              <div
                ref={travellerRef}
                aria-hidden="true"
                className="absolute top-0 left-0 z-0 hidden md:grid place-items-center pointer-events-none"
                style={{ width: TRAVELLER_PX, height: TRAVELLER_PX, willChange: "transform" }}
              >
                <span ref={walkerRef} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/logo-fox-knockout.svg"
                    alt=""
                    width={948}
                    height={746}
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-auto select-none drop-shadow-[0_3px_6px_rgba(8,29,74,0.28)]"
                  />
                </span>
              </div>
            </>
          )}

          {data.map((step, index) => {
            const position = positions[index % positions.length];
            return (
              <Card
                key={step.title}
                index={index}
                number={`0${index + 1}`}
                title={step.title}
                description={step.description}
                colorTheme={step.colorTheme || "primary"}
                colors={step.colors}
                rotate={position.rotate}
                className={position.className}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
