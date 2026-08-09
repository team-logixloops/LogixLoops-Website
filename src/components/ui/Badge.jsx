import { cn } from "@/lib/utils";

/**
 * Badge. Pills for categories, tech tags, and status indicators.
 *
 * Variants:
 *  - default:  Subtle bg with tinted text
 *  - outlined: Border only, no fill
 *  - filled:   Solid primary/secondary fill
 */
const variantClasses = {
  default: "bg-surface-container text-on-surface-variant",
  outlined: "border border-outline-variant text-outline bg-transparent",
  filled: "bg-primary-container text-on-primary-container",
  "filled-secondary": "bg-secondary-container text-on-secondary-container",
  accent: "bg-primary/10 text-primary",
};

export default function Badge({
  children,
  className,
  variant = "default",
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-label text-label-caps px-3 py-1 rounded-full whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
