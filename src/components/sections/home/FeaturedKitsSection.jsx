import { Button, SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import KitCard from "@/components/sections/kits/KitCard";
import { KITS, getKitBySlug } from "@/data/kits";
import { getLineBySlug } from "@/data/lines";

/* Six kits across five lines: the most common first purchases, from a new
   brand to a first product. Order is the order they appear. */
export const FEATURED_KITS = ["brand-launch", "business-website", "ai-visibility", "whatsapp-ai", "website-glow-up", "mvp"];

/** Featured kits on the home page, as the same cards /kits uses. */
export default function FeaturedKitsSection() {
  const kits = FEATURED_KITS.map((slug) => getKitBySlug(slug));

  return (
    <section className="relative z-10 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl border-t border-outline-variant/30">
      <FadeInUp>
        <SectionHeader
          overline="Featured kits"
          title="Where most businesses start"
          description="A fixed scope, a timeline and a starting price on every one. Pick one now and add another when it pays off."
        />
      </FadeInUp>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <KitCard key={kit.slug} kit={kit} color={getLineBySlug(kit.line).color} />
        ))}
      </div>
      <div className="mt-stack-md">
        <Button href="/kits" variant="ghost" icon="arrow_forward" iconPosition="right">
          See all {KITS.length} kits
        </Button>
      </div>
    </section>
  );
}
