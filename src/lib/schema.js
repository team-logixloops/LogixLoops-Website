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
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: BRAND.name,
    alternateName: `${BRAND.name}: ${BRAND.tagline}`,
    slogan: BRAND.tagline,
    description: BRAND.definition,
    url: BASE_URL,
    logo: LOGO,
    image: LOGO.url,
    email: BRAND.email,
    telephone: BRAND.phone,
    priceRange: "$$",
    // Locality level only. A street address that cannot be verified is worse
    // than none: Google Business Profile reconciles against it, and a mismatch
    // suppresses the listing. Fill in `streetAddress` and `postalCode` once
    // the GBP listing is verified against them.
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.address.locality,
      addressRegion: BRAND.address.region,
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

export const generateArticleSchema = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
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
      "@id": `${BASE_URL}/case-studies/${study.slug}`,
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
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
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
