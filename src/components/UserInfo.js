export class UserInfo {
  constructor({ userNameElement, userInfoElement, userAvatarElement }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._userInfoElement = document.querySelector(userInfoElement);
    this._userAvatarElement = document.querySelector(userAvatarElement);
  }

  getUserInfo() {
    const data = {};
    data.name = this._userNameElement.textContent;
    data.profession = this._userInfoElement.textContent;
    return data;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.name;
    this._userInfoElement.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatarElement.src = data.avatar;
  }
}
