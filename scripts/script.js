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

// Function to enable like button

function changeHeartColor(e) {
    e.target.classList.toggle('element__like-button_active');
}


// PROJECT 6 ADJUSTED FUNCTIONS




// Function to enable and disable modal event listener

function enableCardModalListeners(formSelector, visibleClass) {
    const removeClasses = () => {
        formSelector.classList.remove(visibleClass);
        modal.classList.remove('modal_display_visible');
    }


    const clickListener = (e) => {
        if (e.target === modal) {
            removeClasses();
            modal.removeEventListener('click', clickListener)
        }
    }

    const keydownListener = (e) => {
        if (e.key === "Escape") {
            removeClasses();
            document.removeEventListener('keydown', keydownListener);
        }
    }

    //Event listener assignment

    modal.addEventListener('click', clickListener);
    document.addEventListener('keydown', keydownListener);
}



// Functions to toggle profile modal

function toggleModal() {
    modal.classList.toggle('modal_display_visible');
}

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

// Function to toggle Image Model
function toggleImageModal() {
    toggleModal();
    imageModal.classList.toggle('image-modal_visible');

    enableCardModalListeners(imageModal, 'image-modal_visible');
}

//END OF PROJECT 6 ADJUSTMENTS




// Function for Trash Can Delete Button
function deleteCurrentCard(e) {
    e.target.parentNode.remove();
}

//Function for image modal

function triggerImageModal(e) {
    const activeImage = imageModal.querySelector('.image-modal__image');
    const activeSubtitle = imageModal.querySelector('.image-modal__subtitle');
    const image = e.target.style.backgroundImage;
    const subtitle = e.currentTarget.parentNode.querySelector('.element__title').textContent;

    //change background image to be source image compatible;
    const imageURL = image.replace('url("', "").replace('")', "");

    //assign value to source image        
    activeImage.src = imageURL;
    activeSubtitle.textContent = subtitle;

    toggleImageModal();
    //Add event listener to close button        
    const imageExit = imageModal.querySelector('.image-modal__exit'); 
    imageExit.addEventListener('click', toggleImageModal);
}

//Function to add a new card

function addNewCard(name, link) {
    //clone and assign values
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__image').style.backgroundImage = `url("${link}")`;
    cardElement.querySelector('.element__title').textContent = name;
    //assign event listeners to like button
    const newCardLikeButton = cardElement.querySelector('.element__like-button');
    newCardLikeButton.addEventListener('click', changeHeartColor);
    //assign event listener to delete button
    const newCardDeleteButton = cardElement.querySelector('.element__delete');
    newCardDeleteButton.addEventListener('click', deleteCurrentCard);
    //assign event listener to image
    const newCardPicture = cardElement.querySelector('.element__image');
    newCardPicture.addEventListener('click', triggerImageModal);
    //add card to the page
    return cardElement
}

function createCard(cardElement) {
    cardContainer.prepend(cardElement);
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
    createCard(addNewCard(addCardTitle.value, addCardLink.value));
    toggleCardModal();
});

//Load cards from array at page load

initialCards.forEach((item) => {
    cardContainer.append(addNewCard(item.name, item.link));
})