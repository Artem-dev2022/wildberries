export function modals(){
    const modalPay = document.querySelector('.modal-pay');
    const payIcon = document.querySelector('.sidebar__pay__icon');
    const payChange = document.querySelector('.white-box-pay .white-box__change');
    const closeModalPay = document.querySelector('.modal-pay__close')

    function closeModalPayPopUp(){
        modalPay.classList.remove('modal--active')
        payData.forEach(item => item.chosen = false);
        payData[0].chosen = true
        modalCards[0].checked = true
    }

    modalPay.addEventListener('click', (e) => {
        if (e.target !== modalPay) return
        closeModalPayPopUp()
    })
    payIcon.addEventListener('click', () => {
        modalPay.classList.add('modal--active')
    })
    payChange.addEventListener('click', () => {
        modalPay.classList.add('modal--active')
    })
    closeModalPay.addEventListener('click', () => {
        closeModalPayPopUp()
    })

    const modalDelivery = document.querySelector('.modal-delivery');
    const deliveryIcon = document.querySelector('.sidebar__delivery__icon');
    const deliveryChange = document.querySelector('.white-box-delivery .white-box__change');
    const closeModalDelivery = document.querySelector('.modal-delivery__close')

    function setFirstAddressChecked(){
        const addresses = document.querySelectorAll('.modal-delivery .modal__radio-base');
        if (addresses.length) {
            addresses[0].checked = true
        }
    }
    function closeModalDeliveryPopUp(){
        modalDelivery.classList.remove('modal--active')
        deliveryData.forEach(item => item.chosen = false);
        deliveryData[0].chosen = true

        setFirstAddressChecked()
    }
    modalDelivery.addEventListener('click', (e) => {
        if (e.target !== modalDelivery) return
        closeModalDeliveryPopUp()
    })
    deliveryIcon.addEventListener('click', () => {
        modalDelivery.classList.add('modal--active')
    })
    deliveryChange.addEventListener('click', () => {
        modalDelivery.classList.add('modal--active')
    })
    closeModalDelivery.addEventListener('click', () => {
        closeModalDeliveryPopUp()
    })

    const toPostBtn = document.getElementById('to-post');
    const byCourierBtn = document.getElementById('by-courier');

    toPostBtn.addEventListener('click', () => {
        toPostBtn.classList.add('modal__buttons__btn--active')
        byCourierBtn.classList.remove('modal__buttons__btn--active')
    })
    byCourierBtn.addEventListener('click', () => {
        byCourierBtn.classList.add('modal__buttons__btn--active')
        toPostBtn.classList.remove('modal__buttons__btn--active')
    })

    /// choose delivery address
    const deliveryData = [
        {address: 'Бишкек, улица Табышалиева, 57', chosen: true},
        {address: 'Бишкек, улица Жукеева-Пудовкина, 77/1', chosen: false},
        {address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1', chosen: false},
    ]

    const modalAddress = document.querySelectorAll('.modal-delivery .modal__radio-base');
    const modalDeliveryBtn = document.querySelector('.modal-delivery .modal__btn');
    const sidebarAddress = document.querySelector('.sidebar__address');
    const whiteBoxAddress = document.querySelector('.white-box__condition__address');

    modalAddress.forEach((address, index) => {
        address.addEventListener('change', () => {
            deliveryData.forEach(item => item.chosen = false);
            if (address.checked) deliveryData[index].chosen = true
        })
    })

    modalDeliveryBtn.addEventListener('click', () => {
        sidebarAddress.textContent = deliveryData.find(item => item.chosen === true).address
        whiteBoxAddress.textContent = deliveryData.find(item => item.chosen === true).address
        closeModalDeliveryPopUp()
    })

    /// delete address   
    const modalListEmpty = document.querySelector('.modal-list-empty')

    const addresItems = document.querySelectorAll('.modal-delivery .modal__item');
    addresItems.forEach(i => {
        const modalDelete = i.querySelector('.modal__remove');
        modalDelete.addEventListener("click", () => {
            i.remove()
            const modalList = document.querySelector('.modal-delivery .modal__list')
            if (modalList.children.length === 0) {
                modalListEmpty.style.display = 'block'
                modalDeliveryBtn.style.opacity = '0.2'
                modalDeliveryBtn.style.pointerEvents = 'none'
                return
            }
            setFirstAddressChecked()
        })
    })

    /// choose pay method
    const payData = [
        {card: '1234 56•• •••• 1234', img: './img/mir.svg', chosen: true},
        {card: '1234 56•• •••• 1234', img: './img/visa.svg', chosen: false},
        {card: '1234 56•• •••• 1234', img: './img/mastercard.svg', chosen: false},
        {card: '1234 56•• •••• 1234', img: './img/unionpay.svg', chosen: false},
    ]

    const modalCards = document.querySelectorAll('.modal-pay .modal__radio-base');
    const modalPayBtn = document.querySelector('.modal-pay .modal__btn');
    const sidebarCardNumber = document.querySelector('.sidebar__pay__card__number');
    const sidebarCardImg = document.querySelector('.sidebar__pay__card__img');
    const whiteBoxCardNumber = document.querySelector('.white-box__pay__number');
    const whiteBoxCardImg = document.querySelector('.white-box__pay__img');

    modalCards.forEach((card, index) => {
        card.addEventListener('change', () => {
            payData.forEach(item => item.chosen = false);
            if (card.checked) payData[index].chosen = true
        })
    })

    modalPayBtn.addEventListener('click', () => {
        sidebarCardNumber.textContent = payData.find(item => item.chosen === true).card
        whiteBoxCardNumber.textContent = payData.find(item => item.chosen === true).card
        sidebarCardImg.src = payData.find(item => item.chosen === true).img
        whiteBoxCardImg.src = payData.find(item => item.chosen === true).img
        closeModalPayPopUp()
    })
}