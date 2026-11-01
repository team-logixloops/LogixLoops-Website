"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, GlassCard } from "@/components/ui";
import { FadeInUpImmediate } from "@/components/motion";
import { cn } from "@/lib/utils";
import { useMarketCurrency } from "@/hooks/useMarketCurrency";
import { builds, formatAmount, matchingBuild, quote } from "@/lib/loop-builder";
import LoopRing from "@/components/sections/kits/LoopRing";
import CurrencySwitch from "@/components/sections/kits/CurrencySwitch";

const NOT_SURE = "Not sure yet";

const TIMELINES = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"];

const STEP_LABELS = { pick: "Your Loop", build: "Your build", timing: "Timing", details: "Your details" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A floating-label input. `multiline` swaps in a textarea. */
function Field({ id, label, value, onChange, type = "text", multiline = false, optional = false }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className="relative">
      <Tag
        id={id}
        type={multiline ? undefined : type}
        rows={multiline ? 3 : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className={cn(
          "peer w-full rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 pb-2 font-body text-sm text-on-surface shadow-inner transition-colors placeholder-transparent focus:border-primary focus:outline-none",
          multiline ? "resize-none pt-6" : "pt-5"
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-primary",
          multiline ? "top-2 peer-placeholder-shown:top-4 peer-focus:top-2" : "top-1.5 peer-placeholder-shown:top-3.5 peer-focus:top-1.5"
        )}
      >
        {label}
        {optional && <span className="normal-case tracking-normal text-outline"> (optional)</span>}
      </label>
    </div>
  );
}

/** One selectable chip on the first step. */
function Choice({ on, onClick, title, meta }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-colors duration-300",
        on
          ? "border-primary bg-primary/10 shadow-[inset_0_0_0_1px_rgba(40,104,198,0.5)]"
          : "border-outline-variant/50 hover:border-primary/50 hover:bg-surface-container"
      )}
    >
      <span className={cn("font-body text-sm font-medium", on ? "text-primary" : "text-on-surface")}>{title}</span>
      {meta && <span className="mt-0.5 font-body text-[11px] text-on-surface-variant">{meta}</span>}
    </button>
  );
}

const slide = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

/**
 * The enquiry form, built around the Loops.
 *
 * Four steps: which Loop, which build, when, and who. The cheap clicks come
 * first and the typing comes last, so by the time anyone is asked for an
 * email they have already put something together worth sending. A Loop with
 * no add-ons to choose (a plan, or "not sure yet") skips the build step
 * rather than showing an empty one.
 *
 * `initial` comes from the link that brought the visitor (ContactFormFromLink).
 * Arriving from a Loop page, the first step is genuinely done, so the form
 * opens on the second with the first ticked: real progress, shown as such.
 *
 * `catalogue` is plain data from the server; `reach` holds the direct email
 * and WhatsApp links offered if sending fails.
 */
export default function ContactForm({ catalogue, reach, initial = {} }) {
  const loops = catalogue.lines.flatMap((line) => line.loops);
  const [currency, setCurrency] = useMarketCurrency();

  const blank = {
    choice: initial.choice ?? null, // "loop:<slug>" | "plan:<slug>" | NOT_SURE
    picked: initial.picked ?? [],
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    details: "",
  };
  const [form, setForm] = useState(blank);
  const set = (patch) => setForm((current) => ({ ...current, ...patch }));

  const loop = form.choice?.startsWith("loop:") ? loops.find((l) => `loop:${l.slug}` === form.choice) : null;
  const plan = form.choice?.startsWith("plan:")
    ? catalogue.plans.items.find((p) => `plan:${p.slug}` === form.choice)
    : null;

  // Before anything is picked, show the Loop path, since that is where most
  // visitors go; the rail shortens only once a plan or "not sure" is chosen.
  const steps = loop || !form.choice ? ["pick", "build", "timing", "details"] : ["pick", "timing", "details"];
  const [stepIndex, setStepIndex] = useState(initial.choice ? 1 : 0);
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  const [status, setStatus] = useState("editing"); // editing | sending | sent | failed

  const money = (n) => formatAmount(n, currency);
  const q = loop ? quote(loop, form.picked, currency) : null;
  const what = loop?.name ?? plan?.name ?? NOT_SURE;

  const choose = (choice) => {
    const next = choice.startsWith("loop:") ? loops.find((l) => `loop:${l.slug}` === choice) : null;
    // A new Loop starts from its recommended build; re-picking the same one
    // keeps whatever was built.
    set({ choice, picked: choice === form.choice ? form.picked : (next?.recommended ?? []) });
  };

  const toggle = (name) =>
    set({ picked: form.picked.includes(name) ? form.picked.filter((n) => n !== name) : [...form.picked, name] });

  const detailsValid =
    form.name.trim() !== "" && EMAIL.test(form.email.trim()) && (form.choice !== NOT_SURE || form.details.trim() !== "");

  const canAdvance = { pick: Boolean(form.choice), build: true, timing: Boolean(form.timeline), details: detailsValid };

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const estimate = () => {
    if (q) {
      const parts = [money(q.total)];
      if (q.saving > 0) parts.push(`flat ${money(q.saving)} off`);
      parts.push(`start with ${money(q.deposit)}`);
      return parts.join(", ");
    }
    if (plan) return `${money(plan.price[currency])} a month`;
    return "To be scoped";
  };

  const submit = async () => {
    setStatus("sending");
    const payload = {
      "Loop or Plan": what,
      Group: loop?.line ?? plan?.line ?? NOT_SURE,
      "Add-ons": loop ? form.picked.join(", ") || "None" : "n/a",
      Estimate: estimate(),
      Market: currency === "inr" ? "India (₹)" : "International ($)",
      Timeline: form.timeline,
      name: form.name,
      email: form.email,
      "Phone or WhatsApp": form.phone || "Not given",
      Company: form.company || "Not given",
      Message: form.details || "None",
      _subject: `New enquiry for the ${what}: ${form.name}${form.company ? ` (${form.company})` : ""}`,
    };
    try {
      const response = await fetch("https://formspree.io/f/mbdbwkje", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // A failed send used to show the success screen anyway, which lost the
      // lead and told the sender it had arrived. Now it says so, and offers
      // the two direct routes instead.
      setStatus(response.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setForm({ ...blank, choice: null, picked: [] });
    setStepIndex(0);
    setStatus("editing");
  };

  return (
    <FadeInUpImmediate delay={0.2}>
      <GlassCard padding="lg" className="relative flex h-fit flex-col overflow-hidden border border-outline-variant/30 bg-surface-container-lowest/60 shadow-glass-elevated">
        {status !== "sent" && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-headline-md text-on-surface">Start your Loop</h2>
              {(step === "build" || plan) && <CurrencySwitch currency={currency} onChange={setCurrency} />}
            </div>

            {/* Step rail. The fill spans dot centre to dot centre and moves by
                `scaleX`, so advancing a step costs no layout. */}
            <div className="relative mx-auto mb-8 flex w-full max-w-md items-center justify-between">
              <div className="absolute left-4 right-4 top-1/2 z-0 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-outline-variant/30">
                <div
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary to-tertiary transition-transform duration-500 ease-out"
                  style={{ transform: `scaleX(${stepIndex / (steps.length - 1)})` }}
                />
              </div>
              {steps.map((key, idx) => (
                <div key={key} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "relative z-20 flex h-8 w-8 items-center justify-center rounded-full border font-label text-sm transition-colors duration-500",
                      idx <= stepIndex
                        ? "border-primary bg-primary text-white shadow-[0_0_10px_rgba(40,104,198,0.3)]"
                        : "border-outline-variant/50 bg-surface-container text-on-surface-variant"
                    )}
                  >
                    {idx < stepIndex ? <span className="material-symbols-outlined text-[16px]">check</span> : idx + 1}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-6 hidden w-max font-mono text-[10px] uppercase tracking-widest sm:block",
                      idx <= stepIndex ? "text-primary" : "text-outline-variant"
                    )}
                  >
                    {STEP_LABELS[key]}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="relative z-10 mt-6 flex min-h-[320px] flex-col">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center py-6 text-center"
              >
                {loop ? (
                  <LoopRing loop={loop} picked={loop.addOns.map((a) => a.name)} currency={currency} size="sm">
                    <span className="material-symbols-outlined icon-lg text-primary">done_all</span>
                  </LoopRing>
                ) : (
                  <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined icon-lg text-primary">done_all</span>
                  </div>
                )}
                <h3 className="mt-4 font-display text-display-sm text-on-surface">It is with us, {form.name.split(" ")[0]}</h3>
                <p className="mt-3 max-w-md font-body text-body-lg text-on-surface-variant">
                  The people who would build your {what === NOT_SURE ? "project" : what} are reading it now. You will hear back within one business day, by email or on WhatsApp.
                </p>
                <dl className="mt-6 w-full max-w-sm divide-y divide-outline-variant/30 rounded-xl border border-outline-variant/30 text-left font-body text-sm">
                  <div className="flex justify-between gap-4 px-4 py-3">
                    <dt className="text-on-surface-variant">You picked</dt>
                    <dd className="text-right font-medium text-on-surface">{what}</dd>
                  </div>
                  {loop && form.picked.length > 0 && (
                    <div className="flex justify-between gap-4 px-4 py-3">
                      <dt className="text-on-surface-variant">Add-ons</dt>
                      <dd className="text-right text-on-surface">{form.picked.length}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 px-4 py-3">
                    <dt className="text-on-surface-variant">Estimate</dt>
                    <dd className="text-right font-medium text-on-surface">{q ? money(q.total) : plan ? `${money(plan.price[currency])}/mo` : "We will scope it"}</dd>
                  </div>
                </dl>
                <p className="mt-4 max-w-sm font-body text-xs text-on-surface-variant">
                  The final price comes in a written quote after the first call, starting from the figure above.
                </p>
                <Button variant="outline" onClick={reset} icon="refresh" iconPosition="left" className="mt-6">
                  Send another
                </Button>
              </motion.div>
            ) : step === "pick" ? (
              <motion.div key="pick" {...slide} className="flex flex-grow flex-col">
                <h3 className="mb-1 font-display text-lg text-on-surface">Which Loop are you after?</h3>
                <p className="mb-5 font-body text-sm text-on-surface-variant">Every price is a starting price. Pick the closest; you can change it on the call.</p>
                <div className="mb-6 max-h-[26rem] space-y-5 overflow-y-auto pr-1" data-lenis-prevent>
                  {catalogue.lines.map((line) => (
                    <fieldset key={line.slug}>
                      <legend className="mb-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{line.label}</legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {line.loops.map((l) => (
                          <Choice
                            key={l.slug}
                            on={form.choice === `loop:${l.slug}`}
                            onClick={() => choose(`loop:${l.slug}`)}
                            title={l.name}
                            meta={`Starting from ${money(l.price[currency])} · ${l.timeline}`}
                          />
                        ))}
                      </div>
                    </fieldset>
                  ))}
                  <fieldset>
                    <legend className="mb-2 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{catalogue.plans.label}</legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {catalogue.plans.items.map((p) => (
                        <Choice
                          key={p.slug}
                          on={form.choice === `plan:${p.slug}`}
                          onClick={() => choose(`plan:${p.slug}`)}
                          title={p.name}
                          meta={`Starting from ${money(p.price[currency])}/mo`}
                        />
                      ))}
                    </div>
                  </fieldset>
                  <Choice
                    on={form.choice === NOT_SURE}
                    onClick={() => choose(NOT_SURE)}
                    title={NOT_SURE}
                    meta="Tell us the problem and we will say which Loop fits, or that none does."
                  />
                </div>
                <div className="mt-auto flex justify-end">
                  <Button onClick={next} disabled={!canAdvance.pick} icon="arrow_forward" iconPosition="right">Next</Button>
                </div>
              </motion.div>
            ) : step === "build" && loop ? (
              <motion.div key="build" {...slide} className="flex flex-grow flex-col">
                <h3 className="mb-1 font-display text-lg text-on-surface">Your {loop.name}</h3>
                <p className="mb-5 font-body text-sm text-on-surface-variant">Add-ons taken with the Loop cost less than adding them after launch.</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {builds(loop).map((build) => {
                    const on = matchingBuild(loop, form.picked) === build.id;
                    return (
                      <button
                        key={build.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => set({ picked: build.addOns })}
                        className={cn(
                          "rounded-full border px-3 py-1.5 font-label text-xs font-semibold transition-colors duration-300",
                          on ? "border-primary bg-primary text-white" : "border-outline-variant/60 text-on-surface-variant hover:border-primary/50 hover:text-on-surface"
                        )}
                      >
                        {build.label} · {money(quote(loop, build.addOns, currency).total)}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
                  <LoopRing loop={loop} picked={form.picked} currency={currency} size="sm" className="mx-auto">
                    <span className="font-display text-lg font-semibold text-on-surface">{money(q.total)}</span>
                  </LoopRing>
                  <ul className="divide-y divide-outline-variant/30">
                    {loop.addOns.map((addOn) => {
                      const on = form.picked.includes(addOn.name);
                      return (
                        <li key={addOn.name}>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={on}
                            onClick={() => toggle(addOn.name)}
                            className="group flex w-full items-center gap-3 py-2.5 text-left"
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 flex-none items-center justify-center rounded border transition-colors duration-300",
                                on ? "border-primary bg-primary text-white" : "border-outline-variant text-transparent group-hover:border-primary/60"
                              )}
                            >
                              <span className="material-symbols-outlined text-[14px]">check</span>
                            </span>
                            <span className={cn("flex-1 font-body text-sm", on ? "text-on-surface" : "text-on-surface-variant")}>{addOn.name}</span>
                            <span className="whitespace-nowrap font-body text-sm font-semibold text-on-surface-variant">+ {money(addOn.price[currency])}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-container px-4 py-3 font-body text-sm">
                  <span className="text-on-surface-variant">
                    {q.saving > 0 ? (
                      <>
                        <s className="decoration-1">{money(q.separately)}</s>{" "}
                        <span className="font-semibold text-tertiary">Flat {money(q.saving)} off</span>
                      </>
                    ) : (
                      "Starting price"
                    )}
                  </span>
                  <span className="text-on-surface-variant">
                    Start with <span className="font-semibold text-on-surface">{money(q.deposit)}</span>
                  </span>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="ghost" onClick={back}>Back</Button>
                  <Button onClick={next} icon="arrow_forward" iconPosition="right">Next</Button>
                </div>
              </motion.div>
            ) : step === "timing" ? (
              <motion.div key="timing" {...slide} className="flex flex-grow flex-col">
                <h3 className="mb-1 font-display text-lg text-on-surface">When do you want it live?</h3>
                <p className="mb-6 font-body text-sm text-on-surface-variant">
                  {loop ? `The ${loop.name} takes ${loop.timeline} from kick-off.` : "So we know how soon to plan the first call."}
                </p>
                <div className="mb-8 grid grid-cols-2 gap-2">
                  {TIMELINES.map((timeline) => (
                    <Choice key={timeline} on={form.timeline === timeline} onClick={() => set({ timeline })} title={timeline} />
                  ))}
                </div>
                <div className="mt-auto flex justify-between">
                  <Button variant="ghost" onClick={back}>Back</Button>
                  <Button onClick={next} disabled={!canAdvance.timing} icon="arrow_forward" iconPosition="right">Next</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="details" {...slide} className="flex flex-grow flex-col">
                <h3 className="mb-1 font-display text-lg text-on-surface">Where do we send the reply?</h3>
                <p className="mb-6 font-body text-sm text-on-surface-variant">
                  {what === NOT_SURE ? "Tell us what you are trying to get done." : `${what}${q ? `, ${money(q.total)}` : ""}. Last step.`}
                </p>
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field id="name-input" label="Your name" value={form.name} onChange={(name) => set({ name })} />
                    <Field id="email-input" label="Email" type="email" value={form.email} onChange={(email) => set({ email })} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field id="phone-input" label="Phone or WhatsApp" type="tel" optional value={form.phone} onChange={(phone) => set({ phone })} />
                    <Field id="company-input" label="Business name" optional value={form.company} onChange={(company) => set({ company })} />
                  </div>
                  <Field
                    id="details-input"
                    label={what === NOT_SURE ? "What do you need?" : "Anything we should know"}
                    multiline
                    optional={what !== NOT_SURE}
                    value={form.details}
                    onChange={(details) => set({ details })}
                  />
                </div>

                {status === "failed" && (
                  <p role="alert" className="mb-4 rounded-lg border border-error/30 bg-error/5 px-4 py-3 font-body text-sm text-on-surface">
                    That did not send. Your details are still here, so try again, or reach us directly by{" "}
                    <a href={reach.email} className="font-medium text-primary underline-offset-4 hover:underline">email</a> or{" "}
                    <a href={reach.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">WhatsApp</a>.
                  </p>
                )}

                <div className="mt-auto flex justify-between">
                  <Button variant="ghost" onClick={back} disabled={status === "sending"}>Back</Button>
                  <Button
                    onClick={submit}
                    disabled={!canAdvance.details || status === "sending"}
                    icon={status === "sending" ? "hourglass_empty" : "send"}
                    iconPosition="right"
                  >
                    {status === "sending" ? "Sending..." : "Send"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </FadeInUpImmediate>
  );
}
