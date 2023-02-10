console.log('Welcome to my spotify clone');

// initialize the variables
let songIndex=0;
let audioElement= new Audio('1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar =document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('mastersongname');
let songItem=Array.from(document.getElementsByClassName('songitem'));

let songs=[
    { songName: "Warriyo - Mortals [NCS Release]" , filepath:"1.mp3" , coverpath:'1.jpg'},
    { songName:"Cielo - Huma-Huma" , filepath:"2.mp3" , coverpath:'2.jpg'},
    { songName:"DEAF KEV - Invincible [NCS Release]-320k" , filepath:"3.mp3" , coverpath:'3.jpg'},
    { songName:"Different Heaven & EH!DE - My Heart [NCS Release]" , filepath:"4.mp3" , coverpath:'4.jpg'},
    { songName:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release" , filepath:"5.mp3" , coverpath:'5.jpg'},
    { songName:"a-Let me love you" , filepath:"6.mp3" , coverpath:'6.jpg'},
    { songName:"b-Let me love you" , filepath:"7.mp3" , coverpath:'7.jpg'},
    { songName:"c-Let me love you" , filepath:"8.mp3" , coverpath:'8.jpg'},
    { songName:"d-Let me love you" , filepath:"9.mp3" , coverpath:'9.jpg'},
    { songName:"e-Let me love you" , filepath:"10.mp3" , coverpath:'10.jpg'},
]


songItem.forEach((element,i)=> {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerHTML=songs[i].songName;
});

// handle the play pause mechanism
masterPlay.addEventListener('click',()=>{
    if ( audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})

// listen to the event
audioElement.addEventListener('timeupdate',()=>{
    // update the seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= (myProgressBar.value * audioElement.duration)/100;
})

const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if( songIndex>=9) songIndex=0;
    else{
        songIndex+=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if( songIndex<=0) songIndex= 0;
    else{
        songIndex-=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})