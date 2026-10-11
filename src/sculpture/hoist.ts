/** Original, explicitly illustrative powered-hoist choreography; NOT a dynamics solver. */
export type Pose = { ax: number; ay: number; angle: number; slack: number; fit: number };
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
export function hoistPose(progress: number): Pose {
  const p = clamp(progress);
  const rotation = smooth(clamp((p - 0.15) / 0.65));
  const swing = rotation === 0 || rotation === 1 ? 0 : Math.sin(Math.PI * rotation);
  return {
    ax: 0.22 * swing,
    ay: -0.14 * swing,
    angle: (1 - rotation) * Math.PI / 2,
    slack: 1 - clamp(p / 0.15),
    fit: smooth(clamp((p - 0.8) / 0.2)),
  };
}
export function beamPoint(pose: Pose, position: number) {
  return { x: pose.ax + position * Math.cos(pose.angle), y: pose.ay + position * Math.sin(pose.angle) };
}
