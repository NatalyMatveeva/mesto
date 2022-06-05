export class UserInfo {
  constructor({ userNameElement, userInfoElement }) {
    this._userNameElement = document.querySelector(userNameElement);
    this._userInfoElement = document.querySelector(userInfoElement);
  }

  getUserInfo() {
    const data = {};
    data.name = this._userNameElement.textContent;
    data.profession = this._userInfoElement.textContent;
    return data;
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.firstname;
    this._userInfoElement.textContent = data.profession;
  }
}
