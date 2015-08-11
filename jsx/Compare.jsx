var FontImage = require('./FontImage.jsx');

module.exports = React.createClass({
    getInitialState() {
        var fontConfigs = {};
        for(let i=0; i<this.props.selectedFonts.length; i++){
            var fontName = this.props.selectedFonts[i];
            let defaultSizeInt = Math.round(fontInfos[fontName].defaultSmall);
            fontConfigs[fontName] = {
                size: defaultSizeInt,
                aa: fontInfos[fontName]["aa1"].indexOf(defaultSizeInt)!==-1?"aa1":"aa0"
            };
        }

        return({
            activeFont: this.props.selectedFonts[0],
            fontConfigs: fontConfigs
        });
    },
    changeFontMode(fontName, setting, newValue){
        var newFontConfigs = this.state.fontConfigs;
        newFontConfigs[fontName][setting] = newValue;
        this.setState({
            fontConfigs: newFontConfigs
        });
    },
    activateFont(fontName){
        this.setState({
            activeFont: fontName
        });
    },
    removeFont(fontName){
        this.props.removeFont(fontName);
    },
    onKeyDown(event){
        if(event.which >= 49 && event.which <= 57){
            var fontIndex = event.which - 48 - 1;
            if(fontIndex < this.props.selectedFonts.length){
                this.activateFont(this.props.selectedFonts[fontIndex]);
            }
        }
    },
    componentDidMount: function() {
        document.addEventListener('keydown', this.onKeyDown);
    },

    componentWillUnmount: function() {
        document.removeEventListener('keydown', this.onKeyDown);
    },
    render: function(){
        if(this.props.selectedFonts.length===0){
            return(
                <div>No fonts selected</div>
            );
        }

        var fontElList = [];
        for(let i=0; i<this.props.selectedFonts.length; i++){
            let fontName = this.props.selectedFonts[i];

            let sizes = [];
            for(let j=0; j<fontInfos[fontName]["aa0"].length; j++){
                let size = fontInfos[fontName]["aa0"][j];
                var commaStr = (j<fontInfos[fontName]["aa0"].length-1)?",":"";
                sizes.push(
                    <span
                        onClick={this.changeFontMode.bind(null, fontName, "size", size)}
                        className={"settingChoice" + (size===this.state.fontConfigs[fontName].size?" settingActive":"")}
                        key={size}>
                        {size+commaStr}
                    </span>
                );
            }

            let aaSettings = [];
            aaSettings.push(
                <span
                    className={"settingChoice" + (this.state.fontConfigs[fontName].aa==="aa0"?" settingActive":"")}
                    onClick={this.changeFontMode.bind(null, fontName, "aa", "aa0")}
                    key="0">
                    off</span>
            );
            if(fontInfos[fontName]["aa1"].indexOf(this.state.fontConfigs[fontName].size)!==-1) {
                aaSettings.push(
                    <span
                        className={"settingChoice" + (this.state.fontConfigs[fontName].aa==="aa1"?" settingActive":"")}
                        onClick={this.changeFontMode.bind(null, fontName, "aa", "aa1")}
                        key="1">
                        default</span>
                );
                aaSettings.push(
                    <span
                        className={"settingChoice" + (this.state.fontConfigs[fontName].aa==="aa2"?" settingActive":"")}
                        onClick={this.changeFontMode.bind(null, fontName, "aa", "aa2")}
                        key="2">
                        gdipp</span>
                );
            }

            var hotkeyStr = "( )";
            if(i<9){
                hotkeyStr = "(" + (i+1) + ")"
            }
            fontElList.push(
                <tr key={fontName}>
                    <td
                        className="button"
                        onClick={this.removeFont.bind(null, fontName)}>X</td>
                    <td
                        className={"settingLabel" + (this.state.activeFont===fontName?" settingActive":"")}
                        onMouseOver={this.activateFont.bind(null, fontName)}>
                        {hotkeyStr} {fontName}
                    </td>
                    <td>
                        {sizes}
                    </td>
                    <td>
                        {aaSettings}
                    </td>
                </tr>
            );
        }

        var sizeStr = this.state.fontConfigs[this.state.activeFont].size;
        var aaStr = this.state.fontConfigs[this.state.activeFont].aa;

        return(
            <div>
                <div className="borderBelow">
                    <table>
                        <tbody>
                        <tr className="firstRow">
                            <td></td>
                            <td>(Key) Font</td>
                            <td>Size</td>
                            <td>AA</td>
                        </tr>
                        {fontElList}
                        </tbody>
                    </table>
                </div>

                <div className={"fontContainer"}>
                    <FontImage
                        sampleSize="long"
                        theme={this.props.theme}
                        fontName={this.state.activeFont}
                        sizeStr={sizeStr}
                        aaStr={aaStr}
                    />
                </div>
            </div>
        );
    }
});