var gui = Native.gui

var Editor = React.createClass({displayName: "Editor",
  getDefaultProps: function(){
    return {
      autoSave: true
    }
  },

  getContents: function(){
    return this.refs.editor.cm.getValue()
  },

  wrappedContent: function(){
    var contents = this.getContents()
    return contents;
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
    if(!(this.props.saveTo && this.props.folder)){
      return false;
    }
    
    var fs = Native.fs,
        path = Native.path,
        join = path.join,
        gui = Native.gui,
        storagePath = join(gui.App.dataPath, "editor-cache", this.props.folder, this.props.saveTo)
        
    Native.mkdir(path.dirname(storagePath))

    Native.write(storagePath, this.wrappedContent())
  },
  
  read: function(){
    if(!(this.props.saveTo && this.props.folder)){
      return ""
    }

    var storagePath = Native.path.join(gui.App.dataPath, "editor-cache", this.props.folder, this.props.saveTo)
    
    try {
      return Native.fs.readFileSync(storagePath) 
    } catch(e){
      return this.props.defaultValue;
    }
  },

  toggleSettingsPanel: function(){

  },
 
  render: function(){
    var props = this.props,
        state = this.state || {},
        mode  = state.mode || props.mode,
        value = state.value || props.value || this.read() 
    
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
