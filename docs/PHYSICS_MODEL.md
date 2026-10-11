# HELD TOGETHER — physics model

## Research basis

Only planar rigid-body statics is required: zero resultant force and moment at rest; gravity acts through the center of mass. See [OpenStax: static equilibrium](https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium). A uniform distributed weight can be replaced by its resultant at the midpoint: [Engineering Statics: distributed loads](https://engineeringstatics.org/distributed-loads.html). Cables pull along their length and cannot supply compression: [Engineering Statics: cable assumptions](https://engineeringstatics.org/CH03-1d-particles.html).

The following geometry, parameters, and transition are original design decisions derived from those principles, not a source's proposed installation.

## Assumptions and coordinates

- A straight, rigid, uniform beam has length `L = 3 m` and mass `m_b = 12 kg`; a hanging weight has mass `m_p = 8 kg`. Use `g = 9.81 m/s²`, so beam weight `W = 117.72 N`, point load `P = 78.48 N`, total `Q = 196.20 N`. These are declared virtual design parameters, not measurements or capacity claims.
- Beam self-weight is always included. Cable, hook, and carriage masses are neglected. The movable carriage is locked at rest; its actuated relocation is idealized. Gravity and the load cord act vertically downward.
- Work in the vertical plane: world `X` right, `Y` up, counterclockwise moments positive. Beam coordinate `s` runs from end A (`0`) to end B (`L`). Angle `θ` is measured counterclockwise from horizontal. A beam point is `A + (s cos θ, s sin θ)`.
- In horizontal supported rest, `A = (0, 0)`, `B = (L, 0)`, and `θ = 0`; therefore world `X = s`. Ceiling anchors are `(0, h)` and `(L, h)`, with `h = 1.5 m`.
- Both support cables are massless, inextensible between winch commands, tension-only, and moment-free. Both are vertical in supported rest. No external horizontal loads exist at solved rest. No bending, stress, elastic sag, cable stretch, damping, or dynamic-force results are modeled.

## Horizontal, two-support equilibrium

For upward tensions `T_A` and `T_B` and downward weight at `s`:

```text
ΣF_X = 0
ΣF_Y = T_A + T_B - W - P = 0
ΣM_A = T_B L - W L/2 - P s = 0

T_B = W/2 + P s/L
T_A = W/2 + P (1 - s/L)
```

Accept only finite inputs with `L > 0`, `m_b > 0`, `m_p > 0`, `g > 0`, and `0 ≤ s ≤ L`. Both reactions are at least `W/2` throughout this range, so neither cable goes slack. Reject invalid solver inputs; clamp pointer movement at the UI boundary. Do not conceal negative tensions by taking absolute values or clamping solved reactions. Zero tension would indicate slack and require a different state; the chosen domain avoids it.

## Credible single-support rest

Initially `A = (0, 0)`, `θ = -π/2`, `B = (0, -L)`, and the load is locked at `s = L`, hanging below B. Only cable A is taut. Cable B is already attached but visibly slack and carries no force. Its parked length is `6 m`, longer than the anchor-to-B distance `√(L² + (h + L)²) ≈ 5.408 m`. The loose cable curve is illustrative; no cable-shape calculation is claimed.

`T_A = Q`, `T_B = 0`. All downward force lines pass through A; their moment about A is zero. The beam center of mass is below A. A small angular displacement `δ` from this vertical pose produces `τ_A = -(W L/2 + P L) sin δ`, a restoring torque. This is a stable suspended rest orientation, not an unsupported horizontal span. Never use the two-support formula here.

## Feasible lift; illustrative movement

Cable B's right ceiling winch first takes up slack. The taut cable is diagonal at first: pulling toward `(L, h)` supplies a rightward component and a lifting moment, initiating rotation from the vertical pose. Both ceiling winches then coordinate cable lengths to raise B and let A swing before bringing both ends beneath their anchors at the same height. A is not a fixed pivot during this movement. Both final cable lengths are `h`. Provide clear space beneath A for the beam, hanging weight, and slack cable; none touches the gallery floor.

This is an illustrative powered-hoist sequence, not a solved trajectory or a passive gravitational settling simulation. Show the changing cable directions and take-up; do not rotate about a mysteriously fixed A or claim vertical-only forces during lifting. Freeze load position and suppress force readouts/reaction cues throughout the transition. Caption it “Hoist movement — illustrative.” Only after the horizontal endpoint is reached may the static solver report equilibrium. Reverse the controlled lift for return to rest, with the load first restored to B; pay out B's extra slack only once vertical rest is reached.

## Numerical acceptance examples

| Rest state | Load `s` | `T_A` | `T_B` |
| --- | --- | --- | --- |
| Vertical, A only | `3 m` | `196.20 N` | `0 N` |
| Horizontal, both | `0 m` | `137.34 N` | `58.86 N` |
| Horizontal, both | `1.5 m` | `98.10 N` | `98.10 N` |
| Horizontal, both | `3 m` | `58.86 N` | `137.34 N` |

Solver checks: the sum is `Q`; the moment residual is zero; reflection `s → L-s` swaps reactions; all permitted reactions are positive. Require normalized residuals `|ΣF_Y|/Q ≤ 10⁻⁹` and `|ΣM_A|/(QL) ≤ 10⁻⁹`. Compute before display rounding. Implemented in `src/model/equilibrium.ts`; `npm run test:model` checks the analytic examples, 101 supported positions, invalid inputs, state guards and illustrative-hoist geometry. Reject nonfinite arithmetic/overflow too. These are virtual-model results, not measured engineering performance.
