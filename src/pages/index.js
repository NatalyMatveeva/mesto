import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator} from "../components/FormValidator.js";

import {
  // initialCards,
  popupPicture,
  popupNewProfile,
  buttonEdit,
  popupNewPlace,
  popupDelete,
  buttonAdd,
  formEditProfileElement,
  nameInput,
  profInput,
  cards,
  userData,
  formAddNewcard,
  popupNewAvatar,
  buttonAvatar,
  params,
  formAddAvatar
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { Api } from "../components/Api.js";
// import { internalIP } from "webpack-dev-server";

let userId = null;

const addProfileInfo = new UserInfo(userData);

const createCard = (data) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: (link, name) => {
        bigImage.openPopup(link, name);
      },
      deleteCardPopup: (cardElement, id) => {
        deletePopup.openPopup(cardElement, id);
      },
      handleLike: () => {
        const like = card._element.querySelector(".card__like");
        if (like.classList.contains("card__like_active")) {
          api
            .setLike(data)
            .then((data) => {
              card._element.querySelector(".card__likes-number").textContent =
                data.likes.length;
            })

            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .removeLike(data)
            .then((data) => {
              card._element.querySelector(".card__likes-number").textContent =
                data.likes.length;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#tmpl"
  );
  return card.generateCard();
};

const firstCards = new Section(
  {
    items: [],
    renderer: (item) => {
      const firstCard = createCard(item);
      firstCards.addItem(firstCard);
    },
  },
  cards
);
// firstCards.renderItems();

//Создаем экземпляр Api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "d05d4a32-12bb-4bfc-b2be-f357c1740080",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    addProfileInfo.setUserInfo(userData);
    addProfileInfo.setUserAvatar(userData);
    initialCards.reverse();
    firstCards.renderItems(initialCards);
  })
  .catch((error) => {
    console.log(error);
  });

const bigImage = new PopupWithImage(popupPicture);

//Редактирование профиля
const popupNewProfileNewClass = new PopupWithForm(
  {
    submitHandler: (data) => {
      popupNewProfileNewClass.renderLoading(true);

      api.editProfile(data)

       .then((res)=>{
        addProfileInfo.setUserInfo(res);
        popupNewProfileNewClass.closePopup();
       })

       .catch((err) =>{
        console.log(err)
       })

        .finally(() => {
          popupNewProfileNewClass.renderLoading(false);
        });
    },
  },
  popupNewProfile
);

const popupNewAvatarProfile = new PopupWithForm(
  {
    submitHandler: (data) => {
      popupNewAvatarProfile.renderLoading(true);

      api.editAvatar(data)

        .then((res) => {addProfileInfo.setUserAvatar(res);
        popupNewAvatarProfile.closePopup();
    })

       .catch((err) => {
      console.log(err);
    })
        .finally(() => {
          popupNewAvatarProfile.renderLoading(false);
        });
    },
  },
  popupNewAvatar
);
popupNewAvatarProfile.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  popupNewAvatarProfile.openPopup();
});

const addCardPopup = new PopupWithForm(
  {
    submitHandler: (data) => {
      addCardPopup.renderLoading(true);

      api.createCard(data)
        .then((data) => {
          const newCard = createCard(data);
          firstCards.addItem(newCard);
          addCardPopup.closePopup();
        })

        .catch((err) => {
          console.log(err);
        })

        .finally(() => {
          addCardPopup.renderLoading(false);
        });
    },
  },
  popupNewPlace
);

const deletePopup = new PopupDelete(
  {
    submitHandler: (element, id) => {

      api.deleteCard(id)
      .then((res)=>{
        element.remove(res);
        deletePopup.closePopup()
      })

      .catch((err) => {
        console.log(err);
      });
    },
  },
  popupDelete
);
deletePopup.setEventListeners();

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

const validateAvatarForm = new FormValidator(params, formAddAvatar);
validateAvatarForm.enableValidation();

bigImage.setEventListeners();
popupNewProfileNewClass.setEventListeners();
addCardPopup.setEventListeners();
