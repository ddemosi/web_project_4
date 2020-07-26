import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit){
        super(popupSelector);
        this._formSubmit = formSubmit;
    }

    _getInputValues(){
        const inputList = Array.from(this._popupElement.querySelectorAll(".form__input"));
        this._formValues = {};
        inputList.forEach(input => this.formValues[input.name]= input.value);
        return this._formValues;
    }

    setEventListeners(){ 

        this._popupElement.querySelector('.form__save-button').addEventListener('click', (e) => {
            e.preventDefault();
            this._formSubmit();
            this.close();
        })
        super.setEventListeners();
        
    }

    close(){
        this._popupElement.reset();
        super.close();
        
    }
}