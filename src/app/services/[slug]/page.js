import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/data/services";

// Master Service Sections
import ServiceMasterHero from "@/components/sections/service-master/ServiceMasterHero";
import ServiceMasterProblems from "@/components/sections/service-master/ServiceMasterProblems";
import ServiceMasterCapabilities from "@/components/sections/service-master/ServiceMasterCapabilities";
import ServiceMasterTech from "@/components/sections/service-master/ServiceMasterTech";
import ServiceMasterProcess from "@/components/sections/service-master/ServiceMasterProcess";
import ServiceMasterSolutions from "@/components/sections/service-master/ServiceMasterSolutions";
import ServiceMasterUX from "@/components/sections/service-master/ServiceMasterUX";
import ServiceMasterArchitecture from "@/components/sections/service-master/ServiceMasterArchitecture";
import ServiceMasterInfrastructure from "@/components/sections/service-master/ServiceMasterInfrastructure";
import ServiceMasterEcosystem from "@/components/sections/service-master/ServiceMasterEcosystem";
import ServiceMasterMLInfrastructure from "@/components/sections/service-master/ServiceMasterMLInfrastructure";
import ServiceMasterOrchestration from "@/components/sections/service-master/ServiceMasterOrchestration";
import ServiceMasterAutomationInfrastructure from "@/components/sections/service-master/ServiceMasterAutomationInfrastructure";
import ServiceMasterCloudArchitecture from "@/components/sections/service-master/ServiceMasterCloudArchitecture";
import ServiceMasterCICD from "@/components/sections/service-master/ServiceMasterCICD";
import ServiceMasterDesignSystem from "@/components/sections/service-master/ServiceMasterDesignSystem";
import ServiceMasterProductStrategy from "@/components/sections/service-master/ServiceMasterProductStrategy";
import ServiceMasterEnterpriseEcosystem from "@/components/sections/service-master/ServiceMasterEnterpriseEcosystem";
import ServiceMasterEnterpriseWorkflow from "@/components/sections/service-master/ServiceMasterEnterpriseWorkflow";
import ServiceMasterIndustries from "@/components/sections/service-master/ServiceMasterIndustries";
import ServiceMasterMetrics from "@/components/sections/service-master/ServiceMasterMetrics";
import ServiceMasterCaseStudy from "@/components/sections/service-master/ServiceMasterCaseStudy";
import ServiceMasterFAQ from "@/components/sections/service-master/ServiceMasterFAQ";
import ServiceMasterCTA from "@/components/sections/service-master/ServiceMasterCTA";

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | LogixLoops Enterprise Engineering`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="relative z-10 overflow-hidden">
      {/* Global Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="flex flex-col">
        {/* Core Sections (1-4) */}
        <ServiceMasterHero service={service} />
        <ServiceMasterProblems problems={service.problems} color={service.color} />
        <ServiceMasterCapabilities capabilities={service.capabilities} />
        <ServiceMasterTech technologies={service.technologies} />

        {/* Dynamic Data-Driven Sections (5-10) - Render conditionally if data exists */}
        {service.enterpriseEcosystem && <ServiceMasterEnterpriseEcosystem enterpriseEcosystem={service.enterpriseEcosystem} />}
        {service.enterpriseWorkflow && <ServiceMasterEnterpriseWorkflow enterpriseWorkflow={service.enterpriseWorkflow} />}
        {service.designSystem && <ServiceMasterDesignSystem designSystem={service.designSystem} />}
        {service.productStrategy && <ServiceMasterProductStrategy productStrategy={service.productStrategy} />}
        {service.cloudArchitecture && <ServiceMasterCloudArchitecture cloudArchitecture={service.cloudArchitecture} />}
        {service.cicdInfrastructure && <ServiceMasterCICD cicdInfrastructure={service.cicdInfrastructure} />}
        {service.orchestrationEcosystem && <ServiceMasterOrchestration orchestrationEcosystem={service.orchestrationEcosystem} />}
        {service.automationInfrastructure && <ServiceMasterAutomationInfrastructure automationInfrastructure={service.automationInfrastructure} />}
        {service.aiEcosystem && <ServiceMasterEcosystem aiEcosystem={service.aiEcosystem} />}
        {service.mlInfrastructure && <ServiceMasterMLInfrastructure mlInfrastructure={service.mlInfrastructure} />}
        {service.architectureSystems && <ServiceMasterArchitecture architectureSystems={service.architectureSystems} />}
        {service.infrastructure && <ServiceMasterInfrastructure infrastructure={service.infrastructure} />}
        {service.uxExperience && <ServiceMasterUX uxExperience={service.uxExperience} />}
        {service.workflow && <ServiceMasterProcess workflow={service.workflow} />}
        {service.solutions && <ServiceMasterSolutions solutions={service.solutions} />}
        <ServiceMasterIndustries />
        {service.metrics && <ServiceMasterMetrics metrics={service.metrics} />}
        {service.caseStudyPreview && <ServiceMasterCaseStudy caseStudy={service.caseStudyPreview} />}
        {service.faqs && <ServiceMasterFAQ faqs={service.faqs} />}

        {/* Final CTA (11) */}
        <ServiceMasterCTA service={service} />
      </div>
    </main>
  );
}
