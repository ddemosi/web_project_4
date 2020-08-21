import {myId} from '../scripts/utils.js';

class Card {
    constructor(data, events, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._handleCardClick = events.handleCardClick;
        this._handleDeleteClick = events.handleDeleteClick;
        this._handleLikeClick = events.handleLikeClick;

        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getCardTemplate(){
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
        return cardTemplate;
    }

    _addEventListeners() {
        //assign event listeners to like button
        const newCardLikeButton = this._card.querySelector('.element__like-button');
        newCardLikeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id)});
        //assign event listener to delete button
        const newCardDeleteButton = this._card.querySelector('.element__delete');
        if (this._ownerId !== myId) {
            newCardDeleteButton.style.display = 'none';
         }
        newCardDeleteButton.addEventListener('click', () => {this._deleteCurrentCard(this._id)
                
           
        });
        //assign event listener to image
        const newCardPicture = this._card.querySelector('.element__image');
        newCardPicture.addEventListener('click', () => {
            this._handleCardClick()});
        //add card to the page
    }

    _deleteCurrentCard(id) {
        this._handleDeleteClick(id);
        this._card.remove();
    }

    addNewCard() {
        //clone and assign values
        const cardElement = this._getCardTemplate();

        this._card = cardElement;

        cardElement.querySelector('.element__image').style.backgroundImage = `url("${this._link}")`;
        cardElement.querySelector('.element__title').textContent = this._name;
        cardElement.querySelector('.element__like-counter').textContent = this._likes.length;
        cardElement.querySelector('.element__id').value = this._id;
        
        this._addEventListeners();
    
        return cardElement
    }

    refreshLikes(likes) {
        this._card.querySelector('.element__like-counter').textContent = likes;
    }
}

export default Card;