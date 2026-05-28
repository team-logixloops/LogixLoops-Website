/**
 * LOGIXLOOPS — FAQ & Knowledge Base Data Layer
 */

export const FAQ_CATEGORIES = [
  "All Categories",
  "Engagement & Collaboration",
  "Engineering & Tech Stack",
  "Security & Compliance",
  "Pricing & Contracts"
];

export const FAQS = [
  {
    id: "faq-1",
    category: "Engagement & Collaboration",
    question: "Do you integrate with our internal engineering teams?",
    answer: "Absolutely. For our Dedicated Squad engagements, we integrate directly into your Jira/Linear instances, attend your daily standups, and communicate via shared Slack/Teams channels. We act as a seamless extension of your organization."
  },
  {
    id: "faq-2",
    category: "Engagement & Collaboration",
    question: "What is your typical project timeline?",
    answer: "While highly dependent on scope, our minimum engagement is 3 months. Most enterprise transformations range from 6 to 12 months. We deliver working software every 2 weeks starting from Sprint 1."
  },
  {
    id: "faq-3",
    category: "Engineering & Tech Stack",
    question: "Are we locked into proprietary LogixLoops technology?",
    answer: "No. We build exclusively on open-source, industry-standard frameworks (React, Node, Go, Postgres, AWS/GCP). At the end of the engagement, you retain 100% ownership of the IP, source code, and infrastructure configurations."
  },
  {
    id: "faq-4",
    category: "Engineering & Tech Stack",
    question: "Do you handle legacy system migrations?",
    answer: "Yes. Our specialty is the 'Strangler Fig' pattern—incrementally replacing legacy monolithic endpoints with modern microservices behind an API gateway, ensuring zero downtime during the transition."
  },
  {
    id: "faq-5",
    category: "Security & Compliance",
    question: "Can you build HIPAA or SOC2 compliant systems?",
    answer: "Yes. Our engineering practices include end-to-end encryption, strict RBAC, and immutable audit logging by default. We can architect systems specifically designed to pass SOC2 Type II and HIPAA audits."
  },
  {
    id: "faq-6",
    category: "Pricing & Contracts",
    question: "How does billing work for Dedicated Squads?",
    answer: "Dedicated squads are billed on a flat monthly retainer, guaranteeing you a fixed velocity and capacity. This avoids the administrative overhead of hourly timesheets and ensures total alignment on delivery."
  }
];
