import HeroSection from "@/components/sections/home/HeroSection";
import ScrollMarquee from "@/components/ui/ScrollMarquee";
import WaveBend from "@/components/WaveBend";
import FeaturedWorkSection from "@/components/sections/home/FeaturedWorkSection";

// The tagline leads, then the four things we are actually hired for. Keeping
// the tagline in rotation here is deliberate: it is the one phrase the site is
// trying to make stick, and a marquee is the cheapest repetition on the page.
const MARQUEE_ITEMS = [
  "Your Unfair Advantage",
  "Web Platforms",
  "AI Systems",
  "SaaS Products",
  "Cloud & DevOps",
];

// Reads as one flowing sentence as it travels the wave:
// "We Build Systems [icon] That Stay Boring [icon] Under Real Load"
//
// "Boring" is the point, not a joke. It is the word engineers use for
// infrastructure that never makes the news, and it says more about what we are
// aiming at than "scales without compromise or downtime", which was a promise
// nobody can keep and everybody makes.
const WAVE_SEGMENTS = [
  { type: "text", content: "We Build Systems" },
  { type: "image", src: "/services/enterprise-software.svg", alt: "Enterprise software" },
  { type: "text", content: "That Stay Boring" },
  { type: "image", src: "/services/ai-ml-solutions.svg", alt: "AI and ML solutions" },
  { type: "text", content: "Under Real Load" },
];
import FeaturedSolutionsSection from "@/components/sections/home/FeaturedSolutionsSection";
import StatsSection from "@/components/sections/home/StatsSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import FaqPreviewSection from "@/components/sections/home/FaqPreviewSection";
import CtaBanner from "@/components/sections/shared/CtaBanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQS } from "@/data/faq";
import { SERVICES } from "@/lib/constants";
import {
  generateFaqSchema,
  generateItemListSchema,
  generateWebPageSchema,
  generateWebSiteSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// `title.absolute`, the home page is the one route that must bypass the
// template: run through `LogixLoops | %s` it would say the brand twice.
const HOME_DESCRIPTION =
  "Senior software engineering studio in Jaipur. Custom web platforms, mobile apps, SaaS products and AI systems for teams in India, the US, the UK and the UAE.";

export const metadata = buildMetadata({
  title: {
    absolute: "LogixLoops | Custom Software Development Studio in Jaipur",
  },
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [
    "custom software development company",
    "software development company in Jaipur",
    "product engineering company",
    "web development agency",
    "SaaS development company",
    "AI development company",
    "hire dedicated developers India",
  ],
});

export default function HomePage() {
  return (
    <>
      {/* The root layout emits Organization for every route. These four are
          home-page-only: WebSite is the property Google hangs sitelinks and
          the site name off, and the FAQPage mirrors the preview accordion
          below so the visible answers and the markup cannot drift. */}
      <SchemaMarkup schema={generateWebSiteSchema(HOME_DESCRIPTION)} />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "LogixLoops: Custom Software Development Studio in Jaipur",
          description: HOME_DESCRIPTION,
          path: "/",
          speakable: ["h1", "h2"],
        })}
      />
      <SchemaMarkup
        schema={generateItemListSchema({
          name: "LogixLoops engineering practices",
          items: SERVICES.map((service) => ({
            name: service.title,
            description: service.shortDescription,
            path: `/services/${service.slug}`,
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
      <FeaturedWorkSection />
      <FeaturedSolutionsSection />
      <StatsSection />
      <ProcessSection />
      <FaqPreviewSection />
      <CtaBanner />
    </>
  );
}
