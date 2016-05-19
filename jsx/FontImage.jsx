function fontUrl(sampleSize, theme, fontName, size, aaMode){
    var url = "trimmed/";

    url += sampleSize+"_";
    url += (theme.toLowerCase()) + "_";

    var sizeStr = "";
    if(sampleSize === "long"){
        sizeStr = size;
    }else{
        if(size > 15)
            sizeStr = "big";
        else
            sizeStr = "small";
    }

    url += fontName.replace(/ /g, "-").replace(/\//g, "-")+"_"+sizeStr+"_"+aaMode+".png";
    return url;
}

module.exports = React.createClass({
    render: function(){
        var url = fontUrl(
            this.props.sampleSize,
            this.props.theme,
            this.props.fontName,
            this.props.sizeStr,
            this.props.aaStr);
        return(
            <img
                src={url}
                srcSet={url+" 1x " + url+" 2x"}
                />
        );
    }
});