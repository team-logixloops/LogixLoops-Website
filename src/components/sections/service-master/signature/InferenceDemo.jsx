"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { accent } from "../tokens";
import { downloadFile } from "@/lib/demo-mail";
import { DemoPanel, DemoControls, DemoButton, DemoLabel, DemoSlider, DemoConsole } from "./demo-shell";
import { evaluate, exportModel, predict, topTerms, train } from "./lib/naive-bayes";
import { LABELS, PROBES, SEED_TICKETS } from "./lib/ticket-corpus";

/**
 * The classifier on /services/ai-ml-solutions.
 *
 * There is a real model behind this, multinomial Naive Bayes, fitted in the
 * browser from the corpus below, re-fitted the moment anyone adds an example.
 * See lib/naive-bayes.js; the whole algorithm is about sixty lines and none of
 * it is stubbed.
 *
 * The demo is arranged around the thing that is actually hard to fake:
 * add a training example, watch the vocabulary grow, watch held-out accuracy
 * move, and watch the per-token weights on a sentence shift because the counts
 * behind them shifted. A scripted demo can animate a confidence bar. It cannot
 * survive someone typing a sentence it has never seen.
 */

const LABEL_TONE = {
  Billing: "text-primary",
  Access: "text-secondary",
  Bug: "text-error",
  Feature: "text-tertiary",
};

export default function InferenceDemo({ color }) {
  const a = accent(color);

  const [corpus, setCorpus] = useState(SEED_TICKETS);
  const [input, setInput] = useState(PROBES[0]);
  const [threshold, setThreshold] = useState(70);
  const [draft, setDraft] = useState("");
  const [draftLabel, setDraftLabel] = useState(LABELS[0]);
  const [inspecting, setInspecting] = useState(LABELS[0]);

  // Both are pure functions of the corpus, so a single fit per change is all
  // that is needed, no effect, no loading state, no stale model.
  const model = useMemo(() => train(corpus), [corpus]);
  const scoring = useMemo(() => evaluate(corpus, LABELS), [corpus]);
  const result = useMemo(() => predict(model, input), [model, input]);
  const terms = useMemo(() => topTerms(model, inspecting), [model, inspecting]);

  const confidence = result.top ? result.top.probability * 100 : 0;
  const autoRoutes = confidence >= threshold;

  const addExample = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (text.length < 12) return;
    setCorpus((prev) => [...prev, { label: draftLabel, text }]);
    setDraft("");
  };

  const reset = () => setCorpus(SEED_TICKETS);

  return (
    <DemoPanel>
      <DemoControls>
        <DemoLabel>Try a ticket</DemoLabel>
        {PROBES.map((probe, i) => (
          <DemoButton key={probe} color={color} active={input === probe} onClick={() => setInput(probe)}>
            {["invoice", "sso", "chart", "schedule"][i]}
          </DemoButton>
        ))}
        <DemoSlider
          label="Auto-route at"
          value={threshold}
          min={40}
          max={99}
          onChange={setThreshold}
          format={(v) => `${v}%`}
        />
      </DemoControls>

      <div className="grid gap-5 p-4 md:p-6 lg:grid-cols-2">
        {/* ── inference ── */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-outline-variant/30 bg-surface p-5">
            <label
              htmlFor="nb-input"
              className="mb-2 block font-label text-label-caps uppercase tracking-widest text-on-surface-variant"
            >
              Inbound ticket, type anything
            </label>
            <textarea
              id="nb-input"
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full resize-none rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-3 font-body text-body-md leading-relaxed text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />

            {/* Token attribution, each word tinted by its real contribution. */}
            <p className="mt-4 mb-2 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Token attribution
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.tokens.length === 0 && (
                <span className="font-body text-body-sm text-on-surface-variant">
                  Every word here is a stopword or unknown, nothing to score.
                </span>
              )}
              {result.tokens.map((token, i) => {
                // Weight is a log-ratio; ±1.2 covers nearly all of the range
                // this corpus produces, so it makes a sane clamp for opacity.
                const strength = Math.min(1, Math.abs(token.weight) / 1.2);
                const positive = token.weight > 0.05;
                const negative = token.weight < -0.05;
                return (
                  <span
                    key={`${token.token}-${i}`}
                    title={`weight ${token.weight.toFixed(3)} · seen ${token.count}× in ${result.top?.label}`}
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[11px] transition-colors",
                      positive && "text-on-surface",
                      negative && "text-error",
                      !positive && !negative && "text-on-surface-variant"
                    )}
                    style={
                      positive
                        ? { background: `rgba(40,104,198,${0.08 + strength * 0.42})` }
                        : negative
                          ? { background: `rgba(186,26,26,${0.06 + strength * 0.3})` }
                          : undefined
                    }
                  >
                    {token.token}
                    {!token.seen && <sup className="ml-0.5 opacity-60">new</sup>}
                  </span>
                );
              })}
            </div>
            <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              Shading is the log-likelihood ratio between the winning class and its closest rival,
              the quantity that actually decided it. {result.known} of {result.tokens.length} tokens
              are in the vocabulary.
            </p>
          </div>

          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5">
            <p className="mb-4 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Posterior
            </p>
            <div className="flex flex-col gap-3">
              {result.scores.map((score) => (
                <div key={score.label}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className={cn("font-body text-body-sm", LABEL_TONE[score.label])}>
                      {score.label}
                    </span>
                    <span className="font-mono text-[11px] text-on-surface-variant">
                      {(score.probability * 100).toFixed(1)}% · log {score.logProb.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-outline-variant/25">
                    <span
                      className={cn("block h-full rounded-full transition-[width] duration-300", a.dot)}
                      style={{ width: `${score.probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p
              className={cn(
                "mt-4 rounded-xl border p-3 font-body text-body-sm leading-relaxed",
                autoRoutes ? cn(a.ring, a.soft, "text-on-surface") : "border-outline-variant/40 text-on-surface-variant"
              )}
            >
              {result.top ? (
                autoRoutes ? (
                  <>
                    Routed to <span className={a.text}>{result.top.label}</span>, {confidence.toFixed(1)}%
                    clears the {threshold}% bar, so no human touches it.
                  </>
                ) : (
                  <>
                    Held for triage, {confidence.toFixed(1)}% is under the {threshold}% bar. Raising
                    the bar buys precision and costs you automation; that trade is the whole design
                    conversation.
                  </>
                )
              ) : (
                "Nothing to score yet."
              )}
            </p>
          </div>
        </div>

        {/* ── the model ── */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Documents" value={model.totalDocs} accent={a} />
            <Stat label="Vocabulary" value={model.vocabSize} accent={a} />
            <Stat
              label="Held-out acc."
              value={scoring.accuracy == null ? ". " : `${(scoring.accuracy * 100).toFixed(0)}%`}
              accent={a}
            />
          </div>

          {/* Confusion matrix, counted from predictions on unseen documents. */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5">
            <p className="mb-1 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Confusion matrix
            </p>
            <p className="mb-4 font-body text-body-sm text-on-surface-variant">
              Trained on {scoring.trainSize}, scored on {scoring.testSize} it has never seen.
            </p>

            {scoring.matrix ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-[11px]">
                  <thead>
                    <tr>
                      <th className="p-1.5 text-left text-on-surface-variant">actual ╲ predicted</th>
                      {LABELS.map((label) => (
                        <th key={label} className="p-1.5 text-on-surface-variant">
                          {label.slice(0, 4)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scoring.matrix.map((row, i) => {
                      const rowTotal = row.reduce((s, v) => s + v, 0) || 1;
                      return (
                        <tr key={LABELS[i]}>
                          <td className={cn("p-1.5 text-left", LABEL_TONE[LABELS[i]])}>{LABELS[i]}</td>
                          {row.map((value, j) => (
                            <td
                              key={LABELS[j]}
                              className={cn(
                                "p-1.5 text-center",
                                i === j ? "text-on-surface" : value > 0 ? "text-error" : "text-on-surface-variant/50"
                              )}
                              style={
                                value > 0
                                  ? {
                                      background:
                                        i === j
                                          ? `rgba(40,104,198,${0.1 + (value / rowTotal) * 0.4})`
                                          : `rgba(186,26,26,${0.08 + (value / rowTotal) * 0.3})`,
                                    }
                                  : undefined
                              }
                            >
                              {value}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="font-body text-body-sm text-on-surface-variant">
                Not enough documents to hold any back.
              </p>
            )}
          </div>

          {/* Teach it something */}
          <form
            onSubmit={addExample}
            className="rounded-2xl border border-outline-variant/30 bg-surface p-5"
          >
            <p className="mb-3 font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
              Teach it a new example
            </p>
            <textarea
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a ticket in your own words…"
              className="mb-3 w-full resize-none rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-3 font-body text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
            <div className="flex flex-wrap items-center gap-2">
              {LABELS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setDraftLabel(label)}
                  aria-pressed={draftLabel === label}
                  className={cn(
                    "rounded-full border px-3 py-1.5 font-label text-label-caps uppercase tracking-widest transition-colors",
                    draftLabel === label
                      ? cn(a.soft, a.text, a.ring)
                      : "border-outline-variant/40 text-on-surface-variant hover:text-on-surface"
                  )}
                >
                  {label}
                </button>
              ))}
              <button
                type="submit"
                disabled={draft.trim().length < 12}
                className={cn(
                  "ml-auto rounded-full border px-4 py-2 font-label text-label-caps uppercase tracking-widest transition-colors",
                  a.soft,
                  a.text,
                  a.ring,
                  "disabled:cursor-not-allowed disabled:opacity-40"
                )}
              >
                Retrain
              </button>
            </div>
            <p className="mt-3 font-body text-body-sm leading-relaxed text-on-surface-variant">
              Adding a document refits the model on the spot. Held-out accuracy will sometimes drop
 that is the honest signal, and it is why the split exists.
            </p>
          </form>

          {/* Learned vocabulary */}
          <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <p className="font-label text-label-caps uppercase tracking-widest text-on-surface-variant">
                Strongest terms
              </p>
              <div className="ml-auto flex gap-1.5">
                {LABELS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setInspecting(label)}
                    aria-pressed={inspecting === label}
                    className={cn(
                      "rounded-full px-2.5 py-1 font-label text-[10px] uppercase tracking-widest transition-colors",
                      inspecting === label ? cn(a.soft, a.text) : "text-on-surface-variant"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <DemoConsole className="max-h-36">
              {terms.map((term) => (
                <p key={term.term} className="flex justify-between gap-3">
                  <span className={a.text}>{term.term}</span>
                  <span>
                    {term.count}× · ratio {term.weight.toFixed(2)}
                  </span>
                </p>
              ))}
              {terms.length === 0 && <p>No terms for this class yet.</p>}
            </DemoConsole>
          </div>

          <div className="flex flex-wrap gap-2">
            <DemoButton
              color={color}
              onClick={() =>
                downloadFile(
                  "logixloops-classifier.json",
                  JSON.stringify(exportModel(model), null, 2),
                  "application/json"
                )
              }
            >
              Export weights
            </DemoButton>
            <DemoButton color={color} onClick={reset} disabled={corpus.length === SEED_TICKETS.length}>
              Reset corpus
            </DemoButton>
          </div>
        </div>
      </div>

      <p className="px-6 pb-6 font-body text-body-md leading-relaxed text-on-surface-variant">
        No inference API is being called, the model is fitted here, in your browser, from{" "}
        {model.totalDocs} documents. The seed corpus separates cleanly, so held-out accuracy starts
        high; that is a statement about the corpus, not a promise about your sentence. Type
        something genuinely ambiguous, &ldquo;the invoice page crashes&rdquo; and watch it commit
        to the wrong class with real confidence.{" "}
        <span className={a.text}>A demo that cannot be wrong is not showing you a model.</span>
      </p>
    </DemoPanel>
  );
}

function Stat({ label, value, accent: a }) {
  return (
    <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-3">
      <p className={cn("font-display text-xl leading-none", a.text)}>{value}</p>
      <p className="mt-1 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}
