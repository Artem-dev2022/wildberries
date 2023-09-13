import {getId, createHTMLElement} from '../utils.js'

function diaryPage(){ 
    app.innerHTML = `<div class="container container__diary">
                    <h1 class="title">Приёмы пищи</h1>
                    <button class="add-eating add-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z" fill="#6E7191"/>
                        </svg>
                        <span>Добавить приём</span>
                    </button>
  
                    <div class="table">
                        <div class="table__head table__head--eating">
                            <span class="table__head__title">Наименование</span>
                            <div class="table__head__right table__head__right--eating">
                                <span class="table__head__title">Количество</span>
                                <span class="table__head__title">кКал</span>
                            </div>
                        </div>
                        <ul class="table__body table__body-eatings"></ul>
                    </div>
                    <div class="modal-eating-bg modal-bg">
                        <div class="modal-eating modal">
                            <span class="modal__title">Наименование продукта:</span>
                            <div class="dropdown">
                                <div class="dropdown__head">
                                    <input class="dropdown__input" type="text" readonly>
                                    <button class="dropdown__btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M16.9999 13.41L12.7099 9.17C12.617 9.07628 12.5064 9.00188 12.3845 8.95111C12.2627 8.90035 12.132 8.87421 11.9999 8.87421C11.8679 8.87421 11.7372 8.90035 11.6154 8.95111C11.4935 9.00188 11.3829 9.07628 11.2899 9.17L7.04995 13.41C6.95622 13.503 6.88183 13.6136 6.83106 13.7354C6.78029 13.8573 6.75415 13.988 6.75415 14.12C6.75415 14.252 6.78029 14.3827 6.83106 14.5046C6.88183 14.6264 6.95622 14.737 7.04995 14.83C7.23731 15.0163 7.49076 15.1208 7.75495 15.1208C8.01913 15.1208 8.27259 15.0163 8.45995 14.83L11.9999 11.29L15.5399 14.83C15.7262 15.0147 15.9776 15.1189 16.2399 15.12C16.3716 15.1208 16.502 15.0955 16.6239 15.0458C16.7457 14.996 16.8565 14.9227 16.9499 14.83C17.047 14.7404 17.1254 14.6324 17.1805 14.5123C17.2356 14.3923 17.2664 14.2625 17.271 14.1304C17.2757 13.9984 17.2541 13.8667 17.2076 13.7431C17.161 13.6194 17.0905 13.5062 16.9999 13.41Z" fill="black"/>
                                        </svg>
                                    </button>
                                </div>

                                <ul class="dropdown__list"></ul>
                            </div>

                            <label class="amount__label">
                                Количество
                                <input class="modal__input" id="input-amount">
                            </label>
                            <span class="modal__error modal-eating__error">Необходимо заполинть все поля</span>
                            <button class="modal__btn" id="save-eating">Сохранить</button>
                        </div>
                    </div>
                    </div>`
                    
    const dropdown = document.querySelector('.dropdown');
    const dropdownInput = document.querySelector('.dropdown__input');
    const dropdownBtn = document.querySelector('.dropdown__btn');
    const dropdownList = document.querySelector('.dropdown__list');

    let chosen;

    dropdownBtn.addEventListener('click', () => {
        dropdown.classList.toggle('dropdown--active')
    })

    function getDropdownList(){
        let products = JSON.parse(localStorage.getItem('products'))
        products?.forEach(item => {
            const listItem = createHTMLElement('li', 'dropdown__item')
            listItem.textContent = item.title
            listItem.addEventListener('click', () => {
                chosen = item.title
                if (item.unit === 'piece') {
                    dropdownInput.value = `${item.title}, шт`;
                } else {
                    dropdownInput.value = `${item.title}, г`;
                }
                dropdown.classList.remove('dropdown--active')
            })
            dropdownList.append(listItem)
        })
    }
    getDropdownList()

    const addEatingsBtn = document.querySelector('.add-eating')
    const modalEatingBg = document.querySelector('.modal-eating-bg')
    const inputTitle = document.getElementById('input-eating')
    const inputAmount = document.getElementById('input-amount')

    const saveEating = document.getElementById('save-eating')
    const tableBody = document.querySelector('.table__body-eatings')
  
    const errorMessage = document.querySelector('.modal-eating__error')

    inputAmount.addEventListener('input', () => {
      inputAmount.value = inputAmount.value.replace(/[^0-9]/g, '');
    })
  
    function getEatings(){
      if (localStorage.getItem('eatings') === null) {
          localStorage.setItem('eatings', JSON.stringify([]))
      }
      return JSON.parse(localStorage.getItem('eatings'))
    }
  
    function refreshAddEating() {
        modalEatingBg.classList.remove('visible')
        errorMessage.classList.remove('visible')
        dropdown.classList.remove('dropdown--active')
        dropdownInput.value = ''
        inputAmount.value = ''
    }

    addEatingsBtn.addEventListener('click', () => {
      modalEatingBg.classList.add('visible')
    })
  
    modalEatingBg.addEventListener('click', (e) => {
      if (e.target === modalEatingBg) {
        refreshAddEating()
      }
    })

    saveEating.addEventListener('click', () => {
        if (dropdownInput.value === '' || inputAmount.value === '') {
            errorMessage.classList.add('visible')
            return
        }
        
        let allEatings = getEatings()
        let allProducts = JSON.parse(localStorage.getItem('products'))
        let productCal = allProducts.find(i => i.title === chosen).cal
        let unit = allProducts.find(i => i.title === chosen).unit === 'piece' ? inputAmount.value * productCal : inputAmount.value * productCal / 100

        const newEating = {
            id: getId(allEatings),
            title: dropdownInput.value,
            amount: inputAmount.value,
            cal: unit
        }
        allEatings.push(newEating)
        localStorage.setItem('eatings', JSON.stringify(allEatings))
        renderTable(tableBody, getEatings())
        refreshAddEating()
        warning()
    })
  
    renderTable(tableBody, getEatings())
  
    function renderProductItem(parent, obj){
      const item = createHTMLElement('li', 'table__product')
      const itemTitle = createHTMLElement('span', 'table__product__title')
      itemTitle.textContent = obj.title
      const itemRight = createHTMLElement('span', 'table__product__right')
      const itemAmount = createHTMLElement('span', 'table__product__cal')
      itemAmount.textContent = obj.amount
      const itemCalGramm = createHTMLElement('span', 'table__product__cal')
      itemCalGramm.textContent = obj.cal

      const itemDeleteBtn = createHTMLElement('button', 'table__product__delete')
      itemDeleteBtn.title = "удалить"
      itemDeleteBtn.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                  <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="#6E7191"/>
                                </svg>`
  
      itemDeleteBtn.addEventListener('click', () => {
        let products = getEatings().filter(i => i.id !== obj.id)
        localStorage.setItem('eatings', JSON.stringify(products))
        renderTable(tableBody, getEatings())
        warning()
      })
  
      itemRight.append(itemAmount, itemCalGramm, itemDeleteBtn)
      item.append(itemTitle, itemRight)
      parent.append(item)
    }
  
    function renderTable(parent, list){
      parent.innerHTML = ''
      list.forEach(eating => {
          renderProductItem(parent, eating)
      })
    }
}

function warning(){
    const target = localStorage.getItem('target')
    const totalCalories = JSON.parse(localStorage.getItem('eatings'))?.reduce((a, b) => a + b.cal, 0);

    if ( target < totalCalories) {
        document.querySelector('.warning').classList.add('visible');
        return true
    } else {
        document.querySelector('.warning').classList.remove('visible');
        return false
    }
}

export {diaryPage, warning}