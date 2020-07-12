import {modal, imageModal, toggleModal, enableCardModalListeners, toggleImageModal, triggerImageModal} from './utils.js';

class Card {
    constructor(data, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;

        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getCardTemplate(){
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        return cardTemplate;
    }

    _addEventListeners() {
        //assign event listeners to like button
        const newCardLikeButton = this._card.querySelector('.element__like-button');
        newCardLikeButton.addEventListener('click', this._changeHeartColor);
        //assign event listener to delete button
        const newCardDeleteButton = this._card.querySelector('.element__delete');
        newCardDeleteButton.addEventListener('click', this._deleteCurrentCard);
        //assign event listener to image
        const newCardPicture = this._card.querySelector('.element__image');
        newCardPicture.addEventListener('click', triggerImageModal);
        //add card to the page
    }

    _changeHeartColor(e) {
        e.target.classList.toggle('element__like-button_active');
    }

    _deleteCurrentCard(e) {
        // this._currentCard = e.target;
        console.log(this._card);
        this._cardElement.closest('.card').remove();
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