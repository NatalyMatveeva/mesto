// import { openPopup } from "./index.js";
import { popupPicture, openPopup } from "./utils.js";



const imageFull = document.querySelector(".popup-picture__img");
const imageTittle = document.querySelector(".popup-picture__title");


//Создадим класс

export class Card {
  constructor (data, cardSelector) {
this._text = data.name;
this._image = data.link;
this._cardSelector = cardSelector;
  }

  _getTemplate() {
  const cardElement = document
  .querySelector(this._cardSelector)
  .content
  .querySelector('.card')
  .cloneNode(true);

  return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector('.card__foto').src = this._image;
    this._element.querySelector('.card__text').textContent = this._text;
    this._element.querySelector('.card__foto').alt = this._text;

    // Вернём элемент наружу
    return this._element;
  }

  _deleteCard() {
    this._element.remove();
}

_openBigPopup() {
  imageFull.src = this._image;
  imageFull.alt = this._text;
  imageTittle.textContent = this._text;
  openPopup(popupPicture);}


  // Обработчик

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._deleteCard();
      });

      this._element.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle("card__like_active");
      });

      this._element.querySelector('.card__foto').addEventListener('click', () => {
        this._openBigPopup();
    });
   }
}

