"use client";

import { useEffect, useRef, useState } from "react";
import type { gsap } from "gsap";
import { INITIAL, reduceExperiment, inTransition, type Action, type Experiment } from "./state";
import { MODEL, forceText, solveSupported } from "@/model/equilibrium";

export function useExperiment() {
  const [state, setState] = useState<Experiment>(INITIAL);
  const current = useRef<Experiment>(INITIAL);
  const [visual, setVisual] = useState({ lift: 0, position: MODEL.length });
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const animation = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const version = useRef(0);

  function apply(action: Action) {
    const next = reduceExperiment(current.current, action);
    current.current = next;
    setState(next);
    return next;
  }
  function announcePosition(position: number) {
    const solution = solveSupported(position);
    if (solution.ok) setAnnouncement(`Weight ${position.toFixed(2)} metres from A. Support A ${forceText(solution.forces.a)}; support B ${forceText(solution.forces.b)}.`);
  }
  function commit() {
    if (current.current.phase !== "moving-load") return;
    const next = apply({ type: "commit" });
    announcePosition(next.position);
  }
  function cancel() {
    if (current.current.phase !== "moving-load") return;
    const next = apply({ type: "cancel" });
    setAnnouncement(`Movement cancelled. Weight restored to ${next.position.toFixed(2)} metres from A.`);
  }
  function finish() {
    const phase = current.current.phase;
    if (!inTransition(phase)) return;
    version.current += 1;
    animation.current?.kill();
    animation.current = null;
    const next = apply({ type: "complete" });
    setVisual({ lift: next.phase === "supported-rest" ? 1 : 0, position: MODEL.length });
    setAnnouncement(next.phase === "supported-rest" ? "Second support engaged; beam horizontal. Weight at B." : "Returned to single-support vertical rest. Weight locked at B.");
  }
  async function transition(command: "engage" | "return" | "reset") {
    const before = current.current;
    const next = apply({ type: command });
    if (next === before) return;
    if (next.phase === "single-rest") {
      setVisual({ lift: 0, position: MODEL.length });
      setAnnouncement("Experiment reset to vertical rest.");
      return;
    }
    const token = ++version.current;
    const engaging = next.phase === "engaging";
    const proxy = { lift: engaging ? 0 : 1, position: next.position };
    setVisual({ ...proxy });
    setAnnouncement("Hoist movement — illustrative. Static reactions are hidden during movement.");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden) { finish(); return; }
    try {
      const { gsap } = await import("gsap");
      if (token !== version.current) return;
      animation.current = gsap.timeline({ onUpdate: () => setVisual({ ...proxy }), onComplete: finish });
      if (!engaging && proxy.position !== MODEL.length) animation.current.to(proxy, { position: MODEL.length, duration: 0.32, ease: "power1.inOut" });
      animation.current.to(proxy, { lift: engaging ? 1 : 0, duration: 1.6, ease: "none" });
    } catch { if (token === version.current) finish(); }
  }

  useEffect(() => {
    setReady(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interrupt = () => { if (inTransition(current.current.phase)) finish(); else cancel(); };
    const visibility = () => { if (document.hidden) interrupt(); };
    const reduce = () => { if (media.matches) interrupt(); };
    window.addEventListener("resize", interrupt);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", reduce);
    return () => {
      version.current += 1;
      animation.current?.kill();
      window.removeEventListener("resize", interrupt);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", reduce);
    };
    // Listeners read current model refs, never stale rendered state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state, current, visual, ready, announcement, transition, commit, cancel,
    begin: () => apply({ type: "begin" }),
    move: (value: number) => apply({ type: "position", value }),
    step: (delta: number) => { const next = apply({ type: "step", delta }); if (next.phase === "supported-rest") announcePosition(next.position); },
    invalidate: () => apply({ type: "invalid" }),
  };
}
