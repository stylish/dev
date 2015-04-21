var LiveEditor = React.createClass({displayName: "LiveEditor",
  refreshPreview: _.debounce(function(){
    this.refs.preview_panel.refreshFrame()
  }, 300),

  toggleLiveEditorSettings: function(e){

  },

  render: function(){
    var scriptContent = fs.readFileSync("src/app/editor-panel/script.js"),
        styleContent  = fs.readFileSync("src/app/editor-panel/style.css"),
        markupContent = fs.readFileSync("src/app/editor-panel/markup-content.html")

    return(
      React.createElement("div", {className: "app live-editor"}, 
        React.createElement("div", {className: "app editor-panel-wrapper"}, 
          React.createElement(EditorPanel, {ref: "editor_panel", onPreviewChange: this.refreshPreview, scriptContent: scriptContent, styleContent: styleContent, markupContent: markupContent})
        ), 

        React.createElement("div", {className: "app preview-wrapper"}, 
          React.createElement("div", {className: "app hover toolbar"}, 
            React.createElement("i", {className: "glyphicon glyphicon-cog", onClick: this.toggleLiveEditorSettings})
          ), 
          React.createElement(PreviewPanel, {ref: "preview_panel"})
        )
      )
    )
  }
});
