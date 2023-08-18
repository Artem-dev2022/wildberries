// Анализатор сложности пароля: 
// создайте функцию, которая оценивает сложность введенного пользователем пароля. 
// Необходимо анализировать: 
//  длину пароля, 
//  использование различных символов, 
//  наличие чисел и букв в разных регистрах. 
// Выведите пользователю оценку сложности пароля и предложите улучшения, 
// если пароль слишком слабый.

const password = document.getElementById('password');
const security = document.getElementById('security');
const hint = document.getElementById('hint');

password.addEventListener('input', () => {
    hint.textContent = ''

    let length = password.value.length >= 10
    if (!length) hint.textContent = 'Минимальная длина пароля 10 символов'

    let symbols = !!password.value.match(/[!@#$%^&*()\_\+\=\-\.\;\'\:~`]/)
    if (!symbols) hint.textContent = 'Пароль должен содержать символы'

    let numbers = !!password.value.match(/[0-9]/)
    if (!numbers) hint.textContent = 'Пароль должен содержать цифры'

    let caseLetters = !!password.value.match(/[a-z]/) && !!password.value.match(/[A-Z]/)
    if (!caseLetters) hint.textContent = 'Пароль должен содержать латинские буквы в разных регистрах'
    
    let wrongSymbols = !!password.value.match(/^[^а-яА-я\s]+$/gm)
    if (!wrongSymbols) hint.textContent = 'Пароль содержит недопустимые символы'

    security.textContent = calculateSecurity(symbols, password.value.length, numbers, caseLetters, wrongSymbols)
})

function calculateSecurity(symbols, length, numbers, caseLetters, wrongSymbols){
    let halfOfSecurity = 0;
    if (symbols) halfOfSecurity += 100     // логика такая что символы, цифры и буквы в разных регистрах это половина успеха,
    if (numbers) halfOfSecurity += 100     // вторая половина - это длина пароля
    if (caseLetters) halfOfSecurity += 100
    if (!wrongSymbols) return 0
    
    let lengthPercent = (length/15) * 100  // допустимо ввести 10 символов, но для большей надежности рекомендуется ввести хотябы 15
    let security = halfOfSecurity/3 + (lengthPercent > 100 ? 100 : lengthPercent) ;
    let result = Math.floor(security / 2)

    return result > 100 ? 100 : result
}