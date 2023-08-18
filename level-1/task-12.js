// Задача на работу с объектами: 
// создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: 
// название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

const book = {
    title: 'Этюд в багровых тонах',
    author: 'Артур Конан Дойл',
    year: 1887
}

// получение значений
console.log(book.title)
console.log(book['title'])
console.log(Object.values(book)) // массив значений всех ключей

for (let i in book){  // итерация по ключам
    console.log(book[i])
}
for (let i of Object.getOwnPropertyNames(book)){ // массив ключей
    console.log(book[i])
}
// изменения значений
console.log(book.title = 'Знак четырёх')
console.log(book['title'] = 'Знак четырёх')