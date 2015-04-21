var EditorPanel = React.createClass({displayName: "EditorPanel",
  getDefaultProps: function(){
    return {
      markupContent: "",
      styleContent: "",
      scriptContent: ""
    }
  },

  onMarkupChange: function(cm){
    this.generatePreview()
  },

  onScriptChange: function(cm){
    this.generatePreview()
  },

  onStyleChange: function(cm){
    this.generatePreview()
  },

  generatePreview: function(){
    var markupContent   = this.refs.markup_editor.cm.getValue(),
        styleContent    = this.refs.style_editor.cm.getValue(),
        scriptContent   = this.refs.script_editor.cm.getValue()
        previewContent  =  "<html> <head> <link rel='stylesheet' href='style.css' /> </head> <body>" + markupContent + "<script type='text/javascript' src='script.js'></script></body></html>"
    
    fs.writeFileSync("src/app/editor-panel/style.css", styleContent)
    fs.writeFileSync("src/app/editor-panel/script.js", scriptContent)
    fs.writeFileSync("src/app/editor-panel/markup-content.html", markupContent)
    fs.writeFileSync("src/app/editor-panel/preview.html", previewContent)

    if(this.props.onPreviewChange){
      this.props.onPreviewChange()
    }
  },

  render: function(){
    var props = this.props;

    return(
      React.createElement("div", {className: "app editor-panel"}, 
        React.createElement("div", {className: "app editor-pane"}, 
          React.createElement("div", {className: "app toolbar"}, 
            "Markup"
          ), 
          React.createElement(CodemirrorEditor, {value: props.markupContent, className: "app markup-editor", ref: "markup_editor", mode: "htmlmixed", onChange: this.onMarkupChange})
        ), 
        React.createElement("div", {className: "app editor-pane"}, 
          React.createElement("div", {className: "app toolbar"}, 
            "Style"
          ), 
          React.createElement(CodemirrorEditor, {value: props.styleContent, className: "app style-editor", ref: "style_editor", mode: "css", onChange: this.onStyleChange})
        ), 
        React.createElement("div", {className: "app editor-pane"}, 
          React.createElement("div", {className: "app toolbar"}, 
            "Script", 
            React.createElement("i", {className: "glyphicon glyphicon-cog"})
          ), 
          React.createElement(CodemirrorEditor, {value: props.scriptContent, className: "app script-editor", ref: "script_editor", mode: "javascript", onChange: this.onScriptChange})
        )
      )
    )
  }
})
