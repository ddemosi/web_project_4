let modal = document.querySelector(".modal");
let editButton = document.querySelector('.profile__edit-button');
let closeEditButton = document.querySelector('.form__exit');

editButton.addEventListener("click", function() {
    modal.style.display = "block";
} );

closeEditButton.addEventListener('click', function() {
    modal.style.display = "none";
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

let profileName = document.querySelector('#profile-name');
let profileRole = document.querySelector('#profile-role');
let profileSaveButton = document.querySelector('.form__save-button');
let profileNameContent = document.querySelector('.profile__name').textContent;
let profileRoleContent = document.querySelector('.profile__subtitle').textContent;

profileName.setAttribute("value", profileNameContent);
profileRole.setAttribute("value", profileRoleContent);

// profileName.addEventListener("focus", function(e) {
//     e.target.value = "";
// });

// profileRole.addEventListener('focus', function(e) {
//     e.target.value = "";
// })

profileSaveButton.addEventListener("click", function() {
    let name = document.querySelector('.profile__name');
    let role = document.querySelector('.profile__subtitle');
    name.innerHTML = profileName.value;
    role.innerHTML = profileRole.value;

    modal.style.display = "none";
})