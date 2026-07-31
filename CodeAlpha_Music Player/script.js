const songs = [
    {
        title: "Despacito",
        artist: "Luis Fonsi",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },

    {
        title: "Escape Your Love",
        artist: "FASSound and FOO",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },

    {
        title: "Gehra Hua",
        artist: "Arijit Singh",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

loadSong(songIndex);

function loadSong(index){

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    audio.src = songs[index].src;
    cover.src = songs[index].cover;

    updatePlaylist();

}

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

nextBtn.addEventListener("click",()=>{

    songIndex++;

    if(songIndex>=songs.length){

        songIndex=0;

    }

    loadSong(songIndex);

    playSong();

});

prevBtn.addEventListener("click",()=>{

    songIndex--;

    if(songIndex<0){

        songIndex=songs.length-1;

    }

    loadSong(songIndex);

    playSong();

});

audio.addEventListener("loadedmetadata",()=>{

    progress.max=Math.floor(audio.duration);

    duration.textContent=formatTime(audio.duration);

});

audio.addEventListener("timeupdate",()=>{

    progress.value=Math.floor(audio.currentTime);

    current.textContent=formatTime(audio.currentTime);

});

progress.addEventListener("input",()=>{

    audio.currentTime=progress.value;

});

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

audio.addEventListener("ended",()=>{

    nextBtn.click();

});

function formatTime(time){

    const minutes=Math.floor(time/60);

    const seconds=Math.floor(time%60);

    return `${minutes}:${seconds<10?"0":""}${seconds}`;

}

songs.forEach((song,index)=>{

    const li=document.createElement("li");

    li.textContent=`${song.title} - ${song.artist}`;

    li.addEventListener("click",()=>{

        songIndex=index;

        loadSong(songIndex);

        playSong();

    });

    playlist.appendChild(li);

});

function updatePlaylist(){

    const items=document.querySelectorAll("#playlist li");

    items.forEach((item,index)=>{

        item.classList.remove("active");

        if(index===songIndex){

            item.classList.add("active");

        }

    });

}

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }

    if(e.code==="ArrowRight"){

        nextBtn.click();

    }

    if(e.code==="ArrowLeft"){

        prevBtn.click();

    }

});