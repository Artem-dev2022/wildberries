function getId(arr){
    let max = arr.reduce((i, a) => i.id > a.id ? i : a, 0);
    return max === 0 ? 0 : max.id + 1;
}

function createHTMLElement(tag, className){
    const elem = document.createElement(tag)
    elem.classList.add(className)
    return elem
}
  
export {getId, createHTMLElement}