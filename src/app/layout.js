import { Inter, Bricolage_Grotesque, Oswald } from "next/font/google";
import { Navbar, Footer, AmbientGlows, EmbedFlag, PointerLens, Preloader } from "@/components/layout";
import { GooFilter } from "@/components/ui";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import { PRELOADER_GATE_SCRIPT } from "@/components/layout/preloader-gate";
import { generateOrganizationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

/* ─── Font Loading ─── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["500", "600", "700"],
  display: "swap",
});

/* ─── Metadata ───
 * `metadataBase` is what lets every page below pass a relative canonical /
 * og:url and have Next resolve it to an absolute URL. Without it, relative
 * URL fields are a build error. */
/* One title and one description, written once and reused across the three
 * blocks below. They used to be typed out three times, which is how og:title
 * and twitter:title drift away from the real one. */
const SITE_TITLE = "LogixLoops | Brand, Web, App & AI Studio in Jaipur";
const SITE_DESCRIPTION =
  "Brand, web, app and AI studio in Jaipur. Websites, online stores, apps, branding, SEO and AI automation sold as Loops with published prices, for India, the US, the UK and the UAE.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  /* Brand first, then the page. A tab is only ever a few characters wide
     before it truncates, and what a reader scanning a strip of tabs needs
     from ours is which site it is, not which page of it. The page title is
     still the whole of the `<h1>` and of the search result. */
  title: {
    default: SITE_TITLE,
    template: "LogixLoops | %s",
  },
  description: SITE_DESCRIPTION,
  /* Head terms only. `keywords` carries no ranking weight at Google and has
   * not for years. It is here because several AI crawlers and a number of B2B
   * directory scrapers still read it, which makes it worth exactly the eight
   * lines it occupies and not one more. Per-route keywords go through
   * `buildMetadata`. */
  keywords: [
    "website design company in Jaipur",
    "web development company in Jaipur",
    "branding agency India",
    "website packages with prices",
    "app development company India",
    "SEO and AI search optimization",
    "AI automation agency",
    "LogixLoops",
  ],
  authors: [{ name: "LogixLoops" }],
  creator: "LogixLoops",
  publisher: "LogixLoops",
  category: "Web Design and Development",
  alternates: {
    canonical: "/",
  },
  /* Site ownership proofs. Through the metadata API rather than a hand-written
     tag in `<head>`, so it lands on the home page exactly once and cannot be
     duplicated by a route that also renders head content.
     Bing's is load-bearing beyond Bing: ChatGPT's web results lean on that
     index, so Webmaster Tools is the route to being answerable there at all.
     It must not be removed after verification succeeds. */
  verification: {
    other: {
      "msvalidate.01": "ED8833869108D338918286D08113F2D1",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LogixLoops",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // No `images` here, and none in buildMetadata either. Every route segment
    // ships its own `opengraph-image.js`, and Next attaches the file-convention
    // card to the segment that declares it. A hardcoded `images` entry would
    // shadow that and put the home card on every page.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // Next falls `twitter:image` back to the resolved Open Graph image, so
    // there is no parallel set of `twitter-image.js` files to keep in sync.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/* ─── Material Symbols Stylesheet ─── */
const materialIconsHref =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";

export default function RootLayout({ children }) {
  const orgSchema = generateOrganizationSchema();

  return (
    /* `suppressHydrationWarning` here for the same reason it is on <body>, and
       for the same class of cause: extensions that stamp <html> before React
       attaches. Scribe sets `data-scribe-recorder-ready`, dark-mode and
       translation extensions set their own. None of it is application state and
       none of it can be server-rendered. The flag is shallow, it forgives this
       element's own attributes only, so a genuine mismatch anywhere in the tree
       below still reports. */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} ${oswald.variable}`}
    >
      <head>
        {/* Only the directives that genuinely work as <meta>. X-Frame-Options,
            X-Content-Type-Options and Permissions-Policy are header-only and
            are set in next.config.mjs instead, as meta tags browsers ignore
            them entirely. */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href={materialIconsHref} rel="stylesheet" />
        <SchemaMarkup schema={orgSchema} />
      </head>
      {/*
        `suppressHydrationWarning` covers browser extensions that mutate
        <body> before React attaches. ColorZilla stamps `cz-shortcut-listen`,
        Grammarly adds `data-gr-*`, and so on. React sees an attribute the
        server never sent and reports a mismatch for something no application
        code controls.

        It is deliberately on <body> and nowhere else: the flag is shallow, so
        it forgives this element's own attributes and nothing inside it. Real
        mismatches in the tree below still surface.
      */}
      <body
        suppressHydrationWarning
        className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col relative overflow-x-clip"
      >
        {/* Covers the page on the first route of a tab's session and on every
            return to the homepage. Outside SmoothScrollProvider on purpose:
            it locks and releases Lenis itself, and it must be the first thing
            in <body> so the overlay is in the document before anything below
            it can paint. */}
        <Preloader />
        {/* The gate has to sit after the overlay — the element it hides must
            exist by the time it runs — and it has to be rendered from here,
            because React 19 refuses script tags inside client components and
            an inline script's whole job happens during HTML parse anyway. */}
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_GATE_SCRIPT }} />

        <SmoothScrollProvider>
          {/* Marks this document as the embedded copy when it is running
              inside a signature demo's iframe. Renders nothing. */}
          <EmbedFlag />

          {/* Atmospheric depth layer */}
          <AmbientGlows />

          {/* Feeds pointer coordinates to every `.cipher-lens` card on the
              site. Renders nothing; inert on routes that use no lenses. */}
          <PointerLens />

          {/* The `#goo` filter the blob buttons reference. Defined once for
              the document; renders a 0x0 SVG. */}
          <GooFilter />

          {/* Global navigation */}
          <Navbar />

          {/* Page content */}
          <main className="flex-grow pt-20 relative z-10">
            {children}
          </main>

          {/* Global footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
