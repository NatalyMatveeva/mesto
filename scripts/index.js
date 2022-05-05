import { Card, initialCards } from './Card.js';
import { FormValidator, params } from './FormValidator.js';


const popupNewProfile = document.querySelector(".popup_new-profile");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonEditClose = popupNewProfile.querySelector(".popup__close-button");

const popupNewPlace = document.querySelector(".popup-newcard");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonAddClose = document.querySelector(".popup-newcard__close-button");

const formEditProfileElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__name");
const profInput = document.querySelector(".popup__prof");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__prof");


// Функция открытия popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);

  const buttonElement = popup.querySelector('.popup__submit');
  buttonElement.classList.add('popup__submit_inactive');
  buttonElement.disabled = true;
}

//Функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//функции закрытия попапов по Esc
export function closePopupByEsc(evt) {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

buttonEdit.addEventListener("click", () => {
  openPopup(popupNewProfile);
});

buttonEditClose.addEventListener("click", () => {
  closePopup(popupNewProfile);
});


//функции закрытия попапов по оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    const target = event.target;

    if (
      target.classList.contains("popup") ||
      target.classList.contains("popup__close")
    ) {
      closePopup(target);
    }
  });
});

// Открытие попапа добавления карточки

buttonAdd.addEventListener("click", () => {
  const editPlace = document.forms.place;
  editPlace.reset();
  openPopup(popupNewPlace);

});

buttonAddClose.addEventListener("click", () => {
  closePopup(popupNewPlace);
});


// Обработчик «отправки» формы
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = profInput.value;
  closePopup(popupNewProfile);
}

formEditProfileElement.addEventListener("submit", formEditProfileSubmitHandler);


const cards = document.querySelector(".cards");
const cardTemplate = document.querySelector("#tmpl").content;

function createCard (element) {
  const cardElement = cardTemplate.cloneNode(true);


  const cardFoto = cardElement.querySelector(".card__foto");

  cardFoto.src = element.link;
  cardFoto.alt = element.name;
  cardElement.querySelector(".card__text").textContent = element.name;

  //Лайк
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like_active");
    });

  //Удаление
  const deleteTempl = cardElement.querySelector(".card");
  deleteTempl
    .querySelector(".card__delete")
    .addEventListener("click", function (evt) {
      deleteTempl.remove();
    });

  //Попап открытия и закрытия карточки изображения
  const PopupPicture = document.querySelector('.popup-picture');
  const imageFull = document.querySelector('.popup-picture__img');
  const imageTittle = document.querySelector('.popup-picture__title');
  const closeButtonPicture = document.querySelector(".popup-picture__close-button");

  cardFoto.addEventListener('click',() => {
    imageFull.src = element.link;
    imageFull.alt = element.name;
    imageTittle.textContent = element.name;
    openPopup(PopupPicture);
  });

  closeButtonPicture.addEventListener("click", () => {
   closePopup(PopupPicture);
  });

  return cardElement;
}



// Добавление карточки через форму

const linkInput = document.querySelector(".popup-newcard__link");
const namePlace = document.querySelector(".popup-newcard__nameplace");
const formAddNewcard = document.querySelector(".popup-newcard__form");

function saveCard(evt) {
  evt.preventDefault();

  const cardElement = createCard({
    link: linkInput.value,
    name: namePlace.value,
  });
  cards.prepend(cardElement);

  closePopup(popupNewPlace);
}

formAddNewcard.addEventListener("submit", saveCard);


initialCards.forEach((item) => {
  const card = new Card(item, '#tmpl');
  const cardElement = card.generateCard();

  cards.append(cardElement);
  });


const validatePopup__form = new FormValidator(params, formEditProfileElement);
validatePopup__form.enableValidation();
const validateAddNewcard__form = new FormValidator(params, formAddNewcard);
validateAddNewcard__form.enableValidation();




