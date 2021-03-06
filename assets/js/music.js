const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const background = document.getElementById("background");

// Music
const songs = [
  {
    path: 'https://github.com/BoraTheDeveloper/Music/raw/master/HONNE%20-%20by%20my%20side.mp3',
    displayName: 'by my side',
    artist: 'HONNE',
    cover: "https://images.genius.com/3bb2da53626c8b1fba3d3656269388f9.1000x1000x1.jpg",
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/2.mp3',
    displayName: 'You\'re Somebody Else',
    artist: 'flora cash',
    cover: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
  },
  {
    path: 'https://github.com/BoraTheDeveloper/Music/raw/master/Johnny%20Stimson%20-%20Twin%20Sister%20(Lyric%20Video).mp3',
    displayName: 'Twin Sister',
    artist: 'Johnny Stimson',
    cover: "https://images.genius.com/6bd4335245d5bd64b7e010a7ab08158f.300x300x1.jpg",
  },
  {
    path: "https://github.com/BoraTheDeveloper/Music/raw/master/Justin%20Bieber%20-%20I%20Can't%20Be%20Myself%20(Visualizer)%20ft.%20Jaden%20Smith.mp3",
    displayName: 'I Can\'t Be Myself',
    artist: 'Justin Bieber ft. Jaden Smith',
    cover: "https://t2.genius.com/unsafe/220x0/https%3A%2F%2Fimages.genius.com%2F1b4158cead8b9efc973a164d9e86a821.1000x1000x1.jpg",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove('active');
  setTimeout(() => {
    image.src = cover;
    image.classList.add('active');
  }, 100)
  background.src = cover;
} 

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
