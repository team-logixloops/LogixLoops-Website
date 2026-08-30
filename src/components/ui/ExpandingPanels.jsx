"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * LOGIXLOOPS: Expanding Panels
 *
 * A row of interactive panels where the one under the pointer takes the space and
 * the rest fall back to a spine. Used for case study archives and project showcases.
 * Supports both link navigation (`href`) and modal triggers (`onClick`), with
 * support for blurred image backdrops or rich, luminous ambient gradient meshes.
 */
const REVEAL =
  "opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0 motion-reduce:transition-none";

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

  const active = Math.min(Math.max(0, activeIndex), items.length - 1);

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
        "transition-[grid-template-rows,grid-template-columns] duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
        className
      )}
    >
      {items.map((item, index) => {
        const isAction = Boolean(item.onClick);
        const ContentWrapper = item.href ? Link : "button";
        const wrapperProps = item.href
          ? {
              href: item.href,
              onFocus: () => setActiveIndex(index),
              onClick: () => setActiveIndex(index),
              className: "absolute inset-0 block text-left focus-visible:outline-none cursor-pointer w-full h-full",
            }
          : {
              type: "button",
              onFocus: () => setActiveIndex(index),
              onClick: () => {
                setActiveIndex(index);
                if (item.onClick) item.onClick(item);
              },
              className: "absolute inset-0 block text-left focus-visible:outline-none cursor-pointer w-full h-full p-0 bg-transparent border-0 appearance-none",
            };

        return (
          <li
            key={item.id}
            data-active={active === index}
            className="xp-panel group relative min-h-0 min-w-0 md:min-w-[76px] overflow-hidden rounded-2xl border border-outline-variant/30 group-data-[active=true]:border-white/40 bg-surface-container-low shadow-glass group-data-[active=true]:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            onMouseEnter={() => setActiveIndex(index)}
          >
            <ContentWrapper {...wrapperProps}>
              {/* Background Media or Luminous Rich Gradient Mesh */}
              {item.image ? (
                <>
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 60vw"
                    className="xp-panel__media object-cover scale-110 blur-[8px] opacity-45 group-data-[active=true]:opacity-60 group-data-[active=true]:blur-[6px] transition-all duration-700 ease-out group-hover:scale-115"
                  />
                  {/* Photo Scrim */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/40 backdrop-blur-[2px]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-data-[active=true]:opacity-0"
                  />
                </>
              ) : (
                <>
                  {/* Rich, Light, Vibrant Gradient Canvas */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105",
                      item.gradient
                        ? `bg-gradient-to-br ${item.gradient}`
                        : "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
                    )}
                    style={item.gradientStyle ? { background: item.gradientStyle } : undefined}
                  >
                    {/* Micro-dot / grid blueprint pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:18px_18px] opacity-35 pointer-events-none" />

                    {/* Luminous dynamic ambient light glow on active / hover */}
                    <div className="absolute -top-12 -right-12 w-96 h-96 bg-white/20 blur-[80px] rounded-full pointer-events-none transition-all duration-700 group-data-[active=true]:opacity-100 opacity-60 group-data-[active=true]:scale-110" />
                    <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-white/15 blur-[90px] rounded-full pointer-events-none transition-all duration-700 group-data-[active=true]:opacity-100 opacity-50" />
                  </div>

                  {/* Gradient Scrim tuned specifically to preserve top/mid color vibrancy while keeping bottom text crystal clear */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-45% to-transparent pointer-events-none"
                  />

                  {/* Sleek top edge glass highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                </>
              )}

              {/* Resting spine for collapsed panel in desktop */}
              <span
                aria-hidden="true"
                className="xp-panel__spine hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 font-label text-label-caps uppercase tracking-widest text-white/95 whitespace-nowrap [text-shadow:0_2px_12px_rgba(0,0,0,0.85)] transition-opacity duration-300 group-data-[active=true]:opacity-0 motion-reduce:transition-none"
              >
                {item.spineTitle || item.shortTitle || item.title}
              </span>

              {/* Expanded panel content */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-6 md:p-8">
                {item.eyebrow ? (
                  <span
                    className={cn(
                      "xp-panel__reveal font-label text-[10px] uppercase tracking-widest text-white font-medium border border-white/40 bg-white/15 backdrop-blur-md rounded-full px-3 py-1 shadow-sm",
                      REVEAL
                    )}
                  >
                    {item.eyebrow}
                  </span>
                ) : null}

                <h3
                  className={cn(
                    "xp-panel__reveal font-display text-headline-md text-white leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]",
                    REVEAL_TITLE
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "xp-panel__reveal font-body text-body-sm text-white/90 max-w-md [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]",
                    REVEAL
                  )}
                >
                  {item.description}
                </p>

                <div
                  className={cn(
                    "xp-panel__reveal flex items-center justify-between w-full pt-2",
                    REVEAL
                  )}
                >
                  {item.meta ? (
                    <span className="font-display text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 shadow-sm">
                      {item.meta}
                    </span>
                  ) : <span />}

                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-label uppercase tracking-wider text-white font-medium bg-white/20 hover:bg-white/30 border border-white/40 rounded-full px-3.5 py-1.5 backdrop-blur-md transition-all shadow-md group-hover:scale-105"
                  >
                    <span>{isAction ? "View Project Details" : "View Case Study"}</span>
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[16px]"
                    >
                      {isAction ? "open_in_new" : "arrow_outward"}
                    </span>
                  </span>
                </div>
              </div>
            </ContentWrapper>
          </li>
        );
      })}
    </ul>
  );
}
