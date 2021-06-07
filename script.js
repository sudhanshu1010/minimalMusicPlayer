const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// song titles
const songs = ['audio01', 'audio02'];

// keep tracks of the song
let songIndex = 0; // setting audio02 as default

// initially load song into DOM
// this function will load the song
loadSong(songs[songIndex])

// update the song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `cover/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex + 1 > songs.length){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    
}


// event listeners
playBtn.addEventListener("click", function(){
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
})

// change songs event
prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

// progress bar
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)