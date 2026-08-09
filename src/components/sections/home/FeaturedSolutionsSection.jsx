"use client";

import { SectionHeader, Button } from "@/components/ui";
import { ContainerScroll } from "@/components/ui/ContainerScroll";

/* What lands in the repository at the end of an engagement. Every line here is
   a commitment restated from /pricing and /process, not a capability boast. */
const CAPABILITIES = [
  "An architecture decision record for every consequential choice",
  "Tests written with the requirement, not after it",
  "A pipeline that rolls back in one run",
  "Runbooks, so the on-call engineer is not you at 3am",
];

/**
 * The scroll-scaled card used to hold a fake terminal importing
 * `@logixloops/core` and configuring `nodes: 4096` with
 * `resilience: 'maximum'`. No such package exists, those are not real
 * parameters, and a prospect's lead engineer notices that in about two
 * seconds, which is an expensive way to decorate a section.
 *
 * It shows an architecture decision record instead. That is a real artefact,
 * it is one we commit to producing on /pricing and /process, and it is the
 * most convincing thing a technical buyer can be shown: it proves the decision
 * was reasoned about, that the alternatives were considered, and that the
 * reasoning survives the people who made it. Nothing in it is invented. It is
 * the ADR for the multi-tenant isolation choice described on
 * /services/saas-platforms.
 */
export default function FeaturedSolutionsSection() {
  return (
    <section id="how-we-work" className="relative overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="container-site pb-16 sm:pb-24">
            <SectionHeader
              overline="How we work"
              title="Every Decision, Written Down"
              description="Most agencies hand over a repository and a Slack archive. We hand over the reasoning: what was chosen, what was rejected, and why, so the next engineer to touch this system does not have to guess, and does not have to be us."
            />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {CAPABILITIES.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    check
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-stack-md flex justify-center">
              <Button href="/process" icon="arrow_forward" iconPosition="right">
                See the full process
              </Button>
            </div>
          </div>
        }
      >
        {/* An ADR, in the editor chrome the fake terminal used to occupy. */}
        <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-inverse-surface">
          <div className="flex h-8 w-full flex-shrink-0 items-center gap-2 border-b border-white/10 px-4">
            <div className="h-2.5 w-2.5 rounded-full bg-error" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
              docs/adr/0014-tenant-isolation.md
            </span>
          </div>
          <div className="flex-1 overflow-hidden p-6 font-mono text-[12px] leading-relaxed text-inverse-on-surface md:p-10 md:text-[15px]">
            <div className="text-[#A78BFA]"># ADR-0014: Tenant data isolation</div>
            <div className="mt-3">
              <span className="text-[#FBBF24]">Status:</span> Accepted
            </div>
            <div className="mt-3">
              <span className="text-[#34D399]">Context.</span> Shared Postgres,
              enterprise tenants asking for an isolation guarantee in writing.
            </div>
            <div className="mt-3">
              <span className="text-[#34D399]">Decision.</span> Row-level
              security, tenant ID forced at the connection, never in app code.
            </div>
            <div className="mt-3">
              <span className="text-[#34D399]">Rejected.</span> Schema per
              tenant, because migrations become O(n). Database per tenant,
              because of cost.
            </div>
            <div className="mt-3">
              <span className="text-[#F87171]">Consequence.</span> Every query
              runs under a tenant role. A missing policy fails closed.
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
