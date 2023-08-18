// Задача о сортировке объектов: 
// у вас есть массив объектов вида { name: 'John', age: 25 }. 
// Напишите код, который сортирует этот массив по возрастанию возраста, 
// а при равных возрастах сортирует по алфавиту по полю name.

const arr = [
    { name: 'Stas', age: 30 },
    { name: 'Dima', age: 10 },
    { name: 'Vlad', age: 40 },
    { name: 'Yasha', age: 20 },
    { name: 'Artem', age: 20 },
    { name: 'Zhenya', age: 20 },
    { name: 'Max', age: 20 },
    { name: 'Petr', age: 25 },
]

// Решение 1
let newArr1 = [...arr].sort((a,b) => { // метод sort не создаёт новый массив, поэтому склонируем спрэд оператором, чтобы не менять изначальный массив для решения 2
    if (a.age < b.age) return -1 // сравниваем объекты по полю age. если a меньше b callback функция метода sort требует венуть -1
    if (a.age === b.age) {
        if (a.name < b.name) return -1 // при равном возрасте таким же образом сортируем по имени
    }
})
console.log('newArr1', newArr1)

// Решение 2
let newArr2 = [...arr];
for (let j = 0; j < newArr2.length; j++){
    for (let i = 0; i < newArr2.length - 1; i++) {
        if (newArr2[j].age < newArr2[i].age) {
            let temp = newArr2[i]     // сохраняю элемент с большим возрастом во временную переменную
            newArr2[i] = newArr2[j]   // меняю элементы местами
            newArr2[j] = temp;
        }
        if (newArr2[j].age === newArr2[i].age) {     // если возраст одинаковый проделаю тоже самое с именем
            if (newArr2[j].name < newArr2[i].name) {
                let temp = newArr2[i]
                newArr2[i] = newArr2[j]
                newArr2[j] = temp;
            }
        }
    }
}
console.log('newArr2', newArr2)