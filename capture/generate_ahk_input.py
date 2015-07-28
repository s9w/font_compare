import json

fonts = ["Consolas", "Monoid", 
"Source Code Pro Light", 
"Source Code Pro", 
"Source Code Pro Medium", 
"Office Code Pro Light", 
"Office Code Pro", 
"Office Code Pro Medium", 
"Ubuntu Mono",
"Bitstream Vera Sans Mono", "Input", "Meslo LG S", "Meslo LG M", "Meslo LG L", 
"DejaVu Sans Mono", "Droid Sans Mono", "Fira Mono", "Envy Code R", "monoOne", 
"Fantasque Sans Mono", "Hermit", "Liberation Mono", "Iosevka", "OCR A Extended", "Inconsolata-dz",
"Luculent",
"Anonymous Pro", "ProggyClean", "Dina", "ProFontWindows", "FixedSys Excelsior 3.01", "Terminus"]

# settings
aa_defaults = ["aa1", "aa0"]
size_defaults = [8,9,10,11,12]
code_length_choices = ["short", "long"]
theme_choices = ["light", "dark"]

cfg_sizes_aa = {}
font_sizes = {}
has_size_aa = {}
def extend_cfg(font, sizes, aa_settings):
	part = [(size, aa) for size in sizes for aa in aa_settings]
	if font in cfg_sizes_aa:
		cfg_sizes_aa[font].extend(part)
	else:
		cfg_sizes_aa[font] = part

	if font in font_sizes:
		font_sizes[font].extend(sizes)
	else:
		font_sizes[font] = sizes

	aa_bool = "aa1" in aa_settings
	size_aa = {size: aa_bool for size in sizes}
	if font in has_size_aa:
		has_size_aa[font].update(size_aa)
	else:
		has_size_aa[font] = size_aa

extend_cfg("Anonymous Pro", [7,8,9,10], ["aa0"])
extend_cfg("Anonymous Pro", [11,12], aa_defaults)
extend_cfg("ProggyClean", [9], ["aa0"])
extend_cfg("Iosevka", [8,9,10,11], aa_defaults)
extend_cfg("Dina", [8,9,10], ["aa0"])
extend_cfg("ProFontWindows", [7,8,9,10,11,12], ["aa0"])
extend_cfg("FixedSys Excelsior 3.01", [12], ["aa0"])
extend_cfg("Terminus", [10,11,12], ["aa0"])
default_cfg = [(size, aa) for size in size_defaults for aa in aa_defaults]

inputs = []
js_fontInfo = {}

default_norm_size = 9
norm_sizes = {
	"Envy Code R": 10,
	"Fantasque Sans Mono": 10,
	"Input": 8,
	"Monoid": 10,
	"ProFontWindows": 11,
	"Ubuntu Mono": 10,
	"Iosevka": 10,
	"FixedSys Excelsior 3.01": 12,
	"Terminus": 11,
}


def font_modes(sizes_aa):
	modes = {}
	for size, aa in sizes_aa:
		if size in modes:
			modes[size].append(aa)
		else:
			modes[size] = [aa]
	return modes


for font in fonts:
	norm_size = norm_sizes.get(font, default_norm_size)
	has_norm_size_aa = False
	
	sizes_aa = cfg_sizes_aa.get(font, default_cfg)
	if (norm_size, "aa1") in sizes_aa:
		has_norm_size_aa = True

	inputs.extend( [",".join([code_len, theme, font, str(s), aa])+"\n"
		for s, aa in sizes_aa
		for theme in theme_choices
		for code_len in code_length_choices
		])

	if has_norm_size_aa:
		aa_string = "aa1"
	else:
		aa_string = "aa0"
	js_fontInfo[font] = {
		"sizes": font_sizes.get(font, size_defaults),
		"hasAA": has_size_aa.get(font, {size: True for size in size_defaults}),
		"defaultSize": norm_size
		}
	# js_list_short.append([font, js_filename])

# biggest:
# long,Input,12,aa1,dark

with open("ahk_input.csv", "w", encoding="utf-8") as f:
	f.write("".join(inputs))

# print(js_list_short)
with open("../font_info.js", "w", encoding="utf-8") as f:
	f.write("var fontList = {};\n".format(json.dumps(fonts, indent="\t")))
	f.write("var fontInfo = {};".format(json.dumps(js_fontInfo, indent="\t")))
# print(len(js_list_short))

# with open("font_info.json", "w", encoding="utf-8") as f:
# 	f.write("".join(inputs))