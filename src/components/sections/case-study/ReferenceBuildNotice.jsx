/**
 * The disclosure that makes the reference builds honest.
 *
 * Every record in `data/caseStudies.js` currently carries `demo: true`. They
 * are architectures LogixLoops designed and can defend, written up against
 * representative briefs, not write-ups of paid client engagements.
 *
 * Saying that out loud is not a weakness to be minimised in eight-point grey
 * text. It is the most credible thing on the page: a studio that volunteers
 * the limits of its own evidence is one whose other claims are worth more. It
 * is also the difference between a prospect learning the distinction from us
 * and learning it from a reference check.
 *
 * Rendered as a real block with real contrast, for the same reason it is in
 * the JSON-LD (`generateCaseStudySchema` emits `CreativeWork` plus a
 * `disambiguatingDescription` for `demo` records): a disclosure a crawler can
 * read but a human cannot is not a disclosure.
 *
 * Clear the flag on a record and this disappears from it automatically.
 */
export default function ReferenceBuildNotice({ variant = "page", className = "" }) {
  const isIndex = variant === "index";

  return (
    <aside
      aria-label="About these write-ups"
      className={`rounded-2xl border border-secondary/25 bg-secondary/[0.06] backdrop-blur-md p-6 sm:p-8 ${className}`}
    >
      <div className="flex gap-4">
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-secondary text-[22px] mt-0.5 shrink-0"
        >
          info
        </span>
        <div>
          <h2 className="font-display text-headline-md text-on-surface mb-2">
            {isIndex ? "These are reference builds" : "This is a reference build"}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            {isIndex
              ? "Every write-up below documents an architecture we designed and can defend in detail, written against a representative brief. They are not records of paid client engagements, and the figures in them are design targets rather than measured outcomes."
              : "This documents an architecture we designed and can defend in detail, written against a representative brief. It is not a record of a paid client engagement, and the figures below are design targets rather than measured outcomes."}
          </p>
          <p className="font-body text-body-md text-on-surface-variant mt-3">
            Client case studies replace these as permission is granted. Anything
            published as client work will name the client, or state the industry
            and the date, and will say plainly which numbers the client verified.
          </p>
        </div>
      </div>
    </aside>
  );
}
