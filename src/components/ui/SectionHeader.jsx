import { cn } from "@/lib/utils";

/**
 * SectionHeader. Consistent section heading pattern.
 * Renders: overline label → headline → optional description
 *
 * `as` exists because a few pages use this component as their page title, not
 * as a section heading, hardcoding <h2> left those routes with no <h1>.
 */
export default function SectionHeader({
  overline,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  overlineClassName,
  descriptionClassName,
  size = "lg",
  as: Heading = "h2",
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
        <span
          className={cn(
            "font-label text-label-caps tracking-widest uppercase mb-4 block",
            overlineClassName || "text-primary"
          )}
        >
          {overline}
        </span>
      )}
      <Heading
        className={cn(
          sizeClasses[size],
          "mb-stack-sm",
          titleClassName || "text-on-surface"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "font-body text-body-lg max-w-2xl mx-auto",
            descriptionClassName || "text-on-surface-variant"
          )}
        >
          {description}
        </p>
      )}
    </header>
  );
}
