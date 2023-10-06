import { modals } from './modal.js'
import { form } from './form.js'
import { outOfStock } from './out-of-stock.js'

modals()
form()
outOfStock()

const mainCheckbox = document.getElementById('check');
const cardCheckboxes = document.querySelectorAll('.card__checkbox-base');

mainCheckbox.addEventListener('change', () => {
    if (mainCheckbox.checked) {
        cardCheckboxes.forEach((check, i) => {
            check.checked = true
            products.forEach(j => {
                if (j.deleted === false) {
                    j.checked = true
                }
            })
            showChosenGoodsInDelivery(true, i)
        })
    } else {
        cardCheckboxes.forEach((check, i)  => {
            check.checked = false
            products.forEach(j => {
                if (j.deleted === false) {
                    j.checked = false
                }
            })
            showChosenGoodsInDelivery(false, i)
        })
    }
    refreshSidebar()
})

const productCards = document.querySelectorAll('.basket__list .card');
const totalPrice = document.querySelector('.sidebar__total__amount span');
const totalQuantity = document.querySelector('.sidebar__item__quantity');
const totalOld = document.querySelector('.sidebar__item__old');
const totalDiscount = document.querySelector('.sidebar__item__discount');
const btnPaySpan = document.querySelector('.sidebar__btn__text--pay span');
const deliveryAmount = document.querySelectorAll('.white-box__condition__amount');
const chosenGoodsInDelivery = document.querySelectorAll('.white-box__condition__good');
const deliveryDateRow = document.querySelectorAll('.white-box__condition__item__date');
const basketHeaderQuantity = document.getElementById('basket-header-quantity');
const basketHeaderPrice = document.getElementById('basket-header-price');
const basketHeaderGoods = document.getElementById('basket-header-goods');

const products = [
    {price: 1051, discount: 50, chosenQuantity: 1, limitQuantity: 3, checked: false, deleted: false},
    {price: 11500, discount: 10, chosenQuantity: 200, limitQuantity: 204, checked: false, deleted: false},
    {price: 476, discount: 48, chosenQuantity: 2, limitQuantity: 4, checked: false, deleted: false}
]

function changeEnding(num, arr){
    let remainder = num % 100
    if (remainder >= 10 && remainder <= 20) {
        return arr[2]
    } else {
        remainder = num % 10
    }
    if (remainder == 1) return arr[0];
    if (remainder > 1 && remainder < 5) return arr[1];
    return arr[2];
}


function refreshSidebar(){
    const price = products.filter(i => i.checked === true && i.deleted === false).reduce((p,j) => Number(p) + Number(j.chosenQuantity) * ((Number(j.price) - (Number(j.price) * Number(j.discount) / 100))), 0).toLocaleString('ru')
    totalPrice.textContent = price
    btnPaySpan.textContent = price
    
    totalQuantity.textContent = products.filter(i => i.checked === true && i.deleted === false).reduce((p,j) => Number(p) + Number(j.chosenQuantity), 0)
    totalOld.textContent = products.filter(i => i.checked === true && i.deleted === false).reduce((p,j) => Number(p) + Number(j.chosenQuantity) * Number(j.price), 0).toLocaleString('ru')
    totalDiscount.textContent = products.filter(i => i.checked === true && i.deleted === false).reduce((p,j) => Number(p) - Number(j.chosenQuantity) * Number(j.price) * Number(j.discount) / 100, 0).toLocaleString('ru')
    
    const HeaderQuantity = products.filter(i => i.deleted === false).reduce((p,j) => Number(p) + Number(j.chosenQuantity), 0)
    basketHeaderQuantity.textContent = HeaderQuantity
    basketHeaderPrice.textContent = products.filter(i => i.deleted === false).reduce((p,j) => Number(p) + Number(j.chosenQuantity) * ((Number(j.price) - (Number(j.price) * Number(j.discount) / 100))), 0).toLocaleString('ru')
    basketHeaderGoods.textContent = changeEnding(HeaderQuantity, ['товар', 'товара', 'товаров'])
}

function showChosenGoodsInDelivery(check, index){
    if (check) {
        if (products[index].deleted === false) {
            chosenGoodsInDelivery[index].classList.add('white-box__condition__good--active')
            if (index === 1)  {
                chosenGoodsInDelivery[3].classList.add('white-box__condition__good--active')
                deliveryDateRow[1].classList.add('white-box__condition__item__date--active')
            }
        }
    } else {
        chosenGoodsInDelivery[index].classList.remove('white-box__condition__good--active')
        if (index === 1) {
            chosenGoodsInDelivery[3].classList.remove('white-box__condition__good--active')
            deliveryDateRow[1].classList.remove('white-box__condition__item__date--active')
        }
    }
    if (products.filter(i => i.checked === false).length === 3) {
        deliveryDateRow[0].classList.remove('white-box__condition__item__date--active')
    } else {
        deliveryDateRow[0].classList.add('white-box__condition__item__date--active')
    }
}

productCards.forEach((card, index) => {
    const cardChecks = card.querySelector('.card__checkbox-base')
    const counterMinus = card.querySelector('.card__count__btn--minus')
    const counterPlus = card.querySelector('.card__count__btn--plus')
    const counterInput = card.querySelector('.card__count__input')
    const actualPrice = card.querySelector('.card__price__actual__amount')
    const oldPrice = card.querySelector('.card__price__old__amount')
    const cardQuantity = card.querySelector('.card__quantity')
    const cardQuantityLimit = card.querySelector('.card__quantity span')
    const favorite = card.querySelector('.card__btn--fav')

    favorite.addEventListener('click', () => {
        favorite.classList.toggle('card__btn--active')
    })

    const deleteCard = card.querySelector('.card__btn--del');

    const cartQuantity = document.querySelector('.header__btn__amount')
    const basketList = document.querySelector('.basket__list')
    const basketListHeader = document.querySelector('.basket__list-header')
    const basketEmpty = document.querySelector('.basket-empty')

    function updateQuantity(){
        const quantity = basketList.children.length

        if (quantity === 2) {
            cartQuantity.textContent = '2'
        } else if (quantity === 1) {
            cartQuantity.textContent = '1'
        } else {
            cartQuantity.textContent = '0'
            basketList.style.display = 'none'
            basketListHeader.style.display = 'none'
            basketEmpty.style.display = 'block'
        }
    }

    deleteCard.addEventListener('click', () => {
        card.remove()
        updateQuantity()
        products[index].deleted = true;
        products[index].checked = false;
        refreshSidebar()
        showChosenGoodsInDelivery(false, index)
    })

    function refreshActualPrice(){
        products[index].chosenQuantity = counterInput.value

        actualPrice.textContent = (products[index].chosenQuantity * (products[index].price - products[index].price * products[index].discount / 100)).toLocaleString('ru')
        oldPrice.textContent = (products[index].chosenQuantity * products[index].price).toLocaleString('ru')
        
        if (actualPrice.textContent.length > 5) {
            actualPrice.classList.add('card__price__actual__amount--small')
        } else {
            actualPrice.classList.remove('card__price__actual__amount--small')
        }

        refreshSidebar()
        
        if (index !== 1) {
            deliveryAmount[index].textContent = products[index].chosenQuantity;
        } else {
            if (products[index].chosenQuantity <= 184) {
                deliveryAmount[index].textContent = products[index].chosenQuantity;
                document.querySelectorAll('.white-box__condition__item__date')[1].style.display = 'none';
            } else {
                deliveryAmount[1].textContent = 184;
                deliveryAmount[3].textContent = products[index].chosenQuantity - 184;
                document.querySelectorAll('.white-box__condition__item__date')[1].style.display = 'flex';
            }
        }
    }

    function refreshLimit(){
        if (products[index].limitQuantity - products[index].chosenQuantity <= 3) {
            cardQuantity.classList.remove('card__quantity--hidden')
        } else {
            cardQuantity.classList.add('card__quantity--hidden')
        }
        cardQuantityLimit.textContent = products[index].limitQuantity - products[index].chosenQuantity
    }

    cardChecks.addEventListener('change', () => {
        if (!cardChecks.checked) {
            mainCheckbox.checked = false
            products[index].checked = false;
            
            showChosenGoodsInDelivery(false, index)
        } else {
            products[index].checked = true;
            
            showChosenGoodsInDelivery(true, index)
        }
        refreshActualPrice()
    })

    function checkCounterRange(){
        counterPlus.disabled = false;

        if (counterInput.value > 1) {
            counterMinus.disabled = false
        } else {
            counterMinus.disabled = true
        }
        if (counterInput.value >= products[index].limitQuantity) {
            counterInput.value = products[index].limitQuantity;
            counterPlus.disabled = true;
        }
        refreshActualPrice()
        refreshLimit()
    }
    counterMinus.addEventListener('click', () => {
        counterInput.value--;
        checkCounterRange()
    })
    counterPlus.addEventListener('click', () => {
        counterInput.value++;
        checkCounterRange()
    })
    counterInput.addEventListener('change', () => {
        if (counterInput.value <= 1) {
            counterInput.value = 1;
            counterMinus.disabled = true;
        } else {
            counterMinus.disabled = false;
        }
        if (counterInput.value >= products[index].limitQuantity) {
            counterInput.value = products[index].limitQuantity;
            counterPlus.disabled = true;
        } else {
            counterPlus.disabled = false;
        }
        refreshActualPrice()
        refreshLimit()
    })
})