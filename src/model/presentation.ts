import { MODEL } from "./equilibrium";

/** Visual proportions and the approved initial pose. Solver lives in equilibrium.ts. */
export const OPENING = Object.freeze({
  phase: "single-rest" as const,
  beamLength: MODEL.length,
  beamDepth: 0.08,
  anchorHeight: 1.5,
  angle: -Math.PI / 2,
  loadPosition: MODEL.length,
  loadCord: 0.35,
  loadWidth: 0.32,
  loadHeight: 0.44,
  parkedCableLength: 6,
  supportA: "taut" as const,
  supportB: "slack" as const,
});

export const OPENING_DESCRIPTION =
  "A steel beam hangs vertically from its upper end on one taut cable. A terracotta weight is locked at its lower end. The attached second cable curves loosely from the right ceiling anchor and carries no load. The weight hangs clear of the floor.";
