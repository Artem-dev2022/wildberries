// Задача на асинхронность: 
// напишите асинхронную функцию, которая использует ключевое слово await 
// для ожидания выполнения других асинхронных операций, 
// и возвращает результат выполнения.

function another(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Первая операция")
            resolve()
        }, 1000)
    });
}

async function waitForAnother(){
    let result = 0;

    await another()

    console.log("Вторая операция")
    result++

    return result;
}

console.log(waitForAnother().then(res => console.log(res)))

// async function всегда возвращает промис, поэтому чтобы получить результат используем then