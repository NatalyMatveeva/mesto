import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor (popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup-picture__img');
    this._title = this._popup.querySelector('.popup-picture__title');
  }

  //Вставляем в попап картинку с src изображения, альтернативным текстом и подписью к картинке.
  openPopup (name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
