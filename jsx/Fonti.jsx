var Overview = require('./Overview.jsx');

var Fonti = React.createClass({
    getInitialState() {
        return({
            mode: "Overview",
            theme: "Light",
            useAA: "on",
            renderer: "default",
            selectedFonts: new Set(["Consolas", "Source Code Pro", "ProggyClean"]),
            zoom: "1x"
        });
    },
    changeTest(settingName, newValue){
        var newState = {};
        newState[settingName] = newValue;
        this.setState(newState);
    },
    selectFont: function(fontName){
        var newSelectedFonts = this.state.selectedFonts;
        if(this.state.selectedFonts.has(fontName))
            newSelectedFonts.delete(fontName);
        else
            newSelectedFonts.add(fontName);
        this.setState({selectedFonts: newSelectedFonts});
    },
    render: function() {
        var content ="";
        if(this.state.mode==="Overview"){
            content = <Overview
                useAA={this.state.useAA}
                theme={this.state.theme}
                renderer={this.state.renderer}
                selectFont={this.selectFont}
                selectedFonts={this.state.selectedFonts}
                />;
        }
        else if(this.state.mode==="Compare"){
            var selectedFonts = [];
            for(let i=0; i<fontList.length; i++){
                let fontName = fontList[i];
                if(this.state.selectedFonts.has(fontName)){
                    selectedFonts.push(fontName);
                }
            }
            content =
                <Compare
                    selectedFonts={selectedFonts}
                    renderer={this.state.renderer}
                    theme={this.state.theme}
                    zoom={this.state.zoom}
                />;
        }

        return (
            <div className={this.state.theme}>
                <div className="borderBelow">
                    <Setting
                        choices={["Dark", "Light"]}
                        activeSetting={this.state.theme}
                        changeFunction={this.changeTest.bind(null, "theme")}
                        label="Theme"
                    />
                    <Setting
                        choices={["default", "gdipp"]}
                        activeSetting={this.state.renderer}
                        changeFunction={this.changeTest.bind(null, "renderer")}
                        label="Renderer"
                        />
                    <Setting
                        choices={["Overview", "Compare"]}
                        activeSetting={this.state.mode}
                        changeFunction={this.changeTest.bind(null, "mode")}
                        label="Mode"
                    />
                    {this.state.mode==="Overview"&&
                    <Setting
                        choices={["off", "on"]}
                        activeSetting={this.state.useAA}
                        changeFunction={this.changeTest.bind(null, "useAA")}
                        label="Font Anti-Alias"
                        />}
                    {this.state.mode==="Compare"&&
                    <Setting
                        choices={["1x", "2x"]}
                        activeSetting={this.state.zoom}
                        changeFunction={this.changeTest.bind(null, "zoom")}
                        label="Zoom"
                        />}
                </div>
                <div className="contentContainer">
                    {content}
                </div>
            </div>
        );
    }
});

var Compare = React.createClass({
    getInitialState() {
        var fontConfigs = {};
        for(let i=0; i<this.props.selectedFonts.length; i++){
            var fontName = this.props.selectedFonts[i];
            let defaultSizeInt = Math.round(fontInfos[fontName].defaultSize);
            fontConfigs[fontName] = {
                size: defaultSizeInt,
                aa: fontInfos[fontName]["sizes_aa1"].indexOf(defaultSizeInt)!==-1?"aa1":"aa0"
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
    render: function(){
        var fontElList = [];
        for(let i=0; i<this.props.selectedFonts.length; i++){
            let fontName = this.props.selectedFonts[i];

            let sizes = [];
            for(let j=0; j<fontInfos[fontName]["sizes_aa0"].length; j++){
                let size = fontInfos[fontName]["sizes_aa0"][j];
                var commaStr = (j<fontInfos[fontName]["sizes_aa0"].length-1)?",":"";
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
            if(fontInfos[fontName]["sizes_aa1"].indexOf(this.state.fontConfigs[fontName].size)!==-1) {
                aaSettings.push(
                    <span
                        className={"settingChoice" + (this.state.fontConfigs[fontName].aa==="aa1"?" settingActive":"")}
                        onClick={this.changeFontMode.bind(null, fontName, "aa", "aa1")}
                        key="1">
                        on</span>
                );
            }

            fontElList.push(
                <tr key={fontName}>
                    <td
                        className={"settingLabel" + (this.state.activeFont===fontName?" settingActive":"")}
                        onMouseOver={this.activateFont.bind(null, fontName)}>
                        {fontName}
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

        var imgUrl;
        if(this.props.zoom==="2x"){
            imgUrl = "trimmed/"+this.props.renderer+"/zoom/long_"+this.props.theme.toLowerCase()+"_"+this.state.activeFont+"_"+sizeStr+"_"+aaStr+".png"
        }else{
            imgUrl = "trimmed/"+this.props.renderer+"/long_"+this.props.theme.toLowerCase()+"_"+this.state.activeFont+"_"+sizeStr+"_"+aaStr+".png"
        }

        return(
            <div>
                <div className="borderBelow">
                    <table>
                        <tbody>
                            <tr>
                                <td>Font</td>
                                <td>Size</td>
                                <td>AA</td>
                            </tr>
                            {fontElList}
                        </tbody>
                    </table>
                </div>

                <div className={"fontContainer"}>
                    <img src={imgUrl} />
                </div>
            </div>
        );
    }
});

var Setting = React.createClass({
    changeSetting(newValue){
        this.props.changeFunction(newValue);
    },
    render: function(){
        var thisOuter = this;
        var buttons = this.props.choices.map(function(value, i){
            return <span
                className={"settingChoice"+(thisOuter.props.activeSetting===value?" settingActive":"")}
                onClick={thisOuter.changeSetting.bind(null, value)}
                key={i}>{value}</span>;
        });

        return(
            <div>
                <span className="settingLabel">{this.props.label}:</span>
                {buttons}
            </div>
        );
    }
});

React.render( <Fonti />, document.getElementById('container') );