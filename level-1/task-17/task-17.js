// Необходимо реализовать простое поле ввода адреса с функцией геокодинга: 
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов 
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. 
// Найденные данные должны отображаться в выпадающем списке, 
// из которого можно выбрать подходящее значение.

// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const token = '5d021a9a-2675-4aca-89bf-eba9284b36c3';

ymaps.ready(init);
function init(){
    // создание карты
    var myMap = new ymaps.Map("map", {
            center: [55.819543, 37.611619],
            zoom: 9
        }
    )
    // выпадающий список
    var suggestView = new ymaps.SuggestView('input');

    function search(e){
        let address = e.target.value;
        
        if (address === '') return
        
        var myGeocoder = ymaps.geocode(address)
        .then(function(res) {
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');

            myMap.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: true
            });
            myMap.geoObjects.add(res.geoObjects);
        });
    }

    const input = document.getElementById('input')

    input.addEventListener('input', debounce(search, 1000))
    
    function debounce(callBack, ms){
        let timeout;  // замыкание: каждый вызов возвращаемой функции будет привязан к одной и той же переменной
        return function(){
            const fnCall = () => {callBack.apply(this, arguments)}
            // использую стрелочную функцию т.к. у неё нет собств. контекста
            // вызовем callBack через apply чтобы передать ей контекст и аргументы полученные через событие

            clearTimeout(timeout); // каждое событие очищаем timeout, чтобы начать его заново
            timeout = setTimeout(
                fnCall
                ,ms
            )
        }
    }
}

// Для данной задачи достаточно debounce функции.
// Запрос в любом случае отправится по истечению задержки после ввода последнего символа в строку поиска