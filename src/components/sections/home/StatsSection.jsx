"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

/**
 * Four numbers, and every one of them is checkable on this site: the kit
 * count (passed in from the catalogue, so it cannot go stale), the 30 days of
 * The Loop every kit ends with, the share of the work that is yours, and the
 * reply time on every enquiry. Commitments a buyer can hold us to, not
 * results they would have to take on trust.
 */
const statsFor = (kitCount) => [
  { value: kitCount, unit: "", label: "Loops with published prices", accent: "primary", prefix: "" },
  { value: 30, unit: " days", label: "Of The Tune-Up after launch", accent: "secondary", prefix: "" },
  { value: 100, unit: "%", label: "Of the work is yours", accent: "tertiary", prefix: "" },
  { value: 1, unit: " day", label: "To reply, every enquiry", accent: "primary", prefix: "" },
];

/*
 * Two things keep the numbers from being eaten on the way in.
 *
 * `z-10`: the reveal starts each figure ~104px below where it lands, which is
 * further than this band's 32–48px of bottom padding, so mid-scroll the
 * numbers sit outside the section box. ProcessSection follows immediately,
 * paints an opaque gradient, and comes later in the DOM, so with both at auto
 * z-index it won a paint it should never have been in: the digits arrived
 * sliced along a hard horizontal line, each column cut at a different height
 * because the stagger puts them at different heights.
 *
 * And no `FadeInUp` around the grid. It moved the container 96px while the
 * stagger moved each item another 104px inside it, so the figures began the
 * reveal ~200px low, a third of the way into the next section. One reveal is
 * the whole effect; the second only ever added travel.
 */
export default function StatsSection({ kitCount }) {
  return (
    <section className="container-site py-stack-lg border-y border-outline-variant/20 relative z-10 bg-surface-container-lowest/40 backdrop-blur-md">
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 md:gap-x-8 lg:gap-gutter lg:divide-x divide-outline-variant/20">
          {statsFor(kitCount).map((stat, i) => (
            <StaggerItem key={i} className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0 first:pt-0">
              <div className="font-display text-headline-md sm:text-display-lg md:text-[56px] text-on-surface leading-none font-bold mb-2 flex items-baseline">
                {stat.prefix && <span className="text-headline-md font-heading text-primary mr-1">{stat.prefix}</span>}
                
                {/* The AnimatedCounter currently only does integers well, so for floats we just display them or use a custom implementation */}
                {stat.isFloat ? (
                  <span>{stat.value}</span>
                ) : (
                  <AnimatedCounter value={stat.value} />
                )}
                
                {stat.unit && <span className="text-headline-md font-heading text-primary ml-1">{stat.unit}</span>}
              </div>
              <div className={cn(
                "font-body text-xs sm:text-sm md:text-body-md font-medium text-on-surface-variant relative inline-block",
                "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-1 after:rounded-full",
                stat.accent === "primary" ? "after:bg-primary" :
                stat.accent === "secondary" ? "after:bg-secondary" : "after:bg-tertiary"
              )}>
                {stat.label}
              </div>
            </StaggerItem>
          ))}
      </StaggerContainer>
    </section>
  );
}
