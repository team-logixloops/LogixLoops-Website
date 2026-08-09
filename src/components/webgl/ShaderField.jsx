"use client";

import { useEffect, useMemo, useRef } from "react";
import { getPreset } from "./presets";

/**
 * LOGIXLOOPS: the contour field behind an interior hero.
 *
 * A single full-screen quad running a fragment shader that draws banded
 * contour lines through a warped noise field. Every route gets its own tuning
 * (see `presets.js`); the shader itself is the same everywhere.
 *
 * It is decoration, and it behaves like decoration:
 *
 *   - Nothing is rendered at all without WebGL2. The section's own background
 *     colour is the documented fallback, so a machine without it sees the
 *     design rather than a hole in it.
 *   - `prefers-reduced-motion` gets one static frame, not a paused loop.
 *   - The rAF loop only runs while the canvas is on screen and the tab is
 *     visible. A field two pages up costs nothing.
 *   - The GL context is released on unmount. Browsers cap live contexts around
 *     sixteen, and every interior route mounts one of these.
 *
 * Mounted through `FieldBackdrop`, which is what keeps it out of the route's
 * first-load bundle and out of the server render.
 */

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/*
 * Value noise plus three octaves of fbm, contoured by taking the fractional
 * part of the field scaled by the band count. `fwidth` gives each line a
 * constant apparent thickness regardless of how steep the field is there,
 * which is what stops the dense presets (security, technology) from turning
 * into a solid block where the gradient is steepest.
 */
const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec3  u_pointer;   // xy in pixels, z = strength
uniform vec3  u_colorA;
uniform vec3  u_colorB;
uniform float u_bands;
uniform float u_scale;
uniform float u_warp;
uniform float u_opacity;

out vec4 outColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float total = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    total += noise(p) * amp;
    p *= 2.03;
    amp *= 0.5;
  }
  return total;
}

void main() {
  // Aspect-corrected, origin at centre.
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  vec2 p = uv * u_scale;

  // The field drifts with time and travels with the page, so scrolling past a
  // hero moves the contours rather than sliding a static image.
  p.y += u_scroll;

  // Warp: displace the sample point by the field itself. At 0 the contours are
  // a ruled plan; at 1 they are weather.
  vec2 warp = vec2(
    fbm(p + vec2(0.0, u_time)),
    fbm(p + vec2(u_time, 0.0))
  );
  p += (warp - 0.5) * u_warp;

  // The pointer pushes a shallow well into the field. Presets with pointer 0
  // never receive coordinates, so this term stays at zero for them.
  if (u_pointer.z > 0.0) {
    vec2 ptr = (u_pointer.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
    float d = length(uv - ptr);
    p += normalize(uv - ptr + 1e-5) * exp(-d * 6.0) * u_pointer.z;
  }

  float field = fbm(p);

  // Contour lines: distance to the nearest band edge, normalised by the local
  // rate of change so every line reads the same weight.
  float scaled = field * u_bands;
  float edge = abs(fract(scaled) - 0.5);
  float line = 1.0 - smoothstep(0.0, fwidth(scaled) * 1.4, edge);

  vec3 color = mix(u_colorA, u_colorB, clamp(field * 1.35, 0.0, 1.0));

  // Fade toward the frame so the layer never ends on a hard rectangle.
  float vignette = 1.0 - smoothstep(0.35, 0.95, length(uv));

  outColor = vec4(color, line * u_opacity * vignette);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderField({ preset = "home", overrides, className = "" }) {
  const canvasRef = useRef(null);

  /* The effect must re-run when a caller changes an override, but `overrides`
     is an object literal at almost every call site and would therefore be a
     new reference on every render. Keying on its serialised form makes the
     dependency value-based rather than identity-based. */
  const overrideKey = useMemo(
    () => (overrides ? JSON.stringify(overrides) : ""),
    [overrides]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const host = canvas.parentElement ?? canvas;
    const tuning = { ...getPreset(preset), ...(overrides ?? {}) };

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
    /* No WebGL2, no field. The section colour behind this canvas is the
       intended appearance in that case, so there is nothing to fall back to
       and nothing to report. */
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    // Two triangles covering clip space.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: u("u_res"),
      time: u("u_time"),
      scroll: u("u_scroll"),
      pointer: u("u_pointer"),
      colorA: u("u_colorA"),
      colorB: u("u_colorB"),
      bands: u("u_bands"),
      scale: u("u_scale"),
      warp: u("u_warp"),
      opacity: u("u_opacity"),
    };

    gl.uniform3fv(uniforms.colorA, tuning.colorA);
    gl.uniform3fv(uniforms.colorB, tuning.colorB);
    gl.uniform1f(uniforms.bands, tuning.bands);
    gl.uniform1f(uniforms.scale, tuning.scale);
    gl.uniform1f(uniforms.warp, tuning.warp);
    gl.uniform1f(uniforms.opacity, tuning.opacity);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pointerRadius = tuning.pointer ?? 0;
    const pointer = { x: -9999, y: -9999, strength: 0 };
    let scroll = 0;
    let visible = false;
    let frame = 0;

    /* Cap at 2. Beyond that the extra pixels are invisible in a decorative
       layer and the fill cost is real on a phone. */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(host.clientWidth * dpr));
      const h = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uniforms.res, w, h);
    };

    /* How far this section has travelled through the viewport, 0 to 1-ish.
       Read from layout rather than from a scroll event so it stays correct
       after a resize or an anchor jump. */
    const readScroll = () => {
      const rect = host.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      scroll = span > 0 ? (window.innerHeight - rect.top) / span : 0;
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      pointer.strength = inside ? pointerRadius : 0;
      // GL's origin is bottom-left; the pointer's is top-left.
      pointer.x = (event.clientX - rect.left) * dpr;
      pointer.y = (rect.bottom - event.clientY) * dpr;
    };

    if (pointerRadius > 0) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const draw = (elapsed) => {
      gl.uniform1f(uniforms.time, elapsed * tuning.speed);
      gl.uniform1f(uniforms.scroll, scroll * 0.8);
      gl.uniform3f(uniforms.pointer, pointer.x, pointer.y, pointer.strength);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let startedAt = 0;
    const tick = (now) => {
      if (!startedAt) startedAt = now;
      resize();
      readScroll();
      draw((now - startedAt) / 1000);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
      startedAt = 0;
    };

    /* Reduced motion still gets the design, but it gets one
       frame and no loop. */
    const drawStatic = () => {
      resize();
      readScroll();
      draw(0);
    };

    const sync = () => {
      if (reducedMotion) return;
      if (visible && !document.hidden) play();
      else stop();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px" }
    );
    observer.observe(host);

    const resizeObserver = new ResizeObserver(() => {
      if (reducedMotion) drawStatic();
    });
    resizeObserver.observe(host);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);

    /* A lost context (GPU reset, driver update, too many live contexts in
       other tabs) is recoverable, but only if the default is prevented. Without
       this the canvas stays permanently blank after any such event. */
    const onContextLost = (event) => {
      event.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    if (reducedMotion) drawStatic();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (pointerRadius > 0) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      gl.deleteProgram(program);
      /* Contexts are a scarce per-page resource (browsers cap them around
         16). Releasing explicitly means navigating between routes that each
         mount a field never walks into that ceiling. */
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    /* `overrides` is read inside the effect but deliberately not a dependency.
       It is an object literal at almost every call site, so a new reference on
       every render would tear down and rebuild the GL context each time.
       `overrideKey` is its serialised form and carries the same information by
       value, which is what the effect should actually react to. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, overrideKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
