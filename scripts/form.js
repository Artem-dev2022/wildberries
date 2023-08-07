export function form(){
    const formFields = document.querySelectorAll('.form__field');
    
    formFields.forEach((list) => {
        const formPlaceholder = list.querySelector('.form__placeholder');
        const formInput = list.querySelector('.form__input');
        formInput.addEventListener('focus', () => {
            formPlaceholder.classList.add('form__placeholder--active')
        })
        formInput.addEventListener('blur', () => {
            let val = formInput.value
            formInput.value = val.trim()
            if ( formInput.value !== '') return
            formPlaceholder.classList.remove('form__placeholder--active')
        })
        if (formInput.id === 'tel') {
            formInput.addEventListener('input', () => {
                let inputValue = formInput.value.replace(/[a-zA-Zа-яА-Я]/g, '');
                formInput.value = inputValue
            })
            formInput.addEventListener('blur', () => {
                let val = formInput.value
                let filterredVal = val.replace(/[^0-9\+]/g, '')
                formInput.value = filterredVal.substr(0, 2) + ' ' + filterredVal.substr(2, 3) + ' ' + filterredVal.substr(5, 3) + ' ' + filterredVal.substr(8, 2)+ ' ' + filterredVal.substr(10, 2)
            })
        }
        if (formInput.id === 'inn') {
            formInput.addEventListener('input', () => {
                let inputValue = formInput.value.replace(/[^0-9]/g, '');
                formInput.value = inputValue
            })
        }
    })

    /// validation
    const btnPay = document.querySelector('.sidebar__btn');

    function scrollToError(errorField){
        if (window. innerWidth < 1024) {
            errorField.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    btnPay.addEventListener('click', () => {
        formFields.forEach(field => {
            field.classList.remove('form__field--error');
            const formInput = field.querySelector('.form__input');
            if (formInput.value === '') {
                field.classList.add('form__field--error')
                scrollToError(field)
            }

            formInput.addEventListener('input', () => {
                if (formInput.value === '') {
                    field.classList.add('form__field--error')
                } else {
                    field.classList.remove('form__field--error')
                }
            })

            function onError(validateInput, messageEmpty, messageValid){
                if (formInput.value === '') {
                    scrollToError(field)
                    field.querySelector('.form__error').textContent = messageEmpty
                }
                else if (!validateInput(formInput.value)) {
                    field.classList.add('form__field--error')
                    field.querySelector('.form__error').textContent = messageValid
                    scrollToError(field)
                }  else {
                    field.classList.remove('form__field--error')
                }
            }

            /// mail
            if (formInput.id === 'mail') {
                onError(checkMail, 'Укажите электронную почту', 'Проверьте адрес электронной почты')
                formInput.addEventListener('input', () => {
                    onError(checkMail, 'Укажите электронную почту', 'Проверьте адрес электронной почты')
                })
            }

            /// tel
            if (formInput.id === 'tel') {
                onError(checkTel, 'Укажите номер телефона', 'Формат: +9 999 999 99 99')
                formInput.addEventListener('input', () => {
                    onError(checkTel, 'Укажите номер телефона', 'Формат: +9 999 999 99 99')
                })
            }

            /// inn
            if (formInput.id === 'inn') {
                onError(checkINN, 'Укажите ИНН', 'Формат: 1234567')
                formInput.addEventListener('input', () => {
                    onError(checkINN, 'Укажите ИНН', 'Формат: 1234567')
                })
            }
        })
    })

    function checkMail(value){
        const regExp = new RegExp(/[a-zA-Zа-яА-Я0-9\.-]+@+[a-zA-Zа-яА-Я0-9]+\.{1}[а-яА-Яa-zA-Z]{2,3}$/gm)
        return regExp.test(value)
    }

    /// +7 (977) 543-26-54
    function checkTel(value){
        if (value.split('').filter(i => Number(i) || i === '0').length < 11) return false
        const regExp = new RegExp(/^\+[0-9()\s-]{11,30}$/gm)
        return regExp.test(value)
    }

    function checkINN(value){
        const regExp = new RegExp(/^[0-9]{7,10}$/gm)
        return regExp.test(value)
    }
}