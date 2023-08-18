// Задача о замыканиях: 
// напишите функцию, которая будет принимать массив функций 
// и возвращать новую функцию, которая вызывает каждую функцию в этом массиве 
// и возвращает массив результатов, полученных после вызова каждой функции.

const arr = [ () => { return 'result 1' },
              () => { return 'result 2' },
              () => { return 'result 3' }]

function getResults(arr){
    let results = []
    function resultArr(){
        for (let i = 0; i < arr.length; i++) {
            results.push(arr[i]())
        }
        return results
    }
    return resultArr()
}

console.log(getResults(arr))