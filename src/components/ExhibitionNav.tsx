import Link from "next/link";

export function ExhibitionNav({ returnToSculpture = false }: { returnToSculpture?: boolean }) {
  return (
    <nav className={returnToSculpture ? "reading-nav" : "exhibition-nav"} aria-label="Exhibition">
      <Link className="text-action" href={returnToSculpture ? "/" : "/how-it-is-held"}>
        {returnToSculpture ? "Return to sculpture" : "How it is held"}
      </Link>
    </nav>
  );
}
