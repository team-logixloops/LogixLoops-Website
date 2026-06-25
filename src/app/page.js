import HeroSection from "@/components/sections/home/HeroSection";
import ServicesBento from "@/components/sections/home/ServicesBento";
import FeaturedSolutionsSection from "@/components/sections/home/FeaturedSolutionsSection";
import StatsSection from "@/components/sections/home/StatsSection";
import ProcessSection from "@/components/sections/home/ProcessSection";
import FaqPreviewSection from "@/components/sections/home/FaqPreviewSection";
import CtaBanner from "@/components/sections/shared/CtaBanner";

export const metadata = {
  title: "LogixLoops — Architecting Tomorrow's Enterprise",
  description: "We design and engineer high-performance software environments for forward-thinking organizations. Clinical precision meets immersive digital luxury.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesBento />
      <FeaturedSolutionsSection />
      <StatsSection />
      <ProcessSection />
      <FaqPreviewSection />
      <CtaBanner />
    </>
  );
}
