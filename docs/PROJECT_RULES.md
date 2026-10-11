# HELD TOGETHER — project rules

An original interactive architectural art installation: a suspended beam, one clay weight, and the act of sharing support. Aim for the craft of an exceptional contemporary sculpture gallery.

## Current scope

The fourth task authorizes the working structural interaction: add/remove support, bounded weight movement, correct calculated reactions, reset and current-state force explanation. Preserve the gallery and the physics contract. The powered hoist is explicitly illustrative; solve only valid rest configurations (including quasi-static weight positions). Use the existing stack and local assets. Run a few focused mathematical tests, targeted control checks and TypeScript only; no comprehensive QA, hosting, deployment, paid services, or provisioning. Update `STATUS.md` and stop.

## Non-negotiable constraints

- No generic AI layouts, arbitrary 01/02/03 webpage sections, standard SaaS components, meaningless labels, or fake numbers.
- No copied Awwwards designs, AI-generated stock artwork, purposeless animation, or exaggerated GPU-heavy visuals.
- No fabricated engineering results. Include beam self-weight in every solved rest state; never apply horizontal-beam equations to the lift animation.
- Never show an off-center horizontal beam resting on a single moment-free cable. Never quietly add a hidden support, clamp, or balancing torque.
- Keyboard, touch, screen-reader access, and reduced motion are part of the experience, not later additions.
- Every visible detail must serve material, space, physical understanding, or interaction. Preserve breathing room and legible controls on small screens.

## Document authority

`CREATIVE_BRIEF.md` defines visual identity; `PHYSICS_MODEL.md` defines physical truth; `INTERACTION_STATES.md` defines behavior. `VISUAL_DESIGN.md` and the reviewed local compositions finalize visual decisions; `ASSET_REQUIREMENTS.md` defines asset handoff. `STATUS.md` records completion and the next permitted handoff. Resolve contradictions before implementation.

## Practical structure

The reviewed compositions remain in `design/`; application screenshots are separate in `design/implementation/`. Scripts under `design/source/` author design files only. Application structure:

```text
src/
  app/            # App Router routes, layout, tokens and composition CSS
  assets/fonts/   # licensed local WOFF2 subsets and OFL files
  components/     # room, branding, native controls and navigation
  model/          # pure equilibrium solver, parameters and visual proportions
  interaction/    # pure guarded state reducer and scoped motion/input controller
  sculpture/      # original SVG geometry and material layers
scripts/          # optional font asset tooling
tests/            # six focused model/state/hoist tests; no test framework dependency
```

The user's Next.js instruction supersedes the earlier Vite suggestion. No backend or Three.js is needed for these approved orthographic visuals. Keep future solved data independent of rendering and animation. Add dependencies only for a demonstrated need.
