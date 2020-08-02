import FormValidator from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import {nameInput, linkInput, editProfile, editButton, addCard, addButton, initialCards} from './scripts/utils.js';
import UserInfo from './scripts/UserInfo.js';
import "./pages/index.css";

const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
};


//Add form validation

const editProfileValidation = new FormValidator(defaultConfig, editProfile);
const addCardValidation = new FormValidator(defaultConfig, addCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// Functions to toggle profile modal

// Class initializiations
const imagePopup = new PopupWithImage('.image-modal');          

const openEditPopup = new PopupWithForm('.form_edit-profile', () => {
    const userInfo = new UserInfo({
        nameSelector: '.form__input_name',
        aboutSelector: '.form__input_about'});

    userInfo.setUserInfo();
    });

const openCardPopup = new PopupWithForm('.form_card', () => {
        
    const card = new Card({name: nameInput.value, link: linkInput.value}, '.card', triggerImageModal);

    const cardElement = card.addNewCard();

    initalCardList.addItem(cardElement);
})

// Functions to toggle card modal

function toggleCardModal() {
    //Open the popup
    openCardPopup.open();
    //Set exit event listeners
    openCardPopup.setEventListeners(); 
}

// function to enable image popup

function triggerImageModal(e){
    const image = e.target.style.backgroundImage;
    const subtitle = e.currentTarget.parentNode.querySelector('.element__title').textContent;
    //change background image to be source image compatible;
    const imageURL = image.replace('url("', "").replace('")', "");

    imagePopup.open(imageURL, subtitle);
    imagePopup.setEventListeners();
}

//Event Listeners for Edit modal
editButton.addEventListener("click", ()=> {  
    //Open the popup
    openEditPopup.open();
    //Set exit event listeners
    openEditPopup.setEventListeners(); 
});

//Event listeners for Add Card modal
addButton.addEventListener('click', toggleCardModal);

//Render Cards on page load

const initalCardList = new Section({
    data: initialCards, 
    renderer: (item) => {
    const card = new Card(item, '.card', triggerImageModal);

    const cardElement = card.addNewCard();

    initalCardList.addItem(cardElement);
    }}, '.elements__grid-container');

initalCardList.renderItems();