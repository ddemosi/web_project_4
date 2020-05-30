const modal = document.querySelector(".modal");
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.form__exit');
const profileName = document.querySelector('.form__input-name');
const profileRole = document.querySelector('.form__input-about');
const profileSaveButton = document.querySelector('.form__save-button');
const profileNameContent = document.querySelector('.profile__name').textContent;
const profileRoleContent = document.querySelector('.profile__subtitle').textContent;
const defaultName = document.querySelector('.profile__name');
const defaultRole = document.querySelector('.profile__subtitle');

function closeModal() { 
    modal.classList.remove('modal_display_visible');
    modal.classList.add('modal_display_none');
}

function openModal() {
    modal.classList.remove('modal_display_none');
    modal.classList.add('modal_display_visible');
}

editButton.addEventListener("click", openModal);

closeEditButton.addEventListener('click', closeModal);

profileName.setAttribute("value", profileNameContent);
profileRole.setAttribute("value", profileRoleContent);

profileSaveButton.addEventListener("click", function() {
    
    defaultName.textContent = profileName.value;
    defaultRole.textContent = profileRole.value;

    closeModal();
})