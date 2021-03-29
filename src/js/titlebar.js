const { ipcRenderer } = require("electron")
const ipc = ipcRenderer
var minimizeBtn = document.getElementById('minimizeBtn')
var maximizeBtn = document.getElementById('maximizeBtn')
var closeBtn = document.getElementById('closeBtn')
const{ remote} = require('electron')
var mainWindow = remote.getCurrentWindow();
///// minimize app
minimizeBtn.addEventListener('click',()=>{
    // ipc.send('minimizeApp')
    mainWindow.minimize();
})
////maximize restore app
function changeMaxRestore(isMaximizedApp){
    if(isMaximizedApp){
        maximizeBtn.title = 'restore'
        maximizeBtn.classList.remove('maximizeBtn')
        maximizeBtn.classList.add('restoreBtn')
    }else{
        maximizeBtn.title = 'restore'
        maximizeBtn.classList.remove('restoreBtn')
        maximizeBtn.classList.add('maximizeBtn')
    }
}
ipc.on('isMaximized', ()=>{changeMaxRestore(true)})
ipc.on('isRestored', ()=>{changeMaxRestore(false)})

///// Maximize app
maximizeBtn.addEventListener('click',()=>{
    ipc.send('maximizeApp')
})


///// Close app
closeBtn.addEventListener('click',()=>{
    ipc.send('closeApp')
})
