"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/motion";

const TITLE_SIZE = "clamp(1.25rem,3vw,2.5rem)";

/**
 * Real client builds, each with the kit it would start from today, in the
 * hover-reveal poster theme: image
 * widens + zooms on hover while the stacked title/"Explore" label shrinks
 * and slides up to swap lines. Sized in %/clamp() (not fixed px) so it
 * scales down cleanly on mobile, the hover choreography is a desktop
 * affordance (matches the group-hover pattern used elsewhere on the site),
 * while the fluid sizing keeps the layout correct at every width.
 *
 * `items` comes from the server page ({ id, title, href, image, kit }), so the
 * kit names reach this client component without the kit catalogue.
 */
export default function FeaturedWorkSection({ items }) {
  return (
    <section className="relative w-full bg-surface-container-low py-20 sm:py-28 overflow-hidden">
      <div className="container-site relative z-10">
        <FadeInUp>
          <SectionHeader
            overline="Client work"
            title="Built For Real Businesses"
            overlineClassName="text-brand-steel"
            titleClassName="text-on-surface"
          />
        </FadeInUp>

        <StaggerContainer className="mt-stack-xl grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className="group relative flex w-full items-stretch h-[200px] sm:h-[240px] md:h-[260px]"
              >
                {/* Image.
                    Narrower at rest than it used to be: the title starts at
                    52%, so a 65–68% image put the first third of every title
                    on top of a photo. That was survivable when the type was
                    white, on a light theme the navy simply vanished into the
                    dark screenshots. At 50% the resting title clears the
                    image entirely and sits on the page ground. */}
                <div className="relative h-full w-[50%] overflow-hidden rounded-lg transition-[width] duration-300 ease-out group-hover:w-full">
                  {/* Explicit width/height rather than `fill`: the rendered
                      size still comes from `h-full w-full`, but the intrinsic
                      ratio now reaches the HTML so the browser can reserve the
                      box before the image lands. `fill` emits neither. */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={2400}
                    height={880}
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110",
                      item.objectPosition
                    )}
                  />
                </div>

                {/* Title / "Explore" swap.
                    The two lines resolve their contrast against different
                    grounds, so they are coloured differently on purpose: the
                    title rests on the page beside the image (navy), while
                    "Explore" only ever appears mid-hover, by which point the
                    image has widened underneath it, so it is set white with
                    a shadow, the same concession the mega-menu makes for type
                    over a photograph. */}
                <div className="absolute inset-y-0 left-[52%] w-[48%] overflow-hidden pointer-events-none">
                  <div className="flex flex-col h-[200%] transition-transform duration-300 ease-out group-hover:-translate-y-1/2 group-hover:scale-[0.45] origin-top-left">
                    <div className="h-1/2 flex flex-col items-start pt-3">
                      <span
                        style={{ fontSize: TITLE_SIZE }}
                        className="font-poster uppercase leading-none text-on-surface"
                      >
                        {item.title}
                      </span>
                      <span className="mt-3 font-label text-label-caps uppercase tracking-widest text-primary">
                        {item.kit}
                      </span>
                    </div>
                    <div className="h-1/2 flex items-start pt-3">
                      <span
                        style={{ fontSize: TITLE_SIZE }}
                        className="font-poster uppercase leading-none text-white [text-shadow:0_2px_12px_rgba(8,29,74,0.65)]"
                      >
                        Explore
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
