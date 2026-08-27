/**
 * LOGIXLOOPS: Schema.org JSON-LD Utilities
 *
 * Generates structured data for rich search results.
 */

import { BRAND, BRAND_TOPICS, SERVICES } from "./constants";

const BASE_URL = "https://logixloops.in";

/**
 * The one logo node every publisher reference points at. It was written out
 * three times in this file, and two of those copies pointed at `/logo.png`,
 * which has never existed in `public/`. Every Article and BlogPosting on the
 * site therefore declared a publisher logo that 404s, and Google drops the
 * rich result rather than falling back.
 */
const LOGO = {
  "@type": "ImageObject",
  url: `${BASE_URL}/brand/png/logo-full-1024.png`,
  width: 1024,
  height: 873,
};

const PUBLISHER = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: BRAND.name,
  url: BASE_URL,
  logo: LOGO,
};

/**
 * Only profiles that resolve. An unresolvable `sameAs` does not merely fail to
 * help. It is a reconciliation failure for the entity, and Google and the
 * assistants that ground on it treat the whole node as less trustworthy. Add a
 * URL here on the day the profile goes live, together with `SOCIAL_LINKS` in
 * constants.js.
 */
const VERIFIED_PROFILES = [
  // First on purpose. `sameAs` is how a crawler proves this site and a known
  // profile are the same organisation, and LinkedIn is the profile that
  // carries the most weight in that reconciliation.
  "https://www.linkedin.com/company/logixloops",
  "https://github.com/team-logixloops",
  "https://www.instagram.com/logixloops.in",
];

/**
 * The company entity.
 *
 * `ProfessionalService` rather than bare `Organization`: it is a subtype of
 * LocalBusiness, so it is the type that can legitimately carry a postal
 * address and a service area. That is what makes LogixLoops eligible for local
 * results and, more importantly, what gives an AI assistant a resolvable
 * real-world business to point at instead of a nameless website.
 *
 * `@id` is stable and every other node refers back to it, so the graph
 * resolves to one company rather than to a dozen unlinked mentions.
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    /*
     * Both types, not just the narrow one. `ProfessionalService` is already a
     * subtype of `Organization` two levels up, so a consumer that resolves the
     * schema.org hierarchy learns nothing new from the second entry. Plenty of
     * them do not resolve it, and instead pattern-match the literal string
     * "Organization" to decide whether a site has declared a company at all,
     * which is how a page carrying a full company node reads as having none.
     * Declaring both is accurate either way, and costs a word.
     */
    "@type": ["ProfessionalService", "Organization"],
    "@id": `${BASE_URL}/#organization`,
    name: BRAND.name,
    // The registered entity. Without it the only string on offer is the
    // trading name, and "LogixLoops" is one character from "Logicloops" and
    // one from "LogiXloop", both of which are real companies with real
    // registry records that outrank an unindexed site.
    legalName: BRAND.legalName,
    alternateName: `${BRAND.name}: ${BRAND.tagline}`,
    slogan: BRAND.tagline,
    description: BRAND.definition,
    url: BASE_URL,
    logo: LOGO,
    image: LOGO.url,
    email: BRAND.email,
    telephone: BRAND.phone,
    priceRange: "$$",
    /*
     * Locality level unless the real street and postcode are filled in.
     *
     * Both extra fields are optional in Google's LocalBusiness spec, so the
     * Rich Results Test reports them as warnings, not errors, and the result
     * is still valid and eligible without them. They are omitted on purpose:
     * Google Business Profile reconciles the marked-up address against the
     * verified listing, and an address that does not match, or that cannot be
     * verified at all, suppresses the listing outright. That is a worse
     * outcome than two yellow rows in a test tool.
     *
     * To clear the warnings, put the real values on `BRAND.address` as
     * `street` and `postalCode`, byte-identical to what Google Business
     * Profile and /contact carry. They are picked up here automatically, and
     * only when they exist, so a half-filled address can never ship.
     */
    address: {
      "@type": "PostalAddress",
      ...(BRAND.address.street ? { streetAddress: BRAND.address.street } : {}),
      addressLocality: BRAND.address.locality,
      addressRegion: BRAND.address.region,
      ...(BRAND.address.postalCode ? { postalCode: BRAND.address.postalCode } : {}),
      addressCountry: BRAND.address.country,
    },
    // Based in Jaipur, working with clients elsewhere. Both facts have to be
    // in the markup: `areaServed` alone reads as a company with no home, and
    // an address alone reads as a company that only takes local work.
    areaServed: BRAND.servesMarkets.map((name) => ({
      "@type": "Country",
      name,
    })),
    availableLanguage: ["en", "hi"],
    knowsAbout: BRAND_TOPICS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BRAND.phone,
        email: BRAND.email,
        contactType: "sales",
        areaServed: BRAND.servesMarkets,
        availableLanguage: ["en", "hi"],
      },
    ],
    // The eight practices as offers rather than as prose. This is the node an
    // assistant enumerates when asked what LogixLoops does, and it can answer
    // without crawling eight detail routes.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software engineering services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
          url: `${BASE_URL}/services/${service.slug}`,
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      })),
    },
    sameAs: VERIFIED_PROFILES,
  };
};

/**
 * The site-level entity. Distinct from Organization: Organization is the
 * company, WebSite is the property Google attaches sitelinks and the site
 * name to. Only ever emitted once, on the home page.
 */
export const generateWebSiteSchema = (description) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: BRAND.name,
    alternateName: `${BRAND.name}: ${BRAND.tagline}`,
    url: BASE_URL,
    description,
    inLanguage: "en",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
};

/**
 * A single page node. `type` narrows it to a more specific WebPage subtype
 * (AboutPage, ContactPage, CollectionPage, …). AI engines and rich results
 * both read the subtype, and the generic fallback is worth much less.
 *
 * `speakable` selectors are optional; pass them only for pages whose H1/lead
 * paragraph actually reads well aloud.
 */
export const generateWebPageSchema = ({
  type = "WebPage",
  name,
  description,
  path,
  speakable,
  datePublished,
  dateModified,
}) => {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${BASE_URL}${path}`,
    inLanguage: "en",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    /*
     * Both optional, and both omitted unless a caller passes a real date.
     *
     * An assistant deciding whether to repeat what a page says weighs how
     * stale it looks, and a page with no date at all is treated as undated
     * rather than as current. The temptation is to emit `new Date()` at build
     * time so every page always looks fresh, which is worth saying out loud
     * and refusing: it would claim the copy changed on every unrelated
     * deploy, and a date that moves without the content moving is the exact
     * signal the field exists to carry.
     */
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(speakable && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakable,
      },
    }),
  };
};

/**
 * An index page (services, case studies, blog) plus the ordered list of what
 * it indexes. The ItemList is what lets an AI engine enumerate the children
 * without crawling each one, `items` is a list of { name, path, description }.
 */
export const generateCollectionPageSchema = ({ name, description, path, items = [] }) => {
  return {
    ...generateWebPageSchema({ type: "CollectionPage", name, description, path }),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        description: item.description,
        url: `${BASE_URL}${item.path}`,
      })),
    },
  };
};

/**
 * The byline as one entity, shared by `Article` and `BlogPosting`.
 *
 * Both node types were spelling the author out separately and had already
 * drifted, one carried `jobTitle` and the other did not. Worse, neither
 * carried `url`, which Google's Article guidance asks for so that a name in
 * the markup resolves to a person rather than being a string, and which the
 * Rich Results Test reports as missing on every post that lacks it.
 *
 * `@id` is what actually does the disambiguating: every article points at the
 * same node, so a crawler sees one author with N articles instead of N
 * authors who happen to share a name.
 */
const authorNode = (author) => ({
  "@type": "Person",
  "@id": `${BASE_URL}/#author-${slugifyAuthor(author.name)}`,
  name: author.name,
  ...(author.role ? { jobTitle: author.role } : {}),
  ...(author.profilePath ? { url: `${BASE_URL}${author.profilePath}` } : {}),
  worksFor: { "@id": `${BASE_URL}/#organization` },
});

const slugifyAuthor = (name) =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const generateArticleSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: authorNode(post.author),
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
};

/**
 * A case study record.
 *
 * Two kinds exist, and they must not be described the same way.
 *
 *   - A `demo` record is a reference build: an architecture we designed and
 *     can defend, written up against a representative brief rather than a
 *     paying client. It is emitted as `CreativeWork` with
 *     `creativeWorkStatus` and a `disambiguatingDescription` that says so in
 *     the markup, not only in the visible copy. Claiming Article for one would
 *     assert it is reportage about a real engagement, and answer engines quote
 *     that assertion verbatim.
 *   - A client record with a `publishedAt` date becomes `Article` and is
 *     eligible for article rich results.
 *
 * A fabricated date is worse than no date, so undated client records fall back
 * to CreativeWork too. Set `demo: false` and add `publishedAt` to promote a
 * record once the client has signed off on it.
 */
export const generateCaseStudySchema = (study) => {
  const published = study.publishedAt
    ? new Date(study.publishedAt).toISOString()
    : null;
  const isDemo = study.demo === true;

  return {
    "@context": "https://schema.org",
    "@type": !isDemo && published ? "Article" : "CreativeWork",
    ...(!isDemo && published && { datePublished: published, dateModified: published }),
    ...(isDemo && {
      creativeWorkStatus: "Reference build",
      disambiguatingDescription:
        "A reference build: an architecture designed and documented by LogixLoops against a representative brief, not a record of a paid client engagement. Figures describe the design target, not a measured client outcome.",
    }),
    headline: `Engineering the ${study.title}`,
    name: `Engineering the ${study.title}`,
    description: study.shortDescription,
    ...(study.industry && { about: study.industry }),
    ...(!isDemo && study.industry && { articleSection: study.industry }),
    image: study.heroImage ? [study.heroImage] : undefined,
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/work/${study.slug}`,
    },
  };
};

export const generateBlogPostingSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    // `isoDate` is the machine field; `publishedAt` is a display string like
    // "Aug 05, 2026" and only parsed here as a fallback for any post that
    // predates the split.
    datePublished: new Date(post.isoDate ?? post.publishedAt).toISOString(),
    dateModified: new Date(
      post.updatedAt ?? post.isoDate ?? post.publishedAt
    ).toISOString(),
    keywords: post.keywords?.join(", "),
    author: authorNode(post.author),
    publisher: PUBLISHER,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
};

/**
 * `items` is a list of { question, answer }, callers normalise their own
 * shape (the service data files use { q, a }) before passing it in.
 */
export const generateFaqSchema = (items) => {
  if (!items?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
};

/**
 * One practice. `provider` is a reference rather than a second copy of the
 * company, so the eight Service nodes and the Organization resolve to one
 * entity in the graph instead of nine loosely-related mentions.
 *
 * `url` matters more than it looks. Without it the node describes a service
 * that exists nowhere, and neither Google nor an assistant can link the
 * capability to a page it can cite.
 */
export const generateServiceSchema = ({ title, shortDescription, slug, serviceType }) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: shortDescription,
    ...(serviceType && { serviceType }),
    ...(slug && { url: `${BASE_URL}/services/${slug}` }),
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: BRAND.servesMarkets.map((name) => ({ "@type": "Country", name })),
  };
};

/**
 * `speakable` marks which parts of a page a voice assistant should read aloud.
 * CSS selectors are matched against the rendered page, so the selectors here
 * must stay in sync with the markup they point at.
 */
export const generateSpeakableSchema = (name, path, selectors = ["h1", "h2", "p"]) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${BASE_URL}${path}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: selectors,
    },
  };
};

/**
 * HowTo for ordered, procedural content. `steps` is a list of
 * { name, text } in the order they are performed.
 */
export const generateHowToSchema = ({ name, description, steps }) => {
  if (!steps?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
};

/**
 * A standalone ordered list, for pages that enumerate something without being
 * an index of it, the home page listing the service practices, for instance.
 * `items` is a list of { name, path, description }.
 */
export const generateItemListSchema = ({ name, items = [] }) => {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: `${BASE_URL}${item.path}`,
    })),
  };
};

export const generateBreadcrumbSchema = (crumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${BASE_URL}${crumb.path}`,
    })),
  };
};
