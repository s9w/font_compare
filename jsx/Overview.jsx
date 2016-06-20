var urls = {
    "Anonymous Pro": "http://www.marksimonson.com/fonts/view/anonymous-pro",
    "Bitstream Vera Sans Mono": "https://www.gnome.org/fonts/",
    "Courier Prime": "http://quoteunquoteapps.com/courierprime/",
    "Classic Console": "http://webdraft.hu/fonts/classic-console/",
    "DejaVu Sans Mono": "http://dejavu-fonts.org/",
    "Dina": "https://www.donationcoder.com/Software/Jibz/Dina/",
    "Envy Code R": "https://damieng.com/blog/2008/05/26/envy-code-r-preview-7-coding-font-released",
    "Fantasque Sans Mono": "https://github.com/belluzj/fantasque-sans",
    "Fira Mono": "https://mozilla.github.io/Fira/",
    "FixedSys Excelsior 3.01": "http://www.fixedsysexcelsior.com/",
    "Hack": "https://github.com/chrissimpkins/Hack",
    "Hermit": "https://pcaro.es/p/hermit/",
    "IBM 3270": "https://github.com/rbanffy/3270font",
    "Inconsolata-dz": "http://nodnod.net/2009/feb/12/adding-straight-single-and-double-quotes-inconsola/",
    "InputMono": "http://input.fontbureau.com/",
    "InputMonoCondensed": "http://input.fontbureau.com/",
    "Iosevka": "http://be5invis.github.io/Iosevka/",
    "Liberation Mono": "https://fedorahosted.org/liberation-fonts/",
    "Luculent": "http://eastfarthing.com/luculent/",
    "M+ 1m light": "http://mplus-fonts.osdn.jp/mplus-outline-fonts/index-en.html",
    "M+ 1m medium": "http://mplus-fonts.osdn.jp/mplus-outline-fonts/index-en.html",
    "M+ 1m regular": "http://mplus-fonts.osdn.jp/mplus-outline-fonts/index-en.html",
    "Meslo LG L": "https://github.com/andreberg/Meslo-Font",
    "Meslo LG M": "https://github.com/andreberg/Meslo-Font",
    "Meslo LG S": "https://github.com/andreberg/Meslo-Font",
    "Monofur": "http://eurofurence.net/monofur.html",
    "Monoid": "http://larsenwork.com/monoid/",
    "monoOne": "https://github.com/madmalik/monoOne",
    "mononoki": "https://madmalik.github.io/mononoki/",
    "NanumGothicCoding": "http://dev.naver.com/projects/nanumfont/download/",
    "OCR A Extended": "http://cooltext.com/Download-Font-OCR+A+Extended",
    "Office Code Pro": "https://github.com/nathco/office-code-pro",
    "Office Code Pro Light": "https://github.com/nathco/office-code-pro",
    "Office Code Pro Medium": "https://github.com/nathco/office-code-pro",
    "OpenDyslexicMono": "http://opendyslexic.org/",
    "PragmataPro": "http://www.fsd.it/fonts/pragmatapro.htm",
    "ProFontWindows": "http://tobiasjung.name/profont/",
    "ProggyClean": "http://www.proggyfonts.net/",
    "Source Code Pro": "http://adobe-fonts.github.io/source-code-pro/",
    "Source Code Pro Light": "http://adobe-fonts.github.io/source-code-pro/",
    "Source Code Pro Medium": "http://adobe-fonts.github.io/source-code-pro/",
    "Tamsyn8x16": "http://www.fial.com/~scott/tamsyn-font/",
    "Terminus": "http://terminus-font.sourceforge.net/",
    "Ubuntu Mono": "http://font.ubuntu.com/",
    "PT Mono": "http://www.paratype.com/public/",
    "MonteCarlo": "http://www.bok.net/MonteCarlo/",
    "Mensch": "http://robey.lag.net/2010/06/21/mensch-font.html"
};

function isInArray(array, element){
    return array.indexOf(element) !== -1;
}

var FontImage = require('./FontImage.jsx');

module.exports = React.createClass({
    selectFont(fontName){
        this.props.selectFont(fontName);
    },
    render: function(){
        var font_rows = [];
        for(let i=0; i<fontList.length; i++){
            let fontName = fontList[i];

            var defaultSize;
            if(this.props.overviewSize === "small" || !(isInArray(fontInfos[fontName]["aa1"], fontInfos[fontName]["defaultBig"]))){
                defaultSize = fontInfos[fontName]["defaultSmall"];
            }else{
                defaultSize = fontInfos[fontName]["defaultBig"];
            }

            var aaMode;
            if(this.props.useAA!=="off" && isInArray(fontInfos[fontName]["aa1"], defaultSize)) {
                aaMode = {"default": "aa1", "gdipp": "aa2"}[this.props.useAA];
            }
            else {
                aaMode = "aa0";
            }

            var fontElement;
            if(fontName in urls){
                fontElement = <td><a href={urls[fontName]}>{fontName}</a></td>;
            }else{
                fontElement = <td>{fontName}</td>;
            }

            font_rows.push(
                <tr key={i}>
                    {fontElement}
                    <td className={"aa_mode "+ ((aaMode==="aa0")?"aa0":"aa1")}>
                        {(aaMode==="aa0")?"off":"on"}
                    </td>
                    <td>
                        <input
                            type="checkbox"
                            checked={this.props.selectedFonts.has(fontName)}
                            onChange={this.selectFont.bind(null, fontName)}
                            />
                    </td>
                    <td>
                        <FontImage
                            sampleSize="short"
                            theme={this.props.theme}
                            fontName={fontName}
                            sizeStr={defaultSize}
                            aaStr={aaMode}
                            />
                    </td>
                </tr>
            )
        }

        return(
            <table>
                <tbody>
                <tr className="firstRow">
                    <td>Font</td>
                    <td>AA</td>
                    <td>
                        <input
                            type="checkbox"
                            checked={this.props.selectedFonts.size === fontList.length}
                            onChange={this.selectFont.bind(null, "all")}
                        />
                    </td>
                    <td></td>
                </tr>
                {font_rows}
                </tbody>
            </table>
        );
    }
});
