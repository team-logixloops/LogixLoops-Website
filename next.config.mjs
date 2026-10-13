/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // /solutions duplicated /case-studies (its own nav dropdown already pointed
  // at /case-studies/*), and /careers was a permanent "no openings" placeholder.
  // 308s so any indexed or inbound URL passes through instead of dying.
  async redirects() {
    return [
      { source: "/solutions", destination: "/work", permanent: true },
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/case-studies/:slug", destination: "/work/:slug", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      // The eight practice pages became six lines on 2026-10-13. Each old URL
      // lands on the line that now owns its work, so rankings and inbound
      // links carry over. See docs/superpowers/specs/ for the mapping.
      ...Object.entries({
        "web-development": "web-and-app-development",
        "mobile-apps": "web-and-app-development",
        "saas-platforms": "web-and-app-development",
        "enterprise-software": "web-and-app-development",
        "cloud-devops": "web-and-app-development",
        "ui-ux-design": "website-redesign",
        "ai-ml-solutions": "ai-automation",
        "automation-systems": "ai-automation",
      }).map(([from, to]) => ({
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
    ];
  },

  /**
   * Real HTTP response headers. X-Frame-Options, X-Content-Type-Options,
   * Permissions-Policy, and HSTS are header-only — browsers ignore them as
   * <meta> tags, so this is the only place they actually do anything.
   *
   * The CSP allows what the site genuinely loads: Google Fonts, Unsplash and
   * googleusercontent images, and the Formspree endpoint the contact form
   * posts to. 'unsafe-inline' is required for Next's inline bootstrap script
   * and for the inline styles the framework emits.
   */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com",
      "connect-src 'self' https://formspree.io",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
