import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import sliders from './player-sliders.js'
import getAudioTime from './format-time.js'
import data from './data.js'
import uploadNewSong from './upload-song.js'

const audio = document.getElementById('audio')
const prev = document.getElementById('btn-prev')
const play = document.getElementById('btn-play')
const next = document.getElementById('btn-next')
const playerTitle = document.querySelector('.player__title')
const playerArtist = document.querySelector('.player__artist')
const playerCurrent = document.querySelector('.player__current')
const playerDuration = document.querySelector('.player__duration')
const playerProgress = document.querySelector('.player__progress')
const playlist = document.querySelector('.playlist')
const btnRepeat = document.getElementById('btn-repeat')
const btnShuffle = document.getElementById('btn-shuffle')

let nowPlayingIndex = 0;
let playing = false;
let isShuffled = false;
let shuffledSongs;
let songs = getSongs(data);
let firstCreating = true;

let wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    barWidth: 4,
    barHeight: 0.5,
    barGap: 4,
    barRadius: 2,
    barAlign: 'bottom',
    interact: false,
    setMuted: true,
    media: audio,
    url: './assets/audio/amon-amarth-twilight-of-the-thunder-god.mp3',
})

function refreshWaves(songUrl){
    wavesurfer.destroy()
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4F4A85',
        progressColor: '#383351',
        barWidth: 4,
        barHeight: 0.5,
        barGap: 4,
        barRadius: 2,
        barAlign: 'bottom',
        interact: false,
        setMuted: true,
        media: audio,
        url: songUrl,
    })
    wavesurfer.on('ready', () => {
        wavesurfer.play()
    })
}

function getSongs(songList){
    if (localStorage.getItem('allSongs') === null) {
        localStorage.setItem('allSongs', JSON.stringify(songList))
    }
    return JSON.parse(localStorage.getItem('allSongs'))
}

function createHTMLElement(elTag, elClass){
    const element = document.createElement(elTag);
    element.classList.add(elClass)
    return element
}

function renderList(id, url, audioUrl, title, artist, duration){
    const song = createHTMLElement('li', 'song')
    const songLeft = createHTMLElement('div', 'song__left')

    songLeft.addEventListener('click', () => {
        nowPlayingIndex = id
        switchSong()
    })

    const songNum = createHTMLElement('span', 'song__num')
    songNum.textContent = id + 1
    const songImg = createHTMLElement('img', 'song__img')
    songImg.src = url
    songImg.alt = 'Обложка альбома'
    const songСontent = createHTMLElement('div', 'song__content')
    const songTitle = createHTMLElement('h5', 'song__title')
    songTitle.textContent = title
    const songArtist = createHTMLElement('h6', 'song__artist')
    songArtist.textContent = artist
    songСontent.append(songTitle, songArtist)
    songLeft.append(songNum, songImg, songСontent)

    const songRight = createHTMLElement('div', 'song__right')
    const songDuration = createHTMLElement('span', 'song__duration')
    songDuration.textContent = duration
    const songBtn = createHTMLElement('button', 'song__btn')
    songBtn.innerHTML = `<svg class="song__btn__icon" xmlns="http://www.w3.org/2000/svg" width="4" height="18" viewBox="0 0 4 18" fill="none">
                            <path d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z" fill="white"/>
                        </svg>`

    const songDropdown = createHTMLElement('ul', 'song__dropdown')
    const songDropdownItem1 = createHTMLElement('li', 'song__dropdown__item')
    songDropdownItem1.textContent = 'Редактировать'
    const songDropdownItem2 = createHTMLElement('li', 'song__dropdown__item')
    songDropdownItem2.textContent = 'Добавить в плейлист'
    const songDropdownItem3 = createHTMLElement('li', 'song__dropdown__item')
    songDropdownItem3.textContent = 'Удалить'

    songBtn.addEventListener('click', () => {
        songDropdown.classList.add('visible')
    })
    document.addEventListener('mousemove', (e) => {
        if (e.target.parentElement !== songDropdown) {
            songDropdown.classList.remove('visible')
        }
    })

    songDropdown.append(songDropdownItem1, songDropdownItem2, songDropdownItem3)
    songRight.append(songDuration, songBtn, songDropdown)
    song.append(songLeft, songRight)
    playlist.append(song)
}

function renderPlayList(){
    playlist.innerHTML =''
    const songs = getSongs(data)
    function renderSong(song){
        return new Promise(resolve => {
            const audio = new Audio()
            audio.src = song.url
            audio.onloadeddata = function(){
                const dur = getAudioTime(audio.duration)
                renderList(songs.indexOf(song), './assets/img/music-file-svgrepo-com.svg', song.url, song.title, song.artist, dur)
                resolve()
            }
        })
    }
    songs.reduce((a,b) => {return a.then(() => renderSong(b))}, Promise.resolve())
}

renderPlayList()

play.addEventListener('click', () => {
    if (firstCreating) {
        wavesurfer.on('ready', () => {
            wavesurfer.play()
        })
    }
    if (playing) {
        audio.pause()
        play.classList.remove('player__btn--active')
    } else {
        audio.play()
        play.classList.add('player__btn--active')
    }
    
    playing = !playing
})

function nextSong(){
    nowPlayingIndex++
    if (nowPlayingIndex >= songs.length) nowPlayingIndex = 0;
    switchSong()
}

next.addEventListener('click', (nextSong))

prev.addEventListener('click', () => {
    nowPlayingIndex--
    if (nowPlayingIndex < 0) nowPlayingIndex = songs.length - 1;
    switchSong()
})

function switchSong(arr = songs, action = 'play'){
    let songs = arr
    if (isShuffled) {
        songs = shuffledSongs
    } else {
        songs = getSongs(arr)
    }
    playing = true
    play.classList.add('player__btn--active')
    audio.src = songs[nowPlayingIndex].url

    if (action === 'play') {
        audio.play()
    } else {
        audio.pause()
    }
    
    playerTitle.textContent = songs[nowPlayingIndex].title
    playerArtist.textContent = songs[nowPlayingIndex].artist
    audio.onloadeddata = function(){
        playerDuration.textContent = getAudioTime(audio.duration)
    }
    refreshWaves(songs[nowPlayingIndex].url)
}

audio.addEventListener('timeupdate', setProgress)

function setProgress(e){
    playerCurrent.textContent = getAudioTime(e.srcElement.currentTime)
    const progressPercent = e.srcElement.currentTime / e.srcElement.duration * 100
    playerProgress.style.width = `${progressPercent}%`
}

audio.addEventListener('ended', () => {
    nowPlayingIndex++
    if (nowPlayingIndex >= songs.length) nowPlayingIndex = 0;

    if (nowPlayingIndex === 0 && !btnRepeat.classList.contains('side__btn--active')) {
        audio.pause()
        switchSong(songs, 'pause')
        document.querySelector('.player__progress').style.width = '0px'
        play.classList.remove('player__btn--active')
        playing = false
        return
    }
    switchSong()
})

btnRepeat.addEventListener('click', () => {
    btnRepeat.classList.toggle('side__btn--active')
})

btnShuffle.addEventListener('click', () => {
    btnShuffle.classList.toggle('side__btn--active')
    isShuffled = !isShuffled
    shuffle(songs)
})

function shuffle(array) {
    let newArr = [...array]
    newArr.sort(() => Math.random() - 0.5)
    shuffledSongs = newArr
}

uploadNewSong(songs, renderPlayList)
sliders()