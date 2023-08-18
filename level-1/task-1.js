// Задача о палиндроме: 
// напишите функцию, которая проверяет, 
// является ли заданная строка палиндромом. 
// Палиндром — это строка, которая читается одинаково в обоих направлениях

// Разворачиваем строку методом reverse,
// но т.к. он работает только с массивами методами split и join 
// разобьем строку на массив символов а затем обратно обьединим в строку
// чтобы убрать пробелы использую filter или replaceAll

// Решение 1
function checkPalindrom1(str){
    return str.split("").filter(l => l !== ' ').join("") === str.split("").filter(l => l !== ' ').reverse().join("")
}
// Решение 2
function checkPalindrom2(str){
    return str.replaceAll(' ', '').split("").join("") === str.replaceAll(' ', '').split("").reverse().join("")
}
// Решение 3 (влоб проходим строку циклом с конца формируя новую развернутую строку)
function checkPalindrom3(str){
    let newStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] !== ' ') newStr += str[i]
    }
    return str.replaceAll(' ', '') === newStr
}
console.log('checkPalindrom1', checkPalindrom1('аргентина манит негра'))
console.log('checkPalindrom2', checkPalindrom2('аргентина манит негра'))
console.log('checkPalindrom3', checkPalindrom3('аргентина манит негра'))