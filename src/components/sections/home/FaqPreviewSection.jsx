"use client";

import { SectionHeader, Accordion, Button } from "@/components/ui";
import { FadeInUp } from "@/components/motion";

const FAQS = [
  {
    question: "What are your typical project timelines?",
    answer: "Enterprise software projects generally range from 3 to 9 months depending on scope. For SaaS platforms and AI integrations, we utilize agile sprints, typically delivering an MVP within 8-12 weeks."
  },
  {
    question: "What technology stacks do you specialize in?",
    answer: "We engineer using modern, high-performance ecosystems: Next.js, React, Node.js, Python, Go, and cloud-native services across AWS, GCP, and Azure."
  },
  {
    question: "Do you provide post-launch support and maintenance?",
    answer: "Absolutely. We offer comprehensive SLA-backed maintenance packages, 24/7 telemetry monitoring, and continuous deployment management to ensure long-term stability."
  },
  {
    question: "How do you handle scope changes or revisions?",
    answer: "Our strategic discovery phase minimizes scope creep. However, our agile methodology allows for fluid course correction. We adjust sprint backlogs collaboratively to accommodate pivoting business needs."
  },
  {
    question: "Can your architectures scale for millions of users?",
    answer: "Yes. Scalability is at the core of our engineering philosophy. We utilize decoupled microservices, edge caching, and auto-scaling infrastructure to handle massive traffic surges effortlessly."
  }
];

export default function FaqPreviewSection() {
  return (
    <section className="container-site py-stack-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-start">
        <div className="lg:col-span-4 flex flex-col justify-start">
          <FadeInUp>
            <SectionHeader 
              overline="Common Questions"
              title="Architectural Clarity" 
              description="Transparency is critical to our engineering process. Find answers to common questions about our methodology and delivery."
            />
            <div className="mt-8">
              <Button href="/faq" variant="outline" icon="arrow_forward" iconPosition="right">
                View All FAQs
              </Button>
            </div>
          </FadeInUp>
        </div>
        
        <div className="lg:col-span-8">
          <FadeInUp delay={0.2}>
            <Accordion 
              items={FAQS} 
              variant="bordered" 
              className="!grid grid-cols-1 md:grid-cols-2 gap-4 items-start" 
            />
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
