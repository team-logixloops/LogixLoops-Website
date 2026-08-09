"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Where the stage parks under the navbar while the rail runs through it. One
 * constant, because the sticky offset and the ScrollTrigger start have to
 * agree: if they drift, the rail starts travelling before the stage has
 * settled and the whole section appears to slide.
 */
const STAGE_TOP = 112;

/**
 * LOGIXLOOPS: Scroll Timeline
 *
 * One sequence component in two orientations, with the same animation in
 * both: a rail advances as you scroll, the step you are on lights its node,
 * the rest rest back. Presentation lives in `globals.css` under "Scroll
 * Timeline".
 *
 * Orientation carries meaning rather than fitting a layout:
 *
 *   vertical    a sequence you read. Gates, phases with an argument behind
 *               them. The rail draws down the page as you read down it.
 *
 *   horizontal  a sequence something travels along. A delivery pipeline, a CI
 *               run. The stage sticks and the rail travels sideways through
 *               it, scrubbed off page scroll, so moving through the sequence
 *               *is* scrolling. There is no separate control to operate.
 *
 * Why the horizontal one is scroll-driven and not a carousel
 * ----------------------------------------------------------
 * The first cut made it an ordinary scroll container with two arrow buttons,
 * on a worry about Lenis owning the wheel. That was wrong for this codebase,
 * where `ServicesInertiaGrid` already runs a sticky stage against a scrubbed
 * ScrollTrigger, and it cost the section its point: a rail you have to push
 * with a button is a carousel, and a carousel does not say "these happen in
 * this order".
 *
 * So on a desktop pointer the stage holds still and the rail moves through
 * it. It uses `position: sticky` over a measured runway rather than
 * ScrollTrigger's `pin`, matching the constellation: no pin-spacer is
 * injected into the layout, and nothing has to be re-measured when the page
 * around it reflows.
 *
 * The scroller survives as the fallback, because a sticky stage is the wrong
 * answer on the devices it is wrong on:
 *
 *   - touch and coarse pointers, where holding the page still fights momentum
 *     scroll and a phone viewport is too short to hold a stage;
 *   - narrow viewports, for the same reason;
 *   - `prefers-reduced-motion`, where content moving across the scroll
 *     direction is precisely what the setting asks you not to do;
 *   - any width where the rail already fits, which needs no mechanism at all.
 *
 * In that mode it is a native scroller: swipe, trackpad pan, tab order, and
 * two step buttons for wheel mice, which have no horizontal gesture. The
 * buttons are hidden in sticky mode, where scrolling is the control.
 *
 * Keyboard works in both. Under the sticky stage a card's position is derived
 * from page scroll and so cannot be scrolled into view on its own, so a card
 * receiving focus moves the *page* to the point in the runway that reveals
 * it.
 *
 * No React state at any point: progress is a custom property and activity is
 * a class, both written straight to the DOM. A sequence that re-rendered on
 * every scroll frame would cost more than it is worth.
 *
 * @param {object} props
 * @param {"vertical"|"horizontal"} [props.orientation]
 * @param {Array<{
 *   id: string,
 *   marker: string,
 *   title: string,
 *   body: string,
 *   icon?: string,
 *   meta?: string
 * }>} props.items
 * @param {string} props.label      Accessible name for the sequence.
 * @param {string} [props.className]
 */
export default function ScrollTimeline({
  orientation = "vertical",
  items,
  label,
  className,
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const rowRef = useRef(null);
  const railFillRef = useRef(null);
  const progressRef = useRef(null);
  const activeRef = useRef(-1);

  const isHorizontal = orientation === "horizontal";

  const setProgress = (value) =>
    progressRef.current?.style.setProperty(
      "--tl-progress",
      String(Math.min(1, Math.max(0, value)))
    );

  /* ─── Vertical: page scroll draws the rail and lights each step ─── */
  useEffect(() => {
    if (isHorizontal) return;
    const root = rootRef.current;
    if (!root) return;

    const steps = gsap.utils.toArray("[data-tl-step]", root);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      steps.forEach((step) => step.classList.add("is-active"));
      return;
    }

    const ctx = gsap.context(() => {
      if (railFillRef.current) {
        gsap.fromTo(
          railFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          }
        );
      }

      // A step owns the middle band of the viewport. Toggling back off on
      // leave is what keeps the lit step honest when the reader scrolls up
      // again, which a one-way `once: true` reveal cannot do.
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 70%",
          end: "bottom 45%",
          onToggle: ({ isActive }) =>
            step.classList.toggle("is-active", isActive),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [isHorizontal, items]);

  /**
   * Lights the step that belongs to a given fraction of the way through the
   * rail, in both modes.
   *
   * This used to be spatial: whichever card's left edge had crossed a reading
   * line near the left of the track. That is wrong at both ends of a
   * horizontal rail, and badly wrong at the far one. Travel stops when the
   * row's right edge meets the track's right edge, so the last card comes to
   * rest on the *right* of the viewport and its left edge never reaches the
   * line — it could never light, no matter how far you scrolled. With six
   * stages and three visible, the final three were all unreachable.
   *
   * Clamping the thresholds does not fix it either: it collapses the tail so
   * the cards before the last are skipped instead. The travel has to be
   * shared out across the steps rather than measured against a fixed line, so
   * position 0 is the first step, position 1 is the last, and every step in
   * between gets an equal share. Rounding puts the lit card near the middle
   * of what is on screen, which is where the eye already is.
   */
  const applyActive = useCallback((fraction, cards) => {
    if (!cards.length) return;
    const next = Math.round(
      Math.min(1, Math.max(0, fraction)) * (cards.length - 1)
    );
    if (next === activeRef.current) return;
    activeRef.current = next;
    cards.forEach((card, index) =>
      card.classList.toggle("is-active", index === next)
    );
  }, []);

  /* ─── Fallback mode: the scroller's own position drives it ─── */
  const syncRail = useCallback(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || root.dataset.tlMode === "sticky") return;

    const cards = Array.from(track.querySelectorAll("[data-tl-step]"));
    if (!cards.length) return;

    const max = track.scrollWidth - track.clientWidth;

    // Nothing to scroll: the rail already fits. Dimming five of six cards
    // that are all fully visible reads as a rendering fault rather than as
    // focus, so the sequence simply presents itself.
    if (max <= 1) {
      setProgress(1);
      cards.forEach((card) => card.classList.add("is-active"));
      activeRef.current = -1;
      return;
    }

    const fraction = track.scrollLeft / max;
    setProgress(fraction);
    applyActive(fraction, cards);
  }, [applyActive]);

  /* ─── Horizontal: sticky stage on desktop, native rail everywhere else ─── */
  useEffect(() => {
    if (!isHorizontal) return;
    const root = rootRef.current;
    const track = trackRef.current;
    const row = rowRef.current;
    const stage = stageRef.current;
    if (!root || !track || !row || !stage) return;

    root.dataset.tlMode = "rail";

    const mm = gsap.matchMedia();

    // Every condition here is a device this would be wrong on if it were not
    // checked. `min-width: 1024px` keeps phones and portrait tablets on the
    // swipe rail. `min-height: 640px` keeps short laptop and landscape-tablet
    // viewports off it too, since a stage taller than the space under the
    // navbar cannot stick without clipping itself. `hover`/`pointer: fine`
    // excludes touch, where holding the page still fights momentum scroll.
    mm.add(
      "(min-width: 1024px) and (min-height: 640px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => Math.max(0, row.scrollWidth - track.clientWidth);

        // The rail already fits at this width. A stage with nowhere to travel
        // would hold the page still for no reason, so this width keeps the
        // plain scroller.
        if (distance() === 0) return;

        // The media query cannot know how tall this particular stage came
        // out — six cards of dense copy are taller than four of one line. If
        // it will not fit under the navbar, sticking it would crop the cards
        // against the bottom of the viewport with no way to scroll them into
        // view, so the scroller stays.
        if (stage.offsetHeight + STAGE_TOP > window.innerHeight - 24) return;

        root.dataset.tlMode = "sticky";

        const cards = gsap.utils.toArray("[data-tl-step]", row);

        // The runway is what the stage sticks through: one stage height to
        // occupy, as much again as the rail has to travel, and then a settle
        // buffer. The buffer is why the last step is not the last frame —
        // travel finishes, the completed sequence holds still for a third of
        // a screen with every step behind you and the final one lit, and only
        // then does the page move on. Without it the rail is still landing at
        // the exact moment the stage lets go. The constellation on /services
        // holds its grid the same way, for the same reason.
        const settle = () => Math.round(window.innerHeight * 0.3);
        const measure = () => {
          root.style.height = `${stage.offsetHeight + distance() + settle()}px`;
        };
        measure();

        gsap.to(row, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: `top top+=${STAGE_TOP}`,
            // Ends at the travel distance, not at the runway's full height:
            // the settle buffer is runway the stage stays stuck through after
            // the rail has finished moving.
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
            onUpdate: (self) => {
              setProgress(self.progress);
              applyActive(self.progress, cards);
            },
          },
        });

        const onFocusIn = (event) => {
          const card = event.target.closest?.("[data-tl-step]");
          if (!card) return;
          const span = distance();
          if (!span) return;
          const trigger = travel.scrollTrigger;
          const fraction = Math.min(1, card.offsetLeft / span);
          const top = trigger.start + fraction * (trigger.end - trigger.start);
          // Same reason as everywhere else: Lenis writes the scroll position
          // every frame, so a native smooth scroll is overwritten before it
          // gets anywhere. Route the request through whatever owns scrolling.
          if (window.lenis) window.lenis.scrollTo(top);
          else window.scrollTo({ top, behavior: "smooth" });
        };
        row.addEventListener("focusin", onFocusIn);

        return () => {
          row.removeEventListener("focusin", onFocusIn);
          root.style.height = "";
          root.dataset.tlMode = "rail";
          gsap.set(row, { x: 0 });
        };
      }
    );

    return () => mm.revert();
  }, [isHorizontal, applyActive, items]);

  /* Fallback listener. It checks the mode rather than being torn down, so a
     viewport resized across the breakpoint hands control back without
     anything having to re-bind. */
  useEffect(() => {
    if (!isHorizontal) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        syncRail();
      });
    };

    syncRail();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHorizontal, syncRail, items]);

  const stepBy = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-tl-step]");
    const width = card ? card.getBoundingClientRect().width + 16 : 320;
    track.scrollBy({ left: direction * width, behavior: "smooth" });
  };

  if (!items?.length) return null;

  /* ─── Horizontal ─── */
  if (isHorizontal) {
    return (
      <div ref={rootRef} data-tl-mode="rail" className={cn("relative", className)}>
        <div ref={stageRef} className="tl-stage" style={{ top: STAGE_TOP }}>
          {/* Named as a region because in fallback mode it scrolls
              independently of the page, and a screen reader user needs
              telling before they land inside it. `tabIndex` is what lets
              arrow keys pan it there. */}
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label={label}
            /* Vertical padding, not margin. The track clips at its padding
               box, and the node sits on the row's top edge: when it lights up
               it scales to 1.3 and throws a 22px glow, all of which renders
               above that edge and was being sliced off. Padding grows the
               scrollport so the glow has somewhere to land. `pb-6` does the
               same for the active card's drop shadow. */
            className="tl-track no-scrollbar pt-7 pb-6"
          >
            {/* Nodes sit in a strip above the cards, not on their top edge. A
                card hanging its node outside itself would have it clipped the
                moment the row became a scroll container: an `overflow-x` box
                clips vertically too. */}
            <ol ref={rowRef} className="tl-row relative flex w-max items-stretch gap-4">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  data-tl-step
                  className={cn(
                    "relative flex flex-col shrink-0",
                    /* Fluid rather than stepped: at 320px a card is most of
                       the screen with a sliver of the next one showing, which
                       is the affordance that says the sequence continues, and
                       it stops growing once the copy reaches a comfortable
                       measure. */
                    "w-[clamp(15rem,78vw,22rem)]",
                    index === 0 && "is-active"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="tl-node relative z-10 mb-4 ml-6 h-[22px] w-[22px] shrink-0 rounded-full border-4 border-surface bg-outline-variant"
                  />
                  <div className="tl-card flex flex-1 flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/85 shadow-glass p-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                      {item.marker}
                    </span>
                    {item.icon ? (
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined icon-md text-primary mb-3"
                      >
                        {item.icon}
                      </span>
                    ) : null}
                    <h3 className="font-display text-headline-md text-on-surface mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-body-sm text-on-surface-variant flex-1">
                      {item.body}
                    </p>
                    {item.meta ? (
                      <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant/80 mt-4 pt-4 border-t border-outline-variant/30">
                        {item.meta}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div
              ref={progressRef}
              aria-hidden="true"
              className="relative h-[3px] flex-1 rounded-full bg-outline-variant/30 overflow-hidden"
            >
              <span className="tl-progress__fill absolute inset-0 rounded-full" />
            </div>

            {/* Fallback only. Under the sticky stage the page's own scroll is
                the control, and a pair of buttons duplicating it would be a
                second, worse way to do the same thing. */}
            <div className="tl-arrows flex gap-2">
              <button
                type="button"
                onClick={() => stepBy(-1)}
                aria-label={`${label}: previous step`}
                className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  arrow_back
                </span>
              </button>
              <button
                type="button"
                onClick={() => stepBy(1)}
                aria-label={`${label}: next step`}
                className="tap-target flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
              >
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Vertical ─── */
  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <ol aria-label={label} className="relative flex flex-col gap-stack-lg">
        {/* The rail sits behind the nodes at the same x as their centres.
            `left-[10px]` against a 22px node keeps the 2px line centred under
            it at every width, so nothing has to be re-measured on resize. */}
        <span
          aria-hidden="true"
          className="tl-rail absolute left-[10px] top-2 bottom-2 w-[2px] rounded-full"
        >
          <span
            ref={railFillRef}
            className="tl-rail__fill absolute inset-0 rounded-full"
          />
        </span>

        {items.map((item) => (
          <li key={item.id} data-tl-step className="relative pl-12 md:pl-16">
            <span
              aria-hidden="true"
              className="tl-node absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-4 border-surface bg-outline-variant"
            />
            <div className="tl-body">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-2 block">
                {item.marker}
              </span>
              <h3 className="font-display text-headline-md text-on-surface mb-3">
                {item.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant max-w-2xl">
                {item.body}
              </p>
              {item.meta ? (
                <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant/80 mt-4 block">
                  {item.meta}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
