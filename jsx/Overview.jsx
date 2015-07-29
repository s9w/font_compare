var urls = {
    "Anonymous Pro": "http://www.marksimonson.com/fonts/view/anonymous-pro",
    "Bitstream Vera Sans Mono": "https://www.gnome.org/fonts/",
    "DejaVu Sans Mono": "http://dejavu-fonts.org/",
    "Dina": "https://www.donationcoder.com/Software/Jibz/Dina/",
    "Envy Code R": "https://damieng.com/blog/2008/05/26/envy-code-r-preview-7-coding-font-released",
    "Fantasque Sans Mono": "https://github.com/belluzj/fantasque-sans",
    "Fira Mono": "https://mozilla.github.io/Fira/"
};

module.exports = React.createClass({
    selectFont(fontName){
        this.props.selectFont(fontName);
    },
    render: function(){
        var font_rows = [];
        for(let i=0; i<fontList.length; i++){
            let fontName = fontList[i];
            var aaMode;
            //console.log(fontName);
            if(this.props.useAA==="on")
                aaMode = (fontInfos[fontName]["sizes_aa1"].indexOf(fontInfos[fontName].defaultSize)!==-1? "aa1" : "aa0");
            else
                aaMode = "aa0";

            var fontElement;
            if(fontName in urls){
                fontElement = <td><a href={urls[fontName]}>{fontName}</a></td>;
            }else{
                fontElement = <td>{fontName}</td>;
            }
            font_rows.push(
                <tr key={i}>
                    {fontElement}
                    <td className={"aa_mode "+aaMode}></td>
                    <td>
                        <input
                            type="checkbox"
                            checked={this.props.selectedFonts.has(fontName)}
                            onChange={this.selectFont.bind(null, fontName)}
                            />
                    </td>
                    <td>
                        <img src={"trimmed/"+this.props.renderer+"/short_"+this.props.theme.toLowerCase()+"_"+fontName+"_"+fontInfos[fontName].defaultSize+"_"+aaMode+".png"} />
                    </td>
                </tr>
            )
        }

        return(
            <table>
                <tbody>
                {font_rows}
                </tbody>
            </table>
        );
    }
});
