"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  viewportOnce,
  viewportHero,
} from "@/lib/animations";

/**
 * Animate children with fade-in-up when they enter the viewport.
 * Wrap any section or card group with this.
 */
export function FadeInUp({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from below — no viewport trigger, for hero/above-fold */
export function FadeInUpImmediate({ children, className, delay = 0, ...props }) {
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from the left on viewport entry */
export function FadeInLeft({ children, className, ...props }) {
  return (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from the right on viewport entry */
export function FadeInRight({ children, className, ...props }) {
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Simple opacity fade on viewport entry */
export function FadeIn({ children, className, ...props }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Scale + fade for modals or featured elements */
export function ScaleIn({ children, className, ...props }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — wraps children that each have their own variants.
 * Children should use fadeInUp or similar as their variants.
 */
export function StaggerContainer({ children, className, slow = false, ...props }) {
  return (
    <motion.div
      variants={slow ? staggerContainerSlow : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger item — must be a child of StaggerContainer */
export function StaggerItem({ children, className, ...props }) {
  return (
    <motion.div variants={fadeInUp} className={className} {...props}>
      {children}
    </motion.div>
  );
}
