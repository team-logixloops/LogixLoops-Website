"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const TEAM = [
  {
    name: "Elena Rostova",
    role: "Chief Architect",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Former lead engineer at Tier-1 tech firms. Specializes in distributed systems and high-throughput data pipelines."
  },
  {
    name: "Marcus Chen",
    role: "Head of AI Integration",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "Pioneer in applied machine learning for enterprise workflows. Ph.D. in computational linguistics."
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Product Design",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Award-winning designer obsessed with the intersection of human psychology and digital interfaces."
  },
  {
    name: "David Alaba",
    role: "Lead Cloud Engineer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    bio: "AWS & GCP certified expert. Architects zero-downtime, globally distributed infrastructure."
  }
];

export default function AboutTeam() {
  return (
    <section className="py-stack-2xl border-y border-outline-variant/30 bg-surface-container-lowest/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
        <FadeInUp>
          <SectionHeader 
            overline="The Collective"
            title="Engineering Leadership"
            description="Our team consists of elite architects, researchers, and designers who thrive on solving the most complex technological problems."
            centered
          />
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mt-stack-xl">
          {TEAM.map((member, i) => (
            <StaggerItem key={i}>
              <div className="group w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-surface-container shadow-sm border border-outline-variant/20">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-headline-md text-on-surface mb-1">{member.name}</h3>
                <div className="font-label text-label-caps text-primary uppercase tracking-widest mb-3">{member.role}</div>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
