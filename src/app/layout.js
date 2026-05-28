import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar, Footer, AmbientGlows } from "@/components/layout";
import CommandMenu from "@/components/ui/CommandMenu";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { generateOrganizationSchema } from "@/lib/schema";
import "./globals.css";

/* ─── Font Loading ─── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ─── Metadata ─── */
export const metadata = {
  title: {
    default: "LogixLoops — Strategic Engineering for Enterprise",
    template: "%s | LogixLoops",
  },
  description:
    "Pioneering resilient enterprise architecture through strategic engineering and tactical design. High-performance software solutions for forward-thinking organizations.",
  keywords: [
    "enterprise software",
    "AI solutions",
    "cloud architecture",
    "web development",
    "SaaS platforms",
    "digital engineering",
    "LogixLoops",
  ],
  authors: [{ name: "LogixLoops" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LogixLoops",
    title: "LogixLoops — Strategic Engineering for Enterprise",
    description:
      "Pioneering resilient enterprise architecture through strategic engineering and tactical design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── Material Symbols Stylesheet ─── */
const materialIconsHref =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";

export default function RootLayout({ children }) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href={materialIconsHref} rel="stylesheet" />
        <SchemaMarkup schema={orgSchema} />
      </head>
      <body className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Atmospheric depth layer */}
        <AmbientGlows />

        {/* Global Modal & Search System */}
        <CommandMenu />

        {/* Global navigation */}
        <Navbar />

        {/* Page content */}
        <main className="flex-grow pt-20 relative z-10">
          {children}
        </main>

        {/* Global footer */}
        <Footer />
      </body>
    </html>
  );
}
