import type { CSSProperties, RefObject, ReactNode } from "react";
import { OPENING } from "@/model/presentation";
import { MODEL, forceText, type Forces } from "@/model/equilibrium";
import { beamPoint, type Pose } from "./hoist";

type Props = { pose: Pose; position: number; forces: Forces | null; forceView: boolean; supported: boolean; scale: number; mobile: boolean; svgRef: RefObject<SVGSVGElement | null>; children?: ReactNode };
const at = (x: number, y: number): CSSProperties => ({ left: `${(x + 0.25) / 3.5 * 100}%`, top: `${(y + 1.65) / 6 * 100}%` });

function ForceArrow({ x, y, force, up = false, clay = false, scale, mobile }: { x: number; y: number; force: number; up?: boolean; clay?: boolean; scale: number; mobile: boolean }) {
  const end = y + (up ? -1 : 1) * force * (mobile ? 0.65 : 0.95) / scale;
  const head = 7 / scale * (up ? 1 : -1);
  return <path d={`M${x} ${y}V${end}M${x - 4 / scale} ${end + head}L${x} ${end}L${x + 4 / scale} ${end + head}`} fill="none" stroke={clay ? "var(--color-clay)" : "var(--color-steel)"} strokeWidth="1.65" vectorEffect="non-scaling-stroke" />;
}

/** All material geometry, force arrows and HTML labels use the same beam points. */
export function Sculpture({ pose, position, forces, forceView, supported, scale, mobile, svgRef, children }: Props) {
  const { beamLength: length, beamDepth: depth, loadCord, loadWidth, loadHeight } = OPENING;
  const a = { x: pose.ax, y: pose.ay };
  const b = beamPoint(pose, length);
  const weight = beamPoint(pose, position);
  const middle = beamPoint(pose, length / 2);
  const loadY = weight.y + loadCord;
  const degrees = pose.angle * 180 / Math.PI;
  const combined = supported && Math.abs(position - length / 2) < 1e-8;
  const forceScale = mobile ? 0.65 : 0.95;
  const downForce = forces ? (combined ? forces.total : forces.beam) : 0;
  const dimension = Math.max(mobile ? 120 : 200, downForce * forceScale + (mobile ? 44 : 54)) / scale;
  const dimensionL = dimension + (mobile ? 34 : 36) / scale;
  const labelEnd = (y: number, force: number, up = false) => y + force * forceScale / scale * (up ? -1 : 1);
  const cableStart = -OPENING.anchorHeight;
  const controlX = (length + b.x) / 2 + (length - b.x) * pose.slack / 2;
  const controlY = cableStart + (b.y - cableStart) * (1 + pose.slack) / 2;
  return (
    <div className="sculpture-frame">
      <svg ref={svgRef} className="sculpture" viewBox="-.25 -1.65 3.5 6" aria-hidden="true" focusable="false" data-angle={pose.angle} data-load={position} data-slack={pose.slack}>
        <defs>
          <linearGradient id="rest-steel" x1={Math.cos(pose.angle)} y1="0" x2="0" y2={Math.sin(pose.angle)}><stop stopColor="#83897D" /><stop offset=".16" stopColor="#BAC0AD" /><stop offset=".24" stopColor="#535D53" /><stop offset=".75" stopColor="#303A34" /><stop offset="1" stopColor="#202B26" /></linearGradient>
          <linearGradient id="rest-clay"><stop stopColor="#B8644B" /><stop offset=".65" stopColor="#A8503C" /><stop offset="1" stopColor="#823C2F" /></linearGradient>
        </defs>
        <g className="material-layer" style={{ opacity: forceView ? 0 : 1 }}>
          <g fill="none" strokeWidth="1.4">
            <path data-cable="a" d={`M0 ${cableStart}L${a.x} ${a.y}`} stroke="var(--color-steel)" vectorEffect="non-scaling-stroke" />
            <path data-cable="b" d={`M${length} ${cableStart}Q${controlX} ${controlY} ${b.x} ${b.y}`} stroke={pose.slack > 0 ? "#697064" : "var(--color-steel)"} vectorEffect="non-scaling-stroke" />
          </g>
          <g transform={`translate(${a.x + 0.1333} ${a.y + 0.1667}) rotate(${degrees - 90})`} fill="var(--color-steel)" opacity=".045"><rect x={-depth / 2} width={depth} height={length} /></g>
          <g data-beam="true" transform={`translate(${a.x} ${a.y}) rotate(${degrees - 90})`}>
            <rect x={-depth / 2} width={depth} height={length} fill="url(#rest-steel)" />
            <path d={`M${-depth / 2} 0V${length}`} stroke="#C1C1B0" strokeWidth=".9" vectorEffect="non-scaling-stroke" />
            <path d="M-.019 .02V2.98M.016 .02V2.98" stroke="#E7E1D5" strokeWidth=".22" opacity=".12" vectorEffect="non-scaling-stroke" />
          </g>
          <path d={`M${weight.x} ${weight.y + depth / 2}V${loadY}`} stroke="var(--color-steel)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <rect x={weight.x - 0.0333} y={weight.y - 0.0333} width=".0666" height=".0666" rx=".0083" fill="var(--color-metal)" />
          <g data-weight="true" transform={`translate(${weight.x} ${loadY})`}>
            <path d={`M${-loadWidth / 2} .0333L${-loadWidth / 2 + 0.0333} 0H${loadWidth / 2 - 0.0333}L${loadWidth / 2} .0333V${loadHeight}H${-loadWidth / 2}Z`} fill="url(#rest-clay)" />
            <path d={`M${-loadWidth / 2 + 0.0083} .0333V${loadHeight - 0.0083}`} stroke="#D08567" strokeWidth="1" opacity=".5" vectorEffect="non-scaling-stroke" /><circle cy=".0583" r=".0167" fill="#623D30" />
          </g>
          {supported && forces ? [forces.a, forces.b].map((force, index) => <rect key={index} x={(index ? b.x : a.x) - 0.04} y={a.y - 0.04} width=".08" height=".08" fill="var(--color-reaction)" opacity={0.15 + 0.45 * force / forces.total} />) : null}
        </g>
        <g className="drawing-layer" style={{ opacity: forceView ? 1 : 0 }}>
          <path d={`M0 ${-OPENING.anchorHeight}L${a.x} ${a.y}M${length} ${-OPENING.anchorHeight}Q${controlX} ${controlY} ${b.x} ${b.y}`} fill="none" stroke="var(--color-metal)" strokeWidth="1" strokeDasharray="3 6" opacity=".45" vectorEffect="non-scaling-stroke" />
          <g transform={`translate(${a.x} ${a.y}) rotate(${degrees - 90})`}><rect x={-depth / 2} width={depth} height={length} fill="none" stroke="var(--color-steel)" strokeWidth="1.1" vectorEffect="non-scaling-stroke" /></g>
          <path d={`M${weight.x} ${weight.y}V${loadY}`} stroke="var(--color-clay)" opacity=".2" vectorEffect="non-scaling-stroke" />
          <rect x={weight.x - loadWidth / 2} y={loadY} width={loadWidth} height={loadHeight} fill="none" stroke="var(--color-clay)" strokeWidth="1" opacity=".25" vectorEffect="non-scaling-stroke" />
          {forceView && forces ? <>
            <ForceArrow x={a.x} y={a.y} force={forces.a} up scale={scale} mobile={mobile} />
            {supported ? <ForceArrow x={b.x} y={b.y} force={forces.b} up scale={scale} mobile={mobile} /> : null}
            <ForceArrow x={middle.x} y={middle.y} force={combined ? forces.total : forces.beam} scale={scale} mobile={mobile} />
            {!combined ? <ForceArrow x={weight.x} y={weight.y} force={forces.load} clay scale={scale} mobile={mobile} /> : null}
            {supported ? <path d={`M0 ${dimension}H${position}M0 ${dimension - 4 / scale}V${dimension + 4 / scale}M${position} ${dimension - 4 / scale}V${dimension + 4 / scale}M0 ${dimensionL}H${length}M0 ${dimensionL - 5 / scale}V${dimensionL + 5 / scale}M${length} ${dimensionL - 5 / scale}V${dimensionL + 5 / scale}`} fill="none" stroke="#7A8074" strokeWidth=".8" vectorEffect="non-scaling-stroke" /> : null}
          </> : null}
        </g>
      </svg>
      {[0, length].map(x => <svg key={x} className="hoist-fitting" viewBox="0 0 20 20" aria-hidden="true" style={at(x, -OPENING.anchorHeight)}><rect width="20" height="10" fill="var(--color-metal)" /><rect x="5" y="10" width="10" height="9" rx="2" fill="#5A6256" /><circle cx="10" cy="14" r="2.2" fill="var(--color-plaster)" /></svg>)}
      {forceView && forces ? <div className="force-labels">
        <p className="force-label force-a" style={at(a.x, labelEnd(a.y, forces.a, true))}>A · {forceText(forces.a)}</p>
        {supported ? <p className="force-label force-b" style={at(b.x, labelEnd(b.y, forces.b, true))}>B · {forceText(forces.b)}</p> : null}
        <p className={`force-label force-w ${combined ? "combined-force" : ""}`} style={at(middle.x, labelEnd(middle.y, combined ? forces.total : forces.beam))}>{combined ? "W + P" : "W · beam"}<br />{forceText(combined ? forces.total : forces.beam)}</p>
        {!combined ? <p className={`force-label force-p ${position > MODEL.length * 0.75 && supported ? "label-left" : ""}`} style={at(weight.x, labelEnd(weight.y, forces.load))}>P · load<br />{forceText(forces.load)}</p> : null}
        {supported ? <>
          <p className="dimension-label" style={at(Math.max(0.1, position / 2), dimension)}>s = {position.toFixed(2)} m</p>
          <p className="dimension-label" style={at(length / 2, dimensionL)}>L = {length.toFixed(2)} m</p>
        </> : null}
      </div> : null}
      {children}
    </div>
  );
}
