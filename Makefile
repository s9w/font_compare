all: js/script.min.js

js/script.min.js: js/script.js
	uglifyjs js/script.js --compress --screw-ie8 --mangle -o js/script.min.js

js/script.js: jsx/* Makefile
	browserify jsx/Fonti.jsx -t babelify --outfile js/script.js


.PHONY: trimmed
trimmed: capture/ss/*.png
	mv capture/ss/* trimmed
	mogrify -crop 1200x600+12+84 -trim trimmed/*.png
	mogrify -background "#222222" -splice 1x0 trimmed/short_dark_*_aa0.png
	mogrify -background "#fafafa" -splice 1x0 trimmed/short_light_*_aa0.png
	cp trimmed/long_*.png trimmed/zoom
	mogrify -filter Point -resize 200% trimmed/zoom/*.png

.PHONY: trimmed
trimmed2: capture/ss/*.png
	mv capture/ss/* trimmed
	mogrify -crop 1200x600+12+84 -trim trimmed/*.png
	cp trimmed/long_*.png trimmed/zoom
	mogrify -filter Point -resize 200% trimmed/zoom/*.png
