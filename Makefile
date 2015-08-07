all: js/script.min.js

js/script.min.js: js/script.js
	uglifyjs js/script.js --compress --screw-ie8 --mangle -o js/script.min.js

js/script.js: jsx/* Makefile
	browserify jsx/Fonti.jsx -t babelify --outfile js/script.js


.PHONY: trimmed_default
trimmed_default: capture/ss/*.png
	mkdir trimmed\1x
	mkdir trimmed\2x
	mv capture/ss/* trimmed/1x
	mogrify -crop 1200x600+12+84 -trim trimmed/1x/*.png
	mogrify -background "#222222" -splice 1x0 trimmed/1x/short_dark_*_aa0.png
	mogrify -background "#fafafa" -splice 1x0 trimmed/1x/short_light_*_aa0.png
	cp trimmed/1x/*.png trimmed/2x
	mogrify -filter Point -resize 200% trimmed/2x/*.png

.PHONY: trimmed_gdipp
trimmed_gdipp: capture/ss/*.png
	mkdir trimmed\1x
	mkdir trimmed\2x
	mv capture/ss/* trimmed/1x
	mogrify -crop 1200x600+12+84 -trim trimmed/1x/*.png
	cp trimmed/1x/*.png trimmed/2x
	mogrify -filter Point -resize 200% trimmed/2x/*.png
