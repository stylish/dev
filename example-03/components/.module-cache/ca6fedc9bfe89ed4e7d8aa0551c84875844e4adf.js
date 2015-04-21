(function(){
  var EditorPanel = React.createClass({displayName: "EditorPanel",
    getDefaultProps: function(){
      return {
        markupMode: "htmlmixed",
        scriptMode: "javascript",
        styleMode: "css",
        folder: "default"
      }
    },
     
    render: function(){
      var props       = this.props,
          state       = this.state || {},
          markupMode  = state.markupMode || props.markupMode,
          styleMode   = state.styleMode || props.styleMode,
          scriptMode  = state.scriptMode || props.scriptMode;

      return(
        React.createElement("div", {className: "app editor-panel"}, 
          React.createElement(EditorPanelSettings, {visible: !!!state.settingsVisible}), 

          React.createElement(Editor, {ref: "markup_editor", 
                  title: "Markup", 
                  saveTo: "markup-content.html", 
                  folder: props.folder, 
                  onEditorChange: props.onEditorChange, 
                  mode: markupMode}), 

          React.createElement(Editor, {ref: "style_editor", 
                  title: "Style", 
                  saveTo: "style.css", 
                  folder: props.folder, 
                  onEditorChange: props.onEditorChange, 
                  mode: styleMode}), 

          React.createElement(Editor, {ref: "script_editor", 
                  title: "Javascript", 
                  saveTo: "script.js", 
                  folder: props.folder, 
                  wrapper: wrapScript, 
                  onEditorChange: props.onEditorChange, 
                  mode: scriptMode})
        )
      )
    }
  })

  var EditorPanelSettings = React.createClass({displayName: "EditorPanelSettings",
    render: function(){
      return (
        React.createElement("div", {className: (this.props.visible ? 'visible' : 'hidden')}, 
          React.createElement("h1", null, "Editor Panel Settings")
        )
      )
    }
  })
  
  var wrapScript = function(originalContent){
    return originalContent;
  }

  window.EditorPanel = EditorPanel;
  window.EditorPanelSettings = EditorPanelSettings;
})()
