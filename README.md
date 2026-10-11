# HELD TOGETHER

An original architectural sculpture installation. The current application is a still study of its physically credible vertical, single-support opening. Activation and weight movement are reserved for the next stage.

## Local use

Node 20.9 or newer. Run `npm ci`, then `npm run dev`. Open `http://127.0.0.1:3000`. Run `npm run typecheck` for TypeScript validation.

- `/`: responsive architectural opening, explicitly unavailable engagement control, native explanation link.
- `/how-it-is-held`: readable explanation of the current vertical pose; native assumptions disclosure.
- Unknown routes: quiet return to the sculpture.

## Foundation

Pinned Next.js 16.4.0 / React 19.3.0 / TypeScript 5.9.3 / Tailwind 4.3.3 / GSAP 3.15.0; exact versions are locked in `package-lock.json`. The opening is server-rendered SVG and HTML. GSAP loads only when the optional assumptions disclosure opens, for a 200 ms opacity reveal; reduced motion skips it. There is no frame loop, WebGL, external font request, or backend.

`src/model/presentation.ts` declares the fixed rest pose; it is **not a solver**. `src/sculpture/` renders original geometry in model proportions; `src/components/` composes the room, wordmark, navigation and controls. `src/app/globals.css` owns shared tokens and responsive placement. Font subsets and OFL licenses live in `src/assets/fonts/`; optional regeneration uses `scripts/subset-fonts.py` with temporary FontTools/Brotli tooling, not application dependencies.

Read [project rules](docs/PROJECT_RULES.md), [approved visual design](docs/VISUAL_DESIGN.md), [physics](docs/PHYSICS_MODEL.md) and [status](docs/STATUS.md) before continuing. Static design references stay in `design/compositions/`; local runtime screenshots stay in `design/implementation/`.
