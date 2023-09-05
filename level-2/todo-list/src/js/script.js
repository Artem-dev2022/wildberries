const addBtn = document.getElementById('btn-add');
const addInput = document.getElementById('input-add');
const descInput = document.getElementById('input-desc');
const timeInput = document.getElementById('input-time');
const dateInput = document.getElementById('input-date');
const formError = document.querySelector('.form__error');
const mainList = document.getElementById('list');
const sortByCreationBtn = document.getElementById('sort-creation')
const sortByTermBtn = document.getElementById('sort-term')

function createTask(id, done, taskText, taskDesc, taskTime, taskDate, createdAt){
    const task = document.createElement('div');
    task.classList.add('task');

    const taskBottom = document.createElement('div');
    taskBottom.classList.add('task__bottom');

    const left = document.createElement('div');
    left.classList.add('task__left');

    const label = document.createElement('label');
    label.classList.add('task__label')
    label.htmlFor = id;

    const checkBox = document.createElement('input');
    checkBox.classList.add('task__checkbox')
    checkBox.id = id;
    checkBox.type = 'checkbox';

    checkBox.checked = done ? true : false;

    checkBox.addEventListener('change', () => {
        checkDone(id)
    })

    const fakeCheckBox = document.createElement('div');
    fakeCheckBox.classList.add('task__fake');

    label.append(checkBox, fakeCheckBox)

    left.append(label)

    const creationDate = document.createElement('span');
    creationDate.classList.add('task__creation');
    creationDate.textContent = `Создано ${formatDate(createdAt)}`;

    const taskInputs = document.createElement('div');
    taskInputs.classList.add('task__inputs');

    const inputLabelTitle = document.createElement('label');
    inputLabelTitle.classList.add('task__label');
    inputLabelTitle.htmlFor = `task-title-${id}`;
    inputLabelTitle.textContent = 'Задача:'

    const input = document.createElement('input');
    input.classList.add('task__input');
    input.placeholder = 'Значение не должно быть пустым'
    input.id = `task-title-${id}`;
    input.readOnly = true;
    input.value = taskText;

    inputLabelTitle.append(input)

    const inputLabelDesc = document.createElement('label');
    inputLabelDesc.classList.add('task__label');
    inputLabelDesc.htmlFor = `task-desc-${id}`;
    inputLabelDesc.textContent = 'Описание:'

    const inputDesc = document.createElement('input');
    inputDesc.classList.add('task__input');
    inputDesc.id = `task-desc-${id}`;
    inputDesc.readOnly = true;
    inputDesc.value = taskDesc;

    inputLabelDesc.append(inputDesc)

    const taskTerm = document.createElement('span');
    taskTerm.classList.add('task__term')
    taskTerm.textContent = 'Срок выполнения:'

    const inputTime = document.createElement('input');
    inputTime.classList.add('task__time');
    inputTime.type = 'time';
    inputTime.value = taskTime;
    inputTime.readOnly = true;

    const inputDate = document.createElement('input');
    inputDate.classList.add('task__date');
    inputDate.type = 'date'
    inputDate.value = taskDate;
    inputDate.readOnly = true;

    const taskDateTimeInputs = document.createElement('div');
    taskDateTimeInputs.classList.add('task__datetime');

    taskDateTimeInputs.append(taskTerm, inputTime, inputDate)
    taskInputs.append(inputLabelTitle, inputLabelDesc, taskDateTimeInputs)

    const duttons = document.createElement('div');
    duttons.classList.add('task__buttons')
    const changeBtn = document.createElement('button');
    const saveBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    changeBtn.classList.add('task__button', 'task__button--active', 'task__button--edit');
    saveBtn.classList.add('task__button', 'task__button--save');
    deleteBtn.classList.add('task__button', 'task__button--active', 'task__button--delete');
    changeBtn.textContent = 'Редактировать';
    saveBtn.textContent = 'Сохранить';
    deleteBtn.textContent = 'Удалить';

    changeBtn.addEventListener('click', () => {
        input.readOnly = false;
        inputDesc.readOnly = false;
        inputTime.readOnly = false;
        inputDate.readOnly = false;
        input.focus()
        changeBtn.classList.remove('task__button--active');
        saveBtn.classList.add('task__button--active');
    })

    saveBtn.addEventListener('click', () => {
        let currentValue = input.value.trim()
        if (currentValue === '') return
        let currentValueDesc = inputDesc.value.trim()
        editTask(id, currentValue, currentValueDesc, inputTime.value, inputDate.value)
        input.readOnly = true;
        inputDesc.readOnly = true;
        inputTime.readOnly = true;
        inputDate.readOnly = true;
        input.value = currentValue;
        inputDesc.value = currentValueDesc;
        saveBtn.classList.remove('task__button--active');
        changeBtn.classList.add('task__button--active');

        refreshSortButtons()
    })

    deleteBtn.addEventListener('click', () => {
        deleteTask(id);
        renderList(getTasks());
    })

    taskBottom.append(left, taskInputs, duttons)
    duttons.append(changeBtn, saveBtn, deleteBtn)
    task.append(creationDate, taskBottom)
    mainList.append(task)
}

function getTasks(){
    if (localStorage.getItem('tasks') === null) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem('tasks'))
}

function renderList(list){
    mainList.innerHTML = '';

    if (list.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Task list is empty.';
        mainList.append(emptyMessage)
    } else {
        for (let i of list) {
            createTask(i.id, i.done, i.text, i.description, i.time, i.date, i.createdAt);
        }
    }
}

renderList(getTasks())

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formError.classList.remove('form__error--active')
    if (addInput.value.trim() === '') {
        formError.classList.add('form__error--active')
        return
    }

    const tasksList = getTasks();
    const currentTime = new Date().getTime()
    tasksList.push({
        'id': getId(), 
        'done': false, 
        'text': addInput.value.trim(),
        'description': descInput.value.trim(),
        'time': timeInput.value,
        'date': dateInput.value,
        'createdAt': currentTime
    })
    localStorage.setItem('tasks', JSON.stringify(tasksList))
    
    renderList(getTasks())
    refreshSortButtons()

    addInput.value = '';
    descInput.value = '';
    timeInput.value = '';
    dateInput.value = '';
})

function getId(){
    let list = getTasks();
    let max = list.reduce((i, a) => i.id > a.id ? i : a, 0);

    return max === 0 ? 0 : max.id + 1;
}

function deleteTask(id){
    let list = getTasks();
    let newList = list.filter(i => i.id !== id)
    localStorage.setItem('tasks', JSON.stringify(newList))
}

function editTask(id, text, desc, time, date){
    let list = getTasks();
    list.find(i => i.id === id).text = text;
    list.find(i => i.id === id).description = desc;
    list.find(i => i.id === id).time = time;
    list.find(i => i.id === id).date = date;
    localStorage.setItem('tasks', JSON.stringify(list));
}

function checkDone(id){
    let list = getTasks();
    list.find(i => i.id === id).done = !list.find(i => i.id === id).done;
    localStorage.setItem('tasks', JSON.stringify(list));
}

function formatDate(dateMS){
    let date = new Date(dateMS)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

    let result = `${hour}:${minutes} ${day}-${month}-${year}`
    return result
}

function refreshSortButtons(){
    sortByTermBtn.classList.remove('sort__btn--active')
    sortByCreationBtn.classList.remove('sort__btn--active')
}

sortByCreationBtn.addEventListener ('click', () => {
    refreshSortButtons()
    sortByCreationBtn.classList.add('sort__btn--active')

    let list = getTasks().sort((a,b) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
    })
    renderList(list);
})

sortByTermBtn.addEventListener ('click', () => {
    refreshSortButtons()
    sortByTermBtn.classList.add('sort__btn--active')

    let list = getTasks().sort((a,b) => {
        if (getDate(a) > getDate(b)) {
            return -1;
        }
    })
    renderList(list);
})

function getDate(obj){
    if (obj.date === '') return

    let thisHour;
    let thisMinute;

    if (obj.time === '') {
        thisHour = 0
        thisMinute = 0
    } else {
        thisHour = obj.time.split(':')[0]
        thisMinute = obj.time.split(':')[1]
    }

    let thisYear = obj.date.split('-')[0]
    let thisMonthIndex = obj.date.split('-')[1] - 1
    let thisDay = obj.date.split('-')[2]
    let date = new Date(thisYear, thisMonthIndex, thisDay, thisHour, thisMinute, 0)

    return date.getTime()
}

function sendNotification(){
    Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
            window.setInterval(() => {
                let list = getTasks()
            
                for (let item of list) {
                    const today = new Date().setSeconds(0, 0)
                    const date = new Date(getDate(item)).setSeconds(0, 0)
            
                    if (today === date)  {
                        const notification = new Notification('Напоминание', {
                            body: `Истёк срок выполнения задачи: ${item.text}`,
                            icon: "./assets/img/time.svg",
                            tag: `${item.text}`
                        })
                        notification.addEventListener('error', () => {
                            console.log('error')
                        })
                    }
                    if (date - today === 3600000)  {
                        const notification = new Notification('Напоминание', {
                            body: `Остался 1 час для задачи: ${item.text}`,
                            icon: "./assets/img/time.svg",
                            tag: `hour${item.text}`
                        })
                        notification.addEventListener('error', () => {
                            console.log('error')
                        })
                    }
                }
            }, 1000);
        }
    })
}
sendNotification()