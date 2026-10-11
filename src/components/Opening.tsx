import { GalleryEnvironment } from "@/components/GalleryEnvironment";
import { Wordmark } from "@/components/Wordmark";
import { ExhibitionNav } from "@/components/ExhibitionNav";
import { RestSculpture } from "@/sculpture/RestSculpture";
import { OPENING, OPENING_DESCRIPTION } from "@/model/presentation";

export function Opening() {
  return (
    <div className="gallery-shell">
      <div className="gallery" data-presentation={OPENING.phase}>
        <GalleryEnvironment />
        <header><Wordmark /></header>
        <main id="main" tabIndex={-1} aria-labelledby="opening-title">
          <p className="exhibition-kind desktop-only">An interactive sculpture</p>
          <h1 id="opening-title" className="opening-title">A span, waiting<span className="desktop-break"><br /></span><span className="mobile-space"> </span>to happen.</h1>
          <div className="rest-status">
            <p className="wide-status">Held by one support</p>
            <p className="narrow-status">One support<br />holds the beam.</p>
            <p className="mobile-only secondary wide-status">The second cable is slack.</p>
            <p className="narrow-status secondary">Second cable<br />slack.</p>
          </div>
          <p className="opening-copy desktop-only">One cable holds the beam at rest.<br />Engage the second to lift the span.</p>
          <figure className="sculpture-study" aria-describedby="sculpture-description">
            <RestSculpture />
            <figcaption id="sculpture-description" className="sr-only">{OPENING_DESCRIPTION}</figcaption>
          </figure>
          <p className="cable-caption desktop-only">Cable slack</p>
          <p className="weight-caption desktop-only">Weight locked at the lower end</p>
          <p className="mobile-invitation mobile-only">Engage it to lift the span.</p>
          <div className="engagement">
            <button className="text-action" type="button" aria-disabled="true" aria-describedby="presentation-note">
              Engage second support <span aria-hidden="true">→</span>
            </button>
            <p id="presentation-note" className="presentation-note">Still study · activation forthcoming</p>
          </div>
          <svg className="activation-leader desktop-only" viewBox="0 0 43 43" aria-hidden="true">
            <path d="M43 0H8V42H1" fill="none" stroke="var(--color-secondary)" strokeWidth=".8" />
          </svg>
          <noscript><p className="sr-only">This sculpture is readable without JavaScript. The explanatory page is available below.</p></noscript>
        </main>
        <footer>
          <p className="floor-caption desktop-only">Steel, clay, and the space between.</p>
          <ExhibitionNav />
        </footer>
      </div>
    </div>
  );
}
