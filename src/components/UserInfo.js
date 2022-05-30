export class UserInfo {
  constructor ({userNameElement, userInfoElement}){
  this._userNameElement = document.querySelector(userNameElement);
  this._userInfoElement = document.querySelector(userInfoElement);
  this._nameInput = document.querySelector(".popup__name");
  this._profInput = document.querySelector(".popup__prof");

}


getUserInfo() {
  const userData = {};
  this._nameInput.value = this._userNameElement.textContent;
  this._profInput.value = this._userInfoElement.textContent;

  userData.name = this._nameInput.value;
  userData.profession = this._profInput.value;

  return userData;
}


setUserInfo(){
  this._userNameElement.textContent = this._nameInput.value;
  this._userInfoElement.textContent = this._profInput.value;
}
}
