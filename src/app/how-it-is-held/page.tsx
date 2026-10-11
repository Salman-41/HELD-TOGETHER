import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { ExhibitionNav } from "@/components/ExhibitionNav";
import { ModelNotes } from "@/components/ModelNotes";
import { solveSingleRest, forceText } from "@/model/equilibrium";

export const metadata: Metadata = { title: "How it is held" };

export default function HowItIsHeld() {
  const solution = solveSingleRest();
  if (!solution.ok) return <main id="main" className="reading-room"><p>Position unavailable.</p><ExhibitionNav returnToSculpture /></main>;
  const forces = solution.forces;
  return (
    <div className="reading-room">
      <header><Wordmark /></header>
      <main id="main" className="reading-content" tabIndex={-1}>
        <p className="text-sm">Initial vertical rest · one support</p>
        <h1>How it is held.</h1>
        <p className="reading-intro">The span begins upright. One cable carries the beam and its weight; the second hangs loose.</p>
        <p>The beam hangs vertically with the clay weight locked at its lower end. Their downward forces align with the upper attachment, so the beam rests with its center of mass below the support. The loose cable carries no force.</p>
        <dl className="rest-facts">
          <div><dt>Upper cable, A</dt><dd>{forceText(forces.a)} upward</dd></div>
          <div><dt>Loose cable, B</dt><dd>{forceText(forces.b)}</dd></div>
          <div><dt>Beam self-weight</dt><dd>{forceText(forces.beam)} downward</dd></div>
          <div><dt>Hanging weight</dt><dd>{forceText(forces.load)} downward</dd></div>
        </dl>
        <p className="text-sm text-secondary">Calculated values for the initial vertical rest, including beam self-weight. The sculpture’s force view shows the current configuration.</p>
        <ModelNotes />
        <p>Completing the span requires a powered lift: the right cable takes up its slack, then both ceiling winches coordinate the movement. The lift is illustrative; equilibrium calculations describe the finished rest states.</p>
        <ExhibitionNav returnToSculpture />
      </main>
    </div>
  );
}
