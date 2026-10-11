# HELD TOGETHER — final visual design

Design phase, 2026-10-11. The six **static compositions** are finalized for handoff; they are not an implemented or animated application.

## Review

- [Six-page composition PDF](../design/HELD-TOGETHER-compositions.pdf) and [overview](../design/review-board.png).
- [Desktop opening](../design/compositions/desktop-opening.png), [supported](../design/compositions/desktop-supported.png), [technical](../design/compositions/desktop-technical.png).
- [Mobile opening](../design/compositions/mobile-opening.png), [supported](../design/compositions/mobile-supported.png), [technical](../design/compositions/mobile-technical.png).
- Each PNG has an editable SVG beside it. Three additional 320 × 844 proofs are in `design/qa/`.
- [Figma file](https://www.figma.com/design/mzUWUyV3Nlf9mkCKuf1mpg): six editable frames, shared wordmark/action components, and palette variables. The Starter tool quota stopped visual review after the supported desktop export. **The reviewed local SVG/PNG/PDF files take precedence**: they include the subsequent opening-control clearance, darker secondary text, and mobile force-label refinements. Figma remains the earlier editable version.

## Architectural composition

A frontal, orthographic view into a plaster gallery. One narrow wall reveal separates the desktop editorial field from the sculpture. A diagonal wash of daylight crosses the wall; the limestone floor begins at y = 824 desktop / 694 mobile. The room stays still. Thin cable lines and modest fittings make the attachment points visible. Empty wall is part of the composition.

The wordmark uses Instrument Serif Regular, two lines offset by 31 px, joined by a 252 × 0.8 px rule. Desktop master: 290 × 120 at (72,52), 54 px type. Mobile: uniform 0.64 scale at (24,28), giving 34.56 px type. Preserve its asymmetry; do not stretch it or animate individual letters. Accessible name: “HELD TOGETHER.”

Instrument Serif also sets interpretive text: desktop 40/43.2, mobile 23–30 px. Inter Regular/Medium sets instructions and controls: 14–15 px; annotations 12–13 px. No text below 12 px. Secondary ink is `#535B52`; use steel `#303A34` for floor-level text. The original five material colors remain unchanged. Checked contrast: steel/plaster 9.06:1, secondary/plaster 5.40:1, clay/paper 4.68:1. Warm metal and reaction light are accents, never small text.

## Six exact compositions

All coordinates are CSS pixels from the top-left. Geometry uses uniform scale within each view; the physics length is always 3 m.

| Composition | Sculpture and camera | Text / interface placement |
| --- | --- | --- |
| Desktop opening · 1440 × 900 | 120 px/m. A (808,302); B (808,662). Anchors (808,122), (1168,122). Vertical beam, load at B, second cable loose. | Editorial field x72–425. Engage at (936,262), with a short leader toward the inactive cable. Explanation at (936,313). Weight caption at (856,737). |
| Desktop supported · 1440 × 900 | 210 px/m. A (592,420); B (1222,420); anchors y105. Load shown at s = 2.25 m, x1064.5. | Object-relative drag instruction beside weight. Position controls start (592,683), width630. Return/rest and explanation occupy opposite floor margins. |
| Desktop technical · 1440 × 900 | Same supported coordinates and load position. Material becomes outline; four applied forces replace the room's visual emphasis. | Reactions above their support points; W below midpoint; P beside load. Dimensions at y620/656. Equations and assumptions stay in the left editorial field. |
| Mobile opening · 390 × 844 | 86 px/m. A (68,312); B (68,570); anchors (68,183), (326,183). Weight clears floor. | Single-line interpretive title at (24,133). Status sits inside the open cable curve. Engage at (24,714); explanation at (24,779). |
| Mobile supported · 390 × 844 | 94 px/m. A (54,352); B (336,352); anchors y211. Load x265.5. | Drag cue at (220,461). Short interpretive line y504. Position controls x24, y567, width342; move-left/right y652. Floor actions y779. |
| Mobile technical · 390 × 844 | Same supported endpoints. All four arrows remain legible; P/W are explicitly named. | Title y142; upward labels y240/266; downward labels y396–454. Dimension rules y472/506; equations y565/594; assumptions y654. Close returns to the sculpture. |

The supported images show a visitor **after moving the weight**. Immediately after engagement, the weight remains at s = 3 m. At the pictured 2.25 m position, A = 78.48 N, B = 117.72 N, W = 117.72 N, P = 78.48 N. These follow `PHYSICS_MODEL.md`; the gallery does not expose invented metrics.

## Material and diagram grammar

Beam silhouette depth: 0.08 m. Thin directional strokes and a narrow reflected highlight describe brushed steel; avoid mirror chrome. The chamfered clay pendant has a 0.32 × 0.44 m front silhouette, hung on a 0.35 m cord. These are visual proportions, not manufacturing specifications. The model masses remain explicit virtual parameters. Shadows are restrained authored lighting cues, not a lighting simulation.

In the force view, keep the beam and load registration unchanged. Arrows begin at the actual force-application points: A, B, midpoint, load carriage. Arrow length uses 0.95 px/N desktop and 0.65 px/N mobile within the respective drawing. Point load is clay; other forces are steel. Dimensions are muted, unarrowed construction lines. Ghosted cable/pendant outlines preserve recognition. A/B in the artwork abbreviate `T_A`/`T_B` in the physics document.

As the load approaches another annotation, stagger labels and use short leaders; never displace application points. At exactly the midpoint, combine the coincident downward arrows as `W + P = 196.20 N`, retaining the separate W/P values in the explanation.

## Responsive and accessible behavior

Below 960 px, use the mobile composition instead of shrinking the desktop editorial field. Between 960–1439 px, fit the sculpture uniformly into the right field, keep 48 px outer gutters and at least 300 px of editorial width; move the position controls below the scene if they cannot clear it. Above 1440 px, expand empty wall, not typography.

From 390 to 320 px, keep 24 px text gutters and type sizes. Supported span = viewport width − 108 px; A stays x54. Opening span = viewport width − 132 px; A interpolates x56→68. Keep the beam's y-origin and the floor rail fixed. At 320 px, wrap the opening status into short lines, move the current position below its label, and place the point-load annotation at x231. The three 320 px proofs demonstrate these decisions. Shorter screens and enlarged text scroll normally; never crop or reduce text to preserve a single viewport.

Use real buttons/range semantics later. Every interactive hit area is at least 44 × 44 px, including the small weight and range thumb. Underline text actions; show a 2 px steel focus outline with 4 px offset. Hover adds a short rule emphasis, not motion. Dragging adds an outline to the weight; a limit stops movement without bounce. Disabled transitions keep readable text and explain “Lifting the span…”; no opacity-only disabled indication. Keyboard, touch alternatives, announcements, and cancellation follow `INTERACTION_STATES.md`.

## Motion score

| Event | Purpose and timing |
| --- | --- |
| Engage | 0–240 ms: visibly take up B's slack. 240–1280 ms: coordinated powered lift, with A free to swing and both cable directions changing. 1280–1600 ms: settle into the horizontal pose and uniformly fit the supported camera. Never independently scale beam length. Display “Hoist movement — illustrative”; hide forces until complete. |
| Move weight | Direct pointer/keyboard response, no positional easing or lag. The beam remains horizontal. Recompute static reactions at the current position. No decorative sway. |
| Reveal forces | 280 ms total. Fade wall/shadows during 0–120 ms; crossfade beam material to its registered outline during 60–220 ms; fade complete arrows/labels during 160–280 ms. Do not animate force magnitudes or move application points. |
| Return to sculpture | Reverse the 280 ms visual disclosure without changing s or support state. |
| Return to rest | Restore weight to B while supported, then reverse the controlled hoist; add slack only at vertical rest. Movement remains illustrative. |
| Reduced motion | Immediate valid endpoint and concise status announcement. No hidden timed wait. |

This is a prescribed motion score, not a tested animation. The hoist's intermediate path still needs implementation verification against visible cable connections and floor clearance.

## Reference review

- [Frei Otto — ZKM, Thinking by Modeling](https://zkm.de/en/exhibition/2016/11/frei-otto-thinking-by-modeling): take experimental legibility and the model as evidence. Our beam is rigid-body equilibrium, not a soap-film/minimal-surface simulation.
- [Unseen Studio](https://unseen.co/) and its [documented 2023 environment](https://www.awwwards.com/unseen-studio-by-unseen-studio-wins-sotm-february-2023.html): take a coherent room, controlled light, and spatial presence. No borrowed arches, water, sphere, camera journey, or layout.
- [35mm](https://lab.chakibmzn.com/35mm/) and the [creator's process account](https://tympanus.net/codrops/2025/05/30/deconstructing-the-35mm-website-a-look-at-the-process-and-technical-details/): take continuity between a material object and its explanatory drawing. Our original beam outlines require no copied camera model or shader treatment.
- [Antony Gormley, Body Politic — artist installation photographs](https://www.antonygormley.com/works/exhibitions/body-politic) and [White Cube exhibition](https://www.whitecube.com/gallery-exhibitions/antony-gormley-body-politic): take patient framing, real scale, generous wall space, and the room's relationship to an object. Photographs are references only; none appear in the deliverables.
