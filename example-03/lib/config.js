(function(){
  var Config = {
    codeMirror: {}
  }

  Config.codeMirror.themes = _(Native.fs.readdirSync("vendor/codemirror/theme")).map(function(entry){
    return(entry.replace(/.css$/,''))
  })
  
  Config.codeMirror.keymaps = ['vim','sublime','emacs']

  Config.codeMirror.modes = [
    'coffeescript',
    'css',
    'htmlmixed',
    'jade',
    'javascript',
    'markdown',
    'slim',
    'sass',
    'stylus',
    'less',
    'scss'
  ]

  window.Config = Config
})()
