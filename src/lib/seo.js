/**
 * LOGIXLOOPS: Metadata builder
 *
 * Every route's canonical URL, Open Graph block, and Twitter card come from
 * here. Before this existed each page hand-rolled a `title`/`description` pair
 * and nothing else, so the whole site shipped without canonicals, og:url, or
 * twitter tags.
 *
 * `metadataBase` is set once in the root layout, so every URL field below can
 * stay relative. Next resolves them against it.
 */

export const SITE_URL = "https://logixloops.in";

/*
 * There is deliberately no shared OG_IMAGE constant here, and `buildMetadata`
 * sets no `images`.
 *
 * Next only attaches a file-convention `opengraph-image` to the segment that
 * declares it, and a child's `openGraph` object REPLACES the parent's rather
 * than merging into it, so a page that sets og:title and nothing else drops
 * og:image entirely. The previous fix was to hardcode the home card on every
 * route, which meant a link to /pricing shared as the home page.
 *
 * The fix now is coverage: every route segment ships its own
 * `opengraph-image.js` built on the shared template in `lib/og.js`. Nothing
 * here needs to name an image, and a new route without a card is a visible
 * gap rather than a silently wrong one.
 */

/**
 * Meta descriptions want 70–160 characters. Shorter gets padded by search
 * engines with arbitrary page text; longer gets truncated mid-sentence.
 */
export const DESCRIPTION_MIN = 70;
export const DESCRIPTION_MAX = 160;

/**
 * Trims to the last complete word inside the limit rather than mid-word, and
 * only appends an ellipsis when something was actually cut.
 */
export function clampDescription(text, max = DESCRIPTION_MAX) {
  const clean = String(text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/**
 * Builds a page's metadata object.
 *
 * @param {object}   input
 * @param {string}   input.title        Page title, without the brand suffix,
 *                                      the root layout template appends it.
 * @param {string}   input.description  Meta description; clamped to 160 chars.
 * @param {string}   input.path         Route path, e.g. "/services/mobile-apps".
 * @param {string}   [input.type]       Open Graph type. Defaults to "website".
 * @param {object}   [input.article]    publishedTime / authors for og:article.
 * @param {string[]} [input.keywords]
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  article,
  keywords,
}) {
  const url = path === "/" ? "/" : path;
  const clamped = clampDescription(description);

  return {
    title,
    description: clamped,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title,
      description: clamped,
      siteName: "LogixLoops",
      locale: "en_US",
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: clamped,
    },
  };
}
