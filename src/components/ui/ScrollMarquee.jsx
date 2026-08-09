"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollMarquee, a band of repeating brand type that always drifts, and
 * reverses direction with the page: scrolling down pushes it left-to-right,
 * scrolling up pulls it right-to-left. Scroll speed adds to the drift, so a
 * fast flick throws it and a stopped page leaves it idling.
 *
 * Everything runs on a single rAF that writes one `transform`. Notably it
 * does *not* re-render React on scroll, position lives in a ref, so a
 * 60fps animation costs zero reconciliation.
 *
 * The track is rendered twice and translated within the width of one copy,
 * wrapping with a modulo. That is what makes it seamless in both directions;
 * a single copy would leave a gap the moment it reverses.
 */
export default function ScrollMarquee({
  items,
  className,
  // px/sec the band travels when the page is still.
  idleSpeed = 110,
  // How hard scrolling adds to that. 1 scrolled px ≈ this many band px.
  scrollBoost = 34,
  // Ceiling on the scroll contribution, px/sec. High enough that a fast
  // flick genuinely rips; without a cap a trackpad fling can outrun the
  // wrap maths in a single frame.
  maxBoost = 9000,
}) {
  const trackRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!track || !copy) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let offset = 0;
    let direction = 1; // 1 = left-to-right (scrolling down), -1 = the reverse
    let boost = 0;
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let frame = 0;
    let running = true;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScroll;
      lastScroll = y;
      if (delta === 0) return;
      direction = delta > 0 ? 1 : -1;
      // Magnitude only, `direction` already carries the sign, and mixing
      // the two lets a fast upward flick read as downward motion.
      boost = Math.min(Math.abs(delta) * scrollBoost, maxBoost);
    };

    const tick = (now) => {
      if (!running) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp tab-switch jumps
      lastTime = now;

      // Boost bleeds off so the band eases back to its idle drift rather
      // than stopping dead the instant scrolling does. 0.22^dt loses about
      // 78% per second, long enough to feel like momentum, short enough
      // that the band is calm again a beat after scrolling stops.
      boost *= Math.pow(0.22, dt);

      const width = copy.offsetWidth;
      if (width > 0) {
        offset += direction * (idleSpeed + boost) * dt;
        // Modulo into [-width, 0) so both directions wrap seamlessly.
        offset = ((offset % width) - width) % width;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    // Pause entirely when the band is off-screen, this is decoration, and
    // it should not hold a rAF slot while the user is three sections away.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          lastTime = performance.now();
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "100px" }
    );
    io.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [idleSpeed, scrollBoost, maxBoost]);

  // One copy of the content, rendered twice below. The second is aria-hidden
  // so the phrase is announced once rather than doubled.
  const content = (hidden) => (
    <div
      ref={hidden ? undefined : copyRef}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-poster uppercase tracking-tight text-on-surface/85 text-[clamp(1.5rem,4vw,3rem)] leading-none whitespace-nowrap">
            {item}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-fox-knockout.svg"
            alt=""
            aria-hidden="true"
            width={948}
            height={746}
            className="mx-8 sm:mx-12 h-[clamp(1.75rem,4.5vw,3.25rem)] w-auto shrink-0 select-none opacity-70"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={className}
      role="presentation"
      // The band is ornamental; its words repeat copy that appears in the
      // sections either side of it.
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {content(false)}
        {content(true)}
      </div>
    </div>
  );
}
