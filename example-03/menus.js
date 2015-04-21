(function(){
  Native.setupMenus = function(){
    var nw = gui;

    var windowMenu = new nw.Menu({
        type: 'menubar'
    });

    // Help menu
    var fileMenu = new nw.Menu();
    var devMenu = new nw.Menu();

    fileMenu.append(new nw.MenuItem({
      label: 'New',
      click: function(){
        alert('New Item')
      }
    }));

    devMenu.append(new nw.MenuItem({
      label: 'Tools',
      click: Commands["show:devtools"]
    }));

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
        label: 'File',
        submenu: fileMenu
    }));

    // Add to window menu
    windowMenu.append(new nw.MenuItem({
        label: 'Developer',
        submenu: devMenu
    }));


    // About sub-entry

    // Assign to window
    nw.Window.get().menu = windowMenu;
  }
})()
