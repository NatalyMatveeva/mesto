import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator, params } from "../components/FormValidator.js";
import {
  initialCards,
  popupPicture,
  popupNewProfile,
  buttonEdit,
  popupNewPlace,
  buttonAdd,
  formEditProfileElement,
  nameInput,
  profInput,
  cards,
  userData,
  formAddNewcard,
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage";

const bigImage = new PopupWithImage(popupPicture);

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handleCardClick: (link, name) => {
        bigImage.openPopup(link, name);
      },
    },
    "#tmpl"
  );
  return card.generateCard();
};

const addProfileInfo = new UserInfo(userData);

const popupNewProfileNewClass = new PopupWithForm(
  {
    submitHandler: (data) => {
      addProfileInfo.setUserInfo(data);
      popupNewProfileNewClass.closePopup();
    },
  },
  popupNewProfile
);

const firstCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const firstCard = createCard(item);
      firstCards.addItem(firstCard);
    },
  },
  cards
);
firstCards.renderItems();

const addCardPopup = new PopupWithForm(
  {
    submitHandler: (data) => {
      const newCard = createCard(data);
      firstCards.addItem(newCard);
      addCardPopup.closePopup();
    },
  },
  popupNewPlace
);

buttonEdit.addEventListener("click", () => {
  const newUserData = addProfileInfo.getUserInfo();
  nameInput.value = newUserData.name;
  profInput.value = newUserData.profession;
  popupNewProfileNewClass.openPopup();
});

buttonAdd.addEventListener("click", () => {
  validateAddNewcardForm.makeButtonDisabled();
  addCardPopup.openPopup();
});

const validatePopupForm = new FormValidator(params, formEditProfileElement);
validatePopupForm.enableValidation();
const validateAddNewcardForm = new FormValidator(params, formAddNewcard);
validateAddNewcardForm.enableValidation();

bigImage.setEventListeners();
popupNewProfileNewClass.setEventListeners();
addCardPopup.setEventListeners();
