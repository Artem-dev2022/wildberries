// Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов,
// на выходе объект, представляющий из себя односвязный список.

const json = `{
    "pages": [
        {"page": 1},
        {"page": 2},
        {"page": 3},
        {"page": 4},
        {"page": 5}
    ]
}`

function linkedList(json){
    const obj = JSON.parse(json) // преоьразую JSON в объект
    const list = obj[Object.keys(obj)] // нахожу в нём список
    let newObj = {};
    
    for (let i = list.length - 1; i >= 0; i--){ // прохожусь по списку с конца
        if (i === list.length - 1) { // у последнего элемента ссылка на следующий элемент равна null
            list[i].next = null
        } else {
            list[i].next = list[i + 1] // каждому последующему элементу добавляю ссылку на предыдущий
            if (i === 0) {
                newObj.head = list[i]
            }
        }
    }
    return JSON.stringify(newObj) // стрингифую просто для того чтобы в консоли VS-Code увидеть объект в полном виде
}
console.log(linkedList(json))