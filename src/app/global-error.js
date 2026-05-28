"use client";

import { useEffect } from "react";
import "./globals.css"; // Ensure core styling is present

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log catastrophic layout failure
    console.error("[Catastrophic Global Error]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-on-surface font-body antialiased min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-8 text-center max-w-lg">
          <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-error text-[48px]">dangerous</span>
          </div>
          <h1 className="font-display text-display-lg text-on-surface mb-4">
            Critical Infrastructure Failure
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant mb-8">
            The core application layout has encountered a catastrophic initialization error. 
            Safe mode has been engaged.
          </p>
          <button 
            onClick={() => reset()}
            className="bg-primary text-white px-8 py-3 rounded-full font-label tracking-widest uppercase hover:bg-primary/90 transition-colors"
          >
            Restart Application Kernel
          </button>
        </div>
      </body>
    </html>
  );
}
