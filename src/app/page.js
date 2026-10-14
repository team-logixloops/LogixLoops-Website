import HeroSection from "@/components/sections/home/HeroSection";
import ScrollMarquee from "@/components/ui/ScrollMarquee";
import WaveBend from "@/components/WaveBend";
import HomeKitsSection from "@/components/sections/home/HomeKitsSection";
import FeaturedKitsSection from "@/components/sections/home/FeaturedKitsSection";
import FeaturedWorkSection from "@/components/sections/home/FeaturedWorkSection";
import StatsSection from "@/components/sections/home/StatsSection";
import ComparisonSection from "@/components/sections/home/ComparisonSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import FaqPreviewSection from "@/components/sections/home/FaqPreviewSection";
import CtaBanner from "@/components/sections/shared/CtaBanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQS } from "@/data/faq";
import { KIT_STEPS } from "@/data/infrastructure";
import { LINES, getLineBySlug } from "@/data/lines";
import { KITS, getKitBySlug } from "@/data/kits";
import { getAllCaseStudies } from "@/data/caseStudies";
import {
  generateFaqSchema,
  generateHowToSchema,
  generateItemListSchema,
  generateWebPageSchema,
  generateWebSiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// The tagline leads, then the six line names. A marquee is the cheapest
// repetition on the page, and these are the seven words the site is trying
// to make stick.
const MARQUEE_ITEMS = ["Your Unfair Advantage", ...LINES.map((line) => line.name)];

// Reads as one sentence as it travels the wave:
// "We Build Brands [icon] That Get Found [icon] And Keep Growing"
// Brand, search and growth: the three things one studio does together.
const WAVE_SEGMENTS = [
  { type: "text", content: "We Build Brands" },
  { type: "image", src: getLineBySlug("branding").art, alt: "Branding and identity" },
  { type: "text", content: "That Get Found" },
  { type: "image", src: getLineBySlug("seo-and-ai-search").art, alt: "SEO and AI search visibility" },
  { type: "text", content: "And Keep Growing" },
];

/*
 * Hand-maintained, and it has to stay that way: this is a claim about when the
 * copy on this page last changed, not about when the site was last deployed.
 * Move it when the words move. `datePublished` is the day the first home page
 * went live and does not change again.
 */
const HOME_PUBLISHED = "2026-05-16";
const HOME_MODIFIED = "2026-10-14";

const HOME_DESCRIPTION =
  "Brand, web, app and AI studio in Jaipur. Websites, online stores, apps, branding, SEO and AI automation sold as kits with published prices, for India, the US, the UK and the UAE.";

export const metadata = buildMetadata({
  // `title.absolute`: the home page is the one route that must bypass the
  // template, run through `LogixLoops | %s` it would say the brand twice.
  title: {
    absolute: "LogixLoops | Brand, Web, App & AI Studio in Jaipur",
  },
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [
    "website design company in Jaipur",
    "web development company in Jaipur",
    "branding agency Jaipur",
    "website packages with prices",
    "app development company India",
    "SEO and AI search optimization",
    "WhatsApp chatbot for business",
    "digital agency for small business",
  ],
});

/* Client work for the poster grid, with the kit each build would start from
   today. Built here so the client component never imports the catalogue. */
const workItems = () =>
  getAllCaseStudies().map((study) => ({
    id: study.slug,
    title: study.navLabel || study.title,
    href: `/work/${study.slug}`,
    image: `/nav/${study.slug}.webp`,
    objectPosition: "object-center",
    kit: getKitBySlug(study.kits[0]).name,
  }));

export default function HomePage() {
  return (
    <>
      {/* The root layout emits Organization for every route. These are
          home-page-only: WebSite is the property Google hangs sitelinks and
          the site name off, and the FAQPage mirrors the preview accordion
          below so the visible answers and the markup cannot drift. */}
      <SchemaMarkup schema={generateWebSiteSchema(HOME_DESCRIPTION)} />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "LogixLoops: Brand, Web, App and AI Studio in Jaipur",
          description: HOME_DESCRIPTION,
          path: "/",
          speakable: ["h1", "h2"],
          datePublished: HOME_PUBLISHED,
          dateModified: HOME_MODIFIED,
        })}
      />
      {/* The five steps shown in `ProcessSection`, built from the same array
          the cards render, so the markup cannot describe a step the visitor
          cannot see, which is the condition Google attaches to HowTo. */}
      <SchemaMarkup
        schema={generateHowToSchema({
          name: "How a LogixLoops kit runs",
          description:
            "The five steps every LogixLoops kit follows, from picking a kit to 30 days of improvements after launch.",
          steps: KIT_STEPS.map((step) => ({ name: step.title, text: step.description })),
        })}
      />
      <SchemaMarkup
        schema={generateItemListSchema({
          name: "LogixLoops service lines",
          items: LINES.map((line) => ({
            name: line.label,
            description: line.summary,
            path: `/services/${line.slug}`,
          })),
        })}
      />
      <SchemaMarkup
        schema={generateFaqSchema(
          HOME_FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))
        )}
      />

      <HeroSection />
      {/* Sits on the hero/WaveBend boundary, which was showing as a pale
          band where the two sections' near-white grounds met. Rather than
          matching the two colours and pretending the seam isn't there, the
          seam becomes the feature. */}
      <ScrollMarquee
        items={MARQUEE_ITEMS}
        className="relative z-10 overflow-hidden border-y border-outline-variant/40 bg-surface-container-low py-5 sm:py-7"
      />
      <WaveBend segments={WAVE_SEGMENTS} />
      <HomeKitsSection />
      <FeaturedKitsSection />
      <FeaturedWorkSection items={workItems()} />
      <StatsSection kitCount={KITS.length} />
      <ComparisonSection />
      <ProcessSection />
      <FaqPreviewSection />
      <CtaBanner />
    </>
  );
}
