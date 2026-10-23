---
name: bsumatra.dev
description: A senior engineer's career drawn as a rail network on white enamel.
colors:
  ink: "#16171a"
  ink-raised: "#2d2f35"
  paper: "#f6f6f3"
  enamel-white: "#ffffff"
  ink-2: "#45484f"
  ink-3: "#6b6e75"
  rule: "#d4d5d0"
  paper-on-ink: "#c9cbc6"
  paper-2: "#e9eae6"
  sign-bg: "#16171a"
  sign-ink: "#f6f6f3"
  line-p-blue: "#0a6cc0"
  line-d-green: "#13924a"
  line-m-orange: "#e98300"
  line-n-violet: "#7443e6"
  line-h-red: "#cf2e26"
  line-s-bronze: "#94602a"
typography:
  display:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.2vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  hero-name-mobile:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 4.2rem)"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 5.2rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  prose-title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2rem)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  page-lede:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
  lede:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  lede-sm:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
  sign:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 900
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\""
  caption:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
  label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    letterSpacing: "0.06em"
  station-label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 650
  legend-mobile:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.3
rounded:
  none: "0"
  full: "50%"
  track-cap: "5px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section-top: "clamp(80px, 11vw, 144px)"
  masthead: "64px"
  container: "1240px"
  page: "980px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.6em"
  button-primary-hover:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
  button-inverse:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.sign-bg}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.6em"
  button-inverse-hover:
    backgroundColor: "{colors.paper-on-ink}"
    textColor: "{colors.sign-bg}"
  button-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.5em 1em"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.3em 0.75em"
    height: "32px"
  button-outline-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  theme-toggle:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "44px"
  theme-toggle-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
  roundel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "28px"
  roundel-lg:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "56px"
  board-title:
    backgroundColor: "{colors.sign-bg}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  terminus:
    backgroundColor: "{colors.sign-bg}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.none}"
    padding: "clamp(40px, 6vw, 88px)"
---

# Design System: bsumatra.dev

## Overview

**Creative North Star: "The Transit Diagram"**

The career is drawn as a rail network. Every build is a line with one saturated color and a letter roundel; every technology is a station; lines cross where skills interchange. The page reads like station signage printed on white enamel: ink-black type in heavy highway-signage weights, square panels, thick ink rules, and nothing that floats. The color comes from the lines, never from the chrome.

Density follows real transit graphics. The home page opens on a full-width octilinear map with the title panel and legend set into its empty regions. Detail pages pick up the same vocabulary through the strip map, the in-train door diagram: a straight run of stops on the line's color. Surfaces are flat. Hierarchy comes from weight, size, and 3px ink borders, not from shadow or tint.

Motion has two authored moments, both on the map. On first load the lines draw along their routes in legend order. Then the network runs: a small carriage on every line travels out and back, dwelling at each station while a ring in the line color pulses outward. The trains are ambient, pausable from the legend, paused while the map is off-screen or the tab is hidden, and absent under reduced motion. Everything else is a state change: hovering or focusing a line dims the rest of the network.

**Key Characteristics:**
- White enamel ground, ink type, six line colors as the only chroma.
- Overpass at 800–900 for every title, regular for body, tabular numerals throughout.
- Square signage panels with 3px ink borders; circles only for roundels, stops, and interchanges.
- Dashed track means "sample", always and only.
- Flat: no shadows anywhere.
- A light and a dark theme of the same signage; the route colors never change.

## Colors

A near-monochrome signage palette (paper and ink) carrying six saturated route colors that never set text.

### Themes

The default follows the system color scheme. The masthead's sun/moon button switches to an explicit light or dark preference, stored locally and applied before first paint. Without browser storage, switching still works for the current page. Without JavaScript, the system preference still applies.

Dark mode keeps the transit palette and square signage. Paper becomes #121416; primary ink #f0f0eb; secondary ink #b9bec6; fine print #969da7; rules #444a53; diagram enamel #1b1e23; button hover ink #d4d6d0; subtle hover ground #25282d. Board title bars and the contact terminus use #202329 with #f6f6f3 text and #c9cbc6 secondary text, preserving dark signage instead of inverting these panels to white. The six route colors stay unchanged.

Theme changes use a brief color transition. Reduced motion switches themes immediately while retaining control feedback. Focus, selection, map labels, station markers, trains, sample dashes, buttons, and scrollbars all use the active theme's tokens.

### Primary
- **Signage Ink** (ink, #16171a): All text, buttons, masthead rule, panel borders, the terminus block, the focus ring, and selection. It is the system's single voice.
- **Raised Ink** (ink-raised, #2d2f35): Primary button hover only.

### Secondary
The six route colors. Each belongs to one line and travels with it everywhere: track, roundel ring, strip-map spine, bullet rings, and the underline color of that line's links. They are set per element through the `--line` custom property.
- **Payments Blue** (line-p-blue, #0a6cc0): Line P, Payments ledger (sample).
- **Dispatch Green** (line-d-green, #13924a): Line D, Dispatch console (sample).
- **Monolith Orange** (line-m-orange, #e98300): Line M, Monolith split (sample).
- **Notifly Violet** (line-n-violet, #7443e6): Line N, Notifly.
- **Homelab Red** (line-h-red, #cf2e26): Line H, Homelab.
- **This-Site Bronze** (line-s-bronze, #94602a): Line S, the request path that serves this site: TypeScript and Next.js, Cloudflare, then the visitor.

### Neutral
- **White Enamel** (paper, #f6f6f3): Page ground, roundel and stop fills, legend panel, the stroke halo behind map labels, and text on ink.
- **Bright Enamel** (enamel-white, #ffffff): Diagram panels that sit on paper (the Notifly feature diagram).
- **Worn Enamel** (paper-2, #e9eae6): Hover ground for outlined controls (theme toggle, legend train control).
- **Slate** (ink-2, #45484f): Secondary text such as ledes, legend kinds, route meta, strip notes, and spec terms.
- **Pewter** (ink-3, #6b6e75): Fine print, branch spurs, and the scrollbar thumb.
- **Platform Rule** (rule, #d4d5d0): Hairline 1px dividers inside panels (board rows, spec rows, legend key, mobile map frame).
- **Sign Panel** (sign-bg, #16171a): Board title bars and the terminus block. In dark mode it stays a dark panel (#202329) instead of inverting to white.
- **Sign Lettering** (sign-ink, #f6f6f3): Text on sign panels, and the inverse button plate.
- **Fog on Ink** (paper-on-ink, #c9cbc6): Body text on sign panels and the inverse button hover.

### Named Rules
**The Route Color Rule.** A line color belongs to one build and is set through `--line`. It strokes, borders, fills spines, and colors underlines. It never sets text color: orange on paper is about 2.5:1.

**The Monochrome Chrome Rule.** Masthead, buttons, panels, and headings are ink and paper only. If a non-map element needs color, it borrows the color of the line it belongs to.

## Typography

**Display Font:** Overpass (with system-ui, sans-serif)
**Body Font:** Overpass (with system-ui, sans-serif)

**Character:** One highway-signage face across the system. Titles run at 900 with tight negative tracking; body runs at 400 with generous 1.6 leading and tabular numerals.

### Hierarchy
- **Display** (900, clamp(2.6rem, 6vw, 5rem), 1): Terminus close. Detail page titles use the same voice slightly larger (clamp(2.8rem, 7vw, 5.2rem), 0.95). The hero name is container-scaled (5.5cqw, 0.94) so it fits its map panel. Below 1100px it is fluid instead (hero-name-mobile).
- **Headline** (900, clamp(2.1rem, 4.2vw, 3.5rem), 1.02): Section titles, max 18ch, balanced wrap.
- **Title** (900, clamp(1.4rem, 2.4vw, 1.9rem), 1.1): Route titles. Prose h2 on detail pages sits close (clamp(1.6rem, 2.6vw, 2rem), 1.15).
- **Lede** (400, 1.2rem): Section ledes in Slate, max 58ch. Detail-page ledes rise to 600 weight at clamp(1.25rem, 2vw, 1.5rem).
- **Body** (400, 17px, 1.6): Running text, max 65ch in prose.
- **Lede small** (400, 1.15rem): Route summaries, the terminus address, and detail-page closing lines.
- **Sign** (900, 1.1rem): The masthead name and board title bars.
- **Caption** (400, 0.9rem): Fine print, the footer, the mobile map hint, and the small button.
- **Label** (800, 0.75rem, 0.06em, uppercase): The Sample Tag only.
- **Station label** (650, 15px): Map station names with a 5px paper stroke halo. "You are here" steps up to 850.

### Named Rules
**The Heavy Signage Rule.** Every title and every interactive label is 700 or heavier: 900 for titles; 800 for buttons, legend names, strip stop names, back links, and text links; 700 for masthead links. Weight carries the hierarchy, and color does not.

**The 12px Floor Rule.** No HTML text drops below 12px. Container-scaled legend text uses `max(12px, ...)` so it holds the floor on short laptop screens. Map labels are SVG and scale with the plate (about 11.7px on the 940px phone plate); the legend repeats every line name as HTML text.

**The No Kicker Rule.** No eyebrow or kicker text is attached to a heading. The line roundel is the only mark that may lead a title.

## Layout

The home hero is a 1200×680 map viewBox inside a container-query frame sized to fit the viewport below the masthead. The frame stops shrinking at 1050px, capped by the available width, so short landscape windows scroll vertically instead of miniaturizing the diagram. The title panel (viewBox x 32 to 520, y 32 to 340) and the legend (x 960 to 1180, from y 270) occupy regions without track. The legend and its NDA line fit the first viewport at 1280×720; fine-pointer rows tighten to 36px while touch rows retain 44px. Below 1100px of usable width, title and Email lead a horizontally pannable 940px map, then a full-width legend with readable HTML labels. Legend links use two columns from 640px through 1099px.

Sections share a 1240px container with the fluid gutter and section-top rhythm. Detail pages narrow to 980px. Strip maps run vertically by default and turn horizontal from 860px. Feature and split-prose layouts collapse at 860px; boards and spec lists collapse at 640px. The terminus uses a 24px padding floor so its heading and contact details fit a narrow cover screen.

Responsive breakpoints measure the named `site` content container, not the device width. Safe-area insets pad the body, and viewport-fit enables them without restricting zoom. When a browser reports two horizontal viewport segments, the page stays in the first segment; the same container queries then adapt to that pane. Browsers without segment information retain the fluid full-width layout. There is no separate foldable component or device detection. Vertical folds retain ordinary document scrolling.

**Reflow and touch.** Header content can wrap and grow; project links stay visible at every width. Buttons, headings, and long unbroken text wrap. Back links, standalone text links, footer links, and next-line links have at least 44px height. Inline links inside prose retain normal text flow. The map alone may scroll horizontally; page content must fit at 280px and at enlarged text sizes.

**The Empty Region Rule.** Panels over the map sit only in regions that have no track or label. Map geometry is laid out around them, never under them.

## Elevation & Depth

The system is flat. There are no box shadows. Depth is conveyed by signage means: 3px ink borders frame panels, ink blocks invert the ground (board titles, the terminus), and Bright Enamel lifts diagram panels a step off the paper. On the map, stacking comes from paint order: tracks, then stops, then roundel badges, with a paper stroke halo knocking labels out of the track.

**The Flat Enamel Rule.** Nothing casts a shadow. When a surface must separate, it gets an ink border or inverts to ink.

## Shapes

Corners are square (0) on every panel, button, board, and tag. Circles are reserved for transit marks: roundels (border at 17% of size), stops (small paper dots with an ink ring), interchange rings, the "you are here" ring and dot, and strip-map dots. Interchanges where lines run in parallel are paper capsules with an ink outline. Track corners turn on octilinear bends with a 22px rounded join and round caps. The legend's sample-key glyph is a miniature track with a 5px round cap (track-cap). Train carriages are the one rounded rectangle (3px corners), because they are vehicles on the track, not chrome.

Borders come in three weights: 3px ink for panels and section rules, 2px dashed for sample notices, and 1px rule for internal dividers.

**The Circles Are Stations Rule.** A round shape always means a stop, an interchange, or a line roundel. UI chrome never gets rounded corners.

## Components

### Buttons
Signage plates: solid, square, heavy.
- **Shape:** square corners (0).
- **Primary:** ink plate, paper text, 800 weight, padding 0.85em 1.6em, centered text that can wrap, minimum 44px height.
- **Hover / Focus:** background shifts to Raised Ink with a 0.2s ease-out. Active presses down 1px. Focus shows a 3px ink outline with 3px offset.
- **Inverse:** paper plate on ink (terminus). Hover lifts to Bright Enamel, and the focus outline turns paper.
- **Small:** padding 0.5em 1em at 0.9rem (masthead Email).
- **Outline:** paper plate with a 2px ink border, ink text at 800, hover to Worn Enamel. Used for secondary controls that must not compete with Email: the legend's "Pause trains" control (32px tall, 44px on touch layouts) and the 44px masthead theme toggle, which carries a drawn sun or moon icon and a screen-reader label naming the theme it switches to.

### Roundel
The line's identity mark: a paper disc with a thick ring in the line color and the line letter at 900. Default 28px, large 56px. It sits beside route titles, the legend rows, the board title, detail-page heads, and next-line links. It is always aria-hidden, because the line name is always present as text.

### Strip Map (signature)
The in-train door diagram. An ordered list of stops on an 8px spine in the line color, with 20px paper dots ringed in ink. Stop names are 800; notes are Slate at 0.92rem. Branches leave as a short Pewter spur. It is vertical by default and horizontal from 860px of usable content width, leaving long technology names room on unfolded screens. On sample lines a dashed paper stripe runs down the spine.

### Network Map (signature)
Octilinear SVG. Tracks are 9px with round caps in the line color, widening to 14px on keyboard focus. Sample lines overlay a 3px paper dash (9/9). Hovering or focusing a line or legend row dims other lines to 12% and unserved stations to 22%. Hovering a station lights every line through it. On first load the tracks draw in legend order (1.2s, 110ms stagger, exponential ease-out). After 1.8s the trains start, staggered 0.35s per line: a 24x12 paper carriage with an ink outline and windows in the line color rides the track at 60 units per second, dwells 1.4s at every station, and fires a 1.1s ring pulse in the line color as it arrives. Trains dim with their line, pause off-screen or in a hidden tab, and stop when the legend control is pressed. Under reduced motion the map is static and the control is hidden. The map plate takes a tab stop only when it pans (below 1100px). Line S runs TypeScript, Next.js, Cloudflare, then "You are here"; it crosses Line H without a station because the site does not run on the homelab.

### Legend
A paper panel with a 3px ink border, set into the map. Its head row pairs the "Lines" title with the outline train control. Line rows (roundel, 800 name, Slate kind) double as navigation and dim along with the map. A 1px rule separates the dashed sample key and the NDA line. All legend fine print holds the 12px floor.

### Sample Tag
An inline status mark for stand-in content: 2px dashed border in the current color, 0.75rem, 800, uppercase with 0.06em tracking. It always sits inline inside the sentence that explains the stand-in. It is never a kicker on a heading and is not a general label style.

### Cards / Containers
- **Route:** an unboxed list item under a 3px ink top rule. The whole item is the link target. Hover underlines the title 4px in the line color.
- **Board:** 3px ink frame, ink title bar with roundel, two-column definition rows split by 1px rules.
- **Spec:** two-column fact list under a 3px ink rule, with 1px rule dividers and 0.85rem Slate terms.
- **Terminus:** a full ink block with fluid padding, a display title, Fog on Ink body, and an inverse button.

### Navigation
- **Masthead:** minimum 64px bar with a 3px ink bottom rule. The mark is a 5px-ring ink circle plus the name at 900. Links are 700 with an underline on hover. At 860px and below, the project links occupy a full row beneath the mark and theme/Email controls. At very narrow widths or enlarged text, the top controls wrap too; no navigation is hidden.
- **Text link:** 800 weight with a 3px underline in the line color (ink outside a line), turning ink on hover.
- **Next line:** a footer bar on detail pages under a 3px ink rule, with a roundel and the next title.
- **Not on the map (404):** a detail-page layout with an "All lines" back link, a page title, a page lede, and links back to the map and Email. No roundel, because no line serves it.
- **Favicon:** the masthead ring mark as SVG, ink on paper, inverted under a dark system scheme.

## Do's and Don'ts

### Do:
- **Do** give every build its own line color, letter roundel, and `--line` scope, and carry that color into every element that belongs to it.
- **Do** use dashed track (paper dash over the line) and the dashed Sample Tag to mark sample or placeholder content, and say so in words beside it.
- **Do** set titles and interactive labels in Overpass at 700–900, and frame panels with 3px ink borders.
- **Do** keep authored motion on the map: the draw-on-load and the running trains. Everything else is a hover or focus state transition with the ease-out curve. Trains stay pausable and pause off-screen, and the map is static under reduced motion.
- **Do** keep the legend's NDA line in the first viewport at 1280x720 and up.
- **Do** dim rather than hide: unfocused lines drop to 12% and unserved stations to 22%.

### Don't:
- **Don't** set text in a line color. Line colors stroke, border, and underline only.
- **Don't** use dashing as decoration on a real line or panel. Dashed means sample.
- **Don't** add shadows, decorative gradients, or rounded corners to chrome. The only gradient is the sample dash, and circles are stations.
- **Don't** attach a kicker or eyebrow label to a heading; only the line roundel may lead a title.
- **Don't** introduce a second typeface or a color outside ink, paper, and the line palette.
- **Don't** add scroll-triggered entrances or motion outside the map.
- **Don't** route a line through stations it does not serve. The map is a factual diagram; Line S stops only where the site really runs.
