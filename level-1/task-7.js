// Задача о коллекции функций: 
// у вас есть массив функций, напишите код, который 
// вызовет каждую функцию в этом массиве и выведет их порядковый номер. 
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.

// Решение 1 - цепочка промисов
function fn1(){
    return new Promise(resolve => {
        console.log('start 1')
        setTimeout(() => {
            console.log('1')
            resolve() // промис зарезолвится по истечению таймаута
        }, 3000)
    })
}
function fn2(){
    return new Promise(resolve => {
        console.log('start 2')
        setTimeout(() => {
            console.log('2')
            resolve()
        }, 2000)
    })
}
function fn3(){
    return new Promise(resolve => {
        console.log('start 3')
        setTimeout(() => {
            console.log('3')
            resolve()
        }, 1000)
    })
}

//fn1().then(() => fn2()).then(() => fn3())

// или
const arr = [fn1, fn2, fn3]
arr.reduce((p, f) => p.then(f), Promise.resolve());