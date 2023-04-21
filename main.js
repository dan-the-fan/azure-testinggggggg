const gifs = ['bluddancing.gif', 'bludwalking.gif', 'bludrunning.gif', 'subscribe.gif'];
const audios = ['subaudio.mp3', 'ringtone.mp3', 'seetheshoes.mp3'];
const videoSources = ['spongebobmemphis.webm', 'seetheshoes.webm'];
const bludrunningGif = 'bludrunning.gif';
let prevPositions = [];

function getRandomPosition() {
    const xPos = Math.floor(Math.random() * (window.innerWidth - 128));
    const yPos = Math.floor(Math.random() * (window.innerHeight - 128));
    return { x: xPos, y: yPos };
}

function moveGifs() {
    const gifElements = document.querySelectorAll('img');
    const newPositions = [];

    gifElements.forEach(gif => {
        let newPos = getRandomPosition();

        while (prevPositions.some(pos => pos.x === newPos.x && pos.y === newPos.y)) {
            newPos = getRandomPosition();
        }

        gif.style.left = `${newPos.x}px`;
        gif.style.top = `${newPos.y}px`;
        newPositions.push(newPos);
    });

    prevPositions = newPositions;
}

function playRandomAudio() {
    const audio = new Audio(audios[Math.floor(Math.random() * audios.length)]);
    audio.play();
}

function playRandomVideo() {
    const video = document.querySelector('video');
    video.src = videoSources[Math.floor(Math.random() * videoSources.length)];
    video.load();
    video.play();
}

function playBludRunningGif() {
    const body = document.querySelector('body');
    body.innerHTML = `<img src="${bludrunningGif}" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);">`;
}

setInterval(moveGifs, 5000);
setInterval(playRandomAudio, 1000);
setInterval(() => {
    playBludRunningGif();
    setTimeout(() => {
        playRandomVideo();
        setTimeout(() => {
            moveGifs();
        }, 5000);
    }, 5000);
}, 30000);

document.addEventListener('keydown', (event) => {
    if (event.key === 'b' && event.ctrlKey === false) {
        playBludRunningGif();
    }
});

