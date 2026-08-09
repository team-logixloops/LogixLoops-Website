"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IPhoneMockup, iphoneSpec } from "@/components/ui/iphone-mockup";

/**
 * A device outlet that shows a whole document at once.
 *
 * Two problems this solves for the design-system editor. First, a bare
 * `<iframe>` sized to a phone width is not a phone, a device frame is what
 * makes "this is 390 logical pixels" legible rather than merely true. Second,
 * and more practically: a fixed-height preview scrolls, and a scrolling
 * preview means an OS scrollbar sitting over the artwork and a viewer who can
 * only ever see the top of their own design.
 *
 * So the outlet measures the document and zooms to fit, the way a design tool
 * does. The iframe is always laid out at the device's true logical width, the
 * page inside genuinely believes it is on a 390px phone, and the whole frame
 * is then transform-scaled down until the full height fits the board. Nothing
 * scrolls, so there is no scrollbar to hide, and the zoom percentage is
 * reported rather than concealed.
 *
 * `sandbox="allow-same-origin"` is deliberate and is the narrow grant this
 * needs: it permits the parent to read the framed document's height, while
 * withholding `allow-scripts`, so nothing inside the preview can execute. The
 * exported document contains no script today; this keeps that true even if a
 * future edit to the generator forgets.
 */

const TABLET = { w: 834, h: 1112, bezel: 26, radius: 34 };

export default function DeviceOutlet({ device, html, boardHeight = 620, className }) {
  const boardRef = useRef(null);
  const frameRef = useRef(null);

  const [board, setBoard] = useState({ width: 0, height: boardHeight });
  const [contentHeight, setContentHeight] = useState(0);

  /* Board size drives the fit, so it has to be measured rather than assumed. */
  useEffect(() => {
    const node = boardRef.current;
    if (!node) return undefined;
    const observer = new ResizeObserver(() =>
      setBoard({ width: node.clientWidth, height: node.clientHeight })
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /**
   * Measure the framed document.
   *
   * `srcDoc` changes on every token tweak, so this re-runs constantly; reading
   * `scrollHeight` off the documentElement is the only number that reflects
   * what the new tokens actually did to the layout. Spacing and type-scale
   * changes move it by hundreds of pixels.
   */
  const measure = useCallback(() => {
    try {
      const doc = frameRef.current?.contentDocument;
      if (!doc?.documentElement) return;
      setContentHeight(
        Math.max(doc.documentElement.scrollHeight, doc.body?.scrollHeight || 0)
      );
    } catch {
      /* Only reachable if the sandbox grant is ever tightened. Fall back to
         the device's own height, which simply means no vertical fit. */
    }
  }, []);

  // Fonts land after load and can reflow the document; one re-measure catches
  // it without polling.
  useEffect(() => {
    const id = setTimeout(measure, 250);
    return () => clearTimeout(id);
  }, [html, measure]);

  const phoneSpec = iphoneSpec("15-pro");

  const layout =
    device === "phone"
      ? {
          // Outer frame size, not screen size, the bezel has to fit too.
          width: phoneSpec.w + phoneSpec.bezel * 2,
          height: phoneSpec.h + phoneSpec.bezel * 2,
          viewport: phoneSpec.w,
        }
      : device === "tablet"
        ? { width: TABLET.w + TABLET.bezel * 2, height: TABLET.h + TABLET.bezel * 2, viewport: TABLET.w }
        : { width: 1280, height: null, viewport: 1280 };

  /* Fit. For the two device frames the frame's own height is the constraint;
     for the browser it is the document, so the frame grows to the content and
     the zoom shrinks until that fits. */
  const naturalHeight =
    layout.height ?? Math.max(contentHeight || boardHeight, 400) + 44; /* + chrome bar */

  const scale = Math.min(
    1,
    board.width ? board.width / layout.width : 1,
    board.height ? board.height / naturalHeight : 1
  );

  const frame = (
    <iframe
      ref={frameRef}
      title="Design system export preview"
      srcDoc={html}
      onLoad={measure}
      sandbox="allow-same-origin"
      scrolling="no"
      className="block border-0 bg-white"
      style={{
        width: layout.viewport,
        height: device === "full" ? naturalHeight - 44 : "100%",
      }}
    />
  );

  /*
    The two device frames are a fixed screen height over a document that is
    routinely taller, and the iframe is `scrolling="no"`, so whatever row lands
    on the bottom edge gets sliced clean through the middle. A half card is
    read as a rendering fault rather than as "there is more below", which is
    the one thing a device preview must not do.

    A fade is the right fix rather than trimming the frame to a whole number of
    rows: the document is generated and its row heights change with every token
    tweak, so any height that fitted exactly would stop fitting on the next
    edit. White because that is the framed document's own background, so the
    content dissolves into the page instead of under a tinted panel.

    Device frames only. The browser preview grows to its content and has
    nothing to cut.
  */
  const cutFade = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
      style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff 85%)",
      }}
    />
  );

  return (
    <div
      ref={boardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low",
        className
      )}
      style={{ height: boardHeight }}
    >
      {/*
        Absolute + translate(-50%,-50%), not a centring grid. The unscaled box
        is routinely taller than the board, a tablet is 1164px against a 660px
        board, and an over-tall grid item grows the implicit row instead of
        centring, so the frame ends up hanging off the bottom. Positioning from
        the centre point makes the placement independent of the box's own size,
        which is the whole trick behind zoom-to-fit.
      */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: layout.width,
          height: naturalHeight,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {device === "phone" && (
          <IPhoneMockup
            model="15-pro"
            color="space-black"
            screenBg="#ffffff"
            /* Only the top inset is kept. Without it the island sits on top of
               the document's first heading; the bottom inset would just be a
               white band, since there is no home indicator drawn here. */
            safeAreaOverrides={{ top: 58, bottom: 0 }}
            showHomeIndicator={false}
            contentClassName="relative overflow-hidden"
          >
            {frame}
            {cutFade}
          </IPhoneMockup>
        )}

        {device === "tablet" && (
          <div
            className="relative h-full w-full"
            style={{
              borderRadius: TABLET.radius + TABLET.bezel,
              padding: TABLET.bezel,
              background: "linear-gradient(140deg, #3a3d44 0%, #23262c 45%, #15171b 100%)",
              boxShadow: "0 18px 40px rgba(0,0,0,.32), 0 3px 8px rgba(0,0,0,.24)",
              boxSizing: "border-box",
            }}
          >
            {/* Front camera, the one detail that reads "tablet" rather than
                "rounded rectangle" at a glance. */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[11px] h-1.5 w-1.5 -translate-x-1/2 rounded-full"
              style={{ background: "#0b0c10", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)" }}
            />
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                borderRadius: TABLET.radius,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)",
              }}
            >
              {frame}
              {cutFade}
            </div>
          </div>
        )}

        {device === "full" && (
          <div className="h-full w-full overflow-hidden rounded-xl border border-outline-variant/40 bg-white shadow-lg">
            <div className="flex h-11 items-center gap-2 border-b border-outline-variant/30 bg-surface-container px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
              <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
              <span className="ml-3 font-mono text-[11px] text-on-surface-variant">
                logixloops-design-system.html
              </span>
            </div>
            {frame}
          </div>
        )}
      </div>

      <span className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-on-surface/70 px-2 py-0.5 font-mono text-[10px] text-surface">
        {layout.viewport}px · fit {Math.round(scale * 100)}%
      </span>
    </div>
  );
}
