// Реализовать функцию конвертации строки в JSON 
// со всеми необходимыми проверками и валидациями.

let str1 = '{"name":"Ivan1", "Ivan":"true","Ivan1": 50}'
let str2 = '["Artem","Ivan", "Sergey", "Pavel"]'
let str3 = "nameфыв"

// Если задание подразумевает реализовать аналог JSON.parse(): 
// Я сделал функцию которая в зависимости от того, передали мы строку содержащую массив либо объект 
// или буквально строку проводит перечень (неполный) проверок на корректность

console.log(convertStringToJSON(str3))

function convertStringToJSON(str){
    let result = "{";

    // если строка обрамлена скобками будем проверять как объект или массив
    if (((str[0] === '{' && str.at(-1) === '}') || (str[0] === '[' && str.at(-1) === ']'))){

        // проверка вложенности скобок
        if (!checkBrackets(str)) return

        let words = str.split(/[:"\,\.\s\{\}\[\]]/).filter(i => i.match(/[a-zA-Zа-яА-Я]/))
        let quoteErrors = 0;

        for (let i of words) {
            let pos = -1;
            while ((pos = str.indexOf(i, pos + 1)) != -1) {
                if ((str[pos - 1] !== '"' || str[pos + i.length] !== '"') && !(str[pos - 1].match(/[a-zA-Zа-яА-Я1-9]/) || str[pos + i.length].match(/[a-zA-Zа-яА-Я1-9]/))) {
                    if (i !== 'true' && i !== 'false') {
                        quoteErrors++
                    } else {
                        if ((str[pos - 1] === '"' && str[pos + i.length] !== '"') || (str[pos - 1] !== '"' && str[pos + i.length] === '"')) quoteErrors++
                    }
                }
            }
        }

        if (quoteErrors) {
            console.log('Слова должны быть обрамлены двойными ковычками "')
            return
        }

        let figures = str.split(/[:"\,\.]/).filter(i => i.match(/^[1-9]+$/gm))
        let figureErrors = 0;

        for (let i of figures) {
            let pos = -1;
            while ((pos = str.indexOf(i, pos + 1)) != -1) {
                if ((str[pos - 1] === '"' && str[pos + i.length] !== '"') || (str[pos - 1] !== '"' && str[pos + i.length] === '"')) {
                    figureErrors++
                }
            }
        }

        if (figureErrors) {
            console.log(`Некорректное представление числа`)
            return
        }

        let elements = str.split(/[:"\,\.\s\{\}\[\]]/).filter(i => i.match(/[a-zA-Zа-яА-Я1-9]/))

        if (str.startsWith('[')){
            if (str.split(/[:\,\.\s\{\}\[\]]/).length !== str.split(/[\s\,\{\}\[\]]/).length ) {
                console.log('Массив должен быть разделён запятыми')
                return
            }
            
            for (let el of elements) {
                if (elements.indexOf(el) !== elements.length - 1) {
                    result += `"${elements.indexOf(el)}": "${el}",`
                } else {
                    result += `"${elements.indexOf(el)}": "${el}"}`
                }
            }
        } else {
            for (let i = 0; i < elements.length; i +=2) {
                if (i !== elements.length - 1) {
                    result += `"${elements[i]}": "${elements[i + 1]}",`
                }
            }
            result = result.slice(0, -1) + `}`
        }
        return result
    }

    // если обычная строка
    for (let el of str) {
        if (str.indexOf(el) !== str.length - 1) {
            result += `"${str.indexOf(el)}": "${el}",`
        } else {
            result += `"${str.indexOf(el)}": "${el}"}`
        }
    }
    return result
}

function checkBrackets(str){
    let errors = 0;
    let bracketsArray = str.split('').filter(i => i.match(/[\{\}\[\]]/))

    let squareArray = str.split('').filter(i => i.match(/[\[\]]/))
    if (squareArray[0] === ']') errors++

    let curlyArray = str.split('').filter(i => i.match(/[\{\}]/))
    if (curlyArray[0] === '}') errors++

    let firstSquareBrackets = 0;
    let firstCurlyBrackets = 0;

    let innerSquareBrackets = 0;
    let innerCurlyBrackets = 0;

    for (let i of bracketsArray) {
        if (i === '[') firstSquareBrackets++
        if (i === ']') firstSquareBrackets--
        if (i === '{') firstCurlyBrackets++
        if (i === '}') firstCurlyBrackets--

        if (firstSquareBrackets !== 0 && i === '{') innerCurlyBrackets++
        if (firstSquareBrackets !== 0 && i === '}') innerCurlyBrackets--

        if (innerCurlyBrackets !== 0 && i === '[') innerSquareBrackets++
        if (innerCurlyBrackets !== 0 && i === ']') innerSquareBrackets--
    }

    if (firstSquareBrackets !== 0) errors++
    if (firstCurlyBrackets !== 0) errors++

    if (innerSquareBrackets !== 0 || innerCurlyBrackets !== 0) errors++

    if (errors) {
        console.log('Проверь скобки!')
        return false
    } else {
        return true
    }
}