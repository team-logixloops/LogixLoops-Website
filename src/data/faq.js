/**
 * LOGIXLOOPS: FAQ & Knowledge Base Data Layer
 *
 * Four separate sets, one per URL. Overlapping questions across URLs get the
 * duplicate FAQPage entities discarded, so no question appears twice.
 *
 * Every answer follows the same rule, and it is the most important thing in
 * this file: **the first sentence is the answer.** No preamble, no "great
 * question", no restating the question back. That first sentence is what gets
 * lifted into a featured snippet, read aloud by a voice assistant, and quoted
 * by ChatGPT or Perplexity when somebody asks about us. Everything after it is
 * the justification, for the reader who wants it.
 *
 * No figure appears here that is not either countable from this site or a
 * commitment we will sign. Rate cards still come from the business.
 */

export const FAQ_CATEGORIES = [
  "All Categories",
  "Engagement & Collaboration",
  "Engineering & Tech Stack",
  "Security & Compliance",
  "Pricing & Contracts",
];

/**
 * Pricing-page Q&A.
 */
export const PRICING_FAQS = [
  {
    id: "pricing-faq-1",
    question: "Why don't you publish fixed prices?",
    answer:
      "Because the same feature list costs wildly different amounts depending on what it has to plug into. Your existing architecture, your integration surface and your deadline move the number far more than anything on a rate card does, and quoting before we have seen those three would mean padding the figure to cover what we do not know. You get a written price after technical discovery, before any commitment.",
  },
  {
    id: "pricing-faq-2",
    question: "What is the minimum engagement?",
    answer:
      "Three months. Most enterprise transformations run six to twelve. Anything shorter does not leave room to understand the system, ship something that matters, and hand it over responsibly, and we would rather decline than do a rushed version of all three.",
  },
  {
    id: "pricing-faq-3",
    question: "How are dedicated squads billed?",
    answer:
      "A flat monthly retainer that buys a fixed team capacity. There are no hourly timesheets to argue about at the end of the month, and the cost does not move when a sprint runs hot. You are buying reserved capacity, not hours.",
  },
  {
    id: "pricing-faq-4",
    question: "When do I get a firm number?",
    answer:
      "After discovery and architectural mapping, which is the first paid phase. That phase produces a written brief covering the proposed stack, service boundaries, delivery phases and known risks. The quote attaches to that brief and is fixed for the scope it describes.",
  },
  {
    id: "pricing-faq-5",
    question: "Do I own the code and infrastructure?",
    answer:
      "Yes, all of it. We build only on open-source, industry-standard frameworks, so at the end of the engagement you keep 100% of the IP, the source and the infrastructure configuration. There is no proprietary LogixLoops runtime to keep paying for, and replacing us is a staffing decision rather than a rewrite.",
  },
  {
    id: "pricing-faq-6",
    question: "What is included in every engagement?",
    answer:
      "Working software every two weeks from Sprint 1, architecture documentation, test coverage, CI/CD pipelines and a production handover with runbooks. Ongoing monitoring, security patching and performance work sit outside that, under a separate support agreement, because they are a different commitment with a different cost.",
  },
];

/**
 * /services orientation Q&A.
 */
export const SERVICES_FAQS = [
  {
    id: "services-faq-1",
    question: "Which service do I actually need?",
    answer:
      "Pick the practice closest to your primary constraint and let the discovery call sort out the rest. Most engagements draw on two or three at once: a SaaS build almost always pulls in cloud infrastructure and UI/UX, and an AI integration is a data pipeline problem long before it is a model problem.",
  },
  {
    id: "services-faq-2",
    question: "Can you work alongside our in-house engineers?",
    answer:
      "Yes, and on a Dedicated Squad engagement that is the default. We work in your Jira or Linear instance, attend your standups and live in your Slack or Teams channels. Nothing gets copied into a private tracker and summarised back to you.",
  },
  {
    id: "services-faq-3",
    question: "Do you take on legacy systems, or only greenfield work?",
    answer:
      "Both, and legacy modernisation is the larger share. Our standard approach is the Strangler Fig pattern: route traffic through a gateway, replace monolithic endpoints with new services one at a time, and keep the old path live until the new one has carried real load. The business never stops trading during the migration.",
  },
  {
    id: "services-faq-4",
    question: "What technology stack do you standardise on?",
    answer:
      "React and Next.js on the front, Node.js or Go behind them, PostgreSQL for data, and AWS or GCP for infrastructure. Everything is open source or a standard managed service, deliberately, so the next team to touch the repository recognises all of it.",
  },
];

/**
 * The five questions in the home page preview accordion. They mirror the
 * FAQPage JSON-LD emitted from the same source, so the visible answers and
 * the markup cannot drift.
 */
export const HOME_FAQS = [
  {
    id: "home-faq-1",
    question: "What are your typical project timelines?",
    answer:
      "Three to nine months for most enterprise builds, with a usable MVP inside eight to twelve weeks. You see running software at the end of every two-week sprint from the first one, so you are never waiting until the end to find out whether it is going well.",
  },
  {
    id: "home-faq-2",
    question: "What technology stacks do you specialise in?",
    answer:
      "Next.js and React on the front end, Node.js, Python or Go on the back end, PostgreSQL for data, and AWS or GCP underneath. We standardised on a short list on purpose: a stack you can staff for in five years is worth more than one that was exciting this year.",
  },
  {
    id: "home-faq-3",
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes, under a separate support agreement with the response times written into it. That covers monitoring, security patching and performance work. We quote it separately from the build rather than folding it in, so you can see exactly what ongoing support costs before you commit to it.",
  },
  {
    id: "home-faq-4",
    question: "How do you handle scope changes?",
    answer:
      "Openly, and the mechanism depends on your engagement model. On a Dedicated Squad the change is absorbed into the next sprint by reprioritising, since you control the backlog. On a Scoped Programme it is re-priced explicitly and you approve it before anyone starts. What we do not do is quietly absorb changes and bill for them later.",
  },
  {
    id: "home-faq-5",
    question: "Can your architectures handle serious scale?",
    answer:
      "We design for the load you can credibly forecast and write down where the ceiling is. Decoupled services, edge caching and autoscaling infrastructure are standard, but the honest version is this: over-engineering for scale you do not have costs as much as ignoring it. We tell you which one you are actually facing.",
  },
];

export const FAQS = [
  {
    id: "faq-1",
    category: "Engagement & Collaboration",
    question: "Do you integrate with our internal engineering teams?",
    answer:
      "Yes, and on Dedicated Squad engagements it is how we work by default. We operate inside your Jira or Linear instance, attend your daily standups and communicate in shared Slack or Teams channels. Your engineers review our pull requests and ours review theirs.",
  },
  {
    id: "faq-2",
    category: "Engagement & Collaboration",
    question: "What is your typical project timeline?",
    answer:
      "Three months is the minimum, and most enterprise transformations run six to twelve. Working software is demonstrated every two weeks from Sprint 1, so the timeline is visible throughout rather than being a date you find out about at the end.",
  },
  {
    id: "faq-3",
    category: "Engagement & Collaboration",
    question: "Who will actually be working on my project?",
    answer:
      "Senior engineers, and the same people you met on the discovery call. We are a small studio, which means there is no junior bench to hide behind and no account manager relaying messages between you and the build. It also means we take on a handful of engagements at a time and will say so when we are full.",
  },
  {
    id: "faq-4",
    category: "Engineering & Tech Stack",
    question: "Are we locked into proprietary LogixLoops technology?",
    answer:
      "No, and there is nothing to be locked into. We build only on open-source, industry-standard frameworks such as React, Node, Go, PostgreSQL and AWS or GCP. At handover you keep 100% of the IP, source code and infrastructure configuration.",
  },
  {
    id: "faq-5",
    category: "Engineering & Tech Stack",
    question: "Do you handle legacy system migrations?",
    answer:
      "Yes, using the Strangler Fig pattern. Traffic routes through an API gateway, legacy endpoints are replaced with modern services one at a time, and the old path stays live until the new one has carried real production load. Every step is reversible, so no single deploy can take the business down.",
  },
  {
    id: "faq-6",
    category: "Engineering & Tech Stack",
    question: "How do you decide whether a problem actually needs AI?",
    answer:
      "We check whether a query, a rules engine or well-indexed search solves it first, because very often one of them does. A model is the right answer when the problem is genuinely probabilistic, and when it is, we tell you what inference costs per call and what the fallback is before anything gets built.",
  },
  {
    id: "faq-7",
    category: "Security & Compliance",
    question: "Can you build HIPAA or SOC 2 compliant systems?",
    answer:
      "We design architectures to those control sets, with end-to-end encryption, strict role-based access and immutable audit logging built in from the start. One distinction worth being clear about: LogixLoops is not itself a certified entity, and no agency's certification transfers to your system. What we can do is build something that passes your audit.",
  },
  {
    id: "faq-8",
    category: "Security & Compliance",
    question: "What access do your engineers have to our systems?",
    answer:
      "Scoped, time-limited credentials to the environments the work requires, and nothing beyond them. Every action is logged, access is reviewed when the scope changes, and everything is revoked at handover. If an auditor asks who touched what and when, the answer is a query rather than somebody's recollection.",
  },
  {
    id: "faq-9",
    category: "Pricing & Contracts",
    question: "How does billing work for dedicated squads?",
    answer:
      "A flat monthly retainer, billed for reserved capacity rather than hours. There are no timesheets to reconcile, the cost is the same whether a sprint runs hot or quiet, and the minimum term is three months, rolling after that.",
  },
  {
    id: "faq-10",
    category: "Pricing & Contracts",
    question: "What happens if we want to stop?",
    answer:
      "You give notice, and you leave with everything. Source, infrastructure configuration, documentation, decision records and credentials, in a state another team can pick up. We would rather be easy to leave than hold anyone hostage with an undocumented codebase.",
  },
];
