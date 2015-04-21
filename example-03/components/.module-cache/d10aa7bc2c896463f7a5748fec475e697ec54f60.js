var PreviewPanel = React.createClass({displayName: "PreviewPanel",
  getDefaultProps: function(){
    return {
      folder: "default"
    }
  },

  shouldComponentUpdate: function(){
    return false;
  },

  refreshFrame: function(){
    this.getDOMNode().contentDocument.location.reload(true)
  },

  render: function(){
    var fs              = Native.fs,
        path            = Native.path,
        join            = path.join,
        previewLocation = undefined,
        previewPath     = join(gui.App.dataPath, "editor-cache", this.props.folder, "preview.html");
      
  
    try {
      Native.fs.readFileSync(previewPath)
      previewLocation = previewPath
    } catch(e){
      "default-preview.html" 
    }

    return(
      React.createElement("iframe", {src: previewLocation, nwdisable: true})
    )
  }
})
