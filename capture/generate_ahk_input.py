import copy
import json

fonts_names = [
	"Anonymous Pro",
	"Bitstream Vera Sans Mono",
	"Consolas",
	"Courier Prime",
	"Classic Console",
	"DejaVu Sans Mono",
	"Dina",
	"Droid Sans Mono",
	"Envy Code R",
	"Fantasque Sans Mono",
	"Fira Mono",
	"FixedSys Excelsior 3.01",
	"Hermit",
	"Inconsolata-dz",
	"Iosevka",
	"Liberation Mono",
	"Luculent",
	"Luxi Mono",
	"M+ 1m regular", "M+ 1m medium", "M+ 1m light",
	"Menlo",
	"Mensch",
	"Meslo LG S", "Meslo LG M", "Meslo LG L",
	"Monofur",
	"Monoid",
	"monoOne",
	"MonteCarlo",
	"OCR A Extended",
	"Office Code Pro Light", "Office Code Pro", "Office Code Pro Medium",
	"OpenDyslexicMono",
	"PragmataPro",
	"ProFontWindows",
	"ProggyClean",
	"PT Mono",
	"Roboto Mono", "Roboto Mono Light","Roboto Mono Medium",
	"Source Code Pro Light", "Source Code Pro", "Source Code Pro Medium",
	"Tamsyn8x16",
	"Terminus",
	"Ubuntu Mono",

	"InputMono",
	"InputMonoCondensed",
]

# Some fonts have bitmap versions for small sizes and tt versions for bigger
# sizes. Bitmap fonts can't have aa, tt can. So the combinations of font size
# and aa mode has to bet set independently

# font_sizes contains the available sizes for the two aa modes

# For the overview mode we need font samples that should be the same length. Unfortunately there's sometimes little correlation between the size setting and the actual size. So the default size has to be set manually for many fonts.
default_size = 10
norm_sizes = {
	"Anonymous Pro": 11,
	"Consolas": 11,
	"Classic Console": 16,
	"Envy Code R": 11,
	"Fantasque Sans Mono": 11,
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

font_sizes = {}
font_sizes_default = {
	"aa0": [8, 9, 10, 11, 12],
	"aa1": [8, 9, 10, 11, 12]
}

def extend_font_sizes(font, sizes, aa_settings):
	def get_fontInfo(aa0_sizes, aa_param):
		if "aa1" in aa_param:
			aa1_sizes = aa0_sizes
		else:
			aa1_sizes = []

		return {
			"aa0": aa0_sizes,
			"aa1": aa1_sizes
		}
	def merge_fontInfo(fontInfo1, fontInfo2):
		return {
			"aa0": fontInfo1["aa0"] + fontInfo2["aa0"],
			"aa1": fontInfo1["aa1"] + fontInfo2["aa1"]
		}

	if font in font_sizes:
		font_sizes[font] = merge_fontInfo(font_sizes[font], get_fontInfo(sizes, aa_settings))
	else:
		font_sizes[font] = get_fontInfo(sizes, aa_settings)

extend_font_sizes("Anonymous Pro", [7,8,9,10], ["aa0"])
extend_font_sizes("Anonymous Pro", [11, 12], ["aa1", "aa0"])
extend_font_sizes("Classic Console", [16], ["aa0"])
extend_font_sizes("ProggyClean", [9], ["aa0"])
extend_font_sizes("Iosevka", [8, 9, 10, 11], ["aa1", "aa0"])
extend_font_sizes("Dina", [8,9,10], ["aa0"])
extend_font_sizes("ProFontWindows", [8,10,11,12], ["aa1", "aa0"])
extend_font_sizes("FixedSys Excelsior 3.01", [12], ["aa0"])
extend_font_sizes("Terminus", [10,11,12], ["aa0"])
extend_font_sizes("Tamsyn8x16", [10], ["aa0"])
extend_font_sizes("MonteCarlo", [10], ["aa0"])

font_infos = {}
for font_name in fonts_names:
	font_info = {"default": norm_sizes.get(font_name, default_size)}
	font_info.update(font_sizes.get(font_name, font_sizes_default))
	font_infos[font_name] = font_info

inputs = []

for font_name in fonts_names:
	font_info = font_infos[font_name]
	for theme in ["light", "dark"]:
		code_len = "long"
		for aa in ["aa1", "aa0"]:
			for size in font_info[aa]:
				input = [",".join([code_len, theme, font_name, str(size), aa]) + "\n"]
				inputs.extend(input)

		code_len = "short"
		for aa in ["aa1", "aa0"]:
			size = font_info["default"]
			if round(size) in font_info[aa]:
				input = [",".join([code_len, theme, font_name, str(size), aa]) + "\n"]
				inputs.extend(input)

# biggest:
# long,Input,12,aa1,dark

with open("ahk_input.csv", "w", encoding="utf-8") as f:
	f.write("".join(inputs))

with open("../font_info.js", "w", encoding="utf-8") as f:
	f.write("var fontList = {};\n".format(json.dumps(sorted(fonts_names, key=str.lower), indent="\t")))
	f.write("var fontInfos = {};".format(json.dumps(font_infos, indent="\t")))
