# [Programming font comparison](http://www.s9w.io/font_compare/)

Compares the most common fixed-width programming fonts. All font samples are from actual screenshots of the font taken under Windows 7 with Sublime Text.

There is the choice between AA (anti-aliasing) turned off and two other rendering settings: ClearType and gdipp. ClearType is the default for Windows, [*gdipp*](https://code.google.com/p/gdipp/) is an alternative open-source text renderer that aims to "bring to you the effect of text like Mac OS and Linux". This is an optional install for Windows and can not be guaranteed to exactly replicate the rendering of other operating systems.

Both renderers yield the same result without AA, therefore those three rendering options are combined. Note that the difference between ClearType and gdipp rendering varies between fonts. There are also bitmap fonts that are stored pixel-perfect and therefore should not (and usually can't) be anti-aliased.
 
In the **overview** mode you can quickly compare all available fonts. The green/red square is an indicator for the AA mode. Since there is a global AA toggle it will always stay red (off) for bitmap fonts. The checkboxes select fonts to be compared in more detail in the second mode.
 
When **comparing**, the code sample is bigger and there is a wider range of sizes to chose from. Size and rendering mode are set for each font individually. There's always just one sample rendered with the font that's currently selected. Switching between fonts can be done either by hovering over the name or using the keyboard hotkeys (1-9). There's also a 2x zoom option for close inspection or people with really high dpi screens. The zoom is filterless without interpolation (1 pixel to 4 pixel).

The capturing process is automated so requests for fonts or changes to the code sample are welcome.

## code sample

![code sample image](http://s9w.github.io/font_compare/trimmed/long_light_Consolas_14_aa1.png)

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
	
Followed by some brackets, special characters and double underscore among other things. In this sequence there are three different kinds of dashes. The first is a normal dash or "Hyphen-Minus": "-" ([U+002D](https://symbl.cc/en/002D/)), then an en dash ([U+2013](https://symbl.cc/en/2013/)), then an em dash ([U+2014](https://symbl.cc/en/2014/)).
 
Then come a number of different quotation marks. I'll list the unicodes to avoid confusion

- straight double: "q" ([U+0022](https://symbl.cc/en/0022/))
- straight single / apostrophe: 'q' ([U+0027](https://symbl.cc/en/0027/))
- curly/curved double left and right: �q� ([U+201C](https://symbl.cc/en/201C/) and [U+201D](https://symbl.cc/en/201D/))
- curly/curved single left and right: �q� ([U+2018](https://symbl.cc/en/2018/) and [U+2019](https://symbl.cc/en/2019/))

The third line has a couple of unicode characters: The plusminus sign, Ellipsis, multiplication sign, middle dot.

The big code sample contains a **bold** and a *italic* word in the 11th line: `render` is rendered bold, `function` is italic. Of course only if the font supports it.

## Font-specific notes
- **Monoid** and **Input** are both highly customizable, offering alternatives for commonly controversial letters. This site features only the default versions.
- **Office Code Pro** and **Meslo** also offer a Dotted Zero version.
