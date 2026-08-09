/**
 * AmbientGlows. Fixed background radial gradient orbs
 *
 * Creates the layered, atmospheric depth that defines the
 * LogixLoops design language. Rendered once in the root layout.
 * Pointer-events: none so they never block interaction.
 *
 * No `blur-*` on these, deliberately. Each orb is a radial gradient that
 * already ends at fully transparent, so a Gaussian on top of it changes
 * almost nothing you can see, while costing three filter buffers the size of
 * half the viewport squared, each re-rasterised whenever the layer they sit
 * on is invalidated. Softness that a gradient can express should always be
 * expressed by the gradient.
 */
export default function AmbientGlows() {
  return (
    <div
      className="ambient-glows fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left glow, the fox's blue */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full ambient-glow-blue" />

      {/* Bottom-right glow, the deeper royal */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full ambient-glow-royal" />

      {/* Center-right cyan accent, very subtle */}
      <div className="absolute top-[40%] right-[-15%] w-[35vw] h-[35vw] rounded-full ambient-glow-cyan opacity-50" />
    </div>
  );
}
