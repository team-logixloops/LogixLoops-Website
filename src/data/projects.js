/**
 * LOGIXLOOPS: Studio & Internal Projects
 * Technical showcases and specialized solutions engineered by LogixLoops.
 */

export const STUDIO_PROJECTS = [
  {
    id: "sara-ai",
    title: "SARA AI — Voice-Driven Hotel & Restaurant Reservation Agent",
    shortTitle: "SARA AI",
    eyebrow: "Conversational AI & VoiceTech",
    shortDescription:
      "An AI voice agent that handles hotel and restaurant bookings through natural, real-time conversation with dynamic rate negotiation and automated Twilio SMS confirmations.",
    gradient: "from-indigo-600 via-violet-700 to-cyan-800",
    gradientStyle:
      "radial-gradient(at 10% 15%, rgba(99, 102, 241, 0.9) 0px, transparent 55%), radial-gradient(at 90% 10%, rgba(6, 182, 212, 0.85) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(168, 85, 247, 0.8) 0px, transparent 55%), linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0e7490 100%)",
    accentColor: "indigo",
    meta: "LiveKit · Deepgram · Gemini · Cartesia · Twilio",
    fullDetails: {
      tagline: "Autonomous Voice Reservation & Intelligent Rate Negotiation Pipeline",
      whatItDoes:
        "Guests call in or speak through a web interface and book rooms or tables the way they'd talk to a front-desk agent: no forms, no hold music. The system tracks multi-turn conversations (so a guest can change their mind mid-booking, ask follow-up questions, or add special requests without restarting), checks availability in real time, and applies a configurable pricing/negotiation layer that can offer discounts within bounds the property sets, rather than a fixed rate-card. Once a booking is confirmed, the guest gets an SMS confirmation automatically. A separate admin dashboard gives staff visibility into bookings as they come in.",
      whyItMatters:
        "Hotels—especially smaller or boutique properties—lose bookings to unanswered calls and slow response times, particularly outside business hours. A voice agent that can hold a real conversation (not an IVR menu tree) closes that gap: it's always available, it doesn't put guests through 'press 1 for reservations,' and it can flex on price within limits instead of forcing a take-it-or-leave-it rate.",
      technicalHighlights: [
        {
          title: "Real-Time Streaming Voice Pipeline",
          description:
            "Ultra-low latency STT → LLM → TTS architecture utilizing LiveKit for audio streaming, Deepgram for real-time speech-to-text, Google Gemini for conversational context understanding, and Cartesia for human-like speech synthesis.",
          icon: "graphic_eq",
        },
        {
          title: "Multi-Turn Session & State Management",
          description:
            "Preserves conversation context across complex booking iterations, allowing guests to modify dates, query room amenities, or negotiate rates without losing session memory.",
          icon: "forum",
        },
        {
          title: "Rule-Based Dynamic Pricing Engine",
          description:
            "Automates rate negotiation within configurable thresholds set by hotel management based on occupancy, season, and room category.",
          icon: "payments",
        },
        {
          title: "Dual Portal Architecture & Telephony",
          description:
            "Features a low-latency web audio interface for guests, an administrative booking dashboard for property staff, and automated transactional SMS confirmations via Twilio.",
          icon: "sms",
        },
      ],
      technologies: [
        "LiveKit",
        "Deepgram STT",
        "Google Gemini",
        "Cartesia TTS",
        "Twilio SMS",
        "Next.js",
        "React",
        "Node.js",
        "Tailwind CSS",
      ],
      useCases: [
        "Boutique hotels & luxury resorts",
        "Independent & small hotel chains",
        "Fine dining restaurant reservation lines",
        "Resort package & excursion bookings",
      ],
    },
  },
  {
    id: "synapse",
    title: "SYNAPSE — Natural-Language Infrastructure Control Agent",
    shortTitle: "SYNAPSE",
    eyebrow: "Autonomous DevOps & Agentic Infra",
    shortDescription:
      "A natural-language DevOps agent that translates engineering outcomes into verified, multi-step execution plans across SSH, Docker, Kubernetes, AWS, and local shells with built-in safety gates and graceful fallback.",
    gradient: "from-emerald-600 via-teal-700 to-cyan-800",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(16, 185, 129, 0.9) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(6, 182, 212, 0.85) 0px, transparent 50%), radial-gradient(at 55% 85%, rgba(59, 130, 246, 0.75) 0px, transparent 55%), linear-gradient(135deg, #064e3b 0%, #0f766e 50%, #0369a1 100%)",
    accentColor: "cyan",
    meta: "FastAPI · LangGraph · Docker · K8s · AWS · SSH",
    fullDetails: {
      tagline: "Outcome-Driven Infrastructure Automation with Verify → Retry → Replan Loops",
      whatItDoes:
        "Instead of manually SSH-ing into a server, running the right Docker command, copying a container ID, and curling an endpoint, you describe the outcome: 'build the Flask image on the RHEL server, run it on port 5000, curl the health check, and SMS me the response.' SYNAPSE breaks that into a step plan, executes each step with the appropriate tool, verifies success (not just that a tool ran, but that it didn't report success: false), retries once on failure, and replans (capped at 2 replans per session) if a step still fails.\n\nSimple queries ('list running docker containers') skip planning and go straight to a single ReAct tool call. Compound commands trigger a Planner → Executor loop, with the live plan rendered in the UI as it executes.",
      whyItMatters:
        "This is the gap between 'an LLM wrapper that answers questions' and 'an agent that does things and knows whether they worked.' The verify → retry → replan loop is the part most toy agent demos skip — it's what makes multi-step automation trustworthy enough to point at a real server instead of a sandbox.",
      whatItControls:
        "Remote Linux (SSH via paramiko), local Docker, local Kubernetes (kubectl), local PowerShell, AWS CLI, local ML training (scikit-learn), GitHub Actions, plus email, SMS, and Telegram notifications.",
      technicalHighlights: [
        {
          title: "Planner/Executor with Bounded Replanning",
          description:
            "Dual-engine architecture featuring automatic step retry and bounded replanning (strictly capped at 2 replans per session) rather than an unbounded LLM tool-call loop.",
          icon: "account_tree",
        },
        {
          title: "Multi-Provider Model Router & Fallback",
          description:
            "Automatic fallback chain across Groq → Gemini → Cerebras → local Ollama, ensuring graceful degradation if a primary provider hits rate limits or latency spikes.",
          icon: "alt_route",
        },
        {
          title: "Zero-Trust Destructive Safety Gates",
          description:
            "Destructive operations (recursive deletes, docker prune/rm, kubectl delete, AWS terminate) are blocked until explicitly confirmed; SSH enforces strict host-key verification.",
          icon: "security",
        },
        {
          title: "Real-Time WebSocket Plan Streaming",
          description:
            "Real-time plan visualization over Socket.IO streams individual step statuses, terminal outputs, and verification checks live to the web UI.",
          icon: "stream",
        },
        {
          title: "Automated pytest & CI Suite",
          description:
            "Comprehensive pytest test suite covering tool handlers, planner logic, executor state machine, and provider routing, backed by CI for backend tests and frontend validation.",
          icon: "fact_check",
        },
      ],
      technologies: [
        "Python",
        "FastAPI",
        "LangGraph (ReAct)",
        "Socket.IO",
        "Docker",
        "Kubernetes (kubectl)",
        "AWS CLI",
        "Paramiko SSH",
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],
      useCases: [
        "Personal homelab & bare-metal infrastructure management",
        "Rapid DevOps triage where command syntax is higher friction than intent",
        "Production reference architecture for verified infrastructure agents",
        "Automated multi-cloud deployment & incident alerting pipelines",
      ],
    },
  },
  {
    id: "tokenflow",
    title: "TokenFlow 🎟️ — Real-Time Queue & Token Management System",
    shortTitle: "TokenFlow",
    eyebrow: "Real-Time Systems & Counter-Service Tech",
    shortDescription:
      "A real-time ordering and queue management system with instant multi-screen sync across customer menus, staff worker dashboards, and public counter displays via Socket.IO.",
    gradient: "from-amber-500 via-orange-600 to-rose-700",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(245, 158, 11, 0.95) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(244, 63, 94, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(217, 119, 6, 0.8) 0px, transparent 55%), linear-gradient(135deg, #78350f 0%, #c2410c 50%, #9f1239 100%)",
    accentColor: "amber",
    meta: "React 19 · Node.js · Socket.IO · Prisma · SQLite",
    fullDetails: {
      tagline: "Synchronized Tri-Screen Ordering & Real-Time Token Orchestration",
      whatItDoes:
        "Three interfaces, one live state. Customers browse a menu and place orders through a dedicated ordering UI. Staff work from a dashboard (JWT-password-protected) that shows incoming orders in real time and lets them update token status as orders move through the queue. A separate public display — meant for a screen near the counter — shows two live lists: tokens still in the queue ('Serving Soon') and tokens ready for pickup ('Now Serving'). All three update instantly via Socket.IO — no polling, no manual refresh.",
      whyItMatters:
        "Queue-based service (counter cafes, food courts, walk-in clinics) usually runs on shouted numbers or a paper ticket system that breaks down under any volume. TokenFlow gives a small operation the same real-time-queue UX that larger chains build custom, without needing a POS vendor contract — order in, status tracked, customer notified visually, all from a stack that runs on SQLite and doesn't need dedicated infra.",
      technicalHighlights: [
        {
          title: "Tri-Interface Real-Time WebSocket Sync",
          description:
            "Instant state synchronization across three distinct client roles (customer ordering, worker dashboard, public counter display) powered by an event-driven Socket.IO architecture.",
          icon: "sync_alt",
        },
        {
          title: "Role-Based JWT Security Boundary",
          description:
            "JWT-authenticated worker dashboard that cleanly isolates administrative token state mutations from public display consumers.",
          icon: "lock",
        },
        {
          title: "Prisma ORM & Schema-Driven Persistence",
          description:
            "Declarative schema-driven data layer (Order, Token, MenuItem) over SQLite with zero-friction migrations, engineered for drop-in migration to PostgreSQL/MySQL.",
          icon: "database",
        },
        {
          title: "Modular Multi-Route Frontend (React 19)",
          description:
            "Cleanly segmented React 19 + Vite frontend architecture separating CustomerOrder, WorkerDashboard, and TokenDisplay views with modern routing and state ergonomics.",
          icon: "view_quilt",
        },
      ],
      technologies: [
        "React 19",
        "Vite",
        "Socket.IO",
        "Node.js",
        "Express",
        "Prisma ORM",
        "SQLite",
        "Tailwind CSS",
        "React Router",
        "JWT Auth",
      ],
      useCases: [
        "Cafes & quick-service counter restaurants",
        "Multi-vendor food courts & campus dining halls",
        "Walk-in medical clinics & diagnostic service desks",
        "High-volume pop-up venues & festival concessions",
      ],
    },
  },
  {
    id: "edgesafety-ai",
    title: "EdgeSafety-AI — Real-Time PPE & Safety Compliance Detection",
    shortTitle: "EdgeSafety-AI",
    eyebrow: "Computer Vision & Edge AI",
    shortDescription:
      "A real-time safety compliance system utilizing a 3-model YOLOv8 ensemble with custom IOU tracking and temporal EMA smoothing to eliminate false-positive flicker across 14 PPE classes.",
    gradient: "from-yellow-500 via-amber-600 to-orange-700",
    gradientStyle:
      "radial-gradient(at 20% 15%, rgba(234, 179, 8, 0.95) 0px, transparent 55%), radial-gradient(at 85% 25%, rgba(249, 115, 22, 0.85) 0px, transparent 50%), radial-gradient(at 45% 85%, rgba(202, 138, 4, 0.8) 0px, transparent 55%), linear-gradient(135deg, #713f12 0%, #9a3412 50%, #18181b 100%)",
    accentColor: "yellow",
    meta: "YOLOv8 · OpenCV · FastAPI · Ultralytics · Alerting",
    fullDetails: {
      tagline: "Ensemble-Driven Computer Vision & Temporal Video Compliance Telemetry",
      whatItDoes:
        "Rather than relying on a single detection model, EdgeSafety-AI runs three specialized YOLOv8 models in an ensemble — one tuned for helmets, one for gloves, one covering the broader class set (vests, masks, goggles, falls, ladders, cones) — and merges their outputs into one unified 14-class detection registry using a custom IOU tracker to resolve overlapping detections between models. A 10-frame EMA smoothing layer prevents the flickering false positives that plague naive frame-by-frame detection in live video. The web dashboard streams the live feed, lets you isolate detection to a specific PPE category, shows live violation counts, and pushes alerts to Telegram, Twilio SMS, or Discord when a violation is tracked (not just detected once — deduplicated so one missing helmet doesn't spam ten alerts).",
      whyItMatters:
        "Manual safety compliance monitoring on a construction site or in a lab doesn't scale — you need either constant human oversight or you accept blind spots. Automated PPE detection turns a camera feed already there into a compliance layer, catching violations as they happen instead of after an incident report. The ensemble-over-single-model design is the more interesting engineering choice here: splitting detection classes across specialized models and reconciling them is a deliberate accuracy trade-off, not the default 'throw one YOLO model at everything' approach most tutorial projects take.",
      technicalHighlights: [
        {
          title: "3-Model YOLOv8 Specialized Ensemble",
          description:
            "Runs three specialized models (helmets, gloves, and broader PPE/hazards) reconciled into a single 14-class global registry via custom IOU-based spatial tracking.",
          icon: "center_focus_strong",
        },
        {
          title: "10-Frame EMA Temporal Smoothing",
          description:
            "Temporal smoothing (10-frame EMA + 30-frame state switch threshold) specifically engineered to eradicate live-feed flicker and transient false positives.",
          icon: "auto_graph",
        },
        {
          title: "Granular Per-Class Confidence Thresholds",
          description:
            "Custom confidence floor overrides (e.g. 70% minimum threshold for gloves) to eliminate noise on smaller, challenging-to-detect safety equipment.",
          icon: "tune",
        },
        {
          title: "Stateful Deduplicated Multi-Channel Alerts",
          description:
            "Violation tracking engine that pushes deduplicated alerts to Telegram, Twilio SMS, and Discord rather than spamming on every consecutive video frame.",
          icon: "notification_important",
        },
        {
          title: "FastAPI Multipart Streaming & Telemetry",
          description:
            "FastAPI backend with multipart video streaming, target class isolation, and live training telemetry visualization (mAP/Precision/Recall curves from results.csv).",
          icon: "analytics",
        },
      ],
      technologies: [
        "YOLOv8",
        "FastAPI",
        "OpenCV",
        "Ultralytics",
        "Python",
        "IOU Tracker",
        "Twilio SMS",
        "Telegram Bot API",
        "Discord Webhooks",
      ],
      useCases: [
        "Construction sites & heavy industrial manufacturing",
        "Healthcare & bio-lab sanitary compliance (mask/glove verification)",
        "Hazard zone & incident detection (fall detection, ladder safety, cones)",
        "Automated OSHA audit trails & workplace safety telemetry",
      ],
    },
  },
  {
    id: "garage-management",
    title: "Automobile Garage Management System",
    shortTitle: "Garage DBMS",
    eyebrow: "Foundational Systems & Relational DBMS",
    shortDescription:
      "A web-based CRUD application for managing garage operations, vehicle maintenance records, and relational database workflows on a LAMP-style stack.",
    gradient: "from-blue-600 via-indigo-700 to-sky-700",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(59, 130, 246, 0.9) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(99, 102, 241, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(14, 165, 233, 0.75) 0px, transparent 55%), linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 50%, #0369a1 100%)",
    accentColor: "blue",
    meta: "PHP · MySQL · Apache (XAMPP) · Relational DBMS",
    fullDetails: {
      tagline: "Normalized Relational Database Architecture & Server-Side Workflow Engine",
      whatItDoes:
        "The system provides a garage-facing web interface backed by a relational MySQL database (dbms-project), served through Apache and PHP. Core functionality centers on tracking vehicles and service records — the standard shape of a DBMS coursework project: define a normalized relational schema, then build the server-side forms and queries needed to create, read, update, and delete records against it.",
      whyItMatters:
        "This project represents foundational computer science and database systems work: normalized relational schema design, server-side data validation, full CRUD lifecycles, and multi-tier server stack orchestration — serving as a credible demonstration of foundational software engineering principles.",
      technicalHighlights: [
        {
          title: "Relational Schema Design & Normalization",
          description:
            "Structured modeling of automotive entities (vehicles, service logs, customer profiles) as normalized relational tables with enforced foreign key relationships.",
          icon: "schema",
        },
        {
          title: "Server-Side Data Logic & Validation",
          description:
            "PHP backend handling form sanitization, transactional record integrity, and parameterized queries executed against the MySQL database.",
          icon: "code",
        },
        {
          title: "Complete Full-Stack CRUD Loop",
          description:
            "End-to-end operational lifecycle from client-side browser forms through Apache HTTP server into MySQL storage and back.",
          icon: "loop",
        },
        {
          title: "Multi-Tier LAMP Stack Orchestration",
          description:
            "Configured and deployed local multi-tier server stack (Apache + MySQL via XAMPP) with schema migration and seed scripts.",
          icon: "dns",
        },
      ],
      technologies: [
        "PHP",
        "MySQL",
        "Apache (XAMPP)",
        "SQL",
        "HTML5",
        "CSS3",
        "Relational Schema Design",
      ],
      useCases: [
        "Automotive service center & garage record management",
        "Vehicle maintenance history tracking",
        "Foundational relational database engineering demonstration",
        "Multi-tier LAMP architecture reference",
      ],
    },
  },
  {
    id: "alphamind",
    title: "AlphaMind — Quantitative & Fundamental Stock Analysis Platform",
    shortTitle: "AlphaMind",
    eyebrow: "FinTech & Quantitative Research",
    shortDescription:
      "A full-stack equity research platform combining technical indicators, fundamental scoring, and an algebraic 6-tier ROE fallback cascade to overcome free-tier financial data degradation.",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    gradientStyle:
      "radial-gradient(at 20% 15%, rgba(16, 185, 129, 0.9) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(20, 184, 166, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(6, 182, 212, 0.75) 0px, transparent 55%), linear-gradient(135deg, #064e3b 0%, #047857 50%, #0e7490 100%)",
    accentColor: "emerald",
    meta: "FastAPI · Pandas · SQLAlchemy · ReportLab · Finnhub · React 19",
    fullDetails: {
      tagline: "Algebraic Fundamental Recovery & Multi-Signal Equity Research Engine",
      whatItDoes:
        "Given a stock symbol, AlphaMind computes both technical signals (14-period RSI, SMA 50/200 golden-cross/death-cross detection, 6-month price momentum, volume breakout ratios) and a fundamental health score, then combines them into a single weighted recommendation (60% fundamental / 40% technical → Strong Buy through Avoid).\n\nRather than silently reporting broken zero values when free-tier financial APIs fail on smaller-cap equities, AlphaMind falls back through a 6-tier derivation cascade: live API data → verified catalog of 60+ NSE blue-chips → algebraic derivation of ROE from (P/B)/(P/E) ratios → EPS and book value → ROA scaled by leverage → operating margin. It also produces formatted PDF outputs including weekly executive market digests and commercial tax invoices built with custom two-pass ReportLab canvases.",
      whyItMatters:
        "Free-tier financial APIs frequently return incomplete or zeroed fundamentals on mid- and small-cap equities. Solving data degradation through rigorous financial-math algebra ((P/B)/(P/E) = EPS/Book-Value-per-Share = ROE) provides quantitative resilience and integrity without relying on hardcoded placeholders. (Outputs are framed strictly for informational research, not direct financial advisory).",
      technicalHighlights: [
        {
          title: "6-Tier Fundamental Derivation Cascade",
          description:
            "Algebraic fallback pipeline resolving missing ROE metrics across 6 cascading tiers (live feeds → verified blue-chips → (P/B)/(P/E) algebra → EPS/Book Value → ROA × Leverage → Operating Margin).",
          icon: "calculate",
        },
        {
          title: "Weighted Multi-Signal Scoring Engine",
          description:
            "Combines 60% fundamental health ratios with 40% technical momentum indicators (14-period RSI, 50/200 SMA golden-cross, volume breakout ratios).",
          icon: "monitoring",
        },
        {
          title: "Two-Pass ReportLab PDF Engine",
          description:
            "Generates executive weekly market digests and commercial tax invoices with custom two-pass canvas numbering for precise 'Page X of Y' pagination.",
          icon: "picture_as_pdf",
        },
        {
          title: "Layered FastAPI & Enterprise Auth Architecture",
          description:
            "Cleanly segmented service layers (providers, services, schemas, models) backed by OAuth2 + JWT authentication, bcrypt hashing, SQLAlchemy, and Alembic migrations.",
          icon: "layers",
        },
      ],
      technologies: [
        "FastAPI",
        "SQLAlchemy",
        "Alembic",
        "Pandas",
        "ReportLab",
        "yfinance",
        "Finnhub",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
      ],
      useCases: [
        "Retail equity research & portfolio risk monitoring",
        "Quantitative fundamental screening for NSE & global equities",
        "Resilient fallback pipeline architecture for degraded third-party data feeds",
        "Automated institutional-grade PDF market digest generation",
      ],
    },
  },
  {
    id: "billflow",
    title: "BillFlow — Type-Safe Invoicing & SaaS Billing Engine",
    shortTitle: "BillFlow",
    eyebrow: "FinTech & Billing Infrastructure",
    shortDescription:
      "A type-safe billing and invoicing engine with historical snapshot immutability, PostgreSQL Row-Level Security, and server-side PDF compilation.",
    gradient: "from-indigo-600 via-blue-700 to-purple-700",
    gradientStyle:
      "radial-gradient(at 20% 15%, rgba(99, 102, 241, 0.9) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(59, 130, 246, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(139, 92, 246, 0.8) 0px, transparent 55%), linear-gradient(135deg, #312e81 0%, #1d4ed8 50%, #581c87 100%)",
    accentColor: "blue",
    meta: "Next.js 15 · Supabase (PostgreSQL + RLS) · TypeScript · @react-pdf",
    fullDetails: {
      tagline: "Immutable Financial Snapshotting & Decoupled SaaS Billing Architecture",
      whatItDoes:
        "Businesses manage a customer directory, build invoices through a dynamic line-item editor (with live subtotal, tax, and discount math as you type), and generate professional A4 PDF invoices rendered server-side. The dashboard surfaces essential billing metrics: paid revenue, outstanding balances split by sent vs. overdue, draft counts, and recent activity.\n\nEngineered with a decoupled architecture designed to serve as the foundational billing and subscription layer across larger multi-product SaaS ecosystems.",
      whyItMatters:
        "Standard CRUD invoicing tools often break historical audit trails by referencing live customer foreign keys. BillFlow implements historical snapshot integrity: business and customer metadata are copied directly into the invoice record at creation time, ensuring that future address or GST edits never retroactively alter issued legal documents.",
      technicalHighlights: [
        {
          title: "Server-Side Transactional Recalculation",
          description:
            "Recalculates and validates all monetary totals within a database transaction prior to commit — client-side browser math is treated strictly as transient UI feedback.",
          icon: "account_balance",
        },
        {
          title: "Immutable Historical Data Snapshotting",
          description:
            "Copies business and client profiles into invoice headers at issuance, preserving tax compliance and audit accuracy against future profile edits.",
          icon: "history_edu",
        },
        {
          title: "PostgreSQL Row-Level Security (RLS)",
          description:
            "Enforces strict multi-tenant access control at the database layer (auth.uid() = user_id) on every table, eliminating reliance on application-layer permission guards alone.",
          icon: "shield",
        },
        {
          title: "Server-Side A4 PDF Streaming",
          description:
            "Compiles and renders dynamic A4 PDF invoices server-side via @react-pdf/renderer, streamed through authenticated API endpoints.",
          icon: "picture_as_pdf",
        },
        {
          title: "Domain-Driven Module Architecture",
          description:
            "Features a clean domain structure (features/auth, features/invoices, features/customers) with end-to-end TypeScript types and shadcn/ui design primitives.",
          icon: "folder_supervised",
        },
      ],
      technologies: [
        "Next.js 15 (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Supabase (PostgreSQL + RLS)",
        "@react-pdf/renderer",
      ],
      useCases: [
        "Small business invoicing & receivables tracking",
        "Immutable financial-record reference architectures",
        "Pluggable billing subsystem for multi-product SaaS ecosystems",
        "Tax-compliant commercial invoice generation with GST/VAT support",
      ],
    },
  },
  {
    id: "ai-finance-manager",
    title: "AI Finance Manager — Personal Finance Tracker with Automated Receipt Scanning",
    shortTitle: "Finance Manager",
    eyebrow: "FinTech & Multimodal AI",
    shortDescription:
      "A smart personal finance tracker combining multimodal Gemini receipt scanning, automated Inngest background workflows, Clerk auth, and Arcjet security hardening.",
    gradient: "from-teal-500 via-emerald-600 to-cyan-700",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(20, 184, 166, 0.9) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(52, 211, 153, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(6, 182, 212, 0.75) 0px, transparent 55%), linear-gradient(135deg, #134e4a 0%, #065f46 50%, #0891b2 100%)",
    accentColor: "teal",
    meta: "Next.js 15 · Gemini Vision · Prisma · Inngest · Arcjet · Resend",
    fullDetails: {
      tagline: "Multimodal Receipt Parsing & Asynchronous Financial Workflow Automation",
      whatItDoes:
        "Users manage multiple accounts (current, savings), track transactions, and configure granular category budgets. The core differentiator is zero-friction receipt scanning: users upload a photo of a physical receipt, and Google Gemini extracts the amount, transaction date, merchant name, and category automatically, creating a categorized transaction without manual data entry.\n\nRecurring transactions, budget threshold checks, and monthly insight generation run as asynchronous background jobs (via Inngest) rather than on the request cycle, keeping the UI instantly responsive. Budget alerts and monthly summary reports are compiled via React Email and delivered through Resend.",
      whyItMatters:
        "Manual transaction entry is the primary friction point causing users to abandon personal budgeting tools. Automating data capture via multimodal vision LLM extraction addresses the core drop-off vector with real utility, rather than superficial conversational wrappers.",
      technicalHighlights: [
        {
          title: "Multimodal Gemini Receipt Extraction",
          description:
            "Direct vision LLM extraction from receipt photographs into structured JSON schemas (merchant, date, line items, taxes, category) with zero manual input.",
          icon: "document_scanner",
        },
        {
          title: "Decoupled Inngest Background Queue",
          description:
            "Offloads recurring transaction scheduling, budget threshold evaluations, and periodic digest compilation to an asynchronous Inngest worker pipeline.",
          icon: "schedule_send",
        },
        {
          title: "Arcjet Security Hardening & Rate Limiting",
          description:
            "Protects critical financial mutation endpoints with Arcjet bot detection, attack analysis, and rate-limiting rules alongside Clerk user authentication.",
          icon: "security",
        },
        {
          title: "React Email & Resend Delivery Pipeline",
          description:
            "Automates scheduled email notifications for budget limit warnings and monthly executive spending digests using React Email and Resend.",
          icon: "mail",
        },
      ],
      technologies: [
        "Next.js 15 (App Router)",
        "React 19",
        "Prisma ORM",
        "PostgreSQL",
        "Google Gemini (Vision)",
        "Inngest",
        "Arcjet",
        "Clerk Auth",
        "Resend",
        "React Email",
        "Tailwind CSS",
        "shadcn/ui",
      ],
      useCases: [
        "Personal budgeting and automated expense tracking",
        "Zero-manual-entry receipt scanning workflows",
        "Reference architecture for multimodal AI extraction + async background job queues",
        "Automated monthly financial digests & budget threshold alerts",
      ],
    },
  },
  {
    id: "mule-account-detection",
    title: "Mule Account Detection — Money Laundering Detection Pipeline",
    shortTitle: "Mule Detection",
    eyebrow: "Applied ML & AML Fraud Forensics",
    shortDescription:
      "An enterprise anti-money laundering ML pipeline analyzing 16GB+ and ~400M transactions with 187 engineered features across LightGBM and XGBoost ensembles (0.9830 AUC-ROC).",
    gradient: "from-rose-600 via-pink-700 to-red-800",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(244, 63, 94, 0.95) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(236, 72, 153, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(225, 29, 72, 0.8) 0px, transparent 55%), linear-gradient(135deg, #881337 0%, #9f1239 50%, #4c0519 100%)",
    accentColor: "rose",
    meta: "LightGBM · XGBoost · 400M+ Txns · 0.9830 AUC · PyArrow",
    fullDetails: {
      tagline: "Large-Scale Relational Feature Engineering & High-Imbalance AML Forensics",
      whatItDoes:
        "187 engineered features feed two gradient-boosted models (LightGBM and XGBoost), combined into an ensemble, trained on 96,091 labeled accounts (2.8% mule rate — a realistic, heavily imbalanced fraud-detection setting) and scored on 64,062 held-out test accounts. Each test account receives a calibrated mule-probability score plus a predicted suspicious-activity time window derived from 16GB+ and ~400 million raw transactions joined across customer KYC, account attributes, branch metadata, and product tables over a 5-year window.",
      whyItMatters:
        "Demonstrates applied AML fraud detection at enterprise scale under real-world conditions: extreme class imbalance (2.8%), multi-table relational joins, and deliberate label noise. Both gradient-boosted architectures converge independently to 0.982+ AUC on transaction behavior signals alone, verifying feature engineering robustness without post-hoc data leakage.",
      results: {
        metrics: [
          { label: "LightGBM AUC", value: "0.9822" },
          { label: "XGBoost AUC", value: "0.9827" },
          { label: "Ensemble AUC-ROC", value: "0.9830" },
        ],
        notes:
          "Best F1 threshold optimized at 0.82 for 2.8% positive class rate. Evaluated on 64,062 held-out accounts across a 5-year relational banking ledger.",
      },
      technicalHighlights: [
        {
          title: "187-Feature Multi-Table Engineering Pipeline",
          description:
            "Constructs 187 behavioral, velocity, and relational features across 16GB+ of raw data (~400M transactions joined with customer KYC, account structures, and branch metadata).",
          icon: "query_stats",
        },
        {
          title: "Dual Gradient-Boosted Model Ensemble",
          description:
            "LightGBM (0.9822 AUC) and XGBoost (0.9827 AUC) trained and compared independently, combined into an ensemble achieving 0.9830 AUC-ROC.",
          icon: "model_training",
        },
        {
          title: "Calibrated F1 Threshold Optimization (0.82)",
          description:
            "Threshold selection calibrated specifically for severe class imbalance (~2.8% positive mule rate) rather than naive 0.5 default cuts.",
          icon: "tune",
        },
        {
          title: "Robustness Under Injected Label Noise",
          description:
            "Engineered against synthetic and injected label noise, ensuring features generalize from subtle behavioral patterns rather than overfitting noisy ground truth.",
          icon: "verified_user",
        },
        {
          title: "High-Performance PyArrow Vectorized Pipeline",
          description:
            "Processes multi-gigabyte financial transaction logs with memory-mapped vectorized batching and optimized column-oriented I/O.",
          icon: "speed",
        },
      ],
      technologies: [
        "Python",
        "LightGBM",
        "XGBoost",
        "PyArrow",
        "Pandas",
        "scikit-learn",
        "NumPy",
        "Relational Feature Engineering",
      ],
      useCases: [
        "Anti-Money Laundering (AML) transaction monitoring",
        "Mule account ring & illicit fund flow forensics",
        "High-volume financial fraud detection at 100M+ transaction scale",
        "Reference architecture for modeling extreme class imbalance & label noise",
      ],
    },
  },
  {
    id: "fitbuddy",
    title: "FitBuddy — Voice-Controlled Workout Assistant",
    shortTitle: "FitBuddy",
    eyebrow: "VoiceTech & Health Informatics",
    shortDescription:
      "A hands-free, voice-controlled workout companion that generates dynamic exercise routines, manages timed sets, and delivers vocal countdown cues without requiring touch interaction.",
    gradient: "from-orange-500 via-amber-600 to-red-700",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(249, 115, 22, 0.95) 0px, transparent 55%), radial-gradient(at 85% 25%, rgba(239, 68, 68, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(234, 88, 12, 0.8) 0px, transparent 55%), linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #7f1d1d 100%)",
    accentColor: "orange",
    meta: "Streamlit · SpeechRecognition · pyttsx3 · Altair · Python",
    fullDetails: {
      tagline: "Hands-Free Voice-Operated Interval Training & Workout Pacing",
      whatItDoes:
        "Athletes speak a target muscle group ('chest', 'legs') or start commands ('okay start'), and FitBuddy generates a balanced routine (selecting 3 randomized exercises per muscle group). It then paces athletes through timed 30-second exercise sets with audible vocal countdown cues via local text-to-speech — keeping athletes focused without needing to touch or glance at a phone screen mid-set. A session log tracks cumulative workout duration and frequency, visualized through dynamic Altair charts.",
      whyItMatters:
        "Voice interaction addresses a genuine physical ergonomics problem: checking a phone screen between sets breaks workout tempo and rhythm. Hands-free vocal pacing keeps athletes in continuous physical flow. (Operates with session-scoped in-memory state in Streamlit).",
      technicalHighlights: [
        {
          title: "Bi-Directional Hands-Free Voice Loop",
          description:
            "Voice command recognition (Google Speech API via SpeechRecognition) paired with local offline text-to-speech synthesis (pyttsx3) for a completely touchless training loop.",
          icon: "mic",
        },
        {
          title: "Synchronized Vocal Countdown Pacing",
          description:
            "Real-time interval set timers coupled with spoken countdown cues, keeping athletes focused on movement technique and posture without visual distraction.",
          icon: "timer",
        },
        {
          title: "Dynamic Muscle-Group Routine Assembly",
          description:
            "Algorithmic routine generation that randomly samples distinct exercises per muscle group, avoiding repetitive and static training regimens.",
          icon: "fitness_center",
        },
        {
          title: "Interactive Session Telemetry with Altair",
          description:
            "Visualizes training duration, set frequency, and workout intensity distributions dynamically using declarative Altair chart specifications.",
          icon: "bar_chart",
        },
      ],
      technologies: [
        "Python",
        "Streamlit",
        "SpeechRecognition",
        "Google Speech API",
        "pyttsx3 (TTS)",
        "Altair",
        "Pandas",
      ],
      useCases: [
        "Hands-free home workout & calisthenics coaching",
        "Touchless interval training & set pacing",
        "Voice-driven human-computer interaction (HCI) in Python/Streamlit",
        "Accessible assistive fitness guidance for visually impaired users",
      ],
    },
  },
  {
    id: "linux-ssh-cli",
    title: "Linux Command System via SSH — Remote OS Control from the Terminal",
    shortTitle: "Linux SSH CLI",
    eyebrow: "Systems & Remote Administration",
    shortDescription:
      "An interactive Python CLI tool for administering remote Linux nodes over SSH — handling file operations, user accounts, and package lifecycles.",
    gradient: "from-green-500 via-emerald-600 to-teal-700",
    gradientStyle:
      "radial-gradient(at 20% 15%, rgba(34, 197, 94, 0.9) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(16, 185, 129, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(6, 182, 212, 0.75) 0px, transparent 55%), linear-gradient(135deg, #14532d 0%, #065f46 50%, #042f2e 100%)",
    accentColor: "emerald",
    meta: "Python · SSH · Linux Shell · Remote Administration",
    fullDetails: {
      tagline: "Interactive Terminal-Based Remote Node Administration over SSH",
      whatItDoes:
        "Log in with a username and IP address, then issue commands (list files, read/write/delete files, add/delete users, install packages via yum, modify permissions) through an interactive CLI that translates each request into the equivalent remote shell operation over SSH.",
      whyItMatters:
        "A hands-on exploration of SSH-based remote system administration — the mechanics of driving another machine's filesystem and user management from a local script, foundational to understanding how remote ops and automation tooling work underneath higher-level frameworks (serves as the mechanical foundation that directly informed SYNAPSE's verified infrastructure control agent).",
      technicalHighlights: [
        {
          title: "Interactive Remote Shell Bridge",
          description:
            "Translates interactive local CLI requests into remote POSIX shell operations executed over an active SSH session.",
          icon: "terminal",
        },
        {
          title: "User & Permission Administration",
          description:
            "Remote user lifecycle management (useradd, userdel, passwd) and POSIX file permission modifications (chmod, chown) across remote Linux nodes.",
          icon: "manage_accounts",
        },
        {
          title: "Remote Package & Service Orchestration",
          description:
            "Automates remote binary installation and repository package management via package managers (yum/dnf) without opening separate terminal windows.",
          icon: "deployed_code",
        },
        {
          title: "Foundational Systems Engineering Insight",
          description:
            "Demonstrates low-level SSH protocol mechanics and remote process execution — representing the foundational proof-of-concept work that directly informed SYNAPSE's verified safety gates.",
          icon: "precision_manufacturing",
        },
      ],
      technologies: [
        "Python",
        "SSH",
        "Linux Shell",
        "POSIX File Systems",
        "Package Management (yum/dnf)",
        "Terminal CLI",
      ],
      useCases: [
        "Personal homelab & local test VM administration",
        "Interactive remote server triage from a unified CLI",
        "Foundational demonstration of remote process execution",
        "Educational reference for building toward hardened automation tooling",
      ],
    },
  },
  {
    id: "fitladder",
    title: "Fitladder — Fitness, Workout & Body Recomposition Tracker",
    shortTitle: "Fitladder",
    eyebrow: "Mobile Engineering & Offline-First Tech",
    shortDescription:
      "An offline-first Flutter mobile application for tracking 6-day structured workout programs, macro-budget meal recommendations, and body recomposition metrics.",
    gradient: "from-purple-600 via-fuchsia-600 to-indigo-700",
    gradientStyle:
      "radial-gradient(at 15% 15%, rgba(168, 85, 247, 0.9) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(236, 72, 153, 0.85) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(99, 102, 241, 0.8) 0px, transparent 55%), linear-gradient(135deg, #581c87 0%, #701a75 50%, #312e81 100%)",
    accentColor: "violet",
    meta: "Flutter (SDK 3.x) · Riverpod · Offline-First · SharedPreferences",
    fullDetails: {
      tagline: "Local-First Biometric Tracking & Structured Strength Programming",
      whatItDoes:
        "Features a 6-day structured workout split (push/pull/legs/hypertrophy/conditioning) with animated exercise demonstrations and per-set weight/rep logging. A calorie tracker matches remaining daily calorie budgets against a preset food database (eggs, whey, paneer, chicken, oats, rice, custom entries) to suggest specific meals that fit what's left of the day's budget, plus structured 7-day high-protein/eggetarian diet plans. A client profile view tracks current vs. target weight and body fat percentage with a dynamic progress gauge, and a membership module handles gym check-in via QR pass and plan comparison.",
      whyItMatters:
        "The offline-first architecture is engineered for the real physical environment: gym basements frequently lack cellular connectivity. Structuring state, local JSON persistence, and calculations to run 100% locally ensures zero downtime during workouts, with planned roadmap expansion for on-device edge AI coaching.",
      technicalHighlights: [
        {
          title: "100% Offline-First Architecture",
          description:
            "Engineered with Riverpod reactive state management and SharedPreferences JSON serialization, operating with zero network dependencies in low-connectivity gym environments.",
          icon: "signal_wifi_off",
        },
        {
          title: "Structured 6-Day Program & Animation Engine",
          description:
            "Comprehensive 6-day split (Push/Pull/Legs/Hypertrophy/Conditioning) with per-exercise animation assets and real-time set/rep logging.",
          icon: "fitness_center",
        },
        {
          title: "Macro-Budget Meal Allocation Engine",
          description:
            "Budget-matching nutrition algorithm that calculates remaining daily calories and macros to recommend optimal whole-food meal combinations.",
          icon: "restaurant",
        },
        {
          title: "Client Biometrics & QR Check-In Pass",
          description:
            "Body recomposition tracking (weight, body fat %, muscle mass gauges) paired with digital QR gym check-in passes and membership tier management.",
          icon: "qr_code_2",
        },
        {
          title: "Modular Feature-First Flutter Design",
          description:
            "Cleanly separated domain modules (features/dashboard, features/nutrition, features/workout) engineered for seamless on-device LLM coaching integration.",
          icon: "apps",
        },
      ],
      technologies: [
        "Flutter (SDK 3.x)",
        "Dart",
        "Riverpod",
        "SharedPreferences",
        "JSON Serialization",
        "Mobile UI Architecture",
      ],
      useCases: [
        "Offline-first personal workout & strength training logging",
        "Macro and calorie budgeting with dynamic meal matching",
        "Body recomposition & biometric goal tracking",
        "Gym facility check-in and membership management",
      ],
    },
  },
];

export function getAllProjects() {
  return STUDIO_PROJECTS;
}

export function getProjectById(id) {
  return STUDIO_PROJECTS.find((p) => p.id === id) || null;
}
