/**
 * LOGIXLOOPS: Site Constants
 *
 * Single source of truth for navigation, services, metadata,
 * and content that is shared across components.
 */

import { CASE_STUDIES } from "@/data/caseStudies";
// The index, not @/data/lines: Navbar and Footer are client components, and
// lines.js would pull the whole kit catalogue into every page's JavaScript.
import { LINE_INDEX as LINES } from "@/data/line-index";

/* ─── Brand ───
 * See `docs/brand-voice-and-search.md` for the rules these values answer to.
 *
 * NAP (name, address, phone) is the most load-bearing thing in this file.
 * Google local, and every AI assistant that grounds on it, treat a mismatch
 * between the schema and the visible page as two different businesses. These
 * values must be byte-identical to what /contact renders and to whatever is
 * filed in Google Business Profile and the directories.
 *
 * They used to disagree. This object claimed San Francisco and a
 * "+1 800 LOGIX" vanity line that does not exist, while /contact showed
 * Jaipur and a real +91 number. The Jaipur pair is the true one.
 */
export const BRAND = {
  name: "LogixLoops",
  // One tagline, not two. The previous "Strategic Engineering" marketing line
  // competed with the logo for the same job, and the logo wins, because it is
  // the one people actually see.
  tagline: "Your Unfair Advantage",
  // Kept separate because several call sites use it as alt text for the logo
  // artwork, where it has to say what the image says.
  logoTagline: "Your Unfair Advantage",
  description:
    "A brand, tech and growth studio in Jaipur. Websites, apps, branding, SEO and AI visibility, and AI automation, sold as fixed-scope packages called Loops, with published prices.",
  // One-sentence entity definition. Used in schema and in llms.txt, so it is
  // written to be quoted verbatim by an answer engine. Must match
  // docs/brand-voice-and-search.md word for word.
  definition:
    "LogixLoops is a brand, technology and growth studio based in Jaipur, India. It sells fixed-scope service packages called Loops, with published starting prices, for websites, apps, branding, SEO and AI search visibility, and AI automation, for businesses in India, the US, the UK and the UAE.",
  email: "logixloops@gmail.com",
  // E.164 for schema and tel: links. The display string is what humans read.
  phone: "+918764373589",
  phoneDisplay: "+91 87643 73589",
  whatsapp: "https://wa.me/918764373589",
  address: {
    // `street` and `postalCode` are the two fields the Rich Results Test
    // reports as missing-but-optional on the LocalBusiness node. Add them here
    // and the schema picks them up; leave them out and it emits a
    // locality-level address, which is valid. Whatever goes here has to match
    // the Google Business Profile listing and /contact exactly, a mismatch
    // suppresses the local listing, which is worse than omitting them.
    street: "Malviya Nagar",
    postalCode: "302017",
    locality: "Jaipur",
    region: "Rajasthan",
    country: "IN",
    countryName: "India",
  },
  // The one rendered form of the address. Every place on the site that prints
  // it reads this, so the visible string and the `PostalAddress` node cannot
  // drift apart, which is the failure Google reads as two businesses.
  addressDisplay: "Malviya Nagar, Jaipur, Rajasthan 302017, India",
  location: "Jaipur, Rajasthan",
  // Where clients actually are. Named explicitly, because "worldwide" is not a
  // place, and a local-intent query needs somewhere to match against.
  servesFrom: "Jaipur, India",
  servesMarkets: ["India", "United States", "United Kingdom", "United Arab Emirates"],
  /* The registered entity, as distinct from the brand.
   *
   * This exists because assistants were resolving logixloops.in to
   * "Logicloops IT Private Limited", a different company with a near-identical
   * name, by reading company-registry records instead of this site. A trading
   * name alone cannot win that argument; a legal name that matches the
   * registration is the field the registries themselves key on.
   *
   * It must match the registration character for character. A near-miss is
   * worse than omitting it: it gives the reconciler a second slightly-wrong
   * string to match against the wrong company. */
  legalName: "LogixLoops IT Solutions",
  copyright: `© ${new Date().getFullYear()} LogixLoops IT Solutions. All rights reserved.`,
};

/* ─── Entity topics ───
 * Feeds `knowsAbout` on the Organization node. This is the list an AI
 * assistant reads to decide what LogixLoops is competent in. It is worth more
 * than any adjective on any page and costs nothing to keep accurate. Every
 * entry must correspond to something the site actually documents. */
export const BRAND_TOPICS = [
  "Web development",
  "Website design",
  "Mobile app development",
  "Ecommerce development",
  "MVP development",
  "Brand identity design",
  "Logo design",
  "Website redesign",
  "Website speed optimisation",
  "Search engine optimisation",
  "Generative engine optimisation",
  "AI search visibility",
  "WhatsApp Business automation",
  "AI chatbots",
  "AI agents",
  "Workflow automation",
  "Website maintenance",
  "Next.js development",
  "React Native development",
];

/* ─── The six promises ───
 * Every kit carries all six. Each one is the opposite of a common agency
 * habit, which is what `usual` records: the home page sets the two side by
 * side, and kit pages show the promise alone. */
export const PROMISES = [
  {
    icon: "sell",
    title: "Price on the box",
    detail: "Every Loop has a published starting price, a fixed scope and a timeline.",
    usual: "Prices hidden behind a quote request",
  },
  {
    icon: "hub",
    title: "One studio",
    detail: "Brand, tech and growth on one team, in one thread.",
    usual: "Three vendors who blame each other",
  },
  {
    icon: "tune",
    title: "The Tune-Up",
    detail: "For 30 days after launch we measure, fix and tune with real data.",
    usual: "Ship the project and disappear",
  },
  {
    icon: "travel_explore",
    title: "Built to be found",
    detail: "Every build ships ready for Google and AI search.",
    usual: "A good-looking site nobody finds",
  },
  {
    icon: "key",
    title: "Yours from day one",
    detail: "Domain, code, designs and accounts are created in your name.",
    usual: "Your domain and code held in the agency's name",
  },
  {
    icon: "forum",
    title: "Talk to the builders",
    detail: "The people on the call are the people doing the work.",
    usual: "A senior pitch, then a junior team",
  },
];

/* ─── Navigation ───
 * Five top-level items. Kits and Pricing sit at the top level because
 * published prices are the studio's main difference, and a visitor should
 * reach them in one click. Pricing therefore leaves the Company menu, so no
 * destination appears twice. */

/* Mega-menu previews render full-bleed (100vw x 440px). These are served from
 * our own origin rather than a remote CDN: cross-origin images cost a DNS
 * lookup + TLS handshake before the first byte, which is exactly the stall the
 * hover crossfade can't absorb. Pre-cut to 2400x880 WebP (see
 * `public/nav/`). 1x on a wide monitor, 2x on a mid-size one. */
const navImage = (slug) => `/nav/${slug}.webp`;

export const NAV_LINKS = [
  {
    label: "Loops",
    href: "/loops",
    hasDropdown: true,
    // The plain label is the link, because it is what people scan for. The
    // memorable name leads the description, so the two still appear together.
    children: LINES.map((line) => ({
      label: line.label,
      href: `/loops/${line.slug}`,
      icon: line.icon,
      description: line.pitch,
      image: line.navImage,
    })),
  },
  {
    // Labelled "Work", not "Solutions", the destination and every child link
    // is a case study, and a label that disagrees with its URL reads as a
    // mis-click waiting to happen.
    label: "Work",
    href: "/work",
    hasDropdown: true,
    children: Object.values(CASE_STUDIES).map((study) => ({
      label: study.navLabel || study.title,
      href: `/work/${study.slug}`,
      icon: {
        FinTech: "payments",
        "FinTech & Wealth": "payments",
        "Food & Nutrition": "nutrition",
        "D2C & Nutrition": "nutrition",
        HealthTech: "health_and_safety",
        Logistics: "local_shipping",
        Enterprise: "verified_user",
        "Media & Marketing": "campaign",
        "Entertainment & EventTech": "nightlife",
        "Architecture & Design": "architecture",
      }[study.industry] || "insights",
      description: study.shortDescription,
      // Not study.heroImage, those are 512px square stills that upscale 5x in
      // the menu band. `public/nav/<slug>.webp` holds a wide crop per study.
      image: navImage(study.slug),
    })),
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Company",
    href: "/about",
    hasDropdown: true,
    children: [
      {
        label: "About Us",
        href: "/about",
        icon: "corporate_fare",
        description: "Who actually writes the code. Small on purpose.",
        image: navImage("about"),
      },
      {
        label: "Our Process",
        href: "/process",
        icon: "account_tree",
        description: "Eight phases, and the exit condition for each one.",
        image: navImage("process"),
      },
      {
        label: "Technology",
        href: "/technology",
        icon: "memory",
        description: "The stack, and why we stopped arguing about it.",
        image: navImage("technology"),
      },
      {
        label: "Security",
        href: "/security",
        icon: "security",
        description: "Zero-trust, and the six gates before production.",
        image: navImage("security"),
      },
      {
        label: "FAQ",
        href: "/faq",
        icon: "help",
        description: "The questions people ask before they trust us.",
        image: navImage("faq"),
      },
      {
        label: "Blog",
        href: "/blog",
        icon: "article",
        description: "Long-form engineering, written by the people building.",
        image: navImage("blog"),
      },
    ],
  },
  /* No top-level "Contact" entry. It sat immediately left of a "Get Started"
   * button that resolved to the same `/contact` page, two adjacent controls,
   * one destination, and the text link consistently lost the click to the
   * button beside it. The button is the one that stays, because it is the
   * one the page is asking you to press. Contact remains reachable from the
   * footer, which is where people go looking for it when they are not
   * converting. */
];

/* ─── Footer Link Groups ─── */
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    ...LINES.map((line) => ({ label: line.label, href: `/loops/${line.slug}` })),
    { label: "All Loops", href: "/loops" },
  ],
  resources: [
    { label: "Work", href: "/work" },
    { label: "Engineering Blog", href: "/blog" },
    { label: "Technology Stack", href: "/technology" },
    { label: "Trust & Security", href: "/security" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ & Support", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

/* ─── Social Links ─── */
// `label` is also the key into `SocialIcon`'s glyph table, so it has to match
// the platform's name exactly. The Material Symbols names that used to live
// here (`work`, `photo_camera`, `code`) drew a briefcase, a camera and angle
// brackets, generic pictograms where the actual platform marks belong.
/* Only profiles that actually exist are listed. LinkedIn and GitHub were here
 * pointing at `#`. A footer icon that goes nowhere reads as an abandoned
 * company, and the same two URLs were being published in the Organization
 * schema's `sameAs`, where an unresolvable profile weakens the entity instead
 * of strengthening it. Add each back here AND in `schema.js` `sameAs` on the
 * day the profile is live, not before. */
/* Only profiles that actually resolve. Each one here is also a `sameAs` entry
   in `lib/schema.js`, which is how Google and the answer engines tie the
   footer's icons to the same company entity, so the two lists have to move
   together. A dead profile in `sameAs` is worse than an absent one, so
   anything listed here has to resolve before it ships. */
export const SOCIAL_LINKS = [
  /* LinkedIn leads the row. For a B2B services company it is the profile a
     prospect actually checks, and it is the strongest entity anchor of the
     three: it is the node search engines and assistants reconcile a company
     name against, which is the exact failure that had assistants resolving
     logixloops.in to a differently-spelled company. It is mirrored in the
     schema's `sameAs`, and the two lists have to stay in step. */
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/logixloops",
  },
  {
    label: "GitHub",
    href: "https://github.com/team-logixloops",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/logixloops.in",
  },
];
