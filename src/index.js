import FormValidator from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import Section from './scripts/Section.js';
import {modal, editNameInput, editAboutInput, editProfile, editButton, addCard, addButton, defaultConfig, avatarUpdateForm, editAvatar, avatarElement, loadingIcon} from './scripts/utils.js';
import UserInfo from './scripts/UserInfo.js';
import "./pages/index.css";
import Api from './scripts/Api.js';

//Add form validation

const editProfileValidation = new FormValidator(defaultConfig, editProfile);
const addCardValidation = new FormValidator(defaultConfig, addCard);
const avatarUpdateValidation = new FormValidator(defaultConfig, avatarUpdateForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
avatarUpdateValidation.enableValidation();

// Class initializiations

//card click handler
const imagePopup = new PopupWithImage('.image-modal');

// get/set user info

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__subtitle',
    avatarImageSelector: '.profile__avatar'
});

//confirm card deletion modal

const deletePopup = new PopupWithForm('.form_confirm', {
    formSubmit: (id) => {
        loadingIcon(true, modal.querySelector('.form_confirm'));
        api.deleteCard(id);
        loadingIcon(false, modal.querySelector('.form_confirm'));
        deletePopup.close();
        
}});

//Edit profile modal

const openEditPopup = new PopupWithForm('.form_edit-profile', {formSubmit: (data) => {
    loadingIcon(true, editProfile);
    const formattedData = {
        name: data[0],
        about: data[1]
    }
    api.changeProfileInfo(formattedData)
        .then((res) => {
            userInfo.setUserInfo(res);
            loadingIcon(false, editProfile);
            openEditPopup.close();
        })
}})

//Update avatar modal

const avatarUpdateModal = new PopupWithForm('.form_update-avatar', {formSubmit: (data) => {
    loadingIcon(true, modal.querySelector('.form_update-avatar'));
    //Submit function
    api.updateAvatar(data[0])
        .then((res) => {
            avatarElement.src = res.avatar;
            loadingIcon(false, modal.querySelector('.form_update-avatar'));
            avatarUpdateModal.close();
        })
}})

const api = new Api({
    apiEndpoint: "https://around.nomoreparties.co/v1/group-3",
    headers: {
        authorization: "98dd8ac9-99ea-4ab0-85f9-6d61f9934e14",
        "Content-Type": "application/json"
    }
});


//Fetch user info

api.getUserInfo().then((res) => {
    userInfo.setUserInfo(res)
})

//Render cards from server and initialize addCard class

api.getCardList().then((res) => {
const initialCardList = new Section({
    data: res,
    renderer: (item) => {
        //Loop through cards and assign default handlers
        const card = new Card(
            item,
            {
            handleCardClick: () => {
                imagePopup.open(item.link, item.name);
            },
            handleDeleteClick: (id) => {
                deletePopup.openWithId(id);
            },
            handleLikeClick: (id) => {
                //define selectors terms, in case they need to be dynamic
                const likeButtonSelector = '.element__like-button';
                const likeButtonActiveClass = 'element__like-button_active';
                //if check to see if class is liked or not.
                    if (card._card.querySelector(likeButtonSelector).classList.contains(likeButtonActiveClass)) {
                        card._card.querySelector(likeButtonSelector).classList.remove(likeButtonActiveClass);
                    api.cardUnlike(id)
                    .then(res => card.refreshLikes(res.likes.length))
                } else {
                    card._card.querySelector(likeButtonSelector).classList.add(likeButtonActiveClass);
                    api.cardLike(id)
                    .then(res => card.refreshLikes(res.likes.length))
                }
            }
        }, '.card');
        //add cards to DOM
        const cardElement = card.addNewCard();

        initialCardList.addItem(cardElement);
    }
     
    }, '.elements__grid-container');

    initialCardList.renderItems();

    //initialize Card popup

    const openCardPopup = new PopupWithForm('.form_card', {formSubmit: (data) => {
        //switch button to loading text
        loadingIcon(true, modal.querySelector('.form_card'));
        //convert input values to proper format
        const formattedData = {
            name: data[0],
            link: data[1]
        }
        //POST the data
        api.addCard(formattedData)
            .then((res)=> {
                const card = new Card(
                    res,
                    {handleCardClick: () => {
                        imagePopup.open(item.link, item.name);
                    },
                    handleDeleteClick: (id) => {
                        deletePopup.openWithId(id);
                    },
                    handleLikeClick: (id) => {
                        //define selectors terms, in case they need to be dynamic
                        const likeButtonSelector = '.element__like-button';
                        const likeButtonActiveClass = 'element__like-button_active';
                        //if check to see if class is liked or not.
                            if (card._card.querySelector(likeButtonSelector).classList.contains(likeButtonActiveClass)) {
                                card._card.querySelector(likeButtonSelector).classList.remove(likeButtonActiveClass);
                            api.cardUnlike(id)
                            .then(res => card.refreshLikes(res.likes.length))
                        } else {
                            card._card.querySelector(likeButtonSelector).classList.add(likeButtonActiveClass);
                            api.cardLike(id)
                            .then(res => card.refreshLikes(res.likes.length))
                        }   
                    }
                }, '.card');
    
                const cardElement = card.addNewCard();
    
                initialCardList.addItem(cardElement);
                });
                loadingIcon(false, modal.querySelector('.form_card'));
                openCardPopup.close();
                
            }    
        });
        addButton.addEventListener('click', () => {
                    openCardPopup.open();
                })
        openCardPopup.setEventListeners();
})


   
       

//Set home page event listeners

//Event Listeners for Edit modal
editButton.addEventListener("click", ()=> {  
    //Add current form values
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editAboutInput.value = currentUserInfo.about;
    //open popup
    openEditPopup.open();
});

//Set openCardPopup event listeners

editAvatar.addEventListener('click', (data)=>{
    avatarUpdateModal.open();
});

// Set modal event listeners

imagePopup.setEventListeners();
openEditPopup.setEventListeners();
deletePopup.setDeletePopupListener();
avatarUpdateModal.setEventListeners();