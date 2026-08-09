"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { withEmbedFlag } from "@/lib/embed";
import { downloadFile } from "@/lib/demo-mail";
import {
  DemoPanel,
  DemoControls,
  DemoLabel,
  DemoButton,
  DemoSegmented,
  DemoConsole,
} from "./demo-shell";
import {
  auditBreakpoints,
  describeElement,
  formatBytes,
  formatMs,
  readDom,
  readNavigation,
  readResources,
} from "./lib/page-metrics";

/**
 * The build inspector on /services/web-development.
 *
 * The old version of this demo moved a slider and reflowed a drawing of a
 * dashboard. This one resizes an `<iframe>` of the actual site and then reads
 * the result: navigation timings, the resource timeline, DOM structure, and a
 * width sweep that finds the exact pixel where the layout would overflow.
 *
 * Every figure on screen was measured a moment ago in the frame below it. That
 * is the difference between claiming a site is responsive and demonstrating it.
 */

const PRESETS = [
  { id: "phone", label: "Phone", width: 393 },
  { id: "tablet", label: "Tablet", width: 834 },
  { id: "laptop", label: "Laptop", width: 1280 },
  { id: "wide", label: "Wide", width: 1440 },
];

const ROUTES = ["/", "/services", "/pricing", "/contact"];

const HOST = "logixloops.in";

/* The board the device sits on. Everything inside is zoomed to fit it, so this
   is the one fixed number in the layout. */
const BOARD_HEIGHT = 560;

/* Chrome each shell spends before the page gets any height. */
const PHONE_STATUS = 54; /* island row */
const PHONE_URLBAR = 46;
const PHONE_GESTURE = 24; /* home-indicator strip */
const TABLET_CHROME = 44;
const DESKTOP_CHROME = 41;

/**
 * What device a given width *is*.
 *
 * The old demo drew one browser window at every width and gave it a fixed 500px
 * height. Both were wrong. A 393px browser window is not what a phone looks
 * like, and 500px is shorter than any real screen, which is why the hero's
 * call to action sat below the fold at every width, in a frame claiming to
 * show how the page renders. Each shell now carries its device's true logical
 * height, so what is visible in the frame is what is visible on the device.
 */
function deviceFor(width) {
  if (width < 520) {
    return { kind: "phone", height: 852, bezel: 12, radius: 56 };
  }
  if (width < 1024) {
    return { kind: "tablet", height: 1112, bezel: 22, radius: 30 };
  }
  // 16:10, the shape of essentially every laptop panel. 1280×800, 1440×900.
  return {
    kind: "desktop",
    height: Math.max(640, Math.min(920, Math.round(width / 1.6))),
    bezel: 0,
    radius: 12,
  };
}

const chromeFor = (kind) =>
  kind === "phone"
    ? PHONE_STATUS + PHONE_URLBAR + PHONE_GESTURE
    : kind === "tablet"
      ? TABLET_CHROME
      : DESKTOP_CHROME;

const TABS = [
  { id: "metrics", label: "Metrics" },
  { id: "inspect", label: "Inspect" },
  { id: "audit", label: "Breakpoints" },
];

export default function ViewportDemo({ color }) {
  const a = accent(color);

  const [width, setWidth] = useState(1280);
  const [stageWidth, setStageWidth] = useState(0);
  const [route, setRoute] = useState("/");
  const [tab, setTab] = useState("metrics");
  const [report, setReport] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [audit, setAudit] = useState({ status: "idle", rows: [], at: 0 });

  const frameRef = useRef(null);
  const stageRef = useRef(null);

  /* ── measure whatever is currently in the frame ──────────────────────── */
  const measure = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    try {
      const win = frame.contentWindow;
      setReport({
        navigation: readNavigation(win),
        resources: readResources(win),
        dom: readDom(win.document),
        at: Date.now(),
      });
    } catch {
      // A navigation can land between the load event and this read.
      setReport(null);
    }
  }, []);

  /* ── hover inspector, wired into the framed document ─────────────────── */
  //
  // Same-origin means we can attach listeners to the framed document directly
  // rather than guessing at coordinates. The overlay is drawn in the outer
  // document over the frame, so it is never clipped by the frame's own scroll.
  const attachInspector = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    let doc;
    try {
      doc = frame.contentDocument;
    } catch {
      return undefined;
    }
    if (!doc) return undefined;

    const onMove = (event) => {
      const el = event.target;
      if (!el || el.nodeType !== 1 || el === doc.documentElement) return;

      const described = describeElement(el, frame.contentWindow);
      // The overlay is drawn in *our* document, so the framed element's rect
      // is offset by where the frame sits in our layout. Both boxes are read
      // here, in the event handler, reading them during render would mean
      // touching refs mid-render and would go stale on scroll besides.
      const frameBox = frame.getBoundingClientRect();
      const stageBox = stageRef.current?.getBoundingClientRect();
      // The frame may be zoomed to fit, and the rect we just read is in the
      // framed document's own pixels. Recovering the factor from the rendered
      // box against the layout box keeps this correct without threading the
      // zoom through the listener's closure.
      const k = frame.offsetWidth ? frameBox.width / frame.offsetWidth : 1;

      setHovered({
        ...described,
        overlay: stageBox
          ? {
              left: frameBox.left - stageBox.left + described.rect.left * k,
              top: frameBox.top - stageBox.top + described.rect.top * k,
              width: described.rect.width * k,
              height: described.rect.height * k,
            }
          : null,
      });
    };
    const onLeave = () => setHovered(null);

    doc.addEventListener("mousemove", onMove, { passive: true });
    doc.addEventListener("mouseleave", onLeave);
    return () => {
      doc.removeEventListener("mousemove", onMove);
      doc.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (tab !== "inspect") return undefined;
    return attachInspector();
  }, [tab, attachInspector, route]);

  /* Leaving the Inspect tab drops the highlight. Done here rather than in the
     effect above so the state change stays in the event that caused it. */
  const changeTab = (next) => {
    if (next !== "inspect") setHovered(null);
    setTab(next);
  };

  /*
   * There was a drag handle on the right edge of the device, a short blue bar
   * that resized the frame. It is gone. It read as a scrollbar sitting on the
   * artwork rather than as a control, and it changed the one number the demo
   * is making a claim about, so a glance at the frame no longer matched the
   * width printed beside it. The four presets set the same widths, name the
   * device they belong to, and cannot land the frame on an arbitrary value.
   */

  /* The stage's own width, which is what the zoom is computed against.
     Clamping the frame to it instead would be the wrong trade: a 1440px
     preset has to actually lay out at 1440 or the breakpoint it demonstrates
     is a lie. So the frame keeps its true width and is scaled to fit, the way
     a device emulator does. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new ResizeObserver(() => setStageWidth(stage.clientWidth));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /*
   * Tell the framed document its viewport moved.
   *
   * Resizing an iframe element fires `resize` inside it for the *window*, but
   * scroll-linked layouts built on GSAP ScrollTrigger cache their measurements
   * and only recompute on an explicit refresh. Without this, a section
   * measured at 1440 keeps its 1440 geometry after the frame drops to 390,
   * which is what put the services constellation on top of itself. Dispatching
   * the event is enough: ScrollTrigger listens for it, and so does every
   * component here that tracks `innerWidth` itself.
   */
  const nudgeFrame = useCallback(() => {
    // Twice, deliberately. The first pass catches the layout as it stands; the
    // second catches it after webfonts land and images resolve, which on the
    // homepage moves several scroll-linked sections by more than their own
    // height. One pass left the constellation measured against a layout that
    // no longer existed, which is the overlap that shows up in the frame.
    [180, 700].forEach((delay) =>
      setTimeout(() => {
        try {
          frameRef.current?.contentWindow?.dispatchEvent(new Event("resize"));
        } catch {
          /* Navigating; the next load re-measures anyway. */
        }
      }, delay)
    );
  }, []);

  // Width is not the only thing that invalidates those measurements. The first
  // load and every in-frame route change need the same nudge, and neither was
  // getting one: `onLoad` only called `measure()`, which reads the frame from
  // the outside and tells the framed document nothing.
  useEffect(() => {
    nudgeFrame();
  }, [width, route, nudgeFrame]);

  const go = (next) => {
    setRoute(next);
    setReport(null);
    frameRef.current?.contentWindow?.location.replace(withEmbedFlag(next));
  };

  const runAudit = async () => {
    const frame = frameRef.current;
    if (!frame || audit.status === "running") return;

    setAudit({ status: "running", rows: [], at: 0 });
    try {
      const rows = await auditBreakpoints(frame, {
        from: 320,
        to: 1440,
        step: 40,
        onProgress: (w) => setAudit((prev) => ({ ...prev, at: w })),
      });
      setAudit({ status: "done", rows, at: 1440 });
    } catch {
      setAudit({ status: "error", rows: [], at: 0 });
    }
    measure();
  };

  const exportReport = () => {
    downloadFile(
      `logixloops-inspection${route.replace(/\//g, "-") || "-home"}.json`,
      JSON.stringify(
        {
          route,
          measuredAt: new Date().toISOString(),
          frameWidth: width,
          navigation: report?.navigation,
          resources: report?.resources,
          dom: report?.dom,
          breakpointSweep: audit.rows,
        },
        null,
        2
      ),
      "application/json"
    );
  };

  const nav = report?.navigation;
  const res = report?.resources;
  const dom = report?.dom;
  const breaks = audit.rows.filter((r) => r.overflow > 1);

  const device = deviceFor(width);
  const outerWidth = width + device.bezel * 2;
  const outerHeight = device.height + device.bezel * 2;

  /* Zoom-to-fit, both axes. Capped at 1 so a small device is never blown up
     past its own pixels, that would be a lie in the other direction. */
  const scale = Math.min(
    1,
    stageWidth ? stageWidth / outerWidth : 1,
    BOARD_HEIGHT / outerHeight
  );
  const overlay = hovered?.overlay ?? null;

  return (
    <DemoPanel>
      <DemoControls>
        <DemoSegmented color={color} label="View" value={tab} options={TABS} onChange={changeTab} />

        <div className="flex items-center gap-2">
          <DemoLabel>Width</DemoLabel>
          {PRESETS.map((preset) => (
            <DemoButton
              key={preset.id}
              color={color}
              active={width === preset.width}
              onClick={() => {
                setWidth(preset.width);
                setTimeout(measure, 120);
              }}
            >
              {preset.label}
            </DemoButton>
          ))}
          <span className={cn("font-label text-label-caps uppercase tracking-widest", a.text)}>
            {width}px
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DemoLabel>Route</DemoLabel>
          {ROUTES.map((path) => (
            <DemoButton key={path} color={color} active={route === path} onClick={() => go(path)}>
              {path === "/" ? "home" : path.slice(1)}
            </DemoButton>
          ))}
        </div>
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        {/* ── the frame ── */}
        <div ref={stageRef} className="relative min-w-0" style={{ height: BOARD_HEIGHT }}>
          {/*
            Absolute + translate(-50%,-50%), not a scaled block in normal flow.
            The unscaled device is routinely taller than the board, a phone is
            876px against 560, and a transform does not affect layout, so an
            in-flow box would reserve its full height and punch through the
            panel below. Positioning from the centre point makes placement
            independent of the box's own size, which is the whole trick behind
            zoom-to-fit.
          */}
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: outerWidth,
              height: outerHeight,
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <DeviceShell device={device} host={HOST} route={route} accent={a} width={width}>
              <iframe
                ref={frameRef}
                title="LogixLoops, measured live"
                src={withEmbedFlag("/")}
                /*
                 * This iframe boots a second, complete copy of the
                 * application, React, GSAP, framer-motion, the hero canvas,
                 * on the same main thread as the page you are reading. Eager,
                 * it did that during the initial load of every visit to
                 * /services/web-development, while the outer page was still
                 * hydrating, and the demo sits most of a screen down. Lazy,
                 * the browser holds it until you are near it.
                 */
                loading="lazy"
                onLoad={() => {
                  measure();
                  nudgeFrame();
                  if (tab === "inspect") attachInspector();
                }}
                className="block w-full flex-1 border-0 bg-surface"
                style={{ height: device.height - chromeFor(device.kind) }}
              />
            </DeviceShell>
          </div>

          <span className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-on-surface/70 px-2 py-0.5 font-mono text-[10px] text-surface">
            {width}×{device.height} · fit {Math.round(scale * 100)}%
          </span>

          {/* Inspector overlay, box model, drawn over the frame */}
          {tab === "inspect" && overlay && (
            <div
              aria-hidden
              className="pointer-events-none absolute z-10 border-2 border-primary/70 bg-primary/10"
              style={overlay}
            >
              <span className="absolute -top-6 left-0 whitespace-nowrap rounded bg-on-surface px-2 py-0.5 font-mono text-[10px] text-surface">
                {hovered.selector} · {hovered.width}×{hovered.height}
              </span>
            </div>
          )}
        </div>

        {/* ── readout ── */}
        <div className="flex min-w-0 flex-col gap-4">
          {tab === "metrics" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Metric label="TTFB" value={formatMs(nav?.ttfb)} accent={a} />
                <Metric label="DOM ready" value={formatMs(nav?.domContentLoaded)} accent={a} />
                <Metric label="Load" value={formatMs(nav?.load)} accent={a} />
                <Metric
                  label="Transferred"
                  value={nav?.cached ? "cache hit" : formatBytes(nav?.transferSize)}
                  accent={a}
                />
              </div>

              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                  Resource weight · {res?.count ?? 0} requests · {formatBytes(res?.bytes)}
                </p>
                <div className="flex flex-col gap-2">
                  {(res?.buckets || []).map((bucket) => (
                    <div key={bucket.type}>
                      <div className="mb-1 flex items-baseline justify-between font-body text-body-sm">
                        <span className="text-on-surface">{bucket.type}</span>
                        <span className="font-mono text-[11px] text-on-surface-variant">
                          {bucket.count} · {formatBytes(bucket.bytes)}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-outline-variant/25">
                        <span
                          className={cn("block h-full rounded-full", a.dot)}
                          style={{
                            width: `${res.bytes ? (bucket.bytes / res.bytes) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {!res?.buckets?.length && (
                    <p className="font-body text-body-sm text-on-surface-variant">
                      No resource entries yet, reload the frame.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                  Document
                </p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 font-body text-body-sm">
                  <Fact label="DOM nodes" value={dom?.nodes} />
                  <Fact label="Max depth" value={dom?.depth} />
                  <Fact label="Images" value={dom?.images} />
                  <Fact label="Lazy-loaded" value={dom?.lazyImages} />
                  <Fact label="Links" value={dom?.links} />
                  <Fact label="Landmarks" value={dom?.landmarks} />
                  <Fact
                    label="Missing alt"
                    value={dom?.imagesMissingAlt}
                    bad={dom?.imagesMissingAlt > 0}
                  />
                  <Fact label="Heading skips" value={dom?.headingSkips} bad={dom?.headingSkips > 0} />
                </dl>
                <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
                  Protocol <span className="font-mono">{nav?.protocol}</span>, one{" "}
                  <span className="font-mono">h1</span>
                  {dom?.h1s === 1 ? ", correct" : `, found ${dom?.h1s ?? 0}`}.
                </p>
              </div>

              <DemoButton color={color} onClick={measure}>
                Re-measure
              </DemoButton>
            </>
          )}

          {tab === "inspect" && (
            <>
              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                  Hovered element
                </p>
                {hovered ? (
                  <>
                    <p className={cn("mb-3 font-mono text-[12px]", a.text)}>{hovered.selector}</p>
                    <BoxModel data={hovered} />
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-body text-body-sm">
                      <Fact label="display" value={hovered.display} />
                      <Fact label="font-size" value={hovered.fontSize} />
                    </dl>
                  </>
                ) : (
                  <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                    Move the pointer over the page in the frame. The overlay is drawn from the real
                    element rect and the box model comes from{" "}
                    <span className="font-mono">getComputedStyle</span>, same source devtools uses.
                  </p>
                )}
              </div>

              {hovered && (
                <DemoConsole title="outerHTML" className="max-h-52">
                  <pre className="whitespace-pre-wrap break-all">{hovered.html}</pre>
                </DemoConsole>
              )}
            </>
          )}

          {tab === "audit" && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <DemoButton
                  color={color}
                  active
                  onClick={runAudit}
                  disabled={audit.status === "running"}
                >
                  {audit.status === "running" ? `Sweeping ${audit.at}px…` : "Sweep 320 → 1440"}
                </DemoButton>
                {audit.status === "done" && (
                  <DemoButton color={color} onClick={exportReport}>
                    Export JSON
                  </DemoButton>
                )}
              </div>

              <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
                {audit.status === "idle" && (
                  <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                    The sweep resizes the frame in 40px steps, lets each width lay out, then
                    compares <span className="font-mono">scrollWidth</span> against{" "}
                    <span className="font-mono">clientWidth</span>. Where they disagree it walks the
                    DOM for the element sticking out furthest. That is a horizontal scrollbar, found
                    before a user finds it.
                  </p>
                )}

                {audit.status === "running" && (
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Measuring at {audit.at}px…
                  </p>
                )}

                {audit.status === "error" && (
                  <p className="font-body text-body-sm text-error">
                    The frame navigated mid-sweep. Try again once it settles.
                  </p>
                )}

                {audit.status === "done" && (
                  <>
                    <p
                      className={cn(
                        "mb-3 font-heading text-body-md",
                        breaks.length ? "text-error" : a.text
                      )}
                    >
                      {breaks.length
                        ? `Overflow at ${breaks.length} of ${audit.rows.length} widths`
                        : `Clean across all ${audit.rows.length} widths`}
                    </p>

                    <div className="mb-4 flex h-16 items-end gap-[2px]">
                      {audit.rows.map((row) => (
                        <span
                          key={row.width}
                          title={`${row.width}px, ${row.overflow > 1 ? `${row.overflow}px overflow` : "clean"}`}
                          className={cn(
                            "flex-1 rounded-sm transition-colors",
                            row.overflow > 1 ? "bg-error" : a.dot
                          )}
                          style={{
                            height: row.overflow > 1 ? `${Math.min(100, 30 + row.overflow)}%` : "22%",
                          }}
                        />
                      ))}
                    </div>

                    {breaks.length > 0 && (
                      <DemoConsole title="Offenders" className="max-h-40">
                        {breaks.map((row) => (
                          <p key={row.width}>
                            <span className="text-error">{row.width}px</span>, {row.overflow}px past
                            the viewport · <span className={a.text}>{row.culprit || "unknown"}</span>
                          </p>
                        ))}
                      </DemoConsole>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        One codebase, measured live. Everything above came out of{" "}
        <span className="font-mono">performance.getEntries()</span> and{" "}
        <span className="font-mono">getComputedStyle</span> on the frame below, {" "}
        <span className={a.text}>no fixtures, no screenshots</span>. Change the route or the width
        and every number changes with it.
      </p>
    </DemoPanel>
  );
}

/* ── device shells ───────────────────────────────────────────────────────── */

/** The Tailwind breakpoint the current width lands in. */
function bpLabel(width) {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}

const DARK_FRAME = "linear-gradient(140deg, #34373d 0%, #22252a 45%, #131519 100%)";
const FRAME_SHADOW = "0 18px 40px rgba(0,0,0,.32), 0 3px 8px rgba(0,0,0,.24)";

/*
 * The fold.
 *
 * Each shell is a fixed screen height over a page that is far taller, so
 * whatever row lands on the bottom edge is sliced through the middle. A half
 * card reads as a rendering fault, which is the one thing a frame that exists
 * to prove the layout works must not do.
 *
 * A fade rather than a trim: the frame's height comes from the device it is
 * imitating, so it cannot be tuned to a whole number of rows, and the row
 * heights change per route anyway. The stop colour is `surface`, the site's
 * own page background, so the last row dissolves into the page instead of
 * under a panel. It is short enough to leave the row legible, and the frame
 * still scrolls, so nothing behind it is unreachable.
 */
const FOLD_FADE = "linear-gradient(to bottom, rgba(247,250,255,0) 0%, #f7faff 88%)";

const FoldFade = ({ bottom = 0 }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-x-0 z-10 h-14"
    style={{ bottom, background: FOLD_FADE }}
  />
);

/**
 * The shell around the frame.
 *
 * It is not decoration. "This is 393 logical pixels" is a claim nobody can
 * check by looking at a rectangle, and a browser window drawn at phone width
 * reads as a small desktop rather than as a phone, so the layout inside gets
 * judged as if it were broken. Wrapping the same iframe in the device the width
 * belongs to makes the claim legible, and costs the demo nothing: the page
 * inside still lays out at its true width, and every number in the readout is
 * still measured from it.
 */
function DeviceShell({ device, host, route, accent: a, width, children }) {
  const path = route === "/" ? "" : route;
  const badge = (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 font-label text-[9px] uppercase tracking-widest",
        a.soft,
        a.text
      )}
    >
      {bpLabel(width)}
    </span>
  );

  if (device.kind === "phone") {
    return (
      <div
        className="h-full w-full"
        style={{
          borderRadius: device.radius + device.bezel,
          padding: device.bezel,
          background: DARK_FRAME,
          boxShadow: FRAME_SHADOW,
          boxSizing: "border-box",
        }}
      >
        <div
          className="relative flex h-full w-full flex-col overflow-hidden bg-white"
          style={{ borderRadius: device.radius }}
        >
          {/* Status bar. The island is drawn inside the screen, the way it is
              on the device, it overlaps the page, it is not a gap above it. */}
          <div
            className="relative flex shrink-0 items-center justify-between px-7 font-label text-[12px] text-on-surface"
            style={{ height: PHONE_STATUS }}
          >
            <span className="font-semibold">9:41</span>
            <span
              aria-hidden
              className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black"
              style={{ width: 112, height: 32 }}
            />
            <span aria-hidden className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[3px] rounded-sm bg-on-surface" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-1 h-3 w-6 rounded-[3px] border border-on-surface/60 p-[2px]">
                <span className="block h-full w-2/3 rounded-[1px] bg-on-surface" />
              </span>
            </span>
          </div>

          {/* Safari's address bar sits at the top on iPad and at the bottom on
              iPhone; drawn at the top here so it never covers the page's own
              bottom-anchored UI. */}
          <div
            className="flex shrink-0 items-center gap-2 px-4"
            style={{ height: PHONE_URLBAR }}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-surface-container px-3 py-1.5">
              <LockGlyph />
              <span className="truncate font-mono text-[11px] text-on-surface-variant">
                {host}
                {path}
              </span>
            </span>
            {badge}
          </div>

          {children}

          {/* Sat above the gesture strip, not over it, so the cut row appears
              to run under the home indicator, which is what iOS actually
              does. */}
          <FoldFade bottom={PHONE_GESTURE} />

          <div className="flex shrink-0 items-end justify-center pb-2" style={{ height: PHONE_GESTURE }}>
            <span aria-hidden className="h-[5px] w-[34%] rounded-full bg-on-surface/40" />
          </div>
        </div>
      </div>
    );
  }

  if (device.kind === "tablet") {
    return (
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: device.radius + device.bezel,
          padding: device.bezel,
          background: DARK_FRAME,
          boxShadow: FRAME_SHADOW,
          boxSizing: "border-box",
        }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-[9px] h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{ background: "#0b0c10" }}
        />
        <div
          className="relative flex h-full w-full flex-col overflow-hidden bg-white"
          style={{ borderRadius: device.radius }}
        >
          <div
            className="flex shrink-0 items-center gap-3 border-b border-outline-variant/30 bg-surface-container px-4"
            style={{ height: TABLET_CHROME }}
          >
            <span className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-surface px-3 py-1.5">
              <LockGlyph />
              <span className="truncate font-mono text-[11px] text-on-surface-variant">
                {host}
                {path}
              </span>
            </span>
            {badge}
          </div>
          {children}
          <FoldFade />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden border border-outline-variant/40 bg-white"
      style={{ borderRadius: device.radius, boxShadow: FRAME_SHADOW }}
    >
      <div
        className="flex shrink-0 items-center gap-2 border-b border-outline-variant/30 bg-surface-container px-4"
        style={{ height: DESKTOP_CHROME }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant" />
        <span className="ml-3 flex min-w-0 flex-1 items-center gap-2 truncate font-mono text-[11px] text-on-surface-variant">
          <LockGlyph />
          {host}
          {path}
        </span>
        {badge}
      </div>
      {children}
      <FoldFade />
    </div>
  );
}

function LockGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3 shrink-0 fill-none stroke-current stroke-[1.2] text-on-surface-variant">
      <rect x="2.5" y="5.2" width="7" height="5" rx="1.2" />
      <path d="M4.2 5.2V3.9a1.8 1.8 0 0 1 3.6 0v1.3" />
    </svg>
  );
}

/* ── small presentational pieces ─────────────────────────────────────────── */

function Metric({ label, value, accent: a }) {
  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
      <p className={cn("mt-1 font-display text-xl leading-none", a.text)}>{value}</p>
    </div>
  );
}

function Fact({ label, value, bad }) {
  return (
    <>
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className={cn("text-right font-mono text-[11px]", bad ? "text-error" : "text-on-surface")}>
        {value ?? ". "}
      </dd>
    </>
  );
}

/** The nested margin/padding/content diagram, drawn from real numbers. */
function BoxModel({ data }) {
  const [mt, mr, mb, ml] = data.margin;
  const [pt, pr, pb, pl] = data.padding;
  return (
    <div className="rounded-xl border border-dashed border-outline-variant/50 bg-surface/40 p-2 text-center font-mono text-[10px] text-on-surface-variant">
      <span>{mt}</span>
      <div className="my-1 flex items-center gap-2">
        <span>{ml}</span>
        <div className="flex-1 rounded-lg border border-outline-variant/50 bg-surface p-2">
          <span>{pt}</span>
          <div className="my-1 flex items-center gap-2">
            <span>{pl}</span>
            <div className="flex-1 rounded bg-primary/10 py-2 text-on-surface">
              {data.width} × {data.height}
            </div>
            <span>{pr}</span>
          </div>
          <span>{pb}</span>
        </div>
        <span>{mr}</span>
      </div>
      <span>{mb}</span>
    </div>
  );
}
