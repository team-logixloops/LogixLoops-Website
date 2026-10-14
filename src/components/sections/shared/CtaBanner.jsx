"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * The closing call to action.
 *
 * It used to be a static rounded rectangle that faded in once and then sat
 * there, the last thing on every page and the least alive. Now the whole
 * panel assembles as you scroll it into view:
 *
 *   - the card unmasks outward from its centre, so it reads as opening rather
 *     than as appearing;
 *   - its contents rise and resolve in sequence behind that;
 *   - the fox watermark and the two colour washes travel at their own rates,
 *     which is what gives the panel depth instead of a flat gradient.
 *
 * All of it is scrubbed to scroll position rather than fired on entry, so
 * scrolling back up runs it backwards and the section is never caught in a
 * half-finished state.
 */
export default function CtaBanner() {
  const root = useRef(null);

  useGSAP(
    () => {
      // Honour the OS setting: everything below is decoration, and the
      // section is fully legible in its final state.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panel = root.current.querySelector("[data-cta-panel]");
      const items = root.current.querySelectorAll("[data-cta-item]");

      /*
       * The reveal is a clip-path inset, not a scaleX. Scaling the card would
       * stretch the type inside it, text set at 60px would render at 53px
       * mid-animation and snap back. Insetting keeps every glyph at its real
       * size and simply uncovers more of the card.
       *
       * The radius is carried in the same `inset(... round ...)` value so the
       * corners relax as it opens; animating `border-radius` separately would
       * fight the clip and leave a hairline of square corner outside it.
       */
      /*
       * Both of these retire the moment they have finished.
       *
       * `clip-path` is not a compositor property. While one is set, the panel
       * and everything in it, two large blurred washes, the watermark, the
       * type, is painted through it, and while it is *animating* that repaint
       * happens on every frame. Leaving the final `inset(0%)` on the element
       * afterwards keeps the panel on the expensive paint path for the rest
       * of the page's life for no visual gain: an inset of zero clips
       * nothing, and the rounded corners come from `rounded-[2.5rem]` and
       * `overflow-hidden` on the same element, not from the clip.
       *
       * So the reveal runs, and then the clip is removed entirely and the
       * trigger is killed. Same for the item stagger and its transforms.
       * `onScrubComplete` rather than `onUpdate` so the teardown waits for
       * the half-second of scrub catch-up instead of cutting it short.
       */
      const clear = (self, targets, props) => {
        self.kill(false);
        gsap.set(targets, { clearProps: props });
      };

      const retire = (targets, props) => (self) => {
        if (self.progress < 1) return;
        clear(self, targets, props);
      };

      /* The panel's items fade in from `opacity: 0`, so if their scroll
         window ever collapses, and on a phone this section is the last thing
         before the footer, so it can, the copy never appears at all. A reveal
         is allowed to not animate; it is not allowed to hide the content. */
      const settleIfUnscrollable = (targets, props) => (self) => {
        if (self.end - self.start >= 1) return;
        clear(self, targets, props);
      };

      gsap.fromTo(
        panel,
        { clipPath: "inset(6% 10% 6% 10% round 4rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 2.5rem)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.5,
            fastScrollEnd: true,
            onRefresh: settleIfUnscrollable(panel, "clipPath"),
            onScrubComplete: retire(panel, "clipPath"),
          },
        }
      );

      gsap.from(items, {
        y: 44,
        opacity: 0,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "top 30%",
          scrub: 0.6,
          fastScrollEnd: true,
          onRefresh: settleIfUnscrollable(items, "transform,opacity,willChange"),
          onScrubComplete: retire(items, "transform,opacity,willChange"),
        },
      });

      // Parallax. Each layer gets its own distance, and the two washes travel
      // in opposite directions so the panel's interior keeps moving even once
      // the card itself has finished opening.
      const drift = [
        ["[data-cta-fox]", { y: -70, rotate: -4 }],
        ["[data-cta-wash='a']", { yPercent: -18, xPercent: 6 }],
        ["[data-cta-wash='b']", { yPercent: 16, xPercent: -8 }],
      ];
      drift.forEach(([selector, to]) => {
        gsap.to(root.current.querySelector(selector), {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            // A number, not `true`. Hard-linking a parallax layer to the
            // scrollbar hands it every jitter in the wheel input, and these
            // three layers are the slowest-moving thing in the section, which
            // is exactly where that jitter is most visible.
            scrub: 0.5,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="container-site py-stack-2xl relative overflow-hidden">
      <div
        data-cta-panel
        className="relative rounded-[2.5rem] p-stack-xl md:p-stack-2xl text-center overflow-hidden border border-primary/20 shadow-glass-elevated group"
      >
        {/* Immersive Background */}
        <div className="absolute inset-0 bg-surface-container-highest/30 z-0" />

        {/* Colour washes. No `blur-*` on either, deliberately, see
            `.cta-wash-a` / `.cta-wash-b` in globals.css for why: these are the
            only two layers on the site that are both large, blurred and moved
            on scroll, and that combination cannot be composited under this
            panel's rounded clip. The gradients carry their own softness, so
            the parallax below is now pure compositor work. */}
        <div
          data-cta-wash="a"
          className="cta-wash-a absolute top-[-50%] left-[-20%] w-[70%] h-[200%] z-0 pointer-events-none"
          style={{ willChange: "transform" }}
        />
        <div
          data-cta-wash="b"
          className="cta-wash-b absolute bottom-[-50%] right-[-20%] w-[60%] h-[200%] z-0 pointer-events-none"
          style={{ willChange: "transform" }}
        />

        {/* Watermark, knockout so the washes read through the fur.
            eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-cta-fox
          src="/brand/logo-fox-knockout.svg"
          alt=""
          aria-hidden="true"
          width={948}
          height={746}
          loading="lazy"
          decoding="async"
          className="pointer-events-none select-none absolute -right-20 -bottom-24 w-[520px] max-w-none opacity-[0.06] z-0"
          style={{ willChange: "transform" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Trust Indicator */}
          <div
            data-cta-item
            /* Opaque tint rather than a backdrop blur. A backdrop filter has
               to re-sample everything behind it whenever that changes, and
               what is behind this is two blurred washes being parallaxed
               inside a panel whose clip-path is animating. It was three
               stacked per-frame costs to frost a pill 40px tall. */
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest/85 border border-outline-variant/40 mb-8 shadow-sm"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            {/* Two facts, not a grade. "Enterprise Grade Security & Scale" is
                a claim with nothing behind it. These are two things a prospect
                can hold us to on the first call. */}
            <span className="font-label text-label-sm text-on-surface tracking-widest uppercase font-semibold">
              Price on the box · Yours from day one
            </span>
          </div>

          <h2
            data-cta-item
            className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 leading-tight tracking-tight"
          >
            Let&apos;s go and build <br className="hidden md:block" />
            <span className="text-gradient-primary">your unfair advantage.</span>
          </h2>

          <p
            data-cta-item
            className="font-body text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto"
          >
            Tell us what you need. You talk to the people who would build it,
            and you leave the first call with the right kit and a written
            price. If no kit fits, we say so on the call.
          </p>

          <div
            data-cta-item
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            {/* Sentence case. These two used to shout in all caps at the
                bottom of every page on the site, which reads as urgency the
                page has not earned. */}
            <Button href="/contact" size="lg" className="w-full sm:w-auto px-10 shadow-btn-primary-lg text-[16px] h-14">
              Start a project
            </Button>
            <Button href="/kits" variant="ghost" size="lg" className="w-full sm:w-auto px-10 bg-surface-container-lowest/70 hover:bg-surface-container-lowest/95 text-[16px] h-14" icon="arrow_forward" iconPosition="right">
              Browse the kits
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
