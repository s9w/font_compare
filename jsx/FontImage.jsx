function fontUrl(zoom, sampleSize, theme, fontName, size, aaMode){
    var url = "trimmed/";
    url += zoom+"x/";

    url += sampleSize+"_";
    url += (theme.toLowerCase()) + "_";
    url += fontName.replace(/ /g, "-")+"_"+size+"_"+aaMode+".png";
    return url;
}

module.exports = React.createClass({
    render: function(){
        var url1x = fontUrl(
            1,
            this.props.sampleSize,
            this.props.theme,
            this.props.fontName,
            this.props.sizeStr,
            this.props.aaStr);
        var url2x = fontUrl(
            2,
            this.props.sampleSize,
            this.props.theme,
            this.props.fontName,
            this.props.sizeStr,
            this.props.aaStr);
        return(
            <img
                src={(this.props.zoom==="2x")?url2x:url1x}
                srcSet={(this.props.zoom==="2x")?url2x:url1x + " 1x, "+url2x+" 2x"}
                />
        );
    }
});