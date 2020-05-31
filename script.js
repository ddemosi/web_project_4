const modal = document.querySelector(".modal");
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.form__exit');
const profileName = document.querySelector('.form__input-name');
const profileRole = document.querySelector('.form__input-about');
const profileSaveButton = document.querySelector('.form__save-button');
const defaultName = document.querySelector('.profile__name');
const defaultRole = document.querySelector('.profile__subtitle');

// function toggleModal() { 
//     modal.classList.remove('modal_display_visible');
//     modal.classList.add('modal_display_none');
// }

function toggleModal() {
    modal.classList.toggle('modal_display_visible')
}

editButton.addEventListener("click", toggleModal);

closeEditButton.addEventListener('click', toggleModal);

profileSaveButton.addEventListener("click", function() {
    
    defaultName.textContent = profileName.value;
    defaultRole.textContent = profileRole.value;

    toggleModal();
})