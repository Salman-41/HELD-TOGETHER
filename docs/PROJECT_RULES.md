# HELD TOGETHER — project rules

An original interactive architectural art installation: a suspended beam, one clay weight, and the act of sharing support. Aim for the craft of an exceptional contemporary sculpture gallery.

## Current scope

Visual design and documentation only, as authorized in the second task. Produce reviewable static compositions, concise design specifications, and asset requirements. Do not build the application, install dependencies, provision services, host, deploy, or spend money. Update `STATUS.md` and stop. A future implementation requires a new instruction.

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

The current project contains `docs/` and static review artifacts in `design/`. Scripts under `design/source/` author design files only. Proposed future application structure:

```text
src/
  model/          # constants, pure equilibrium solver, validation
  interaction/    # state machine, pointer and keyboard adapters
  sculpture/      # original SVG geometry, material and hoist rendering
  accessibility/  # native controls, descriptions, announcements
  styles/         # palette, typography, responsive composition, motion
public/           # licensed local fonts and original authored assets
tests/            # equilibrium invariants and complete interaction flows
```

Start a future build with Vite, TypeScript, SVG/CSS, and native HTML controls; no backend is needed. Keep solved data independent of rendering and animation. Add a renderer or library only for a demonstrated need. No scaffold or runtime is created in this phase.
