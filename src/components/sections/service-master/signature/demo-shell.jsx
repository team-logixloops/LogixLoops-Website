"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { sendDemoMail } from "@/lib/demo-mail";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * True only for mouse/trackpad. Read through useSyncExternalStore rather than
 * an effect so it never renders the wrong branch after hydration, and so it
 * follows the user plugging in a mouse mid-session.
 */
export function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(FINE_POINTER);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false
  );
}

/** Shared chrome for every signature demo: one panel, one control strip. */
export function DemoPanel({ children, className, ref }) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-outline-variant/30 bg-white/60 backdrop-blur-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DemoControls({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-outline-variant/30 bg-surface-container-lowest/60 px-4 py-3 md:px-5 md:py-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DemoLabel({ children }) {
  return (
    <span className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
      {children}
    </span>
  );
}

export function DemoButton({ color, active, className, ...props }) {
  const a = accent(color);
  return (
    <button
      type="button"
      className={cn(
        "font-label text-label-caps uppercase tracking-widest rounded-full border px-4 py-2 transition-colors",
        active
          ? cn(a.soft, a.text, a.ring)
          : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

/** Labelled range input. Kept here so every demo's sliders line up visually. */
export function DemoSlider({ label, value, min, max, step = 1, onChange, format, className }) {
  const id = useId();
  return (
    <label htmlFor={id} className={cn("flex items-center gap-3", className)}>
      <DemoLabel>{label}</DemoLabel>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-outline-variant/40 accent-primary"
      />
      <span className="w-14 shrink-0 font-label text-label-caps tracking-widest text-on-surface">
        {format ? format(value) : value}
      </span>
    </label>
  );
}

/**
 * Segmented control, a radio group that reads as one control.
 *
 * `stacked` puts the label on its own line and lets the segments wrap. A pill
 * cannot shrink below its content, so in a narrow rail the inline layout does
 * not wrap, it clips, the last option simply disappears off the edge.
 */
export function DemoSegmented({ color, label, value, options, onChange, stacked }) {
  const a = accent(color);
  return (
    <div className={cn("gap-2", stacked ? "flex flex-col items-start" : "flex items-center")}>
      {label && <DemoLabel>{label}</DemoLabel>}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          "border border-outline-variant/40",
          stacked
            ? "flex flex-wrap gap-1 rounded-2xl p-1"
            : "flex overflow-hidden rounded-full"
        )}
      >
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.id)}
              className={cn(
                "px-3 py-1.5 font-label text-label-caps uppercase tracking-widest transition-colors",
                stacked && "rounded-full",
                active ? cn(a.soft, a.text) : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Monospace output surface, logs, traces, generated source. */
export function DemoConsole({ title, children, className, ref }) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-col rounded-2xl border border-outline-variant/30 bg-surface-container-lowest",
        className
      )}
    >
      {title && (
        <p className="shrink-0 border-b border-outline-variant/30 px-4 py-2.5 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
          {title}
        </p>
      )}
      <div
        ref={ref}
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[11px] leading-relaxed text-on-surface-variant"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * The real-send form.
 *
 * There is no simulated branch behind this: submitting posts to /api/notify,
 * which opens an SMTP connection and sends. The status text reports what
 * actually happened, including the server's message id on success, because a
 * demo that claims to have sent an email is worth nothing next to one that can
 * show you the id it got back.
 *
 * `mountedAt` and the hidden `website` input are the two abuse controls the
 * client is responsible for, a dwell timer and a honeypot. Both are checked
 * server-side; they are here only to be honest inputs to that check.
 */
export function DemoEmailForm({
  color,
  template,
  payload,
  cta = "Send it",
  placeholder = "you@company.com",
  hint,
  onSent,
  className,
  /* Puts the button under the field. In a ~260px rail the inline layout leaves
     the input about 90px wide, which clips the placeholder mid-word and gives
     someone typing an address a two-word window to check it in. */
  stacked,
}) {
  const a = accent(color);
  const id = useId();
  // Stamped on mount rather than during render: render has to stay pure, and
  // the value is only ever read inside the submit handler anyway.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const [address, setAddress] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState({ status: "idle" });

  const submit = async (event) => {
    event.preventDefault();
    if (state.status === "sending") return;

    setState({ status: "sending" });
    try {
      const result = await sendDemoMail({
        template,
        to: address,
        // Read at submit time: the demos mutate their payload right up until
        // the click, so capturing it at render would send a stale snapshot.
        payload: typeof payload === "function" ? payload() : payload,
        startedAt: mountedAt.current,
        website: honeypot,
      });
      setState({ status: "sent", messageId: result.messageId });
      onSent?.(result);
    } catch (error) {
      setState({ status: "error", message: error.message });
    }
  };

  return (
    <form onSubmit={submit} className={cn("flex flex-col gap-2", className)} noValidate>
      <div className={cn("gap-2", stacked ? "flex flex-col" : "flex flex-wrap items-center")}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            if (state.status !== "idle") setState({ status: "idle" });
          }}
          placeholder={placeholder}
          autoComplete="email"
          className={cn(
            "min-w-0 rounded-full border border-outline-variant/40 bg-surface px-4 py-2 font-body text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            stacked ? "w-full" : "flex-1"
          )}
        />

        {/* Honeypot. Off-screen rather than display:none so a scripted filler
            still sees a focusable field, and hidden from assistive tech so a
            real person is never asked to fill it in. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
        />

        <button
          type="submit"
          disabled={state.status === "sending"}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 font-label text-label-caps uppercase tracking-widest transition-colors",
            stacked && "w-full",
            a.soft,
            a.text,
            a.ring,
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {state.status === "sending" ? "Sending…" : cta}
        </button>
      </div>

      <p
        aria-live="polite"
        className={cn(
          "font-body text-body-sm leading-relaxed",
          state.status === "error" ? "text-error" : "text-on-surface-variant"
        )}
      >
        {state.status === "idle" && (hint || "A real email, sent over SMTP. One message, no list.")}
        {state.status === "sending" && "Opening the SMTP connection…"}
        {state.status === "sent" && (
          <>
            Delivered. Server returned{" "}
            <span className={cn("font-mono", a.text)}>{state.messageId}</span>, check the inbox,
            and spam if it is not there.
          </>
        )}
        {state.status === "error" && state.message}
      </p>
    </form>
  );
}

/** Accessible on/off switch used by the demos that hijack a page behaviour. */
export function DemoToggle({ color, checked, onChange, label }) {
  const a = accent(color);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 font-label text-label-caps uppercase tracking-widest text-on-surface"
    >
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
          checked ? cn(a.dot, "border-transparent") : "border-outline-variant/50 bg-surface-container"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
            checked ? "left-6" : "left-1"
          )}
        />
      </span>
      {label}
    </button>
  );
}
