"use client";

/**
 * Measurement helpers for the web-development signature demo.
 *
 * Every number this module returns is read out of a live document, the same
 * `PerformanceNavigationTiming`, `PerformanceResourceTiming` and layout APIs a
 * devtools panel reads. Nothing is a fixture, which is why the figures move
 * when you change route and why they differ between a cold and a warm load.
 *
 * All of it depends on the framed document being same-origin. It is: the demo
 * frames this site, and `frame-ancestors 'self'` keeps anyone else out.
 */

const round = (n, places = 0) => {
  const factor = 10 ** places;
  return Math.round(n * factor) / factor;
};

export function formatBytes(bytes) {
  if (!bytes) return ". ";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${round(bytes / 1024)} KB`;
  return `${round(bytes / (1024 * 1024), 2)} MB`;
}

export function formatMs(ms) {
  if (ms == null || !Number.isFinite(ms)) return ". ";
  if (ms < 1) return "<1 ms";
  if (ms < 1000) return `${round(ms)} ms`;
  return `${round(ms / 1000, 2)} s`;
}

/**
 * Navigation timings.
 *
 * `transferSize` is 0 for a memory-cache hit and for a soft client-side
 * navigation, so a zero here means "not re-fetched", not "free", the caller
 * renders it as a cache hit rather than as a suspiciously good number.
 */
export function readNavigation(win) {
  const [nav] = win.performance.getEntriesByType("navigation");
  if (!nav) return null;

  return {
    ttfb: nav.responseStart - nav.requestStart,
    response: nav.responseEnd - nav.responseStart,
    domInteractive: nav.domInteractive - nav.startTime,
    domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
    load: nav.loadEventEnd > 0 ? nav.loadEventEnd - nav.startTime : null,
    transferSize: nav.transferSize,
    decodedSize: nav.decodedBodySize,
    protocol: nav.nextHopProtocol || ". ",
    cached: nav.transferSize === 0 && nav.decodedBodySize > 0,
  };
}

const RESOURCE_BUCKETS = {
  script: "JS",
  css: "CSS",
  link: "CSS",
  img: "Images",
  image: "Images",
  font: "Fonts",
  fetch: "Data",
  xmlhttprequest: "Data",
};

/** Per-type resource counts and weight, straight off the resource timeline. */
export function readResources(win) {
  const entries = win.performance.getEntriesByType("resource");
  const buckets = new Map();
  let bytes = 0;
  let blocking = 0;

  for (const entry of entries) {
    const type = RESOURCE_BUCKETS[entry.initiatorType] || "Other";
    const size = entry.transferSize || entry.encodedBodySize || 0;
    const current = buckets.get(type) || { type, count: 0, bytes: 0 };
    current.count += 1;
    current.bytes += size;
    buckets.set(type, current);
    bytes += size;
    // Render-blocking is only exposed on newer engines; absent means unknown,
    // not "none", so we only count what the browser positively reports.
    if (entry.renderBlockingStatus === "blocking") blocking += 1;
  }

  return {
    count: entries.length,
    bytes,
    blocking,
    buckets: [...buckets.values()].sort((a, b) => b.bytes - a.bytes),
  };
}

/** Structural facts about the document, the cheap half of an a11y sweep. */
export function readDom(doc) {
  const all = doc.querySelectorAll("*");
  const images = [...doc.images];
  const headings = [...doc.querySelectorAll("h1,h2,h3,h4,h5,h6")];

  let depth = 0;
  // Sampling the deepest 400 nodes is enough to find the deep-nesting problem
  // this is looking for, and avoids walking ancestors for every node on a page
  // that can carry several thousand.
  for (const node of [...all].slice(-400)) {
    let d = 0;
    let current = node;
    while (current.parentElement) {
      d += 1;
      current = current.parentElement;
    }
    if (d > depth) depth = d;
  }

  const headingOrder = headings.map((h) => Number(h.tagName[1]));
  let headingSkips = 0;
  for (let i = 1; i < headingOrder.length; i += 1) {
    if (headingOrder[i] - headingOrder[i - 1] > 1) headingSkips += 1;
  }

  return {
    nodes: all.length,
    depth,
    images: images.length,
    imagesMissingAlt: images.filter((img) => !img.alt).length,
    lazyImages: images.filter((img) => img.loading === "lazy").length,
    headings: headings.length,
    h1s: headings.filter((h) => h.tagName === "H1").length,
    headingSkips,
    links: doc.links.length,
    buttons: doc.querySelectorAll("button, [role='button']").length,
    landmarks: doc.querySelectorAll("header, nav, main, footer, aside, [role]").length,
    title: doc.title,
    lang: doc.documentElement.lang || null,
  };
}

/** Wait for the framed document to have laid out at its new width. */
function nextLayout(win) {
  return new Promise((resolve) => {
    win.requestAnimationFrame(() => win.requestAnimationFrame(resolve));
  });
}

/**
 * Sweep the frame across a range of widths and report where the layout
 * actually overflows.
 *
 * This is the part a screenshot cannot do. Each step resizes the real frame,
 * lets it reflow, then compares `scrollWidth` against `clientWidth`, the same
 * test a horizontal scrollbar represents. Where it fails, it walks the DOM for
 * the widest element sticking out past the viewport, which is nearly always
 * the actual culprit rather than the container reporting the overflow.
 */
export async function auditBreakpoints(frame, { from = 320, to = 1440, step = 40, onProgress }) {
  const originalWidth = frame.style.width;
  const results = [];

  try {
    for (let width = from; width <= to; width += step) {
      frame.style.width = `${width}px`;
      const win = frame.contentWindow;
      const doc = win.document;
      await nextLayout(win);

      const viewport = doc.documentElement.clientWidth;
      const content = doc.documentElement.scrollWidth;
      const overflow = content - viewport;

      let culprit = null;
      if (overflow > 1) {
        let worst = 0;
        for (const el of doc.body.querySelectorAll("*")) {
          const rect = el.getBoundingClientRect();
          const past = rect.right - viewport;
          // Ignore anything the author has explicitly clipped, an element
          // wider than its clipping parent is not an overflow the user sees.
          if (past > worst && rect.width > 0 && rect.width <= content) {
            worst = past;
            culprit = el;
          }
        }
      }

      results.push({
        width,
        viewport,
        content,
        overflow: Math.max(0, overflow),
        culprit: culprit ? describeSelector(culprit) : null,
      });

      onProgress?.(width, results.length);
    }
  } finally {
    // Always hand the frame back at the width the UI thinks it has, even if a
    // navigation mid-sweep threw on `contentWindow`.
    frame.style.width = originalWidth;
  }

  return results;
}

/** A short, readable selector, enough to find the node, not a full path. */
export function describeSelector(el) {
  const tag = el.tagName.toLowerCase();
  if (el.id) return `${tag}#${el.id}`;
  const cls = (typeof el.className === "string" ? el.className : "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .join(".");
  return cls ? `${tag}.${cls}` : tag;
}

/** Box model + the handful of computed properties worth showing on hover. */
export function describeElement(el, win) {
  const rect = el.getBoundingClientRect();
  const computed = win.getComputedStyle(el);
  const px = (v) => Math.round(parseFloat(v) || 0);

  return {
    selector: describeSelector(el),
    rect,
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    margin: [
      px(computed.marginTop),
      px(computed.marginRight),
      px(computed.marginBottom),
      px(computed.marginLeft),
    ],
    padding: [
      px(computed.paddingTop),
      px(computed.paddingRight),
      px(computed.paddingBottom),
      px(computed.paddingLeft),
    ],
    display: computed.display,
    fontSize: computed.fontSize,
    color: computed.color,
    background: computed.backgroundColor,
    // Trimmed hard: some nodes on this site serialise to tens of kilobytes.
    html: el.outerHTML.slice(0, 400),
  };
}
