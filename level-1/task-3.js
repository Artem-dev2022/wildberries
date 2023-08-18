// Реализовать аналог библиотеки Math (можно назвать MathX) 
// с базовым набором функций, используя замыкания:
//   вычисление N-го числа в ряду Фибоначчи 
//   вычисление всех чисел в ряду Фибоначчи до числа N
//   вычисление N-го просто числа
//   вычисление всех простых чисел до числа N
// Будет плюсом, если задумаетесь и об оптимизации.

// Решение 1
function MathX(num){
    let N = num
    function fibonacciNumber(){
        return fibonacciList(N).at(-1)
    }
    function fibonacciList(){
        if (N < 1) return [];
        if (N === 1) return [0];
        let fibonacciArray = [0, 1];
        for (let i = 0; fibonacciArray.length < N; i++) {
            fibonacciArray.push(fibonacciArray[i] + fibonacciArray[i + 1])
        }
        return fibonacciArray
    }
    function simpleNumber(){
        return simpleList(N).at(-1)
    }
    function simpleList(){
        let simpleArray = [];
        for (let i = 2; simpleArray.length < N; i++) {
            let dividers = 0;
            for (let j = 1; j <= i; j++){
                if ( i % j === 0 ) {
                    dividers++
                }
            }
            if (dividers === 2) simpleArray.push(i)
        }
        return simpleArray
    }
    return [fibonacciNumber, fibonacciList, simpleNumber, simpleList]
}

let [fibonacciNumber, fibonacciList, simpleNumber, simpleList] = MathX(10)
console.log('fibonacciNumber', fibonacciNumber())
console.log('fibonacciList', fibonacciList())
console.log('simpleNumber', simpleNumber())
console.log('simpleList', simpleList())

// Решение 2
const MathXX = {
    N: 8,
    constructor(num){
        this.N = num
    },
    fibNumber() {
        return this.fibList(this.N).at(-1)
    },
    fibList() {
        if (this.N < 1) return [];
        if (this.N === 1) return [0];
        let fibonacciArray = [0, 1];
        for (let i = 0; fibonacciArray.length < this.N; i++) {
            fibonacciArray.push(fibonacciArray[i] + fibonacciArray[i + 1])
        }
        return fibonacciArray
    },
    simNumber() {
        return this.simList(this.N).at(-1)
    },
    simList()  {
        let simpleArray = [];
        for (let i = 2; simpleArray.length < this.N; i++) {
            let dividers = 0;
            for (let j = 1; j <= i; j++){
                if ( i % j === 0 ) {
                    dividers++
                }
            }
            if (dividers === 2) simpleArray.push(i)
        }
        return simpleArray
    }
}

console.log('MathXX.fibNumber', MathXX.fibNumber()) 
console.log('MathXX.fibList', MathXX.fibList()) 
console.log('MathXX.simNumber', MathXX.simNumber()) 
console.log('MathXX.simList', MathXX.simList()) 