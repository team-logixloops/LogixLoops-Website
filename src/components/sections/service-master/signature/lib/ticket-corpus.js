"use client";

/**
 * Seed corpus for the classifier demo, inbound support tickets, four intents.
 *
 * Written for lexical recurrence, which is the property that makes bag-of-words
 * classification work at all. An earlier version of this file said the same
 * things in deliberately varied language; the result was that a held-out ticket
 * shared one or two words with the entire training set, and the model scored at
 * chance no matter how the maths was tuned. That was the corpus failing, not
 * the algorithm.
 *
 * Real support queues are repetitive: billing tickets say "invoice", "charged",
 * "refund"; access tickets say "login", "password", "account". Each document
 * below carries three or four of its class's recurring terms, in ordinary
 * phrasing. Enough shared vocabulary to generalise, enough overlap between
 * classes ("account" spans Billing and Access, "page" spans Bug and Feature)
 * that the model still has something to get wrong.
 */

export const LABELS = ["Billing", "Access", "Bug", "Feature"];

export const SEED_TICKETS = [
  // ── Billing, invoice / charged / refund / payment / subscription / plan ──
  { label: "Billing", text: "We were charged twice on the same invoice, please refund one payment." },
  { label: "Billing", text: "The invoice for our subscription shows the wrong plan and the wrong price." },
  { label: "Billing", text: "Please send a VAT invoice for last quarter's subscription payment." },
  { label: "Billing", text: "Our payment card was declined so the subscription invoice is unpaid." },
  { label: "Billing", text: "Move our subscription from monthly billing to annual billing and refund the difference." },
  { label: "Billing", text: "We cancelled the subscription before renewal but were charged anyway, refund please." },
  { label: "Billing", text: "The seat count on this invoice is wrong, we should be charged for fewer seats." },
  { label: "Billing", text: "Can we pay this invoice by purchase order instead of a payment card?" },
  { label: "Billing", text: "Please update the payment card on the subscription, the old card expired." },
  { label: "Billing", text: "The renewal invoice charged us a higher price than the plan we agreed." },
  { label: "Billing", text: "Downgrading the plan mid-term, how is the refund on the invoice calculated?" },
  { label: "Billing", text: "We need a copy of every invoice charged to this subscription this year." },

  // ── Access, login / password / account / permissions / sign in / sso ──
  { label: "Access", text: "The SSO login redirects back to the sign in screen and never opens my account." },
  { label: "Access", text: "I cannot login because the password reset for my account never arrives." },
  { label: "Access", text: "Please create an account for a new starter and grant admin permissions." },
  { label: "Access", text: "Two-factor rejects my code so I cannot sign in to the account at all." },
  { label: "Access", text: "My login session expires constantly and I have to sign in again every time." },
  { label: "Access", text: "SSO is not passing group permissions, so every account lands with the wrong role." },
  { label: "Access", text: "My account is locked after failed login attempts, please unlock the account." },
  { label: "Access", text: "Restrict login to our domain so nobody can sign in with a personal account." },
  { label: "Access", text: "A leaver still has login access, please revoke that account and its permissions." },
  { label: "Access", text: "Directory sync stopped creating accounts, so new joiners cannot login." },
  { label: "Access", text: "The invite to the account expired and the login link will not let me sign in." },
  { label: "Access", text: "Please change my account permissions from member to owner, I cannot edit anything." },

  // ── Bug, error / broken / fails / crashes / wrong / expected ──
  { label: "Bug", text: "The dashboard crashes with a 500 error whenever the date range is wide." },
  { label: "Bug", text: "Uploading a large file fails with no error and nothing is saved." },
  { label: "Bug", text: "Sorting the table shows the wrong order, the arrow points the wrong way." },
  { label: "Bug", text: "Notifications fire twice for every comment, which is not the expected behaviour." },
  { label: "Bug", text: "The mobile layout is broken and the footer overlaps the content." },
  { label: "Bug", text: "Timestamps show the wrong timezone even though the setting is correct." },
  { label: "Bug", text: "Search shows stale results until I refresh, which is not what I expected." },
  { label: "Bug", text: "The exported file is blank, the export silently fails on large documents." },
  { label: "Bug", text: "The chart is broken after applying two filters, it renders an error instead." },
  { label: "Bug", text: "Undo restores the wrong value, so editing a record loses data unexpectedly." },
  { label: "Bug", text: "The page crashes to a blank screen on Safari, no error message at all." },
  { label: "Bug", text: "Drag and drop shows the wrong order after reload, the change never saves." },

  // ── Feature, add / support / ability / option / request / would help ──
  { label: "Feature", text: "Please add the ability to export the audit log on a schedule." },
  { label: "Feature", text: "It would help to add bulk editing so we can change many records at once." },
  { label: "Feature", text: "Please add a dark theme as an option, the current one is hard on the eyes." },
  { label: "Feature", text: "Requesting webhook support so our systems can react to changes automatically." },
  { label: "Feature", text: "Could you add the ability to group the roadmap by owner as well as quarter?" },
  { label: "Feature", text: "Please add API support for creating records without using the interface." },
  { label: "Feature", text: "Adding saved views as an option would help us avoid rebuilding filters daily." },
  { label: "Feature", text: "It would help to add keyboard shortcuts for moving between records." },
  { label: "Feature", text: "Please add an option to schedule the weekly summary and send it automatically." },
  { label: "Feature", text: "Requesting template support so new projects start with our defaults." },
  { label: "Feature", text: "Please add the ability to resolve comments rather than only delete them." },
  { label: "Feature", text: "Adding an approval option before publishing would help our review process." },
];

/**
 * Sentences to try against the model, none of them appear in the corpus, but
 * each carries the vocabulary its class actually uses. That is not stacking the
 * deck; it is what a real inbound ticket looks like.
 */
export const PROBES = [
  "This invoice charged us for seats we never had, please refund the payment.",
  "I cannot login, the SSO screen loops and my account never opens.",
  "The chart is broken and throws an error, which is not what I expected.",
  "Please add an option to schedule the weekly summary automatically.",
];
