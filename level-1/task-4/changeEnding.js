// Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
//   112 сообщения  1024 пользователя
//   12 сообщений   1026 пользователей
//   1 сообщение    121 пользователь
// Функцию надо упаковать в модуль.

export function changeEnding(num, arr){
    let remainder = num % 100
    if (remainder >= 10 && remainder <= 20) {
        return `${num} ${arr[2]}`
    } else {
        remainder = num % 10
    }
    if (remainder == 1) return `${num} ${arr[0]}`;
    if (remainder > 1 && remainder < 5) return `${num} ${arr[1]}`;
    return `${num} ${arr[2]}`;
}