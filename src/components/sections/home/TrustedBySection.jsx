"use client";

import { motion } from "framer-motion";
import { FadeInUp } from "@/components/motion";

const DOMAINS = [
  { label: "Financial Technology", icon: "account_balance" },
  { label: "Healthcare Systems", icon: "health_and_safety" },
  { label: "Global Logistics", icon: "local_shipping" },
  { label: "Enterprise SaaS", icon: "cloud_sync" },
  { label: "Artificial Intelligence", icon: "memory" },
  { label: "Cloud Infrastructure", icon: "dns" },
  { label: "Cybersecurity", icon: "shield_lock" }
];

export default function TrustedBySection() {
  return (
    <section className="w-full py-stack-md border-y border-outline-variant/20 bg-surface/50 overflow-hidden backdrop-blur-sm relative z-10">
      <FadeInUp>
        <p className="text-center font-label text-label-caps text-on-surface-variant mb-6 uppercase tracking-[0.2em]">
          Architecting solutions for complex industries
        </p>
      </FadeInUp>
      
      {/* Marquee Container */}
      <div className="flex w-full overflow-hidden relative opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-surface to-transparent z-10" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap items-center min-w-max"
        >
          {/* Double the array for seamless infinite scroll */}
          {[...DOMAINS, ...DOMAINS].map((domain, index) => (
            <div key={index} className="px-10 flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[28px] text-on-surface-variant">
                {domain.icon}
              </span>
              <span className="font-display font-bold text-[24px] text-on-surface-variant tracking-tight">
                {domain.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
