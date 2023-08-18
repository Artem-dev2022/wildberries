// Напишите функцию, которая рекурсивно обходит дерево DOM, 
// начиная с указанного элемента, и выполняет определенное действие с каждым узлом 
// (например, выводить информацию о теге в консоль).

const element = document.getElementById('main');

function checkDOM(element){
    console.log('element', element)
    for (let i of element.childNodes) {
        if (i.nodeName !== '#text') { // таким образом убираю переносы строк в html-документе
            checkDOM(i)
        }
    }
}

checkDOM(document)