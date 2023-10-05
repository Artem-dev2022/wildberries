export function outOfStock(){
    const absenCards = document.querySelectorAll('.absent__card');

    absenCards.forEach(card => {
        const absentFavorite = card.querySelector('.absent__card__btn--fav');
        const absentDelete = card.querySelector('.absent__card__btn--del');
        absentDelete.addEventListener('click', () => {
            card.remove()
        })
        absentFavorite.addEventListener('click', () => {
            absentFavorite.classList.toggle('absent__card__btn--active')
        })
    })
}