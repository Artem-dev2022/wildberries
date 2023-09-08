import getAudioTime from './format-time.js'

const audio = document.getElementById('audio')
const playerCurrent = document.querySelector('.player__current')
const playerProgress = document.querySelector('.player__progress')
const playerSlider = document.querySelector('.player__slider')
const playerTimeline = document.querySelector('.player__timeline')
const volumeSlider = document.querySelector('.volume__slider') 
const volumeLevel = document.querySelector('.volume__level') 
const volumeHandle = document.querySelector('.volume__handle')

function sliders(){
    audio.volume = 0.5

    let offsetX = 0;
    let volumeOffsetX = 0;

    function setProgress(e){
        playerCurrent.textContent = getAudioTime(e.srcElement.currentTime)
        const progressPercent = e.srcElement.currentTime / e.srcElement.duration * 100
        playerProgress.style.width = `${progressPercent}%`
    }

    function getOffset(){
        const timeline = playerTimeline.getBoundingClientRect();
        offsetX = timeline.left;

        const volume = volumeSlider.getBoundingClientRect();
        volumeOffsetX = volume.left;
    }

    getOffset()

    window.onscroll = function(){
        getOffset()
    } 
    window.onresize = function(){
        getOffset()
    } 

    function mouseMove(e){
        if (e.pageX > offsetX && e.pageX < playerTimeline.offsetWidth + playerTimeline.offsetLeft) {
            audio.currentTime = (e.pageX - playerTimeline.offsetLeft) / playerTimeline.offsetWidth * audio.duration 
            playerProgress.style.width = `${(e.pageX - playerTimeline.offsetLeft) / playerTimeline.offsetWidth * 100}%`
        }
    }

    function mouseDown(){
        audio.removeEventListener('timeupdate', setProgress)
        document.addEventListener('mousemove', mouseMove)
    }

    function mouseUp(){
        audio.addEventListener('timeupdate', setProgress)
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mousemove', volumeMouseMove)
    }

    playerSlider.addEventListener('mousedown', mouseDown)

    document.addEventListener('mouseup', mouseUp)

    function volumeMouseDown(){
        document.addEventListener('mousemove', volumeMouseMove)
    }
    
    function volumeMouseMove(e){
        if (e.pageX > volumeOffsetX && e.pageX < volumeSlider.offsetWidth + volumeSlider.offsetLeft) {
            const currentLevel = (e.pageX - volumeSlider.offsetLeft) / volumeSlider.offsetWidth 
            audio.volume = currentLevel >= 0.02 ? currentLevel : 0
            volumeLevel.style.width = `${(e.pageX - volumeSlider.offsetLeft) / volumeSlider.offsetWidth * 100}%`
        }
    }

    volumeHandle.addEventListener('mousedown', volumeMouseDown)
}

export default sliders