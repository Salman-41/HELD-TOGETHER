/** Original architectural layers. No texture downloads, canvas, or render loop. */
export function GalleryEnvironment() {
  return (
    <div className="gallery-room" aria-hidden="true">
      <div className="wall-reveal" />
      <div className="daylight" />
      <div className="wall-return" />
      <div className="limestone-floor">
        <svg className="floor-joints" viewBox="0 0 1440 76" preserveAspectRatio="none">
          <path d="M950 0 1158 76M360 0 241 76" fill="none" stroke="var(--color-metal)" strokeOpacity=".3" />
        </svg>
      </div>
    </div>
  );
}
