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
  lede:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\""
  station-label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 650
rounded:
  none: "0"
  full: "50%"
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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85em 1.6em"
  button-inverse-hover:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.ink}"
  button-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.5em 1em"
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
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  terminus:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "clamp(40px, 6vw, 88px)"
---

# Design System: bsumatra.dev

## Overview

**Creative North Star: "The Transit Diagram"**

The career is drawn as a rail network. Every build is a line with one saturated color and a letter roundel; every technology is a station; lines cross where skills interchange. The page reads like station signage printed on white enamel: ink-black type in heavy highway-signage weights, square panels, thick ink rules, and nothing that floats. The color comes from the lines, never from the chrome.

Density follows real transit graphics. The home page opens on a full-width octilinear map with the title panel and legend set into its empty regions. Detail pages pick up the same vocabulary through the strip map, the in-train door diagram: a straight run of stops on the line's color. Surfaces are flat. Hierarchy comes from weight, size, and 3px ink borders, not from shadow or tint.

Motion is authored once. On first load the lines draw along their routes in legend order. After that, everything is a state change: hovering or focusing a line dims the rest of the network.

**Key Characteristics:**
- White enamel ground, ink type, six line colors as the only chroma.
- Overpass at 800–900 for every title, regular for body, tabular numerals throughout.
- Square signage panels with 3px ink borders; circles only for roundels, stops, and interchanges.
- Dashed track means "sample", always and only.
- Flat: no shadows anywhere.

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
- **This-Site Bronze** (line-s-bronze, #94602a): Line S, the request path that serves this site.

### Neutral
- **White Enamel** (paper, #f6f6f3): Page ground, roundel and stop fills, legend panel, the stroke halo behind map labels, and text on ink.
- **Bright Enamel** (enamel-white, #ffffff): Diagram panels that sit on paper (the Notifly feature diagram) and the inverse button hover.
- **Slate** (ink-2, #45484f): Secondary text such as ledes, legend kinds, route meta, strip notes, and spec terms.
- **Pewter** (ink-3, #6b6e75): Fine print, branch spurs, and the scrollbar thumb.
- **Platform Rule** (rule, #d4d5d0): Hairline 1px dividers inside panels (board rows, spec rows, legend key, mobile map frame).
- **Fog on Ink** (paper-on-ink, #c9cbc6): Body text on the ink terminus block.

### Named Rules
**The Route Color Rule.** A line color belongs to one build and is set through `--line`. It strokes, borders, fills spines, and colors underlines. It never sets text color: orange on paper is about 2.5:1.

**The Monochrome Chrome Rule.** Masthead, buttons, panels, and headings are ink and paper only. If a non-map element needs color, it borrows the color of the line it belongs to.

## Typography

**Display Font:** Overpass (with system-ui, sans-serif)
**Body Font:** Overpass (with system-ui, sans-serif)

**Character:** One highway-signage face across the system. Titles run at 900 with tight negative tracking; body runs at 400 with generous 1.6 leading and tabular numerals.

### Hierarchy
- **Display** (900, clamp(2.6rem, 6vw, 5rem), 1): Terminus close. Detail page titles use the same voice slightly larger (clamp(2.8rem, 7vw, 5.2rem), 0.95). The hero name is container-scaled (5.5cqw, 0.94) so it fits its map panel.
- **Headline** (900, clamp(2.1rem, 4.2vw, 3.5rem), 1.02): Section titles, max 18ch, balanced wrap.
- **Title** (900, clamp(1.4rem, 2.4vw, 1.9rem), 1.1): Route titles. Prose h2 on detail pages sits close (clamp(1.6rem, 2.6vw, 2rem), 1.15).
- **Lede** (400, 1.2rem): Section ledes in Slate, max 58ch. Detail-page ledes rise to 600 weight at clamp(1.25rem, 2vw, 1.5rem).
- **Body** (400, 17px, 1.6): Running text, max 65ch in prose.
- **Station label** (650, 15px): Map station names with a 5px paper stroke halo. "You are here" steps up to 850.

### Named Rules
**The Heavy Signage Rule.** Every title and every interactive label is 700 or heavier: 900 for titles; 800 for buttons, legend names, strip stop names, back links, and text links; 700 for masthead links. Weight carries the hierarchy, and color does not.

**The No Kicker Rule.** No eyebrow or kicker text is attached to a heading. The line roundel is the only mark that may lead a title.

## Layout

The home hero is a 1200×680 map viewBox inside a container-query frame that is sized to fit the viewport below the 64px masthead. The title panel and legend are absolutely placed into map regions that have no track. Below 1100px the frame unstacks: title and Email first, then the map as a horizontally pannable 940px plate between 1px rules, then the legend as tappable rows.

Sections share a 1240px container with the fluid gutter and section-top rhythm. Detail pages narrow to 980px. Strip maps run vertically by default and turn horizontal from 720px. Two-column blocks (feature, split prose) collapse below 860px. Two-column boards and spec lists collapse below 640px, where the masthead also drops its text links and keeps only Email.

**The Empty Region Rule.** Panels over the map sit only in regions that have no track or label. Map geometry is laid out around them, never under them.

## Elevation & Depth

The system is flat. There are no box shadows. Depth is conveyed by signage means: 3px ink borders frame panels, ink blocks invert the ground (board titles, the terminus), and Bright Enamel lifts diagram panels a step off the paper. On the map, stacking comes from paint order: tracks, then stops, then roundel badges, with a paper stroke halo knocking labels out of the track.

**The Flat Enamel Rule.** Nothing casts a shadow. When a surface must separate, it gets an ink border or inverts to ink.

## Shapes

Corners are square (0) on every panel, button, board, and tag. Circles are reserved for transit marks: roundels (border at 17% of size), stops (small paper dots with an ink ring), interchange rings, the "you are here" ring and dot, and strip-map dots. Interchanges where lines run in parallel are paper capsules with an ink outline. Track corners turn on octilinear bends with a 22px rounded join and round caps.

Borders come in three weights: 3px ink for panels and section rules, 2px dashed for sample notices, and 1px rule for internal dividers.

**The Circles Are Stations Rule.** A round shape always means a stop, an interchange, or a line roundel. UI chrome never gets rounded corners.

## Components

### Buttons
Signage plates: solid, square, heavy.
- **Shape:** square corners (0).
- **Primary:** ink plate, paper text, 800 weight, padding 0.85em 1.6em, no wrapping.
- **Hover / Focus:** background shifts to Raised Ink with a 0.2s ease-out. Active presses down 1px. Focus shows a 3px ink outline with 3px offset.
- **Inverse:** paper plate on ink (terminus). Hover lifts to Bright Enamel, and the focus outline turns paper.
- **Small:** padding 0.5em 1em at 0.9rem (masthead Email).

### Roundel
The line's identity mark: a paper disc with a thick ring in the line color and the line letter at 900. Default 28px, large 56px. It sits beside route titles, the legend rows, the board title, detail-page heads, and next-line links. It is always aria-hidden, because the line name is always present as text.

### Strip Map (signature)
The in-train door diagram. An ordered list of stops on an 8px spine in the line color, with 20px paper dots ringed in ink. Stop names are 800; notes are Slate at 0.92rem. Branches leave as a short Pewter spur. It is vertical by default and horizontal from 720px. On sample lines a dashed paper stripe runs down the spine.

### Network Map (signature)
Octilinear SVG. Tracks are 9px with round caps in the line color, widening to 14px on keyboard focus. Sample lines overlay a 3px paper dash (9/9). Hovering or focusing a line or legend row dims other lines to 12% and unserved stations to 22%. Hovering a station lights every line through it. On first load the tracks draw in legend order (1.2s, 110ms stagger, exponential ease-out). Under reduced motion the map is static.

### Legend
A paper panel with a 3px ink border, set into the map. Line rows (roundel, 800 name, Slate kind) double as navigation and dim along with the map. A 1px rule separates the dashed sample key and the NDA line.

### Sample Tag
An inline status mark for stand-in content: 2px dashed border in the current color, 0.75rem, 800, uppercase with 0.06em tracking. It always sits inline inside the sentence that explains the stand-in. It is never a kicker on a heading and is not a general label style.

### Cards / Containers
- **Route:** an unboxed list item under a 3px ink top rule. The whole item is the link target. Hover underlines the title 4px in the line color.
- **Board:** 3px ink frame, ink title bar with roundel, two-column definition rows split by 1px rules.
- **Spec:** two-column fact list under a 3px ink rule, with 1px rule dividers and 0.85rem Slate terms.
- **Terminus:** a full ink block with fluid padding, a display title, Fog on Ink body, and an inverse button.

### Navigation
- **Masthead:** 64px bar with a 3px ink bottom rule. The mark is a 5px-ring ink circle plus the name at 900. Links are 700 with an underline on hover. The small Email button is always present, and the text links hide below 640px.
- **Text link:** 800 weight with a 3px underline in the line color (ink outside a line), turning ink on hover.
- **Next line:** a footer bar on detail pages under a 3px ink rule, with a roundel and the next title.

## Do's and Don'ts

### Do:
- **Do** give every build its own line color, letter roundel, and `--line` scope, and carry that color into every element that belongs to it.
- **Do** use dashed track (paper dash over the line) and the dashed Sample Tag to mark sample or placeholder content, and say so in words beside it.
- **Do** set titles and interactive labels in Overpass at 700–900, and frame panels with 3px ink borders.
- **Do** keep the draw-on-load as the only authored motion. Everything else is a hover or focus state transition with the ease-out curve, and the map is static under reduced motion.
- **Do** dim rather than hide: unfocused lines drop to 12% and unserved stations to 22%.

### Don't:
- **Don't** set text in a line color. Line colors stroke, border, and underline only.
- **Don't** use dashing as decoration on a real line or panel. Dashed means sample.
- **Don't** add shadows, decorative gradients, or rounded corners to chrome. The only gradient is the sample dash, and circles are stations.
- **Don't** attach a kicker or eyebrow label to a heading; only the line roundel may lead a title.
- **Don't** introduce a second typeface or a color outside ink, paper, and the line palette.
