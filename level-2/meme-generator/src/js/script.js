// Генератор мемов 
// Создайте приложение, которое позволяет пользователю создавать собственные мемы. Приложение должно предоставлять возможность загрузки изображения, добавлять текстовые элементы и настраивать их положение и стиль.
// Реализуйте функцию сохранения созданного мема на локальном компьютере.

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

let shapes = [];

const fileInput = document.getElementById('file');
const textInput = document.querySelector('.text__input');

function drawShapes(){
    context.clearRect(0, 0, canvas.width, canvas.height )
    context.fillStyle = 'white';
    context.fillRect(0, 0, 400, 400);

    for (let shape of shapes) {
        if (shape.type === 'img') {
            context.drawImage(shape.url, 0, 0, shape.width, shape.height);
        }
        if (shape.type === 'text') {
            context.fillStyle = shape.color;
            context.font = `${shape.fontWeight} ${shape.fontStyle} ${shape.fontSize}px sans-serif`;
            context.textBaseline = 'top';
            context.fillText(shape.text, shape.x, shape.y);
        }
    }
}

fileInput.addEventListener('change', (e) => {
    const file  = e.srcElement.files[0]

    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        const img = new Image()
        img.src = URL.createObjectURL(file);

        img.onload = function(){
            createImage(img)
        }
    }
    reader.onerror = function() {
        console.log(reader.error);
    };
})

let currentShapeIndex = null;
let isDragging = false;
let startX;
let startY;
let offsetX = 0;
let offsetY = 0;

function getOffset(){
    const canvasOffset = canvas.getBoundingClientRect();
    offsetX = canvasOffset.left;
    offsetY = canvasOffset.top;
}

getOffset()

/// text
function getTextSize(string, fontSize, fontWeight){
    let text = document.createElement('p');
    text.innerHTML = string
    text.style.display = 'inline'
    text.style.fontSize = `${fontSize}px`
    if (fontWeight === 'bold') text.style.fontWeight = 900
    document.body.append(text)
    let width = text.offsetWidth
    let height = text.offsetHeight
    text.remove()
    return [width, height]
}

function createText(string, fontSize, fontColor, fontWeight, fontStyle){
    let textWidth = getTextSize(string, fontSize, fontWeight)[0]
    let textHeight = getTextSize(string, fontSize, fontWeight)[1]
    shapes.push({
        type: 'text', 
        text: string, 
        x: 10, 
        y: 10, 
        width: textWidth, 
        height: textHeight,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        color: fontColor
    })
    drawShapes()
}

function createImage(img){
    shapes = shapes.filter(i => i.type !== 'img')
    shapes.unshift({
        type: 'img',
        url: img,
        x: 0, 
        y: 0,
        width: 400,
        height: 400
    })
    drawShapes()
}

/////
window.onscroll = getOffset
window.onresize = getOffset
canvas.onresize = getOffset

function mouseDown(e){
    e.preventDefault();

    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    let index = 0;
    for (let shape of shapes) {
        if (isMouseInShape(startX, startY, shape)) {
            currentShapeIndex = index;
            isDragging = true;
        }
        index++;
    }
}

function mouseUp(e){
    if (!isDragging) {
        return
    }
    e.preventDefault();
    isDragging = false;
}
function mouseOut(e){
    if (!isDragging) {
        return
    }
    e.preventDefault();
    isDragging = false;
}

function mouseMove(e){
    if (!isDragging) {
        return
    } else {
        e.preventDefault()
        let mouseX = parseInt(e.clientX - offsetX);
        let mouseY = parseInt(e.clientY - offsetY);

        let dx = mouseX - startX;
        let dy = mouseY - startY;

        shapes[currentShapeIndex].x += dx
        shapes[currentShapeIndex].y += dy

        drawShapes()

        startX = mouseX
        startY = mouseY
    }
}

canvas.onmousedown = mouseDown
canvas.onmouseup = mouseUp
canvas.onmouseout = mouseOut
canvas.onmousemove = mouseMove

function isMouseInShape(x, y, shape){
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) return true
    return false
}

/// text editing
const createTextBtn = document.querySelector('.addTextBtn');
const downloadBtn = document.querySelector('.download-btn');
const sizeInput = document.getElementById('size');
const colorInput = document.getElementById('text-color');
const colorBtn = document.querySelector('.text-color-btn');
const boldBtn = document.getElementById('bold');
const italicBtn = document.getElementById('italic');

let bold = false;
let italic = false;

sizeInput.addEventListener('change', () => {
    textInput.style.fontSize = `${sizeInput.value}px`;
})
colorInput.addEventListener('change', () => {
    textInput.style.color = colorInput.value
    colorBtn.style.backgroundColor = colorInput.value
})
boldBtn.addEventListener('click', () => {
    textInput.classList.toggle('text-bold');
    boldBtn.classList.toggle('text__btn--active')
    bold = !bold
})
italicBtn.addEventListener('click', () => {
    textInput.classList.toggle('text-italic');
    italicBtn.classList.toggle('text__btn--active')
    italic = !italic
})

function resetFields(){
    // reset buttons & inputs
    sizeInput.value = 16
    colorInput.value = 'black'
    colorBtn.style.backgroundColor = 'black'
    const allButtons = document.querySelectorAll('.text__btn');
    allButtons.forEach(btn => {
        btn.classList.remove('text__btn--active')
    })
    // reset textInput
    textInput.value = ''
    textInput.style.fontSize = '16px';
    textInput.style.color = 'black';
    textInput.classList.remove('text-bold', 'text-italic');
    bold = false
    italic = false
}

createTextBtn.addEventListener('click', () => {
    if (textInput.value === '') return
    let fontWeightValue = 'normal'
    let fontStyleValue = 'normal'
    if (bold === true) fontWeightValue = 'bold'
    if (italic === true) fontStyleValue = 'italic'
    createText(textInput.value, sizeInput.value, colorInput.value, fontWeightValue, fontStyleValue)
    resetFields()
    downloadBtn.classList.add('download-btn--active')
})

/// download
downloadBtn.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'meme.jpg';
    link.href = canvas.toDataURL();
    link.click();
})