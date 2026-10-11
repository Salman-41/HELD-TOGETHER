# HELD TOGETHER — status

Updated: 2026-10-11 (Asia/Karachi). Phase: working structural interaction complete; stopped as requested.

## Completed

- Read the approved physics contract, interaction states, compositions, current code and previous handoff. Preserved the original gallery, typography, materials and mobile/320 px adaptations. No new dependencies.
- Implemented pure statics in `src/model/equilibrium.ts`, including beam self-weight, valid finite parameters, position bounds and numerical residual checks. Horizontal reactions follow the approved equations. Vertical rest has A = total weight, B = 0; the load is locked at B.
- Added a guarded reducer and scoped interaction controller. Visitors can engage/remove support B, drag or slide the weight, use move buttons, inspect calculated reactions, reset, and open a registered current-state force view without changing the experiment.
- Implemented pointer capture and offset preservation; touch input; native slider; arrow/Home/End/Page keys; gesture commit/cancellation; live committed-state announcements; readable numerical assumptions; stable focus; minimum 44 px targets and reduced-motion endpoints.
- Authored the explicitly illustrative 1.6 s powered hoist: slack take-up, moving A with changing cable directions, then uniform view fitting. Return/reset first moves the load to B, reverses the lift, and introduces slack only at vertical rest. Static results and reaction cues are hidden throughout movement. Resize, page hiding and reduced-motion changes finish the requested valid endpoint.
- Shared beam points synchronize material, carriage, cord, handle, forces and DOM labels. At the midpoint W/P use one combined arrow; separate force values remain accessible. Invalid/unstable data hides results and offers reset; permitted supported positions are all in tension.
- Preserved a server-rendered vertical opening and native initial-rest explanation without JavaScript. Updated README and contract handoffs.

## Targeted verification

- `npm run test:model`: six focused tests passed. Coverage: declared endpoint/midpoint values; self-weight; force/moment residuals and reflection across 101 positions; finite-input/overflow rejection; UI bounds; guarded states/cancellation; fixed beam length, moving A and floor clearance across sampled illustrative poses at desktop/mobile/320 sizes.
- `npm run typecheck`: passed.
- Focused localhost browser check passed: animated lift with hidden intermediate forces; offset-preserving drag and Escape cancellation; exact pictured reactions; keyboard increments/endpoints; move-button alternative; reset; resize interruption; touch drag; reduced-motion support removal; force-view position preservation; midpoint combination; single-rest explanation; 320 px bounds; no-JavaScript fallback. No browser errors.
- Runtime previews are in [design/implementation](../design/implementation/README.md). Corrected scene overflow from the larger supported SVG frame and kept fittings at the approved modest screen scale.

No comprehensive QA, production build, Lighthouse, hosting, deployment, paid services, dynamic-force simulation, or capacity analysis was performed. The hoist is choreography, not an engineering trajectory; the displayed reactions describe the simplified virtual rest model and ideal quasi-static weight movement.

## Handoff

Run `npm ci`, then `npm run dev`. Use `npm run test:model` and `npm run typecheck` for the targeted checks. Model, guarded state and illustrative pose modules remain separate from rendering. Approved static compositions in `design/compositions/` are unchanged.

Next action now: none. Stop here.
