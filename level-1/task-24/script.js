// Разработайте страницу, отображающую таблицу с данными.
// Требования:
// данные должны загружаться при загрузке страницы
// необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// необходимо реализовать клиентскую пагинацию (50 элементов на странице)

const tableBody = document.getElementById('tbody');
const theadItems = document.querySelectorAll('.thead__item');
const sortIcons = document.querySelectorAll('.sort-icon');

fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
.then(response => response.json())
.then(result => {
    createTableRows([...result].splice(0, 50))
    createPagination(result)
    sortByField(result)
})
.catch(error => console.error(error));

function createTableRows(result){
    let data = result
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.tel}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>`;
        tableBody.appendChild(tr);
    });
}

function createPagination(data){
    const pagination = document.querySelector('nav');
    for (let i = 1; i <= Math.ceil(data.length/50); i++) {
        const btn = document.createElement('button')
        if (i === 1) btn.classList.add('btn-active')
        btn.textContent = i
        pagination.append(btn)
        btn.addEventListener('click', () => {
            let newData = [...data].splice(50 * i - 50, 50)
            tableBody.innerHTML = ''
            createTableRows(newData)
            document.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('btn-active')
            })
            btn.classList.add('btn-active')
        })
    }
}

function sortByField(result){
    let data = [...result].splice(0, 50)
    let sortReverse = {fname: false, lname: false, tel: false, address: false, city: false}

    theadItems.forEach((item, index) =>
        item.addEventListener('click', () => {
            let newData = [...data].sort((a, b) => {
                if (sortReverse[Object.keys(sortReverse)[index]]) {
                    if (a[Object.keys(a)[index]] > b[Object.keys(b)[index]]) return -1;
                } else {
                    if (a[Object.keys(a)[index]] < b[Object.keys(b)[index]]) return -1;
                }
            })
            if (sortReverse[Object.keys(sortReverse)[index]]) {
                resetIcons()
                sortIcons[index].style.transform = 'rotate(0deg)'
            } else {
                resetIcons()
                sortIcons[index].style.transform = 'rotate(180deg)'
            }
            sortIcons[index].style.opacity = '1'
            sortReverse[Object.keys(sortReverse)[index]] = !sortReverse[Object.keys(sortReverse)[index]]
            tableBody.innerHTML = ''
            createTableRows(newData)
        })
    )
}

function resetIcons(){
    sortIcons.forEach(icon => {
        icon.style.opacity = '0'
        icon.style.transform = 'rotate(0deg)'
    })
}