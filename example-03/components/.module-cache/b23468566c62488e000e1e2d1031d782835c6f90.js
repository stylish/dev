var LiveEditor = React.createClass({displayName: "LiveEditor",
  refreshPreview: _.debounce(function(){
    this.refs.preview_panel.refreshFrame()
  }, 300),

  toggleLiveEditorSettings: function(e){

  },
  
  render: function(){
    return(
      React.createElement("div", {className: "app live-editor"}, 
        React.createElement("div", {className: "app editor-panel-wrapper"}, 
          React.createElement(EditorPanel, {ref: "editor_panel", 
                       onEditorChange: this.refreshPreview, 
                       scriptContent: scriptContent, 
                       styleContent: styleContent, 
                       markupContent: markupContent})
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
