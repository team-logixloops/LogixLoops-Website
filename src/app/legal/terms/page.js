import LegalLayout from "@/components/sections/legal/LegalLayout";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TERMS_DESCRIPTION =
  "The Terms and Conditions governing your use of LogixLoops services, platforms, deliverables, and intellectual property.";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: TERMS_DESCRIPTION,
  path: "/legal/terms",
});

export default function TermsAndConditionsPage() {
  const sections = [
    { id: "general-agreement", title: "1. General Agreement & Scope" },
    { id: "user-responsibilities", title: "2. User & Client Responsibilities" },
    { id: "payments-commercials", title: "3. Payments & Commercial Terms" },
    { id: "intellectual-property", title: "4. Intellectual Property Rights" },
    { id: "prohibited-activities", title: "5. Prohibited Activities & Termination" },
    { id: "disclaimers-liability", title: "6. Disclaimers & Limitations of Liability" },
    { id: "governing-law", title: "7. Governing Law & Updates" },
  ];

  return (
    <LegalLayout
      title="Terms & Conditions"
      effectiveDate="May 26, 2026"
      description="These Terms & Conditions outline the rules, obligations, and legal guidelines governing your use of LogixLoops platforms, services, and digital products. By accessing our ecosystem, you agree to these structured business practices."
      sections={sections}
      summary={[
        "Using this site or our services means you accept these terms.",
        "You own the work we build for you once the engagement is paid and handed over.",
        "We own our own tools, methods, and anything we built before working with you.",
        "Do not misuse the site: no scraping, no breaking in, no reselling our content as your own.",
        "We cannot promise the site is error-free, and our liability is limited to what you paid us.",
        "Indian law governs these terms. We may update them, and the date at the top shows when.",
      ]}
    >
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Terms & Conditions", path: "/legal/terms" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "Terms & Conditions",
          description: TERMS_DESCRIPTION,
          path: "/legal/terms",
        })}
      />

      {/* 1. General Agreement & Scope */}
      <div id="general-agreement" className="scroll-mt-32">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">1</span>
          General Agreement & Scope
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">1.1 Acceptance of Terms</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              By accessing or using LogixLoops websites, platforms, software, applications, products, or services, users agree to comply with these Terms & Conditions.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">1.2 Right to Modification</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops reserves the right to modify, suspend, discontinue, reject, or limit any service, feature, pricing structure, subscription, project scope, or platform access at any time without prior notice.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">1.3 Indicative Timelines & Deliverables</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              All services, timelines, deliverables, consultations, technical estimates, performance expectations, and project schedules are indicative in nature and may vary due to technical limitations, client-side delays, third-party dependencies, infrastructure failures, operational requirements, or unforeseen circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* 2. User & Client Responsibilities */}
      <div id="user-responsibilities" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">2</span>
          User & Client Responsibilities
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">2.1 Provision of Information</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users and clients are solely responsible for providing accurate, lawful, complete, and authorized information, materials, credentials, approvals, and content required for project execution or service delivery.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">2.2 Security & Backups</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users are solely responsible for maintaining independent backups, securing credentials, protecting devices, managing authorized access, and implementing internal security practices unless otherwise contractually agreed.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Payments & Commercials */}
      <div id="payments-commercials" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">3</span>
          Payments & Commercial Terms
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">3.1 Payment Obligations</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Payments, retainers, subscriptions, consultation fees, milestone payments, setup fees, taxes, gateway charges, and applicable government levies must be paid as agreed and may be non-refundable unless explicitly stated otherwise in writing.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">3.2 Out-of-Scope Pricing</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Any work requested outside the originally agreed scope may require additional pricing, revised timelines, or updated agreements at the discretion of LogixLoops.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Intellectual Property Rights */}
      <div id="intellectual-property" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">4</span>
          Intellectual Property Rights
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm relative overflow-hidden hover:border-primary/30 transition-colors">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <h3 className="font-label text-sm text-on-surface mb-2">4.1 Ownership of Assets</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed relative z-10">
              All proprietary systems, software structures, frameworks, methodologies, designs, branding elements, workflows, strategies, codebases, documentation, automation systems, AI implementations, and internal operational assets remain the intellectual property of LogixLoops unless ownership is formally transferred through written agreement after complete payment clearance.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">4.2 Portfolio & Marketing Rights</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops reserves the right to showcase completed projects, visuals, case studies, screenshots, branding, designs, and non-confidential deliverables for portfolio, presentation, proposal, social media, or marketing purposes unless restricted through signed confidentiality agreements.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Prohibited Activities & Termination */}
      <div id="prohibited-activities" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">5</span>
          Prohibited Activities & Termination
        </h2>
        <div className="space-y-4">
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">5.1 Misuse of Intellectual Property</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users may not copy, reproduce, reverse engineer, scrape, exploit, resell, disrupt, bypass, manipulate, or misuse any part of LogixLoops services, systems, intellectual property, infrastructure, or digital assets without prior written authorization.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm border-l-4 border-l-error/60 bg-error/5 hover:border-r-outline-variant/50 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">gpp_bad</span>
              5.2 Unlawful Conduct
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users are prohibited from using LogixLoops platforms or services for illegal activities, fraudulent conduct, intellectual property violations, malware distribution, spam activities, harassment, unauthorized access attempts, or any activity violating applicable Indian or international laws.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">5.3 Right to Termination</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops reserves the right to suspend, terminate, restrict, or refuse services, access, accounts, communications, or project engagements without liability if misuse, abuse, non-payment, suspicious activity, legal risks, security concerns, or violations of these Terms are identified.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">5.4 Indemnification</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users agree to indemnify and hold harmless LogixLoops, its founders, employees, contractors, affiliates, and partners against any claims, damages, liabilities, disputes, penalties, losses, or legal expenses arising from misuse of services, violations of law, infringement of third-party rights, or unauthorized activities conducted through use of the platform or services.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Disclaimers & Limitations of Liability */}
      <div id="disclaimers-liability" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">6</span>
          Disclaimers & Limitations of Liability
        </h2>
        <div className="space-y-4">
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.1 Force Majeure & Operational Disruptions</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops shall not be held responsible for delays, interruptions, losses, errors, failures, downtime, bugs, security incidents, API failures, hosting issues, cyber attacks, third-party service disruptions, internet outages, force majeure events, or business losses arising directly or indirectly from use of services.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.2 Performance & Outcome Disclaimers</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops does not guarantee uninterrupted operation, error-free systems, business growth, revenue generation, lead conversion, SEO rankings, platform availability, market performance, AI accuracy, or any specific commercial outcome from the use of its services or products.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.3 Third-Party Integrations</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops may integrate third-party services, APIs, cloud providers, payment gateways, analytics tools, AI systems, communication platforms, plugins, or external software and shall not be responsible for failures, policy changes, outages, bans, data losses, pricing modifications, or operational disruptions caused by such third parties.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm relative overflow-hidden hover:border-primary/30 transition-colors">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full pointer-events-none" />
            <h3 className="font-label text-sm text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
              6.4 AI-Generated Outputs
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed relative z-10">
              AI-generated outputs, automation systems, analytics models, recommendations, or software-generated responses may contain inaccuracies, incomplete information, biases, or unintended behavior, and users are solely responsible for independently verifying outputs before relying on them for financial, legal, operational, business, or strategic decisions.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm border-l-4 border-l-primary bg-primary/5 hover:border-r-outline-variant/50 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.5 Maximum Liability Cap</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Under no circumstance shall LogixLoops’ total liability exceed the amount paid by the client for the specific service directly associated with the claim.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Governing Law & Updates */}
      <div id="governing-law" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">7</span>
          Governing Law & Updates
        </h2>
        <div className="space-y-4">
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-[24px] mt-1">account_balance</span>
            <div>
              <h3 className="font-label text-sm text-on-surface mb-2">7.1 Jurisdiction</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                These Terms & Conditions shall be governed by the laws of India and all disputes shall fall exclusively under the jurisdiction of courts located in Jaipur, Rajasthan, India.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">7.2 Future Modifications</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops reserves the right to update, revise, or modify these Terms & Conditions at any time, and continued use of services after updates constitutes acceptance of revised terms.
            </p>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
