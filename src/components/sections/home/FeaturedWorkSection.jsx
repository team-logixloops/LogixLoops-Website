"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isEmbedded } from "@/lib/embed";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* The scroll-driven version, and its complement: GSAP runs a matchMedia
   callback only while one listed condition matches, so both are listed. */
const QUERIES = {
  scrolly: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  still: "(max-width: 767px), (prefers-reduced-motion: reduce)",
};

/**
 * Client work, straight after the hero: real businesses, each with the Loop it
 * would start from today, so the first thing under the promise is proof.
 *
 * On a wide screen with motion allowed, the section becomes a scroll stage:
 * it is as tall as the track is wide, its inner panel sticks to the viewport,
 * and scrolling down slides the projects sideways, each screenshot drifting
 * slightly against its frame. A counter and a rail track where you are.
 *
 * Sticky, not a ScrollTrigger pin. A pin reparents its node into a spacer,
 * and React removing a node GSAP has moved is the crash WaveBend documents.
 * `position: sticky` moves nothing, so the layout can switch on after mount
 * without React ever finding its tree rearranged.
 *
 * Everywhere else (phones, reduced motion, embedded copies, no JavaScript) the
 * same markup is a native swipeable row with snap points, which is also what
 * the server renders. The switch happens off screen, below the hero, so it
 * shifts nothing anyone is looking at.
 *
 * Classes prefixed `group-data-[scrolly=on]/work:` apply only once that
 * layout is armed: the section is the named group, and JS sets
 * `data-scrolly="on"` on it. They are written out in full because Tailwind
 * cannot see a class assembled at runtime.
 *
 * `items` comes from the server page, so the case-study records stay out of
 * this bundle.
 */
export default function FeaturedWorkSection({ items }) {
  const section = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);
  const rail = useRef(null);

  useLayoutEffect(() => {
    if (isEmbedded()) return;
    const el = section.current;
    const mm = gsap.matchMedia();

    mm.add(QUERIES, (context) => {
      if (!context.conditions.scrolly) return;

      const distance = () => Math.max(0, track.current.scrollWidth - viewport.current.clientWidth);
      // Tall enough that one pixel of scroll moves the track one pixel.
      const setHeight = () => {
        el.style.height = `${distance() + window.innerHeight}px`;
      };

      el.dataset.scrolly = "on";
      setHeight();
      ScrollTrigger.addEventListener("refreshInit", setHeight);

      const count = items.length;
      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          // Written straight to the DOM: a React state update per scroll
          // frame would re-render every card.
          onUpdate: (self) => {
            if (rail.current) rail.current.style.transform = `scaleX(${self.progress})`;
            if (counter.current) {
              const at = Math.min(count, Math.floor(self.progress * count) + 1);
              counter.current.textContent = String(at).padStart(2, "0");
            }
          },
        },
      });

      // Each screenshot drifts against its frame while its card crosses the
      // screen. Small travel: past ~8% it reads as the image slipping.
      el.querySelectorAll("[data-drift]").forEach((layer) => {
        gsap.fromTo(
          layer,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: layer.parentElement,
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setHeight);
        delete el.dataset.scrolly;
        el.style.height = "";
      };
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <section
      ref={section}
      aria-labelledby="work-heading"
      className="group/work relative z-10 bg-inverse-surface text-inverse-on-surface"
    >
      <div className="flex flex-col justify-center py-20 sm:py-24 group-data-[scrolly=on]/work:sticky group-data-[scrolly=on]/work:top-0 group-data-[scrolly=on]/work:h-screen group-data-[scrolly=on]/work:overflow-hidden group-data-[scrolly=on]/work:py-0 group-data-[scrolly=on]/work:pt-20">
        {/* `w-full`: inside this flex column, `container-site`'s auto margins
            would otherwise shrink it to its content and centre it, pulling
            the heading out of line with the cards. */}
        <div className="container-site flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <header className="max-w-2xl">
            <p className="font-label text-label-caps uppercase tracking-widest text-inverse-primary">Our work</p>
            <h2 id="work-heading" className="mt-3 font-poster text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.95] text-white">
              Built for real businesses
            </h2>
            <p className="mt-4 max-w-lg font-body text-body-lg text-inverse-on-surface/75">
              {items.length} businesses that are live today, each one started from a Loop you can buy now.
            </p>
          </header>

          {/* Where you are in the row. Only meaningful while scrolling drives
              it, so it is hidden until then. */}
          <div aria-hidden="true" className="hidden w-48 flex-col gap-3 group-data-[scrolly=on]/work:flex">
            <span className="font-poster text-3xl leading-none text-white">
              <span ref={counter}>01</span>
              <span className="text-inverse-on-surface/40"> / {String(items.length).padStart(2, "0")}</span>
            </span>
            <span className="h-[2px] w-full overflow-hidden rounded-full bg-white/15">
              <span ref={rail} className="block h-full w-full origin-left bg-gradient-to-r from-inverse-primary to-tertiary-container" style={{ transform: "scaleX(0)" }} />
            </span>
          </div>
        </div>

        <div
          ref={viewport}
          className="no-scrollbar mt-10 snap-x snap-mandatory overflow-x-auto scroll-px-margin-x-mobile md:mt-12 md:scroll-px-margin-x-tablet group-data-[scrolly=on]/work:snap-none group-data-[scrolly=on]/work:overflow-visible"
        >
          {/* The gutter matches `container-site`, so the first card lines up
              under the heading at every width, including past 1280px where
              the container centres. */}
          <ul
            ref={track}
            className="flex w-max gap-5 px-margin-x-mobile md:gap-8 md:px-[max(40px,calc((100vw-1280px)/2+40px))] lg:px-[max(64px,calc((100vw-1280px)/2+64px))]"
            style={{ willChange: "transform" }}
          >
            {items.map((item, i) => (
              <li key={item.id} className="w-[82vw] shrink-0 snap-start sm:w-[62vw] md:w-[46vw] lg:w-[40vw] xl:w-[36vw]">
                <Link href={item.href} className="group block focus-visible:outline-none">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-shadow duration-500 group-hover:ring-inverse-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-inverse-primary">
                    {/* Wider than its frame, so the drift never shows an edge. */}
                    <div data-drift className="absolute inset-y-0 -left-[8%] w-[116%]">
                      <Image
                        src={item.image}
                        alt={`${item.title} website`}
                        width={1900}
                        height={865}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 40vw"
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-inverse-surface/80 px-3 py-1 font-poster text-sm tracking-wider text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-inverse-surface opacity-0 transition-[opacity,translate] duration-500 group-hover:opacity-100 group-hover:-translate-y-1 group-focus-visible:opacity-100">
                      <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <p className="font-label text-[11px] uppercase tracking-widest text-inverse-on-surface/60">{item.industry}</p>
                      <h3 className="mt-1 font-poster text-[clamp(1.5rem,2.6vw,2.4rem)] uppercase leading-none text-white">{item.title}</h3>
                      <p className="mt-2 font-body text-sm text-inverse-primary">Started from the {item.kit}</p>
                    </div>
                    {item.metric && (
                      <div className="shrink-0 text-right">
                        <p className="font-poster text-[clamp(1.5rem,2.4vw,2.2rem)] leading-none text-white">{item.metric.value}</p>
                        <p className="mt-1 max-w-[9rem] font-body text-[11px] leading-snug text-inverse-on-surface/60">{item.metric.label}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
            <li className="flex w-[60vw] shrink-0 snap-start items-center sm:w-[40vw] md:w-[28vw]">
              <Link
                href="/work"
                className="group flex aspect-square w-full max-w-[18rem] flex-col items-center justify-center rounded-full border border-white/20 text-center transition-colors duration-500 hover:border-inverse-primary hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-[32px] text-inverse-primary transition-transform duration-500 group-hover:translate-x-1">arrow_forward</span>
                <span className="mt-3 font-poster text-2xl uppercase text-white">See all work</span>
              </Link>
            </li>
          </ul>
        </div>

        <p className="container-site mt-6 w-full font-body text-xs text-inverse-on-surface/50 md:hidden">Swipe to see more</p>
      </div>
    </section>
  );
}
