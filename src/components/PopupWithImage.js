import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup-picture__img');
    this._title = this._popupSelector.querySelector('.popup-picture__title');
  }

  //Вставляем в попап картинку с src изображения, альтернативным текстом и подписью к картинке.
  openPopup (name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
