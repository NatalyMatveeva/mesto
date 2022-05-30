import './pages/index.css';
import { Card } from './components/Card.js';
import { FormValidator, params } from './components/FormValidator.js';
import { initialCards, popupPicture,  popupNewProfile, buttonEdit, popupNewPlace, buttonAdd, formEditProfileElement,
   nameInput, profInput, cards, userData, formAddNewcard  } from "./utils/constants.js"
import {Section } from './components/Section.js';
import {UserInfo } from './components/UserInfo.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';


const bigImage = new PopupWithImage(popupPicture);

const createCard = (data) => {
  const card = new Card ({ data,
    handleCardClick: (name, link) => {
      bigImage.openPopup(link, name);
    }
  },'#tmpl');
  return card.generateCard();
}


const addProfileInfo = new UserInfo (userData);


const popupNewProfileNewClass = new PopupWithForm ({
  submitHandler: (data) => {
    addProfileInfo.setUserInfo(data);
    popupNewProfileNewClass.closePopup();
  }
}, popupNewProfile)

const firstCards = new Section ({
  items:initialCards,
  renderer: (item) => {
    const firstCard = createCard (item);
    firstCards.addItem(firstCard);
  }
}, cards);
firstCards.renderItems();

const addCardPopup = new PopupWithForm({
  submitHandler: (data) => {
    const newCard = createCard(data);
    firstCards.addItem(newCard);
    addCardPopup.closePopup();
  }
}, popupNewPlace);


// Создаем карточки из массива

function inactiveSubmit(popup) {
const buttonElement = popup.querySelector('.popup__submit');
buttonElement.classList.add('popup__submit_inactive');
buttonElement.disabled = true;
}

buttonEdit.addEventListener("click", () => {
  const newUserData = addProfileInfo.getUserInfo();
  nameInput.value = newUserData.name;
  profInput.value = newUserData.profession;
  inactiveSubmit(popupNewProfile);
  popupNewProfileNewClass.openPopup();
})


// Открытие попапа добавления карточки

buttonAdd.addEventListener("click", () => {
  formAddNewcard.reset();
  addCardPopup.openPopup();
  inactiveSubmit(popupNewPlace);
});

// / Создаем карточки из массива
const InsertCards = new Section ({
  items:initialCards,

  renderer: (item) => {
    const defaultCard = createCard (item);
    InsertCards.addItem(defaultCard);
  }
}, cards);

const validatePopupForm = new FormValidator(params, formEditProfileElement);
validatePopupForm.enableValidation();
const validateAddNewcardForm = new FormValidator(params, formAddNewcard);
validateAddNewcardForm.enableValidation();


bigImage.setEventListeners();
popupNewProfileNewClass.setEventListeners();
addCardPopup.setEventListeners();

