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
