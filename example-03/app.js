(function(){
  component = React.createElement(LiveEditor)
  React.render(component, document.getElementById('main-region'))

  Native.setupMenus()
  Native.win.show() 
})()
