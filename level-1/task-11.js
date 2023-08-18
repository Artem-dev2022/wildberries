// Задача о замыканиях и области видимости: 
// напишите функцию, которая возвращает другую функцию. 
// Внутренняя функция должна иметь доступ к переменной, 
// определенной во внешней функции, даже после того, 
// как внешняя функция завершила свое выполнение.

function f1(){
    let someVar = 5; // данная переменная сохраняется в области видимости внутренней функции

    return (mult) => {
        console.log(someVar *= mult)
    }
}

const f2 = f1()
f2(2)
f2(4)