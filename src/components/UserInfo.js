export class UserInfo {
  constructor ({userNameElement, userInfoElement}){
  this._userNameElement = document.querySelector(userNameElement);
  this._userInfoElement = document.querySelector(userInfoElement);
  this._nameInput = document.querySelector(".popup__name");
  this._profInput = document.querySelector(".popup__prof");

}


getUserInfo() {
  this._nameInput.value = this._userNameElement.textContent;
  this._profInput.value = this._userInfoElement.textContent;

  const data = {};
  data.name = this._nameInput.value;
  data.profession = this._profInput.value;
  return data;
}


setUserInfo(data){
  this._userNameElement.textContent = data.firstname;
  this._userInfoElement.textContent = data.profession;
}
}
