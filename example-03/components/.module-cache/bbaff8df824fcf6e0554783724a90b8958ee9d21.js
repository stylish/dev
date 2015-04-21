var Editor = React.createClass({displayName: "Editor",
  getContents: function(){
    return this.refs.editor.cm.getValue()
  },

  toggleSettingsPanel: function(){

  },
  
  persist: function(){
    var contents = this.getContents();
    fs.writeFileSync(this.props.storage, contents)
    return contents;
  },

  render: function(){
    var props = this.props,
        state = this.state || {},
        mode  = state.mode || props.mode
    
    return (React.createElement("div", {className: "app editor-pane"}, 
      React.createElement("div", {className: "app toolbar clearfix"}, 
        React.createElement("div", {className: "pull-left title"}, 
          props.title
        ), 
        React.createElement("div", {className: "pull-right icons"}, 
          React.createElement("i", {className: "glyphicon glyphicon-cog", onClick: this.toggleSettingsPanel})
        )
      ), 
      React.createElement(CodemirrorEditor, {ref: "editor", value: props.value, mode: mode, onChange: props.onChange})
    ))
  }
});

var EditorPanel = React.createClass({displayName: "EditorPanel",
  getDefaultProps: function(){
    return {
      markupContent: "",
      styleContent: "",
      scriptContent: ""
    }
  },

  generatePreview: function(){
    var markupContent   = this.refs.markup_editor.persist(),
        styleContent    = this.refs.style_editor.persist(),
        scriptContent   = this.refs.script_editor.persist(),
        previewContent  =  "<html> <head> <link rel='stylesheet' href='style.css' /> </head> <body>" + markupContent + "<script type='text/javascript' src='script.js'></script></body></html>"
    
    fs.writeFileSync("src/app/editor-panel/preview.html", previewContent)

    if(this.props.onPreviewChange){
      this.props.onPreviewChange()
    }
  },

  render: function(){
    var props = this.props,
        generatePreview = _.debounce(this.generatePreview, 300)

    return(
      React.createElement("div", {className: "app editor-panel"}, 
        React.createElement(Editor, {ref: "markup_editor", 
                      title: "Markup", 
                      mode: "htmlmixed", 
                      value: props.markupContent, 
                      storage: "src/app/editor-panel/markup-content.html", 
                      onChange: generatePreview}), 
                      
        React.createElement(Editor, {ref: "style_editor", 
                     title: "Style", 
                     mode: "css", 
                     value: props.styleContent, 
                     storage: "src/app/editor-panel/style.css", 
                     onChange: generatePreview}), 

        React.createElement(Editor, {ref: "script_editor", 
                title: "Javascript", 
                mode: "javascript", 
                value: props.scriptContent, 
                storage: "src/app/editor-panel/script.js", 
                onChange: generatePreview})
      )
    )
  }
})
