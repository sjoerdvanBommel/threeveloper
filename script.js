const songsContainer = document.querySelector('#songs')
const songs = songsContainer.querySelectorAll('span')
const skip = songsContainer.querySelectorAll('span.skip').length
const perSongRotationPercentage = 100 / (songs.length - skip)

const totalRotation = 180

const onScroll = () => {
    const maxScrollY = songsContainer.clientHeight - window.innerHeight
    const scrollPercentage = window.scrollY / maxScrollY * 100

    for (let i = 0; i < songs.length; i++) {
        const rotationPercentage = i * perSongRotationPercentage
        const rotation = rotationPercentage / 100 * totalRotation;
        const scrollRotation = scrollPercentage / 100 * totalRotation;
        const skipRotation = skip * perSongRotationPercentage / 100 * totalRotation;

        songs[i].style.transform = `rotate(${rotation - scrollRotation - skipRotation}deg)`
        songs[i].classList.remove('active');
    }

    const nSongs = songs.length - skip;
    const activeSongIndex = skip + Math.round(scrollPercentage / 100 * nSongs)
    songs[activeSongIndex]?.classList.add('active');
}

addEventListener("scroll", onScroll)
onScroll()

for (let i = skip; i < songs.length; i++) {
    songs[i].addEventListener('click', () => {
        const percentage = perSongRotationPercentage * (i - skip);
        window.scrollTo({ top: (percentage / 100) * (songsContainer.clientHeight - window.innerHeight), behavior: 'smooth' })
    })
}









