import LegalLayout from "@/components/sections/legal/LegalLayout";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PRIVACY_DESCRIPTION =
  "How LogixLoops collects, stores, protects, and uses your data, including cookies, third-party services, and your rights over your information.";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "information-collection", title: "1. Information Collection & Usage" },
    { id: "data-protection", title: "2. Data Protection & Security Risks" },
    { id: "cookies-tracking", title: "3. Cookies & Tracking Technologies" },
    { id: "third-party-services", title: "4. Third-Party Services & Integrations" },
    { id: "data-sharing", title: "5. Data Sharing & Disclosure" },
    { id: "retention-responsibilities", title: "6. Data Retention & User Responsibilities" },
    { id: "governing-law", title: "7. Governing Law & Updates" },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      effectiveDate="May 26, 2026"
      description="This Privacy Policy outlines how LogixLoops collects, utilizes, and protects information across our digital ecosystem. We believe in transparent operational practices and responsible data stewardship."
      sections={sections}
      summary={[
        "We collect what you send us through forms, plus basic analytics about how the site is used.",
        "We use it to reply to you, run the site, and improve it. We do not sell it.",
        "We share data only with the services we need to operate, such as hosting and email delivery.",
        "Your data is encrypted in transit and at rest, and access is limited to the people who need it.",
        "You can ask us what we hold about you, or ask us to delete it, at any time.",
        "You can turn off cookies in your browser. Some parts of the site may work less well if you do.",
      ]}
    >
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { label: "Home", path: "/" },
          { label: "Privacy Policy", path: "/legal/privacy" },
        ])}
      />
      <SchemaMarkup
        schema={generateWebPageSchema({
          name: "Privacy Policy",
          description: PRIVACY_DESCRIPTION,
          path: "/legal/privacy",
        })}
      />

      {/* 1. Information Collection & Usage */}
      <div id="information-collection" className="scroll-mt-32">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">1</span>
          Information Collection & Usage
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">1.1 Data Collected</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops may collect personal, technical, operational, transactional, analytical, and communication-related information including names, contact details, company information, billing information, IP addresses, browser details, device data, cookies, uploaded files, usage activity, and communication records for operational and service-related purposes.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">1.2 Purpose of Use</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Information collected may be used for project execution, customer communication, support services, analytics, security monitoring, fraud prevention, billing, authentication, service improvements, operational management, legal compliance, business administration, and authorized marketing activities.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Data Protection & Security Risks */}
      <div id="data-protection" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">2</span>
          Data Protection & Security Risks
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">2.1 Technical Safeguards</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops implements reasonable technical and organizational safeguards to protect collected information; however, no internet-based system, digital infrastructure, cloud platform, software environment, or communication method can guarantee absolute security.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">2.2 Acknowledgment of Risks</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users acknowledge and accept inherent cybersecurity, internet, cloud infrastructure, third-party platform, hosting, API, and digital communication risks associated with online services.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm border-l-4 border-l-secondary bg-secondary/5 hover:border-r-outline-variant/50 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">shield_locked</span>
              2.3 Liability Disclaimer
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops shall not be held liable for unauthorized access, data breaches, cyber attacks, phishing incidents, credential leaks, malware infections, hosting failures, third-party vulnerabilities, user negligence, or security failures occurring outside reasonable operational control.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Cookies & Tracking Technologies */}
      <div id="cookies-tracking" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">3</span>
          Cookies & Tracking Technologies
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm relative overflow-hidden hover:border-primary/30 transition-colors">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <h3 className="font-label text-sm text-on-surface mb-2">3.1 Analytics & Performance Tracking</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed relative z-10">
              LogixLoops may use cookies, analytics systems, tracking technologies, session management tools, performance monitoring tools, behavioral analytics, and marketing technologies to improve website functionality, user experience, operational efficiency, and platform performance.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Third-Party Services & Integrations */}
      <div id="third-party-services" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">4</span>
          Third-Party Services & Integrations
        </h2>
        <div className="space-y-4">
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">4.1 Service Providers</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops may engage third-party providers including hosting services, analytics platforms, AI providers, payment gateways, communication tools, CRM systems, automation services, and cloud infrastructure providers that may process limited information necessary for operational functionality.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">4.2 External Links</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops websites or services may contain links, integrations, or references to third-party platforms and external websites, and LogixLoops shall not be responsible for their content, privacy practices, security standards, availability, or operational behavior.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-[24px] mt-1">public</span>
            <div>
              <h3 className="font-label text-sm text-on-surface mb-2">4.3 Cross-Border Data Transfers</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                Some services, infrastructure providers, AI systems, cloud platforms, or operational tools utilized by LogixLoops may process or store data outside India, and users consent to such processing where necessary for service functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Data Sharing & Disclosure */}
      <div id="data-sharing" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">5</span>
          Data Sharing & Disclosure
        </h2>
        <div className="space-y-4">
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">5.1 No Sale of Personal Information</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops does not sell personal information to third parties; however, information may be shared where required for operational purposes, payment processing, legal compliance, fraud prevention, security enforcement, contractual obligations, regulatory requirements, or protection of company rights and infrastructure.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm border-l-4 border-l-primary hover:border-r-outline-variant/50 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">gavel</span>
              5.2 Legal & Regulatory Disclosures
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops reserves the right to disclose information where required by Indian law, judicial authorities, law enforcement agencies, government bodies, regulatory frameworks, contractual obligations, fraud investigations, or protection of legal rights and operational security.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Data Retention & User Responsibilities */}
      <div id="retention-responsibilities" className="scroll-mt-32 mt-12">
        <h2 className="font-display text-2xl text-on-surface mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm border border-primary/20">6</span>
          Data Retention & User Responsibilities
        </h2>
        <div className="space-y-4">
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.1 Data Retention Periods</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              User data may be retained for operational, analytical, security, backup, archival, accounting, contractual, legal, compliance, dispute-resolution, and business continuity purposes even after service completion or account inactivity.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">6.2 User Account Responsibilities</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users remain solely responsible for protecting account credentials, maintaining device security, preventing unauthorized access, ensuring accuracy of submitted information, and managing internal access permissions.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm border-l-4 border-l-error/60 bg-error/5 hover:border-r-outline-variant/50 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">warning</span>
              6.3 Sensitive Information Advisory
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              Users are advised not to submit highly sensitive confidential, financial, legal, governmental, or regulated information through unsecured communication channels unless formally protected through signed agreements and approved security practices.
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
           <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <h3 className="font-label text-sm text-on-surface mb-2">7.1 Future Modifications</h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              LogixLoops may update, revise, modify, or replace this Privacy Policy at any time without prior notice, and continued use of services or platforms after updates constitutes acceptance of revised policies.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/40 backdrop-blur-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-[24px] mt-1">account_balance</span>
            <div>
              <h3 className="font-label text-sm text-on-surface mb-2">7.2 Jurisdiction</h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                This Privacy Policy shall be governed by the laws of India and subject exclusively to the jurisdiction of courts located in Jaipur, Rajasthan, India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
