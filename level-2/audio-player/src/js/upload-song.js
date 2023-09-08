function uploadNewSong(songs, renderPlayList){
    let newURL;
    const formChosen = document.querySelector('.form__chosen-audio')
    const addBtn = document.querySelector('.add-btn')
    const modalBg = document.querySelector('.modal-bg')
    const modalSave = document.querySelector('.form__save')
    const inputTitle = document.getElementById('input-title')
    const inputArtist = document.getElementById('input-artist')
    const audioInput = document.getElementById("upload")
    const formError = document.querySelector('.form__error')

    addBtn.addEventListener('click', () => {
        refreshForm()
        modalBg.classList.add('modal-bg--visible')
    })

    modalBg.addEventListener('click', e => {
        if (e.target === modalBg) {
            modalBg.classList.remove('modal-bg--visible')
            formError.classList.remove('visible')
        }
    })

    function refreshForm(){
        inputTitle.value ='' 
        inputArtist.value = ''
        formChosen.textContent = ''
        audioInput.value = ''
        newURL = ''
        formError.textContent = 'Прикрепи аудиофайл!'
        formError.classList.remove('visible')
    }

    modalSave.addEventListener('click', (e) => {
        e.preventDefault()
        
        if (audioInput.value === '') {
            formError.classList.add('visible')
            return
        } else {
            
            try {
                const newSongs = [...songs]
                newSongs.push({
                    title: inputTitle.value ? inputTitle.value : formChosen.textContent.split('.')[0],
                    artist: inputArtist.value ? inputArtist.value : 'unknown',
                    url: newURL
                })
                localStorage.setItem('allSongs', JSON.stringify(newSongs))
            } catch (error) {
                formError.classList.add('visible')
                formError.textContent = 'Невозможно загрузить слишком большой файл'
                return
            }
            modalBg.classList.remove('modal-bg--visible')
        }
        renderPlayList()
    })

    function handleFiles(event) {
        formChosen.textContent = event.target.files[0].name;

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = function(){
            newURL =  reader.result
        }   
    }

    audioInput.addEventListener("change", handleFiles, false);
}

export default uploadNewSong;