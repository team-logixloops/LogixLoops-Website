"use client";

import { SectionHeader, Button, CipherSeal, ScrollTimeline } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";
import PageHero from "@/components/sections/shared/PageHero";
import PageSurface from "@/components/sections/shared/PageSurface";
import { SECURITY_PROTOCOLS, DELIVERY_PIPELINE } from "@/data/infrastructure";

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Security Hero, the `security` field preset is the most rigid one
          on the site: densest contours, near-zero warp, and no pointer well
          at all. Nothing under this page moves when you push on it. */}
      <PageHero
        preset="security"
        eyebrow="Trust & Compliance"
        eyebrowClassName="text-error"
        title="Assume it is"
        accent="already inside."
        lead="Zero-trust is not a product you buy at the end. It is a set of decisions made in week one: short-lived credentials, mutual TLS between services, least privilege written per service, and six gates every change passes before it reaches production."
        cue="Controls"
      />

      <PageSurface>
        {/* 2. Security Systems (Protocols) */}
        <section
          aria-labelledby="security-protocols"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl"
        >
          {/* Section label, not an answer block. The protocols below are h3s and
              need an h2 above them; they are also the substance, and summarising
              them in a paragraph first just meant reading the same claims
              twice. */}
          <div className="max-w-2xl mb-stack-lg">
            <h2
              id="security-protocols"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface"
            >
              Controls we build in from day one
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {SECURITY_PROTOCOLS.map((protocol, idx) => (
              <StaggerItem key={idx}>
                <div className="cipher-lens p-8 border border-outline-variant/30 rounded-xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated hover:shadow-[0_20px_40px_rgba(55,140,231,0.06)] transition-all h-full flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 border-t border-l border-white/40 pointer-events-none rounded-xl"></div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">{protocol.icon}</span>
                  </div>
                  <h3 className="font-display text-headline-md text-on-surface mb-3">{protocol.title}</h3>
                  <p className="font-body text-body-md text-on-surface-variant">{protocol.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* After the controls, not before them, the protocols above are the
            substance and go first. This answers what the list implies but does
            not state, and it is what carries the route past the 300-word floor
            a crawler treats as a thin page. */}
        <section
          aria-labelledby="security-posture"
          className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto pb-stack-xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] gap-stack-lg lg:gap-stack-xl items-start"
        >
          <div className="max-w-2xl">
            <h2
              id="security-posture"
              className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4"
            >
              What zero-trust means here
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-4">
              No request is trusted because of where it came from. Every call
              between services is authenticated and encrypted, including calls
              that never leave your own network. A compromised container reaches
              only what it was explicitly granted, rather than everything behind
              the firewall.
            </p>
            <p className="font-body text-body-md text-on-surface-variant mb-4">
              In practice that is three things. Short-lived credentials instead
              of long-lived secrets. Mutual TLS between every internal service.
              And least-privilege policies written per service, reviewed when
              the service changes rather than once a year.
            </p>
            <p className="font-body text-body-md text-on-surface-variant">
              We apply the same standard to our own access. Engineers get
              scoped, time-limited credentials to your environments, every
              action is logged, and access is revoked at handover. If a
              compliance auditor asks who touched what and when, the answer is
              in the audit trail rather than in someone&apos;s memory.
            </p>
          </div>

          {/* The page's one signature object, and the only place on the site
              that runs the full cipher treatment, everywhere else gets the
              restrained `.cipher-lens` utility. It sits beside the zero-trust
              copy rather than above it because it is an illustration of that
              argument: sealed by default, legible only where a key is held.
              Decorative, so the paragraphs beside it carry the meaning on
              their own. */}
          <CipherSeal
            seal="AES-256"
            caption="Data at rest, and every hop between services. Point at the panel to look under the seal."
            className="w-full max-w-[380px] mx-auto lg:mx-0 lg:sticky lg:top-28"
          />
        </section>

        {/* 3. DevSecOps & Observability Dashboard */}
        <section className="bg-surface-container-low py-stack-xl border-y border-outline-variant/20 relative">
          <div className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto">
            <SectionHeader 
              overline="DevSecOps"
              title="Six gates before production"
              description="Continuous integration only means anything if it is also continuous security. Each stage below can stop a change, and none of them depend on somebody remembering to run it."
              alignment="center"
            />

            {/* The six gates a change passes on the way to production, told
                as a horizontal rail because that is the shape of the thing,
                something travels along a pipeline, left to right, and can be
                stopped at any stage. The telemetry panel below reports the
                same events after the fact; this is the route they take.

                It scrolls natively rather than pinning the page, so a phone
                swipes it, a trackpad pans it, and a keyboard tabs through the
                stages with the browser scrolling each into view. */}
            <FadeInUp delay={0.15} className="mt-stack-lg">
              <ScrollTimeline
                orientation="horizontal"
                label="Delivery pipeline stages"
                items={DELIVERY_PIPELINE}
              />
            </FadeInUp>

            {/* A "Global Security Telemetry" dashboard used to sit here,
                reporting 99.999% uptime over thirty days, 14,200 threats
                mitigated, and a scrolling log of invented events with
                hard-coded October timestamps and a pulsing "waiting for next
                event" line.
                None of it was real. Not our telemetry, not any client's
                telemetry. A page whose entire argument is "trust what we tell
                you about security" cannot afford a fabricated monitor as its
                centrepiece, and it is precisely the sort of figure an answer
                engine lifts and attributes to us.
                Replaced with what we will genuinely put in writing. Each line
                is a commitment that appears in a signed engagement, so a
                prospect can hold us to all four. */}
            <FadeInUp delay={0.2} className="mt-stack-lg">
              <div
                aria-labelledby="security-commitments"
                className="max-w-4xl mx-auto rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated p-8 sm:p-10"
              >
                <h3
                  id="security-commitments"
                  className="font-display text-headline-md text-on-surface mb-3"
                >
                  What we will put in the contract
                </h3>
                <p className="font-body text-body-md text-on-surface-variant mb-8">
                  We are a young studio and we are not going to show you a
                  decade of uptime we have not run yet. What we will do is
                  commit to the following in writing, on every engagement.
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    [
                      "Encryption, everywhere",
                      "AES-256 at rest and TLS 1.3 in transit, including calls between services inside your own network.",
                    ],
                    [
                      "Scoped, expiring access",
                      "Our engineers get time-limited credentials to your environments. Every action is logged, and access is revoked at handover.",
                    ],
                    [
                      "Pipeline blocks, not tickets",
                      "A known critical vulnerability or a leaked secret stops the build. It does not become a backlog item somebody triages next month.",
                    ],
                    [
                      "An audit trail, not a memory",
                      "Who deployed what, and when, is answered by an immutable log. If a compliance auditor asks, you query it.",
                    ],
                  ].map(([term, detail]) => (
                    <div key={term} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-[18px] mt-0.5 text-primary shrink-0"
                      >
                        check
                      </span>
                      <div>
                        <dt className="font-body text-body-md font-semibold text-on-surface mb-1">
                          {term}
                        </dt>
                        <dd className="font-body text-body-sm text-on-surface-variant">
                          {detail}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {/* Said plainly, because the alternative is letting a reader
                    infer it and feel misled later. It is also the honest
                    answer to "is LogixLoops SOC 2 certified", which is a
                    question an assistant will be asked about us. */}
                <p className="font-body text-body-sm text-on-surface-variant mt-8 pt-6 border-t border-outline-variant/30">
                  One clarification worth making plainly: LogixLoops designs
                  architectures against SOC&nbsp;2 Type&nbsp;II, HIPAA, GDPR and
                  ISO&nbsp;27001 requirements. LogixLoops is not itself a
                  certified entity, and any agency telling you its certification
                  transfers to your system is describing something that does not
                  work that way.
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* 4. Final CTA */}
        <section className="px-margin-x-mobile md:px-margin-x-desktop max-w-container-max mx-auto py-stack-xl text-center">
          <div className="dispatch py-20 px-8 border border-outline-variant/30 rounded-2xl bg-surface-container-lowest/60 backdrop-blur-2xl shadow-glass-elevated relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <h2 className="font-display text-display-lg text-on-surface mb-6 relative z-10">Got an audit coming?</h2>
            <p className="font-body text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">Tell us the framework and the deadline. We will tell you what in your architecture will fail it, and in what order to fix it.</p>
            <Button href="/contact" size="lg" className="relative z-10 shadow-lg">
              Talk to an engineer
            </Button>
          </div>
        </section>
      </PageSurface>
    </div>
  );
}
