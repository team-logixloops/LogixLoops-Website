import { cn } from "@/lib/utils";

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-container-low rounded-md",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface-variant/30 to-transparent animate-[shimmer_2s_infinite_ease-in-out]" />
    </div>
  );
}
