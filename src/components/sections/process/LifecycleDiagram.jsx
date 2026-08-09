"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

/**
 * LifecycleDiagram, draws the *shape* of a development lifecycle.
 *
 * The geometry is the argument the section is making. Waterfall is a straight
 * line because it only travels one way. The V is folded so every design level
 * sits opposite the test level that proves it, with the pairing drawn in.
 * Spiral widens outward because each loop costs more than the last. Scrum is a
 * closed ring because it has no terminal phase. Kanban is a board, because
 * that is literally what it is. DevOps is a lemniscate because build and
 * operate feed each other indefinitely.
 *
 * Everything is computed from one parametric function per shape, sampled into
 * a path. That single `d` string then drives three things: the stroke that is
 * drawn on entry, the node positions, and the `offset-path` the travelling
 * pulse rides, so the pulse follows a spiral or a lemniscate for free,
 * without a second description of the curve existing anywhere.
 */

const VIEW = { w: 820, h: 300 };
const CX = VIEW.w / 2;
const CY = VIEW.h / 2;

const lerp = (a, b, u) => a + (b - a) * u;

/**
 * Each entry maps t ∈ [0,1] to a point, says whether the curve closes, and
 * decides where a node's label sits relative to it. `nodeT` differs between
 * open and closed shapes: an open path wants a node on each end, a closed one
 * would then draw the first and last node on top of each other.
 */
const SHAPES = {
  linear: {
    closed: false,
    at: (t) => ({ x: lerp(80, 740, t), y: CY }),
    nodeT: (i, n) => (n === 1 ? 0.5 : i / (n - 1)),
    label: (p) => ({ x: p.x, y: p.y + 40, anchor: "middle" }),
  },

  vmodel: {
    closed: false,
    at: (t) => {
      const A = { x: 96, y: 58 };
      const B = { x: CX, y: 246 };
      const C = { x: 724, y: 58 };
      if (t <= 0.5) {
        const u = t * 2;
        return { x: lerp(A.x, B.x, u), y: lerp(A.y, B.y, u) };
      }
      const u = (t - 0.5) * 2;
      return { x: lerp(B.x, C.x, u), y: lerp(B.y, C.y, u) };
    },
    nodeT: (i, n) => (n === 1 ? 0.5 : i / (n - 1)),
    label: (p) => {
      if (p.x < CX - 24) return { x: p.x - 24, y: p.y + 4, anchor: "end" };
      if (p.x > CX + 24) return { x: p.x + 24, y: p.y + 4, anchor: "start" };
      return { x: p.x, y: p.y + 40, anchor: "middle" };
    },
  },

  spiral: {
    closed: false,
    at: (t) => {
      // Archimedean: radius grows linearly with the angle, so each loop is
      // wider than the last by the same amount, the budget metaphor.
      const theta = 1 + t * 11;
      const r = 22 + 9.6 * theta;
      return { x: CX + r * Math.cos(theta), y: CY + r * Math.sin(theta) };
    },
    nodeT: (i, n) => (n === 1 ? 1 : i / (n - 1)),
    label: radialLabel,
  },

  cycle: {
    closed: true,
    at: (t) => {
      const theta = -Math.PI / 2 + t * Math.PI * 2;
      return { x: CX + 104 * Math.cos(theta), y: CY + 104 * Math.sin(theta) };
    },
    nodeT: (i, n) => i / n,
    label: radialLabel,
  },

  infinity: {
    closed: true,
    at: (t) => {
      // Lemniscate of Bernoulli. It self-intersects at the centre, which is
      // why nodes are offset by half a step, otherwise two of them land on
      // the crossing point and overlap exactly.
      const theta = t * Math.PI * 2;
      const k = 1 + Math.sin(theta) ** 2;
      return {
        x: CX + (290 * Math.cos(theta)) / k,
        y: CY + (290 * Math.sin(theta) * Math.cos(theta)) / k,
      };
    },
    nodeT: (i, n) => (i + 0.5) / n,
    label: (p) =>
      p.y < CY
        ? { x: p.x, y: p.y - 26, anchor: "middle" }
        : { x: p.x, y: p.y + 34, anchor: "middle" },
  },
};

/** Pushes the label straight out from the centre, the only placement that
 *  works on a ring or a spiral without labels colliding with the curve. */
function radialLabel(p) {
  const dx = p.x - CX;
  const dy = p.y - CY;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: p.x + (dx / len) * 30,
    y: p.y + (dy / len) * 30 + 4,
    anchor: dx / len > 0.34 ? "start" : dx / len < -0.34 ? "end" : "middle",
  };
}

function buildPath(at, closed, steps = 220) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = at(i / steps);
    d += `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }
  return closed ? `${d.trim()} Z` : d.trim();
}

/* Kanban is the one model whose diagram is not a curve, it is a board, and
   drawing it as anything else would be a worse explanation. The pulse still
   needs a path, so it rides a flow line under the columns. */
const LANES_FLOW = `M96 268 L724 268`;
const LANE_CARDS = [3, 2, 2, 1, 3];

export default function LifecycleDiagram({ model }) {
  const pathRef = useRef(null);
  const nodesRef = useRef(null);

  const { d, nodes, isLanes } = useMemo(() => {
    const stages = model.stages;
    if (model.shape === "lanes") {
      return { d: LANES_FLOW, nodes: [], isLanes: true };
    }
    const shape = SHAPES[model.shape] ?? SHAPES.linear;
    const points = stages.map((stage, i) => {
      const p = shape.at(shape.nodeT(i, stages.length));
      return { ...p, stage, label: shape.label(p) };
    });
    return {
      d: buildPath(shape.at, shape.closed),
      nodes: points,
      isLanes: false,
    };
  }, [model]);

  // Redraw on every model change. `model.id` is the dependency rather than
  // `d`, because two models could in principle share geometry and we still
  // want the diagram to re-announce itself when the reader picks a new one.
  useEffect(() => {
    const path = pathRef.current;
    const group = nodesRef.current;
    if (!path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      if (group) gsap.set(group.children, { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline();

    // The board's flow line is already dashed by design, and a draw-on tween
    // overwrites `stroke-dasharray` to do its work, so the one shape whose
    // dashes carry meaning is the one shape that does not get drawn in.
    if (!isLanes) {
      const length = path.getTotalLength();
      tl.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" }
      );
    }

    if (group?.children.length) {
      tl.fromTo(
        group.children,
        { opacity: 0, scale: 0.55 },
        {
          opacity: 1,
          scale: 1,
          transformOrigin: "50% 50%",
          duration: 0.45,
          ease: "back.out(2)",
          stagger: 0.07,
        },
        isLanes ? 0 : "-=0.75"
      );
    }

    return () => tl.kill();
  }, [model.id, isLanes]);

  return (
    <figure className="mt-stack-md">
      <svg
        key={model.id}
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label={`${model.name} lifecycle: ${model.stages.join(" → ")}${
          SHAPES[model.shape]?.closed ? ", repeating" : ""
        }`}
      >
        {/* The curve itself. Drawn once on entry, then left alone, a stroke
            that keeps animating would compete with the copy beside it. */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          strokeWidth={isLanes ? 1.5 : 2}
          strokeLinecap="round"
          className={isLanes ? "stroke-outline-variant" : "stroke-primary/55"}
          strokeDasharray={isLanes ? "6 7" : undefined}
        />

        {/* Travelling pulse. Rides the same `d` via `offset-path`, so it
            follows whichever curve is on screen without any extra maths. */}
        <circle
          r="12"
          className="lifecycle-pulse fill-secondary/20"
          style={{ offsetPath: `path("${d}")` }}
        />
        <circle
          r="4.5"
          className="lifecycle-pulse fill-secondary"
          style={{ offsetPath: `path("${d}")` }}
        />

        {isLanes ? <KanbanBoard stages={model.stages} ref={nodesRef} /> : null}

        {/* V-model only: the horizontal pairing between a design level and the
            test level that verifies it. This is the entire point of the V, so
            leaving it implicit would be drawing the wrong diagram. */}
        {model.shape === "vmodel" &&
          nodes.slice(0, Math.floor(nodes.length / 2)).map((n, i) => {
            const partner = nodes[nodes.length - 1 - i];
            return (
              <line
                key={`pair-${i}`}
                x1={n.x + 18}
                y1={n.y}
                x2={partner.x - 18}
                y2={partner.y}
                strokeDasharray="4 6"
                className="stroke-tertiary/45"
                strokeWidth="1.5"
              />
            );
          })}

        {!isLanes && (
          <g ref={nodesRef}>
            {nodes.map((n, i) => (
              <g key={n.stage}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="15"
                  className="fill-surface-container-lowest stroke-primary/50"
                  strokeWidth="1.5"
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  className="fill-primary font-label"
                  style={{ fontSize: 11, fontWeight: 700 }}
                >
                  {i + 1}
                </text>
                <text
                  x={n.label.x}
                  y={n.label.y}
                  textAnchor={n.label.anchor}
                  className="fill-on-surface-variant font-label"
                  style={{ fontSize: 12, fontWeight: 500 }}
                >
                  {n.stage}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </figure>
  );
}

/** The Kanban board. Column count comes from the model's stages, so the
 *  geometry stays derived rather than drawn by hand. */
function KanbanBoard({ stages, ref }) {
  const left = 88;
  const right = 732;
  const colW = (right - left) / stages.length;

  return (
    <g ref={ref}>
      {stages.map((stage, i) => {
        const x = left + i * colW;
        const cards = LANE_CARDS[i] ?? 2;
        return (
          <g key={stage}>
            <rect
              x={x + 6}
              y={44}
              width={colW - 12}
              height={196}
              rx="12"
              className="fill-surface-container-low stroke-outline-variant/70"
              strokeWidth="1"
            />
            <text
              x={x + colW / 2}
              y={30}
              textAnchor="middle"
              className="fill-on-surface-variant font-label"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              {stage}
            </text>
            {Array.from({ length: cards }).map((_, j) => (
              <rect
                key={j}
                x={x + 18}
                y={66 + j * 34}
                width={colW - 36}
                height="24"
                rx="6"
                className="fill-primary/15"
              />
            ))}
            {/* The WIP cap is the mechanism, not decoration: it is what makes
                a board Kanban rather than a to-do list with columns. */}
            {i === 2 && (
              <text
                x={x + colW / 2}
                y={228}
                textAnchor="middle"
                className="fill-tertiary font-label"
                style={{ fontSize: 11, fontWeight: 700 }}
              >
                WIP ≤ 3
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
