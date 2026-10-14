export default function manifest() {
  return {
    name: "LogixLoops: Brand, Web, App and AI Studio",
    short_name: "LogixLoops",
    description:
      "Brand, web, app and AI studio in Jaipur. Websites, online stores, apps, branding, SEO and AI automation sold as Loops with published prices, for India, the US, the UK and the UAE.",
    start_url: "/",
    display: "standalone",
    // Both light, and both `surface`. The installed app's toolbar and splash
    // now match the page rather than flashing a saturated bar above it, and
    // the splash's near-white ground is the one the fox was drawn against.
    background_color: "#f7faff",
    theme_color: "#f7faff",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Android crops installed icons to its own shape. The maskable variant
      // keeps the fox inside the 80% safe zone on an opaque plate, so the
      // crop never clips the mark or punches through to a transparent corner.
      {
        src: "/brand/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
