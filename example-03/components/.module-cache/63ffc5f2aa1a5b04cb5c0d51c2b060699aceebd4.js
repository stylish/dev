var EditorPanel = React.createClass({displayName: "EditorPanel",
  getDefaultProps: function(){
    return {
      markupMode: "htmlmixed",
      scriptMode: "javascript",
      styleMode: "css"
    }
  },
   
  render: function(){
    var props       = this.props,
        state       = this.state || {},
        markupMode  = state.markupMode || props.markupMode,
        styleMode   = state.styleMode || props.styleMode,
        scriptMode  = state.scriptMode || props.scriptMode

    return(
      React.createElement("div", {className: "app editor-panel"}, 
        React.createElement(EditorPanelSettings, {visible: !!state.settingsVisible}), 

        React.createElement(Editor, {ref: "markup_editor", 
                title: "Markup", 
                mode: markupMode}), 

        React.createElement(Editor, {ref: "style_editor", 
                title: "Style", 
                mode: styleMode}), 

        React.createElement(Editor, {ref: "script_editor", 
                title: "Javascript", 
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
