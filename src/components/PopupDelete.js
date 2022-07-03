import Popup from "./Popup.js";
export class PopupDelete extends Popup {
  constructor({ submitHandler }, popup) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup-delete__form");
  }

  openPopup(cardElement, id) {
    this._element = cardElement;
    this._elementId = id;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._element, this._elementId);
    });
  }
}
