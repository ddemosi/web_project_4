import FormValidator from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import {nameInput, linkInput, editNameInput, editAboutInput, editProfile, editButton, addCard, addButton, initialCards, defaultConfig} from './scripts/utils.js';
import UserInfo from './scripts/UserInfo.js';
import "./pages/index.css";

// function to enable image popup

function triggerImageModal(e){
    const image = e.target.style.backgroundImage;
    const subtitle = e.currentTarget.parentNode.querySelector('.element__title').textContent;
    //change background image to be source image compatible;
    const imageURL = image.replace('url("', "").replace('")', "");

    imagePopup.open(imageURL, subtitle);
}

//Add form validation

const editProfileValidation = new FormValidator(defaultConfig, editProfile);
const addCardValidation = new FormValidator(defaultConfig, addCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// Functions to toggle profile modal

// Class initializiations
const imagePopup = new PopupWithImage('.image-modal');

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__subtitle'});

const openEditPopup = new PopupWithForm('.form_edit-profile', () => {
        userInfo.setUserInfo({name: editNameInput.value, about: editAboutInput.value});
    });

const openCardPopup = new PopupWithForm('.form_card', () => {
        
    const card = new Card({name: nameInput.value, link: linkInput.value}, '.card', triggerImageModal);

    const cardElement = card.addNewCard();

    initalCardList.addItem(cardElement);
})



//Event Listeners for Edit modal
editButton.addEventListener("click", ()=> {  
    //Add current form values
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editAboutInput.value = currentUserInfo.about;
    //open popup
    openEditPopup.open();
});

//Event listeners for Add Card modal
addButton.addEventListener('click', () => {
    openCardPopup.open();
});

//Render Cards on page load

const initalCardList = new Section({
    data: initialCards, 
    renderer: (item) => {
    const card = new Card(item, '.card', triggerImageModal);

    const cardElement = card.addNewCard();

    initalCardList.addItem(cardElement);
    }}, '.elements__grid-container');

initalCardList.renderItems();
imagePopup.setEventListeners();
openCardPopup.setEventListeners();
openEditPopup.setEventListeners();