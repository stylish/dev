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
    var fs = Native.fs,
        path = Native.path,
        join = path.join,
        storagePath = join(gui.App.dataPath, "editor-cache", this.props.folder, "preview.html"),
        previewLocation = "default-preview.html"

    return(
      React.createElement("iframe", {src: previewLocation, nwdisable: true})
    )
  }
})
