"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import {
  GAP,
  IMAGE_SIZE,
  MAX_VELOCITY,
  BEND_DURATION,
  IDLE_VELOCITY_THRESHOLD,
  IDLE_TIMEOUT,
  SCRUB,
  LOOP,
  RESIZE_DEBOUNCE,
} from "./config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);
}

const mod = (n, m) => ((n % m) + m) % m;

/**
 * All GSAP logic for Wave Bend Content. Scroll PROGRESS drives horizontal
 * travel of segments along #line; scroll VELOCITY drives a MorphSVG bend of
 * #line itself. Text rides the bend for free via <textPath href="#line">;
 * images are placed manually every frame by sampling the live path.
 *
 * getComputedTextLength()/getTotalLength()/getPointAtLength() are DOM-only,
 * so nothing here runs until document.fonts.ready (otherwise every offset
 * is measured against the fallback font and the track is misaligned the
 * instant the real font swaps in) and, for images, until decode() resolves
 * (width depends on natural aspect ratio).
 */
export default function useWaveBend({
  containerRef,
  pinRef,
  lineRef,
  waveRef,
  segmentRefs,
  segments,
  enabled = true,
  gap = GAP,
  maxVelocity = MAX_VELOCITY,
  loop = LOOP,
}) {
  const layoutRef = useRef({ offsets: [], widths: [], totalTrackLength: 0 });
  const progressRef = useRef(0);

  useGSAP(
    (context, contextSafe) => {
      if (!enabled) return;
      const line = lineRef.current;
      const wave = waveRef.current;
      const track = segmentRefs.current.filter(Boolean);
      if (!line || !wave || track.length === 0) return;

      let cancelled = false;
      let resizeTimer;
      let idleTimer;
      let onTick;

      function measure() {
        const offsets = [];
        const widths = [];
        let cumulative = 0;

        track.forEach((seg) => {
          let w;
          if (seg.tagName === "text") {
            w = seg.getComputedTextLength();
          } else {
            const naturalW = Number(seg.dataset.naturalWidth) || IMAGE_SIZE;
            const naturalH = Number(seg.dataset.naturalHeight) || IMAGE_SIZE;
            w = IMAGE_SIZE * (naturalW / naturalH);
            seg.setAttribute("width", String(w));
          }
          offsets.push(cumulative);
          widths.push(w);
          cumulative += w + gap;
        });

        layoutRef.current = { offsets, widths, totalTrackLength: cumulative };
      }

      /*
       * Both the bend tween and ScrollTrigger want to re-place the track, and
       * during a scroll both fire in the same frame, so a direct call from
       * each ran the whole placement pass twice for one paint. Each pass walks
       * the track calling `getTotalLength` and two `getPointAtLength`s per
       * image, and those force the browser to re-flatten a path that the morph
       * has just rewritten.
       *
       * So callers mark the track dirty and the actual work happens once, on
       * the GSAP ticker, after the morph for that frame has been applied.
       */
      let dirty = false;
      const requestRender = () => {
        dirty = true;
      };

      // Frame order matters: caller must have already updated the path's
      // `d` (morph) before this runs, or images render one frame behind
      // the wave they're supposed to be glued to.
      function render() {
        const { offsets, widths, totalTrackLength } = layoutRef.current;
        if (totalTrackLength === 0) return;

        const pathLength = line.getTotalLength();
        const travel = progressRef.current * (totalTrackLength + pathLength);

        track.forEach((seg, i) => {
          const width = widths[i];
          let pos = offsets[i] - travel + pathLength;

          if (loop) {
            pos = mod(pos, totalTrackLength);
            while (pos > pathLength + width) pos -= totalTrackLength;
            while (pos < -width) pos += totalTrackLength;
          }

          const hidden = pos < -width || pos > pathLength;
          seg.style.opacity = hidden ? 0 : 1;

          if (seg.tagName === "text") {
            const textPath = seg.querySelector("textPath");
            if (textPath) textPath.setAttribute("startOffset", String(pos));
          } else {
            const cx = pos + width / 2;
            const clamped = Math.max(0, Math.min(pathLength, cx));
            const p = line.getPointAtLength(clamped);
            const p2 = line.getPointAtLength(Math.min(pathLength, clamped + 1));
            const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;

            // Negative half-dimensions + translated origin = rotation
            // pivots on the image center, not the top-left corner.
            seg.setAttribute("x", String(-width / 2));
            seg.setAttribute("y", String(-IMAGE_SIZE / 2));
            seg.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
          }
        });
      }

      const build = contextSafe(() => {
        if (cancelled) return;
        measure();

        // Paused morph tween, #line is the live target, never write to it
        // outside this tween or textPath/point-sampling go out of sync.
        const morph = gsap.to(line, {
          morphSVG: { shape: wave, shapeIndex: 0 },
          duration: 1,
          paused: true,
          ease: "none",
        });

        const bendState = { bend: 0 };
        // Smoothed proxy, not a direct morph.progress(bend) write (that
        // jitters). Placement lives in this same onUpdate, not only in
        // ScrollTrigger's, so segments stay glued to the path through the
        // ~600ms spring-back after the user stops scrolling, when scroll
        // events (and therefore ScrollTrigger.onUpdate) have stopped firing
        // but the path is still animating back to straight.
        const setBend = gsap.quickTo(bendState, "bend", {
          duration: BEND_DURATION,
          ease: "power3.out",
          onUpdate: () => {
            morph.progress(bendState.bend);
            requestRender();
          },
        });

        // Runs after GSAP's own tick, so any morph applied this frame is
        // already on the path by the time the track is placed against it.
        onTick = () => {
          if (!dirty) return;
          dirty = false;
          render();
        };
        gsap.ticker.add(onTick);

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: containerRef.current,
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            render();
          },
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const velocity = self.getVelocity();
            const bend =
              Math.abs(velocity) < IDLE_VELOCITY_THRESHOLD
                ? 0
                : gsap.utils.clamp(0, 1, Math.abs(velocity) / maxVelocity);
            setBend(bend);
            requestRender(); // keeps travel live even while bend is holding steady

            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => setBend(0), IDLE_TIMEOUT);
          },
        });

        render();
      });

      const imageDecodes = track
        .filter((seg) => seg.tagName === "image")
        .map((seg) => {
          const probe = new window.Image();
          probe.src = seg.getAttribute("href");
          return probe
            .decode()
            .catch(() => {})
            .then(() => {
              seg.dataset.naturalWidth = probe.naturalWidth || IMAGE_SIZE;
              seg.dataset.naturalHeight = probe.naturalHeight || IMAGE_SIZE;
            });
        });

      document.fonts.ready.then(() => Promise.all(imageDecodes)).then(build);

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          measure();
          ScrollTrigger.refresh();
        }, RESIZE_DEBOUNCE);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelled = true;
        clearTimeout(resizeTimer);
        clearTimeout(idleTimer);
        if (onTick) gsap.ticker.remove(onTick);
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: containerRef, dependencies: [enabled, segments, gap, maxVelocity, loop] }
  );
}
