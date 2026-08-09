import { cn } from "@/lib/utils";

/**
 * Input. Styled form input matching the LogixLoops design system.
 * Uses the .input-field class from globals.css.
 */
export function Input({ label, id, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-label text-label-caps text-on-surface-variant uppercase"
        >
          {label}
        </label>
      )}
      <input id={id} className={cn("input-field", className)} {...props} />
    </div>
  );
}

/**
 * Textarea. Styled multi-line input.
 */
export function Textarea({ label, id, className, rows = 4, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-label text-label-caps text-on-surface-variant uppercase"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn("input-field resize-none", className)}
        {...props}
      />
    </div>
  );
}

/**
 * Select. Styled dropdown select.
 */
export function Select({ label, id, options = [], placeholder, className, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-label text-label-caps text-on-surface-variant uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            "input-field appearance-none w-full pr-10 cursor-pointer",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-outline">
          <span className="material-symbols-outlined text-[20px]">expand_more</span>
        </div>
      </div>
    </div>
  );
}
