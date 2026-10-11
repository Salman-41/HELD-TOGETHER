# HELD TOGETHER — status

Updated: 2026-10-11 (Asia/Karachi). Phase: application foundation and architectural opening complete; stopped as requested.

## Completed

- Read the rules, creative brief, six approved compositions, asset handoff, physics and interaction specifications. The reviewed local SVG/PNG/PDF designs remain authoritative over the earlier Figma version.
- Created a minimal App Router foundation with pinned Next.js 16.4.0, React 19.3.0, TypeScript 5.9.3, Tailwind CSS 4.3.3 and GSAP 3.15.0; lockfile and local scripts. No Three.js or backend.
- Built the approved desktop/mobile opening with the offset wordmark, plaster wall reveal, diagonal daylight, limestone floor/joints, original steel/cable/clay SVG layers and restrained wall shadow. Added 320 px adaptation and normal scrolling on shorter viewports.
- Supplied licensed local WOFF2 subsets (about 47 KB combined), OFL files, design tokens, reusable components, exhibition navigation, metadata and a return route for missing pages.
- Declared `single-rest` in `src/model/presentation.ts`: vertical beam, A taut, B visibly slack, load locked at B. “Engage second support” is focusable with `aria-disabled` and the visible note “Still study · activation forthcoming.” There is no simulated activation or load movement.
- Added `/how-it-is-held`, explaining the current vertical rest with declared reference values and beam self-weight. Its native assumptions disclosure works without JavaScript. GSAP loads on disclosure only, for a 200 ms fade; reduced motion skips it. No idle animation loop.

## Verification and limits

`npm run typecheck` passed. Brief localhost browser smoke passed at 1440 × 900, 390 × 844 and 320 × 844: HTTP 200, local fonts loaded, no horizontal overflow, correct rest declaration, unavailable activation, and no browser errors. Visually reviewed the three opening screenshots against the approved references. Explanation navigation and the no-JavaScript native disclosure passed. Corrected an initial local-font path error before the passing check.

Actual runtime screenshots and smoke evidence are in [design/implementation](../design/implementation/README.md). The opening uses HTML/SVG server output as its readable fallback. Review was limited to TypeScript and this brief smoke: no production build, comprehensive accessibility/interaction QA, Lighthouse, hosting, deployment, paid services, or capacity analysis.

## Handoff

Run `npm ci`, then `npm run dev`; open `http://127.0.0.1:3000`. [README](../README.md) records the routes and component boundaries. Approved design artifacts remain unchanged in `design/compositions/`.

The next authorized stage must implement the pure equilibrium solver and complete accessible support/load state machine. Verify the coordinated illustrative lift, A's movement, cable attachments and floor clearance; hide equilibrium readouts during motion. Preserve the valid vertical rest, self-weight, keyboard/touch alternatives and reduced-motion endpoints. The current explanation's numbers are disclosed reference values, not live solver results.

Next action now: none. Stop here.
