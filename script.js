// Global Selectors
const modal = document.querySelector(".modal");

// Selectors for edit modal

const editProfile = modal.querySelector('#edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = modal.querySelector('#profile-name');
const profileRole = modal.querySelector('#profile-role');
const profileSaveButton = modal.querySelector('#profile-save-button');
const defaultName = document.querySelector('.profile__name');
const defaultRole = document.querySelector('.profile__subtitle');
const closeEditProfile = modal.querySelector('#close-profile-modal');
// Selectors for adding cards modal
const addCard = modal.querySelector('#add-card');
const addButton = document.querySelector('.profile__add-button');
const closeAddCard = modal.querySelector('#close-card-modal');
const cardSaveButton = modal.querySelector('#card-save-button');
const addCardTitle = modal.querySelector('#card-name');
const addCardLink = modal.querySelector('#card-link');
const newCards = []

// Selectors for card rendering
const cardContainer = document.querySelector('.elements__grid-container');
const cardTemplate =  document.querySelector('#card').content;

// Selectors for like-button

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

// Function to loop through available cards

function resetCards() {
    document.querySelectorAll('.element').forEach(e => e.parentNode.removeChild(e));
    
}

resetCards();

function renderCards() {
    resetCards();
    initialCards.forEach((item) => {

        const cardElement = cardTemplate.cloneNode(true);
        
        cardElement.querySelector('.element__image').style.backgroundImage = `url("${item.link}")`;
        cardElement.querySelector('.element__title').textContent = item.name;
        
        cardContainer.append(cardElement);
    
    })
}

renderCards();

// Functions to toggle profile modal

function toggleModal() {
    modal.classList.toggle('modal_display_visible');
}

function toggleEditModal() {
    toggleModal();
    editProfile.classList.toggle('form_visible');
}

editButton.addEventListener("click", toggleEditModal);

closeEditProfile.addEventListener('click', toggleEditModal);

profileSaveButton.addEventListener("click", function() {
    
    defaultName.textContent = profileName.value;
    defaultRole.textContent = profileRole.value;

    toggleEditModal();
})

// Functions to toggle card modal

function toggleCardModal() {
    toggleModal();
    addCard.classList.toggle('form_visible');
}

addButton.addEventListener('click', toggleCardModal);

closeAddCard.addEventListener('click', toggleCardModal);

cardSaveButton.addEventListener('click', () => {
    let obj = {
        name: `${addCardTitle.value}`,
        link: `${addCardLink.value}`
    };
    initialCards.push(obj);
    renderCards();
    toggleCardModal();
})

// Activate "Like Button"
const likeButton = document.querySelectorAll('.element__like-button');

likeButton.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like-button_active');
    })
})

// Trash Can Delete Button
const deleteButton = document.querySelectorAll('.element__delete');

// This function needs to be fixed. Delete Button also only works once, then the event listener disappears for some reason.
function removeFromArray(name, link) {
    let currentIndex = initialCards.findIndex((element) => {
        console.log(name.value);
        element.name === name && element.link === link;
    });
    
    initialCards.splice(currentIndex);
}

const deleteButtonListener = deleteButton.forEach((item) => {
    item.addEventListener('click', (e) => {
        let name = e.target.parentNode.parentNode.childNodes[3].childNodes[1].textContent;
        let link = e.target.parentNode.style.backgroundImage;
        removeFromArray(name, link);
    });
});

//Picture pop-up modal

// const cardPicture = document.querySelectorAll('.element__image');

// cardPicture.forEach((item) => {
//     item.addEventListener('click', (e) => {
//         let picture = e.target;
//         let deleteIcon = e.target.childNodes[1];
//         toggleModal();
//         picture.classList.toggle('element__image_popup_active');
//         deleteIcon.classList.toggle('element__delete_popup_active');
//     })
// })