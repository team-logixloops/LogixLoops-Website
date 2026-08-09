"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Badge from "@/components/ui/Badge";
import { SDLC_MODELS } from "@/data/methodologies";
import LifecycleDiagram from "./LifecycleDiagram";

/**
 * MethodologyExplorer, six lifecycle models, one at a time.
 *
 * Built as a real tablist rather than as a row of divs with click handlers:
 * six mutually exclusive views of the same panel is exactly what the tab
 * pattern describes, so arrow keys move between models, Home/End jump to the
 * ends, and the panel is announced when it changes. The selected model is
 * also the only one whose sweep border stays lit, so the current state is
 * visible without hovering anything.
 */
export default function MethodologyExplorer() {
  const [activeId, setActiveId] = useState(SDLC_MODELS[0].id);
  const tabsRef = useRef(null);
  const panelRef = useRef(null);

  const active = SDLC_MODELS.find((m) => m.id === activeId) ?? SDLC_MODELS[0];
  const activeIndex = SDLC_MODELS.indexOf(active);

  // Re-entry animation for the panel. Deliberately short: this fires on a
  // click the reader just made, so anything longer than a beat reads as lag
  // rather than as polish.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      panel.querySelectorAll("[data-panel-item]"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.06 }
    );
    return () => tween.kill();
  }, [activeId]);

  const onTabKeyDown = (event) => {
    const keys = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next = null;

    if (event.key in keys) {
      next =
        (activeIndex + keys[event.key] + SDLC_MODELS.length) %
        SDLC_MODELS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = SDLC_MODELS.length - 1;
    }

    if (next === null) return;
    event.preventDefault();
    setActiveId(SDLC_MODELS[next].id);
    tabsRef.current
      ?.querySelector(`#tab-${SDLC_MODELS[next].id}`)
      ?.focus();
  };

  return (
    <div className="grid gap-gutter lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
      {/* Model list. A horizontal scroller on phones, a stack from lg,
          six entries is more than a phone can show vertically without
          pushing the panel itself below two screenfuls. */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Software development lifecycle models"
        aria-orientation="vertical"
        onKeyDown={onTabKeyDown}
        className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SDLC_MODELS.map((model) => {
          const selected = model.id === activeId;
          return (
            <button
              key={model.id}
              id={`tab-${model.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="methodology-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(model.id)}
              className={`glow-sweep group shrink-0 rounded-xl border p-4 text-left transition-colors duration-300
                lg:w-full lg:shrink ${
                  selected
                    ? "is-lit border-primary/40 bg-surface-container-lowest shadow-glass"
                    : "border-outline-variant/40 bg-surface-container-lowest/50 hover:border-primary/25"
                }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${
                    selected ? "text-primary" : "text-outline"
                  }`}
                  aria-hidden="true"
                >
                  {model.icon}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block font-heading text-body-md whitespace-nowrap lg:whitespace-normal ${
                      selected ? "text-on-surface" : "text-on-surface-variant"
                    }`}
                  >
                    {model.name}
                  </span>
                  <span className="mt-0.5 hidden font-label text-label-sm uppercase tracking-widest text-outline lg:block">
                    {model.stance === "core" ? "Core" : "By signal"}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        ref={panelRef}
        id="methodology-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={-1}
        className="glow-sweep rounded-2xl border border-outline-variant/40 bg-surface-container-lowest/70 p-6 shadow-glass-elevated backdrop-blur-2xl md:p-10"
      >
        <div data-panel-item className="flex flex-wrap items-start gap-4">
          <span
            className="material-symbols-outlined icon-md text-primary"
            aria-hidden="true"
          >
            {active.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-headline-md text-on-surface">
              {active.name}
            </h3>
            <p className="mt-1 font-label text-label-caps uppercase tracking-widest text-outline">
              {active.era}
            </p>
          </div>
          <Badge variant={active.stance === "core" ? "filled" : "outlined"}>
            {active.stance === "core" ? "Core method" : "Applied by signal"}
          </Badge>
        </div>

        <p
          data-panel-item
          className="mt-stack-md font-body text-body-lg text-on-surface-variant"
        >
          {active.summary}
        </p>

        <div data-panel-item>
          <LifecycleDiagram model={active} />
        </div>

        <div
          data-panel-item
          className="mt-stack-md grid gap-gutter sm:grid-cols-2"
        >
          <TraitList
            title="Where it wins"
            icon="check_circle"
            tone="text-primary"
            items={active.strengths}
          />
          <TraitList
            title="Where it breaks"
            icon="error"
            tone="text-error"
            items={active.risks}
          />
        </div>

        <div
          data-panel-item
          className="mt-stack-md rounded-xl border border-outline-variant/40 bg-surface-container-low/60 p-5"
        >
          <p className="font-label text-label-caps uppercase tracking-widest text-outline">
            Best for
          </p>
          <p className="mt-2 font-body text-body-md text-on-surface">
            {active.bestFor}
          </p>
        </div>

        {/* Our position, set apart from the neutral description above it. The
            distinction matters: everything before this point is true of the
            model, everything after it is a claim about us. */}
        <div
          data-panel-item
          className="mt-4 rounded-xl border-l-2 border-primary bg-primary/5 p-5"
        >
          <p className="font-label text-label-caps uppercase tracking-widest text-primary">
            How LogixLoops uses it
          </p>
          <p className="mt-2 font-body text-body-md text-on-surface">
            {active.verdict}
          </p>
        </div>
      </div>
    </div>
  );
}

function TraitList({ title, icon, tone, items }) {
  return (
    <div>
      <h4 className="font-label text-label-caps uppercase tracking-widest text-outline">
        {title}
      </h4>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={`material-symbols-outlined mt-0.5 shrink-0 text-[18px] ${tone}`}
              aria-hidden="true"
            >
              {icon}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
