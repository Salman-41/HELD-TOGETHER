"""Optional asset tooling: pip install fonttools brotli; run from repository root.
No Python dependency is needed to build or run the application.
"""
from pathlib import Path
from shutil import copyfile
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parents[1]
source = root / "design/fonts"
output = root / "src/assets/fonts"
output.mkdir(parents=True, exist_ok=True)
# Basic Latin, Latin-1, editorial punctuation, units, arrows, mathematical signs.
codepoints = list(range(0x20, 0x100)) + list(range(0x2000, 0x2070)) + list(range(0x2190, 0x2195)) + [0x2212, 0x2211, 0x3B8, 0x3C0]
for filename, target in [("InstrumentSerif-Regular.ttf", "InstrumentSerif-latin.woff2"), ("Inter-variable.ttf", "Inter-latin.woff2")]:
    font = TTFont(source / filename, lazy=False)
    options = subset.Options()
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
    options.name_legacy = True
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    if "fvar" in font:
        limits = {axis.axisTag: ((400, 500) if axis.axisTag == "wght" else axis.defaultValue) for axis in font["fvar"].axes}
        font = instantiateVariableFont(font, limits, inplace=True)
    font.flavor = "woff2"
    font.save(output / target)
for license_name in ["InstrumentSerif-OFL.txt", "Inter-OFL.txt"]:
    copyfile(source / license_name, output / license_name)
