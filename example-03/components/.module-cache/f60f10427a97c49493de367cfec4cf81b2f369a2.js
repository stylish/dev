var CodemirrorEditor = React.createClass({displayName: "CodemirrorEditor",
  onValueChange: function(){
    console.log("Value Change", arguments)
  },

  getInitialState: function(){
    return {
      value: ''
    }
  },
  
  getDefaultProps: function(){
    return {
      mode: "css",
      keyMap: "sublime",
      theme: "monokai",
      lineNumbers: true,
      scrollbarStyle: null
    }
  },
  
  getCodemirrorOptions: function(){
    var props = this.props;

    return {
      mode: props.mode,
      keyMap: props.keyMap,
      theme: props.theme,
      lineNumbers: !!(props.lineNumbers),
      scrollbarStyle: props.scrollbarStyle,
      tabSize: 2
    }
  },
  
  shouldComponentUpdate: function(){
    return false;
  },

  componentDidMount: function(){
    this.cm = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), this.getCodemirrorOptions())
    this.cm.on("change", this.props.onChange)
  },

  render: function(){
    var state = this.state || {},
        props = this.props || {};

    var editor = React.createElement('textarea',{
      ref: 'editor',
      value: state.value,
      defaultValue: props.value,
      value: props.value,
      onChange: this.onValueChange
    })
    
    return React.createElement('div', {className:"app codemirror-editor"}, editor)
  },

  statics: {
    loadTheme: function(theme){
      var link = document.createElement('link'),
          head = document.getElementsByTagName('head')[0];

      link.rel = "stylesheet"
      link.href = "vendor/codemirror/theme/" + theme + ".css"
      
      head.appendChild(link)
    }
  }
})

CodemirrorEditor.loadTheme('monokai')
