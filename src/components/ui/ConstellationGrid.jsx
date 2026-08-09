"use client";

import { useEffect, useRef } from "react";
import { FOX_OUTLINE } from "@/lib/foxOutline";

/**
 * Responsive, cursor-reactive node mesh. Sized to its parent element
 * (not the viewport) via ResizeObserver so it fits whatever container
 * it's dropped into, hero, section, card, etc.
 *
 * Node density and interaction radius scale down on small screens for
 * both performance (weaker GPUs/CPUs) and legibility (fewer, larger
 * gaps read better on narrow viewports). Touch devices get pointer
 * (not just mouse) events so the shockwave effect works on mobile too.
 * `prefers-reduced-motion` disables the physics loop entirely and
 * renders a single static frame.
 */
export default function ConstellationGrid({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let nodes = [];

    const pointer = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      radius: 220,
      active: false,
    };

    // Responsive tuning, coarser grid + smaller interaction radius on
    // narrow viewports, both for perf and so the effect doesn't feel
    // cramped on small screens.
    const getTuning = (w) => {
      if (w < 640) return { spacing: 74, pointerRadius: 130, maxConn: 62 };
      if (w < 1024) return { spacing: 64, pointerRadius: 170, maxConn: 68 };
      return { spacing: 55, pointerRadius: 220, maxConn: 75 };
    };

    const initNodes = () => {
      const { spacing } = getTuning(width);
      nodes = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          nodes.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
            radius: Math.random() * 1.2 + 1.2,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      pointer.radius = getTuning(width).pointerRadius;
      initNodes();
    };

    const setPointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
      pointer.active = false;
    };

    const handleMouseMove = (e) => setPointer(e.clientX, e.clientY);
    const handleMouseLeave = () => clearPointer();
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    };
    const handleTouchEnd = () => clearPointer();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    // Drawn dark-on-light. The alphas below were tuned against a white
    // ground: navy at 0.18–0.25 is a whisper on paper but would be
    // invisible inverted, so these are not the dark-mode numbers negated.
    const bgColor = "#f2f7fe"; // faintly blue paper, one step under `surface`
    const NODE_RGB = [8, 29, 74]; // brand navy
    const ACCENT_RGB = [40, 104, 198]; // brand royal, holds up on light where the lighter blue washes out
    const nodeColor = NODE_RGB.join(", ");
    const accentColor = ACCENT_RGB.join(", ");

    const drawStaticFrame = () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${nodeColor}, 0.3)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Paint immediately so the canvas is never a blank frame while the
    // rAF loop is still gated behind the IntersectionObserver's first
    // (async) callback.
    drawStaticFrame();

    if (prefersReducedMotion) {
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
        canvas.removeEventListener("touchcancel", handleTouchEnd);
      };
    }

    let lastTime = performance.now();
    let isRunning = false;

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    // Only spend main-thread budget on this when it's actually visible,
    // an off-screen canvas competing for every rAF tick is the single
    // biggest thing that makes page scroll feel janky. The unconditional
    // `start()` call below (after `render` is defined) handles the initial
    // paint; this observer's first callback is ignored for *stopping* so a
    // delayed/incorrect first reading can never leave the canvas blank,
    // only real subsequent scroll-away/return toggles it after that.
    let hasSeenFirstIntersection = false;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!hasSeenFirstIntersection) {
          hasSeenFirstIntersection = true;
          if (!entry.isIntersecting) return;
        }
        entry.isIntersecting ? start() : stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else if (intersectionObserverEntryIsVisible(container)) {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function intersectionObserverEntryIsVisible(el) {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }

    /* ─── Loops ───
     * The company is called LogixLoops, so what the cursor draws in the mesh
     * is a loop: every node inside a radial band, sorted by its angle around
     * the pointer and wired into one closed curve. Two bands nest, and a
     * current runs around each via a travelling dash.
     *
     * This replaced concentric pulse rings drawn per node, which were circles
     * centred on nodes rather than paths through them, they read as sonar
     * pings, and carried floating hex labels that looked like debug output.
     *
     * `loopStrength` eases 0→1 rather than switching, so the loops draw
     * themselves in when the pointer arrives and unwind when it leaves.
     */
    // `at` scales the fox outline against the pointer radius. `speed` is the
    // dash travel, signed, the two run opposite ways, which is what stops
    // them reading as one thick line.
    const LOOP_BANDS = [
      { at: 0.66, lineWidth: 1.6, alpha: 0.62, dash: [9, 9], speed: -100 },
      { at: 1.02, lineWidth: 1, alpha: 0.26, dash: [3, 13], speed: 62 },
    ];
    let loopStrength = 0;
    let loopPhase = 0;
    // Reused across frames and bands. This runs every rAF tick, so a fresh
    // array per band per frame would be a few hundred short-lived
    // allocations a second.
    const ring = [];
    const near = [];

    const drawLoops = (dt) => {
      loopStrength += ((pointer.active ? 1 : 0) - loopStrength) * Math.min(1, dt * 5);
      if (loopStrength < 0.01) return;
      loopPhase += dt;

      const R = pointer.radius;
      const spacing = getTuning(width).spacing;
      // How far a mesh node may sit from an outline vertex and still capture
      // it. Half the lattice spacing: wide enough that most vertices find a
      // node, tight enough that the silhouette survives the detour.
      const tolerance = spacing * 0.5;

      /*
       * Only nodes in the pointer's neighbourhood can be captured, so gather
       * them once per frame rather than scanning the whole lattice for each
       * of the 72 outline vertices in each of the two bands. Cuts the inner
       * loop from ~90k distance tests a frame to a few thousand.
       */
      near.length = 0;
      const reach = R * 1.15;
      for (const n of nodes) {
        if (Math.abs(n.x - pointer.x) < reach && Math.abs(n.y - pointer.y) < reach) {
          near.push(n);
        }
      }

      for (const band of LOOP_BANDS) {
        const scale = R * band.at;

        /*
         * Walk the fox outline, and pull each vertex toward the nearest mesh
         * node, magnetism, not snapping. The shape leads and the lattice
         * tugs at it, so the loop reads as the mark drawn *through* the mesh.
         *
         * This replaced a circle sampled by angular sector. A circle is what
         * a generic particle background draws; the point of the effect is
         * that this company is called LogixLoops and its mark is a fox.
         *
         * The 0.35 exponent pulls hard toward the true outline: a node has to
         * sit almost exactly on a vertex to hold it in place, so the fox
         * stays legible and the nodes read as tugging it rather than
         * dictating it. A gentler curve here dissolves the silhouette.
         */
        ring.length = 0;
        for (let i = 0; i < FOX_OUTLINE.length; i++) {
          const idealX = pointer.x + FOX_OUTLINE[i][0] * scale;
          const idealY = pointer.y + FOX_OUTLINE[i][1] * scale;

          let bestX = idealX;
          let bestY = idealY;
          let bestErr = Infinity;
          for (const n of near) {
            const dx = n.x - idealX;
            const dy = n.y - idealY;
            const err = Math.sqrt(dx * dx + dy * dy);
            if (err < bestErr) {
              bestErr = err;
              bestX = n.x;
              bestY = n.y;
            }
          }

          if (bestErr >= tolerance) {
            ring.push({ x: idealX, y: idealY });
            continue;
          }
          const w = Math.pow(bestErr / tolerance, 0.35);
          ring.push({
            x: bestX + (idealX - bestX) * w,
            y: bestY + (idealY - bestY) * w,
          });
        }

        /*
         * Quadratic segments whose control points are the chosen nodes and
         * whose endpoints are the midpoints between them. Cheaper than
         * fitting splines, and it guarantees a closed curve with no corners:
         * the curve bulges toward each node instead of hitting it exactly,
         * which is what keeps the loop reading as one continuous line.
         */
        ctx.beginPath();
        const first = ring[0];
        const last = ring[ring.length - 1];
        ctx.moveTo((last.x + first.x) / 2, (last.y + first.y) / 2);
        for (let i = 0; i < ring.length; i++) {
          const cur = ring[i];
          const next = ring[(i + 1) % ring.length];
          ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + next.x) / 2, (cur.y + next.y) / 2);
        }
        ctx.closePath();

        ctx.setLineDash(band.dash);
        ctx.lineDashOffset = loopPhase * band.speed;
        ctx.lineWidth = band.lineWidth;
        ctx.strokeStyle = `rgba(${accentColor}, ${band.alpha * loopStrength})`;
        ctx.stroke();
      }

      // Canvas line dash lives on the context, not on the path, leaving it
      // set would dash the mesh's own connection lines next frame.
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
    };

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      pointer.vx = (pointer.x - pointer.prevX) / (dt * 1000 || 1);
      pointer.vy = (pointer.y - pointer.prevY) / (dt * 1000 || 1);
      pointer.prevX = pointer.x;
      pointer.prevY = pointer.y;

      const speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      const SPRING_K = 18;
      const DAMPING = 0.82;

      for (const n of nodes) {
        n.pulse += dt * 3;

        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pointer.radius && dist > 0) {
          const power = 1 - dist / pointer.radius;
          const force = power * (1500 + speed * 150);
          const angle = Math.atan2(dy, dx);
          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
        }

        const homeDx = n.baseX - n.x;
        const homeDy = n.baseY - n.y;
        n.vx += homeDx * SPRING_K * dt;
        n.vy += homeDy * SPRING_K * dt;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }

      const { maxConn } = getTuning(width);
      const maxConnSq = maxConn * maxConn;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const ndx = n.x - n2.x;
          const ndy = n.y - n2.y;
          const distSq = ndx * ndx + ndy * ndy;
          if (distSq < maxConnSq) {
            const nDist = Math.sqrt(distSq);
            const alpha = (1 - nDist / maxConn) * 0.18;
            ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      /*
       * Node highlight falls off smoothly with distance rather than flipping
       * at the radius. The binary version lit every node inside 220px to full
       * accent at full size, which drew a hard-edged blue cloud with a
       * visible circular edge, it read as a rendering artefact rather than
       * as attention following the cursor.
       */
      for (const n of nodes) {
        const dx = pointer.x - n.x;
        const dy = pointer.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cubed so the lit core stays tight and the edge dissolves instead
        // of ending.
        const t = dist < pointer.radius ? Math.pow(1 - dist / pointer.radius, 3) : 0;

        const restAlpha = 0.22 + Math.sin(n.pulse) * 0.08;
        const alpha = restAlpha + (0.9 - restAlpha) * t;

        // Colour interpolates too. Switching between navy and royal at a
        // threshold would just move the hard edge from the alpha to the hue.
        const r = Math.round(NODE_RGB[0] + (ACCENT_RGB[0] - NODE_RGB[0]) * t);
        const g = Math.round(NODE_RGB[1] + (ACCENT_RGB[1] - NODE_RGB[1]) * t);
        const b = Math.round(NODE_RGB[2] + (ACCENT_RGB[2] - NODE_RGB[2]) * t);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        const currentRadius = n.radius + Math.sin(n.pulse) * 0.3 + n.radius * 1.3 * t;

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      }

      drawLoops(dt);

      if (isRunning) animationFrameId = requestAnimationFrame(render);
    };

    start();

    return () => {
      stop();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
