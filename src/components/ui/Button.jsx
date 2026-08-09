"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { tapScale, tapScaleDeep } from "@/lib/animations";

/**
 * MagneticWrapper. Applies a premium physical pull effect on hover.
 * Only activated for Primary CTAs.
 */
function MagneticWrapper({ children, isActive }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  if (!isActive) return <>{children}</>;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // 20% pull strength
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/**
 * Button. Unified button system for LogixLoops.
 *
 * Variants:
 *  - primary:  Blob fill. Reads as an outline at rest and floods to navy on
 *              hover, so the CTA is quiet until it is approached.
 *  - solid:    The former primary, a flat gradient fill. Kept for the places
 *              that need a button to be loud without being touched.
 *  - ghost:    Glass background with backdrop blur
 *  - outline:  Bordered, transparent background
 *  - text:     No background, just text + hover color
 *
 * Sizes:
 *  - sm:  Compact (label-caps, smaller padding)
 *  - md:  Default
 *  - lg:  Large (hero CTAs)
 *
 * Shape:
 *  - pill:    rounded-full (default)
 *  - rounded: rounded-lg
 */
const variantClasses = {
  primary: "blob-btn font-label uppercase tracking-widest",
  solid: "btn-primary font-label uppercase tracking-widest",
  ghost: "btn-ghost font-label uppercase tracking-widest",
  outline: "btn-outline font-body",
  text: "btn-text font-body inline-flex items-center gap-1",
};

/**
 * The blob treatment's own markup. Four circles that rise from under the
 * button and are welded into one fill by the `#goo` filter mounted in the root
 * layout. Presentation is in `globals.css` under "Blob button".
 *
 * `aria-hidden` because it is four empty spans; the label is the button's own
 * text, which sits above this in the stacking order.
 */
function Blobs() {
  return (
    <span aria-hidden="true" className="blob-btn__inner">
      <span className="blob-btn__blobs">
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
      </span>
    </span>
  );
}

const sizeClasses = {
  sm: "text-label-sm px-4 py-2",
  md: "text-label-caps px-6 py-3",
  lg: "text-label-caps px-8 py-4",
};

const shapeClasses = {
  pill: "rounded-full",
  rounded: "rounded-lg",
};

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  shape = "pill",
  href,
  icon,
  iconPosition = "right",
  disabled = false,
  ...props
}) {
  const classes = cn(
    variantClasses[variant],
    sizeClasses[size],
    shapeClasses[shape],
    "relative overflow-hidden inline-flex items-center justify-center gap-2",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {variant === "primary" && <Blobs />}
    </>
  );

  const isMagnetic = variant === "primary" && !disabled;

  // Link variant
  if (href) {
    return (
      <MagneticWrapper isActive={isMagnetic}>
        <motion.div whileTap={tapScale} className="inline-block">
          <Link href={href} className={classes} {...props}>
            {content}
          </Link>
        </motion.div>
      </MagneticWrapper>
    );
  }

  // Button variant
  return (
    <MagneticWrapper isActive={isMagnetic}>
      <motion.button
        className={classes}
        whileTap={tapScaleDeep}
        disabled={disabled}
        {...props}
      >
        {content}
      </motion.button>
    </MagneticWrapper>
  );
}
