import { Button, SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import LineDirectory from "@/components/sections/kits/LineDirectory";
import { CURRENCY_NOTE } from "@/lib/pricing";

/**
 * The six lines with their starting prices, so the home page links every line
 * and reaches the kit catalogue and the price list in one click.
 */
export default function HomeKitsSection() {
  return (
    <section className="relative z-10 px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl">
      <FadeInUp>
        <SectionHeader
          overline="Loops"
          title="Six lines. Every Loop priced up front."
          description="Websites, apps, branding, redesigns, SEO and AI visibility, and AI automation, each sold as a Loop with a fixed scope, a timeline and a published starting price."
        />
      </FadeInUp>
      <LineDirectory />
      <p className="mt-6 font-body text-body-sm text-on-surface-variant">{CURRENCY_NOTE}</p>
      <div className="mt-stack-md flex flex-col gap-4 sm:flex-row">
        <Button href="/loops" icon="arrow_forward" iconPosition="right">
          Browse every Loop
        </Button>
        <Button href="/pricing" variant="ghost">
          See the price list
        </Button>
      </div>
    </section>
  );
}
