# Mobile and foldable layout audit

Audited 2026-10-23. Scope: home, Notifly, homelab, all three sample case studies, and the 404 page. Preserves the transit-map identity and existing content. The implementation changes are shared CSS and the root layout; no dependencies or device-specific components were added.

## Verdict

Implementation integrity: **pass**. Line roundels, diagram geometry, square signage, theme tokens, and sample disclosures remain coherent. Responsive layout now measures usable content width, including the first pane of a horizontally segmented display.

| Dimension | Before | After | Evidence / limit |
| --- | --- | --- | --- |
| Accessibility | 3/4 | 3/4 | Keyboard map panning, named theme controls, visible navigation, and 44px standalone targets checked; no screen-reader audit. |
| Performance | 3/4 | 3/4 | No new runtime or dependency; native scrolling and existing animation cleanup retained. No performance trace. |
| Responsive design | 2/4 | 3/4 | 105 route/viewport checks, enlarged text, touch gestures, and segmented-screen emulation; physical devices pending. |
| Theming | 4/4 | 4/4 | Existing light/dark tokens preserved; theme switching exercised. |
| Implementation integrity | 3/4 | 4/4 | Reused shared components; updated DESIGN.md and its sidecar. |
| **Total** | **15/20** | **17/20** | **Good**, with hardware and cross-browser checks remaining. |

These scores describe this scoped inspection, not a WCAG certification or measured performance benchmark.

## Findings and resolution

No P0 findings. One P1 and four P2 findings addressed:

- **P1 — narrow header overflow.** The root masthead exceeded a 280px cover screen by 31px on every route. A wrapping masthead and separate action group keep its controls in the page. Category: responsive. Resolved with harden/adapt.
- **P2 — project links disappeared on mobile.** The shared navigation hid its links at 640px, forcing detail-page visitors back through home. Links now occupy a visible second row at compact widths. Category: navigation/accessibility. Resolved with adapt.
- **P2 — tiny mobile legend.** Desktop container-scaled text reached its 12px floor on phones. The standalone legend now uses a 16px name size, stretches across its container, and uses two columns at intermediate widths. Category: responsive/typography. Resolved with polish.
- **P2 — short-window map miniaturization.** Viewport-height sizing reduced labels and constrained the legend in landscape windows. The desktop frame has a width floor capped by available space, allowing document scrolling. Category: responsive. Resolved with harden.
- **P2 — small standalone link targets.** Back, feature, footer, and next-line links lacked 44px minimum height. Shared styles now provide it; inline prose links retain text flow. This is the project touch-target standard, not a claim that every prior inline link violated WCAG. Category: accessibility. Resolved with polish.

Systemic cause: width rules assumed the full device viewport and navigation assumed a fixed-height header. Container queries, wrapping, and existing shared components address these across routes. Diagram panning remains native browser scrolling; no custom gesture handlers were introduced.

## Verification

- `npm run typecheck`, production build/static export, postbuild processing, and `git diff --check` passed. Next.js emitted the existing notice about an unrelated parent-directory lockfile.
- Chromium through Playwright: all seven routes at widths 280, 320, 344, 375, 540, 653, 720, 768, 820, 860, 882, 1099, 1100, 1280, and 1440px. Includes 1100×540 landscape. No document overflow, clipped content, or undersized tested navigation targets; no page JavaScript exceptions.
- Root font size doubled at 375px on every route; long unbroken homepage title injected temporarily. No horizontal document overflow.
- Keyboard arrow panning, project navigation, theme switching, train pause/resume, and reduced-motion control visibility passed. Synthesized Chromium touch input panned the map horizontally and scrolled the document vertically across it.
- A 1114px display with two 540px segments and a 34px hinge reported the segment media feature; body width became 540px and navigation remained inside that pane. This verifies CSS segment adaptation, not physical hinge behavior. Unsupported browsers retain the normal responsive layout. See [Chrome's Viewport Segments documentation](https://developer.chrome.com/blog/viewport-segments-api-shipped).
- The desktop NDA text remains inside a 1280×720 viewport with the train control visible. Photos loaded and retained their mobile aspect ratios and captions.
- Impeccable detector: its `transition: width` warning matches the existing SVG `stroke-width` transition, not layout width. The new mobile legend size was an intentional addition and is recorded in DESIGN.md. No extra detector pass was run.

Preserved strengths: labeled sample work, light/dark tokens, reduced motion, offscreen train pausing, native scroll behavior, and reusable transit primitives.

## Remaining checks

Physical iPhone/Android/foldable devices, Safari and Firefox, real safe-area insets, vertical hardware hinges, screen-reader behavior, and performance profiling were not tested. Horizontal dual-segment displays intentionally use one reading pane; this pass does not introduce a two-pane experience. Existing sample content and placeholder contact details remain as documented in PRODUCT.md.

For a later device pass, run `$impeccable audit` on hardware, address any observed issues with `$impeccable adapt` or `$impeccable harden`, then finish with `$impeccable polish`.
