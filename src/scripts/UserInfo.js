export default class UserInfo {
    constructor({nameSelector,  aboutSelector}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo(){
        document.querySelector(".form__input_name").value = this._name.textContent;
        document.querySelector(".form__input_about").value = this._about.textContent;
    }
    setUserInfo(){
       
        document.querySelector(".profile__name").textContent = this._name.value;
        document.querySelector(".profile__subtitle").textContent = this._about.value;
       
    }
}