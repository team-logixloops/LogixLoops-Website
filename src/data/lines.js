/**
 * The six lines LogixLoops sells in.
 *
 * Every line has a memorable name (Engine, Spark...) and a plain label. The
 * label is what search engines and AI assistants read: it leads the H1, the
 * page title and the schema. The name is what people remember. The two are
 * never shown apart.
 *
 * FAQ answers that quote a price or a timeline read them from the kit and plan
 * records, so they cannot drift from what the kit pages show.
 */

import { LINE_INDEX } from "./line-index";
import { getKitBySlug } from "./kits";
import { getPlanBySlug } from "./plans";
import { formatPriceProse } from "@/lib/pricing";

const kitPrice = (slug) => formatPriceProse(getKitBySlug(slug).price);
const kitTime = (slug) => getKitBySlug(slug).timeline;
const planPrice = (slug) => formatPriceProse(getPlanBySlug(slug).price);

/* Everything a line page needs beyond the index: copy, problems, FAQs. */
const DETAILS = [
  {
    slug: "web-and-app-development",
    summary:
      "Engine is the LogixLoops web and app development line. We build business websites, online stores, startup MVPs and iOS and Android apps as fixed-scope Loops with published starting prices. Every build is fast on an ordinary phone, ready for Google and AI search, and handed over in your name.",
    metaTitle: "Web & App Development: Websites, Stores, Apps",
    metaDescription:
      "Business websites, online stores, MVPs and mobile apps built as fixed-scope Loops with public starting prices. Fast, search-ready and yours from day one.",
    keywords: [
      "web development company",
      "app development company",
      "website development company in Jaipur",
      "mobile app development company India",
      "MVP development company",
      "ecommerce website development",
    ],
    problems: [
      {
        title: "You are starting from nothing",
        desc: "A new business needs a website, a store or an app that works on day one. We build it with the price and the timeline agreed before we start.",
      },
      {
        title: "Your idea needs real users",
        desc: "An MVP is the smallest version people can actually use and pay for. We build it in weeks, so you learn from customers instead of guessing.",
      },
      {
        title: "Off-the-shelf tools no longer fit",
        desc: "When spreadsheets and plugins hold the business together, a proper website, app or custom tool gives the work one place to live, built around how you operate.",
      },
    ],
    underTheHood: [
      "Next.js and React on the web, typed end to end with TypeScript",
      "React Native for iPhone and Android from one codebase, with Swift or Kotlin where the hardware needs it",
      "Node.js or Python behind it, with PostgreSQL for data",
      "Hosting on Vercel, AWS or GCP, in your own account",
      "Core Web Vitals checked on a mid-range Android phone before launch",
      "Every release from a Git repository you own, with automated checks on each change",
    ],
    faqs: [
      {
        q: "How much does a website or app cost with LogixLoops?",
        a: `A business website starts from ${kitPrice("business-website")}, an online store from ${kitPrice("online-store")}, an MVP from ${kitPrice("mvp")} and a mobile app from ${kitPrice("mobile-app")}. Each Loop page lists exactly what that price includes and which add-ons cost extra.`,
      },
      {
        q: "How long does it take to build a website or app?",
        a: `A business website takes ${kitTime("business-website")}, an online store ${kitTime("online-store")}, an MVP ${kitTime("mvp")} and a mobile app ${kitTime("mobile-app")}. The clock starts once your content and accounts are ready, and you see working progress every week or two.`,
      },
      {
        q: "Which is better for my business, a website or an app?",
        a: "Start with a website unless your customers use you every week. A website is cheaper, is found through Google and works on every device; an app earns its cost when people return often enough to keep it on their home screen.",
      },
      {
        q: "Can you work on a website or app someone else built?",
        a: "Yes. If it works but needs a makeover, that is what the Website Glow-Up Loop is for. If it is fragile or hard to change, we start with a short audit and tell you plainly whether to fix it or rebuild it.",
      },
    ],
  },
  {
    slug: "branding",
    summary:
      "Spark is the LogixLoops branding line. We design logos, colour palettes, type and brand guidelines for new and growing businesses, and package them with a website and social Loop when you are launching. You get every source file, a clear rulebook for using it, and a brand that looks the same everywhere.",
    metaTitle: "Branding Agency: Logo, Identity, Brand Launch",
    metaDescription:
      "Logo design, brand identity and brand guidelines as fixed-price Loops, plus a Brand Launch Loop with website and socials. Every source file is yours.",
    keywords: [
      "branding agency",
      "brand identity design",
      "logo design company",
      "branding agency in Jaipur",
      "branding package for startups",
      "brand guidelines design",
    ],
    problems: [
      {
        title: "You are launching with no look yet",
        desc: "A name and an idea are not a brand. We turn them into a logo, colours and type that work on a shop sign, a phone screen and an invoice.",
      },
      {
        title: "Your brand looks different everywhere",
        desc: "Different logos on the website, Instagram and packaging make a business look smaller than it is. A guidelines document fixes that for everyone who touches the brand.",
      },
      {
        title: "You need to look credible fast",
        desc: "Investors and large clients decide in seconds. A consistent identity makes a young company look established from the first meeting.",
      },
    ],
    underTheHood: [
      "Logos delivered as SVG, PDF and PNG, with light, dark and single-colour versions",
      "Colour values in HEX, RGB and CMYK, checked for WCAG contrast on screen",
      "Brand tokens exported as JSON and CSS files your developers can use directly",
      "Editable source files in Figma, shared to your own account",
      "Typefaces chosen with web licensing checked, so your website can use them legally",
    ],
    faqs: [
      {
        q: "How much does logo and brand identity design cost?",
        a: `Our Brand Identity Loop starts from ${kitPrice("brand-identity")} and includes the logo, colours, type and a brand guidelines document. The Brand Launch Loop starts from ${kitPrice("brand-launch")} and adds a business website, a social media Loop and a Google Business Profile.`,
      },
      {
        q: "What is the difference between a logo and a brand identity?",
        a: "A logo is one mark; a brand identity is the full system around it. That system covers colours, typefaces, how the logo may and may not be used, and the tone you write in, so everything you publish looks like it came from the same business.",
      },
      {
        q: "Can you refresh our existing brand instead of starting over?",
        a: "Yes. We keep what people already recognise, usually the name and some colour, and fix what is holding the brand back. A refresh follows the same Brand Identity Loop steps, starting from your current files.",
      },
      {
        q: "Do we get the source files for our brand?",
        a: "Yes, every one. You receive editable Figma files and exports in every format you need, stored in your own account, with no licence fees or usage limits from us.",
      },
    ],
  },
  {
    slug: "website-redesign",
    summary:
      "Glow-Up is the LogixLoops website redesign and upgrade line. We take a website or app you already have and make it look current, load fast and turn more visitors into enquiries or sales. Every change is measured before and after, so you can see what the upgrade actually changed.",
    metaTitle: "Website Redesign Services and Speed Upgrades",
    metaDescription:
      "Website redesign, speed optimisation and conversion upgrades as fixed-price Loops, measured before and after with results in plain numbers.",
    keywords: [
      "website redesign services",
      "website redesign company",
      "website makeover",
      "website speed optimization",
      "Core Web Vitals fix",
      "website revamp India",
    ],
    problems: [
      {
        title: "Your website looks out of date",
        desc: "Visitors judge a business by its website in seconds. An old design makes a good company look tired, even when the work behind it is strong.",
      },
      {
        title: "Pages take too long to load",
        desc: "Most visitors arrive on a phone, often on a patchy network. Every extra second of loading loses some of them before they see what you offer.",
      },
      {
        title: "People visit but do not get in touch",
        desc: "Traffic without enquiries usually means a confusing page, a hidden button or a form that asks too much. We find the leak and fix it.",
      },
    ],
    underTheHood: [
      "Core Web Vitals (LCP, INP, CLS) measured before and after, using field data where your traffic allows",
      "Image, font and script budgets set per page and enforced in the build",
      "Existing URLs kept or redirected one to one, so search rankings carry over",
      "Analytics events for the actions that matter: calls, forms and checkouts",
      "Accessibility checked against WCAG 2.2 AA",
    ],
    faqs: [
      {
        q: "How much does a website redesign cost?",
        a: `A full redesign with our Website Glow-Up Loop starts from ${kitPrice("website-glow-up")}. If the design is fine and only speed is the problem, the Speed Loop starts from ${kitPrice("speed")}.`,
      },
      {
        q: "Will a redesign hurt my Google rankings?",
        a: "Not if it is done carefully. We keep your existing URLs or redirect each one to its new page, carry over the titles and content that rank, and check Search Console for errors in the weeks after launch.",
      },
      {
        q: "Can you redesign a site built on WordPress, Wix or Shopify?",
        a: "Yes. We either upgrade it on the same platform or move it to a faster one, and we recommend which after seeing what the site needs to do. Moving platforms is only worth it when the current one is the reason the site is slow or hard to change.",
      },
      {
        q: "How do I know the upgrade worked?",
        a: "You get a before and after report. We measure loading speed, Core Web Vitals and the enquiry or sales rate before we touch anything, then measure the same numbers again during The Tune-Up, 30 days after launch.",
      },
    ],
  },
  {
    slug: "seo-and-ai-search",
    summary:
      "Spotlight is the LogixLoops SEO and AI search visibility line. We make your business easy to find on Google and Bing, and easy for ChatGPT, Perplexity, Gemini and Google AI Overviews to understand, trust and mention. That means technical fixes, clear content, structured data and a report in plain numbers.",
    metaTitle: "SEO and AI Search Optimisation (GEO) Services",
    metaDescription:
      "SEO setup and AI search visibility Loops that get your business found on Google and mentioned by ChatGPT, Perplexity and AI Overviews.",
    keywords: [
      "SEO agency",
      "SEO company in Jaipur",
      "AI search optimization agency",
      "generative engine optimization services",
      "GEO agency",
      "answer engine optimization",
    ],
    problems: [
      {
        title: "Nobody finds you on Google",
        desc: "If your business does not show up when people search for what you sell, they buy from whoever does. The cause is usually fixable: missing pages, slow loading or a site Google cannot read properly.",
      },
      {
        title: "AI assistants do not mention you",
        desc: "More people now ask ChatGPT or Gemini who to hire. These tools recommend businesses they can clearly identify and verify, and most small business websites give them too little to go on.",
      },
      {
        title: "You cannot tell what is working",
        desc: "Without Search Console, analytics and a few tracked questions, marketing is guesswork. We set up the measurement first, so every change after it can be judged.",
      },
    ],
    underTheHood: [
      "Technical audits covering crawlability, indexing, Core Web Vitals, canonical tags, sitemaps and robots rules",
      "JSON-LD structured data: Organization, LocalBusiness, Service, FAQPage, Product and BreadcrumbList as they apply",
      "An llms.txt file, with entity details kept consistent across your site, Google Business Profile and directories",
      "Google Search Console and Bing Webmaster Tools in your name; ChatGPT search draws on Bing's index",
      "AI visibility tracked by asking the same buyer questions in ChatGPT, Perplexity, Gemini and Claude each month",
    ],
    faqs: [
      {
        q: "What is GEO, or generative engine optimisation?",
        a: "GEO is the work of making AI assistants like ChatGPT, Perplexity and Gemini understand your business well enough to mention it in their answers. It builds on SEO and adds clear entity information, structured data, answer-first content and consistent details across the web.",
      },
      {
        q: "How do I get my business mentioned by ChatGPT?",
        a: `Make your business easy for it to identify and verify: a fast site Bing can index, a clear one-sentence description of what you do, structured data, the same name, address and phone everywhere, and pages that answer buyers' questions directly. Our AI Visibility Loop does all of this, from ${kitPrice("ai-visibility")}.`,
      },
      {
        q: "How long does SEO take to show results?",
        a: "Technical fixes can show within weeks, but rankings for competitive searches usually take three to six months. AI assistants that search live can pick up changes within a few weeks of indexing; others update more slowly. We report what moved, so you are never guessing.",
      },
      {
        q: "Can you guarantee the first position on Google?",
        a: "No, and be wary of anyone who does. Nobody controls Google's or ChatGPT's results. We guarantee the work: what we will fix, build and publish, and an honest report on what changed.",
      },
    ],
  },
  {
    slug: "ai-automation",
    summary:
      "Autopilot is the LogixLoops AI and automation line. We build WhatsApp AI agents, website assistants trained on your own documents, and automations that move data between your tools, so routine questions and admin get handled without someone doing them by hand. Every AI system ships with limits, logs and a human handover.",
    metaTitle: "AI Automation Agency: WhatsApp AI and Chatbots",
    metaDescription:
      "WhatsApp AI agents, website AI chatbots trained on your data, and workflow automation, as fixed-scope Loops with published starting prices.",
    keywords: [
      "AI automation agency",
      "WhatsApp chatbot development",
      "AI chatbot development company",
      "AI agent development",
      "business process automation",
      "AI automation agency India",
    ],
    problems: [
      {
        title: "The same questions arrive all day",
        desc: "Prices, timings, order status, availability. An AI agent answers these in seconds on WhatsApp or your website, day and night, and passes anything unusual to a person.",
      },
      {
        title: "Staff copy data between tools",
        desc: "Leads typed from forms into a CRM, invoices rebuilt from orders, reports pasted together every Monday. Automations do this instantly and without typos.",
      },
      {
        title: "You tried an AI tool and it made things up",
        desc: "Generic chatbots guess. Ours answer from your own documents, say when they do not know, and are tested against real questions before launch.",
      },
    ],
    underTheHood: [
      "WhatsApp Business Platform (Cloud API) through Meta, with templates approved in your own business account",
      "Retrieval-augmented generation over your documents, with answers cited back to the source",
      "An evaluation set of real customer questions run before launch and after every change",
      "Models chosen by task and cost from Anthropic, OpenAI or Google, with a cheaper model for simple routing",
      "Automations in n8n, Make or custom Python, with retries, alerts and a log of every run",
      "Personal data handled under India's DPDP Act and GDPR where they apply",
    ],
    faqs: [
      {
        q: "How much does a WhatsApp AI agent cost?",
        a: `Our WhatsApp AI Loop starts from ${kitPrice("whatsapp-ai")} to set up. Meta also charges for some business messages, billed to your own WhatsApp Business account, so you always see that cost directly.`,
      },
      {
        q: "Will an AI chatbot give my customers wrong answers?",
        a: "It can, which is why we design for it. Our assistants answer only from your approved documents, say when they are unsure, hand the chat to a person on request, and are tested against a set of real questions before they go live.",
      },
      {
        q: "Which tasks in my business can be automated?",
        a: "Anything repetitive that follows the same rules each time. Common examples are sending leads to a CRM, creating invoices from orders, booking reminders, stock alerts and weekly reports. If a person can write the steps down, it can usually be automated.",
      },
      {
        q: "Do we need to change the software we already use?",
        a: "Usually not. Automations connect the tools you already have, such as Google Sheets, Zoho, HubSpot, Shopify, Razorpay or Stripe, as long as they offer an API or an export. We check every tool on the first call.",
      },
    ],
  },
  {
    slug: "maintenance-and-support",
    summary:
      "Pit Crew is the LogixLoops maintenance and support line. Monthly plans keep your website or app updated, backed up, secure and fast, with time each month for changes and improvements. Plans start small for a business website and scale up to a dedicated team for products that change every week.",
    metaTitle: "Website Maintenance Plans and Support",
    metaDescription:
      "Monthly website and app maintenance plans: updates, backups, security, speed checks and changes each month, up to a dedicated team.",
    keywords: [
      "website maintenance services",
      "website maintenance plans",
      "app maintenance and support",
      "dedicated development team",
      "website support retainer",
      "website maintenance cost India",
    ],
    problems: [
      {
        title: "Nobody looks after the site after launch",
        desc: "Plugins go out of date, certificates expire and small bugs pile up. Without someone responsible, a good website slowly becomes a slow, risky one.",
      },
      {
        title: "Small changes take weeks",
        desc: "A new page, a price update or a fixed typo should not need a new project. A plan gives you hours every month and a person who already knows your setup.",
      },
      {
        title: "Your product needs a team, not a vendor",
        desc: "When a product changes every week, a reserved team that stays with it beats a new quote for every feature.",
      },
    ],
    underTheHood: [
      "Daily backups with a tested restore, kept for 30 days",
      "Dependency and security updates applied monthly, with critical fixes ahead of all other work",
      "Uptime monitoring with alerts to us and to you",
      "A monthly report covering changes made, speed scores, uptime and recommendations",
      "Squad plans run in two-week sprints with a demo at the end of each",
    ],
    faqs: [
      {
        q: "How much does website maintenance cost per month?",
        a: `Pit Crew plans start from ${planPrice("essentials")} for Essentials, ${planPrice("growth")} for Growth and ${planPrice("squad")} for a dedicated Squad. Each plan lists exactly what is included.`,
      },
      {
        q: "Can we cancel a maintenance plan?",
        a: "Yes. Essentials and Growth run month to month and stop with 30 days' notice. Squad has a three-month minimum, then runs month to month. Either way, you leave with every file, account and password.",
      },
      {
        q: "Do you maintain websites and apps you did not build?",
        a: "Yes, after a short onboarding check. We review the code, hosting and access first, fix anything risky, and then the plan starts as normal. If something needs more than a plan covers, we tell you before doing it.",
      },
      {
        q: "What is the difference between the Essentials and Growth plans?",
        a: "Essentials keeps a site safe and working: updates, backups, monitoring and a few small changes. Growth adds time every month to improve it, such as new pages, speed work and search tracking.",
      },
    ],
  },
];

/* Index fields first, details after, in index order. */
export const LINES = LINE_INDEX.map((entry) => ({
  ...entry,
  ...DETAILS.find((detail) => detail.slug === entry.slug),
}));

export const getAllLines = () => LINES;
export const getLineBySlug = (slug) => LINES.find((line) => line.slug === slug) || null;
