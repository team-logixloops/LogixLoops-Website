# LogixLoops image prompt booklet

Every raster image on this site is currently a stock photo or a leftover
placeholder. This booklet replaces all of them with generated art that sits
inside the brand palette instead of fighting it.

Nothing here is a suggestion about *what to depict* only — each prompt is
written to be pasted whole into Midjourney / Imagen / Flux / DALL·E and to
come back usable on the first or second run.

---

## 1. Why the current images are wrong

| Slot | What is there now | Problem |
| --- | --- | --- |
| `public/nav/*.webp` (19) | Unsplash stock: dark code screens, offices, laptops | Generic; four of them are literally the same "developer at monitor" genre; none share a palette |
| `public/case-studies/*.webp` (4) | AI stills, teal-on-charcoal, 512×512 | Teal-cyan is the *tertiary* token, used here as the whole image; square, so they upscale 5× in the nav band |
| `src/data/blog.js` covers (9) | Remote Unsplash URLs | Cross-origin, uncached, and unrelated to the article |
| `src/data/caseStudies.js` section images (4) | **One** `lh3.googleusercontent.com` URL repeated four times | Same picture on all four case studies; remote host, expires |
| `FeaturedWorkSection.jsx` (4) | Remote Unsplash URLs | Same as above |
| `AboutTeam.jsx` (4) | Unsplash portraits under "Placeholder Name" | See §7 — do **not** generate replacements |

What is already correct and must **not** be regenerated: `public/brand/**`
(built by `scripts/brand/build.py`), `public/services/*.svg` (brand-accurate
line icons), and `src/app/opengraph-image.js` (rendered from the real logo).

---

## 2. Two style keys

The site is a **light** interface (`background: #f7faff`, navy type). But the
nav mega-menu paints a `from-black/85 via-black/55 to-black/10` scrim across
its image and sets white link text on top of it ([Navbar.jsx:353](src/components/layout/Navbar.jsx#L353)).
A light image there turns to grey mud. So there are two keys, and each slot in
§4 is tagged `[L]` or `[D]`.

### `[L]` — LIGHT KEY (everything on-page)

Paste this block verbatim at the end of every `[L]` prompt:

```
STYLE: soft-light premium engineering aesthetic. Near-white background #f7faff
with a pale blue-grey tint, no pure white. Accents in royal blue #2868c6 and
bright blue #378ce7; deep navy #081D4A for line-work and UI chrome; a single
teal #0e7c8b accent reserved for one data or status mark. Frosted-glass panels:
translucent white at 45-60% opacity, heavy background blur, a 1px white
top-edge highlight, and a very soft wide shadow (rgba(8,29,74,0.06), 40px
blur, no dark edge). Thin 2-3px rounded strokes, flat vector and light
isometric 3D hybrid, matte finish. Generous negative space, at least 40% of
the frame empty. Diffuse studio light from the upper left, no hard speculars.
One soft blue radial bloom in a single corner. Calm, editorial, uncluttered.
```

### `[D]` — DARK KEY (nav mega-menu bands only)

```
STYLE: deep navy engineering scene. Background #0b1e3f to #081D4A gradient,
never neutral grey or black. Structure drawn in luminous royal #2868c6 and
bright blue #378ce7 line-work with a soft glow falloff; a single teal #0e7c8b
status accent. Thin 2-3px strokes, flat vector and light isometric 3D hybrid.
Subject weighted to the RIGHT two-thirds of the frame; the LEFT third is quiet
dark gradient with no detail. Cinematic but clean: no smoke, no particles
storm, no lens flare. One soft blue bloom behind the subject.
```

The left-third rule is not aesthetic — the menu's link list sits there in
white text at `max-w-sm`. Detail under it is unreadable and makes the text
unreadable too.

### Universal negative prompt

Append to every prompt, both keys:

```
NEGATIVE: text, lettering, words, numbers, labels, captions, watermarks,
logos, brand marks, readable code, human faces, hands, stock-photo office
scenes, keyboards, coffee cups, cyberpunk neon, magenta, purple, orange, red,
green, lens flare, heavy vignette, photographic bokeh, noise, grain, glossy
plastic 3D blobs, chrome reflections, drop-shadow hard edges, clutter.
```

Every generator drifts toward fake UI text. If a run comes back with lettering
on a panel, regenerate — do not retouch it out, the shapes underneath are
usually distorted too.

### Generator flags

| Generator | Wide band 2400×880 | 16:9 | 3:2 | 4:3 |
| --- | --- | --- | --- | --- |
| Midjourney | `--ar 30:11 --style raw --stylize 150` | `--ar 16:9 --style raw` | `--ar 3:2 --style raw` | `--ar 4:3 --style raw` |
| Imagen / Gemini | ask for "ultra-wide banner 2400×880" | `16:9` | `3:2` | `4:3` |
| Flux | `--aspect 30:11 --guidance 3.0` | `--aspect 16:9` | `--aspect 3:2` | `--aspect 4:3` |

Generate at the largest size offered, downscale in §8. Never upscale.

---

## 3. Slot inventory

| # | Slot | Count | Output px | Key | Destination |
| --- | --- | --- | --- | --- | --- |
| A | Nav mega-menu bands | 19 | 2400×880 | `[D]` | `public/nav/<slug>.webp` |
| B | Case-study heroes | 4 | 1600×1200 | `[L]` | `public/case-studies/<slug>.webp` |
| C | Case-study in-article | 4 | 1200×800 | `[L]` | `public/case-studies/<slug>-problem.webp` |
| D | Blog covers | 9 | 1200×675 | `[L]` | `public/blog/<slug>.webp` |
| E | Featured capabilities | 4 | 1583×1055 | `[L]` | `public/capabilities/<id>.webp` |
| F | Team portraits | 4 | — | — | **do not generate**, see §7 |

Totals: **40 images**. C, D and E need new directories and a one-line data
edit each (§8).

---

## 4A. Nav mega-menu bands `[D]` — 2400×880

Nineteen bands. Each one is cropped `object-cover object-center` into a
440px-tall full-width strip, so vertical crop is aggressive: keep the subject's
mass in the middle band, nothing important in the top or bottom 15%.

### Services (8)

**`enterprise-software.webp`**
```
A dark navy isometric scene of a large layered system: five wide translucent
platform slabs stacked with even air between them, connected by vertical
tension lines of light. The lowest slab is the widest and most solid, the
upper ones progressively lighter — a structure that reads as load-bearing and
unhurried. Right two-thirds of frame; left third empty dark gradient.
```

**`ai-ml-solutions.webp`**
```
A dark navy scene of a neural graph resolving from noise into order: on the
left, a scatter of dim disconnected nodes; toward the right they align into
three clean feed-forward layers with bright blue edges and one teal node lit
as an output. The transition is gradual, not a hard boundary. Right
two-thirds of frame; left third empty dark gradient.
```

**`web-development.webp`**
```
A dark navy isometric browser-frame abstraction floating at a slight angle:
a wireframe page grid of hollow rectangles, one hero block, a column rhythm
below it, and a thin blue loading meter fully filled. Behind it a faint second
frame offset in perspective, suggesting a fast repaint. Right two-thirds of
frame; left third empty dark gradient.
```

**`mobile-apps.webp`**
```
A dark navy scene of two slim phone silhouettes in three-quarter perspective,
screens shown as glowing blue wireframe layouts — one list view, one detail
view — connected by a curved motion arc that reads as a native transition.
Rounded, calm, no app icons. Right two-thirds of frame; left third empty dark
gradient.
```

**`cloud-devops.webp`**
```
A dark navy pipeline scene: six hexagonal stage nodes on a horizontal track
flowing left to right, each stage rendered as a thin blue ring, the last one
filled teal to read as a green deploy. Below the track, a faint duplicate
track dimmed, suggesting a rollback path that was never needed. Right
two-thirds of frame; left third empty dark gradient.
```

**`saas-platforms.webp`**
```
A dark navy isometric scene of one shared foundation slab carrying four
identical translucent tenant towers of differing heights, each with its own
faint blue boundary shell, none touching. A single control plane ribbon
threads through all four at the top. Right two-thirds of frame; left third
empty dark gradient.
```

**`automation-systems.webp`**
```
A dark navy scene of an endless machined loop: a smooth continuous blue ribbon
curving through four small process nodes and closing on itself, with a single
teal pulse travelling along it. Beside the loop, a stack of small task tiles
being consumed and vanishing. Right two-thirds of frame; left third empty dark
gradient.
```

**`ui-ux-design.webp`**
```
A dark navy scene of a layout being constructed: overlapping translucent
artboards at slight angles, blue baseline grid and spacing rulers drawn across
them, a component being lifted out of one board and placed into another. One
board is dense with real-looking data rows, deliberately fuller than the
others. Right two-thirds of frame; left third empty dark gradient.
```

### Work / case studies (4)

**`nexus-global-trading.webp`**
```
A dark navy trading-infrastructure scene: a wide horizontal latency trace of
thin blue lines running almost flat, with one teal marker showing a spike that
has been flattened. Behind it, faint concentric rings implying colocated
compute near a market edge. No candlesticks, no tickers. Right two-thirds of
frame; left third empty dark gradient.
```

**`aura-patient-portal.webp`**
```
A dark navy healthcare-data scene: a calm radial fabric where many small blue
telemetry streams converge into a single rounded panel at the centre-right,
ringed by a thin teal compliance boundary. Soft, clinical, reassuring — no
crosses, no hearts, no anatomy. Right two-thirds of frame; left third empty
dark gradient.
```

**`optiroute-command-center.webp`**
```
A dark navy logistics scene: an abstract geographic mesh of blue route arcs
resolving into three optimised corridors, with small square fleet markers
distributed along them and one teal marker being re-routed ahead of a
predicted delay. Abstract landmass shapes only, no real coastlines, no labels.
Right two-thirds of frame; left third empty dark gradient.
```

**`core-identity-framework.webp`**
```
A dark navy identity scene: dozens of scattered small credential tiles on the
right drawn inward into a single hexagonal core, the connections becoming
brighter and fewer as they approach. One teal ring around the core reads as a
verified boundary. No padlocks, no keys, no fingerprints. Right two-thirds of
frame; left third empty dark gradient.
```

### Company (7)

**`about.webp`**
```
A dark navy scene of a small deliberate team structure: four solid blue nodes
in a tight non-hierarchical arrangement, each connected directly to the other
three, drawn as thick confident lines. Around them, faint outlines of a much
larger sprawling org chart, unlit and receding. Right two-thirds of frame;
left third empty dark gradient.
```

**`process.webp`**
```
A dark navy scene of eight sequential gates along a gently rising path, each
gate a thin blue arch with a small teal checkmark-shaped tick beneath it (a
geometric tick, not an icon). The path is unbroken and the spacing is even —
it should read as a rehearsed sequence, not a race. Right two-thirds of frame;
left third empty dark gradient.
```

**`pricing.webp`**
```
A dark navy scene of three translucent tiers as stepped platforms of
increasing height, each with a thin blue edge light, the middle one lifted
slightly and ringed teal. Below them a single continuous measuring line
running the width of all three. Abstract, no currency symbols, no coins.
Right two-thirds of frame; left third empty dark gradient.
```

**`faq.webp`**
```
A dark navy scene of stacked collapsed panels seen edge-on in perspective,
one panel opened and glowing softly blue from within, its contents implied by
clean horizontal light bars. Calm and orderly, no question marks. Right
two-thirds of frame; left third empty dark gradient.
```

**`blog.webp`**
```
A dark navy scene of long-form structure: a tall translucent column of text
blocks implied by horizontal light bars of varying length, with an inset
diagram and a code block rendered as dimmer bars. A thin blue reading-progress
line runs down the left edge of the column. Right two-thirds of frame; left
third empty dark gradient.
```

**`security.webp`**
```
A dark navy scene of layered defence: three concentric hexagonal shells around
a small solid core, each shell thinner and dimmer outward, with one teal probe
line stopped cleanly at the outermost shell. Geometric and calm — no padlocks,
no shields, no hooded figures. Right two-thirds of frame; left third empty
dark gradient.
```

**`technology.webp`**
```
A dark navy scene of a stack: five horizontal strata seen in slight
perspective — infrastructure, data, services, interface, delivery — each
stratum built from small repeating blue modules, with vertical light threads
passing cleanly through all five. Right two-thirds of frame; left third empty
dark gradient.
```

---

## 4B. Case-study heroes `[L]` — 1600×1200 (4:3)

These render inside `aspect-[4/3]` glass panels with `object-cover`
([case-studies/[slug]/page.js:122](src/app/case-studies/[slug]/page.js#L122)),
so 4:3 is the correct native ratio — the current 512×512 squares are cropped
and soft. Composition: subject centred, breathing room on all four sides.

**`nexus-global-trading.webp`**
```
A light, airy 4:3 illustration of a low-latency trading architecture: a
frosted-glass panel holding a flat blue latency trace, with three smaller
glass service cards orbiting it connected by thin navy lines. One card is
highlighted teal as the in-memory data grid. The whole composition floats a
few degrees off-axis over a near-white field with a soft blue bloom in the
lower right.
```

**`aura-patient-portal.webp`**
```
A light, airy 4:3 illustration of a unified patient portal: one central
frosted-glass card showing an abstract vitals timeline in thin blue strokes,
fed by four slim telemetry streams entering from the edges. A thin teal
boundary ring encloses the whole group to read as a compliant data fabric.
Near-white field, soft blue bloom upper left, plenty of empty space.
```

**`optiroute-command-center.webp`**
```
A light, airy 4:3 illustration of a dispatcher command surface: a frosted-glass
map panel with abstract blue route arcs across an implied landmass, a slim
side panel of ranked route cards, and one teal route being promoted above the
others. Near-white field, soft blue bloom lower left, no text, no real
geography.
```

**`core-identity-framework.webp`**
```
A light, airy 4:3 illustration of federated identity: a single hexagonal core
in royal blue at centre, with six frosted-glass application cards arranged
around it, each joined to the core by exactly one clean navy line. One line
is teal, mid-handshake. Near-white field, soft blue bloom upper right,
generous empty space.
```

## 4C. Case-study in-article "the problem" `[L]` — 1200×800 (3:2)

One per study. These sit inside the narrative where the *before* state is
described, so each is the deliberate inverse of its hero above: fragmented,
crossed, uneven — but still drawn in the same light palette. Never dark, never
chaotic to the point of noise.

Two render facts that change the art: the box is `w-full h-[300px]` with
`object-cover`, so the crop is wide and short — **keep everything in the middle
horizontal band** — and the image is painted at `opacity-80` over a glass
panel ([page.js:167](src/app/case-studies/[slug]/page.js#L167)). Light art at
80% washes out, so either push these prompts one step more contrasty (`strokes
in full navy #081D4A, not tinted`) or drop the opacity to `opacity-100` when
you swap the sources in.

**`nexus-global-trading-problem.webp`**
```
A light 3:2 illustration of a fragmented trading stack: seven glass panels of
mismatched sizes at conflicting angles, connected by too many crossing thin
navy lines, with two connections drawn thicker and bending — a visible
bottleneck. One panel is faded, waiting. Near-white field, no dark tones,
composition deliberately unbalanced toward the right.
```

**`aura-patient-portal-problem.webp`**
```
A light 3:2 illustration of healthcare data silos: five sealed glass columns
of different heights standing apart with no connections between them, each
holding differently-shaped blue data marks that do not correspond. A single
thin dotted line attempts to cross and stops short. Near-white field, empty
space between the columns emphasised.
```

**`optiroute-command-center-problem.webp`**
```
A light 3:2 illustration of reactive fleet operations: a tangle of blue route
arcs over an abstract landmass, overlapping and doubling back, with several
fleet markers stalled at intersections. No hierarchy, no optimised corridor.
Near-white field, thin strokes, busy but not muddy.
```

**`core-identity-framework-problem.webp`**
```
A light 3:2 illustration of identity sprawl: thirty small credential tiles
scattered across the frame at random rotations, each with its own short
disconnected line going nowhere, several duplicated. No centre, no core.
Near-white field, even distribution, no focal point — the absence of one is
the subject.
```

---

## 4D. Blog covers `[L]` — 1200×675 (16:9)

Rendered at 1200×675 for the featured card and 800×450 for the grid
([blog/page.js:89](src/app/blog/page.js#L89)) — one asset serves both. Each
cover should read at 400px wide, so: **one idea, one focal object, no scene.**

**`generative-engine-optimization.webp`** — *Getting Cited by AI Search*
```
A light 16:9 illustration of a single source document being cited: one solid
blue document card at centre-left, with four thin quotation arcs leaving it
toward four smaller faded answer panels on the right, each carrying a small
teal attribution dot. Near-white field, wide empty margins, one focal object.
```

**`rag-that-survives-production.webp`** — *Chunking, Reranking, Eval*
```
A light 16:9 illustration of retrieval: a tall document represented as a
stack of horizontal slices, three slices lifted out and re-ordered by height
into a shorter ranked stack, with one teal slice at the top. A thin evaluation
bracket measures the result. Near-white field, one focal object.
```

**`postgres-at-ten-terabytes.webp`** — *What Breaks First*
```
A light 16:9 illustration of a database under scale: a single large glass
cylinder holding evenly stacked blue strata, with one stratum near the top
visibly bulging and outlined teal — the first thing to fail. Fine crack lines
radiate from it and stop. Near-white field, centred, calm.
```

**`kubernetes-cost-control.webp`** — *Cutting a Bill 40%*
```
A light 16:9 illustration of right-sizing: six container blocks, three of them
oversized glass shells with a small solid blue core rattling inside, three
already shrunk to fit their core exactly. A thin teal measuring line spans the
reclaimed gap. Near-white field, one row, generous air.
```

**`kubernetes-zero-trust.webp`** — *Multi-Tenant Enforcement*
```
A light 16:9 illustration of per-workload trust: nine small pods in a grid,
each individually ringed by its own thin blue boundary, with permitted routes
drawn as short solid lines between only three pairs and every other adjacency
left empty. One attempted crossing stops at a teal boundary. Near-white field.
```

**`multi-tenant-saas-data-isolation.webp`** — *Shared / Schema / Database*
```
A light 16:9 illustration of three isolation models side by side: one glass
cylinder with mixed colour rows, one cylinder divided into clean vertical
compartments, and three separate smaller cylinders. Equal weight, equal
spacing, one teal accent on the middle option. Near-white field, no labels.
```

**`llm-orchestration-in-production.webp`** — *Managing Latency*
```
A light 16:9 illustration of an inference path: a request travelling through
four staged glass gates, with a horizontal time axis beneath showing the
budget consumed at each gate; the third gate is the widest and is ringed teal.
A dotted fallback branch bypasses it. Near-white field, one focal path.
```

**`fixing-inp-in-react.webp`** — *INP Catches Slow React*
```
A light 16:9 illustration of interaction delay: a single tap ripple at left,
then a horizontal blue bar of blocked main-thread work, then the visual
response arriving late at right. A teal bracket measures the gap between tap
and response. Near-white field, strictly horizontal, one idea.
```

**`strangling-the-monolith.webp`** — *Zero-Downtime Migration*
```
A light 16:9 illustration of a strangler migration: one large faded monolith
block being progressively enclosed by a lattice of small solid blue service
cells growing around it from the right; the leftmost quarter of the monolith
is already replaced. One teal routing line decides which path each request
takes. Near-white field.
```

---

## 4E. Featured capabilities `[L]` — 1583×1055 (3:2)

Four posters in [FeaturedWorkSection.jsx](src/components/sections/home/FeaturedWorkSection.jsx#L10).
They are hover-zoom posters with large type overlaid, so: **low visual
frequency, subject off-centre, no detail in the lower third** (the title and
"Explore" label sit there).

**`enterprise-software.webp`**
```
A light 3:2 poster: a tall isometric structure of five stacked translucent
platform slabs occupying the upper right, drawn in navy line-work and royal
blue faces, with a single teal load indicator. Lower third of the frame is
near-empty pale gradient. Minimal, architectural, poster-like.
```

**`ai-ml.webp`**
```
A light 3:2 poster: a clean three-layer neural graph in the upper right, blue
edges thinning toward a single teal output node, with a faint scatter of
unresolved points trailing off to the left. Lower third near-empty pale
gradient. Minimal and poster-like.
```

**`cloud-devops.webp`**
```
A light 3:2 poster: a horizontal pipeline of six hexagonal stages sweeping
through the upper right, the final stage filled teal, with a faint dimmed
rollback track beneath it. Lower third near-empty pale gradient. Minimal and
poster-like.
```

**`ui-ux-design.webp`**
```
A light 3:2 poster: three overlapping translucent artboards at slight angles
in the upper right, blue baseline grid and spacing rulers across them, one
component lifted free. Lower third near-empty pale gradient. Minimal and
poster-like.
```

---

## 5. Optional slots (only if you add them)

Not currently required by any component — generate only if the section
changes. Same keys apply.

- **Blog default cover** `[L]` 1200×675 — fallback for posts with no cover.
  ```
  A light 16:9 illustration: a single frosted-glass article card at centre
  with implied text bars and one small blue diagram inset, over a near-white
  field with a soft blue bloom lower right. Deliberately generic and calm.
  ```
- **Contact page visual** `[L]` 1200×800 —
  ```
  A light 3:2 illustration of a first conversation: two glass panels facing
  each other joined by a single clean blue line, one panel holding an implied
  brief, the other an implied estimate, with one teal marker where they meet.
  Near-white field, very sparse.
  ```

---

## 6. Rules — what to never generate

1. **The logo.** `public/brand/**` is produced by `scripts/brand/build.py`
   from measured artwork. A generated fox is a different fox.
2. **The service icons.** `public/services/*.svg` are hand-built line icons on
   the exact `#2868c6 → #378ce7` gradient. They are the reference the raster
   art matches, not the other way round.
3. **Client logos.** Any generated "logo wall" invents companies you do not
   work with. Use real client marks with permission, or none.
4. **Faces presented as your team or your customers.** See §7.
5. **Screenshots of "your" product** containing readable metrics. A generated
   dashboard with plausible numbers is a fabricated claim.

## 7. The team portraits — do not generate

[AboutTeam.jsx:7](src/components/sections/about/AboutTeam.jsx#L7) already
carries this warning, and it is right: four stock portraits under four
"Placeholder Name" entries is the single easiest thing on the site for a
prospect to catch. Swapping stock photographs for *generated* faces makes it
worse — the people become entirely fictional, and current detectors flag AI
portraits reliably.

Three acceptable exits, in order of preference:

1. **Real photographs of real people**, shot or cropped to 3:4, 600×800. One
   consistent treatment: plain near-white or pale blue-grey backdrop, soft
   frontal light, waist-up, no heavy filter. If only two seats are filled,
   ship two cards.
2. **Drop the portraits**, keep the roles. The bios are already written as
   role descriptions and stand on their own as four glass cards with the role
   in display type and a brand-blue rule.
3. **Role emblems instead of faces** — honest, because nobody reads them as a
   person. `[L]`, 600×800 (3:4), one per role:
   ```
   A light 3:4 vertical card illustration, [ROLE MOTIF], drawn in navy
   line-work with royal blue fills on a near-white field, one teal accent,
   soft blue bloom behind. Centred, symmetrical, generous margins. Strictly
   abstract — no person, no silhouette, no avatar.
   ```
   `[ROLE MOTIF]` — Principal Engineer: *a set of service boundaries drawn as
   nested rounded enclosures with one decision record card pinned beside
   them*. AI & Data: *a pipeline feeding an evaluation bracket, with the model
   node smaller than the data node*. Product Design: *a component being tested
   against a dense column of realistic data rows*. Cloud & Reliability: *a
   progressive rollout bar at 40% with a single-step rollback arc beneath it*.

## 8. Pipeline — generate → convert → wire up

### Convert

Everything ships as WebP. From the repo root, with the generated PNGs in a
scratch folder:

```bash
# one-off, if sharp-cli is not around
npx -y sharp-cli --version

# nav bands
npx -y sharp-cli -i ./raw/nav/*.png -o ./public/nav \
  resize 2400 880 --fit cover --position center -- webp --quality 82

# case-study heroes (4:3)
npx -y sharp-cli -i ./raw/case-studies/*.png -o ./public/case-studies \
  resize 1600 1200 --fit cover -- webp --quality 84

# blog covers (16:9)
npx -y sharp-cli -i ./raw/blog/*.png -o ./public/blog \
  resize 1200 675 --fit cover -- webp --quality 84

# capability posters (3:2)
npx -y sharp-cli -i ./raw/capabilities/*.png -o ./public/capabilities \
  resize 1583 1055 --fit cover -- webp --quality 84
```

Quality 82 on the nav bands because a black scrim at 55–85% hides artefacts;
84 elsewhere. Target sizes: nav band ≤ 180 KB, hero ≤ 140 KB, cover ≤ 110 KB.
Anything much larger means the art has photographic noise it should not have.

### Wire up

Four edits, all mechanical:

| File | Change |
| --- | --- |
| [caseStudies.js](src/data/caseStudies.js) | `image:` on each section → `/case-studies/<slug>-problem.webp`, and give each its own `imageAlt` |
| [blog.js](src/data/blog.js) | each `image:` → `/blog/<slug>.webp` |
| [FeaturedWorkSection.jsx](src/components/sections/home/FeaturedWorkSection.jsx#L10) | each `image:` → `/capabilities/<id>.webp` |
| [case-studies/[slug]/page.js:126](src/app/case-studies/[slug]/page.js#L126) | `width={1600} height={900}` → `height={1200}`, matching the new 4:3 source and the `aspect-[4/3]` box |

Nav bands and case-study heroes need no code change — same paths, same names.

Once the last remote URL is gone, `images.remotePatterns` in
[next.config.mjs](next.config.mjs) can drop `images.unsplash.com` — its only
entry — and every image on the site is first-party. (The
`lh3.googleusercontent.com` case-study images were never in `remotePatterns`;
they render through a plain `<img>` with an eslint suppression at
[case-studies/[slug]/page.js:169](src/app/case-studies/[slug]/page.js#L169),
which is why they never tripped the loader. Once they are local, that element
can go back to `next/image` and the suppression can go.)

## 9. Accepting a run

Reject and regenerate if any of these are true:

- Any lettering, digit, or logo-like mark is visible anywhere in the frame.
- `[L]` image: the darkest large area is darker than the navy `#081D4A`, or
  the background has drifted grey/beige instead of `#f7faff`.
- `[D]` image: the left third carries detail, or the background is neutral
  black rather than navy.
- The hue has drifted to purple, cyan-as-primary, or teal used for more than
  one accent.
- It looks like a 3D render — glossy spheres, chrome, ray-traced reflections.
- A face, hand, or recognisable human silhouette appears.
- A nav band's subject sits in the top or bottom 15%, which the 440px crop
  eats.
