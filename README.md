# [Programming font comparison](http://s9w.github.io/font_compare/)

Compares the most common fixed-width programming fonts. All font samples are from actual screenshots of the font taken under Windows 7 with Sublime Text.

There is also the choice between AA (anti-aliasing) turned off and two other settings: "default" and "gdipp". Those relate to the method used to smooth the font. The default mode is Windows ClearType. [*gdipp*](https://code.google.com/p/gdipp/) is an alternative open-source text renderer that aims to "bring to you the effect of text like Mac OS and Linux". This is an optional install for Windows and can not be guaranteed to exactly replicate the rendering of other operating systems.

Both renderers yield the same result without AA, therefore those three rendering options are combined. Note that the difference between default and gdipp rendering varies between fonts. There are also bitmap fonts that are stored pixel-perfect and therefore should not (and usually can't) be anti-aliased.
 
In the **overview** mode you can quickly compare all available fonts. The green/red square is an indicator for the AA mode. Since there is a global AA toggle it will always stay red (off) for bitmap fonts. The checkboxes select fonts to be compared in more detail in the second mode.
 
When **comparing**, the code sample is bigger and there is a wider range of sizes to chose from. Size and rendering mode are set for each font individually. There's always just one sample rendered with the font that's currently selected. Switching between fonts can be done either by hovering over the name or using the keyboard hotkeys (1-9). There's also a 2x zoom option for close inspection or people with really high dpi screens. The zoom is filterless without interpolation (1 pixel to 4 pixel).

The capturing process is automated so requests for fonts or changes to the code sample are welcome.

## code sample
The code sample was chosen to showcase most common characters and problems with fonts. The characters in the second line under the alphanumerics are:

	- 1: The number one
	- I: Big i (Indiana)
	- l: Small L (Lambda)
	- |: Vertical bar
	- L: Big L
	
	
	- 8: number eight
	- 0: number zero
	- O: big O (Oregano)
	- o: small O
	
	
	- number five
	- big S (superman)
	
Followed by some brackets, special characters and double underscore among other things. Then come a number of different quotation marks. I'll list the unicodes to avoid confusion

- straight double: "q" ([U+0022](http://unicode-table.com/en/0022/))
- straight single / apostrophe: 'q' ([U+0027](http://unicode-table.com/en/0027/))
- curly/curved double left and right: “q” ([U+201C](http://unicode-table.com/en/201C/) and [U+201D](http://unicode-table.com/en/201D/))
- curly/curved single left and right: ‘q’ ([U+2018](http://unicode-table.com/en/2018/) and [U+2019](http://unicode-table.com/en/2019/))

The big code sample contains a **bold** and a *italic* word in the 10th line: `render` is rendered bold, `function` is italic. Of course only if the font supports it.

## Font-specific notes
- **Monoid** and **Input** are both highly customizable, offering alternatives for commonly controversial letters. This site features only the default versions.
- **Office Code Pro** and **Meslo** also offer a Dotted Zero version.
