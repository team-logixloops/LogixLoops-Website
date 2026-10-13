import Link from "next/link";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { Button } from "@/components/ui";
import KitCard from "@/components/sections/kits/KitCard";
import PlanCard from "@/components/sections/kits/PlanCard";
import PromiseStrip from "@/components/sections/kits/PromiseStrip";
import StudioCta from "@/components/sections/kits/StudioCta";
import { SECTION } from "@/components/sections/service-master/tokens";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { getAllLines, getLineBySlug } from "@/data/lines";
import { getAllKits, getKitsByLine } from "@/data/kits";
import { getAllPlans } from "@/data/plans";
import { generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const KITS_DESCRIPTION =
  "Fixed-scope packages for websites, online stores, apps, branding, SEO, AI visibility and automation, each with a published starting price and timeline.";

/* Answer-first: what a kit is, what it covers, and why the price is here. */
const LEAD =
  "Advantage Kits are fixed-scope packages from LogixLoops for websites, online stores, apps, branding, SEO and AI visibility, and AI automation. Each kit lists what you get, how long it takes and a starting price, in rupees for India and US dollars everywhere else, so you know the cost before the first call.";

export const metadata = buildMetadata({
  title: "Advantage Kits: Web, App, Brand and AI Packages",
  description: KITS_DESCRIPTION,
  path: "/kits",
  keywords: [
    "website packages",
    "website development packages India",
    "branding packages",
    "SEO packages",
    "AI chatbot packages",
    "app development packages",
    "digital packages for small business",
  ],
});

function LineHeading({ id, eyebrow, title, pitch, href, linkLabel }) {
  return (
    <div className="mb-stack-lg flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="mb-3 block font-label text-label-caps uppercase tracking-widest text-primary">{eyebrow}</span>
        <h2 id={id} className="mb-3 font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
          {title}
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant">{pitch}</p>
      </div>
      <Link href={href} className="inline-flex items-center gap-1 whitespace-nowrap font-body text-body-md text-primary">
        {linkLabel}
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}

export default function KitsPage() {
  const lines = getAllLines().filter((line) => getKitsByLine(line.slug).length > 0);
  const pitCrew = getLineBySlug("maintenance-and-support");

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Kits", path: "/kits" },
        ])}
      />
      <SchemaMarkup
        schema={generateCollectionPageSchema({
          name: "Advantage Kits",
          description: KITS_DESCRIPTION,
          path: "/kits",
          items: getAllKits().map((kit) => ({
            name: kit.name,
            description: kit.summary,
            path: `/kits/${kit.slug}`,
          })),
        })}
      />

      <PageHero
        preset="pricing"
        eyebrow="Advantage Kits"
        title="Pick a kit."
        accent="See the price first."
        lead={LEAD}
        cue="Browse the kits"
      >
        <Button href="/contact" variant="ghost" size="lg">
          Not sure which? Ask us
        </Button>
      </PageHero>

      <PageSurface>
        {lines.map((line) => (
          <section key={line.slug} aria-labelledby={`line-${line.slug}`} className={SECTION}>
            <LineHeading
              id={`line-${line.slug}`}
              eyebrow={line.name}
              title={line.label}
              pitch={line.pitch}
              href={`/services/${line.slug}`}
              linkLabel={`More about ${line.name}`}
            />
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {getKitsByLine(line.slug).map((kit) => (
                <KitCard key={kit.slug} kit={kit} color={line.color} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="line-maintenance-and-support" className={SECTION}>
          <LineHeading
            id="line-maintenance-and-support"
            eyebrow={pitCrew.name}
            title={pitCrew.label}
            pitch={pitCrew.pitch}
            href={`/services/${pitCrew.slug}`}
            linkLabel={`More about ${pitCrew.name}`}
          />
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {getAllPlans().map((plan) => (
              <PlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </section>

        <PromiseStrip />
        <StudioCta
          heading="Not sure which kit fits?"
          body="Tell us what you are trying to do. We will point you at the right kit, or tell you plainly if none of them fit."
          primary={{ href: "/contact", label: "Ask the people who build it" }}
          secondary={{ href: "/pricing", label: "See the full price list" }}
        />
      </PageSurface>
    </>
  );
}
