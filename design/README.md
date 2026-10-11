# Design files

Open `HELD-TOGETHER-compositions.pdf` for the six-page review, or `review-board.png` for an overview. Individual SVG/PNG files are in `compositions/`; 320 px proofs are in `qa/`. These reviewed local files are the final design source.

The [Figma file](https://www.figma.com/design/mzUWUyV3Nlf9mkCKuf1mpg) contains editable earlier versions. Its Starter tool quota prevented syncing the final clearance, contrast, and mobile-label refinements. Frame IDs are recorded in `figma-manifest.json`.

`source/` contains design-authoring scripts, not application code. The Figma scripts are construction records; do not rerun them against the populated file. The local SVG exporter reuses their original sculpture geometry. With Node and librsvg already available, regenerate static designs using:

```sh
node design/source/export-compositions.cjs
FONTCONFIG_FILE="$PWD/design/source/fonts.conf" rsvg-convert design/compositions/desktop-opening.svg -o design/compositions/desktop-opening.png
```

Repeat the export for the other views. Preserve the fonts and OFL licenses when sharing editable SVGs. PNG and PDF previews include the intended type appearance without requiring font installation. Full visual/motion specifications and production asset requirements are in `docs/`.
