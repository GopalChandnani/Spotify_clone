console.log("Welcome to Spotify");
let songs = [
    { songName: 'let me love you', filePath: 'songs/1.mp3', duration: '05:34' },
    { songName: 'salaam-e-ishq', filePath: 'songs/2.mp3', duration: '03:45' },
    { songName: 'roller dollar', filePath: 'songs/3.mp3', duration: '04:23' },
    { songName: 'dandelions', filePath: 'songs/4.mp3', duration: '05:02' },
    { songName: 'Calm Down', filePath: 'songs/5.mp3', duration: '04:10' },
    { songName: 'Bekhayali', filePath: 'songs/6.mp3', duration: '04:45' },
    { songName: 'Tum Bin', filePath: 'songs/7.mp3', duration: '03:45' },
    { songName: 'Excuses', filePath: 'songs/8.mp3', duration: '04:44' },
    { songName: 'Insane', filePath: 'songs/9.mp3', duration: '03:34' },
    { songName: 'No Love', filePath: 'songs/10.mp3', duration: '05:20' }
]
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterSongName = document.getElementById('masterSongName');
let masterPLay = document.getElementById('masterPlay');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');
let gif = document.getElementsByClassName('gif');
let giff = document.getElementById('giff');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))


songItem.forEach((element, i) => {
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('timestamp')[0].innerText = songs[i].duration;
})

//Pause and Play
masterPLay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
        giff.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPLay.classList.remove('fa-circle-pause');
        masterPLay.classList.add('fa-circle-play');
        giff.style.opacity = 0;
    }
})


//Seek Bar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

// Upar ke song collection se song play krna
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-pause')) {
            // If the clicked element is playing, pause the song
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPLay.classList.remove('fa-circle-pause');
            masterPLay.classList.add('fa-circle-play');
            giff.style.opacity = 0;
            gif[songIndex].style.opacity = 0;
            return;
        }

        // Stop the current song (if any) and start playing the new song
        if (!audioElement.paused) {
            audioElement.pause();
            const currentlyPlaying = document.querySelector('.fa-circle-pause');
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('fa-circle-pause');
                currentlyPlaying.classList.add('fa-circle-play');
                giff.style.opacity = 0;
                gif[songIndex].style.opacity = 0;
            }
        }

        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
        giff.style.opacity = 1;
        gif[songIndex].style.opacity = 1;
    });
});




//Master next
document.getElementById('forward').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPLay.classList.remove('fa-circle-play');
    masterPLay.classList.add('fa-circle-pause');
    giff.style.opacity = 1;
    gif[songIndex].style.opacity = 1;
})

//Master Previous
document.getElementById('backward').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPLay.classList.remove('fa-circle-play');
    masterPLay.classList.add('fa-circle-pause');
    giff.style.opacity = 1;
    gif[songIndex].style.opacity = 1;
})