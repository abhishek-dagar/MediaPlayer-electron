const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path')
const ipc = ipcMain


function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    minHeight:600,
    minWidth:990,
    frame:false,
    icon: __dirname+'/src/icons/appicon.ico',
    webPreferences: {
      enableRemoteModule:true,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.loadFile('src/index.html')
  win.setBackgroundColor('#343B48')
  //// minimize App
  ipc.on('minimizeApp',()=>{
    win.minimize()
  })
  //// Maximize App
  ipc.on('maximizeApp',()=>{
    if(win.isMaximized()){
      win.restore()
    }else{
      win.maximize()
    }
  })
  //// check if it is maximized
  win.on('maximize', ()=>{
    win.webContents.send('isMaximized')
  })
  //// check if it is resotre
  win.on('unmaximize', ()=>{
    win.webContents.send('isRestored')
  })
  //// close App
  ipc.on('closeApp',()=>{
    win.close()
  })
  ////open file dialog
  // var selectFile = document.getElementById('open')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
