// const{ remote } = require('electron')
const localshortcut = require("electron-localshortcut");
let dialog = remote.dialog;
var mainWindow = remote.getCurrentWindow();
var video = document.querySelector('.video');
var prog = document.querySelector('#progress')
var btn = document.getElementById('play-pause');
var playingTime = document.getElementById('currentTime')
var selectFile = document.getElementById('openFile')
var mediaBar = document.getElementById('Media-bar')
var mediaBtn = document.getElementById('mediaBtn')
var exitwindow = document.getElementById('exit')
var totalTime = document.getElementById('remain-total')
var cTime=0
function closewindow(){
    mainWindow.close();
}

exitwindow.onclick= ()=> closewindow();

function togglePlayPause(){
    if(video.src===''){
        btn.className= 'play';
    }
    else if(video.paused){
        btn.className = 'pause';
        video.play();
    }else{
        btn.className='play';
        video.pause()
    }
}
localshortcut.register(mainWindow,'Space',()=>{togglePlayPause();})
localshortcut.register(mainWindow,'Control+O',()=>{openfiles();})
localshortcut.register(mainWindow,'Up',()=>{
    value=1
    cVolume.value=cVolume.value + value;
    showVol.innerHTML=cVolume.value;
    video.volume = cVolume.value/100;
    var color = 'linear-gradient(90deg, rgb(34, 146, 221)'+ cVolume.value +'%, grey '+ cVolume.value +'%)';
    cVolume.style.background=color;
})
localshortcut.register(mainWindow,'Down',()=>{
    cVolume.value=cVolume.value-1;
    showVol.innerHTML=cVolume.value;
    video.volume = cVolume.value/100;
    var color = 'linear-gradient(90deg, rgb(34, 146, 221)'+ cVolume.value +'%, grey '+ cVolume.value +'%)';
    cVolume.style.background=color;
})
localshortcut.register(mainWindow,'Right',()=>{
    if(video.src===''){
        btn.className= 'play';
    }else{
        video.currentTime=video.currentTime+10;
    }
})
localshortcut.register(mainWindow,'Left',()=>{
    if(video.src===''){
        btn.className= 'play';
    }else{
        video.currentTime=video.currentTime-10;
    }
})

btn.onclick = function(){
    togglePlayPause();
}
function scrub(e){
    const scrubtime = (e.offsetX/ prog.offsetWidth)*video.duration
    video.currentTime = scrubtime;
}
function showtimings(ids,hours,minutes,seconds){
    if(seconds<10 && minutes<10 && hours<10){
        ids.innerHTML = "0"+hours+":0"+minutes+":0"+seconds;
    }
    else if(seconds<10 && minutes<10){
        ids.innerHTML = hours+":0"+minutes+":0"+seconds;
    }
    else if(seconds<10){
        ids.innerHTML = hours+":"+minutes+":0"+seconds;
    }
    else if(minutes<10 && hours<10){
        ids.innerHTML = "0"+hours+":0"+minutes+":"+seconds;
    }
    else if(minutes<10){
        ids.innerHTML = hours+":0"+minutes+":"+seconds;
    }
    else if(hours<10){
        ids.innerHTML = "0"+hours+":"+minutes+":"+seconds;
    }
    else{
        ids.innerHTML = hours+":"+minutes+":"+seconds;
    }
}
video.addEventListener('click', togglePlayPause)
video.addEventListener('timeupdate', function(){
    cTime=video.currentTime;
    hours = Math.floor(video.currentTime / 3600);
    minutes = Math.floor(video.currentTime / 60);
    seconds = Math.floor(video.currentTime % 60);
    showtimings(playingTime,hours,minutes,seconds);
    var val = (video.currentTime / video.duration)*100;
    prog.value=val;
    var color = 'linear-gradient(90deg, rgb(34, 146, 221)'+ val +'%, grey '+val+'%)';
    prog.style.background = color;
})

prog.addEventListener('click',scrub);

var filepath1 = "";
function openfiles(){
    mediaBar.style.display="none"
    var file = dialog.showOpenDialog(mainWindow,{
        filters : [
            {name: 'Movies', extensions: ['mp4']}
        ]
    }).then((file) => {
        filepath = (file.filePaths[0]);
        console.log(filepath)
        if(filepath===undefined){
            video.src=filepath1;
            video.currentTime=cTime;
        }else{
            video.src=filepath;
            filepath1=filepath;
            prog.value=0;
            video.volume = 0;
        }
    });
}
video.addEventListener('loadedmetadata',()=>{
    hours = Math.floor(video.duration / 3600);
    minutes = Math.floor(video.duration / 60);
    seconds = Math.floor(video.duration % 60);
    showtimings(totalTime,hours,minutes,seconds)
})
selectFile.onclick = async ()=>openfiles();
mediaBtn.onclick = ()=>{
    mediaBar.style.display="flex";
    mediaBar.style.flexDirection="column";
}

var cVolume = document.getElementById('volume');
var showVol = document.getElementById('vol-show');
// video.volume = cVolume.value;

cVolume.oninput = ()=>{
    showVol.innerHTML=cVolume.value;
    video.volume = cVolume.value/100;
    var color = 'linear-gradient(90deg, rgb(34, 146, 221)'+ cVolume.value +'%, grey '+ cVolume.value +'%)';
    cVolume.style.background=color;
    cVolume.blur();
}