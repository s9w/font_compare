all: js/script.min.js

js/script.min.js: js/script.js
	uglifyjs js/script.js --compress --screw-ie8 --mangle -o js/script.min.js

js/script.js: jsx/* Makefile
	browserify jsx/Fonti.jsx -t babelify --outfile js/script.js


.PHONY: trimmed_default
trimmed_default: capture/ss/*.png
	mv capture/ss/* trimmed
	mogrify -crop 1888x1000+5+79 -trim trimmed/*.png
	mogrify -background "#222222" -splice 1x0 trimmed/short_dark_*_aa0.png
	mogrify -background "#fafafa" -splice 1x0 trimmed/short_light_*_aa0.png

.PHONY: trimmed_gdipp
trimmed_gdipp: capture/ss/*.png
	mv capture/ss/* trimmed
	mogrify -crop 1888x1000+5+79 -trim trimmed/*.png
