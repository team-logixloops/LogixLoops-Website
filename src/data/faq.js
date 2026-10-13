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
 * commitment we will sign. Plan prices are read from plans.js, never typed.
 * Kit prices are not quoted here: this module is imported by client pages,
 * and the kit catalogue must stay out of their bundles. Answers point at
 * the kit pages and /pricing instead.
 */

import { getPlanBySlug } from "@/data/plans";
import { formatPriceProse } from "@/lib/pricing";

const planPrice = (slug) => formatPriceProse(getPlanBySlug(slug).price);

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
    question: "Are the kit prices fixed?",
    answer:
      "Yes, for the scope listed on each kit page. The starting price buys exactly what the kit includes. If you need more, such as extra pages, products or an add-on, we quote the difference in writing before work starts, and nothing is added to the bill without your approval.",
  },
  {
    id: "pricing-faq-2",
    question: "Why are the rupee and dollar prices different?",
    answer:
      "Because each is set for its own market rather than converted. Rupee prices are for businesses based in India, and US dollar prices are for businesses everywhere else. The kit, the team and the work are the same in both.",
  },
  {
    id: "pricing-faq-3",
    question: "How do payments work?",
    answer:
      "Kits are paid in two parts: half to start and half at launch, before handover. Pit Crew plans are billed monthly in advance. Prices exclude taxes such as GST, which are added to the invoice where they apply.",
  },
  {
    id: "pricing-faq-4",
    question: "What is not included in a kit's price?",
    answer:
      "Costs charged by other companies: domain names, hosting, Shopify or app store fees, payment gateway charges, AI model usage and Meta's WhatsApp message charges. They are billed directly to accounts in your name, so you see every one of them and own every account.",
  },
  {
    id: "pricing-faq-5",
    question: "Do I own the code and infrastructure?",
    answer:
      "Yes, from day one. Your domain, code, designs and accounts are set up in your name, on open-source frameworks and standard services. There is no proprietary LogixLoops runtime to keep paying for, so you can keep working with us, hire someone else or take it in-house without a rewrite.",
  },
  {
    id: "pricing-faq-6",
    question: "What if my project does not fit a kit?",
    answer: `We quote it. Larger or unusual work, such as marketplaces, internal systems or integrations with older software, is scoped on a call and priced in writing against a short brief, and that price is fixed for the scope it describes. Ongoing product work runs on a Pit Crew Squad plan, from ${planPrice("squad")}.`,
  },
];

/**
 * /services orientation Q&A.
 */
export const SERVICES_FAQS = [
  {
    id: "services-faq-1",
    question: "Which line or kit do I need?",
    answer:
      "Start from the result you want. A new website, store or app sits in web and app development, a logo and look in branding, a better version of a site you already have in website redesign, being found on Google and in AI answers in SEO and AI search, routine work handled for you in AI and automation, and ongoing care in a maintenance plan. Each line page lists its kits, and the first call ends with a named kit or a plain no.",
  },
  {
    id: "services-faq-2",
    question: "Can I combine kits from different lines?",
    answer:
      "Yes, and most growing businesses do. A common pairing is the Brand Identity Kit with the Business Website Kit, or a Website Glow-Up Kit followed by the SEO Foundation Kit. One team handles every kit, so nothing is lost between them, and the Brand Launch Kit bundles the most common combination for less than its parts.",
  },
  {
    id: "services-faq-3",
    question: "Can you work alongside our in-house team?",
    answer:
      "Yes. On a Pit Crew Squad plan that is the default: we work in your tracker, join your standups and talk in your Slack or WhatsApp. For one-off kits we hand over the code, the accounts and a recorded walkthrough, so your team can carry on without us.",
  },
  {
    id: "services-faq-4",
    question: "What technology do you build on?",
    answer:
      "Mostly Next.js and React on the web, React Native for apps, Node.js or Python behind them and PostgreSQL for data, hosted on Vercel, AWS or GCP in your own account. Everything is open source or a standard managed service, so any good developer can pick it up after us.",
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
      "One to six weeks for most kits, and every kit page lists its own. Apps take longer: an MVP six to eight weeks and a mobile app eight to twelve. You see working progress every week or two, so you never wait until the end to find out how it is going.",
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
      `Yes, in two ways. Every kit ends with The Loop: 30 days after launch of measuring, fixing and tuning with real data. After that, Pit Crew plans keep your site or app running from ${planPrice("essentials")}, with exactly what each plan covers written into it.`,
  },
  {
    id: "home-faq-4",
    question: "How do you handle scope changes?",
    answer:
      "In writing, before any work. A kit's price covers its listed scope; anything beyond it is quoted as an add-on or a change, and you approve it before anyone starts. On a Pit Crew Squad plan, changes go into the next sprint, because you set the priorities. Nothing is quietly absorbed and billed later.",
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
      "Yes, and on a Pit Crew Squad plan it is how we work by default. We work in your Jira or Linear, join your standups and talk in shared Slack, Teams or WhatsApp channels. Your engineers review our pull requests and ours review theirs.",
  },
  {
    id: "faq-2",
    category: "Engagement & Collaboration",
    question: "What is your typical project timeline?",
    answer:
      "Most kits take between one and six weeks, from a speed fix to an online store, and every kit page lists its own timeline. Apps take longer: an MVP six to eight weeks and a mobile app eight to twelve. Work starts once your content and accounts are ready, and you see progress every week.",
  },
  {
    id: "faq-3",
    category: "Engagement & Collaboration",
    question: "Who will actually be working on my project?",
    answer:
      "Senior engineers, and the same people you met on the discovery call. We are a senior studio, which means there is no junior bench to hide behind and no account manager relaying messages between you and the build. It also means we take on a handful of engagements at a time and will say so when we are full.",
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
    question: "How is the Pit Crew Squad plan billed?",
    answer:
      `A flat monthly fee, from ${planPrice("squad")}, for reserved capacity rather than hours. There are no timesheets to reconcile, the fee stays the same whether a sprint runs hot or quiet, and the minimum term is three months, then month to month.`,
  },
  {
    id: "faq-10",
    category: "Pricing & Contracts",
    question: "What happens if we want to stop?",
    answer:
      "You give notice, and you leave with everything. Source, infrastructure configuration, documentation, decision records and credentials, in a state another team can pick up. We would rather be easy to leave than hold anyone hostage with an undocumented codebase.",
  },
];
