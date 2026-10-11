# HELD TOGETHER

An original architectural sculpture installation. Engage a second support, move the clay weight, inspect the calculated forces, and return the work to a credible vertical rest.

## Local use

Node 20.9 or newer. Run `npm ci`, then `npm run dev`. Open `http://127.0.0.1:3000`. Targeted checks: `npm run typecheck` and `npm run test:model` (six focused tests; no test framework dependency).

- `/`: complete support/load interaction with a current-state force view, preserving the load position and focus when closed.
- `/how-it-is-held`: server-rendered explanation of the initial vertical pose; native assumptions disclosure and no-JavaScript fallback.
- Unknown routes: quiet return to the sculpture.

## Foundation

Pinned Next.js 16.4.0 / React 19.3.0 / TypeScript 5.9.3 / Tailwind 4.3.3 / GSAP 3.15.0; exact versions are locked in `package-lock.json`. The opening is server-rendered SVG and HTML. GSAP loads for requested hoist movement or the optional assumptions disclosure. There is no idle frame loop, WebGL, external font request, backend or new application dependency.

`src/model/equilibrium.ts` is the pure validated static model. `src/interaction/state.ts` guards transitions; `useExperiment.ts` owns requested motion and interruption cleanup. `src/sculpture/hoist.ts` prescribes an **illustrative powered lift**, not a dynamics simulation. Shared beam points drive the material geometry, handle, applied forces and labels. `src/app/globals.css` owns tokens and responsive placement. Font subsets and OFL licenses remain in `src/assets/fonts/`.

Drag the weight, use the native slider, or choose Move left/right. Arrow keys step 0.03 m, Page Up/Down step 0.30 m, and Home/End select the beam ends. Escape cancels an unfinished gesture or closes the force view. Return to rest and Reset first restore the weight to B, then lower the beam before introducing slack. Static reactions are hidden throughout the illustrative transition; reduced motion goes immediately to the valid endpoint. Invalid data hides forces and offers reset. Without JavaScript, the credible opening and native explanation remain readable.

Read [project rules](docs/PROJECT_RULES.md), [approved visual design](docs/VISUAL_DESIGN.md), [physics](docs/PHYSICS_MODEL.md) and [status](docs/STATUS.md) before continuing. Static design references stay in `design/compositions/`; local runtime screenshots stay in `design/implementation/`.
