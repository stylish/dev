var PreviewPanel = React.createClass({displayName: "PreviewPanel",
  shouldComponentUpdate: function(){
    return false;
  },

  refreshFrame: function(){
    this.getDOMNode().contentDocument.location.reload(true)
  },

  render: function(){
    return React.createElement("iframe", {nwdisable: true, src:"editor-panel/preview.html", width:"100%", height:"100%", style:{border:"0px"}})
  }
})
