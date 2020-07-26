import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, subtitle) {
        this._popupElement.querySelector('.image-modal__image').src = link;
        this._popupElement.querySelector('.image-modal__subtitle').textContent = subtitle;
        
        super.open();
    }
}