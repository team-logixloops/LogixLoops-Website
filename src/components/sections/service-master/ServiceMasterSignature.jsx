"use client";

import { SectionHeader } from "@/components/ui";
import { FadeInUp } from "@/components/motion";
import { SECTION } from "./tokens";

import PhoneScrollDemo from "./signature/PhoneScrollDemo";
import ViewportDemo from "./signature/ViewportDemo";
import InferenceDemo from "./signature/InferenceDemo";
import PipelineDemo from "./signature/PipelineDemo";
import ArchitectureDemo from "./signature/ArchitectureDemo";
import TenantDemo from "./signature/TenantDemo";
import WorkflowDemo from "./signature/WorkflowDemo";
import TokensDemo from "./signature/TokensDemo";

/**
 * The one section that is deliberately NOT uniform: each service gets a
 * hands-on demo of the thing it actually builds. The frame around it (header,
 * spacing, panel) stays identical so the pages still read as one family.
 */
const DEMOS = {
  "mobile-apps": {
    title: "Take the Signal Away",
    description:
      "A working field-service app with a durable outbox. Switch on airplane mode and keep closing jobs, then let the office edit the same record behind your back and watch the merge happen.",
    Component: PhoneScrollDemo,
  },
  "web-development": {
    title: "Measure the Build",
    description:
      "Resize a live frame of the site, then read the numbers it produced: navigation timings, resource weight, box models on hover, and a width sweep that finds the exact pixel a layout would break.",
    Component: ViewportDemo,
  },
  "ai-ml-solutions": {
    title: "Train the Classifier",
    description:
      "A real Naive Bayes model, fitted in your browser. Add a training example and watch the vocabulary, the held-out accuracy, and the per-word evidence all move.",
    Component: InferenceDemo,
  },
  "cloud-devops": {
    title: "Ship a Release",
    description:
      "Five gated stages with their own logs. Arm any of them to fail, or push the canary past its error budget and let the gate decide to roll itself back.",
    Component: PipelineDemo,
  },
  "enterprise-software": {
    title: "Load the System",
    description:
      "A queueing simulator, not a diagram. Turn the traffic up past capacity, kill a service, watch retries make it worse, then arm the circuit breaker and watch that stop.",
    Component: ArchitectureDemo,
  },
  "saas-platforms": {
    title: "Attack the Tenant Boundary",
    description:
      "A query console you can point at another customer's rows. The policy engine appends the isolation predicate itself, so try it, and then drain the rate limiter while you are here.",
    Component: TenantDemo,
  },
  "automation-systems": {
    title: "Fire the Trigger",
    description:
      "Four nodes are simulated. The fifth opens an SMTP connection and sends you a real email, then prints the message id it got back.",
    Component: WorkflowDemo,
  },
  "ui-ux-design": {
    title: "Build a Design System",
    description:
      "Seven controls, one token layer, and a Download button that hands you the exact file you are looking at, the preview is the export, rendered.",
    Component: TokensDemo,
  },
};

export default function ServiceMasterSignature({ service }) {
  const demo = DEMOS[service?.id];
  if (!demo) return null;

  const { Component } = demo;

  return (
    <section className={SECTION}>
      <FadeInUp>
        <SectionHeader
          overline="Try It"
          title={demo.title}
          description={demo.description}
        />
      </FadeInUp>

      <div className="mt-stack-lg">
        <Component color={service.color} />
      </div>
    </section>
  );
}
