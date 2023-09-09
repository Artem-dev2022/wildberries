const allInputs = document.querySelectorAll('input')
const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')
const generateBtn = document.querySelector('.form__btn')
const inputAnswer = document.querySelector('.answer__input')
const answerBtn = document.querySelector('.answer__btn--green')
const restartBtn = document.querySelector('.answer__btn--red')
const attemptsSpan = document.querySelector('.counter')
const hintList = document.querySelector('.hint__list')
const answerError = document.querySelector('.answer__error')
const modal = document.querySelector('.dark-background')
const modalPreposition = document.querySelector('.modal__preposition')
const modalQuantity = document.querySelector('.modal__quantity')
const modalBtn = document.querySelector('.modal__btn')

let num;
let attempts = 0;
let attemptsForHint = 0;

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        let inputValue = input.value.replace(/[^0-9]/g, '');
        input.value = inputValue
    })
})

generateBtn.addEventListener('click', (e) => generateNumber(e, inputFrom.value, inputTo.value))

function generateNumber(e, from, to){
    e.preventDefault();
    if (from > to) {
        let transitVariable = to
        to = from
        from = transitVariable
    }
    num = Math.floor(+from + Math.random() * (+to + 1 - +from));
    console.log(num)
    disableGameForm(true)
    disableAnswerForm(false)
}

answerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    answerError.classList.remove('visible')
    attempts++
    attemptsForHint++
    attemptsSpan.innerHTML = attempts
    if (+inputAnswer.value === num) {
        modal.classList.add('visible')
        modalPreposition.textContent = attempts === 2 ? 'со' : 'с'
        modalQuantity.textContent =  attempts
    } else {
        const hintItem = document.createElement('li');
        hintItem.classList.add('hint__item')

        const hintTime = document.createElement('span');
        hintTime.classList.add('hint__time')
        hintTime.textContent = getCurrentTime()
        
        const hintContent = document.createElement('p');
        hintContent.classList.add('hint__content')

        if (+inputAnswer.value > inputTo.value || +inputAnswer.value < inputFrom.value) {
            answerError.classList.add('visible')
        }

        if (+inputAnswer.value > num) {
            hintContent.textContent = 'Загаданное число меньше вашего'
        } else {
            hintContent.textContent = 'Загаданное число больше вашего'
        }

        hintItem.append(hintTime, hintContent)

        if (attemptsForHint === 3) {
            const hintContentEven = document.createElement('p');
            if (num % 2 === 0) {
                hintContentEven.textContent = 'Загаданное число является чётным'
            } else {
                hintContentEven.textContent = 'Загаданное число является нечётным'
            }
            hintItem.append(hintContentEven)
            attemptsForHint = 0;
        }
        
        hintList.append(hintItem)
        hintList.scrollTo({ 
            left:0, 
            top: hintList.scrollHeight, 
            behavior:"smooth"
        });
    }
})

restartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    restartGame()
    disableGameForm(false)
    disableAnswerForm(true)
})

function restartGame(){
    attempts = 0
    attemptsSpan.innerHTML = 0
    inputFrom.value = 1
    inputTo.value = 100
    inputAnswer.value = ''
    hintList.innerHTML = ''
    answerError.classList.remove('visible')
}

function getCurrentTime(){
    let now = new Date()
    let hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
    let minuts = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
    let seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds()
    return `${hours}:${minuts}:${seconds}`
}

function disableGameForm(isDisabled){
    inputFrom.disabled = isDisabled
    inputTo.disabled = isDisabled
    generateBtn.disabled = isDisabled
}

function disableAnswerForm(isDisabled){
    inputAnswer.disabled = isDisabled
    answerBtn.disabled = isDisabled
    restartBtn.disabled = isDisabled
}

disableAnswerForm(true)

modalBtn.addEventListener('click', () => {
    restartGame()
    modal.classList.remove('visible')
    disableGameForm(false)
    disableAnswerForm(true)
})