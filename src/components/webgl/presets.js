/**
 * LOGIXLOOPS: contour-field tunings, one per route.
 *
 * The field behind an interior hero is not wallpaper. Each route gets a
 * different tuning of the same shader, and the tuning is chosen to argue the
 * same thing the page argues: /security is rigid and dense because the page is
 * about control, /pricing is nearly empty because the page is asking you to
 * make a decision, /technology is the busiest because it is the page about
 * parts that come from elsewhere.
 *
 * Colours are [r, g, b] in 0..1, which is what the shader wants as a uniform.
 * They are the brand palette and nothing else:
 *
 *   NAVY   #081d4a   the deep trough
 *   ROYAL  #2868c6   primary
 *   STEEL  #336baf   the muted mid
 *   TEAL   #12a0b2   secondary, used sparingly
 *   MIST   #dcecfd   the near-white crest
 *
 * Field meanings:
 *   bands    how many contour lines are drawn. More reads as measured.
 *   scale    zoom on the noise field. Higher packs the contours tighter.
 *   speed    drift rate. 0 is a still drawing.
 *   warp     how far the field is distorted. 0 is a ruled plan, 1 is weather.
 *   opacity  ceiling on the whole layer.
 *   pointer  radius of the well the cursor pushes into the field. 0 disables
 *            the pointer listener entirely rather than tracking at zero force.
 */

const NAVY = [0.031, 0.114, 0.29];
const ROYAL = [0.157, 0.408, 0.776];
const STEEL = [0.2, 0.42, 0.686];
const TEAL = [0.071, 0.627, 0.698];
const MIST = [0.863, 0.925, 0.992];

export const SHADER_PRESETS = {
  /* The default, and the fallback for an unknown name. Middle of every range:
     it should look deliberate anywhere it lands. */
  home: {
    colorA: ROYAL,
    colorB: MIST,
    bands: 8,
    scale: 2.2,
    speed: 0.05,
    warp: 0.45,
    opacity: 0.3,
    pointer: 0.35,
  },

  /* The calmest field on the site: wide bands, the slowest drift. /about is
     people and history, so the ground under it should read as settled rather
     than as something in motion. */
  about: {
    colorA: STEEL,
    colorB: MIST,
    bands: 6,
    scale: 1.7,
    speed: 0.02,
    warp: 0.3,
    opacity: 0.26,
    pointer: 0.28,
  },

  /* Ruled contours, high band count, low warp. /process is a sequence, so its
     field reads as a measured drawing rather than as weather. */
  process: {
    colorA: ROYAL,
    colorB: STEEL,
    bands: 12,
    scale: 2.4,
    speed: 0.03,
    warp: 0.12,
    opacity: 0.28,
    pointer: 0.25,
  },

  /* The busiest field on the site, and the only one that reaches for the teal
     outside the logo's own family. This is the page about the parts that come
     from elsewhere. */
  technology: {
    colorA: TEAL,
    colorB: ROYAL,
    bands: 14,
    scale: 3.1,
    speed: 0.06,
    warp: 0.55,
    opacity: 0.32,
    pointer: 0.4,
  },

  /* The most rigid tuning here: densest contours, near-zero warp, and no
     pointer well at all. Nothing under /security moves when you push on it,
     which is the entire point of the page. */
  security: {
    colorA: NAVY,
    colorB: STEEL,
    bands: 16,
    scale: 2.6,
    speed: 0.012,
    warp: 0.04,
    opacity: 0.3,
    pointer: 0,
  },

  /* Fewest contour lines on the site. A page whose job is to help somebody
     make a decision gets the quietest floor. */
  pricing: {
    colorA: STEEL,
    colorB: MIST,
    bands: 5,
    scale: 1.5,
    speed: 0.018,
    warp: 0.22,
    opacity: 0.22,
    pointer: 0.2,
  },

  /* The most open field alongside pricing: five wide bands, slow drift. A
     reference page should not have a busy floor under the thing you are
     trying to scan. */
  faq: {
    colorA: ROYAL,
    colorB: MIST,
    bands: 5,
    scale: 1.6,
    speed: 0.022,
    warp: 0.26,
    opacity: 0.22,
    pointer: 0.22,
  },

  /* Editorial. Wide, slow and low-contrast, so a page of headlines has nothing
     competing with it. */
  blog: {
    colorA: STEEL,
    colorB: MIST,
    bands: 7,
    scale: 1.9,
    speed: 0.028,
    warp: 0.35,
    opacity: 0.24,
    pointer: 0.3,
  },

  /* The steepest gradient on the site. Contours crowd where
     the surface changes fastest, and this is the page about systems that
     were moved a long way in a short time. Navy troughs give it more
     contrast than any other preset: the archive should read as the heaviest
     page here, not the airiest. */
  caseStudies: {
    colorA: NAVY,
    colorB: ROYAL,
    bands: 11,
    scale: 2.8,
    speed: 0.04,
    warp: 0.62,
    opacity: 0.34,
    pointer: 0.3,
  },
};

/** Falls back to the home tuning so a typo'd name degrades to something
 *  correct-looking rather than to a blank canvas. */
export function getPreset(name) {
  return SHADER_PRESETS[name] ?? SHADER_PRESETS.home;
}
