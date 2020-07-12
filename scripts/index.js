import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {modal, toggleModal, enableCardModalListeners} from './utils.js';

const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
};


// Global Selectors
const cardTemplateSelector = ".card";

// Selectors for edit modal

const editProfile = modal.querySelector('.form_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = modal.querySelector('.form__input_name');
const profileRole = modal.querySelector('.form__input_about');
const profileSaveButton = modal.querySelector('.form__save-button_profile');
const defaultName = document.querySelector('.profile__name');
const defaultRole = document.querySelector('.profile__subtitle');
const closeEditProfile = modal.querySelector('#close-profile-modal');

// Selectors for adding cards modal
const addCard = modal.querySelector('.form_card');
const addButton = document.querySelector('.profile__add-button');
const closeAddCard = modal.querySelector('.form__exit_card');
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


// PROJECT 6 ADJUSTED FUNCTIONS



// Functions to toggle profile modal

function toggleEditModal() {
    toggleModal();
    editProfile.classList.toggle('form_visible');

    //enable listeners
    enableCardModalListeners(editProfile, 'form_visible')   
}

// Functions to toggle card modal

function toggleCardModal() {
    toggleModal();
    addCard.classList.toggle('form_visible');

   enableCardModalListeners(addCard, 'form_visible');
};



//END OF PROJECT 6 ADJUSTMENTS


function createCard(data, wrap) {
    const card = new Card(data, cardTemplateSelector);

    wrap.prepend(card.addNewCard())
}

//Event Listeners for Edit modal
editButton.addEventListener("click", toggleEditModal);

closeEditProfile.addEventListener('click', toggleEditModal);

profileSaveButton.addEventListener("click", () => {
    
    defaultName.textContent = profileName.value;
    defaultRole.textContent = profileRole.value;

    
    toggleEditModal();
})

//Event listeners for Add Card modal
addButton.addEventListener('click', toggleCardModal);

closeAddCard.addEventListener('click', toggleCardModal);

cardSaveButton.addEventListener('click', () => {
    createCard({
        name: addCardTitle.value,
        link: addCardLink.value
    }, cardContainer);
    toggleCardModal();
});

//Load cards from array at page load

initialCards.forEach((item) => {
    createCard(item, cardContainer);
})