"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { hoverLift, tapScale } from "@/lib/animations";

/**
 * GlassCard. The core card component for the LogixLoops design system.
 *
 * Variants:
 *  - default:   Standard glassmorphism card
 *  - elevated:  Stronger blur + more opacity for featured items
 *  - subtle:    Light background, minimal border
 *  - solid:     No glass effect, solid surface color
 *
 * Props:
 *  - hover: "lift" | "glow" | "border" | "none"
 *  - animated: boolean, enables whileHover animation
 *  - padding: "sm" | "md" | "lg" | "xl" (default: "lg")
 */
const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10 md:p-12",
};

const variantMap = {
  default: "glass-panel",
  elevated: "glass-elevated",
  subtle: "glass-subtle",
  solid: "bg-surface-container-lowest border border-outline-variant/30",
};

const hoverMap = {
  lift: "hover:-translate-y-1 transition-transform duration-300",
  glow: "hover:shadow-glass-hover transition-shadow duration-300",
  border: "hover:border-primary/30 transition-colors duration-300",
  none: "",
};

export default function GlassCard({
  children,
  className,
  variant = "default",
  hover = "none",
  padding = "lg",
  animated = false,
  rounded = "xl",
  as: Tag = "div",
  overlay,
  ...props
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const classes = cn(
    variantMap[variant],
    paddingMap[padding],
    hoverMap[hover],
    `rounded-${rounded}`,
    "group relative overflow-hidden",
    className
  );

  const spotlightBackground = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(40, 104, 198, 0.08), transparent 80%)`;

  const spotlightOverlayNode = (
    <motion.div
      className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
      style={{ background: spotlightBackground }}
    />
  );

  if (animated) {
    return (
      <motion.div
        className={classes}
        onMouseMove={handleMouseMove}
        whileHover={hover === "lift" ? hoverLift : undefined}
        whileTap={tapScale}
        {...props}
      >
        {spotlightOverlayNode}
        {overlay}
        <div className="relative z-10 h-full flex flex-col">{children}</div>
      </motion.div>
    );
  }

  return (
    <Tag className={classes} onMouseMove={handleMouseMove} {...props}>
      {spotlightOverlayNode}
      {overlay}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </Tag>
  );
}
