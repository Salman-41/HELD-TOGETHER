# HELD TOGETHER — asset handoff

## Delivered design files

| Asset | Location / status |
| --- | --- |
| Six final compositions | `design/compositions/`: editable static SVG plus native-size PNG for each desktop/mobile state |
| Review package | `design/HELD-TOGETHER-compositions.pdf` (six pages); `design/review-board.svg` / `.png` |
| Narrow-screen proofs | `design/qa/`: all three mobile states at 320 × 844 |
| Original design construction | `design/source/`: Figma authoring scripts and local static-vector exporter; these contain no application implementation |
| Editable Figma file | Six frames and shared components; see `VISUAL_DESIGN.md` for the quota limitation and local refinements |
| Fonts and licenses | `design/fonts/`: Instrument Serif Regular, Inter variable, and each font's SIL Open Font License |

Fonts were downloaded from the [Google Fonts Instrument Serif source](https://github.com/google/fonts/tree/main/ofl/instrumentserif) and [Inter source](https://github.com/google/fonts/tree/main/ofl/inter). Preserve the included license files. PNG/PDF previews render the selected fonts; editable SVGs refer to the supplied fonts. The final web build should create a licensed, locally served WOFF2 subset with only the used weights and characters. No font service subscription is needed.

## Production requirements for a later build

- **Wordmark:** retain editable typography in the design source; create one optimized vector export for stable branding and give it the accessible name “HELD TOGETHER.” Do not outline interface text.
- **Sculpture:** separate original vector layers for the beam, A/B hoists, cables, carriage, load cord, clay weight, and shadow. Keep shared attachment coordinates; do not use screenshots as the interactive scene.
- **Room:** reusable plaster gradient, wall reveal, daylight polygon, floor plane, and two restrained floor joints. No raster photography, noise generator, texture subscription, or model download is required.
- **Technical drawing:** registered beam outline, ghosted pendant, four force arrows, dimension rules, and live DOM labels. Labels and arrow lengths must be generated from the solver; the supplied 2.25 m drawing is one reference state.
- **Controls:** native HTML range/buttons styled as the pictured gallery controls. Small visuals have larger hit areas. Preserve focus, keyboard movement, cancellation, and a plain-text sculpture description.
- **Motion:** author cable paths and coordinated poses from the motion score; verify the illustrative hoist sequence without applying static results to its intermediate frames. Use transform/opacity updates and stop rendering when idle.

No photographic asset, stock artwork, 3D engine, backend, hosting, deployment, paid service, or application scaffold is required by this design.
