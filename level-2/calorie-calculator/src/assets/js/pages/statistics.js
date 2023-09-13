import {createHTMLElement} from '../utils.js'
import {warning} from './diary.js'

function statisticsPage(){
    const data = JSON.parse(localStorage.getItem('eatings')) === null ? [] : JSON.parse(localStorage.getItem('eatings'))
    const target = localStorage.getItem('target') === null ? 0 : localStorage.getItem('target')
    const totalCalories = Math.ceil(data.reduce((a, b) => a + b.cal, 0));

    app.innerHTML = `<div class="container container__statistics">
                        <h1 class="title">График приёмов пищи</h1>
                        <div class="statistics__top">
                            <h2 class="statistics__subtitle">Всего потреблено калорий / целевой показатель</h2>
                            <span class="statistics__ratio">${totalCalories}/${target}</span>
                            <span class="warning-message">Вы превысили суточную норму!</span>
                        </div>
                        <div class="chart"></div>
                    </div>`

    const chart = document.querySelector('.chart');
    const warningMessage = document.querySelector('.warning-message');
    
    for (let i of data) {
        let sum = +i.cal / +totalCalories * 100

        const chartItem = createHTMLElement('div', 'chart__item')

        const columnContainer = createHTMLElement('div', 'chart__container')
        
        const column = createHTMLElement('div', 'chart__column')
        column.style.height = `${+sum.toFixed(2) * 150 / 100}px`

        const percent = createHTMLElement('span', 'chart__percent')
        percent.textContent = `${+sum.toFixed(2)}%`

        const food = createHTMLElement('span', 'chart__food')
        food.textContent = i.title

        chartItem.append(columnContainer, food)
        columnContainer.append(percent, column)
        chart.append(chartItem)
    }

    if (warning()) {
        warningMessage.classList.add('visible')
    } else {
        warningMessage.classList.remove('visible')
    }
}

export default statisticsPage