// Selectors for image pop up
const modal = document.querySelector(".modal");

const imageModal = document.querySelector('.image-modal');

function toggleModal() {
    modal.classList.toggle('modal_display_visible');
}

// Function to toggle Image Model

function enableCardModalListeners(formSelector, visibleClass) {
    const removeClasses = () => {
        formSelector.classList.remove(visibleClass);
        modal.classList.remove('modal_display_visible');
    }


    const clickListener = (e) => {
        if (e.target === modal) {
            removeClasses();
            modal.removeEventListener('click', clickListener)
        }
    }

    const keydownListener = (e) => {
        if (e.key === "Escape") {
            removeClasses();
            document.removeEventListener('keydown', keydownListener);
        }
    }

    //Event listener assignment

    modal.addEventListener('click', clickListener);
    document.addEventListener('keydown', keydownListener);
}

function toggleImageModal() {
    toggleModal();
    imageModal.classList.toggle('image-modal_visible');

    enableCardModalListeners(imageModal, 'image-modal_visible');
}

function triggerImageModal(e) {
    const activeImage = imageModal.querySelector('.image-modal__image');
    const activeSubtitle = imageModal.querySelector('.image-modal__subtitle');
    const image = e.target.style.backgroundImage;
    const subtitle = e.currentTarget.parentNode.querySelector('.element__title').textContent;

    //change background image to be source image compatible;
    const imageURL = image.replace('url("', "").replace('")', "");

    //assign value to source image        
    activeImage.src = imageURL;
    activeSubtitle.textContent = subtitle;

    toggleImageModal();
    //Add event listener to close button        
    const imageExit = imageModal.querySelector('.image-modal__exit'); 
    imageExit.addEventListener('click', toggleImageModal);
}

class Card {
    constructor(data, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;

        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getCardTemplate(){
        const cardTemplate =  document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
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
        e.target.parentNode.remove();
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