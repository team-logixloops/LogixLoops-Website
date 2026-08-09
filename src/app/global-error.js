"use client";

/**
 * global-error replaces the root layout entirely when the root itself throws,
 * so it must render its own <html> and <body>. Next's built-in fallback ships
 * without a lang attribute, a <main> landmark, or any recovery path.
 */
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7faff",
          color: "#081d4a",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "560px", textAlign: "center" }}>
          {/*
            This is the only screen on the site with no navbar, global-error
            replaces the root layout, so nothing else here says whose site
            broke. The real mark, not the name typed in a fallback face:
            fonts are loaded by the layout that just failed to render.
            eslint-disable-next-line @next/next/no-img-element
          */}
          <img
            src="/brand/logo-lockup.svg"
            alt="LogixLoops"
            width={1312}
            height={1029}
            style={{ height: "84px", width: "auto", margin: "0 auto 24px" }}
          />
          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "34px",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Something went wrong on our end.
          </h1>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: "17px",
              lineHeight: 1.6,
              color: "#4a5a75",
            }}
          >
            An unexpected error interrupted this page. Try again, if it keeps
            happening, get in touch and we will look into it.
          </p>
          {error?.digest && (
            <p
              style={{
                margin: "0 0 28px",
                fontSize: "13px",
                color: "#7a8aa5",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "999px",
                padding: "13px 28px",
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "#2868c6",
                color: "#ffffff",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "999px",
                padding: "13px 28px",
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "1px solid rgba(8,29,74,0.2)",
                color: "#081d4a",
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
