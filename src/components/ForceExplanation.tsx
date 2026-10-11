import { MODEL, forceText, type Forces } from "@/model/equilibrium";

export function ForceExplanation({ supported, forces }: { supported: boolean; forces: Forces }) {
  return (
    <section className={supported ? "force-explanation" : "force-explanation vertical-explanation"} aria-label="Calculated forces and model assumptions">
      <div className="force-equations">
        <p>A + B = W + P = {forceText(forces.total)}</p>
        <p>{supported ? "B · L = W · L/2 + P · s" : "Gravity and support share one vertical line."}</p>
        {!supported ? <p>B is slack and carries 0 N. The center of mass lies below A.</p> : null}
      </div>
      <dl className="sr-only">
        <dt>Support A, upward</dt><dd>{forceText(forces.a)}</dd>
        <dt>Support B, upward</dt><dd>{forceText(forces.b)}</dd>
        <dt>Beam self-weight W, downward</dt><dd>{forceText(forces.beam)}</dd>
        <dt>Hanging weight P, downward</dt><dd>{forceText(forces.load)}</dd>
      </dl>
      <div className="force-assumptions">
        <p>Uniform beam {MODEL.beamMass} kg · hanging weight {MODEL.loadMass} kg<br />g = {MODEL.gravity} m/s² · beam self-weight included</p>
        <p>Virtual parameters. Rigid beam; massless, tension-only cables. Static equilibrium only.</p>
        <p className="sr-only">No bending, stress, capacity or dynamic-force calculation. Both cables stay in tension throughout the permitted supported range. A horizontal single-cable pose is not permitted.</p>
      </div>
      {supported ? <div className="force-drawing-note"><p>Upward support balances downward weight.</p><p>Arrows share one force scale. A/B are support reactions.<br />The small support accents show each calculated share.</p></div> : null}
    </section>
  );
}
