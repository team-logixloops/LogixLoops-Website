"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef } from "react";
import {
  motion,
  transform,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * MARQUEE ALONG SVG PATH
 *
 * A marquee whose track is an arbitrary SVG path rather than a straight line.
 * Children are cloned `repeat` times, spread at even intervals round the
 * curve, and advanced together by a single shared offset, so the whole band
 * travels as one, and the curve is the only thing deciding where each item is
 * at any moment.
 *
 * The movement is CSS `offset-path` / `offset-distance`, not x/y. That matters:
 * the browser walks the curve for us, items rotate-free follow its bends, and
 * the whole thing stays on the compositor. Only one number changes per frame.
 *
 * Three notes on this port, for anyone comparing it with the original:
 *
 *   - Every per-item hook lives in `PathItem`. The version this came from
 *     called `useTransform`, `useMotionValue` and `useEffect` inside
 *     `items.map()`, which is a rules-of-hooks violation, it survives only
 *     while the item count never changes, and breaks the moment `repeat` or
 *     the children do.
 *   - CSS variable interpolation is written straight to the node in an effect
 *     using framer's standalone `transform()` mapper, rather than one
 *     `useTransform` hook per variable. Same result, no hook-per-entry, and
 *     one less subscription layer.
 *   - The band stops when it is off-screen and when the reader has asked for
 *     reduced motion, matching `ScrollMarquee`. Decoration should not hold a
 *     rAF slot while nobody is looking at it.
 *
 * @typedef {object} CSSVariableInterpolation
 * @property {string} property CSS custom property name, e.g. `--logo-opacity`.
 * @property {number|string} from Value at 0% along the path.
 * @property {number|string} to Value at 100% along the path.
 */

/** Wrap `value` into the half-open range [min, max), for any sign. */
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/**
 * One item riding the curve. Owns every hook that is per-item, so the parent's
 * hook order stays fixed no matter how many items there are.
 */
function PathItem({
  child,
  /** Position of this item in the ring, 0..itemCount-1. */
  itemIndex,
  itemCount,
  path,
  baseOffset,
  easing,
  cssVarMappers,
  enableRollingZIndex,
  zIndexBase,
  zIndexRange,
  offsetRotate,
  interactive,
  grabCursor,
  ariaHidden,
  onHoverChange,
}) {
  const ref = useRef(null);

  // Where this item sits, 0–100, as a plain number. Everything else derives
  // from it: the offset string, the z-index, the CSS variables.
  const startPercent = (itemIndex * 100) / itemCount;
  const progress = useTransform(baseOffset, (v) =>
    wrap(0, 100, v + startPercent)
  );

  const offsetDistance = useTransform(progress, (p) =>
    easing ? `${easing(p / 100) * 100}%` : `${p}%`
  );

  // Items nearer the end of the path stack above earlier ones, so an item
  // passing behind another at a crossing reads as depth rather than a flicker.
  const zIndex = useTransform(progress, (p) =>
    Math.floor(zIndexBase + (p / 100) * zIndexRange)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || cssVarMappers.length === 0) return;

    const apply = (p) => {
      for (const { property, map } of cssVarMappers) {
        el.style.setProperty(property, String(map(p)));
      }
    };

    apply(progress.get());
    return progress.on("change", apply);
  }, [cssVarMappers, progress]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute top-0 left-0",
        interactive && grabCursor && "cursor-grab"
      )}
      style={{
        offsetPath: `path('${path}')`,
        offsetDistance,
        offsetRotate,
        zIndex: enableRollingZIndex ? zIndex : undefined,
        willChange: "offset-distance",
        backfaceVisibility: "hidden",
      }}
      aria-hidden={ariaHidden}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {child}
    </motion.div>
  );
}

/**
 * @param {object} props
 * @param {React.ReactNode} props.children Items to send round the path.
 * @param {string} [props.className]
 * @param {string} props.path The `d` attribute the items travel along.
 * @param {string} [props.pathId] Stable id for the rendered `<path>`.
 * @param {string} [props.preserveAspectRatio]
 * @param {boolean} [props.showPath] Stroke the path in `currentColor`.
 * @param {string|number} [props.width]
 * @param {string|number} [props.height]
 * @param {string} [props.viewBox]
 * @param {number} [props.baseVelocity] Percent of the path per second.
 * @param {"normal"|"reverse"} [props.direction]
 * @param {(t: number) => number} [props.easing] Remaps 0–1 position along the path.
 * @param {boolean} [props.slowdownOnHover]
 * @param {number} [props.slowDownFactor]
 * @param {object} [props.slowDownSpringConfig]
 * @param {boolean} [props.useScrollVelocity] Let scroll speed drive the band.
 * @param {boolean} [props.scrollAwareDirection] Flip direction with scroll direction.
 * @param {object} [props.scrollSpringConfig]
 * @param {React.RefObject<HTMLElement|null>} [props.scrollContainer] Defaults to the window.
 * @param {number} [props.repeat] How many copies of the children to ring.
 * @param {boolean} [props.draggable]
 * @param {number} [props.dragSensitivity]
 * @param {number} [props.dragVelocityDecay]
 * @param {boolean} [props.dragAwareDirection]
 * @param {boolean} [props.grabCursor]
 * @param {boolean} [props.enableRollingZIndex]
 * @param {number} [props.zIndexBase]
 * @param {number} [props.zIndexRange]
 * @param {string} [props.offsetRotate] CSS `offset-rotate`. Defaults to `auto`,
 *   which tumbles each item to follow the curve's tangent. Pass `"0deg"` for
 *   content that must stay upright, logos, type, anything with a right way up.
 * @param {CSSVariableInterpolation[]} [props.cssVariableInterpolation]
 * @param {boolean} [props.responsive] Scale the whole field to fit its wrapper.
 */
export default function MarqueeAlongSvgPath({
  children,
  className,

  // Path
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",

  // Marquee
  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },

  // Scroll
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  // Repetition
  repeat = 3,

  // Drag
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  // Z-index
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,

  offsetRotate = "auto",

  cssVariableInterpolation = [],

  responsive = false,
}) {
  const container = useRef(null);
  const marqueeContainerRef = useRef(null);
  const baseOffset = useMotionValue(0);

  const reduceMotion = useReducedMotion();
  // Drag is a motion affordance too, offering a band you can fling to
  // someone who asked for less movement is the same request ignored twice.
  const interactive = draggable && !reduceMotion;

  // `useId` rather than Math.random: the id has to match between the server
  // render and the client one, and a random id does not.
  const generatedId = useId();
  const id = pathId || `marquee-path-${generatedId}`;

  /* ─── Responsive scaling ───
   * Written straight to the node rather than held in state: this runs on
   * every resize frame, and a setState here would re-render the whole band
   *, and every item in it, mid-drag. */
  useEffect(() => {
    if (!responsive) return;

    const wrapper = container.current;
    const marqueeContainer = marqueeContainerRef.current;
    if (!wrapper || !marqueeContainer) return;

    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
    const originalWidth = vbWidth || 100;
    const originalHeight = vbHeight || 100;

    const updateScale = () => {
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;
      if (!wrapperWidth || !wrapperHeight) return;

      const scale = Math.min(
        wrapperWidth / originalWidth,
        wrapperHeight / originalHeight
      );

      // Centre the scaled field inside the wrapper.
      const offsetX = (wrapperWidth - originalWidth * scale) / 2;
      const offsetY = (wrapperHeight - originalHeight * scale) / 2;

      marqueeContainer.style.width = `${originalWidth}px`;
      marqueeContainer.style.height = `${originalHeight}px`;
      marqueeContainer.style.transformOrigin = "top left";
      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    };

    updateScale();

    // ResizeObserver, not a window resize listener: the wrapper can change
    // width without the window doing so, a sibling collapsing, a scrollbar
    // appearing, a container query firing.
    const ro = new ResizeObserver(updateScale);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [responsive, viewBox]);

  /* ─── Items ───
   * Flattened once so each rendered copy has a stable key and a fixed index
   * in the ring. `repeatIndex > 0` copies are aria-hidden, so assistive tech
   * hears the list once rather than `repeat` times. */
  const items = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => ({
        child,
        repeatIndex,
        itemIndex: repeatIndex * childrenArray.length + childIndex,
        key: `${childIndex}-${repeatIndex}`,
      }))
    );
  }, [children, repeat]);

  // One mapper per CSS variable. `transform()` is framer's standalone
  // interpolator, it handles numbers and colour strings alike, and unlike
  // `useTransform` it is not a hook, so it can live in a loop.
  //
  // Keyed on the serialised config rather than on the array's identity:
  // callers pass this as an inline literal, which is a new object every
  // render, and rebuilding the mappers each time would re-run every item's
  // subscription effect for no change in value.
  const cssVarKey = JSON.stringify(cssVariableInterpolation);
  const cssVarMappers = useMemo(
    () =>
      JSON.parse(cssVarKey).map(({ property, from, to }) => ({
        property,
        map: transform([0, 100], [from, to]),
      })),
    [cssVarKey]
  );

  /* ─── Scroll coupling ───
   * `container` is not a scroll container, so passing it here would track a
   * element that never scrolls. Undefined means the window, which is what an
   * un-configured caller actually wants. */
  const { scrollY } = useScroll({ container: scrollContainer || undefined });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const isInView = useRef(true);

  const directionFactor = useRef(direction === "normal" ? 1 : -1);

  const hoverFactorValue = useMotionValue(1);
  const defaultVelocity = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  );

  // Pause when the band is off-screen. It is decoration; it should not cost
  // a frame while the reader is three sections away.
  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !isInView.current) return;

    if (isDragging.current && interactive) {
      baseOffset.set(baseOffset.get() + dragVelocity.current);
      dragVelocity.current *= 0.9;
      if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      return;
    }

    hoverFactorValue.set(
      isHovered.current && slowdownOnHover ? slowDownFactor : 1
    );

    let moveBy =
      directionFactor.current *
      baseVelocity *
      (delta / 1000) *
      smoothHoverFactor.get();

    if (scrollAwareDirection && !isDragging.current) {
      const v = velocityFactor.get();
      if (v < 0) directionFactor.current = -1;
      else if (v > 0) directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (interactive) {
      moveBy += dragVelocity.current;

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current);
      }

      // Bleed the fling off rather than stopping it dead on pointer-up.
      if (Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay;
      } else {
        dragVelocity.current = 0;
      }
    }

    baseOffset.set(baseOffset.get() + moveBy);
  });

  const lastPointerPosition = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (!interactive) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (grabCursor) e.currentTarget.style.cursor = "grabbing";

    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!interactive || !isDragging.current) return;

    const deltaX = e.clientX - lastPointerPosition.current.x;
    const deltaY = e.clientY - lastPointerPosition.current.y;

    // The path bends, so there is no single axis to project onto. Use the
    // magnitude of the drag and take its sign from the horizontal component,
    // which is what reads as "forward" on a broadly left-to-right curve.
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    dragVelocity.current =
      (deltaX > 0 ? magnitude : -magnitude) * dragSensitivity;

    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!interactive) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDragging.current = false;
    if (grabCursor) e.currentTarget.style.cursor = "grab";
  };

  const handleHoverChange = useCallback((hovered) => {
    isHovered.current = hovered;
  }, []);

  return (
    <div
      ref={container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn("relative", className)}
    >
      <div
        ref={marqueeContainerRef}
        className="relative"
        style={{ contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full"
          aria-hidden="true"
          focusable="false"
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? "currentColor" : "none"}
            fill="none"
          />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <PathItem
            key={key}
            child={child}
            itemIndex={itemIndex}
            itemCount={items.length}
            path={path}
            baseOffset={baseOffset}
            easing={easing}
            cssVarMappers={cssVarMappers}
            enableRollingZIndex={enableRollingZIndex}
            zIndexBase={zIndexBase}
            zIndexRange={zIndexRange}
            offsetRotate={offsetRotate}
            interactive={interactive}
            grabCursor={grabCursor}
            ariaHidden={repeatIndex > 0}
            onHoverChange={handleHoverChange}
          />
        ))}
      </div>
    </div>
  );
}
