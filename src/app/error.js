"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to our analytics abstraction
    console.error("[Runtime Error Boundary Caught]:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-margin-x-mobile text-center">
      <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 bg-error/20 blur-xl rounded-full animate-pulse"></div>
        <span className="material-symbols-outlined text-error icon-lg relative z-10">warning</span>
      </div>
      {/* `display-md` was never defined in the scale, so this rendered at the
          browser default. `headline-lg` is the right weight for an error
          heading, it should not compete with a page title. */}
      <h2 className="font-display text-headline-lg text-on-surface mb-4">
        System Desynchronization
      </h2>
      <p className="font-body text-body-lg text-on-surface-variant max-w-md mb-8">
        We encountered an unexpected runtime anomaly while rendering this interface. Our telemetry has logged the incident.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => reset()} icon="refresh" iconPosition="left">
          Reinitialize Node
        </Button>
        <Button href="/" variant="outline" icon="home" iconPosition="left">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
