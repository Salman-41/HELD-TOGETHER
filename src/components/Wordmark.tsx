import Link from "next/link";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="HELD TOGETHER — sculpture">
      <svg viewBox="0 0 290 120" aria-hidden="true" focusable="false">
        <g fill="currentColor" fontFamily="var(--font-instrument), Georgia, serif" fontSize="54" letterSpacing="-.54">
          <text x="0" y="46.5">HELD</text>
          <path d="M0 55H252" fill="none" stroke="currentColor" strokeWidth=".8" />
          <text x="31" y="99.5">TOGETHER</text>
        </g>
      </svg>
    </Link>
  );
}
