import { Wordmark } from "@/components/Wordmark";
import { ExhibitionNav } from "@/components/ExhibitionNav";

export default function NotFound() {
  return (
    <div className="reading-room">
      <header><Wordmark /></header>
      <main id="main" className="reading-content" tabIndex={-1}>
        <h1>This room is empty.</h1>
        <p>The work is waiting in the gallery.</p>
        <ExhibitionNav returnToSculpture />
      </main>
    </div>
  );
}
