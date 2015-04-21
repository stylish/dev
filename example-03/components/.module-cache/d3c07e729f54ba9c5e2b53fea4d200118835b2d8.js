(function(){
  var EditorPanel = React.createClass({displayName: "EditorPanel",
    getDefaultProps: function(){
      return {
        markupMode: "htmlmixed",
        scriptMode: "javascript",
        styleMode: "css",
        folder: "default",
        saveTo: "preview.html"
      }
    },
    
    savePreview: function(){
      var me = this,
          my = me,
          props = my.props,
          state = my.state || {};
          fs = Native.fs,
          path = Native.path,
          join = path.join,
          template = _.template(Native.read("src/app/templates/preview.tpl")),
          storagePath = join(gui.App.dataPath, "editor-cache", this.props.folder),
          previewPath = join(storagePath, "preview.html"),
          previewContent = template({ style_location: join(storagePath, 'style.css'),
                                      script_location: join(storagePath, 'script.jss'),
                                      markup_content: Native.read(join(storagePath,"markup-content.html")) })

      Native.mkdir(path.dirname(storagePath))
    
      debugger;

      Native.write(previewPath, previewContent)
    },

    onEditorChange: function(){
      this.savePreview()

      if(this.props.onEditorChange){
        this.props.onEditorChange()
      }
    },

    render: function(){
      var my          = this,
          props       = my.props,
          state       = my.state || {},
          markupMode  = state.markupMode || props.markupMode,
          styleMode   = state.styleMode || props.styleMode,
          scriptMode  = state.scriptMode || props.scriptMode;

      return(
        React.createElement("div", {className: "app editor-panel"}, 
          React.createElement(EditorPanelSettings, {visible: !!state.settingsVisible}), 

          React.createElement(Editor, {ref: "markup_editor", 
                  title: "Markup", 
                  saveTo: "markup-content.html", 
                  folder: props.folder, 
                  defaultValue: "<!-- enter some html -->", 
                  onEditorChange: this.onEditorChange, 
                  mode: markupMode}), 

          React.createElement(Editor, {ref: "style_editor", 
                  title: "Style", 
                  saveTo: "style.css", 
                  folder: props.folder, 
                  defaultValue: "/* enter some css */", 
                  onEditorChange: this.onEditorChange, 
                  mode: styleMode}), 

          React.createElement(Editor, {ref: "script_editor", 
                  title: "Javascript", 
                  saveTo: "script.js", 
                  folder: props.folder, 
                  wrapper: wrapScript, 
                  defaultValue: "/* enter some js */", 
                  onEditorChange: this.onEditorChange, 
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
