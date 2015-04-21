var Editor = React.createClass({displayName: "Editor",
  getDefaultProps: function(){
    return {
      autoSave: true
    }
  },

  getContents: function(){
    return this.refs.editor.cm.getValue()
  },

  onChange: function(){
    if(!!this.props.autoSave){
      this.saveToDisk()
    }
    
    if(this.props.onEditorChange){
      this.props.onEditorChange()
    }
  },
 
  saveToDisk: function(){
    
  },
  
  readFromDisk: function(){
    if(this.props.saveTo && this.props.folder){
    }

    return ""
  },

  toggleSettingsPanel: function(){

  },
 
  render: function(){
    var props = this.props,
        state = this.state || {},
        mode  = state.mode || props.mode,
        value = state.value || props.value || this.readFromDisk()
    
    return (
      React.createElement("div", {className: "app editor-pane"}, 
        React.createElement("div", {className: "app toolbar clearfix"}, 
          React.createElement("div", {className: "pull-left title"}, props.title), 
          React.createElement("div", {className: "pull-right icons"}, 
            React.createElement("i", {className: "glyphicon glyphicon-cog", onClick: this.toggleSettingsPanel})
          )
        ), 
        React.createElement(CodemirrorEditor, {ref: "editor", 
                          value: value, 
                          mode: mode, 
                          onChange: this.onChange})
      )
    )
  }
});
