# HELD TOGETHER — interaction states

One sculpture and one state machine. Keep physical rest, direct manipulation, and illustrative hoist movement distinct.

| State | Sculpture and information | Allowed action / next state |
| --- | --- | --- |
| `single-rest` (initial) | Vertical beam; A taut; B attached but slack; load locked at B. “Held by one support.” Single-support rest values only. | Activate “Engage second support” → `engaging`. |
| `engaging` | Show B taking up slack and lifting; A can swing. “Hoist movement — illustrative.” Hide forces and reaction cues. | Complete horizontal endpoint → `supported-rest`. Load and further transition commands are unavailable. |
| `supported-rest` | Horizontal beam; both vertical cables taut. Solve current `s`; “Held by two supports.” | Move weight → `moving-load`; “Return to rest” → `returning`. |
| `moving-load` | Horizontal beam; weight follows its locked-to-rail carriage. Static reactions describe an ideal quasi-static position, not inertial forces from dragging. | Release/blur/finish keyboard change → `supported-rest`; cancel restores the position before the gesture. |
| `returning` | First visibly move the weight to B, then lower the span by coordinated hoist, then pay out B's extra slack. Hide solved readouts during the entire sequence. | Complete vertical endpoint → `single-rest`; restore initial `s = L`. |

The whole return is illustrative, including carriage relocation. Do not slacken a supporting cable while the beam remains horizontal. No free fall, autoplay, or unrequested support release.

## Activate and move

Place a real HTML “Engage second support” button beside the dormant cable, with a restrained visible hit area. A click or tap initiates the complete lift; a native button also works with Enter/Space. Once supported, expose a clearly indicated handle on the terracotta weight and a labeled native range input, “Weight position along beam.”

Drag the weight or its carriage horizontally: project the pointer onto the rendered A→B segment and map to `s = L × clamp(u, 0, 1)`. Use pointer capture; the weight's cord stays vertical. Preserve the initial pointer-to-handle offset to prevent a jump. Track `s` as model data, not pixels; resizing must not alter it. Recalculate reactions immediately with no artificial lag. Pointer release commits; Escape or pointer cancellation restores the gesture's starting position and clears capture. Apply touch-action restrictions only to the drag handle; normal page scrolling remains available elsewhere.

## Equivalent access

- Tab order: engage/return button → weight range → move-left/right alternatives → “How it is held” disclosure, skipping disabled load controls. Keep focus on the initiating button through transitions; use guarded `aria-disabled` there to preserve focus. Show a clear focus indicator.
- Range: min `0`, max `3 m`, step `0.03 m`; Left/Down decrease, Right/Up increase, Home/End select endpoints, Page Up/Down change `0.30 m`. Expose the current position in meters through accessible value text. Pointer input may remain continuous; keys use the specified increments.
- Touch: at least 44 × 44 CSS-pixel button and handle hit areas; native range plus labeled “Move left” / “Move right” buttons gives a drag-free alternative with the same `0.03 m` increments. Disable every load control until supported.
- A textual sculpture description states orientation, active supports, and weight position. “How it is held” exposes assumptions, model units, and computed reactions using DOM text, independent of SVG perception.
- Announce completed support changes and committed weight position/reactions through a polite live region; do not announce every pointer frame. Disabled controls must have an associated explanation. Never encode support state using color alone.
- With reduced motion, skip transition frames and go directly to the valid endpoint, announcing “Second support engaged; beam horizontal” or “Returned to single-support vertical rest.” Do not delay input for an invisible animation.

## Consistency and interruption

“How it is held” changes a separate view mode (`sculpture` / `forces`), never the physical state or load position. It is available at rest and unavailable during hoist transitions. The force view is read-only; closing it restores the prior view and focus. At initial single-support rest it must explain that vertical pose with `T_A = 196.20 N`, `T_B = 0`, and collinear gravity forces; never substitute the pictured two-support drawing. The six visual compositions show the supported force view at `s = 2.25 m`. See `VISUAL_DESIGN.md` for its disclosure transition.

Transition commands are guarded against duplicate activation; load movement and reset cannot overlap. A load gesture must finish before return begins. Focus is never trapped. If interrupted by page hiding or resize, complete to the requested valid endpoint and recompute there; do not leave an intermediate pose labeled as equilibrium. Invalid model data produces an accessible “Position unavailable” message, hides reaction output, and offers return to initial rest rather than inventing a result.

## Implemented handoff

The pure reducer in `src/interaction/state.ts` also guards an `unavailable` recovery state. Reset follows the same safe return as “Return to rest”; from invalid data it restores the declared initial pose. The SVG handle preserves pointer offset and capture; the native range and move buttons provide equivalent control. Native range pointer input uses 0.03 m steps; handle dragging is continuous. Gestures commit on release, blur or key-up and cancel on Escape/pointer cancellation. Resize/hiding finishes a requested hoist endpoint; an interrupted gesture restores its starting position.

The force view stays inside `/` without changing model data. The separate `/how-it-is-held` route explains the initial vertical rest for direct navigation and no-JavaScript access. At the midpoint, W/P share one correctly scaled combined arrow; the explanation retains each separate force. All allowed supported positions keep both cables in tension. Out-of-domain data is rejected rather than represented as a false equilibrium.
