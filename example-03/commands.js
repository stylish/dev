/* 
  This is an easy way of dispatching common commands which the 
  user will request, either through keyboard shortcuts, or the 
  native menu system.

*/
var Commands = {
  "reload:window": function(){
    window.location.reload(true)
  },
  
  "show:window": function(){
    Native.win.show()
  },
  "show:devtools": function(){
    Native.win.showDevTools()
  }
}
