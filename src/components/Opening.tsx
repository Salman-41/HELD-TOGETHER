"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { GalleryEnvironment } from "@/components/GalleryEnvironment";
import { Wordmark } from "@/components/Wordmark";
import { ForceExplanation } from "@/components/ForceExplanation";
import { Sculpture } from "@/sculpture/Sculpture";
import { hoistPose, beamPoint } from "@/sculpture/hoist";
import { OPENING_DESCRIPTION, OPENING } from "@/model/presentation";
import { MODEL, solveSupported, solveSingleRest, forceText } from "@/model/equilibrium";
import { useExperiment } from "@/interaction/useExperiment";
import { hasSpan, inTransition } from "@/interaction/state";

const movementKeys = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"]);

export function Opening() {
  const experiment = useExperiment();
  const { state, current, ready } = experiment;
  const supported = hasSpan(state.phase);
  const busy = inTransition(state.phase);
  const [forceView, setForceView] = useState(false);
  const [metrics, setMetrics] = useState({ scale: 120, mobile: false });
  const svg = useRef<SVGSVGElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const explanationLink = useRef<HTMLAnchorElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; offset: number; element: HTMLButtonElement } | null>(null);
  const lift = busy ? experiment.visual.lift : supported ? 1 : 0;
  const position = busy ? experiment.visual.position : state.phase === "unavailable" ? MODEL.length : state.position;
  const pose = hoistPose(lift);
  const solution = busy || state.phase === "unavailable" ? null : supported ? solveSupported(state.position) : solveSingleRest(state.position);
  const forces = solution?.ok ? solution.forces : null;
  const invalid = state.phase === "unavailable" || Boolean(solution && !solution.ok);
  const layout = supported || state.phase === "returning" ? "supported" : "opening";
  const canExplain = ready && !busy && state.phase !== "moving-load" && !invalid;
  const combined = supported && Math.abs(position - MODEL.length / 2) < 1e-8;
  const extra = forceView && forces && supported ? Math.max(0, (combined ? forces.total : forces.beam) * (metrics.mobile ? 0.65 : 0.95) + (metrics.mobile ? 44 : 54) - (metrics.mobile ? 120 : 200)) : 0;

  useEffect(() => {
    if (!svg.current) return;
    const update = () => {
      if (!svg.current || inTransition(current.current.phase)) return;
      setMetrics({ scale: svg.current.getBoundingClientRect().width / 3.5, mobile: window.matchMedia("(max-width: 959px)").matches });
    };
    const observer = new ResizeObserver(update);
    observer.observe(svg.current);
    update();
    return () => observer.disconnect();
  }, [current]);

  useEffect(() => { if (solution && !solution.ok && state.phase !== "unavailable") experiment.invalidate(); }, [solution?.ok, state.phase]);
  useEffect(() => { if (forceView) closeButton.current?.focus({ preventScroll: true }); }, [forceView]);

  function closeForces() {
    setForceView(false);
    requestAnimationFrame(() => explanationLink.current?.focus({ preventScroll: true }));
  }
  function localX(clientX: number, clientY: number) {
    const matrix = svg.current?.getScreenCTM();
    return matrix ? new DOMPoint(clientX, clientY).matrixTransform(matrix.inverse()).x : NaN;
  }
  function startDrag(event: PointerEvent<HTMLButtonElement>) {
    if (!supported || forceView || event.button !== 0) return;
    const x = localX(event.clientX, event.clientY);
    if (!Number.isFinite(x)) return;
    experiment.begin();
    drag.current = { id: event.pointerId, offset: current.current.position - x, element: event.currentTarget };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function dragMove(event: PointerEvent<HTMLButtonElement>) {
    if (!drag.current || drag.current.id !== event.pointerId || current.current.phase !== "moving-load") return;
    experiment.move(localX(event.clientX, event.clientY) + drag.current.offset);
  }
  function endDrag(cancelled = false) {
    const gesture = drag.current;
    drag.current = null;
    if (gesture?.element.hasPointerCapture(gesture.id)) gesture.element.releasePointerCapture(gesture.id);
    if (cancelled) experiment.cancel(); else experiment.commit();
  }
  function keyMove(event: KeyboardEvent<HTMLElement>) {
    if (!movementKeys.has(event.key) || !hasSpan(current.current.phase) || forceView) return;
    event.preventDefault();
    experiment.begin();
    const p = current.current.position;
    const value = event.key === "Home" ? 0 : event.key === "End" ? MODEL.length : p + (event.key === "PageUp" ? 0.3 : event.key === "PageDown" ? -0.3 : event.key === "ArrowRight" || event.key === "ArrowUp" ? 0.03 : -0.03);
    experiment.move(Math.round(value * 1e8) / 1e8);
  }
  const weight = beamPoint(pose, position);
  const handleStyle: CSSProperties = {
    left: `${(weight.x + 0.25) / 3.5 * 100}%`,
    top: `${(weight.y + OPENING.loadCord + OPENING.loadHeight / 2 + 1.65) / 6 * 100}%`,
    width: `${OPENING.loadWidth / 3.5 * 100}%`, height: `${OPENING.loadHeight / 6 * 100}%`,
  };
  const description = busy ? "Hoist movement — illustrative. Both ceiling winches coordinate the lift. Static force results are hidden." : supported ? `The beam is horizontal with two taut vertical cables. The weight is ${position.toFixed(2)} metres from A. ${forces ? `Support A carries ${forceText(forces.a)}; support B carries ${forceText(forces.b)}. ` : ""}The reactions describe an ideal quasi-static position, not inertial forces from dragging.` : OPENING_DESCRIPTION;

  return (
    <div className="gallery-shell" onKeyDown={event => { if (event.key === "Escape") { if (forceView) closeForces(); else endDrag(true); } }}>
      <div className="gallery" data-state={state.phase} data-presentation={state.phase} data-layout={layout} data-view={forceView ? "forces" : "sculpture"} style={{ "--fit": pose.fit, "--position-ratio": position / MODEL.length, "--diagram-extra": `${extra}px` } as CSSProperties}>
        <GalleryEnvironment />
        <header><Wordmark /></header>
        <main id="main" tabIndex={-1} aria-labelledby="opening-title">
          <p className="exhibition-kind desktop-only">An interactive sculpture</p>
          <h1 id="opening-title" className="opening-title">
            {forceView ? <><span className="desktop-only">{supported ? <>How the weight<br />is shared.</> : <>How it<br />is held.</>}</span><span className="mobile-only">How it is held</span></> : layout === "supported" ? <><span className="desktop-only">The weight moves.<br />The work is shared.</span><span className="mobile-only">The work is shared.</span></> : <>A span, waiting<span className="desktop-break"><br /></span><span className="mobile-space"> </span>to happen.</>}
          </h1>
          {busy ? <p className="motion-status">Hoist movement — illustrative</p> : !forceView ? <div className="rest-status">
            {supported ? <><p className="desktop-only">Held by two supports</p><p className="mobile-only">Two supports. One shared load.</p></> : <>
              <p className="wide-status">Held by one support</p><p className="narrow-status">One support<br />holds the beam.</p>
              <p className="mobile-only secondary wide-status">The second cable is slack.</p><p className="narrow-status secondary">Second cable<br />slack.</p>
            </>}
          </div> : <p className="technical-subtitle">{supported ? "The same beam. Its forces revealed." : "One taut cable. Gravity on the same line."}</p>}
          {!forceView ? <p className="opening-copy desktop-only">{layout === "supported" ? <>Move the clay weight along the beam.<br />Each cable carries a different share.</> : <>One cable holds the beam at rest.<br />Engage the second to lift the span.</>}</p> : null}
          <figure className="sculpture-study" aria-describedby="sculpture-description">
            <Sculpture pose={pose} position={position} forces={forces} forceView={forceView} supported={supported} scale={metrics.scale} mobile={metrics.mobile} svgRef={svg}>
              {supported && !forceView ? <>
                <button className="weight-handle" style={handleStyle} type="button" tabIndex={-1} aria-label="Drag hanging weight" onPointerDown={startDrag} onPointerMove={dragMove} onPointerUp={() => endDrag()} onPointerCancel={() => endDrag(true)} onLostPointerCapture={() => { if (drag.current) endDrag(true); }} onKeyDown={keyMove} onKeyUp={event => { if (movementKeys.has(event.key)) experiment.commit(); }} onBlur={() => endDrag()} />
                <p className={`drag-cue desktop-only ${position > 2.4 ? "cue-left" : ""}`} style={{ left: `${(weight.x + 0.25) / 3.5 * 100}%`, top: `${(weight.y + OPENING.loadCord + OPENING.loadHeight / 2 + 1.65) / 6 * 100}%` }}>Drag the weight</p>
              </> : null}
            </Sculpture>
            <figcaption id="sculpture-description" className="sr-only">{description}</figcaption>
          </figure>
          {!supported && !busy && !forceView ? <>
            <p className="cable-caption desktop-only">Cable slack</p><p className="weight-caption desktop-only">Weight locked at the lower end</p>
            <p className="mobile-invitation mobile-only">Engage it to lift the span.</p>
          </> : null}
          {supported && !forceView ? <p className="mobile-drag-cue mobile-only">Move the weight</p> : null}
          {!forceView ? <>
            <div className="engagement">
              <button className="text-action" type="button" disabled={!ready} aria-disabled={busy || state.phase === "moving-load" || invalid} aria-describedby="control-note" onClick={() => { if (busy || state.phase === "moving-load" || invalid) return; void experiment.transition(supported ? "return" : "engage"); }}>
                {busy ? state.phase === "engaging" ? "Lifting the span…" : "Returning to rest…" : supported ? "Return to rest" : <>Engage second support <span aria-hidden="true">→</span></>}
              </button>
              <p id="control-note" className={supported || busy ? "sr-only" : "presentation-note"}>{!ready ? "Enable JavaScript to engage the support." : busy ? "Hoist movement — illustrative. Load movement and forces are unavailable until rest." : supported ? "Returns the weight to B, then removes support B only after lowering into vertical rest." : "Take up the slack cable"}</p>
            </div>
            {!supported && !busy ? <svg className="activation-leader desktop-only" viewBox="0 0 43 43" aria-hidden="true"><path d="M43 0H8V42H1" fill="none" stroke="var(--color-secondary)" strokeWidth=".8" /></svg> : null}
            {supported ? <div className="position-controls">
              <div className="position-label"><label htmlFor="weight-position">Weight position along beam</label><output htmlFor="weight-position">{position.toFixed(2)} m</output></div>
              <input ref={range} id="weight-position" type="range" min="0" max={MODEL.length} step="0.03" value={state.position} aria-valuetext={`${position.toFixed(2)} metres from A${forces ? `; support A ${forceText(forces.a)}, support B ${forceText(forces.b)}` : ""}`} aria-describedby="range-note" onPointerDown={event => { experiment.begin(); event.currentTarget.setPointerCapture(event.pointerId); }} onChange={event => { experiment.begin(); experiment.move(event.currentTarget.valueAsNumber); }} onPointerUp={experiment.commit} onPointerCancel={experiment.cancel} onKeyDown={keyMove} onKeyUp={event => { if (movementKeys.has(event.key)) experiment.commit(); }} onBlur={experiment.commit} />
              <div className="range-ends" aria-hidden="true"><span>A</span><span>B</span></div>
              <div className="move-alternatives"><button className="text-action" type="button" aria-disabled={state.phase === "moving-load" || position <= 0} onClick={() => { if (current.current.position > 0) experiment.step(-0.03); }}>← Move left</button><button className="text-action" type="button" aria-disabled={state.phase === "moving-load" || position >= MODEL.length} onClick={() => { if (current.current.position < MODEL.length) experiment.step(0.03); }}>Move right →</button></div>
              <p id="range-note" className="sr-only">0 to 3 metres from A. Arrow keys move 0.03 metres; Page Up and Page Down move 0.30 metres. Home and End select the ends. Escape cancels movement. Both cables remain in tension throughout this range.</p>
            </div> : null}
            {supported && forces ? <div className="reaction-readout" aria-label="Calculated support reactions"><p className="reaction-heading">Calculated support reactions</p><dl><div><dt>A</dt><dd>{forceText(forces.a)}</dd></div><div><dt>B</dt><dd>{forceText(forces.b)}</dd></div></dl></div> : null}
          </> : forces ? <ForceExplanation supported={supported} forces={forces} /> : null}
          {invalid ? <div className="model-error" role="alert"><p>Position unavailable.</p><p>{solution && !solution.ok ? solution.message : "This configuration is outside the permitted model. Reset to vertical rest."}</p><button className="text-action" type="button" onClick={() => { setForceView(false); void experiment.transition("reset"); }}>Reset experiment</button></div> : null}
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{experiment.announcement}</p>
        </main>
        <footer>
          {!forceView && !supported && !busy ? <p className="floor-caption desktop-only">Steel, clay, and the space between.</p> : null}
          {!forceView && (supported || state.phase === "returning") ? <button className="text-action reset-action" type="button" aria-disabled={busy || state.phase === "moving-load"} onClick={() => { if (!busy && state.phase !== "moving-load") void experiment.transition("reset"); }}>Reset</button> : null}
          <nav className="exhibition-nav" aria-label="Exhibition">
            {forceView ? <button ref={closeButton} className="text-action" type="button" onClick={closeForces}>Return to sculpture</button> : <a ref={explanationLink} className="text-action" href="/how-it-is-held" aria-disabled={ready && !canExplain} onClick={event => { if (!ready) return; event.preventDefault(); if (canExplain) setForceView(true); }}>How it is held</a>}
          </nav>
          <noscript><p className="noscript-note">This is a static vertical rest. Enable JavaScript for support and weight controls.</p></noscript>
        </footer>
      </div>
    </div>
  );
}
