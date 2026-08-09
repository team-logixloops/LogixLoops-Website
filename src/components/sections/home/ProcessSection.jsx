"use client";

import { SectionHeader } from "@/components/ui";
import HowItWorks from "@/components/ui/HowItWorks";

/**
 * The short version of the eight phases documented on /process.
 *
 * This section said "a meticulous 6-stage lifecycle" while /process said
 * eight, which is the kind of small contradiction a careful buyer finds in
 * about ninety seconds and never quite stops noticing. Six groupings,
 * described as groupings, and the heading now points at the full list rather
 * than competing with it.
 */
const PROCESS_STEPS = [
  {
    title: "Discovery",
    description: "We read the system before anyone describes it to us. Constraints get written down as constraints, and success gets reduced to a number somebody will be measured on.",
    colorTheme: "primary",
  },
  {
    title: "Architecture",
    description: "Service boundaries drawn along the seams of the data, not the org chart. Every consequential choice recorded, with the option that lost and the reason it lost.",
    colorTheme: "secondary",
  },
  {
    title: "Design",
    description: "Complex workflows prototyped and walked by somebody who will actually run them daily. Tokens and components, not a folder of screens.",
    colorTheme: "tertiary",
  },
  {
    title: "Engineering",
    description: "Two-week sprints against a backlog you rank. Trunk-based, feature-flagged, no merge without review. Every sprint ends in running software, not a status deck.",
    colorTheme: "primary",
  },
  {
    title: "Hardening",
    description: "Load tested against modelled peak and broken on purpose. The first time a dependency dies should never be in production.",
    colorTheme: "secondary",
  },
  {
    title: "Handover",
    description: "Progressive rollout, one-run rollback, telemetry from release one. Then the repository, the runbooks and the keys, all of it yours.",
    colorTheme: "tertiary",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-20 sm:py-28"
      style={{
        background:
          "radial-gradient(30% 80% at 0% 70%, #dcecfd 0%, #e9f0fa 22.92%, #f1f6fd 42.71%, #f7faff 88.54%)",
      }}
    >
      <div className="container-site mb-4">
        <SectionHeader
          overline="Methodology"
          title="How An Engagement Runs"
          description="The short version of our eight-phase delivery process. Each phase has a condition that has to be true before the next one is allowed to start, which is the whole trick, and the reason nothing arrives as a surprise in month four."
          overlineClassName="text-brand-steel"
          titleClassName="text-on-surface"
          descriptionClassName="text-on-surface-variant"
        />
      </div>

      <HowItWorks features={PROCESS_STEPS} />
    </section>
  );
}
