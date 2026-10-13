/**
 * LOGIXLOOPS: Case Studies & Client Work Data Layer
 * Centralized repository of verified client engagements and technical architectures.
 */

export const CASE_STUDIES = {
  "sire-media": {
    slug: "sire-media",
    kits: ["business-website"],
    publishedAt: "2026-03-15",
    title: "Sire Media Digital Platform",
    navLabel: "Sire Media",
    client: "Sire Media Pvt. Ltd.",
    liveUrl: "https://siremedia.co.in/",
    industry: "Media & Marketing",
    transformationType: "High-Performance Agency Platform & Creator Showcase",
    shortDescription:
      "A high-velocity digital presence and media showcase engineered for India's leading strategy-first influencer marketing agency, delivering 5,000+ high-impact brand campaigns with 96% client retention.",
    cardImage: "/work/sire-media.png",
    heroImage: "/work/sire-media-hero.jpg",
    heroImageAlt:
      "Sire Media high-end creative production studio with cinema camera setup and video editing suites.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Vercel", "Node.js"],
    featured: true,
    metrics: [
      { value: "5,000+", label: "Campaigns Executed", prefix: "", suffix: "" },
      { value: "96%", label: "Client Retention Rate", prefix: "", suffix: "" },
      { value: "< 0.8s", label: "Core Web Vitals Load", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "High-Velocity Media vs. Web Performance",
        content:
          "Operating at the forefront of India's creator economy with 5,000+ campaigns and 50 billion impressions, Sire Media required a digital ecosystem that reflected their status as an elite, strategy-first partner. Their previous presence needed a total overhaul: video assets caused bandwidth bottlenecks, mobile navigation lagged, and the site failed to communicate their massive 300,000+ creator database and 96% client retention rate.",
        points: [
          "Heavy background video streaming causing initial render latency and mobile stutter.",
          "The need for high-impact kinetic typography without dropping below 60fps on mobile viewports.",
        ],
        image: "/work/sire-media-challenge.jpg",
        imageAlt:
          "Sire Media global live streaming and influencer campaign performance analytics dashboard.",
      },
      discovery: {
        title: "Architecting High-Conversion Digital Luxury",
        description:
          "Translating Sire Media's commercial positioning into a brutalist-editorial digital flagship built for CMOs and enterprise growth leads.",
        insights: [
          {
            icon: "speed",
            title: "Adaptive Video Streaming",
            description:
              "Engineered dual mobile/desktop video pipelines that preload silently without blocking initial thread rendering or first-paint metrics.",
            color: "primary",
          },
          {
            icon: "dataset",
            title: "Creator Ecosystem Framing",
            description:
              "Designed multi-tiered data counters and service showcases highlighting 6 regional languages and 8 core agency capabilities.",
            color: "secondary",
          },
          {
            icon: "touch_app",
            title: "Kinetic Micro-Interactions",
            description:
              "Built custom magnetic cursor trails, marquee tickers, and spring physics transitions for an immersive luxury agency feel.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Design System & Editorial Typography",
            description:
              "Engineered a dual-font architecture pairing classical Prata display typography with hyper-legible Manrope grotesque across extreme contrast dark/light canvases.",
            color: "secondary",
          },
          {
            title: "Phase 2: Next.js Frontend & Video Pipeline",
            description:
              "Developed a modern Next.js application with TurboPack optimization, hardware-accelerated transforms, and edge-cached video assets.",
            color: "primary",
          },
          {
            title: "Phase 3: Lead Flow & Conversion Architecture",
            description:
              "Streamlined user pathways from high-energy video hero sections to frictionless consultation booking and interactive service deep dives.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Edge-Optimized Media Architecture",
        content:
          "By deploying on Vercel's global edge network with hardware-accelerated video containers and pre-compiled CSS chunks, we ensured Sire Media loads in under 800ms globally while sustaining heavy multimedia engagement.",
      },
    },
  },

  "building-bites": {
    slug: "building-bites",
    kits: ["online-store"],
    publishedAt: "2026-04-10",
    title: "Building Bites D2C Platform",
    navLabel: "Building Bites",
    client: "Building Bites Foods",
    liveUrl: "https://www.buildingbites.in/",
    industry: "Food & Nutrition",
    transformationType: "E-Commerce Experience & Interactive Health Hub",
    shortDescription:
      "An engaging D2C digital platform and interactive nutritional engine engineered for India's clean-label protein snack brand, bridging interactive health calculations with 1-click checkout funnels.",
    cardImage: "/work/building-bites.png",
    heroImage: "/work/building-bites-hero.jpg",
    heroImageAlt:
      "Building Bites clean-label artisan protein snack bars with natural wholesome ingredients on marble.",
    technologies: ["Next.js", "React", "GSAP", "Tailwind CSS", "Framer Motion", "Vercel"],
    featured: true,
    metrics: [
      { value: "100%", label: "Clean-Label Transparency", prefix: "", suffix: "" },
      { value: "< 0.6s", label: "Page Load Benchmark", prefix: "", suffix: "" },
      { value: "3.2x", label: "Marketplace Referral Lift", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "From Functional Nutrition to Interactive Commerce",
        content:
          "Building Bites was founded in Jaipur with a mission to bridge India's widespread protein gap through all-natural, clean-label snacking. Converting health-conscious Indian consumers requires more than a static storefront: it demands transparent nutritional education, seamless mobile storytelling, and an engaging interactive experience that proves personal daily protein targets before directing users to Amazon checkout.",
        points: [
          "Need for transparent nutritional calculation tools to overcome consumer skepticism and educate buyers.",
          "Minimizing drop-off in the transition from brand discovery to Amazon 1-click purchase.",
        ],
        image: "/work/building-bites-challenge.jpg",
        imageAlt:
          "Building Bites interactive daily nutrition, protein calculation, and biometric tracker dashboard.",
      },
      discovery: {
        title: "Interactive Wellness & High-Conversion Flow",
        description:
          "Crafting an engaging brand experience that combines educational interactive tools with instant e-commerce purchasing pathways.",
        insights: [
          {
            icon: "calculate",
            title: "Interactive Health Hub",
            description:
              "Engineered a real-time client-side biometric calculator computing customized daily caloric targets, BMI, water intake, and protein blueprints.",
            color: "primary",
          },
          {
            icon: "nutrition",
            title: "Multi-Angle Product Showcase",
            description:
              "Designed seamless product carousels with dynamic stock status indicators and direct Amazon marketplace purchase triggers.",
            color: "secondary",
          },
          {
            icon: "smartphone",
            title: "Social Proof Stream",
            description:
              "Integrated live Instagram video reel feeds and community verification directly into the mobile purchase journey.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Brand Storytelling & Design System",
            description:
              "Created a fresh, appetite-inducing visual language pairing modern Poppins typography with warm ambient glow lighting and video hero wrappers.",
            color: "secondary",
          },
          {
            title: "Phase 2: Algorithmic Health Hub Calculator",
            description:
              "Implemented client-side mathematical algorithms calculating BMR, TDEE, and activity-adjusted protein requirements with zero latency.",
            color: "primary",
          },
          {
            title: "Phase 3: High-Speed Conversion Architecture",
            description:
              "Optimized edge assets, image carousels, and GSAP micro-interactions to maintain sub-600ms load benchmarks across mobile networks.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Client-Side Interactive Performance",
        content:
          "By executing all nutritional algorithms client-side and pre-fetching high-resolution product imagery at the edge, the platform delivers instantaneous feedback with zero server latency, maximizing user engagement and direct marketplace sales.",
      },
    },
  },

  "clubin-nightlife": {
    slug: "clubin-nightlife",
    kits: ["mvp"],
    publishedAt: "2026-05-20",
    title: "ClubIn Nightlife & VIP Access Engine",
    navLabel: "ClubIn",
    client: "CLUB!N PRIVATE LIMITED",
    liveUrl: "https://clubin.in/",
    industry: "Entertainment & EventTech",
    transformationType: "Real-Time Ticketing & High-Throughput QR Verification",
    shortDescription:
      "An ultra-fast nightlife booking platform and real-time venue management ecosystem engineered for India's premier clubs, featuring dynamic QR ticketing, zero-friction checkout, and 3D WebGL interactions.",
    cardImage: "/work/clubin.png",
    heroImage: "/work/clubin-hero.jpg",
    heroImageAlt:
      "ClubIn luxury neon-lit nightclub VIP lounge and nightlife atmosphere.",
    technologies: ["Next.js", "React", "WebGL", "Tailwind CSS", "Razorpay", "AWS", "Framer Motion"],
    featured: true,
    metrics: [
      { value: "< 60s", label: "End-to-End Booking Cycle", prefix: "", suffix: "" },
      { value: "100%", label: "Real-Time Venue Verification", prefix: "", suffix: "" },
      { value: "< 0.5s", label: "Door QR Scan Latency", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "Fragmented Nightlife Logistics & Gate Congestion",
        content:
          "India's high-energy nightlife industry has historically suffered from extreme operational friction: manual guest lists managed over messaging apps, opaque door charges with unexpected surcharges, and massive physical bottlenecks at club entrances. CLUB!N PRIVATE LIMITED set out to build India's premier digital nightlife gateway across Delhi NCR, Mumbai, and Bangalore. They required a platform capable of handling intense weekend booking spikes, instantaneous payment settlement, and real-time gatekeeper QR validation without failure.",
        points: [
          "Severe physical line congestion caused by slow manual guest list lookups.",
          "High weekend traffic surges demanding sub-second payment settlement and zero downtime."
        ],
        image: "/work/clubin-challenge.jpg",
        imageAlt:
          "ClubIn dynamic QR ticket validation and sub-second entry scanner at VIP club entrance.",
      },
      discovery: {
        title: "Designing Frictionless Nightlife Architecture",
        description:
          "Engineering a dark-luxury visual aesthetic paired with high-concurrency transactional pipelines to solve both consumer discovery and venue gate operations.",
        insights: [
          {
            icon: "qr_code_scanner",
            title: "Sub-Second QR Gate Verification",
            description:
              "Engineered cryptographically signed dynamic QR passes that validate at the door in under 500ms even in low-connectivity venue environments.",
            color: "primary",
          },
          {
            icon: "view_in_ar",
            title: "Interactive 3D WebGL Canvas",
            description:
              "Built hardware-accelerated WebGL ambient shaders and smooth multi-layer parallax rails that maintain 60fps across mobile devices.",
            color: "secondary",
          },
          {
            icon: "bolt",
            title: "Frictionless 60-Second Booking",
            description:
              "Integrated Razorpay UPI and card payments into a 2-step checkout flow with instant booking confirmation and zero hidden convenience charges.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Dark-Luxury Design Language",
            description:
              "Crafted a bespoke visual design system featuring metallic gold accents, deep dark canvases, and Unbounded display typography.",
            color: "secondary",
          },
          {
            title: "Phase 2: High-Concurrency Booking & Payment Mesh",
            description:
              "Implemented transactional reservation engines connected to Razorpay webhooks for instant ticketing and automated refund handling.",
            color: "primary",
          },
          {
            title: "Phase 3: Venue Partner & Scanner Portal",
            description:
              "Engineered high-speed mobile scanning dashboards for bouncers and venue managers to verify guest passes and monitor live capacity.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "High-Throughput Edge Ticketing Infrastructure",
        content:
          "By coupling Next.js edge caching with lightweight cryptographically signed ticket payloads, ClubIn guarantees that sudden 10x traffic surges on Friday and Saturday nights process with zero latency, while door staff verify entry passes instantaneously.",
      },
    },
  },

  "bouldspace-architecture": {
    slug: "bouldspace-architecture",
    kits: ["business-website"],
    publishedAt: "2026-06-15",
    title: "Bouldspace Architectural Consulting Platform",
    navLabel: "Bouldspace",
    client: "Bouldspace Studio",
    liveUrl: "https://bouldspace.in/",
    industry: "Architecture & Design",
    transformationType: "Interactive CAD Blueprint Engine & Studio Flagship",
    shortDescription:
      "An interactive architectural flagship and vector blueprint engineering showcase built for luxury construction consultants, featuring real-time CAD coordinate animations, multi-floor stratification models, and quote engines.",
    cardImage: "/work/bouldspace.png",
    heroImage: "/work/bouldspace-hero.jpg",
    heroImageAlt:
      "Bouldspace contemporary luxury architectural villa with cantilevered slabs and ambient lighting.",
    technologies: ["Next.js", "React", "SVG CAD Engine", "Tailwind CSS", "Framer Motion", "Vercel"],
    featured: true,
    metrics: [
      { value: "450+", label: "Architectural Projects Managed", prefix: "", suffix: "" },
      { value: "9-Phase", label: "Interactive CAD Storyboard", prefix: "", suffix: "" },
      { value: "< 0.7s", label: "Vector Pipeline First Paint", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "From Static Portfolios to Technical Precision",
        content:
          "High-end architectural and construction management firms often struggle with digital portfolios that feel either too artistic or purely static, failing to demonstrate the rigorous engineering, structural zoning, and multi-floor precision required for complex luxury builds. Bouldspace needed a digital flagship that could visually narrate their 9-stage architectural process—from raw spatial grid axes to 3D isometric structural realization—while driving high-intent client inquiries and site-visit bookings.",
        points: [
          "Inability of conventional static portfolios to demonstrate structural engineering rigor and spatial zoning.",
          "High friction in converting luxury homeowners and commercial developers into qualified site visit bookings.",
        ],
        image: "/work/bouldspace-challenge.jpg",
        imageAlt:
          "Bouldspace precision CAD architectural blueprints and 3D structural wireframe modeling workstation.",
      },
      discovery: {
        title: "Engineering the Interactive CAD Storyboard",
        description:
          "Bridging visual luxury with structural drafting by engineering an interactive SVG vector CAD canvas driven by scroll orchestration.",
        insights: [
          {
            icon: "architecture",
            title: "Dynamic Vector Blueprint Engine",
            description:
              "Engineered an SVG coordinate mapping system that renders structural footprints, wall offsets, door swings, and laser drafting cursors with mathematical precision.",
            color: "primary",
          },
          {
            icon: "layers",
            title: "Multi-Floor 3D Stratification",
            description:
              "Designed isometric layer transitions that stack ground, first-floor, and penthouse slabs into living 3D wireframe models.",
            color: "secondary",
          },
          {
            icon: "request_quote",
            title: "Integrated Estimation Funnel",
            description:
              "Built automated site-visit consultation flows and tier-based architectural pricing calculators directly into the user journey.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Minimalist Luxury Editorial System",
            description:
              "Created an architectural design system pairing classical Libre Caslon serif typography with crisp Hanken Grotesk technical notations.",
            color: "secondary",
          },
          {
            title: "Phase 2: Mathematical SVG Drafting Pipeline",
            description:
              "Developed a lightweight, hardware-accelerated 9-stage blueprint engine that animates coordinate maps and volumetric cavities seamlessly.",
            color: "primary",
          },
          {
            title: "Phase 3: Lead Capture & Consultation Routing",
            description:
              "Implemented conversion-focused site visit booking funnels and automated project qualification workflows.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "High-Precision Vector Architecture",
        content:
          "By executing all blueprint animations as pure mathematical SVG paths and hardware-accelerated CSS transforms, Bouldspace achieves rich technical storytelling without the weight of heavy 3D files, maintaining sub-700ms load benchmarks across devices.",
      },
    },
  },

  "adinath-finserv": {
    slug: "adinath-finserv",
    kits: ["business-website"],
    publishedAt: "2026-07-01",
    title: "Adinath Finserv Wealth & Investment Platform",
    navLabel: "Adinath Finserv",
    client: "Adinath Finserv",
    liveUrl: "https://www.adinathfinserv.com/",
    industry: "FinTech & Wealth",
    transformationType: "Interactive Wealth Engine & AMFI-Certified Advisory Portal",
    shortDescription:
      "An AMFI-registered wealth management platform and algorithmic compounding engine engineered for transparent portfolio advisory, goal-based SIP modeling, and instant consultation funnels.",
    cardImage: "/work/adinath-finserv.png",
    heroImage: "/work/adinath-finserv-hero.jpg",
    heroImageAlt:
      "Adinath Finserv executive wealth advisory meeting room overlooking city skyline with holographic growth charts.",
    technologies: ["Next.js", "React", "Financial Math Engine", "Tailwind CSS", "Framer Motion", "Vercel"],
    featured: true,
    metrics: [
      { value: "ARN-313616", label: "AMFI-Certified Distributor", prefix: "", suffix: "" },
      { value: "100%", label: "Unbiased Fiduciary Planning", prefix: "", suffix: "" },
      { value: "< 0.5s", label: "Financial Engine Calculations", prefix: "", suffix: "" },
    ],
    sections: {
      challenge: {
        title: "Demystifying Wealth Creation for Retail & HNI Investors",
        content:
          "Retail and high-net-worth investors frequently face opaque investment advice, high-commission lock-in products, and confusing financial jargon. Adinath Finserv, an AMFI-registered mutual fund distributor (ARN-313616), sought to eliminate this friction. They needed a clean, trustworthy digital platform that demystifies compounding through real-time interactive goal planners, retirement roadmaps, and frictionless WhatsApp expert consultation.",
        points: [
          "Eliminating investor hesitation through transparent, interactive mathematical models of wealth compounding.",
          "Delivering regulatory-compliant AMFI disclosures while maintaining a frictionless client advisory funnel.",
        ],
        image: "/work/adinath-finserv-challenge.jpg",
        imageAlt:
          "Adinath Finserv retirement wealth growth and SIP compounding calculator interface on tablet.",
      },
      discovery: {
        title: "Architecting Transparent Financial Growth",
        description:
          "Combining mathematical financial modeling with a clean, trust-first visual interface to drive informed retail and HNI investment decisions.",
        insights: [
          {
            icon: "calculate",
            title: "Algorithmic Compounding Engine",
            description:
              "Built client-side SIP and retirement calculators that simulate inflation-adjusted wealth growth over multi-decade horizons.",
            color: "primary",
          },
          {
            icon: "security",
            title: "AMFI Fiduciary Compliance",
            description:
              "Integrated full regulatory disclosure matrices (ARN: 313616, EUIN: E593999) with risk profiling safeguards across all asset classes.",
            color: "secondary",
          },
          {
            icon: "support_agent",
            title: "Frictionless Advisory Funnel",
            description:
              "Streamlined 1-click WhatsApp expert consultation routing directly linked to personalized calculation outputs.",
            color: "tertiary",
          },
        ],
      },
      engineering: {
        title: "Build Sequence",
        phases: [
          {
            title: "Phase 1: Trust-Centered Design Language",
            description:
              "Developed an authoritative visual system with deep navy tones, gold accents, and crisp Poppins typography.",
            color: "secondary",
          },
          {
            title: "Phase 2: Mathematical Investment Calculators",
            description:
              "Engineered high-speed formula engines computing compound interest, SIP returns, and tax-saving optimizations in real time.",
            color: "primary",
          },
          {
            title: "Phase 3: Omnichannel Client Onboarding",
            description:
              "Connected digital goal planners directly to encrypted WhatsApp advisory channels for instant client response.",
            color: "tertiary",
          },
        ],
      },
      architecture: {
        title: "Zero-Latency Client-Side Financial Compute",
        content:
          "By executing all compounding formulas and retirement projections directly in browser memory, Adinath Finserv provides instantaneous visual feedback without round-trip server latency, driving high conversion into direct consultation sessions.",
      },
    },
  },
};

export function getAllCaseStudies() {
  return Object.values(CASE_STUDIES);
}

export function getCaseStudyBySlug(slug) {
  return CASE_STUDIES[slug] || null;
}
