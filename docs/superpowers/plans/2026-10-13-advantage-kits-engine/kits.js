/**
 * Advantage Kits: the wave 1 catalogue.
 *
 * One record per kit, and one kit per URL (/kits/<slug>). Every price on the
 * site is read from here, so a price change is a one-line edit and the page,
 * the card, the schema and the FAQ answers that quote it all move together.
 *
 * Copy rules (docs/brand-voice-and-search.md, enforced by test/content.test.mjs):
 *   - `summary` is the answer-first lead: 40 to 60 words, plain English.
 *   - `metaTitle` fits after the "LogixLoops | " template (47 chars max).
 *   - `metaDescription` leaves room for " From <price>." to be appended.
 *   - The last step is always The Loop.
 *   - `underTheHood` is the only place technical vocabulary is expected.
 *
 * Prices are proposals awaiting the owner's sign-off (spec section 11).
 */

/** The 30-day after-launch period every kit ends with. Kits may reword it. */
const LOOP = {
  title: "The Loop",
  desc: "For 30 days after launch we watch real usage, fix what turns up and make one round of improvements based on the data. Then we hand everything over with a recorded walkthrough.",
};

export const KITS = [
  /* ─── Engine: Web & App Development ─── */
  {
    slug: "business-website",
    line: "web-and-app-development",
    name: "Business Website Kit",
    promise: "a fast, search-ready website for a growing business",
    summary:
      "The Business Website Kit is a custom website of up to eight pages for a growing business, designed and built in three to four weeks. It loads fast on an ordinary phone, is ready for Google and AI search from launch, and you can edit the content yourself. Domain, hosting and code are in your name.",
    price: { usd: 1500, inr: 60000 },
    timeline: "3–4 weeks",
    keyword: "business website development package",
    metaTitle: "Business Website Design and Development Package",
    metaDescription:
      "A custom website of up to eight pages, built in three to four weeks. Fast, ready for Google and AI search, and yours from day one.",
    includes: [
      "Custom design for up to 8 pages, on desktop and mobile",
      "A content editor so you can change text and images yourself",
      "Contact form, WhatsApp button and map where useful",
      "SEO setup: titles, descriptions, sitemap and structured data",
      "Google Analytics, Search Console and Bing Webmaster Tools in your name",
      "Speed checked on a mid-range phone before launch",
      "Domain, hosting and code set up in your own accounts",
    ],
    fitFor: [
      "New businesses that need a proper website, not a template",
      "Service businesses: clinics, studios, consultants, agencies",
      "Companies whose current site no longer represents them",
    ],
    notFor: [
      "Selling products online with a cart and payments: see the Online Store Kit",
      "Web apps with user accounts and dashboards: see the MVP Kit",
    ],
    steps: [
      { title: "Kick-off call", desc: "We agree the pages, the goal of the site and what success looks like, and collect your logo, photos and content." },
      { title: "Design", desc: "You see the home page design first, then the inner pages. Two rounds of changes are included." },
      { title: "Build", desc: "We build the site, connect the forms and analytics, and load your content. You review it on a private preview link." },
      { title: "Launch", desc: "We connect your domain, run speed and SEO checks, submit the sitemap to Google and Bing, and go live." },
      LOOP,
    ],
    addOns: [
      { name: "Extra page", price: { usd: 120, inr: 5000 } },
      { name: "Copywriting for every page", price: { usd: 400, inr: 15000 } },
      { name: "Second language", price: { usd: 500, inr: 20000 } },
    ],
    underTheHood: [
      "Next.js with server rendering, deployed on Vercel or your own cloud account",
      "A headless CMS such as Sanity, or MDX files if your team prefers Git",
      "Targets of LCP under 2.5 seconds and CLS under 0.1 on a mid-range Android phone",
      "JSON-LD structured data for your business type, plus an llms.txt file",
      "Accessibility checked against WCAG 2.2 AA",
    ],
    demo: "ViewportDemo",
    work: ["sire-media", "bouldspace-architecture", "adinath-finserv"],
    faqs: [
      {
        q: "Can I update the website myself after launch?",
        a: "Yes. You get a simple editor for text, images and blog posts, plus a short recorded walkthrough. Bigger changes, like new page layouts, can come through a Pit Crew plan or a one-off request.",
      },
      {
        q: "Do you write the content for the website?",
        a: "You provide the content by default, and we shape it to fit the design. If you would rather we write it, the copywriting add-on covers every page, written for both readers and search engines.",
      },
      {
        q: "Why not just use Wix or a WordPress theme?",
        a: "For some businesses that is the right call, and we will say so. A custom build makes sense when speed, search ranking and a distinctive look matter, because templates carry code you do not need and look like thousands of other sites.",
      },
    ],
  },
  {
    slug: "online-store",
    line: "web-and-app-development",
    name: "Online Store Kit",
    promise: "an online store that is quick to browse and easy to buy from",
    summary:
      "The Online Store Kit is an ecommerce website built on Shopify or a custom stack, ready to take payments in four to six weeks. It includes product pages, cart, checkout with UPI, cards and wallets, order emails and inventory, and it is set up for Google Shopping and search from day one.",
    price: { usd: 3000, inr: 120000 },
    timeline: "4–6 weeks",
    keyword: "ecommerce website development cost",
    metaTitle: "Ecommerce Website Development: Online Store Kit",
    metaDescription:
      "A Shopify or custom online store with payments, inventory and order emails, live in four to six weeks and ready for Google Shopping.",
    includes: [
      "Store design for home, collection, product, cart and checkout pages",
      "Up to 50 products loaded, with variants and stock tracking",
      "Payments through Razorpay or Stripe: UPI, cards and wallets",
      "Shipping and tax rules for the markets you sell to",
      "Order, shipping and abandoned-cart emails",
      "Google Shopping and Meta catalogue feeds",
      "SEO, analytics and conversion tracking set up in your name",
    ],
    fitFor: [
      "D2C brands launching, or moving off a marketplace",
      "Shops that want their own store alongside Amazon or Flipkart",
      "Brands whose current store is slow or hard to manage",
    ],
    notFor: [
      "Marketplaces with many sellers, which need a custom build",
      "Stores with thousands of products or complex B2B pricing, which need a scoped quote",
    ],
    steps: [
      { title: "Kick-off call", desc: "We choose Shopify or a custom stack together, list your products, payment methods and shipping rules, and agree the launch date." },
      { title: "Design", desc: "Store pages designed around your brand and your best-selling products, with two rounds of changes." },
      { title: "Build and load", desc: "We build the store, load up to 50 products, connect payments and shipping, and test real orders end to end." },
      { title: "Launch", desc: "Your domain is connected, feeds are submitted to Google and Meta, analytics is checked, and the store opens." },
      LOOP,
    ],
    addOns: [
      { name: "Another 50 products loaded", price: { usd: 150, inr: 6000 } },
      { name: "Product photography direction", price: { usd: 300, inr: 12000 } },
      { name: "Subscriptions or bundles", price: { usd: 500, inr: 20000 } },
    ],
    underTheHood: [
      "Shopify with a custom theme, or a headless Next.js storefront on Shopify, Medusa or a custom backend",
      "Payment webhooks verified, and orders reconciled against the gateway",
      "Product structured data for rich results and Google Shopping",
      "An image pipeline with modern formats and responsive sizes, so product pages stay fast",
    ],
    demo: null,
    work: ["building-bites"],
    faqs: [
      {
        q: "Should my online store use Shopify or a custom build?",
        a: "Shopify suits most new stores: it is quick to launch, reliable and easy to manage. A custom build makes sense when you need unusual pricing, subscriptions, deep integrations or full control of the checkout. We recommend one on the kick-off call and explain why.",
      },
      {
        q: "Which payment methods can my store accept?",
        a: "UPI, cards, net banking and wallets through Razorpay in India, and cards, Apple Pay and Google Pay through Stripe for international customers. Cash on delivery can be added for Indian orders.",
      },
      {
        q: "Are Shopify and payment gateway fees included in the price?",
        a: "No. Platform subscriptions, payment gateway fees and app charges are billed by those companies directly to your account, so you see every cost and own every account.",
      },
    ],
  },
  {
    slug: "mvp",
    line: "web-and-app-development",
    name: "MVP Kit",
    promise: "the first working version of your product, in front of real users",
    summary:
      "The MVP Kit turns a startup idea into a working web product that real users can sign up for and pay for, in six to eight weeks. You get user accounts, the core feature, payments, an admin panel and analytics, built on a stack that can grow with the business instead of being thrown away.",
    price: { usd: 8000, inr: 400000 },
    timeline: "6–8 weeks",
    keyword: "MVP development for startups",
    metaTitle: "MVP Development for Startups in 6 to 8 Weeks",
    metaDescription:
      "A working web product with sign-up, payments, an admin panel and analytics in six to eight weeks, on a stack built to grow.",
    includes: [
      "A one-week product workshop to cut the idea down to what matters",
      "A clickable prototype before any code is written",
      "User sign-up and login, including Google sign-in",
      "The core feature that makes your product worth using",
      "Payments or subscriptions through Stripe or Razorpay",
      "An admin panel to manage users and data",
      "Product analytics, so you can see what users actually do",
    ],
    fitFor: [
      "Founders who need to test an idea with paying users",
      "Startups preparing for a pre-seed or seed round",
      "Businesses turning an internal process into a product",
    ],
    notFor: [
      "Ideas still at the napkin stage: book a call first and we will help shape it",
      "Products that must be native mobile apps from day one: see the Mobile App Kit",
    ],
    steps: [
      { title: "Product workshop", desc: "One week to agree who the product is for, the one job it must do well, and what can wait for version two." },
      { title: "Prototype", desc: "A clickable prototype you can put in front of users before we write code, while changes are still cheap." },
      { title: "Build in sprints", desc: "Two-week sprints with a working demo at the end of each, so you see real progress, not status reports." },
      { title: "Launch", desc: "Production setup, error tracking, analytics and a launch checklist, then the product goes live to your first users." },
      LOOP,
    ],
    addOns: [
      { name: "Marketing website for the product", price: { usd: 1200, inr: 50000 } },
      { name: "iOS and Android app wrapper", price: { usd: 3000, inr: 150000 } },
      { name: "An AI feature using your data", price: { usd: 2000, inr: 90000 } },
    ],
    underTheHood: [
      "Next.js and TypeScript front to back, with PostgreSQL and a typed ORM",
      "Authentication with email, Google and magic links, with roles from day one",
      "Stripe or Razorpay billing with webhooks and an audit trail",
      "Error tracking, logs and uptime monitoring before the first user signs up",
      "Architecture notes written down, so the next engineer can pick it up",
    ],
    demo: null,
    work: ["clubin-nightlife"],
    faqs: [
      {
        q: "What exactly is an MVP?",
        a: "A minimum viable product is the smallest version of your idea that real users can use and pay for. It is not a demo or a mock-up; it is a real product with fewer features, built to learn what customers want before you spend on everything else.",
      },
      {
        q: "Can the MVP grow into the full product?",
        a: "Yes, and that is the point of how we build it. The MVP Kit uses the same stack and practices we would use for a mature product, so version two builds on it instead of starting again.",
      },
      {
        q: "Will you sign an NDA before I share my idea?",
        a: "Yes, happily, before the first detailed call. The code, designs and intellectual property belong to you from the start, as written in the contract.",
      },
    ],
  },
  {
    slug: "mobile-app",
    line: "web-and-app-development",
    name: "Mobile App Kit",
    promise: "one app for iPhone and Android, published in both stores",
    summary:
      "The Mobile App Kit builds one app for iPhone and Android from a single codebase and publishes it in the App Store and Google Play in eight to twelve weeks. It covers design, sign-in, the core screens, push notifications, offline use and an admin panel, all published under your own developer accounts.",
    price: { usd: 10000, inr: 500000 },
    timeline: "8–12 weeks",
    keyword: "mobile app development cost",
    metaTitle: "Mobile App Development for iOS and Android",
    metaDescription:
      "One app for iPhone and Android, designed, built and published in both stores in eight to twelve weeks, in your own accounts.",
    includes: [
      "App design for up to 15 screens, following iOS and Android conventions",
      "Sign-in with phone OTP, email, Google or Apple",
      "Push notifications and in-app messages",
      "Works offline and syncs when the connection returns",
      "Payments or in-app purchases where your model needs them",
      "An admin panel to manage users and content",
      "App Store and Google Play listings, screenshots and submission",
    ],
    fitFor: [
      "Businesses whose customers come back every week",
      "Startups whose product lives on the phone: bookings, delivery, fitness, fintech",
      "Companies replacing a slow or outdated app",
    ],
    notFor: [
      "Businesses a website would serve just as well: we will tell you if that is you",
      "Games and heavy 3D, which need a specialist studio",
    ],
    steps: [
      { title: "Kick-off and flows", desc: "We map every screen and the paths between them, agree the launch features, and set up your developer accounts." },
      { title: "Design", desc: "Screen designs with a clickable prototype you can try on your own phone. Two rounds of changes." },
      { title: "Build in sprints", desc: "Two-week sprints with a test build on your phone at the end of each one." },
      { title: "Store launch", desc: "We prepare the listings and screenshots, handle App Store and Google Play review, and release the app." },
      LOOP,
    ],
    addOns: [
      { name: "Another 5 screens", price: { usd: 1500, inr: 70000 } },
      { name: "Website for the app", price: { usd: 1200, inr: 50000 } },
      { name: "Second language", price: { usd: 800, inr: 35000 } },
    ],
    underTheHood: [
      "React Native with Expo and TypeScript, with Swift or Kotlin modules where the hardware needs them",
      "Offline-first data with a sync queue, so actions are never lost on a bad network",
      "Over-the-air updates for quick fixes without waiting for store review",
      "Crash reporting and analytics from the first test build",
      "A backend in Node.js or Python with PostgreSQL, or Supabase or Firebase when that fits",
    ],
    demo: "PhoneScrollDemo",
    work: [],
    faqs: [
      {
        q: "Should I build a native app or a cross-platform app?",
        a: "For most businesses, cross-platform. One React Native codebase serves both iPhone and Android, which roughly halves the work, and it feels native to users. We write fully native code only when the app depends on demanding hardware or graphics.",
      },
      {
        q: "Who owns the app in the App Store and Google Play?",
        a: "You do. The app is published under your own Apple and Google developer accounts. Apple charges $99 a year and Google charges $25 once, paid directly to them.",
      },
      {
        q: "What happens if Apple or Google rejects the app?",
        a: "We handle it. Rejections are usually about a missing policy page or an unclear permission request, and fixing and resubmitting is part of the kit.",
      },
    ],
  },

  /* ─── Spark: Branding & Identity ─── */
  {
    slug: "brand-identity",
    line: "branding",
    name: "Brand Identity Kit",
    promise: "logo, colours, type and brand guidelines for a new business",
    summary:
      "The Brand Identity Kit gives a new or growing business a complete visual identity in two to three weeks: logo, colour palette, typefaces and a brand guidelines document. You get every file in every format for print, web and social, plus editable sources, so anyone you work with can use the brand correctly.",
    price: { usd: 1000, inr: 45000 },
    timeline: "2–3 weeks",
    keyword: "brand identity design package",
    metaTitle: "Brand Identity Package: Logo and Guidelines",
    metaDescription:
      "Logo, colours, typefaces and a brand guidelines document in two to three weeks, with every file and editable source yours.",
    includes: [
      "A short brand discovery workshop",
      "Three logo directions, one refined into your final logo",
      "Logo versions for light, dark and small sizes, plus an icon",
      "A colour palette and typefaces chosen for print and screen",
      "A brand guidelines document of 10 to 15 pages",
      "Business card and letterhead designs",
      "Every file in SVG, PNG and PDF, with editable Figma sources",
    ],
    fitFor: [
      "New businesses that need to look established from day one",
      "Growing companies whose logo was made in a hurry",
      "Founders preparing to raise money or pitch large clients",
    ],
    notFor: [
      "Naming a company from scratch: ask us about it on the call",
      "Full packaging design, which is scoped separately",
    ],
    steps: [
      { title: "Discovery workshop", desc: "A 60-minute session on who you serve, what you stand for and the brands you admire or want to avoid looking like." },
      { title: "Three directions", desc: "Three distinct logo and colour directions, each shown on real items like a website header, a shop sign and a social post." },
      { title: "Refine", desc: "You pick one direction and we refine it over two rounds of changes until it is right." },
      { title: "Guidelines and files", desc: "We write the brand guidelines and export every file you will need, organised and named so they are easy to find." },
      {
        title: "The Loop",
        desc: "For 30 days after handover we check how the brand is being used, review your first posts, print proofs or signage, and adjust any file that does not work in practice.",
      },
    ],
    addOns: [
      { name: "Social media kit: templates and profile assets", price: { usd: 400, inr: 18000 } },
      { name: "Brand voice and messaging guide", price: { usd: 350, inr: 15000 } },
      { name: "A fourth logo direction", price: { usd: 250, inr: 10000 } },
    ],
    underTheHood: [
      "Logos drawn as clean vectors and checked at 16 pixels for favicons and app icons",
      "Colours specified in HEX, RGB and CMYK, and Pantone where print needs it",
      "Text and background pairs checked for WCAG AA contrast",
      "Design tokens exported as JSON and CSS variables for your developers",
      "Typeface licences checked for web, app and print use",
    ],
    demo: "TokensDemo",
    work: [],
    faqs: [
      {
        q: "How many logo options will I see?",
        a: "Three distinct directions, each shown in real use rather than on a blank page. You choose one, and we refine it through two rounds of changes. If none of the three is right, a fourth direction is available as an add-on.",
      },
      {
        q: "Will I own the logo and its copyright?",
        a: "Yes. Copyright in the final logo and identity transfers to you on final payment, in writing. You can trademark it, change it or use it anywhere without asking us.",
      },
      {
        q: "Can you design the brand if we already have a name and some colours?",
        a: "Yes. We start from what you have, keep what is working and build the rest of the system around it. Many clients come to us with a name and a rough logo.",
      },
    ],
  },
  {
    slug: "brand-launch",
    line: "branding",
    name: "Brand Launch Kit",
    promise: "brand identity, website, social kit and Google profile, launched together",
    summary:
      "The Brand Launch Kit takes a new business from name to open for business in five to six weeks. It combines the Brand Identity Kit with a business website, a social media kit and a Google Business Profile, all designed together by one team, so everything looks consistent from the first day.",
    price: { usd: 3000, inr: 130000 },
    timeline: "5–6 weeks",
    keyword: "branding and website package for new business",
    metaTitle: "Branding and Website Package for New Businesses",
    metaDescription:
      "Identity, website, social kit and Google Business Profile, designed together by one team and launched in five to six weeks.",
    includes: [
      "Everything in the Brand Identity Kit",
      "Everything in the Business Website Kit",
      "A social media kit: profile images, covers and 10 post templates",
      "A Google Business Profile created and filled in, with photos and categories",
      "A launch checklist for email, WhatsApp Business and directories",
    ],
    fitFor: [
      "New businesses opening in the next two months",
      "Founders who want one team instead of a designer, a developer and a marketer",
      "Businesses relaunching under a new name",
    ],
    notFor: [
      "Businesses happy with their current brand: start with the Business Website Kit",
      "Online stores: pair the Brand Identity Kit with the Online Store Kit",
    ],
    steps: [
      { title: "Discovery", desc: "One workshop covers the brand, the website goals and your launch date, so every piece is planned together." },
      { title: "Identity", desc: "Logo directions, refinement and guidelines, exactly as in the Brand Identity Kit." },
      { title: "Website and social", desc: "The website and social kit are designed in the new identity and built while you review." },
      { title: "Launch", desc: "Website live, Google Business Profile submitted for verification, social profiles updated and your launch checklist done." },
      LOOP,
    ],
    addOns: [
      { name: "Launch photography direction", price: { usd: 400, inr: 15000 } },
      { name: "Brand voice and messaging guide", price: { usd: 350, inr: 15000 } },
      { name: "An online store instead of a website", price: { usd: 1800, inr: 75000 } },
    ],
    underTheHood: [
      "The website reads the brand's design tokens directly, so colours and type match exactly",
      "Structured data links the website, Google Business Profile and social profiles as one business",
      "Name, address and phone written identically everywhere, which local search depends on",
    ],
    demo: null,
    work: [],
    faqs: [
      {
        q: "Why buy the brand and the website together instead of separately?",
        a: "Because they are designed as one system. The same team builds the identity and the website, so nothing gets lost between a designer and a developer, and the kit costs less than buying each part on its own.",
      },
      {
        q: "How long does a Google Business Profile take to verify?",
        a: "Usually a few days, sometimes a few weeks. Google chooses the method, which can be a video, a phone call or a postcard. We set everything up and guide you through the one step only the owner can do.",
      },
      {
        q: "What do I need to have ready before we start?",
        a: "Your business name, a rough idea of who your customers are, and someone who can make decisions quickly. Photos and text help, but we can start with very little and tell you exactly what is missing.",
      },
    ],
  },

  /* ─── Glow-Up: Website Redesign & Upgrades ─── */
  {
    slug: "website-glow-up",
    line: "website-redesign",
    name: "Website Glow-Up Kit",
    promise: "a redesign that makes your current website look current and sell more",
    summary:
      "The Website Glow-Up Kit redesigns your existing website in three to five weeks without losing the search rankings it has earned. We measure speed and enquiries first, redesign the pages that matter most, rebuild them to load fast, and measure again after launch, so you see exactly what the glow-up changed.",
    price: { usd: 2000, inr: 80000 },
    timeline: "3–5 weeks",
    keyword: "website redesign cost",
    metaTitle: "Website Redesign Package: Website Glow-Up Kit",
    metaDescription:
      "Redesign your website in three to five weeks, keep your rankings, and see before and after numbers for speed and enquiries.",
    includes: [
      "An audit of your current site: speed, search, design and enquiry rate",
      "Redesign of up to 10 pages on desktop and mobile",
      "A rebuild for speed, or a careful upgrade on your current platform",
      "Every old URL kept or redirected, so rankings carry over",
      "Clear calls to action and simpler forms",
      "Analytics events for calls, forms and purchases",
      "A before and after report",
    ],
    fitFor: [
      "Websites more than three or four years old",
      "Sites that look fine but bring in few enquiries",
      "Businesses that have changed while their website has not",
    ],
    notFor: [
      "Sites with almost no traffic yet: start with the SEO Foundation Kit",
      "Brand-new businesses: see the Business Website Kit",
    ],
    steps: [
      { title: "Measure", desc: "We record current speed, search traffic, rankings and enquiry rate, so there is a baseline to compare against." },
      { title: "Redesign", desc: "New designs for the pages that matter most, keeping what already works. Two rounds of changes." },
      { title: "Rebuild", desc: "We build the new pages for speed, carry over the content and set up redirects for every changed URL." },
      { title: "Switch over", desc: "The new site goes live, redirects are tested, and Search Console is checked for errors in the first days." },
      {
        title: "The Loop",
        desc: "For 30 days we watch rankings, speed and enquiries, fix anything that slipped, and send you the before and after report.",
      },
    ],
    addOns: [
      { name: "Another 5 pages", price: { usd: 500, inr: 20000 } },
      { name: "Copy rewrite for the redesigned pages", price: { usd: 400, inr: 15000 } },
      { name: "Move from WordPress or Wix to a faster stack", price: { usd: 800, inr: 30000 } },
    ],
    underTheHood: [
      "A baseline from Search Console, analytics and Chrome UX Report field data where traffic allows",
      "A redirect map for every changed URL, tested before and after switch-over",
      "Images converted to modern formats with responsive sizes",
      "Third-party scripts audited, then deferred or removed",
      "Accessibility checked against WCAG 2.2 AA",
    ],
    demo: "ViewportDemo",
    work: [],
    faqs: [
      {
        q: "Do we have to rebuild the whole website?",
        a: "No. If the platform is sound, we redesign and upgrade it where it is. We only recommend a rebuild when the current setup is the reason the site is slow or hard to change, and we explain the trade-off before you decide.",
      },
      {
        q: "Will the website go offline during the redesign?",
        a: "No. We build the new version on a private preview link while your current site keeps running, then switch over in minutes once you approve it.",
      },
      {
        q: "What does the before and after report show?",
        a: "Page speed and Core Web Vitals, search clicks and rankings for your main pages, and the rate at which visitors call, submit a form or buy. Where traffic is low, we say which numbers are too small to read much into.",
      },
    ],
  },
  {
    slug: "speed",
    line: "website-redesign",
    name: "Speed Kit",
    promise: "a faster website, with the before and after numbers to prove it",
    summary:
      "The Speed Kit makes a slow website fast in one to two weeks, without a redesign. We find what is slowing your pages down, fix images, scripts, fonts and hosting, and aim to pass Google's Core Web Vitals on mobile. You get a before and after report showing the measured difference on real phones.",
    price: { usd: 600, inr: 25000 },
    timeline: "1–2 weeks",
    keyword: "website speed optimization service",
    metaTitle: "Website Speed Optimisation: Core Web Vitals",
    metaDescription:
      "A slow website made fast in one to two weeks without a redesign, with a before and after report from real phones.",
    includes: [
      "A speed audit of your 10 most visited pages",
      "Image compression and modern image formats",
      "Script, font and plugin clean-up",
      "Caching and CDN setup",
      "A hosting review, with a move if hosting is the bottleneck",
      "Core Web Vitals checked on mobile and desktop",
      "A before and after report",
    ],
    fitFor: [
      "Sites that take more than three seconds to load on a phone",
      "Online stores where slow pages are costing sales",
      "Sites failing Core Web Vitals in Search Console",
    ],
    notFor: [
      "Sites that also need a new design: the Website Glow-Up Kit includes speed work",
      "Web apps with slow databases or APIs, which need an engineering audit",
    ],
    steps: [
      { title: "Measure", desc: "We record lab and real-user speed for your top pages and find the biggest causes of delay." },
      { title: "Fix", desc: "Images, scripts, fonts, caching and hosting are fixed in order of impact, tested on a staging copy first." },
      { title: "Verify", desc: "We measure the same pages on the same devices and confirm nothing looks or works differently." },
      {
        title: "The Loop",
        desc: "Google's field data takes about 28 days to update, so we check it again 30 days after the fixes and send the final report.",
      },
    ],
    addOns: [
      { name: "Another 10 pages audited", price: { usd: 200, inr: 8000 } },
      { name: "Hosting move", price: { usd: 250, inr: 10000 } },
    ],
    underTheHood: [
      "Lab data from Lighthouse and WebPageTest, field data from the Chrome UX Report where traffic allows",
      "LCP, INP and CLS treated separately, because each has different causes",
      "Third-party tags loaded after interaction, or removed if unused",
      "Fonts subset and preloaded; images served as AVIF or WebP at the right sizes",
    ],
    demo: "ViewportDemo",
    work: [],
    faqs: [
      {
        q: "Why does website speed matter for my business?",
        a: "Slow pages lose visitors before they see what you offer, especially on phones. Speed is also part of how Google ranks pages, through Core Web Vitals, so a faster site helps both sales and search.",
      },
      {
        q: "Can you guarantee a perfect PageSpeed score?",
        a: "No, and a perfect score is not the goal. We aim to pass Core Web Vitals on mobile, which is what Google measures from real visitors. Some sites carry scripts the business genuinely needs, and we show you the cost of each one.",
      },
      {
        q: "Does the Speed Kit work for WordPress and Shopify sites?",
        a: "Yes. Most of the fixes apply to any platform: images, scripts, fonts, caching and hosting. Platform-specific work, like replacing a heavy WordPress plugin, is included where it is the cause.",
      },
    ],
  },

  /* ─── Spotlight: SEO & AI Search Visibility ─── */
  {
    slug: "seo-foundation",
    line: "seo-and-ai-search",
    name: "SEO Foundation Kit",
    promise: "the technical and on-page SEO setup every website should start with",
    summary:
      "The SEO Foundation Kit gives your website the setup it needs to rank, in two to three weeks. We fix technical problems, research the searches your customers use, write page titles and descriptions, add structured data, and set up Google Search Console and Bing Webmaster Tools in your name with a clear report.",
    price: { usd: 800, inr: 35000 },
    timeline: "2–3 weeks",
    keyword: "SEO setup package",
    metaTitle: "SEO Setup Package: Technical and On-Page SEO",
    metaDescription:
      "Technical fixes, keyword research, titles, structured data, and Search Console and Bing setup, done in two to three weeks.",
    includes: [
      "A technical SEO audit and fixes: indexing, speed, broken links, redirects",
      "Keyword research: the 30 to 50 searches that matter for your business",
      "Titles, descriptions and headings written for your key pages",
      "Structured data for your business, services and FAQs",
      "XML sitemap and robots rules checked",
      "Google Search Console and Bing Webmaster Tools in your name",
      "A plain-language report with the next steps in order",
    ],
    fitFor: [
      "New websites that have never had SEO work",
      "Sites that get little traffic from Google",
      "Businesses about to spend on content or ads that want the basics right first",
    ],
    notFor: [
      "Sites that need a redesign first: start with the Website Glow-Up Kit",
      "Ongoing monthly content and reporting: pair this kit with a Pit Crew Growth plan",
    ],
    steps: [
      { title: "Audit", desc: "A crawl of the whole site plus your Search Console data, if you have it, to find what is holding rankings back." },
      { title: "Research", desc: "We find the searches your customers actually use and map each one to the page that should rank for it." },
      { title: "Fix and write", desc: "Technical fixes, new titles and descriptions, headings and structured data, applied directly or handed to your developer." },
      { title: "Submit", desc: "Sitemaps submitted to Google and Bing, and key pages requested for indexing." },
      {
        title: "The Loop",
        desc: "For 30 days we watch indexing and early ranking movement, fix anything Google reports, and send the report with what to do next.",
      },
    ],
    addOns: [
      { name: "Up to 4 new service or location pages written", price: { usd: 400, inr: 16000 } },
      { name: "Competitor gap report", price: { usd: 250, inr: 10000 } },
    ],
    underTheHood: [
      "Full crawl with Screaming Frog or Sitebulb, checked against Search Console indexing data",
      "Canonical tags, hreflang where you serve several countries, and pagination handled",
      "JSON-LD validated in Google's Rich Results Test",
      "Internal links mapped so every important page is reachable within three clicks",
    ],
    demo: null,
    work: [],
    faqs: [
      {
        q: "What is the difference between technical SEO and content SEO?",
        a: "Technical SEO makes sure search engines can find, load and understand your pages. Content SEO makes sure those pages answer what people search for. The SEO Foundation Kit covers the technical side and the on-page basics, so later content has something solid to build on.",
      },
      {
        q: "Do I need SEO if I already run Google Ads?",
        a: "Usually, yes. Ads stop the moment you stop paying, while organic rankings keep bringing visitors. SEO work also improves the landing pages your ads send people to, which can lower what each click costs.",
      },
      {
        q: "Will you need access to my website and Google accounts?",
        a: "Yes, but you stay the owner. You add us as a user to Search Console, analytics and your website, and remove us whenever you like. We never ask for your passwords.",
      },
    ],
  },
  {
    slug: "ai-visibility",
    line: "seo-and-ai-search",
    name: "AI Visibility Kit",
    promise: "help ChatGPT, Perplexity, Gemini and AI Overviews understand and mention your business",
    summary:
      "The AI Visibility Kit makes your business easier for ChatGPT, Perplexity, Gemini and Google AI Overviews to find, understand and mention. In two to three weeks we test what AI assistants say about you today, fix your entity information, structured data and key pages, and set up monthly tracking of the answers.",
    price: { usd: 1000, inr: 45000 },
    timeline: "2–3 weeks",
    keyword: "AI search optimization services",
    metaTitle: "AI Search Optimisation (GEO): AI Visibility Kit",
    metaDescription:
      "See what ChatGPT, Perplexity and Gemini say about your business, then fix your site so AI assistants understand and mention it.",
    includes: [
      "An AI answer audit: 20 buyer questions asked in ChatGPT, Perplexity, Gemini and Claude",
      "A one-sentence description of your business, used the same way everywhere",
      "Structured data that ties your website, profiles and listings together",
      "An llms.txt file that summarises your business for AI systems",
      "Rewrites of up to 5 key pages so they answer buyer questions directly",
      "Bing Webmaster Tools setup, since ChatGPT search draws on Bing's index",
      "A tracking sheet and method to rerun the audit every month",
    ],
    fitFor: [
      "Businesses whose customers ask AI assistants for recommendations",
      "Companies that rank on Google but are missing from AI answers",
      "Brands that AI tools confuse with a similarly named company",
    ],
    notFor: [
      "Sites with basic technical SEO problems: start with the SEO Foundation Kit, or take both",
      "Anyone who wants a guaranteed mention: no one can promise what an AI model will say",
    ],
    steps: [
      { title: "Ask the assistants", desc: "We put 20 real buyer questions to four AI assistants and record whether you appear, how you are described and who appears instead." },
      { title: "Fix the facts", desc: "We write your one-sentence description and make your name, address, services and profiles consistent everywhere AI systems look." },
      { title: "Make pages quotable", desc: "Key pages get answer-first summaries, clear headings, tables where useful and structured data." },
      { title: "Open the doors", desc: "We check that AI crawlers can reach your site, add llms.txt, and submit your pages to Bing and Google." },
      {
        title: "The Loop",
        desc: "After 30 days we ask the same 20 questions again and show you, answer by answer, what changed.",
      },
    ],
    addOns: [
      { name: "Another 20 tracked questions", price: { usd: 200, inr: 8000 } },
      { name: "Directory and listing clean-up, up to 15 listings", price: { usd: 300, inr: 12000 } },
      { name: "Monthly AI answer tracking, done for you", price: { usd: 150, inr: 6000, per: "month" } },
    ],
    underTheHood: [
      "AI crawler access checked in robots.txt and at the CDN: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended",
      "Organization and LocalBusiness JSON-LD with sameAs links to every verified profile",
      "Entity disambiguation for names close to other companies, using legalName and registry details",
      "Answer-first page structure, comparison tables and FAQPage markup",
      "llms.txt kept in step with the sitemap",
    ],
    demo: null,
    work: [],
    faqs: [
      {
        q: "How do AI assistants decide which businesses to recommend?",
        a: "They favour businesses they can clearly identify and verify. That comes from a site search engines can index, consistent details across the web, structured data and pages that answer questions directly. Assistants that search live, like ChatGPT search and Perplexity, also draw on Bing and Google results.",
      },
      {
        q: "Is AI visibility different from normal SEO?",
        a: "It builds on SEO rather than replacing it. Good SEO gets your pages indexed and ranked; AI visibility adds the clarity AI systems need to describe you correctly and choose you as an answer. Most businesses need both.",
      },
      {
        q: "How soon will AI assistants start mentioning my business?",
        a: "Assistants that search the web live can reflect changes within a few weeks of your pages being indexed. Answers that rely on a model's training data change more slowly, often over several months. The Loop shows you what moved after the first 30 days.",
      },
    ],
  },

  /* ─── Autopilot: AI & Automation ─── */
  {
    slug: "whatsapp-ai",
    line: "ai-automation",
    name: "WhatsApp AI Kit",
    promise: "an AI agent on WhatsApp that answers, books and sells around the clock",
    summary:
      "The WhatsApp AI Kit puts an AI agent on your WhatsApp Business number in two to three weeks. It answers customer questions from your own information, shares your catalogue, takes bookings and orders, and hands the chat to a person whenever it should. Everything runs through the official WhatsApp Business Platform in your name.",
    price: { usd: 1200, inr: 50000 },
    priceNote: "Plus Meta's message charges, billed to you directly",
    timeline: "2–3 weeks",
    keyword: "WhatsApp chatbot for business",
    metaTitle: "WhatsApp AI Agent and Chatbot for Business",
    metaDescription:
      "An AI agent on your WhatsApp Business number that answers questions, shares your catalogue, books and sells, then hands over.",
    includes: [
      "WhatsApp Business Platform setup and number verification in your Meta account",
      "An AI agent that answers from your FAQs, price list and policies",
      "Your catalogue, plus an order or booking flow inside the chat",
      "Handover to a person in a shared inbox, with the full chat history",
      "Approved message templates for confirmations and reminders",
      "Replies in English and Hindi, with more languages on request",
      "A dashboard of conversations, top questions and handovers",
    ],
    fitFor: [
      "Businesses that get many WhatsApp messages a day",
      "Clinics, salons, restaurants, coaching centres and D2C brands",
      "Teams that lose leads because replies come too late",
    ],
    notFor: [
      "Bulk promotional messages to people who have not opted in, which breaks WhatsApp's rules",
      "Businesses with a few chats a week: the free WhatsApp Business app may be enough",
    ],
    steps: [
      { title: "Map the conversations", desc: "We read a sample of your real chats and list the questions, bookings and orders the agent should handle, and where it must hand over." },
      { title: "Set up WhatsApp", desc: "Business Platform account, number verification and message templates submitted to Meta in your name." },
      { title: "Train and test", desc: "The agent learns from your information and is tested against real questions, including tricky ones, before any customer sees it." },
      { title: "Go live", desc: "The agent starts on your number, with your team watching the shared inbox for the first days." },
      {
        title: "The Loop",
        desc: "For 30 days we review conversations, fix weak answers, add missing information and report what the agent handled.",
      },
    ],
    addOns: [
      { name: "Payments in chat: UPI or cards", price: { usd: 300, inr: 12000 } },
      { name: "CRM or Google Sheets sync", price: { usd: 250, inr: 10000 } },
      { name: "Another language", price: { usd: 200, inr: 8000 } },
    ],
    underTheHood: [
      "WhatsApp Cloud API through Meta, with verified webhooks and messages stored in your own database",
      "Retrieval over your documents, so answers come from your own information",
      "Guardrails: topic limits, a confidence threshold and an automatic handover path",
      "An evaluation set of real customer questions, rerun after every change",
      "Personal data kept to a minimum and handled under India's DPDP Act and GDPR where they apply",
    ],
    demo: null,
    work: [],
    faqs: [
      {
        q: "What does WhatsApp charge for business messages?",
        a: "Meta charges per template message, at rates that depend on the country and the type of message. Replying to a customer within 24 hours of their last message is free. Charges are billed by Meta to your own account, and we estimate your monthly cost before you start.",
      },
      {
        q: "Can the WhatsApp AI agent take payments?",
        a: "Yes, with the payments add-on. The agent sends a UPI or card payment link inside the chat and confirms the order once the payment succeeds.",
      },
      {
        q: "Will customers know they are talking to an AI?",
        a: "Yes. We recommend saying so in the first message, and customers can ask for a person at any time. Being upfront builds trust and is increasingly what regulators expect.",
      },
    ],
  },
  {
    slug: "ai-assistant",
    line: "ai-automation",
    name: "AI Assistant Kit",
    promise: "an AI assistant on your website that answers from your own documents",
    summary:
      "The AI Assistant Kit adds an AI assistant to your website or app that answers questions from your own documents, help pages and policies, and says so when it does not know. Built and tested in three to four weeks, it captures leads, books calls and hands over to your team with the conversation attached.",
    price: { usd: 1800, inr: 75000 },
    timeline: "3–4 weeks",
    keyword: "AI chatbot for website",
    metaTitle: "AI Chatbot for Websites, Trained on Your Data",
    metaDescription:
      "A website AI assistant that answers from your own documents, admits when it does not know, captures leads and hands over.",
    includes: [
      "An assistant trained on up to 200 pages of your documents",
      "A chat window styled to your brand, on desktop and mobile",
      "Answers that link to the page they came from",
      "Lead capture and calendar booking inside the chat",
      "Handover to email, Slack or WhatsApp with the conversation attached",
      "An admin view to update documents without a developer",
      "A tested set of 50 real questions with expected answers",
    ],
    fitFor: [
      "Websites where people ask a lot before they buy",
      "SaaS and software companies with help documentation",
      "Teams answering the same support questions every day",
    ],
    notFor: [
      "Medical, legal or financial advice, which needs a licensed professional",
      "Sites with very little content: the assistant can only answer from what exists",
    ],
    steps: [
      { title: "Gather and sort", desc: "We collect your documents, help pages and policies, remove outdated ones and agree what the assistant must never answer." },
      { title: "Build", desc: "The assistant is connected to your documents and styled to your brand, with lead capture and handover set up." },
      { title: "Test", desc: "We run 50 real questions, check each answer against the one you expect, and fix the gaps before launch." },
      { title: "Launch", desc: "The assistant goes live on your site, with conversation logs your team can read." },
      {
        title: "The Loop",
        desc: "For 30 days we review real conversations, fill gaps in the documents and tune the answers, then share what users asked most.",
      },
    ],
    addOns: [
      { name: "Another 500 pages of documents", price: { usd: 300, inr: 12000 } },
      { name: "Voice mode", price: { usd: 600, inr: 25000 } },
      { name: "Connection to Zendesk, Freshdesk or Intercom", price: { usd: 400, inr: 16000 } },
    ],
    underTheHood: [
      "Retrieval-augmented generation with hybrid keyword and vector search",
      "Answers grounded in retrieved passages, with citations and a refusal path when confidence is low",
      "An evaluation set run before launch and after every document or prompt change",
      "Prompt-injection defences and rate limits on the public endpoint",
      "The model chosen for cost and quality, with usage billed to your own API account",
    ],
    demo: "InferenceDemo",
    work: [],
    faqs: [
      {
        q: "Which AI model does the assistant use?",
        a: "We choose per project, usually from Anthropic, OpenAI or Google, based on answer quality and cost for your documents. The API account is in your name, so you see and control usage, and the model can be swapped later without a rebuild.",
      },
      {
        q: "How much does an AI assistant cost to run each month?",
        a: "Usually little for a business website, because each answer costs a fraction of a cent to a few cents in model usage. We estimate your monthly cost from your traffic before you start, and set a spending limit on your account.",
      },
      {
        q: "Is our data used to train the AI model?",
        a: "No. We use business API terms under which providers do not train their models on your data, and your documents stay in storage you control.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    line: "ai-automation",
    name: "Workflow Automation Kit",
    promise: "your repetitive admin, done automatically between the tools you already use",
    summary:
      "The Workflow Automation Kit automates up to five repetitive processes between the tools you already use, in two to three weeks. Typical examples are sending leads into a CRM, creating invoices from orders, booking reminders and weekly reports. Each automation has alerts and a log, so nothing fails silently.",
    price: { usd: 900, inr: 40000 },
    timeline: "2–3 weeks",
    keyword: "business workflow automation services",
    metaTitle: "Business Workflow Automation Services",
    metaDescription:
      "Up to five repetitive processes automated between the tools you already use, with alerts and logs so nothing fails silently.",
    includes: [
      "A process review to find the automations worth building",
      "Up to 5 automations between your existing tools",
      "Error alerts to email, Slack or WhatsApp",
      "A log of every run, so you can see what happened and when",
      "Plain-language documentation for each automation",
      "Accounts and automations created in your name",
    ],
    fitFor: [
      "Teams copying data between forms, sheets, CRMs and accounting tools",
      "Businesses where tasks fall through the gaps between people",
      "Owners who spend their evenings on admin",
    ],
    notFor: [
      "Processes that change every week: we will help you settle them first",
      "Tools with no API or export, which cannot be connected reliably",
    ],
    steps: [
      { title: "Walk through the work", desc: "We watch how each task is done today, step by step, and time how long it takes." },
      { title: "Pick the wins", desc: "We rank possible automations by time saved and risk, and agree the five to build." },
      { title: "Build and test", desc: "Each automation is built, tested with real data, and given alerts and a log." },
      { title: "Switch on", desc: "Automations go live one at a time, with your team checking the first runs." },
      {
        title: "The Loop",
        desc: "For 30 days we watch every run, fix edge cases as they appear, and report the hours saved.",
      },
    ],
    addOns: [
      { name: "Another automation", price: { usd: 200, inr: 8000 } },
      { name: "An AI step that reads emails, documents or invoices", price: { usd: 400, inr: 16000 } },
    ],
    underTheHood: [
      "n8n self-hosted or cloud, Make or Zapier, chosen by volume, cost and how sensitive the data is",
      "Custom Python or Node.js services where a no-code tool would be fragile",
      "Idempotent steps and retries, so a re-run never creates duplicates",
      "Secrets kept in the platform's vault, never inside the workflow itself",
    ],
    demo: "WorkflowDemo",
    work: [],
    faqs: [
      {
        q: "Should we use Zapier, Make or n8n?",
        a: "It depends on volume, cost and how sensitive the data is. Zapier is simplest at low volumes, Make is cheaper for complex flows, and n8n can run on your own server for high volumes or private data. We recommend one after seeing your processes.",
      },
      {
        q: "What happens when an automation fails?",
        a: "You find out straight away. Every automation sends an alert when a step fails, keeps a log of what happened, and retries where it is safe to. Nothing fails silently.",
      },
      {
        q: "How much time can automation save?",
        a: "It depends on the process, so we measure before building anything. We time each task as it is done today and estimate the saving per week; the automations worth building are the ones where that saving is clear.",
      },
    ],
  },
];

export const getAllKits = () => KITS;
export const getKitBySlug = (slug) => KITS.find((kit) => kit.slug === slug) || null;
export const getKitsByLine = (lineSlug) => KITS.filter((kit) => kit.line === lineSlug);
