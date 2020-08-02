import {modal} from './utils.js';

export default class Popup {
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        modal.classList.add('modal_display_visible');
        this._popupElement.classList.add('form_visible');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        modal.classList.remove('modal_display_visible')
        this._popupElement.classList.remove('form_visible');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(e){
        if(e.which === 27) {
            this.close();
        }
    }

    setEventListeners(){
        this._popupElement.querySelector('.form__exit').addEventListener('click', () => {
            this.close();
        });
        
    }
}