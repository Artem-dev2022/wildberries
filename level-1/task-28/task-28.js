// Создать и добавить элемент с использованием шаблонов: 
// Напишите функцию, которая создает новый элемент с использованием шаблонов 
// (например, с помощью тега <template>) и добавляет его в DOM.

const list = document.getElementById('list')
const template = document.getElementById('template')

function createListItem(title, subtitle, text){
    let item = template.content.cloneNode(true)
    item.querySelector('.card__title').textContent = title
    item.querySelector('.card__subtitle').textContent = subtitle
    item.querySelector('.card__text').textContent = text
    list.append(item)
}
createListItem('Автомобиль', 'Renault', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus recusandae dignissimos, optio corrupti vero dolorem soluta deleniti ipsum velit tempore inventore cumque, nemo adipisci nulla quae hic. Neque, debitis eum.')
createListItem('Смартфон', 'Apple', 'Lorem ipsum dolor.')