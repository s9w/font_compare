import copy
import json

fonts = [
	"Source Code Pro Light", "Source Code Pro", "Source Code Pro Medium",
	"Office Code Pro Light", "Office Code Pro", "Office Code Pro Medium",
	"Meslo LG S", "Meslo LG M", "Meslo LG L",
	"M+ 1m regular", "M+ 1m medium", "M+ 1m light",

	"Consolas", "Monoid", "Ubuntu Mono",
	"Bitstream Vera Sans Mono", "Input",
	"DejaVu Sans Mono", "Droid Sans Mono", "Fira Mono", "Envy Code R", "monoOne",
	"Fantasque Sans Mono", "Hermit", "Liberation Mono", "Iosevka", "OCR A Extended", "Inconsolata-dz",
	"Luculent", "PragmataPro", "Monofur", "OpenDyslexicMono", "Courier Prime",
	"Roboto Mono", "Roboto Mono Light", "Roboto Mono Medium", "PT Mono", "Luxi Mono", "MonteCarlo", "Mensch",
	"Anonymous Pro", "ProggyClean", "Dina", "ProFontWindows", "FixedSys Excelsior 3.01", "Terminus"]

aa_defaults = ["aa1", "aa0"]
size_defaults = [8,9,10,11,12]
fontInfos = {}

def extend_fontInfo(font, sizes, aa_settings):
	def get_fontInfo(sizes_param, aa_param):
		if "aa1" in aa_param:
			aa_sizes = sizes_param
		else:
			aa_sizes = []

		return {
			"sizes_aa0": sizes_param,
			"sizes_aa1": aa_sizes
		}
	def merge_fontInfo(fontInfo1, fontInfo2):
		return {
			"sizes_aa0": fontInfo1["sizes_aa0"] + fontInfo2["sizes_aa0"],
			"sizes_aa1": fontInfo1["sizes_aa1"] + fontInfo2["sizes_aa1"],
		}

	if font in fontInfos:
		fontInfos[font] = merge_fontInfo(fontInfos[font], get_fontInfo(sizes, aa_settings))
	else:
		fontInfos[font] = get_fontInfo(sizes, aa_settings)

extend_fontInfo("Anonymous Pro", [7,8,9,10], ["aa0"])
extend_fontInfo("Anonymous Pro", [11,12], aa_defaults)
extend_fontInfo("ProggyClean", [9], ["aa0"])
extend_fontInfo("Iosevka", [8,9,10,11], aa_defaults)
extend_fontInfo("Dina", [8,9,10], ["aa0"])
extend_fontInfo("ProFontWindows", [7,8,9,10,11,12], ["aa0"])
extend_fontInfo("FixedSys Excelsior 3.01", [12], ["aa0"])
extend_fontInfo("Terminus", [10,11,12], ["aa0"])
extend_fontInfo("MonteCarlo", [10], ["aa0"])

default_fontInfo = {
	"sizes_aa0": size_defaults,
	"sizes_aa1": size_defaults
}

fontInfos.update({font: default_fontInfo for font in fonts if font not in fontInfos})

inputs = []

default_norm_size = 10
norm_sizes = {
	"Anonymous Pro": 11,
	"Consolas": 11,
	"Envy Code R": 11,
	"Fantasque Sans Mono": 11,
	"Input": 8,
	"Monoid": 11,
	"monoOne": 10.5,
	"ProFontWindows": 12,
	"Ubuntu Mono": 12,
	"Iosevka": 11,
	"Luculent": 11,
	"Monofur": 11,
	"PragmataPro": 11,
	"OpenDyslexicMono": 8,
	"ProggyClean": 9,
	"FixedSys Excelsior 3.01": 12,
	"Terminus": 11,
	"M+ 1m regular": 12,
	"M+ 1m medium": 12,
	"M+ 1m light": 12
}

for font in fonts:
	norm_size = norm_sizes.get(font, default_norm_size)
	fontInfo = copy.copy(fontInfos[font])
	fontInfo["defaultSize"] = norm_size
	fontInfos[font] = fontInfo

for font in fonts:
	norm_size = norm_sizes.get(font, default_norm_size)
	for theme in ["light", "dark"]:
		code_len = "long"
		for aa in aa_defaults:
			for size in fontInfos.get(font, default_fontInfo)["sizes_" + aa]:
				inputs.extend([",".join([code_len, theme, font, str(size), aa]) + "\n"])

		code_len = "short"
		for aa in aa_defaults:
			size = norm_sizes.get(font, default_norm_size)
			if round(size) in fontInfos.get(font, default_fontInfo)["sizes_" + aa]:
				inputs.extend([",".join([code_len, theme, font, str(size), aa]) + "\n"])

# biggest:
# long,Input,12,aa1,dark

with open("ahk_input.csv", "w", encoding="utf-8") as f:
	f.write("".join(inputs))

with open("../font_info.js", "w", encoding="utf-8") as f:
	f.write("var fontList = {};\n".format(json.dumps(sorted(fonts, key=str.lower), indent="\t")))
	f.write("var fontInfos = {};".format(json.dumps(fontInfos, indent="\t")))
