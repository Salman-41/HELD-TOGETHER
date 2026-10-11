import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { ExhibitionNav } from "@/components/ExhibitionNav";
import { ModelNotes } from "@/components/ModelNotes";

export const metadata: Metadata = { title: "How it is held" };

export default function HowItIsHeld() {
  return (
    <div className="reading-room">
      <header><Wordmark /></header>
      <main id="main" className="reading-content" tabIndex={-1}>
        <p className="text-sm">Held by one support</p>
        <h1>How it is held.</h1>
        <p className="reading-intro">The span begins upright. One cable carries the beam and its weight; the second hangs loose.</p>
        <p>The beam hangs vertically with the clay weight locked at its lower end. Their downward forces align with the upper attachment, so the beam rests with its center of mass below the support. The loose cable carries no force.</p>
        <dl className="rest-facts">
          <div><dt>Upper cable, A</dt><dd>196.20 N upward</dd></div>
          <div><dt>Loose cable, B</dt><dd>0 N</dd></div>
          <div><dt>Beam self-weight</dt><dd>117.72 N downward</dd></div>
          <div><dt>Hanging weight</dt><dd>78.48 N downward</dd></div>
        </dl>
        <p className="text-sm text-secondary">Declared vertical rest values, including beam self-weight. This still study does not run an equilibrium solver.</p>
        <ModelNotes />
        <p>Completing the span will require a powered lift: the right cable takes up its slack, then both ceiling winches coordinate the movement. The lift will be illustrative; equilibrium calculations will describe the finished rest states.</p>
        <ExhibitionNav returnToSculpture />
      </main>
    </div>
  );
}
