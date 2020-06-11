// Global Selectors
const modal = document.querySelector(".modal");

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
const cardTemplate =  document.querySelector('.card').content;

// Selectors for image pop up
const imageModal = document.querySelector('.image-modal');

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

// Function to reset available cards

function changeHeartColor(e) {
    e.target.classList.toggle('element__like-button_active');
}

// Functions to toggle profile modal

function toggleModal() {
    modal.classList.toggle('modal_display_visible');
}

function toggleEditModal() {
    toggleModal();
    editProfile.classList.toggle('form_visible');
}

// Functions to toggle card modal

function toggleCardModal() {
    toggleModal();
    addCard.classList.toggle('form_visible');
};

// Function to toggle Image Model
function toggleImageModal() {
    toggleModal();
    imageModal.classList.toggle('image-modal_visible');
}

// Function for Trash Can Delete Button
function deleteCurrentCard(e) {
    e.target.parentNode.remove();
}

//Function for image modal

function triggerImageModal(e) {
    let activeImage = imageModal.querySelector('.image-modal__image');
    let activeSubtitle = imageModal.querySelector('.image-modal__subtitle');
    let image = e.currentTarget.style.backgroundImage;
    let subtitle = e.currentTarget.parentNode.childNodes[5].childNodes[1].textContent;

    //change background image to be source image compatible;
    let imageURL = image.replace('url("', "").replace('")', "");

    //assign value to source image        
    activeImage.src = imageURL;
    activeSubtitle.textContent = subtitle;

    toggleImageModal();
    //Add event listener to close button        
    const imageExit = imageModal.querySelector('.image-modal__exit'); 
    imageExit.addEventListener('click', toggleImageModal);
}

//Event Listeners for Edit modal
editButton.addEventListener("click", toggleEditModal);

closeEditProfile.addEventListener('click', toggleEditModal);

profileSaveButton.addEventListener("click", function() {
    
    defaultName.textContent = profileName.value;
    defaultRole.textContent = profileRole.value;

    toggleEditModal();
})

//Event listeners for Add Card modal
addButton.addEventListener('click', toggleCardModal);

closeAddCard.addEventListener('click', toggleCardModal);

cardSaveButton.addEventListener('click', () => {
    addNewCard(addCardTitle.value, addCardLink.value);
    toggleCardModal();
});

//Function to add a new card

function addNewCard(name, link) {
    //clone and assign values
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__image').style.backgroundImage = `url("${link}")`;
    cardElement.querySelector('.element__title').textContent = name;
    //assign event listeners to like button
    const newCardLikeButton = cardElement.querySelector('.element__like-button');
    newCardLikeButton.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like-button_active');
    });
    //assign event listener to delete button
    const newCardDeleteButton = cardElement.querySelector('.element__delete');
    newCardDeleteButton.addEventListener('click', deleteCurrentCard);
    //assign event listener to image
    const newCardPicture = cardElement.querySelector('.element__image');
    newCardPicture.addEventListener('click', triggerImageModal);
    //add card to the page
    cardContainer.append(cardElement);
}

//function that renders all cards at page load

function renderCards() {
    //Loop through array and generate cards
    initialCards.forEach((item) => {
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.element__image').style.backgroundImage = `url("${item.link}")`;
    cardElement.querySelector('.element__title').textContent = item.name;

    cardContainer.append(cardElement);
    })
    //Add event listener to the like button
    const likeButton = document.querySelectorAll('.element__like-button');
    likeButton.forEach((item) => {
    item.addEventListener('click', changeHeartColor);
    })
    //Add event listener to the delete button
    const deleteButton = document.querySelectorAll('.element__delete');
    deleteButton.forEach((item) => {
        item.addEventListener('click', deleteCurrentCard);
        });

    //Add event listener to images
    const cardPicture = document.querySelectorAll('.element__image');
    cardPicture.forEach((item) => {
        item.addEventListener('click', triggerImageModal);
    })   
};

renderCards();