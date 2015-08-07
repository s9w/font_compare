var Overview = require('./Overview.jsx');
var Compare = require('./Compare.jsx');

var Fonti = React.createClass({
    getInitialState() {
        return({
            mode: "Overview",
            theme: "Light",
            useAA: "default",
            selectedFonts: new Set(["Consolas", "Source Code Pro", "Ubuntu Mono", "Iosevka"]),
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
        if(fontName === "all"){
            if(this.state.selectedFonts.size === fontList.length){
                newSelectedFonts.clear();
            }else{
                newSelectedFonts = new Set(fontList);
            }
        }
        else{
            if(this.state.selectedFonts.has(fontName))
                newSelectedFonts.delete(fontName);
            else
                newSelectedFonts.add(fontName);
        }

        this.setState({selectedFonts: newSelectedFonts});
    },
    removeFont(fontName){
        var newSelectedFonts = this.state.selectedFonts;
        newSelectedFonts.delete(fontName);
        this.setState({
            selectedFonts: newSelectedFonts
        });
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
                    removeFont={this.removeFont}
                />;
        }

        return (
            <div className={this.state.theme} id="mainDiv">
                <div className="borderBelow">
                    <Setting
                        choices={["Dark", "Light"]}
                        activeSetting={this.state.theme}
                        changeFunction={this.changeTest.bind(null, "theme")}
                        label="Theme"
                    />

                    <Setting
                        choices={["Overview", "Compare"]}
                        activeSetting={this.state.mode}
                        changeFunction={this.changeTest.bind(null, "mode")}
                        label="Mode"
                        />

                    {this.state.mode==="Overview"&&
                    <Setting
                        choices={["off", "default", "gdipp"]}
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