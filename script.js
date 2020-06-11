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
const newCards = []

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

function resetCards() {
    document.querySelectorAll('.element').forEach(e => e.parentNode.removeChild(e));   
}

function changeHeartColor(e) {
    e.target.classList.toggle('element__like-button_active');
}

// Trash Can Delete Button
function removeFromArray(name, link) {
    let currentIndex = initialCards.findIndex((element) => {
       return element.name === name && ('url("' + element.link + '")') === link;
    });
    
    initialCards.splice(currentIndex, 1);
}

//THE BIG BOY THAT RENDERS EVERYTHING

function renderCards() {
    resetCards();
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
    item.addEventListener('click', (e) => {
        e.target.classList.toggle('element__like-button_active');
        })
    })
    //Add event listener to the delete button
    const deleteButton = document.querySelectorAll('.element__delete');
    deleteButton.forEach((item) => {
        item.addEventListener('click', (e) => {
            let name = e.target.parentNode.childNodes[5].childNodes[1].textContent;
            let link = e.target.parentNode.childNodes[3].style.backgroundImage;

            removeFromArray(name, link);
            renderCards();
        });
    });

    //Picture pop-up modal
    const cardPicture = document.querySelectorAll('.element__image');
    const imageModal = document.querySelector('.image-modal');

    cardPicture.forEach((item) => {
        item.addEventListener('click', (e) => {
            let activeImage = imageModal.querySelector('.image-modal__image');
            let activeSubtitle = imageModal.querySelector('.image-modal__subtitle');
            let image = e.currentTarget.style.backgroundImage;
            let subtitle = e.currentTarget.parentNode.childNodes[5].childNodes[1].textContent;
    
            let imageURL = image.replace('url("', "").replace('")', "");
            
            activeImage.src = imageURL;
            activeSubtitle.textContent = subtitle;

            toggleImageModal();
            
            const imageExit = imageModal.querySelector('.image-modal__exit'); 
            imageExit.addEventListener('click', toggleImageModal);
        })
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

function toggleImageModal() {
    toggleModal();
    imageModal.classList.toggle('image-modal_visible');
}

//Event Listeners for Edit modal
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
//Event listeners for Add Card modal
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