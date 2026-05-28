export const SERVICES_DATA = {
  "web-development": {
    id: "web-development",
    title: "Web Development",
    shortTitle: "Web",
    summary: "High-performance web applications engineered for scale.",
    description: "We architect resilient, globally scalable web applications using modern decoupled architectures. Our web solutions deliver lightning-fast performance, elite security, and seamless user experiences across all devices.",
    icon: "language",
    color: "primary",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    problems: [
      { title: "Legacy Technical Debt", desc: "We modernize monolithic architectures, refactoring codebases into agile, microservices-driven ecosystems that reduce maintenance costs." },
      { title: "Scalability Bottlenecks", desc: "Designing infrastructure capable of handling exponential traffic growth without compromising load times or user experience." },
      { title: "User Retention", desc: "Engineering fluid, intuitive interfaces that reduce friction and increase engagement metrics across complex enterprise platforms." }
    ],
    capabilities: [
      { title: "Frontend Engineering", desc: "Immersive, 60fps glassmorphic interfaces using React and Framer Motion." },
      { title: "Backend Systems", desc: "High-throughput Node.js architectures capable of processing millions of concurrent requests." },
      { title: "Full-Stack Architecture", desc: "Seamless integration of decoupled frontends with resilient cloud-native backends." },
      { title: "API Ecosystems", desc: "REST and GraphQL gateways that serve as the connective tissue of your business." }
    ],
    workflow: [
      { phase: "01", title: "Discovery", desc: "Deep architectural audit and strategic business alignment." },
      { phase: "02", title: "System Planning", desc: "Mapping data models, API contracts, and infrastructure topology." },
      { phase: "03", title: "UX Architecture", desc: "Designing the interaction layer for optimal cognitive ease." },
      { phase: "04", title: "Engineering", desc: "Concurrent frontend and backend development with rigorous automated testing." },
      { phase: "05", title: "Deployment", desc: "Zero-downtime CI/CD orchestration and cloud provisioning." },
      { phase: "06", title: "Scaling", desc: "Continuous performance monitoring and elastic capacity management." }
    ],
    solutions: [
      { title: "Enterprise SaaS Platforms", desc: "Multi-tenant architectures with row-level security and subscription logic." },
      { title: "Custom Dashboards", desc: "Real-time telemetry and analytics visualization portals." },
      { title: "B2B Marketplaces", desc: "High-transaction volume platforms with complex payment routing." }
    ],
    metrics: [
      { value: "< 1s", label: "Page Load Time" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "100", label: "Lighthouse Score" },
      { value: "0", label: "Security Breaches" }
    ],
    faqs: [
      { q: "What is your typical technology stack?", a: "We primarily utilize the Next.js/React ecosystem for frontends, backed by Node.js or Go, using PostgreSQL databases and AWS/GCP infrastructure." },
      { q: "Do you handle post-launch maintenance?", a: "Yes. We offer Enterprise Support SLAs that include 24/7 monitoring, security patching, and ongoing performance optimization." },
      { q: "How do you ensure scalability?", a: "We employ microservices architectures, containerization (Docker/Kubernetes), and edge caching to ensure your application scales infinitely." }
    ],
    caseStudyPreview: {
      client: "Global Logistics Corp",
      result: "Reduced data query latency by 400% and enabled real-time fleet tracking across 5 continents.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "mobile-apps": {
    id: "mobile-apps",
    title: "Mobile Apps",
    shortTitle: "Mobile",
    summary: "Native and cross-platform luxury UX.",
    description: "Our mobile engineering teams build tactical, sensor-rich applications. We focus on 60fps fluid animations, offline resilience, and secure biometric integrations to deliver premium mobile experiences.",
    icon: "smartphone",
    color: "tertiary",
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "GraphQL", "Supabase", "Node.js", "AWS"],
    problems: [
      { title: "Fragmented User Experiences", desc: "Unifying disjointed journeys across platforms to create a cohesive, branded ecosystem that feels native on every device." },
      { title: "Performance Bottlenecks", desc: "Optimizing heavy enterprise data rendering, reducing load times, and ensuring fluid 60fps animations even on legacy hardware." },
      { title: "Time-to-Market Delays", desc: "Accelerating deployment cycles through modular architectures and CI/CD pipelines without sacrificing code quality." }
    ],
    capabilities: [
      { title: "Cross-Platform Engineering", desc: "Single codebase, native performance via React Native and Flutter." },
      { title: "Hardware Integration", desc: "Bluetooth, NFC, and biometric authentication pipelines." },
      { title: "Offline Syncing", desc: "Robust local-first databases with background syncing." },
      { title: "Real-Time Systems", desc: "Instant bi-directional data flow for chat, logistics, and live trading." }
    ],
    uxExperience: [
      { title: "Conversion-Focused Flows", desc: "Removing cognitive friction to increase signup rates and engagement." },
      { title: "Accessibility Standards", desc: "Inclusive design systems adhering to strict WCAG guidelines." },
      { title: "Micro-Interactions", desc: "Subtle motion choreography that guides user focus naturally." }
    ],
    workflow: [
      { phase: "01", title: "Product Discovery", desc: "Mapping user personas and technical feasibility." },
      { phase: "02", title: "UX Research", desc: "Validating hypotheses through high-fidelity interactive prototypes." },
      { phase: "03", title: "App Architecture", desc: "Designing state management, local storage, and API consumption layers." },
      { phase: "04", title: "Mobile Engineering", desc: "Executing native or cross-platform code with strict linting standards." },
      { phase: "05", title: "Testing & QA", desc: "Automated test suites on physical device farms (AWS Device Farm)." },
      { phase: "06", title: "Deployment", desc: "Navigating App Store and Play Store review processes smoothly." }
    ],
    solutions: [
      { title: "Consumer FinTech Apps", desc: "Bank-grade security combined with intuitive wealth management interfaces." },
      { title: "Field Operations Tools", desc: "Offline-first tablets and mobile apps for logistics and remote workers." },
      { title: "IoT Companions", desc: "Hardware-connected applications requiring low-latency Bluetooth communication." }
    ],
    metrics: [
      { value: "60fps", label: "Animation Performance" },
      { value: "< 2MB", label: "Core Bundle Size" },
      { value: "99.9%", label: "Crash-Free Rate" },
      { value: "5 Star", label: "App Store Average" }
    ],
    faqs: [
      { q: "Do you build native or cross-platform apps?", a: "We analyze your specific requirements. For maximum performance and hardware access, we use Swift/Kotlin. For rapid time-to-market across iOS and Android, we highly recommend React Native." },
      { q: "Who owns the code?", a: "You do. Upon project completion and final payment, full intellectual property rights and repository access are transferred to your enterprise." },
      { q: "Do you handle App Store submissions?", a: "Yes, we manage the entire provisioning, signing, and submission process for both Apple App Store and Google Play Store." }
    ],
    caseStudyPreview: {
      client: "NeoBank Connect",
      result: "Increased mobile onboarding conversions by 312% and achieved a 99.98% crash-free session rate across 2 million users.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "saas-platforms": {
    id: "saas-platforms",
    title: "SaaS Platforms",
    shortTitle: "SaaS",
    summary: "End-to-end multi-tenant architectures.",
    description: "We architect scalable multi-tenant SaaS platforms engineered for extreme resilience, global scale, and seamless performance. Transform your operational capacity with next-generation platform engineering.",
    icon: "auto_awesome",
    color: "primary",
    technologies: ["Next.js", "Node.js", "Stripe", "AWS", "Docker", "PostgreSQL", "Tailwind", "Redis"],
    problems: [
      { title: "Multi-Tenant Limitations", desc: "Isolating tenant data securely without compromising horizontal database scalability or performance." },
      { title: "Fragmented Subscriptions", desc: "Complex billing engines, tiered pricing, and usage metering causing integration nightmares." },
      { title: "Infrastructure Bottlenecks", desc: "Monolithic systems that crash during high traffic, causing unacceptable SLA breaches and churn." }
    ],
    capabilities: [
      { title: "Multi-Tenant Architecture", desc: "Row-level security and siloed database models ensuring absolute data isolation." },
      { title: "Billing Infrastructure", desc: "Complex usage-based, tiered, and freemium subscription Stripe architectures." },
      { title: "RBAC & Permissions", desc: "Granular Role-Based Access Control and authentication systems." },
      { title: "Admin Dashboards", desc: "Real-time telemetry, user management, and system health portals." }
    ],
    architectureSystems: [
      { title: "Cloud-Native Infrastructure", desc: "Containerized microservices orchestrated via Kubernetes for elastic scaling." },
      { title: "Tenant Isolation", desc: "Logical separation via PostgreSQL row-level security or physical database siloing." },
      { title: "API Gateway", desc: "Centralized routing, rate-limiting, and GraphQL federation for internal services." }
    ],
    infrastructure: [
      { title: "Subscription Engine", desc: "Automated billing lifecycles, dunning management, and complex proration handling." },
      { title: "Telemetry & Analytics", desc: "Event-driven tracking pipelines feeding into centralized data warehouses." },
      { title: "Automated Onboarding", desc: "Frictionless sign-up flows with intelligent provisioning and email sequencing." }
    ],
    workflow: [
      { phase: "01", title: "Platform Architecture", desc: "Defining tenant models, database schemas, and infrastructure topology." },
      { phase: "02", title: "UX & Product Systems", desc: "Designing intuitive dashboards and conversion-focused onboarding flows." },
      { phase: "03", title: "SaaS Engineering", desc: "Building the core multi-tenant logic and integrating billing systems." },
      { phase: "04", title: "Infrastructure Integration", desc: "Provisioning AWS/GCP resources via Terraform and establishing CI/CD." },
      { phase: "05", title: "QA & Security", desc: "Rigorous penetration testing, SOC2 compliance checks, and load testing." },
      { phase: "06", title: "Growth & Optimization", desc: "Continuous monitoring, A/B testing, and feature flag management." }
    ],
    solutions: [
      { title: "B2B Enterprise SaaS", desc: "Mission-critical operations platforms with complex organizational structures." },
      { title: "Analytics Ecosystems", desc: "Real-time data visualization platforms processing millions of events." },
      { title: "AI-Powered Products", desc: "Generative AI wrappers with robust subscription and token-metering." }
    ],
    metrics: [
      { value: "99.99%", label: "Uptime SLA Guarantee" },
      { value: "0ms", label: "Downtime Deployments" },
      { value: "SOC2", label: "Compliance Ready" },
      { value: "100%", label: "Tenant Data Isolation" }
    ],
    faqs: [
      { q: "How do you handle multi-tenant databases?", a: "We employ either logical separation (Row-Level Security in PostgreSQL) or physical separation (isolated schemas/DBs) depending on your strict compliance and scaling requirements." },
      { q: "Can you integrate with our existing CRM/ERP?", a: "Absolutely. We build custom API middlewares and webhooks to synchronize your SaaS data seamlessly with Salesforce, HubSpot, or bespoke ERPs." },
      { q: "What billing providers do you support?", a: "We specialize in deep integrations with Stripe Billing, Paddle, and Chargebee, handling complex usage-based metering and global tax compliance." }
    ],
    caseStudyPreview: {
      client: "OmniMetrics Cloud",
      result: "Engineered a scalable multi-tenant architecture that supported a 500% increase in recurring revenue with zero infrastructure downtime.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "ai-ml-solutions": {
    id: "ai-ml-solutions",
    title: "AI & ML Solutions",
    shortTitle: "AI & ML",
    summary: "Predictive models and intelligent automation.",
    description: "Transform raw data into predictive power. We architect and deploy high-performance machine learning models designed to solve complex enterprise challenges with clinical precision and scalable infrastructure.",
    icon: "psychology",
    color: "secondary",
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Pinecone", "LangChain", "AWS SageMaker", "HuggingFace"],
    problems: [
      { title: "Manual Repetitive Workflows", desc: "Human bottlenecks in document processing and operational decisions driving up costs and error rates." },
      { title: "Fragmented Business Data", desc: "Terabytes of unstructured data sitting in silos, completely unused for strategic intelligence." },
      { title: "Lack of Predictive Systems", desc: "Operating reactively rather than anticipating market shifts, customer churn, and supply chain disruptions." }
    ],
    capabilities: [
      { title: "Retrieval-Augmented Generation (RAG)", desc: "Enterprise chat systems grounded securely in your proprietary company data." },
      { title: "Predictive Analytics", desc: "Time-series forecasting models for demand, churn, and financial performance." },
      { title: "Document Intelligence", desc: "Automated OCR and NLP pipelines extracting structured data from PDFs and contracts." },
      { title: "Recommendation Engines", desc: "Deep learning models personalizing user experiences and increasing LTV." }
    ],
    aiEcosystem: [
      { title: "Data Ingestion", desc: "Automated ETL pipelines connecting CRM, ERP, and product databases." },
      { title: "Vector Embeddings", desc: "High-dimensional data mapping stored in optimized vector databases like Pinecone." },
      { title: "Model Inference", desc: "Low-latency API layers serving LLMs and custom predictive models." }
    ],
    mlInfrastructure: [
      { title: "Training Pipelines", desc: "Distributed GPU clusters orchestrated via Kubernetes and Ray." },
      { title: "Model Orchestration", desc: "LangChain and LlamaIndex architectures for complex agentic workflows." },
      { title: "MLOps & Monitoring", desc: "Continuous model drift detection and automated retraining triggers." }
    ],
    workflow: [
      { phase: "01", title: "Data Discovery", desc: "Auditing existing data lakes and establishing data governance protocols." },
      { phase: "02", title: "AI Strategy", desc: "Defining ROI-driven use cases, selecting base models, and planning infrastructure." },
      { phase: "03", title: "Dataset Engineering", desc: "Cleaning, labeling, and structuring data into vector embeddings." },
      { phase: "04", title: "Model Development", desc: "Fine-tuning open-source models or building custom deep learning architectures." },
      { phase: "05", title: "Testing & Validation", desc: "Rigorous testing against bias, hallucinations, and edge-case anomalies." },
      { phase: "06", title: "Monitoring & Scaling", desc: "Deploying via robust MLOps pipelines with real-time performance telemetry." }
    ],
    solutions: [
      { title: "Enterprise AI Copilots", desc: "Internal contextual assistants trained on company wikis, Jira, and Slack data." },
      { title: "Automated Compliance Auditing", desc: "NLP systems scanning thousands of transactions for regulatory anomalies." },
      { title: "Predictive Logistics", desc: "ML models optimizing routing and inventory based on weather and market data." }
    ],
    metrics: [
      { value: "99.8%", label: "Prediction Accuracy" },
      { value: "< 50ms", label: "Inference Latency" },
      { value: "Zero", label: "Data Leakage" },
      { value: "SOC2", label: "AI Governance" }
    ],
    faqs: [
      { q: "Do you use OpenAI or build custom models?", a: "We remain model-agnostic. For rapid reasoning tasks, we leverage OpenAI/Anthropic APIs via secure enterprise endpoints. For sensitive data or specialized tasks, we fine-tune open-source models (Llama, Mistral) deployed on your private cloud." },
      { q: "Is our data safe from being used to train public AI?", a: "100%. We enforce strict zero-retention policies with commercial LLM providers and utilize VPCs for local model hosting. Your data never leaves your enterprise boundary." },
      { q: "What is RAG and why do we need it?", a: "RAG (Retrieval-Augmented Generation) allows an AI to read your specific documents before answering a question, eliminating 'hallucinations' and ensuring responses are factual and context-aware." }
    ],
    caseStudyPreview: {
      client: "Global Logistics Inc.",
      result: "Deployed a predictive routing ML model that reduced supply chain delays by 34% and automated 80% of manual dispatching tasks.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "automation-systems": {
    id: "automation-systems",
    title: "Automation Systems",
    shortTitle: "Automation",
    summary: "RPA and workflow orchestration to eliminate operational bottlenecks.",
    description: "Unlock hyper-automation and achieve unparalleled operational excellence. We architect intelligent systems that eliminate friction, reduce risk, and scale seamlessly across your entire business.",
    icon: "account_tree",
    color: "primary",
    technologies: ["Temporal", "AWS Step Functions", "Zapier Enterprise", "Make", "Node.js", "Python", "Apache Airflow", "Kafka"],
    problems: [
      { title: "Operational Inefficiency", desc: "Identify and eliminate bottlenecks with automated workflows that ensure constant, optimized output." },
      { title: "Human Error Risks", desc: "Deploy deterministic automation to handle critical repetitive tasks, reducing manual errors to near zero." },
      { title: "Scaling Friction", desc: "Build systems designed to expand effortlessly. Add capacity without proportional increases in overhead." }
    ],
    capabilities: [
      { title: "Workflow Orchestration", desc: "Fault-tolerant, distributed task execution using Temporal and AWS Step Functions." },
      { title: "System Integration", desc: "Connecting disparate legacy APIs into unified, bi-directional data pipelines." },
      { title: "Intelligent RPA", desc: "Screen-scraping and browser automation for legacy systems lacking modern APIs." },
      { title: "Event-Driven Architecture", desc: "Real-time reactive systems powered by Apache Kafka and webhooks." }
    ],
    orchestrationEcosystem: [
      { title: "Event Triggers", desc: "Real-time listeners monitoring CRM updates, payment gateways, and IoT sensors." },
      { title: "Logic Processing", desc: "Serverless functions evaluating conditional statements and routing data." },
      { title: "Action Execution", desc: "Automated API calls mutating data across your enterprise SaaS stack." }
    ],
    automationInfrastructure: [
      { title: "High Availability", desc: "Multi-region deployments ensuring workflows never drop, even during outages." },
      { title: "State Management", desc: "Durable execution engines that remember workflow states across server restarts." },
      { title: "Observability", desc: "Granular logging and distributed tracing for immediate bottleneck identification." }
    ],
    workflow: [
      { phase: "01", title: "Process Discovery", desc: "Deep-dive analysis of existing operational architectures and manual friction points." },
      { phase: "02", title: "Workflow Mapping", desc: "Documenting exact logic flows, edge cases, and required system integrations." },
      { phase: "03", title: "Architecture Design", desc: "Designing scalable, secure integration blueprints using Temporal or Step Functions." },
      { phase: "04", title: "Integration Engineering", desc: "Building secure API connections and configuring data transformation layers." },
      { phase: "05", title: "Testing & Validation", desc: "Rigorous stress testing and simulating failure states to ensure fault tolerance." },
      { phase: "06", title: "Deployment & Monitoring", desc: "Seamless deployment of automated logic sequences with continuous telemetry." }
    ],
    solutions: [
      { title: "Automated Onboarding", desc: "Zero-touch employee and client provisioning across G-Suite, Slack, and Jira." },
      { title: "Financial Reconciliation", desc: "Automated ledger matching across Stripe, banking APIs, and QuickBooks." },
      { title: "Support Ticket Routing", desc: "AI-assisted triage routing complex queries to the correct engineering tiers." }
    ],
    metrics: [
      { value: "99.99%", label: "Workflow Uptime" },
      { value: "10x", label: "Process Acceleration" },
      { value: "Zero", label: "Dropped Events" },
      { value: "End-to-End", label: "Observability" }
    ],
    faqs: [
      { q: "Is this just Zapier?", a: "No. While we use iPaaS tools when appropriate, we specialize in code-first orchestration (Temporal, Airflow) for mission-critical, high-volume enterprise workflows where Zapier would be too fragile or expensive." },
      { q: "What happens if an API fails mid-workflow?", a: "Our architectures are built on 'durable execution'. If a downstream API fails, the workflow simply pauses and retries automatically according to exponential backoff rules, never dropping the transaction." },
      { q: "Can you automate legacy on-premise software?", a: "Yes. We deploy secure hybrid agents and utilize Robotic Process Automation (RPA) to interface with systems that lack modern REST or GraphQL APIs." }
    ],
    caseStudyPreview: {
      client: "FinServe Global",
      result: "Automated their entire KYC compliance pipeline, reducing manual review time from 3 days to 45 seconds while eliminating human transcription errors.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "cloud-devops": {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    summary: "Resilient infrastructure and fluid CI/CD.",
    description: "Architect resilience at scale. We build hyper-scalable, secure cloud infrastructures that empower enterprise agility, eliminate operational bottlenecks, and ensure zero-downtime continuous delivery.",
    icon: "cloud_sync",
    color: "tertiary",
    technologies: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Datadog", "ArgoCD", "Prometheus"],
    problems: [
      { title: "Infrastructure Fragility", desc: "Replace brittle legacy systems with self-healing, highly available cloud-native architectures designed for zero downtime." },
      { title: "Deployment Bottlenecks", desc: "Accelerate time-to-market with automated CI/CD pipelines that ensure rapid, reliable, and secure software delivery." },
      { title: "Scaling Complexity", desc: "Implement intelligent auto-scaling solutions that dynamically allocate resources based on real-time demand, optimizing costs." }
    ],
    capabilities: [
      { title: "Infrastructure as Code", desc: "Declarative, version-controlled cloud provisioning via Terraform and AWS CloudFormation." },
      { title: "Zero-Downtime CI/CD", desc: "Automated testing, containerization, and blue/green deployment pipelines." },
      { title: "Kubernetes Orchestration", desc: "Managing complex microservices with scalable, fault-tolerant cluster architectures." },
      { title: "Cloud Optimization", desc: "Architectural audits to eliminate waste and reduce AWS/GCP expenditure by up to 40%." }
    ],
    cloudArchitecture: [
      { title: "API Gateway & Edge", desc: "Global content delivery, WAF protection, and intelligent traffic routing at the edge." },
      { title: "Microservices Mesh", desc: "Istio-powered service communication ensuring mTLS encryption and granular traffic control." },
      { title: "Distributed Persistence", desc: "Highly available database clusters spanning multiple availability zones for disaster recovery." }
    ],
    cicdInfrastructure: [
      { title: "Continuous Integration", desc: "Automated linting, unit testing, and security scanning on every Git commit." },
      { title: "Artifact Management", desc: "Immutable Docker image registries securing your deployment artifacts." },
      { title: "Progressive Delivery", desc: "Canary releases and automated rollbacks driven by real-time observability metrics." }
    ],
    workflow: [
      { phase: "01", title: "Infrastructure Audit", desc: "Analyzing current architecture for security vulnerabilities and cost inefficiencies." },
      { phase: "02", title: "Architecture Design", desc: "Drafting the ideal cloud-native topology utilizing multi-AZ redundancy." },
      { phase: "03", title: "IaC Implementation", desc: "Translating the architecture into robust, version-controlled Terraform code." },
      { phase: "04", title: "CI/CD Setup", desc: "Building the automated pipelines to safely transition code from repo to production." },
      { phase: "05", title: "Security Hardening", desc: "Implementing IAM least-privilege, network isolation, and continuous vulnerability scanning." },
      { phase: "06", title: "Observability Integration", desc: "Deploying Datadog/Prometheus for 360-degree telemetry and automated alerting." }
    ],
    solutions: [
      { title: "Enterprise Kubernetes", desc: "Production-ready EKS/GKE clusters handling millions of daily requests." },
      { title: "Data Lake Infrastructure", desc: "Scalable S3/Snowflake architectures for massive data analytics." },
      { title: "Serverless Ecosystems", desc: "Event-driven AWS Lambda architectures for highly volatile workloads." }
    ],
    metrics: [
      { value: "99.999%", label: "Uptime Reliability" },
      { value: "0ms", label: "Deployment Downtime" },
      { value: "SOC2/HIPAA", label: "Security Standards" },
      { value: "< 2s", label: "Autoscaling Response" }
    ],
    faqs: [
      { q: "Which cloud providers do you support?", a: "We are cloud-agnostic but hold deep expertise in AWS, Google Cloud Platform (GCP), and Microsoft Azure. We architect solutions tailored to the strengths of your chosen ecosystem." },
      { q: "Do we own the infrastructure code?", a: "Yes. 100%. All Terraform, CI/CD scripts, and Dockerfiles are committed directly to your private repositories. We build it, but you own the keys to the castle." },
      { q: "How do you handle zero-downtime deployments?", a: "By combining Kubernetes rolling updates with Blue/Green or Canary deployment strategies, we shift traffic to new versions only after health checks pass, ensuring users never see a 502 error." }
    ],
    caseStudyPreview: {
      client: "Nexus Global Platforms",
      result: "Migrated a monolithic legacy application to a modern AWS Kubernetes microservices architecture, reducing infrastructure costs by 35% while increasing uptime to 99.999%.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    }
  },
  "ui-ux-design": {
    id: "ui-ux-design",
    title: "UI/UX Design Services",
    shortTitle: "UI/UX",
    summary: "Human-centric engineering for enterprise interfaces.",
    description: "We blend aesthetic excellence with technical rigor, crafting high-performance digital environments that feel effortless and intuitive for enterprise users while driving aggressive conversion metrics.",
    icon: "design_services",
    color: "primary",
    technologies: ["Figma", "Framer", "React", "Storybook", "Tailwind CSS", "Design Tokens", "Radix UI", "WCAG 2.1"],
    problems: [
      { title: "User Friction", desc: "We streamline complex data entries and convoluted navigation paths, transforming tedious tasks into fluid, intuitive interactions." },
      { title: "Inconsistent Branding", desc: "We architect robust design systems that ensure visual and functional unity across every touchpoint, reinforcing brand authority." },
      { title: "Low Conversion", desc: "By applying behavioral psychology and persuasive design patterns, we optimize key funnels to guide users naturally toward desired outcomes." }
    ],
    capabilities: [
      { title: "Enterprise UX Strategy", desc: "Deep-dive user research and journey mapping to align product interfaces with core business objectives." },
      { title: "Design Systems", desc: "Scalable, token-driven component libraries built in Figma and mirrored perfectly in React/Storybook." },
      { title: "High-Fidelity Prototyping", desc: "Interactive, motion-rich prototypes that allow stakeholders to 'feel' the product before a single line of code is written." },
      { title: "Accessibility (a11y)", desc: "Rigorous adherence to WCAG 2.1 AA/AAA standards, ensuring your product is usable by everyone." }
    ],
    designSystem: [
      { title: "Design Tokens", desc: "Semantic variables bridging the gap between Figma styles and CSS variables for instant global updates." },
      { title: "Component Ecosystem", desc: "Atomic design principles applied to create perfectly modular, reusable interface primitives." },
      { title: "Interaction Patterns", desc: "Standardized micro-interactions and motion curves that make the interface feel alive and responsive." }
    ],
    productStrategy: [
      { title: "Behavioral Analysis", desc: "Heatmaps, session recordings, and A/B testing to understand exactly how users navigate your current systems." },
      { title: "Information Architecture", desc: "Restructuring complex taxonomies so users can find what they need in three clicks or less." },
      { title: "Conversion Optimization", desc: "Iterative design sprints focused entirely on lifting onboarding completion and retention rates." }
    ],
    workflow: [
      { phase: "01", title: "Product Discovery", desc: "Stakeholder interviews and competitive analysis to define the product's unique value proposition." },
      { phase: "02", title: "UX Research", desc: "User interviews and persona development to ensure we are solving the right problems." },
      { phase: "03", title: "Wireframing", desc: "Low-fidelity structural layouts defining the information hierarchy without visual distraction." },
      { phase: "04", title: "UI System Design", desc: "Establishing the visual language: typography, color logic, and component styling." },
      { phase: "05", title: "Prototyping", desc: "Connecting the screens into a clickable, high-fidelity simulation of the final product." },
      { phase: "06", title: "Developer Handoff", desc: "Providing meticulously documented Figma files and design tokens for seamless engineering." }
    ],
    solutions: [
      { title: "B2B SaaS Dashboards", desc: "Data-dense interfaces that prioritize clarity and rapid decision-making for power users." },
      { title: "FinTech Experiences", desc: "Trust-inspiring, highly secure transaction flows that simplify complex financial data." },
      { title: "Enterprise Portals", desc: "Internal tools that employees actually want to use, dramatically reducing training time." }
    ],
    metrics: [
      { value: "WCAG 2.1", label: "Accessibility Standards" },
      { value: "100%", label: "Component Reusability" },
      { value: "3x", label: "Faster Dev Handoff" },
      { value: "+45%", label: "Avg. Conversion Lift" }
    ],
    faqs: [
      { q: "Do you only do the design, or do you build it too?", a: "Both. Unlike pure design agencies, our UI/UX team sits next to our React engineers. We design with technical feasibility in mind, and can seamlessly handle the frontend implementation." },
      { q: "What is a Design System?", a: "It's the single source of truth for your product's UI. Instead of designing pages, we design reusable components (buttons, inputs, cards) and rules for how they combine, ensuring perfect consistency." },
      { q: "How do you handle revisions?", a: "Our process is highly iterative. We present wireframes and low-fidelity concepts early and often, ensuring alignment before we invest time in high-fidelity pixel perfection." }
    ],
    caseStudyPreview: {
      client: "OmniHealth Portals",
      result: "Redesigned their legacy electronic health records (EHR) system, reducing physician screen time by 2 hours per shift and improving data entry accuracy by 85%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "enterprise-software": {
    id: "enterprise-software",
    title: "Enterprise Software Engineering",
    shortTitle: "Enterprise",
    summary: "Mission-critical systems and digital transformation.",
    description: "We engineer mission-critical enterprise systems with scalability, operational intelligence, and long-term reliability. We untangle operational complexity by building custom ecosystems that drive your entire business.",
    icon: "corporate_fare",
    color: "primary",
    technologies: ["Java", "Spring Boot", "C# / .NET", "PostgreSQL", "Kafka", "Elasticsearch", "AWS", "Kubernetes"],
    problems: [
      { title: "Technical Debt", desc: "Strategic refactoring and modernization of legacy systems to restore agility without disrupting daily operations." },
      { title: "Operational Fragmentation", desc: "Unifying disparate data silos, spreadsheets, and off-the-shelf applications into a cohesive, interoperable ecosystem." },
      { title: "Scaling Inertia", desc: "Designing elastic, cloud-native architectures that anticipate and effortlessly handle exponential organizational growth." }
    ],
    capabilities: [
      { title: "Custom ERP Systems", desc: "Tailor-made resource planning platforms that match your exact business logic rather than forcing you to adapt to theirs." },
      { title: "Workflow Orchestration", desc: "Automating complex, multi-departmental approval chains and operational workflows to eliminate human bottlenecks." },
      { title: "Legacy Modernization", desc: "Safe, strangler-fig pattern migrations moving your business off brittle mainframes and onto scalable cloud microservices." },
      { title: "Identity & Access Management", desc: "Granular, role-based access control (RBAC) and SSO integrations for sprawling enterprise hierarchies." }
    ],
    enterpriseEcosystem: [
      { title: "Core Operations API", desc: "A centralized, highly-available API gateway routing business logic securely across all internal and external consumers." },
      { title: "Data Lake & Analytics", desc: "Real-time streaming pipelines feeding into normalized data lakes for cross-departmental business intelligence." },
      { title: "Micro-Frontends", desc: "Decoupled web applications allowing different departments to deploy UI updates independently without breaking the system." }
    ],
    enterpriseWorkflow: [
      { title: "Process Standardization", desc: "Encoding your most successful operational workflows directly into the software architecture to ensure global consistency." },
      { title: "Centralized Visibility", desc: "Executive dashboards that aggregate data from HR, Finance, and Operations into a single pane of glass." },
      { title: "System Resilience", desc: "Active-active disaster recovery and automated failovers ensuring your business never experiences an IT blackout." }
    ],
    workflow: [
      { phase: "01", title: "Business Discovery", desc: "Deep-dive workshops with stakeholders to map existing bottlenecks and define KPIs." },
      { phase: "02", title: "Process Analysis", desc: "Auditing technical debt and legacy systems to plan a secure migration path." },
      { phase: "03", title: "System Architecture", desc: "Drafting the microservices topology, database schemas, and API contracts." },
      { phase: "04", title: "UX & Workflow Design", desc: "Prototyping internal tools that maximize employee productivity and reduce training time." },
      { phase: "05", title: "Enterprise Engineering", desc: "Agile, test-driven development sprints with continuous stakeholder alignment." },
      { phase: "06", title: "Deployment & Migration", desc: "Zero-downtime data migration and parallel-run testing before turning off legacy systems." }
    ],
    solutions: [
      { title: "Supply Chain Portals", desc: "Real-time logistics tracking, inventory forecasting, and vendor management systems." },
      { title: "Healthcare EHR Systems", desc: "HIPAA-compliant, highly secure patient data management platforms with audit logging." },
      { title: "Financial Core Systems", desc: "High-throughput transaction processing systems with ACID compliance and fraud detection." }
    ],
    metrics: [
      { value: "ISO 27001", label: "Security Readiness" },
      { value: "99.999%", label: "System Uptime" },
      { value: "Zero", label: "Data Loss Migrations" },
      { value: "RBAC", label: "Granular Access" }
    ],
    faqs: [
      { q: "Why build custom instead of buying Salesforce or SAP?", a: "Off-the-shelf ERPs force you to change your business to fit their software. We build software that fits your exact business, providing a lasting competitive advantage without vendor lock-in or per-seat licensing fees." },
      { q: "How do you migrate from legacy systems without downtime?", a: "We use the Strangler Pattern. We build the new system alongside the old, gradually routing specific traffic to the new APIs. This allows for safe, incremental modernization with zero operational disruption." },
      { q: "Who owns the code?", a: "You do. 100%. Upon completion (and at every milestone), the full intellectual property, source code, and infrastructure scripts are transferred to your repository." }
    ],
    caseStudyPreview: {
      client: "Global Logistics Corp",
      result: "Replaced 14 disparate legacy applications with a single, unified operational platform, increasing routing efficiency by 40% and saving $2M annually in licensing fees.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    }
  },
  "api-development": {
    id: "api-development",
    title: "API Development",
    shortTitle: "APIs",
    summary: "Secure, high-throughput data bridges.",
    description: "We design elegant, versioned REST and GraphQL APIs. Engineered for low latency and high concurrency, our APIs serve as the reliable connective tissue of modern digital ecosystems.",
    icon: "api",
    color: "tertiary",
    technologies: ["GraphQL", "Node.js", "Go", "Redis", "Apollo", "Swagger"],
    problems: [
      "Slow API response times bottlenecking client applications.",
      "Lack of documentation causing integration nightmares.",
      "Security vulnerabilities leading to data breaches.",
    ],
    capabilities: [
      { title: "GraphQL Federation", desc: "Unified supergraphs combining multiple microservices." },
      { title: "API Security & Rate Limiting", desc: "OAuth2, JWT, and distributed throttling using Redis." },
      { title: "Developer Experience (DX)", desc: "Automated Swagger/OpenAPI documentation generation." }
    ]
  }
};

export const getAllServices = () => Object.values(SERVICES_DATA);
export const getServiceBySlug = (slug) => SERVICES_DATA[slug] || null;
