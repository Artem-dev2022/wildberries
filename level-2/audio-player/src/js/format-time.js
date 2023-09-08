function formatTime(time){
    return time < 10 ? `0${time}` : time
}

function getAudioTime(ms){
    const min = formatTime(Math.floor(ms/60))
    const sec = formatTime(Math.floor(ms - min * 60))
    return `${min}:${sec}`
}

export default getAudioTime