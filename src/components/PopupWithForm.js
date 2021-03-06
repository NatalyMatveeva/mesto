import Popup from "./Popup.js";
export class PopupWithForm extends Popup  {
  constructor({submitHandler }, popup) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.popup__style');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
  }

  // Собираем данные всех полей формы
  _getInputValues () {
    this._formValues = {};

    this._inputList.forEach (input => {
      this._formValues [input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
     }

     renderLoading(isLoading) {
      if (isLoading) {this._buttonSubmit.textContent = "Сохранение..."}
      else {this._buttonSubmit.textContent = "Сохранить"}
    }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
