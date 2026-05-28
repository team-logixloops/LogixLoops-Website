import { cn } from "@/lib/utils";

/**
 * SectionHeader — Consistent section heading pattern.
 * Renders: overline label → headline → optional description
 */
export default function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  size = "lg",
}) {
  const alignClasses = {
    center: "text-center mx-auto",
    left: "text-left",
  };

  const sizeClasses = {
    xl: "text-display-lg-mobile md:text-display-xl font-display",
    lg: "text-headline-lg-mobile md:text-headline-lg font-heading",
    md: "text-headline-md font-heading",
  };

  return (
    <header
      className={cn(
        alignClasses[align],
        "mb-stack-lg max-w-4xl",
        align === "center" && "mx-auto",
        className
      )}
    >
      {overline && (
        <span className="font-label text-label-caps text-primary tracking-widest uppercase mb-4 block">
          {overline}
        </span>
      )}
      <h2
        className={cn(
          sizeClasses[size],
          "text-on-surface mb-stack-sm",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </header>
  );
}
