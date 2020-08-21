export default class UserInfo {
    constructor({nameSelector,  aboutSelector, avatarImageSelector}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._image = document.querySelector(avatarImageSelector)
    }

    getUserInfo(){
        return {name: this._name.textContent, about: this._about.textContent};
    }

    setUserInfo(data){
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._image.src = data.avatar;
    }
}