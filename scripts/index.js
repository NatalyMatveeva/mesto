import { Card } from './Card.js';
import { FormValidator, params } from './FormValidator.js';
import { initialCards, popupPicture, closePopup, openPopup  } from './utils.js';

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

function inactiveSubmit(popup) {
const buttonElement = popup.querySelector('.popup__submit');
buttonElement.classList.add('popup__submit_inactive');
buttonElement.disabled = true;
}

buttonEdit.addEventListener("click", () => {
  openPopup(popupNewProfile);
  inactiveSubmit(popupNewProfile)
});

buttonEditClose.addEventListener("click", () => {
  closePopup(popupNewProfile);
});

//функции закрытия попапов по оверлей
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("popup")) {
      closePopup(target);
    }
  });
});

// Открытие попапа добавления карточки

buttonAdd.addEventListener("click", () => {
  formAddNewcard.reset();
  openPopup(popupNewPlace);
  inactiveSubmit(popupNewPlace);
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


// Добавление карточки через форму

const linkInput = document.querySelector(".popup-newcard__link");
const namePlace = document.querySelector(".popup-newcard__nameplace");
const formAddNewcard = document.querySelector(".popup-newcard__form");

function createCard(source, template){
const card = new Card (source, template);
const cardFilled = card.generateCard();
return cardFilled;
}

function saveCard(evt) {
  evt.preventDefault();

  const newCardContent =   {
    link: linkInput.value,
    name: namePlace.value,
    }
    const cardElement = createCard(newCardContent, '#tmpl');
  cards.prepend(cardElement);
  closePopup(popupNewPlace);
}

formAddNewcard.addEventListener("submit", saveCard);


initialCards.forEach((item) => {
  const cardElement = createCard(item, '#tmpl');
  cards.append(cardElement);
  });


const validatePopupForm = new FormValidator(params, formEditProfileElement);
validatePopupForm.enableValidation();
const validateAddNewcard__form = new FormValidator(params, formAddNewcard);
validateAddNewcard__form.enableValidation();

document.querySelector('.popup-picture__close-button').addEventListener('click', () => {
  closePopup(popupPicture);
});
