import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlers){
        super(popupSelector);
        this._formSubmit = handlers.formSubmit;
    }

    _getInputValues(){
        const inputList = Array.from(this._popupElement.querySelectorAll(".form__input"));
        this._formValues = []
        inputList.forEach((item) => {
            this._formValues.push(item.value);
        });
        return this._formValues;
    }

    setEventListeners(){ 
        this._popupElement.querySelector('.form__save-button').addEventListener('click', (e) => {
            e.preventDefault();
            this._formSubmit(this._getInputValues());
        })
        super.setEventListeners();
        
    }

    setDeletePopupListener(){
        this._popupElement.querySelector('.form__save-button').addEventListener('click', (e) => {
            e.preventDefault();
            this._formSubmit(this._getDeleteId())
        })
        super.setEventListeners();
    }

    _getDeleteId() {
        return this._popupElement.querySelector('.form__card-id').value;
    }

    openWithId(id) {
        this._popupElement.querySelector('.form__card-id').value = id;
        super.open();
    }
   
    close(){
        this._popupElement.reset();
        super.close();
        
    }
}