import ServicesCoreHero from "@/components/sections/services/ServicesCoreHero";
import FeaturedServices from "@/components/sections/services/FeaturedServices";
import ServicesCoreGrid from "@/components/sections/services/ServicesCoreGrid";

export const metadata = {
  title: "Engineering Services | LogixLoops",
  description: "Explore our comprehensive suite of elite technical capabilities, covering the entire spectrum of modern digital transformation.",
};

export default function ServicesOverviewPage() {
  return (
    <main className="pt-[120px] pb-stack-xl max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop flex flex-col gap-stack-xl relative z-10">
      <ServicesCoreHero />
      <FeaturedServices />
      <ServicesCoreGrid />
    </main>
  );
}
