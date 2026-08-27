"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LOGIXLOOPS: Expanding Panels
 *
 * A row of image panels where the one under the pointer takes the space and
 * the rest fall back to a spine. Used where a route has a small, finite set
 * of things that each deserve a picture, the case study archive, the eight
 * practices, and where a plain card grid was spending a lot of vertical
 * space saying so.
 *
 * Interaction is hover, focus and click, all three mapped to the same
 * handler, so a pointer, a keyboard and a touchscreen all reach every panel.
 * Each panel is a link in its own right, so activating one navigates whether
 * or not it was expanded first.
 *
 * @param {object} props
 * @param {Array<{
 *   id: string,
 *   href: string,
 *   title: string,
 *   description: string,
 *   image: string,
 *   imageAlt: string,
 *   eyebrow?: string,
 *   meta?: string,
 *   icon?: string
 * }>} props.items
 * @param {number} [props.defaultActiveIndex]
 * @param {string} [props.label]  Accessible name for the rail.
 * @param {string} [props.className]
 */
// Collapsed panels keep their copy in the DOM and drop it to zero opacity.
const REVEAL =
  "opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0 motion-reduce:transition-none";

// The title is the exception. Above `md` the collapsed panel has the rotated
// spine to name itself with, so the flat title hides; below `md` there is no
// spine, so a collapsed row keeps a single clamped line and stays legible.
const REVEAL_TITLE =
  "line-clamp-1 group-data-[active=true]:line-clamp-none transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:opacity-0 md:translate-y-2 md:group-data-[active=true]:opacity-100 md:group-data-[active=true]:translate-y-0 motion-reduce:transition-none";

export default function ExpandingPanels({
  items,
  defaultActiveIndex = 0,
  label,
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex, items]);

  if (!items?.length) return null;

  // Clamped rather than stored corrected, because the list length changes
  // underneath this component when a filter is applied
  const active = Math.min(Math.max(0, activeIndex), items.length - 1);

  // One track string drives both axes: the CSS custom properties are consumed
  // by `grid-template-columns` at `md` and up and by `grid-template-rows` below it
  const tracks = items
    .map((_, index) => (index === active ? "5fr" : "1fr"))
    .join(" ");

  return (
    <ul
      aria-label={label}
      style={{ "--xp-tracks": tracks }}
      className={cn(
        "xp-rail grid gap-3 w-full",
        "h-[640px] md:h-[520px]",
        "grid-cols-1 [grid-template-rows:var(--xp-tracks)]",
        "md:grid-rows-1 md:[grid-template-columns:var(--xp-tracks)]",
        // Smooth and fluid accordion expansion on hover
        "transition-[grid-template-rows,grid-template-columns] duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-active={active === index}
          className="xp-panel group relative min-h-0 min-w-0 md:min-w-[76px] overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low shadow-glass transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          onMouseEnter={() => setActiveIndex(index)}
        >
          <Link
            href={item.href}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className="absolute inset-0 block focus-visible:outline-none"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              className="xp-panel__media object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Two washes: bottom gradient for text contrast and dim wash for collapsed panels */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/45 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-on-surface/25 transition-opacity duration-500 group-data-[active=true]:opacity-0"
            />

            {/* Resting spine for collapsed panel in desktop */}
            <span
              aria-hidden="true"
              className="xp-panel__spine hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 font-label text-label-caps uppercase tracking-widest text-white/85 whitespace-nowrap [text-shadow:0_2px_10px_rgba(8,29,74,0.7)] transition-opacity duration-300 group-data-[active=true]:opacity-0 motion-reduce:transition-none"
            >
              {item.title}
            </span>

            {/* Expanded panel content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 md:p-8">
              {item.eyebrow ? (
                <span className={cn("xp-panel__reveal font-label text-[10px] uppercase tracking-widest text-white/80 border border-white/30 rounded-full px-2.5 py-1", REVEAL)}>
                  {item.eyebrow}
                </span>
              ) : null}

              <h3 className={cn("xp-panel__reveal font-display text-headline-md text-white leading-tight [text-shadow:0_2px_14px_rgba(8,29,74,0.65)]", REVEAL_TITLE)}>
                {item.title}
              </h3>

              <p className={cn("xp-panel__reveal font-body text-body-sm text-white/85 max-w-sm", REVEAL)}>
                {item.description}
              </p>

              <div className={cn("xp-panel__reveal flex items-center gap-2 pt-1", REVEAL)}>
                {item.meta ? (
                  <span className="font-display text-sm font-semibold text-white">
                    {item.meta}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-[18px] text-white/90"
                >
                  arrow_outward
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
