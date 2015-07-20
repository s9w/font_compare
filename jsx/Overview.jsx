module.exports = React.createClass({
    selectFont(fontName){
        this.props.selectFont(fontName);
    },
    render: function(){
        var font_rows = [];
        for(let i=0; i<fontList.length; i++){
            let fontName = fontList[i];
            var aaMode;
            if(this.props.useAA==="on")
                aaMode = (fontInfo[fontName].hasAA[fontInfo[fontName].defaultSize] ? "aa1" : "aa0");
            else
                aaMode = "aa0";

            font_rows.push(
                <tr key={i}>
                    <td>{fontName}</td>
                    <td className={"aa_mode "+aaMode}></td>
                    <td>
                        <input
                            type="checkbox"
                            checked={this.props.selectedFonts.has(fontName)}
                            onChange={this.selectFont.bind(null, fontName)}
                            />
                    </td>
                    <td className={"bg_"+this.props.theme}>
                        <img src={"trimmed/short_"+this.props.theme+"_"+fontName+"_"+fontInfo[fontName].defaultSize+"_"+aaMode+".png"} />
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
