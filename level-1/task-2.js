// Задача о странных числах: 
// Напишите функцию, которая принимает число
// и возвращает true, если это число является странным, 
// и false в противном случае. 
// Странным числом считается число,
// которое равно сумме всех своих делителей, кроме самого себя.

// Решение 1
function strangeNumber1(num){
    let sum = 1;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) { // проверка на делитель (остаток от деления равен нулю)
            sum +=i
        }
    }
    return sum === num
}
// Решение 2
function strangeNumber2(num){
    if (num === 1) return true
    let arr = [...Array (num)]      // создаю пустой массив длины num
    let sum = -num;                 // чтобы не учитывать num в качестве делителя
    arr.map((i,index) =>  {         // итерирую массив по индексу
        if (num % (index + 1) === 0) {
            sum += index + 1
        }
    })
    return num === sum
}
console.log('strangeNumber1', strangeNumber1(1))
console.log('strangeNumber2', strangeNumber2(1))