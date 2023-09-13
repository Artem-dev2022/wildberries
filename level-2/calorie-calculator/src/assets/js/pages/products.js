import {data} from '../data.js'
import {getId, createHTMLElement} from '../utils.js'

function productsPage(){ 
    app.innerHTML = `<div class="container container__products">
                      <div class="container__top">
                        <div class="search">
                            <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <path d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z" stroke="#1D1929"/>
                            </svg>
                            <input class="search__input" id="search-products" type="text" placeholder="Поиск">
                        </div>
                        </div>
  
                        <h1 class="title">Продукты</h1>
                        <button class="add-product add-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z" fill="#6E7191"/>
                            </svg>
                            <span>Добавить продукт</span>
                        </button>
  
                        <div class="table">
                            <div class="table__head">
                                <span class="table__head__title">Наименование</span>
                                <div class="table__head__right">
                                    <span class="table__head__title">кКал в 1 шт</span>
                                    <span class="table__head__title">кКал в 100г</span>
                                    <button class="btn-sort" title="сортировать">
                                        <svg class="sort-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M17.7099 11.2899L12.7099 6.2899C12.6148 6.19886 12.5027 6.12749 12.3799 6.0799C12.1365 5.97988 11.8634 5.97988 11.6199 6.0799C11.4972 6.12749 11.385 6.19886 11.2899 6.2899L6.28994 11.2899C6.1967 11.3831 6.12274 11.4938 6.07228 11.6156C6.02182 11.7375 5.99585 11.868 5.99585 11.9999C5.99585 12.2662 6.10164 12.5216 6.28994 12.7099C6.47825 12.8982 6.73364 13.004 6.99994 13.004C7.26624 13.004 7.52164 12.8982 7.70994 12.7099L10.9999 9.4099V16.9999C10.9999 17.2651 11.1053 17.5195 11.2928 17.707C11.4804 17.8945 11.7347 17.9999 11.9999 17.9999C12.2652 17.9999 12.5195 17.8945 12.707 17.707C12.8946 17.5195 12.9999 17.2651 12.9999 16.9999V9.4099L16.2899 12.7099C16.3829 12.8036 16.4935 12.878 16.6154 12.9288C16.7372 12.9796 16.8679 13.0057 16.9999 13.0057C17.132 13.0057 17.2627 12.9796 17.3845 12.9288C17.5064 12.878 17.617 12.8036 17.7099 12.7099C17.8037 12.6169 17.8781 12.5063 17.9288 12.3845C17.9796 12.2626 18.0057 12.1319 18.0057 11.9999C18.0057 11.8679 17.9796 11.7372 17.9288 11.6153C17.8781 11.4935 17.8037 11.3829 17.7099 11.2899Z" fill="white"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <ul class="table__body table__body-products"></ul>
                        </div>
                        <div class="modal-product-bg modal-bg">
                          <div class="modal-product modal">
                              <label class="modal__label" for="input-title">
                                  <span class="modal__title">Наименование продукта:</span>
                                  <input class="modal__input" id="input-title" type="text">
                              </label>
    
                              <div class="modal-product__row">
                                  <label class="toggle__label">
                                      кКал в
                                      <input class="toggle__base" id="toggle" type="checkbox"/>
                                      <div class="toggle__custom"></div>
                                      <span class="toggle__title toggle__title-on">1 шт</span>
                                      <span class="toggle__title toggle__title-off">100 г</span>
                                      :
                                  </label>
                                  <input class="modal__input" id="input-cal" type="text">
                              </div>
                              <span class="modal__error modal-product__error">Необходимо заполинть все поля</span>
                              <button class="modal__btn" id="save-product">Сохранить</button>
                          </div>
                        </div>
                        </div>`
    
    const addProductBtn = document.querySelector('.add-product')
    const modalProductBg = document.querySelector('.modal-product-bg')
    const inputTitle = document.getElementById('input-title')
    const toggle = document.getElementById('toggle')
    const inputCal = document.getElementById('input-cal')
    const saveProduct = document.getElementById('save-product')
    const tableBody = document.querySelector('.table__body-products')
    const sortBtn = document.querySelector('.btn-sort')
    const searchProducts = document.getElementById('search-products')
    const sortIcon = document.querySelector('.sort-icon')
    const errorMessage = document.querySelector('.modal-product__error')
  
    inputCal.addEventListener('input', () => {
      inputCal.value = inputCal.value.replace(/[^0-9]/g, '');
    })
  
    function getProducts(){
      if (localStorage.getItem('products') === null) {
          localStorage.setItem('products', JSON.stringify(data))
      }
      return JSON.parse(localStorage.getItem('products'))
    }
  
    addProductBtn.addEventListener('click', () => {
      modalProductBg.classList.add('visible')
    })
  
    modalProductBg.addEventListener('click', (e) => {
      if (e.target === modalProductBg) {
        refreshAddProduct()
      }
    })
  
    saveProduct.addEventListener('click', () => {
      if (inputTitle.value === '' || inputCal.value === '') {
        errorMessage.classList.add('visible')
        return
      }
      const newProduct = {
        id: getId(getProducts()),
        title: inputTitle.value,
        cal: inputCal.value,
        unit: toggle.checked ? 'piece' : '100gramm'
      }
      let newProducts = getProducts()
      newProducts.push(newProduct)
  
      localStorage.setItem('products', JSON.stringify(newProducts))
      renderTable(tableBody, getProducts())
      refreshAddProduct()
      refreshSortAndFilter()
    })
  
    renderTable(tableBody, getProducts())
  
    function refreshAddProduct(){
      modalProductBg.classList.remove('visible')
      errorMessage.classList.remove('visible')
      inputTitle.value = ''
      inputCal.value = ''
      toggle.checked = false
    }
  
    function renderProductItem(parent, obj){
      const item = createHTMLElement('li', 'table__product')
      const itemTitle = createHTMLElement('span', 'table__product__title')
      itemTitle.textContent = obj.title
      const itemRight = createHTMLElement('span', 'table__product__right')
      const itemCalPiece = createHTMLElement('span', 'table__product__cal')
      const itemCalGramm = createHTMLElement('span', 'table__product__cal')
      if (obj.unit === 'piece') {
          itemCalPiece.textContent = obj.cal
      } else {
          itemCalGramm.textContent = obj.cal
      }
      const itemDeleteBtn = createHTMLElement('button', 'table__product__delete')
      itemDeleteBtn.title = "удалить"
      itemDeleteBtn.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                  <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="#6E7191"/>
                                  </svg>`
  
      itemDeleteBtn.addEventListener('click', () => {
        let products = getProducts().filter(i => i.id !== obj.id)
        localStorage.setItem('products', JSON.stringify(products))
        renderTable(tableBody, getProducts())
        refreshSortAndFilter()
      })
  
      itemRight.append(itemCalPiece, itemCalGramm, itemDeleteBtn)
      item.append(itemTitle, itemRight)
      parent.append(item)
    }
  
    function renderTable(parent, list){
      parent.innerHTML = ''
      list.forEach(product => {
          renderProductItem(parent, product)
      })
    }
  
    let reverse = false;
    let sortedList = getProducts()
    let filterredList;
  
    sortBtn.addEventListener('click', () => {
      if (reverse) {
        sortIcon.classList.add('rotate')
      } else {
        sortIcon.classList.remove('rotate')
      }
      let arr = filterredList ? filterredList : getProducts()
    
      sortedList = arr.sort((a,b) => {
          if (+a.cal < +b.cal) {
            return reverse ? -1 : 1;
          }
          if (+a.cal > +b.cal) {
            return reverse ? 1 : -1;
          }
      })
      reverse = !reverse
      renderTable(tableBody, sortedList)
    })
  
    searchProducts.addEventListener('input', () => {
      reverse = false
      sortIcon.classList.remove('rotate')
      filterredList = getProducts().filter(i => i.title.toLowerCase().includes(searchProducts.value.toLowerCase()))
      
      renderTable(tableBody, filterredList)
      if (searchProducts.value === '') {
        filterredList = false
      }
    })
  
    function refreshSortAndFilter(){
      sortIcon.classList.remove('rotate')
      searchProducts.value = ''
      filterredList = false
    }
}

export default productsPage;