/** Planar rigid-body statics only. No rendering, animation, or browser APIs. */
export type Parameters = Readonly<{ length: number; beamMass: number; loadMass: number; gravity: number }>;
export const MODEL: Parameters = Object.freeze({ length: 3, beamMass: 12, loadMass: 8, gravity: 9.81 });
export type Forces = Readonly<{ a: number; b: number; beam: number; load: number; total: number; forceResidual: number; momentResidual: number }>;
export type Solution = { ok: true; forces: Forces } | { ok: false; reason: "invalid-input" | "unstable"; message: string };

function weights(parameters: Parameters): { beam: number; load: number; total: number } | null {
  if (!Object.values(parameters).every(value => Number.isFinite(value) && value > 0)) return null;
  const beam = parameters.beamMass * parameters.gravity;
  const load = parameters.loadMass * parameters.gravity;
  const total = beam + load;
  return [beam, load, total].every(value => Number.isFinite(value) && value > 0) ? { beam, load, total } : null;
}

const invalid = (message: string): Solution => ({ ok: false, reason: "invalid-input", message });

export function solveSupported(position: number, parameters: Parameters = MODEL): Solution {
  const w = weights(parameters);
  if (!w || !Number.isFinite(position) || position < 0 || position > parameters.length) {
    return invalid("Use finite positive model parameters and a weight position within the beam.");
  }
  const fraction = position / parameters.length;
  const b = w.beam / 2 + w.load * fraction;
  const a = w.beam / 2 + w.load * (1 - fraction);
  if (a <= 0 || b <= 0) return { ok: false, reason: "unstable", message: "A cable would be slack or require compression. This pose is unavailable." };
  const forceResidual = a + b - w.total;
  const momentResidual = b * parameters.length - w.beam * (parameters.length / 2) - w.load * position;
  if (![a, b, forceResidual, momentResidual, w.total * parameters.length].every(Number.isFinite)
      || w.total * parameters.length <= 0
      || Math.abs(forceResidual) / w.total > 1e-9
      || Math.abs(momentResidual) / (w.total * parameters.length) > 1e-9) {
    return invalid("The model cannot produce reliable finite reactions for these parameters.");
  }
  return { ok: true, forces: { ...w, a, b, forceResidual, momentResidual } };
}

/** Only the approved vertical single-support pose with the load locked at B. */
export function solveSingleRest(position = MODEL.length, parameters: Parameters = MODEL): Solution {
  const w = weights(parameters);
  if (!w || !Number.isFinite(position)) return invalid("The vertical rest parameters are unavailable.");
  if (position !== parameters.length) return { ok: false, reason: "unstable", message: "Return the weight to B before entering the single-support rest pose." };
  return { ok: true, forces: { ...w, a: w.total, b: 0, forceResidual: 0, momentResidual: 0 } };
}

/** UI boundary only: never clamp a calculated reaction. */
export function boundedPosition(position: number, length = MODEL.length): number {
  if (!Number.isFinite(position) || !Number.isFinite(length) || length <= 0) return NaN;
  return Math.max(0, Math.min(length, position));
}

export function forceText(value: number): string { return `${value.toFixed(2)} N`; }
