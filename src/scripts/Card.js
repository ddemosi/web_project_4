// import {modal, imageModal, toggleModal, enableCardModalListeners, toggleImageModal, triggerImageModal} from './utils.js';

class Card {
    constructor(data, cardTemplateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;

        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getCardTemplate(){
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
        return cardTemplate;
    }

    _addEventListeners() {
        //assign event listeners to like button
        const newCardLikeButton = this._card.querySelector('.element__like-button');
        newCardLikeButton.addEventListener('click', this._changeHeartColor);
        //assign event listener to delete button
        const newCardDeleteButton = this._card.querySelector('.element__delete');
        newCardDeleteButton.addEventListener('click', () => this._deleteCurrentCard());
        //assign event listener to image
        const newCardPicture = this._card.querySelector('.element__image');
        newCardPicture.addEventListener('click', this._handleCardClick);
        //add card to the page
    }

    _changeHeartColor(e) {
        e.target.classList.toggle('element__like-button_active');
    }

    _deleteCurrentCard() {
        this._card.remove();
    }

    addNewCard() {
        //clone and assign values
        const cardElement = this._getCardTemplate();

        this._card = cardElement;

        cardElement.querySelector('.element__image').style.backgroundImage = `url("${this._link}")`;
        cardElement.querySelector('.element__title').textContent = this._name;
        
        this._addEventListeners();
    
        return cardElement
    }
}

export default Card;