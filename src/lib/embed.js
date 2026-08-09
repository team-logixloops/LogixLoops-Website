"use client";

/**
 * Embed mode.
 *
 * Two of the signature demos on /services/[slug] put the live site inside an
 * `<iframe>`, a real device frame on the mobile-apps page, a resizable browser
 * shell on the web-development page. Same origin, so it is genuinely this build
 * rendering itself, not a screenshot.
 *
 * A nested copy of the full site is expensive though: Lenis runs its own rAF
 * loop, the hero compiles a WebGL2 shader, and the ambient glows are three
 * 120px blurs over half the viewport. None of that survives being shrunk into a
 * 393px frame in any meaningful way, and all of it competes with the outer page
 * for the same frame budget. Embed mode drops them and keeps everything that
 * carries the actual point, layout, navigation, typography, content.
 *
 * Detection is intentionally read at call time inside effects rather than
 * during render. The server has no `window`, so branching on this in a render
 * body would produce markup the client immediately disagrees with; reading it
 * from an effect sidesteps hydration entirely, and every consumer here already
 * had its expensive work in an effect.
 */

/** True when this document is the embedded copy inside a demo frame. */
export function isEmbedded() {
  if (typeof window === "undefined") return false;

  // The explicit flag is what the demos set, and it is what a person can type
  // into the address bar to see what the frame sees.
  if (new URLSearchParams(window.location.search).get("embed") === "1") return true;

  // Belt and braces: any same-origin framing of the site gets the light build,
  // even if the query string was lost to a client-side navigation inside the
  // frame. Cross-origin framing throws on `top.location` and is already blocked
  // by `frame-ancestors 'self'`, so the catch means "framed by someone else".
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/** Append the embed flag to an internal path. */
export function withEmbedFlag(path) {
  const [pathname, hash = ""] = String(path).split("#");
  const [base, query = ""] = pathname.split("?");
  const params = new URLSearchParams(query);
  params.set("embed", "1");
  return `${base}?${params.toString()}${hash ? `#${hash}` : ""}`;
}

/** Strip it again, for anything that displays the framed URL to a human. */
export function withoutEmbedFlag(url) {
  try {
    const parsed = new URL(url, "https://logixloops.in");
    parsed.searchParams.delete("embed");
    const query = parsed.searchParams.toString();
    return `${parsed.pathname}${query ? `?${query}` : ""}${parsed.hash}`;
  } catch {
    return url;
  }
}
