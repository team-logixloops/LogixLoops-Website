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

/**
 * The build-time card from `app/opengraph-image.js`. Next only attaches the
 * file-convention image to the segment that declares it, and a child's
 * `openGraph` object REPLACES the parent's rather than merging into it, so
 * every page that sets og:title would otherwise drop og:image entirely.
 * Referencing the route path directly keeps one card on all routes.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "LogixLoops: Your Unfair Advantage. Custom software engineering across web, mobile, SaaS, AI and cloud.",
};

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
      images: [OG_IMAGE],
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: clamped,
      images: [OG_IMAGE.url],
    },
  };
}
