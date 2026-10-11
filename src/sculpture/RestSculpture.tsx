import { OPENING } from "@/model/presentation";

// World dimensions in metres, with SVG y downward. A is (0,0), B is (0,3).
// The loose curve follows the approved illustration. Its shape is not solved.
export function RestSculpture() {
  const { beamLength: length, beamDepth: depth, loadCord, loadWidth, loadHeight } = OPENING;
  const loadY = length + loadCord;
  return (
    <div className="sculpture-frame" aria-hidden="true">
      <svg className="sculpture" viewBox="-.25 -1.65 3.5 6" focusable="false">
        <defs>
          <linearGradient id="rest-steel" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#83897D" />
            <stop offset=".16" stopColor="#BAC0AD" />
            <stop offset=".24" stopColor="#535D53" />
            <stop offset=".75" stopColor="#303A34" />
            <stop offset="1" stopColor="#202B26" />
          </linearGradient>
          <linearGradient id="rest-clay">
            <stop stopColor="#B8644B" />
            <stop offset=".65" stopColor="#A8503C" />
            <stop offset="1" stopColor="#823C2F" />
          </linearGradient>
        </defs>
        <g className="hoists">
          {[0, length].map((x) => (
            <g key={x} transform={`translate(${x} ${-OPENING.anchorHeight})`}>
              <rect x="-.0833" y="-.0583" width=".1666" height=".0833" fill="var(--color-metal)" />
              <rect x="-.0417" y=".025" width=".0834" height=".075" rx=".0167" fill="#5A6256" />
              <circle cy=".0583" r=".0183" fill="var(--color-plaster)" />
            </g>
          ))}
        </g>
        <g fill="none" strokeWidth="1.4" className="cables">
          <path d="M0 -1.4083V0" stroke="var(--color-steel)" vectorEffect="non-scaling-stroke" />
          <path d="M3 -1.4083Q3 3 0 3" stroke="#697064" vectorEffect="non-scaling-stroke" />
        </g>
        <g className="beam-shadow" fill="var(--color-steel)" opacity=".045">
          <rect x=".1333" y=".1667" width={depth} height={length} />
        </g>
        <g className="beam">
          <rect x={-depth / 2} width={depth} height={length} fill="url(#rest-steel)" />
          <path d={`M${-depth / 2} 0V${length}`} stroke="#C1C1B0" strokeWidth=".9" vectorEffect="non-scaling-stroke" />
          <path d="M-.019 .02V2.98M.016 .02V2.98" stroke="#E7E1D5" strokeWidth=".22" opacity=".12" vectorEffect="non-scaling-stroke" />
        </g>
        <g className="load-cord">
          <path d={`M0 ${length + depth / 2}V${loadY}`} stroke="var(--color-steel)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <rect x="-.0333" y={length - 0.0333} width=".0666" height=".0666" rx=".0083" fill="var(--color-metal)" />
        </g>
        <g className="clay-weight" transform={`translate(0 ${loadY})`}>
          <path d={`M${-loadWidth / 2} .0333L${-loadWidth / 2 + 0.0333} 0H${loadWidth / 2 - 0.0333}L${loadWidth / 2} .0333V${loadHeight}H${-loadWidth / 2}Z`} fill="url(#rest-clay)" />
          <path d={`M${-loadWidth / 2 + 0.0083} .0333V${loadHeight - 0.0083}`} stroke="#D08567" strokeWidth="1" opacity=".5" vectorEffect="non-scaling-stroke" />
          <circle cy=".0583" r=".0167" fill="#623D30" />
        </g>
      </svg>
    </div>
  );
}
