/**
 * LOGIXLOOPS: Site Constants
 *
 * Single source of truth for navigation, services, metadata,
 * and content that is shared across components.
 */

import { CASE_STUDIES } from "@/data/caseStudies";

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
    "A small senior engineering studio in Jaipur. We build web platforms, mobile apps, SaaS products and AI systems for teams that need them to work.",
  // One-sentence entity definition. Used in schema and in llms.txt, so it is
  // written to be quoted verbatim by an answer engine.
  definition:
    "LogixLoops is a software engineering studio based in Jaipur, India, building custom web platforms, mobile apps, SaaS products, AI systems and cloud infrastructure for clients in India, the US, the UK and the UAE.",
  email: "logixloops@gmail.com",
  // E.164 for schema and tel: links. The display string is what humans read.
  phone: "+919216185861",
  phoneDisplay: "+91 92161 85861",
  whatsapp: "https://wa.me/919216185861",
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
  copyright: `© ${new Date().getFullYear()} LogixLoops IT Solutions. All rights reserved.`,
};

/* ─── Entity topics ───
 * Feeds `knowsAbout` on the Organization node. This is the list an AI
 * assistant reads to decide what LogixLoops is competent in. It is worth more
 * than any adjective on any page and costs nothing to keep accurate. Every
 * entry must correspond to something the site actually documents. */
export const BRAND_TOPICS = [
  "Custom software development",
  "Web application development",
  "Next.js development",
  "React development",
  "Mobile app development",
  "SaaS platform architecture",
  "Multi-tenant architecture",
  "Artificial intelligence integration",
  "Retrieval-augmented generation",
  "Machine learning engineering",
  "Cloud infrastructure",
  "Kubernetes",
  "DevOps and CI/CD",
  "Legacy system modernisation",
  "Monolith to microservices migration",
  "Zero-trust security architecture",
  "Workflow automation",
  "UI/UX design systems",
];

/* ─── Navigation ───
 * Trimmed to 4 top-level items (Hick's law: fewer choices, faster decisions).
 * Case Studies now lives inside the Solutions mega-menu (it's proof-of-work
 * for the industries showcased there); Blog moved into Company. Nothing lost,
 * just one fewer top-level decision for a first-time visitor. */

/* Mega-menu previews render full-bleed (100vw x 440px). These are served from
 * our own origin rather than a remote CDN: cross-origin images cost a DNS
 * lookup + TLS handshake before the first byte, which is exactly the stall the
 * hover crossfade can't absorb. Pre-cut to 2400x880 WebP (see
 * `public/nav/`). 1x on a wide monitor, 2x on a mid-size one. */
const navImage = (slug) => `/nav/${slug}.webp`;

export const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    children: [
      {
        label: "Enterprise Software",
        href: "/services/enterprise-software",
        icon: "domain",
        description: "Large systems that stay boring under load.",
        image: navImage("enterprise-software"),
      },
      {
        label: "AI & ML Solutions",
        href: "/services/ai-ml-solutions",
        icon: "psychology",
        description: "Models that reach production, not just a notebook.",
        image: navImage("ai-ml-solutions"),
      },
      {
        label: "Web Development",
        href: "/services/web-development",
        icon: "code",
        description: "Next.js platforms that load fast and convert.",
        image: navImage("web-development"),
      },
      {
        label: "Mobile Apps",
        href: "/services/mobile-apps",
        icon: "smartphone",
        description: "iOS and Android that feel native, because they are.",
        image: navImage("mobile-apps"),
      },
      {
        label: "Cloud & DevOps",
        href: "/services/cloud-devops",
        icon: "cloud",
        description: "Deploys nobody has to stay up for.",
        image: navImage("cloud-devops"),
      },
      {
        label: "SaaS Platforms",
        href: "/services/saas-platforms",
        icon: "layers",
        description: "Multi-tenant from the first commit, not bolted on later.",
        image: navImage("saas-platforms"),
      },
      {
        label: "Automation Systems",
        href: "/services/automation-systems",
        icon: "settings_motion_mode",
        description: "The work nobody should still be doing by hand.",
        image: navImage("automation-systems"),
      },
      {
        label: "UI/UX Design",
        href: "/services/ui-ux-design",
        icon: "design_services",
        description: "Design that survives contact with real data.",
        image: navImage("ui-ux-design"),
      },
    ],
  },
  {
    // Labelled "Work", not "Solutions", the destination and every child link
    // is a case study, and a label that disagrees with its URL reads as a
    // mis-click waiting to happen.
    label: "Work",
    href: "/case-studies",
    hasDropdown: true,
    children: Object.values(CASE_STUDIES).map((study) => ({
      label: study.title,
      href: `/case-studies/${study.slug}`,
      icon: {
        FinTech: "payments",
        HealthTech: "health_and_safety",
        Logistics: "local_shipping",
        Enterprise: "verified_user",
      }[study.industry] || "insights",
      description: study.shortDescription,
      // Not study.heroImage, those are 512px square stills that upscale 5x in
      // the menu band. `public/nav/<slug>.webp` holds a wide crop per study.
      image: navImage(study.slug),
    })),
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
        label: "Pricing",
        href: "/pricing",
        icon: "payments",
        description: "Two engagement models. No mystery invoices.",
        image: navImage("pricing"),
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
    { label: "Enterprise Software", href: "/services/enterprise-software" },
    { label: "AI & ML Solutions", href: "/services/ai-ml-solutions" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "All Services", href: "/services" },
  ],
  resources: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Engineering Blog", href: "/blog" },
    { label: "Technology Stack", href: "/technology" },
    { label: "Trust & Security", href: "/security" },
    { label: "Pricing & Tiers", href: "/pricing" },
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
   together. A dead profile in `sameAs` is worse than an absent one.

   LinkedIn is deliberately missing: the page does not exist yet. Add it to
   both files on the same day it does. */
export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/team-logixloops",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/logixloops.in",
  },
];

/* ─── Services Overview Data ─── */
export const SERVICES = [
  {
    slug: "enterprise-software",
    title: "Enterprise Software",
    icon: "domain",
    color: "primary",
    shortDescription: "Custom enterprise platforms and legacy modernisation. Monoliths broken into microservices without taking the business offline.",
    tags: ["Microservices", "Kubernetes", "Java", ".NET"],
  },
  {
    slug: "ai-ml-solutions",
    title: "AI & ML Solutions",
    icon: "psychology",
    color: "secondary",
    shortDescription: "AI development that reaches production: RAG over your own documents, predictive models, and the data pipelines underneath them.",
    tags: ["RAG", "LLM Ops", "PyTorch", "Vector DB"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    icon: "code",
    color: "primary",
    shortDescription: "Web application development in Next.js and React. Typed end to end, fast on a mid-range phone, and yours at handover.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    icon: "smartphone",
    color: "secondary",
    shortDescription: "iOS and Android apps in React Native, Swift and Kotlin. Offline-first, hardware-aware, and shipped through both stores.",
    tags: ["React Native", "Swift", "Kotlin", "Offline-first"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "cloud",
    color: "primary",
    shortDescription: "Cloud infrastructure as code and CI/CD pipelines on AWS or GCP, with progressive rollout and a rollback that is one pipeline run.",
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS Platforms",
    icon: "layers",
    color: "secondary",
    shortDescription: "Multi-tenant SaaS architecture with tenant isolation, billing and role-based access designed in from the first commit.",
    tags: ["Multi-tenant", "Stripe", "RBAC", "PostgreSQL"],
  },
  {
    slug: "automation-systems",
    title: "Automation Systems",
    icon: "settings_motion_mode",
    color: "primary",
    shortDescription: "Workflow automation and RPA that connects the systems already running your business, so nobody is retyping data between them.",
    tags: ["RPA", "Python", "n8n", "Event-driven"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "design_services",
    color: "secondary",
    shortDescription: "Product design and design systems for dense interfaces. Built as tokens and components, tested against real data volumes.",
    tags: ["Figma", "Design Systems", "Prototyping", "Research"],
  },
];
