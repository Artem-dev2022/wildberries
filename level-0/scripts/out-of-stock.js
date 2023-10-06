export function outOfStock(){
    const absenCards = document.querySelectorAll('.absent__card')
    const absentQuantity = document.getElementById('absent-quantity')
    const absenList = document.querySelector('.absent__list')
    const absenSection = document.querySelector('.absent')

    function updateQuantity(){
        const quantity = absenList.children.length

        if (quantity === 2) {
            absentQuantity.textContent = '2 товара'
        } else if (quantity === 1) {
            absentQuantity.textContent = '1 товар'
        } else {
            absenSection.style.display = 'none'
        }
    }

    absenCards.forEach(card => {
        const absentFavorite = card.querySelector('.absent__card__btn--fav')
        const absentDelete = card.querySelector('.absent__card__btn--del')
        absentDelete.addEventListener('click', () => {
            card.remove()
            updateQuantity()
        })
        absentFavorite.addEventListener('click', () => {
            absentFavorite.classList.toggle('absent__card__btn--active')
        })
    })
}