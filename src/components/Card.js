//Создадим класс

export class Card {
  constructor ({data, handleCardClick}, cardSelector) {
this._text = data.name;
this._image = data.link;
this._cardSelector = cardSelector;
this._handleCardClick = handleCardClick;
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

    // Добавим данные
    this._cardPicture = this._element.querySelector('.card__foto');
    this._cardPicture.src = this._image;
    this._element.querySelector('.card__text').textContent = this._text;
    this._cardPicture.alt = this._text;
    this._setEventListeners();

    // Вернём элемент наружу
    return this._element;
  }

  _deleteCard() {
    this._element.remove();
}

  // Обработчик

    _setEventListeners() {
        this._element.querySelector('.card__delete').addEventListener('click', () => {
          this._deleteCard();
      });

      this._element.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle("card__like_active");
      });

      this._cardPicture.addEventListener('click', () => {
        this._handleCardClick((this._text, this._image));
    });
   }
}
