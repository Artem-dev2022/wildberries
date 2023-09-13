import {warning} from './diary.js'

function targetPage(){
    app.innerHTML = `<div class="container">
                        <h1 class="title">Моя цель</h1>
                        <div class="target__row">
                            <span class="target__text">Не более</span>
                            <input class="target__input" type="text">
                            <span class="target__text">калорий в день</span>
                        </div>
                        <button class="target__btn target__btn--edit">
                            <span class="target__btn__text target__btn__text--save">Сохранить</span>
                            <span class="target__btn__text target__btn__text--edit">Редактировать</span>
                        </button>
                    </div>`

    const input = document.querySelector('.target__input')
    const btn = document.querySelector('.target__btn')
    input.readOnly = true
    input.value = localStorage.getItem('target', input.value) || 0

    input.addEventListener('input', () => {
        input.value = input.value.replace(/[^0-9]/g, '');
    })

    btn.addEventListener('click', () => {
        btn.classList.toggle('target__btn--edit')

        if (btn.classList.contains('target__btn--edit')) {
            input.readOnly = true
            localStorage.setItem('target', input.value)
            warning()
        } else {
            input.readOnly = false
            input.focus()
        }
    })
}

export default targetPage