import json

# Some fonts have bitmap versions for small sizes and tt versions for bigger sizes. Bitmap fonts
# can't have aa, tt can. So the combinations of font size and aa mode has to bet set independently.

# For the overview mode we need font samples that should be the same length. Unfortunately there's
# sometimes little correlation between the size setting and the actual size. So the default size
# has to be set manually for many fonts.

fonts_names = []
font_infos = {}

font_sizes_default = {
    "aa0": [8, 9, 10, 11, 12,14, 20],
    "aa1": [8, 9, 10, 11, 12,14, 20]
}


def add_font(name, default_size_small=12, default_size_big=20, aa_sizes=font_sizes_default):
    fonts_names.append(name)
    font_info = dict(aa_sizes)
    font_info["defaultSmall"] = default_size_small
    font_info["defaultBig"] = default_size_big
    font_infos[name] = font_info


add_font(name="Anonymous Pro", default_size_small=14, default_size_big=22, aa_sizes={"aa0": [7,8,9,10,11,12,14,22], "aa1": [11,12,14,22]})
add_font(name="Bitstream Vera Sans Mono")
add_font(name="Consolas", default_size_small=14, default_size_big=22, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 22],"aa1": [8, 9, 10, 11, 12,14, 22]})
add_font(name="Courier Prime")
add_font(name="Classic Console", default_size_small=15, aa_sizes={"aa0": [15], "aa1": []})
add_font(name="DejaVu Sans Mono")
add_font(name="Dina", default_size_small=10, aa_sizes={"aa0": [8,9,10], "aa1": []})
add_font(name="Droid Sans Mono")
add_font(name="Envy Code R", default_size_small=14, default_size_big=22, aa_sizes={"aa0": [8, 9, 10, 11, 12, 14,22],"aa1": [8, 9, 10, 11, 12, 14,22]})
add_font(name="Fantasque Sans Mono", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 23],"aa1": [8, 9, 10, 11, 12,14,23]})
add_font(name="Fira Mono")
add_font(name="FixedSys Excelsior 3.01", default_size_small=12, aa_sizes={"aa0": [12], "aa1": []})
add_font(name="Hermit", default_size_small=13, aa_sizes={"aa0": [8, 9, 10, 11, 12,13,14, 20],"aa1": [8, 9, 10, 11, 12,13,14, 20]})
add_font(name="Inconsolata-dz")
add_font(name="Iosevka", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8,9,10,11,12,14,23], "aa1": [8,9,10,11,12,14,23]})
add_font(name="Liberation Mono")
add_font(name="Luculent", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 23],"aa1": [8, 9, 10, 11, 12,14, 23]})
add_font(name="Luxi Mono")
add_font(name="M+ 1m regular", default_size_small=15, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14,15, 23],"aa1": [8, 9, 10, 11, 12,15,15, 23]})
add_font(name="M+ 1m medium", default_size_small=15, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14,15, 23],"aa1": [8, 9, 10, 11, 12,15,15, 23]})
add_font(name="M+ 1m light", default_size_small=15, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14,15, 23],"aa1": [8, 9, 10, 11, 12,15,15, 23]})
add_font(name="Menlo")
add_font(name="Mensch")
add_font(name="Meslo LG S")
add_font(name="Meslo LG M")
add_font(name="Meslo LG L")
add_font(name="Monofur", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 23],"aa1": [8, 9, 10, 11, 12, 14,23]})
add_font(name="Monoid", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 23],"aa1": [8, 9, 10, 11, 12,14,23]})
add_font(name="monoOne", default_size_small=13, aa_sizes={"aa0": [8, 9, 10, 11, 12,13,14, 20],"aa1": [8, 9, 10, 11, 12,13,14, 20]})
add_font(name="MonteCarlo", default_size_small=10, aa_sizes={"aa0": [10], "aa1": []})
add_font(name="OCR A Extended")
add_font(name="Office Code Pro Light")
add_font(name="Office Code Pro")
add_font(name="Office Code Pro Medium")
add_font(name="OpenDyslexicMono", default_size_small=10, default_size_big=16, aa_sizes={"aa0": [8, 9, 10, 11, 12, 16],"aa1": [8, 9, 10, 11, 12, 16]})
add_font(name="PragmataPro", default_size_small=14, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14, 23],"aa1": [8, 9, 10, 11, 12,14, 23
                                                                                                                         ]})
add_font(name="ProFontWindows", default_size_small=14, default_size_big=24, aa_sizes={"aa0": [8,10,11,12,14,24], "aa1": [8,10,11,12,14,24]})
add_font(name="ProggyClean", default_size_small=9, aa_sizes={"aa0": [9], "aa1": []})
add_font(name="PT Mono")
add_font(name="Roboto Mono")
add_font(name="Roboto Mono Light")
add_font(name="Roboto Mono Medium")
add_font(name="Source Code Pro Light")
add_font(name="Source Code Pro")
add_font(name="Source Code Pro Medium")
add_font(name="Tamsyn8x16", default_size_small=10, aa_sizes={"aa0": [10], "aa1": []})
add_font(name="Terminus", default_size_small=14, default_size_big=24, aa_sizes={"aa0": [10,11,12,14,24], "aa1": []})
add_font(name="Ubuntu Mono", default_size_small=15, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,15, 23],"aa1": [8, 9, 10, 11, 12,15, 23]})
add_font(name="InputMono", default_size_big=19, aa_sizes={"aa0": [8, 9, 10, 11, 12, 19],"aa1": [8, 9, 10, 11, 12, 19]})
add_font(name="InputMonoCondensed", default_size_big=19, aa_sizes={"aa0": [8, 9, 10, 11, 12, 19],"aa1": [8, 9, 10, 11, 12, 19]})
add_font(name="Hack", default_size_small=13, aa_sizes={"aa0": [8, 9, 10, 11, 12,13,14, 20],"aa1": [8, 9, 10, 11, 12,13,14, 20]})
add_font(name="Andale Mono")
add_font(name="Lucida Console")
add_font(name="mononoki", default_size_small=13, default_size_big=21, aa_sizes={"aa0": [8, 9, 10, 11, 12,13,14,21],"aa1": [8, 9, 10, 11, 12,13,14,21]})
add_font(name="NanumGothicCoding", default_size_small=15, default_size_big=23, aa_sizes={"aa0": [8, 9, 10, 11, 12,14,15,23],"aa1": [8, 9, 10, 11, 12,14,15,23]})
add_font(name="Anka/Coder")
add_font(name="SF Mono", aa_sizes={"aa0": [10, 11, 12,14, 20],"aa1": [10, 11, 12,14, 20]})
add_font(name="Space Mono")
add_font(name="IBM 3270", default_size_small=12, default_size_big=22, aa_sizes={"aa0": [11,12,16,22],"aa1": [11,12,16,22]})

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
            size = font_info["defaultSmall"]
            if font_info[aa] and size >= font_info[aa][0] and size <= font_info[aa][-1]:
                input = [",".join([code_len, theme, font_name, str(size), aa]) + "\n"]
                inputs.extend(input)

            size = font_info["defaultBig"]
            if size in font_info[aa]:
                input = [",".join([code_len, theme, font_name, str(size), aa]) + "\n"]
                inputs.extend(input)

with open("ahk_input.csv", "w", encoding="utf-8") as f:
    f.write("".join(inputs))

with open("../font_info.js", "w", encoding="utf-8") as f:
    f.write("var fontList = {};\n".format(json.dumps(sorted(fonts_names, key=str.lower), indent="\t")))
    f.write("var fontInfos = {};".format(json.dumps(font_infos, indent="\t")))
