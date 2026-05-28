import { cn } from "@/lib/utils";

/**
 * IconBox — Rounded icon container used throughout the design system.
 * Wraps a Material Symbols icon with a tinted background circle/square.
 *
 * Props:
 *  - icon: Material Symbols name (e.g., "code", "cloud")
 *  - color: "primary" | "secondary" | "tertiary"
 *  - size: "sm" | "md" | "lg"
 *  - shape: "circle" | "rounded"
 */
const colorMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
};

const sizeMap = {
  sm: "w-10 h-10 text-[20px]",
  md: "w-12 h-12 text-[24px]",
  lg: "w-16 h-16 text-[28px]",
};

const shapeMap = {
  circle: "rounded-full",
  rounded: "rounded-xl",
};

export default function IconBox({
  icon,
  color = "primary",
  size = "md",
  shape = "rounded",
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-shrink-0",
        colorMap[color],
        sizeMap[size],
        shapeMap[shape],
        className
      )}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  );
}
