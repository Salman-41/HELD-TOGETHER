"use client";

import { useEffect, useRef } from "react";
import type { gsap } from "gsap";

/** Native disclosure still works without JS. GSAP only softens the reveal. */
export function ModelNotes() {
  const panel = useRef<HTMLDivElement>(null);
  const tween = useRef<ReturnType<typeof gsap.fromTo> | null>(null);
  const sequence = useRef(0);

  useEffect(() => () => {
    sequence.current += 1;
    tween.current?.revert();
  }, []);

  async function reveal(event: React.SyntheticEvent<HTMLDetailsElement>) {
    const details = event.currentTarget;
    const request = ++sequence.current;
    tween.current?.revert();
    if (!details.open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = await import("gsap");
    if (request !== sequence.current || !details.open || !panel.current) return;
    tween.current = gsap.fromTo(panel.current, { opacity: 0 }, {
      opacity: 1, duration: 0.2, ease: "power1.out", clearProps: "opacity",
    });
  }

  return (
    <details className="model-notes" onToggle={reveal}>
      <summary className="text-action">Model assumptions</summary>
      <div ref={panel} className="model-notes-body">
        <p>A rigid, uniform 3 m beam has a declared mass of 12 kg. The hanging weight has a declared mass of 8 kg; gravity is 9.81 m/s². Beam self-weight is included. Cable, hook, and carriage masses are neglected.</p>
        <p>Cables pull along their length and do not resist moments. In this vertical pose, gravity acts on the same line as the taut support. The center of mass lies beneath the upper attachment. The loose curve is an illustration, not a calculated cable shape.</p>
        <p>These are virtual design parameters. The work makes no claim about stress, bending, structural capacity, or dynamic forces.</p>
      </div>
    </details>
  );
}
