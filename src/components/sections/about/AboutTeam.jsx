"use client";

import { SectionHeader, FlipCard } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

/* ───────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER TEAM. Replace before this page is promoted anywhere.
 *
 * The names, portraits and bios below are stand-ins. They are deliberately
 * written as descriptions of a role rather than as claims about a person:
 * the previous copy asserted "former lead engineer at Tier-1 tech firms" and
 * "Ph.D. in computational linguistics" under stock photographs, which is a
 * fabricated credential attached to a fabricated person, and it is the single
 * easiest thing on a site for a prospect to catch.
 *
 * When the real team goes in: real name, real role, a photograph of that
 * person, and a bio containing only things that are true. If a seat is not
 * filled yet, delete the entry rather than inventing one.
 * ─────────────────────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name: "Placeholder Name",
    role: "Principal Engineer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Owns architecture on every engagement. Draws the service boundaries, writes the decision records, and is the person who says no when a shortcut would cost more later than it saves now.",
  },
  {
    name: "Placeholder Name",
    role: "AI & Data",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "Builds the pipeline, the evaluation set and the fallback before anyone builds the model. Also the person most likely to tell you a well-indexed query would beat the model outright.",
  },
  {
    name: "Placeholder Name",
    role: "Product Design",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Designs against realistic data volumes rather than against a demo. Runs the critical path past a real operator before a single component is committed to.",
  },
  {
    name: "Placeholder Name",
    role: "Cloud & Reliability",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    bio: "Keeps deploys boring. Every environment in Terraform, rollout progressive, rollback one pipeline run, and telemetry shipping from the first release rather than after the first outage.",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-stack-2xl border-y border-outline-variant/30 bg-surface-container-lowest/50 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-container-max mx-auto px-margin-x-mobile md:px-margin-x-desktop">
        <FadeInUp>
          <SectionHeader
            overline="The team"
            title="Who actually writes the code"
            description="Four people, all senior. The person you meet on the first call is the person on the pull request, which is most of what you are buying."
            centered
          />
        </FadeInUp>

        {/* Portrait on the face, the working description on the back. Both
            faces render, so the bios stay in the reading order and reachable
            by tap and keyboard; the flip only changes which one is toward
            you. See `ui/FlipCard.jsx`. */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mt-stack-xl">
          {TEAM.map((member, i) => (
            <StaggerItem key={i}>
              <FlipCard
                label={`${member.name}, ${member.role}: show background`}
                className="w-[85vw] sm:w-[60vw] shrink-0 snap-center md:w-auto md:shrink aspect-[3/4] rounded-2xl"
                front={
                  <div className="relative h-full w-full bg-surface-container border border-outline-variant/20 rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width={600}
                      height={800}
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="font-display text-headline-md text-white mb-1 [text-shadow:0_2px_12px_rgba(8,29,74,0.6)]">
                        {member.name}
                      </h3>
                      <div className="font-label text-label-caps text-secondary-fixed uppercase tracking-widest">
                        {member.role}
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="relative flex h-full w-full flex-col justify-between rounded-2xl border border-primary/20 bg-[linear-gradient(150deg,#0b2352,#081d4a_55%,#0a3f57)] p-6 text-left">
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-secondary-fixed-dim icon-md"
                    >
                      format_quote
                    </span>
                    <div>
                      <p className="font-body text-body-sm leading-relaxed text-white/85">
                        {member.bio}
                      </p>
                      <div className="mt-5 border-t border-white/15 pt-4">
                        <div className="font-display text-body-md text-white">
                          {member.name}
                        </div>
                        <div className="font-label text-label-caps uppercase tracking-widest text-secondary-fixed-dim">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
