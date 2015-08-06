# Programming font comparison

Compares the most common fixed-width programming fonts. All font samples are from actual screenshots of the font taken under Windows 7 with Sublime Text.

There is also the choice between AA (anti-aliasing) turned off and two other settings: "default" and "gdipp". Those relate to the method used to smooth the font. The default mode is Windows ClearType. [*gdipp*](https://code.google.com/p/gdipp/) is an alternative open-source text renderer that aims to "bring to you the effect of text like Mac OS and Linux". This is an optional install for Windows and can not be guaranteed to exactly replicate the rendering of other operating systems.

Both renderers yield the same result without AA, therefore those three rendering options are combined. Note that the difference between default and gdipp rendering varies between fonts. There are also bitmap fonts that are stored pixel-perfect and therefore should not (and usually can't) be anti-aliased.
 
In the **overview** mode you can quickly compare all available fonts. The green/red square is an indicator for the AA mode. Since there is a global AA toggle it will always stay red (off) for bitmap fonts. The checkboxes select fonts to be compared in more detail in the second mode.
 
When **comparing**, the code sample is bigger and there is a wider range of sizes to chose from. Size and rendering mode are set for each font individually. There's always just one sample rendered with the font that's currently selected. Switching between fonts can be done either by hovering over the name or using the keyboard hotkeys (1-9). There's also a 2x zoom option for close inspection or people with really high dpi screens. The zoom is filterless without interpolation (1 pixel to 4 pixel).

The capturing process is automated so requests for fonts or changes to the code sample are welcome.

## code sample
The code sample was chosen to showcase most common characters and problems with fonts. The characters in the first line after the alphanumerics are:

	- the number one
	- Big i (indiana)
	- small L (lambda)
	- vertical bar
	- big L
	
	- number eight
	- number zero
	- big O (oregano)
	- small o
	
	- number five
	- big S (superman)
	
Followed by some brackets, special characters, double underscore and a "hashtag".

## Font-specific notes
- **Monoid** and **Input** are both highly customizable, offering alternatives for commonly controversial letters. This site features only the default versions.
- **Office Code Pro** and **Meslo** also offer a Dotted Zero version.
