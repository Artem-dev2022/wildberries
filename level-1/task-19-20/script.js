// Задание 19
// Реализовать виджет, отображающий список постов из любого паблика в VK 
// (подойдет любой паблик, где постов очень много).
// Виджет должен иметь фиксированные размеры и возможность прокрутки. 
// При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
// Необходимо реализовать возможность кэширования уже загруженных данных: 
// если пользователь закрыл страницу, а потом снова открыл ее, 
// виджет должен отображать все загруженные ранее данные 
// (новые данные должны подгружаться из учетом уже загруженных ранее).

// При переполнении localStorage, данные, загруженные последними 
// должны вытеснять данные загруженные первыми.

const REDIRECT_URL = 'https://oauth.vk.com/blank.html';
const appID = '51725226';

// Получить токен https://oauth.vk.com/authorize?client_id=${appID}&display=popup&redirect_uri=${REDIRECT_URL}&scope=offline&response_type=token&v=5.131

const BASE_URL = 'https://api.vk.com/method/wall.get';
const owner_id = -29534144;
const access_token = '' // вставить свой

const app = document.querySelector('.app')
const posts = document.querySelector('.posts')

//localStorage.clear()
function loadData(count = 5, offset = 0, callback = 'callbackFunc'){
    // работаю с api таким методом потому что через fetch vk api ругается на corsы
    let script = document.createElement('SCRIPT');
    script.src = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&count=${count}&offset=${offset}&access_token=${access_token}&v=5.131&callback=${callback}`;
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadData()

function apiData(result){ // данная функция вызывается при скролле
    let savedPosts = JSON.parse(localStorage.getItem('posts'))
    result.response.items.forEach(i => { // добавляю элементы по одному методом push, чтобы не создавать новый массив
        savedPosts.push(i)
    })
    // чтобы работать с массивами в localStorage их предварительно преобразовывают в json строку, а при получении парсят обратно в объект
    try {
        // проверка на переполнение
        localStorage.setItem('posts', JSON.stringify(savedPosts)) 
    } catch (error) {
        console.error(error)
        savedPosts.splice(0, 5)
        // удаляем первые 5 элементов
        localStorage.setItem('posts', JSON.stringify(savedPosts))
    }
    
    fillList(result.response.items)
}

function callbackFunc(result) { // данная функция вызовется при первичной загрузке страници
    let count = 5;
    let offset = 0;
    let data = result.response.items

    // если в localStorage уже есть посты, выведем их все, в противном случае result
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify(data))
        fillList(data)
    } else {
        let savedPosts = JSON.parse(localStorage.getItem('posts'))
        fillList(savedPosts)
    }
    
    let trigger = document.querySelector(".target");

    // при помощи данной конструкции отслеживаю момент когда пользователь проскролил до элемента trigger
    let callback = function (entries, observer) {
        entries.forEach((entry) => {
            offset += 5;
        if (entry.isIntersecting) {
            loadData(count, offset, 'apiData')
            filledStorage('posts', 5000)
        }})
    };
    let observer = new IntersectionObserver(callback,  {threshold: 1.0});
    observer.observe(trigger);
}

function fillList(data){ // заполнет список постов
    for (let i of data) {
        const post = document.createElement('li');
        post.classList.add('post')

        let time = new Date(i.date * 1000).toLocaleString();
        let attachment;
        let attachmentType = i?.attachments[0]?.type

        if (attachmentType === 'doc') {
            attachment = i.attachments[0].doc.url
        } else  if (attachmentType === 'photo') {
            attachment = i.attachments[0].photo.sizes[0].url
        } else if (attachmentType === 'video') {
            attachment = i.attachments[0].video.image[0].url
        } else {
            attachment = './404-error.avif'
        }

        post.innerHTML = `
            <img class='post__img' src=${attachment} alt='Нет картинки'>
            <div class='post__info'>
                <span>${time}</span>
                <p class='post__text'>${i.text? i.text: 'Репост со стороннего ресурса'}</p>

                <div class='post__activity'>
                    <span>Лайков: ${i.likes.count}</span>
                    <span>Репостов: ${i.reposts.count}</span>
                    <span>Комментариев: ${i.comments.count}</span>
                </div>
            </div>`
        posts.append(post)
    }
}

// Задание 20
// Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage 
// для предыдущей задачи. 
// При изменении данных в localStorage в консоль должен выводиться 
// объем занятой памяти / максимальный размер хранилища.

function filledStorage(key, max){
    console.log(`${(localStorage[key].length / 1024).toFixed(2)} / ${max} kb`)
}
