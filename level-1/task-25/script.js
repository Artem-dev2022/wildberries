// Напишите функцию, которая создает новый элемент, 
// добавляет его в DOM и устанавливает для него стиль с помощью CSS.

function createAndStyle(){
    const element = document.createElement('div')
    element.classList.add('element')
    element.style.opacity = '0.5'
    document.body.append(element)
}
createAndStyle()