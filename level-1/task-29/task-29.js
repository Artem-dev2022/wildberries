// Взаимодействие с формами: 
// Напишите функцию, которая получает данные из формы на веб-странице 
// и выполняет определенные действия с этими данными, 
// например, отправляет их на сервер 
// или отображает всплывающее окно с результатами.

const inputName = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputRadio = document.querySelectorAll('[type=radio]')
const inputCheck = document.getElementById('check')
const btn = document.getElementById('btn')

function collectData(e) {
    e.preventDefault()
    const result = {
        name: inputName.value,
        mail: inputEmail.value,
        color: [...inputRadio].find(i => i.checked).id,
        save: inputCheck.checked
    }
    alert(JSON.stringify(result))
}

btn.addEventListener('click', collectData)