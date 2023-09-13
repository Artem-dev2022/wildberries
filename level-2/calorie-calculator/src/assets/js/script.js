import productsPage from './pages/products.js'
import statisticsPage from './pages/statistics.js'
import targetPage from './pages/target.js'
import {diaryPage, warning} from './pages/diary.js'

const navBtnProducts = document.getElementById('nav-btn-products')
const navBtnStatistics = document.getElementById('nav-btn-statistics')
const navBtnTarget = document.getElementById('nav-btn-target')
const navBtnDiary = document.getElementById('nav-btn-diary')
const app = document.getElementById('app');

function refreshNav(){
  document.querySelectorAll('.nav__btn').forEach(btn => {
    btn.classList.remove('nav__btn--active')
  })
}

navBtnProducts.addEventListener('click', () => {
  switchPage('products', productsPage, navBtnProducts)
})

navBtnStatistics.addEventListener('click', () => {
  switchPage('statistics', statisticsPage, navBtnStatistics)
})

navBtnTarget.addEventListener('click', () => {
  switchPage('target', targetPage, navBtnTarget)
})

navBtnDiary.addEventListener('click', () => {
  switchPage('diary', diaryPage, navBtnDiary)
})

function switchPage(pageName, pageFunc, pageBtn){
  sessionStorage.setItem('page', pageName)
  refreshNav()
  pageFunc()
  pageBtn.classList.add('nav__btn--active')
}

warning()

switch (sessionStorage.getItem('page')) {
  case 'statistics':
    statisticsPage()
    navBtnStatistics.classList.add('nav__btn--active')
    break
  case 'target':
    targetPage()
    navBtnTarget.classList.add('nav__btn--active')
    break
  case 'diary':
    diaryPage()
    navBtnDiary.classList.add('nav__btn--active')
    break
  default:
    productsPage()
    navBtnProducts.classList.add('nav__btn--active')
    break
}
