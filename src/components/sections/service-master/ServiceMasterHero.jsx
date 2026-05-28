"use client";

import { FadeInLeft, FadeInRight } from "@/components/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const WebHeroVisual = () => (
  <div className="relative w-full h-full min-h-[500px]">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center rounded-2xl opacity-90 shadow-lg border border-white/20" />
    <div className="absolute inset-0 bg-gradient-to-tr from-surface/80 to-transparent rounded-2xl" />
  </div>
);

const MobileHeroVisual = () => (
  <div className="relative h-[600px] flex items-center justify-center">
    {/* Decorative glowing orbs */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl" />
    <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    
    {/* Abstract Mockup Representation using CSS */}
    <div className="relative w-72 h-[550px] bg-surface-container border-4 border-outline-variant/50 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden z-10 -rotate-6 hover:rotate-0 transition-transform duration-700">
      <div className="absolute top-0 w-full h-20 bg-surface/50 backdrop-blur-md flex justify-center items-start pt-4 border-b border-outline-variant/30">
        <div className="w-1/3 h-6 bg-on-surface-variant/20 rounded-full" />
      </div>
      <div className="p-6 pt-24 space-y-4">
        <div className="w-full h-32 bg-primary/20 rounded-xl" />
        <div className="w-3/4 h-8 bg-surface-variant rounded-md" />
        <div className="w-1/2 h-6 bg-surface-variant rounded-md" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="w-full h-24 bg-secondary/20 rounded-xl" />
          <div className="w-full h-24 bg-tertiary/20 rounded-xl" />
        </div>
      </div>
    </div>
    
    <div className="absolute right-0 bottom-10 w-64 h-[450px] bg-surface-container/80 backdrop-blur-md border-4 border-outline-variant/30 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden z-20 rotate-12 hover:rotate-6 transition-transform duration-700 opacity-90">
      <div className="p-6 pt-12 space-y-4">
        <div className="w-full h-12 bg-primary/20 rounded-lg" />
        <div className="w-full h-48 bg-surface-variant rounded-xl" />
        <div className="w-full h-12 bg-secondary/20 rounded-lg" />
      </div>
    </div>
  </div>
);

const SaasHeroVisual = () => (
  <div className="relative w-full h-full min-h-[500px] flex items-center justify-center mt-stack-xl lg:mt-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-surface/0 to-surface/0 pointer-events-none rounded-full blur-3xl opacity-70" />
    <div className="bg-white/60 backdrop-blur-[24px] rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative border border-white/80 border-b-outline-variant/30 border-r-outline-variant/30 w-full max-w-lg z-10 hover:scale-[1.02] transition-transform duration-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-xl pointer-events-none" />
      <img 
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
        alt="SaaS Platform Dashboard" 
        className="rounded-lg w-full h-auto border border-outline-variant/30"
      />
    </div>
    
    {/* Floating Elements for depth */}
    <div className="absolute -left-10 top-20 bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg z-20 animate-[float_6s_ease-in-out_infinite]">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">analytics</span>
        <div>
          <div className="w-16 h-2 bg-on-surface-variant/20 rounded-full mb-2" />
          <div className="w-24 h-2 bg-on-surface-variant/10 rounded-full" />
        </div>
      </div>
    </div>
    
    <div className="absolute -right-5 bottom-20 bg-surface/80 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg z-20 animate-[float_8s_ease-in-out_infinite_reverse]">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">hub</span>
        <div>
          <div className="w-20 h-2 bg-on-surface-variant/20 rounded-full mb-2" />
          <div className="w-12 h-2 bg-on-surface-variant/10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

const AiHeroVisual = () => (
  <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden bg-white/60 backdrop-blur-[24px] flex items-center justify-center border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] mt-stack-xl lg:mt-0 group">
    <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent z-0 pointer-events-none" />
    <img 
      alt="Abstract neural network visualization" 
      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]" 
      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop"
    />
    {/* Abstract UI overlays */}
    <div className="absolute right-8 top-8 bg-white/40 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-secondary">analytics</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Prediction Accuracy</p>
        <p className="font-display text-xl text-on-surface">99.8%</p>
      </div>
    </div>
    
    <div className="absolute left-8 bottom-8 bg-white/40 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 z-10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">model_training</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Inference Latency</p>
        <p className="font-display text-xl text-on-surface">&lt; 50ms</p>
      </div>
    </div>
  </div>
);

const AutomationHeroVisual = () => (
  <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] mt-stack-xl lg:mt-0 group">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0 pointer-events-none" />
    <img 
      alt="Abstract automation and circuit flow imagery" 
      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]" 
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    />
    
    {/* Abstract UI overlays - Event Trigger */}
    <div className="absolute right-8 top-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">webhook</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Event Triggered</p>
        <p className="font-display text-xl text-on-surface">Data Ingest</p>
      </div>
    </div>
    
    {/* Abstract UI overlays - Execution Engine */}
    <div className="absolute left-8 bottom-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 z-10">
      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-secondary">account_tree</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Orchestration</p>
        <p className="font-display text-xl text-on-surface">Workflow Active</p>
      </div>
    </div>
  </div>
);

const CloudHeroVisual = () => (
  <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] mt-stack-xl lg:mt-0 group">
    <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/10 to-transparent z-0 pointer-events-none" />
    <img 
      alt="Abstract cloud server architecture and data streams" 
      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]" 
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
    />
    
    {/* Abstract UI overlays - Deployment Status */}
    <div className="absolute right-8 top-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-green-600">check_circle</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Production Release</p>
        <p className="font-display text-xl text-on-surface">Deployed successfully</p>
      </div>
    </div>
    
    {/* Abstract UI overlays - Server Node */}
    <div className="absolute left-8 bottom-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 z-10">
      <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center relative">
        <span className="material-symbols-outlined text-tertiary">dns</span>
        <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Cluster Node</p>
        <p className="font-display text-xl text-on-surface">100% Uptime</p>
      </div>
    </div>
  </div>
);

const UxHeroVisual = () => (
  <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] mt-stack-xl lg:mt-0 group">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0 pointer-events-none" />
    <img 
      alt="High-fidelity 3D UI design system visual" 
      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s]" 
      src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"
    />
    
    {/* Abstract UI overlays - Design Token */}
    <div className="absolute right-8 top-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">palette</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Design Token</p>
        <p className="font-display text-xl text-on-surface">Global Sync</p>
      </div>
    </div>
    
    {/* Abstract UI overlays - Component Ecosystem */}
    <div className="absolute left-8 bottom-16 bg-white/60 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 z-10">
      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center relative">
        <span className="material-symbols-outlined text-secondary">widgets</span>
        <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping" />
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Component</p>
        <p className="font-display text-xl text-on-surface">Auto Layout</p>
      </div>
    </div>
  </div>
);

const EnterpriseHeroVisual = () => (
  <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden glass-panel flex items-center justify-center border border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.05)] mt-stack-xl lg:mt-0 group">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0 pointer-events-none" />
    <img 
      alt="Abstract rendering of complex software architecture layers" 
      className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-[2s]" 
      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
    />
    
    {/* Abstract UI overlays - Operations */}
    <div className="absolute right-8 top-16 bg-white/70 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-10">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-primary">account_tree</span>
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Core Operations</p>
        <p className="font-display text-xl text-on-surface">Synchronized</p>
      </div>
    </div>
    
    {/* Abstract UI overlays - Data Lake */}
    <div className="absolute left-8 bottom-16 bg-white/70 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md border border-white/60 shadow-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 z-10">
      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center relative">
        <span className="material-symbols-outlined text-secondary">database</span>
        <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
      </div>
      <div>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Data Lake</p>
        <p className="font-display text-xl text-on-surface">Real-Time Sync</p>
      </div>
    </div>
  </div>
);

const DefaultHeroVisual = ({ service }) => (
  <div className="relative w-full h-full min-h-[500px]">
    <div className="absolute inset-0 bg-surface-container rounded-2xl opacity-90 shadow-lg border border-white/20 flex items-center justify-center overflow-hidden">
      <div className={cn("absolute inset-0 opacity-20", service.color === "primary" ? "bg-primary" : service.color === "secondary" ? "bg-secondary" : "bg-tertiary")} />
      <span className={cn("material-symbols-outlined text-[120px] opacity-20", service.color === "primary" ? "text-primary" : service.color === "secondary" ? "text-secondary" : "text-tertiary")}>
        {service.icon}
      </span>
    </div>
  </div>
);

import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ServiceMasterHero({ service }) {
  if (!service) return null;

  const renderVisual = () => {
    if (service.id === "web-development") return <WebHeroVisual />;
    if (service.id === "mobile-apps") return <MobileHeroVisual />;
    if (service.id === "saas-platforms") return <SaasHeroVisual />;
    if (service.id === "ai-ml-solutions") return <AiHeroVisual />;
    if (service.id === "automation-systems") return <AutomationHeroVisual />;
    if (service.id === "cloud-devops") return <CloudHeroVisual />;
    if (service.id === "ui-ux-design") return <UxHeroVisual />;
    if (service.id === "enterprise-software") return <EnterpriseHeroVisual />;
    return <DefaultHeroVisual service={service} />;
  };

  return (
    <section className="relative min-h-[80vh] flex items-center px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto overflow-hidden pt-[120px] pb-stack-xl">
      <div className={cn(
        "absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[100px] -z-10 pointer-events-none opacity-50",
        service.color === "primary" ? "bg-primary/10" : service.color === "secondary" ? "bg-secondary/10" : "bg-tertiary/10"
      )} />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full relative z-10 items-center">
        <FadeInLeft className="col-span-1 md:col-span-6 lg:col-span-7 flex flex-col justify-center">
          <Breadcrumbs />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 bg-surface/50 backdrop-blur-md mb-6 w-fit mt-4">
            <span className={cn("material-symbols-outlined text-[16px]", `text-${service.color}`)}>
              {service.icon}
            </span>
            <span className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest">
              {service.title}
            </span>
          </div>

          <h1 className="font-display text-display-xl text-on-surface mb-6 tracking-tight leading-[1.05]">
            <span className="block text-4xl md:text-5xl lg:text-6xl mb-2">
              {service.id === 'mobile-apps' ? 'Engineering Native' : service.id === 'saas-platforms' ? 'Architecting Scalable' : service.id === 'ai-ml-solutions' ? 'Intelligence Redefined' : service.id === 'automation-systems' ? 'Engineering' : service.id === 'cloud-devops' ? 'Architecting' : service.id === 'ui-ux-design' ? 'Human-Centric' : service.id === 'enterprise-software' ? 'Architectural Mastery' : 'Architecting High-Performance'}
            </span>
            <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", service.color === "primary" ? "from-primary to-secondary" : service.color === "secondary" ? "from-secondary to-primary" : "from-tertiary to-primary")}>
              {service.id === 'mobile-apps' ? 'Experiences at Scale' : service.id === 'saas-platforms' ? 'SaaS Ecosystems' : service.id === 'ai-ml-solutions' ? 'at Scale.' : service.id === 'automation-systems' ? 'Autonomy' : service.id === 'cloud-devops' ? 'Resilience at Scale' : service.id === 'ui-ux-design' ? 'Engineering' : service.id === 'enterprise-software' ? 'for the Modern Enterprise' : 'Digital Ecosystems'}
            </span>
          </h1>
          
          <p className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
            {service.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className={cn(
              "px-8 py-4 rounded-lg font-label text-label-caps uppercase tracking-widest text-on-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:scale-[0.98] transition-transform text-center",
              service.color === "primary" ? "bg-gradient-to-r from-primary to-secondary" : service.color === "secondary" ? "bg-gradient-to-r from-secondary to-primary" : "bg-gradient-to-r from-tertiary to-primary"
            )}>
              Consult an Architect
            </Link>
            <Link href="/case-studies" className="bg-white/60 backdrop-blur-[24px] border border-white/80 text-on-surface px-8 py-4 rounded-lg font-label text-label-caps uppercase tracking-widest hover:bg-white/80 transition-all text-center">
              View Portfolio
            </Link>
          </div>
        </FadeInLeft>

        <FadeInRight className="col-span-1 md:col-span-6 lg:col-span-5 relative hidden md:block h-full w-full">
          {renderVisual()}
        </FadeInRight>
      </div>
    </section>
  );
}
