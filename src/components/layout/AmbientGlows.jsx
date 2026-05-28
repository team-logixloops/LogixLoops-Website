/**
 * AmbientGlows — Fixed background radial gradient orbs
 *
 * Creates the layered, atmospheric depth that defines the
 * LogixLoops design language. Rendered once in the root layout.
 * Pointer-events: none so they never block interaction.
 */
export default function AmbientGlows() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left blue glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full ambient-glow-blue blur-[120px]" />

      {/* Bottom-right violet glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full ambient-glow-violet blur-[150px]" />

      {/* Center-right warm accent — very subtle */}
      <div className="absolute top-[40%] right-[-15%] w-[35vw] h-[35vw] rounded-full ambient-glow-warm blur-[100px] opacity-50" />
    </div>
  );
}
