//Global Selectors
const modal = document.querySelector(".modal");

// Selectors for image pop up
const imageModal = document.querySelector('.image-modal');

//Selectors for Add modal
const nameInput = document.querySelector('.form__input_image-title');
const linkInput = document.querySelector('.form__input_image-link');
const addCard = modal.querySelector('.form_card');
const addButton = document.querySelector('.profile__add-button');

//Selectors for edit modal
const editProfile = modal.querySelector('.form_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editNameInput = document.querySelector('.form__input_name');
const editAboutInput = document.querySelector('.form__input_about');

function toggleModal() {
    modal.classList.toggle('modal_display_visible');
}

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

//default validation config

const defaultConfig = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
};

export {modal, imageModal, nameInput, linkInput, editNameInput, editAboutInput, editProfile, editButton, addButton, addCard, initialCards, defaultConfig, toggleModal};