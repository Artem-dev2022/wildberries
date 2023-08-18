// Напишите функцию, которая добавляет анимацию для элемента на веб-странице,
// например, плавное изменение его положения или размера.

const element = document.getElementById('element');

function addAnimation(element){
    let width = 50;
    let height = 50;
    let top = 10;
    let left = 10;
    
    let iterations = 0
    let reverse = false

    setInterval(() => {
        if (iterations === 50) reverse = false
        if (iterations === 0) reverse = true
        if (reverse) {
            iterations++
            width++
            height++
            top +=3
            left +=3
        } else {
            iterations--
            width--
            height--
            top -=3
            left -=3
        }

        element.style.width = `${width}px`
        element.style.height = `${height}px`
        element.style.top = `${top}px`
        element.style.left = `${left}px`
    }, 20)
}

addAnimation(element)