import { cn } from "@/lib/utils";

/**
 * StatCard — Metric display with border-left accent.
 * Used in case study heroes, portfolio stats, and hero sections.
 *
 * Props:
 *  - value: "99.99" | "3.5x" | "$2B"
 *  - unit: "%" | "ms" | "x" (appended after value)
 *  - label: Description text
 *  - accentColor: "primary" | "secondary" | "tertiary"
 */
const accentMap = {
  primary: "border-primary",
  secondary: "border-secondary/40",
  tertiary: "border-tertiary/40",
};

export default function StatCard({
  value,
  unit,
  label,
  accentColor = "primary",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col border-l-2 pl-4",
        accentMap[accentColor],
        className
      )}
    >
      <span className="font-display text-display-lg-mobile text-primary leading-none">
        {value}
        {unit && (
          <span className="text-headline-md font-heading">{unit}</span>
        )}
      </span>
      <span className="font-body text-body-md text-on-surface-variant mt-1">
        {label}
      </span>
    </div>
  );
}
