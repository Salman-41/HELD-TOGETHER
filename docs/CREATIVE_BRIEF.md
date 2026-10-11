# HELD TOGETHER — structural theatre

The visitor enters a quiet architectural space and completes a suspended sculpture. An upright steel beam becomes a span; moving a single terracotta weight changes how its two cables share the burden. The experience is intimate, deliberate, and materially specific.

## Space and material

One continuous gallery composition, with the sculpture occupying the largest field. An asymmetric wall plane, a limestone floor reveal, a narrow daylight aperture, and generous empty space establish architecture without decorative page sections. Keep the title modest and editorial, offset from the sculpture; place instructions close to the object they operate.

Author the geometry, surface marks, and shadows directly in SVG/CSS. Plaster has subtle tonal variation; limestone has restrained seams; brushed steel has directional grain and a few controlled highlights. Thin cables remain readable. The clay weight is the only saturated object. Show the ceiling hoist and attachment hardware sufficiently to explain the lift. No stock renders, generated artwork, logos, or borrowed signature compositions.

| Token | Color | Role |
| --- | --- | --- |
| Gallery plaster | `#E7E1D5` | Main architectural field |
| Oxidized steel | `#303A34` | Beam, primary text, cable definition |
| Weight clay | `#A8503C` | Hanging weight and its active affordance |
| Warm metal | `#B6A98E` | Hoist and secondary material accents |
| Reaction light | `#BDD3BE` | Small calculated support accents |

Use steel text on plaster. Accent colors are materials, not assumed accessible text colors; verify actual text and control contrast during implementation. State, focus, and reactions must remain understandable without color.

## Typography and language

Instrument Serif Regular sets the offset, two-line wordmark and short interpretive text; Inter Regular/Medium sets interaction and model details. Fonts and licenses are supplied in `design/fonts/`; exact sizing is in `VISUAL_DESIGN.md`. Avoid oversized slogans, spaced-out microtype, and gratuitous numerical labels. Use concrete copy: “Engage second support,” “Move the weight,” “Return to rest,” and “How it is held.”

## Light, movement, and information

Daylight and cast shadows describe volume; do not orbit a camera or drift the room. A purposeful hoist lift takes about 1.6 seconds, subject to later visual review. Weight movement follows input directly. No perpetual sway, scroll hijacking, particles, bloom, or elastic bounce. Reduced motion uses immediate endpoint changes with the same explanatory status.

In supported rest, a small support accent may encode `r = T / (W + P)` using opacity `0.15 + 0.45r`. This is an illustrative reaction cue, not predicted illumination; cable thickness and beam geometry stay fixed. Explain the cue in “How it is held.” Numeric reactions, if shown there, come from the solver with units and disclosed virtual parameters. The art remains the main encounter; the model explanation is optional and accessible.

On mobile, recompose the same sculpture and controls vertically without cropping the weight, cable endpoints, or focus indicators. Use restrained 2D rendering and stop animation work when idle or offscreen.
