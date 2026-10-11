import { boundedPosition, MODEL } from "../model/equilibrium";

export type Phase = "single-rest" | "engaging" | "supported-rest" | "moving-load" | "returning" | "unavailable";
export type Experiment = Readonly<{ phase: Phase; position: number; gestureStart: number | null }>;
export type Action =
  | { type: "engage" | "return" | "reset" | "complete" | "begin" | "commit" | "cancel" | "invalid" }
  | { type: "position"; value: number }
  | { type: "step"; delta: number };
export const INITIAL: Experiment = Object.freeze({ phase: "single-rest", position: MODEL.length, gestureStart: null });
export const inTransition = (phase: Phase) => phase === "engaging" || phase === "returning";
export const hasSpan = (phase: Phase) => phase === "supported-rest" || phase === "moving-load";

/** Commands are guarded here as well as in the UI; duplicate/overlapping input is ignored. */
export function reduceExperiment(state: Experiment, action: Action): Experiment {
  switch (action.type) {
    case "engage": return state.phase === "single-rest" ? { ...state, phase: "engaging" } : state;
    case "return":
    case "reset":
      if (state.phase === "unavailable" && action.type === "reset") return INITIAL;
      return state.phase === "supported-rest" ? { ...state, phase: "returning" } : state;
    case "complete":
      if (state.phase === "engaging") return { phase: "supported-rest", position: MODEL.length, gestureStart: null };
      return state.phase === "returning" ? INITIAL : state;
    case "begin": return state.phase === "supported-rest" ? { ...state, phase: "moving-load", gestureStart: state.position } : state;
    case "position": {
      if (state.phase !== "moving-load") return state;
      const position = boundedPosition(action.value);
      return Number.isFinite(position) ? { ...state, position } : { ...state, phase: "unavailable", gestureStart: null };
    }
    case "step": {
      if (state.phase !== "supported-rest") return state;
      const position = boundedPosition(Math.round((state.position + action.delta) * 1e8) / 1e8);
      return Number.isFinite(position) ? { ...state, position } : { ...state, phase: "unavailable" };
    }
    case "commit": return state.phase === "moving-load" ? { ...state, phase: "supported-rest", gestureStart: null } : state;
    case "cancel": return state.phase === "moving-load" ? { phase: "supported-rest", position: state.gestureStart ?? state.position, gestureStart: null } : state;
    case "invalid": return { ...state, phase: "unavailable", gestureStart: null };
  }
}
