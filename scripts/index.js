import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import {modal} from './utils.js';
import UserInfo from './UserInfo.js';

const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
};

const defaultProfile = {
    name: 'Jacques Cousteau',
    about: 'Explorer'
}

// NEEDS TO BE INITIALIZED

//const editPopup = new Popup('');


// Global Selectors
const cardTemplateSelector = ".card";

// Selectors for edit modal

const editProfile = modal.querySelector('.form_edit-profile');
const editButton = document.querySelector('.profile__edit-button');

const closeEditProfile = modal.querySelector('#close-profile-modal');

// Selectors for adding cards modal
const addCard = modal.querySelector('.form_card');
const addButton = document.querySelector('.profile__add-button');
const cardSaveButton = modal.querySelector('.form__save-button_card');
const addCardTitle = modal.querySelector('.form__input_image-title');
const addCardLink = modal.querySelector('.form__input_image-link');

// Selectors for card rendering
const cardContainer = document.querySelector('.elements__grid-container');

// Array of card data

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];


//Add form validation

const editProfileValidation = new FormValidator(defaultConfig, editProfile);
const addCardValidation = new FormValidator(defaultConfig, addCard);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();




// Functions to toggle profile modal

function toggleEditModal() {
    //Initialize Popup class
    const openEditPopup = new PopupWithForm('.form_edit-profile', () => {
        const userInfo = new UserInfo({
            nameSelector: '.form__input_name',
            aboutSelector: '.form__input_about'});
        
        userInfo.setUserInfo();
        
    });
    //Open the popup
    openEditPopup.open();
    //Set exit event listeners
    openEditPopup.setEventListeners(); 
}

// Functions to toggle card modal

function toggleCardModal() {
    //Initialize Popup class
    const openCardPopup = new Popup('.form_card');
    //Open the popup
    openCardPopup.open();
    //Set exit event listeners
    openCardPopup.setEventListeners(); 
}

// function for image popup modal

function triggerImageModal() {

}

// function to create a card

function createCard(data, wrap) {
    const card = new Card(data, cardTemplateSelector);

    wrap.prepend(card.addNewCard())
}

//Event Listeners for Edit modal
editButton.addEventListener("click", toggleEditModal);

closeEditProfile.addEventListener('click', toggleEditModal);

//Event listeners for Add Card modal
addButton.addEventListener('click', toggleCardModal);





// cardSaveButton.addEventListener('click', () => {
//     createCard({
//         name: addCardTitle.value,
//         link: addCardLink.value
//     }, cardContainer);
//     toggleCardModal();
// });

//Render Cards on page load

const initalCardList = new Section({
    data: initialCards, 
    renderer: (item) => {
    const card = new Card(item, '.card', triggerImageModal);

            const cardElement = card.addNewCard();

            initalCardList.addItem(cardElement);
}}, '.elements__grid-container');

initalCardList.renderItems();