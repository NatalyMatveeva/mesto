const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__name');
const profInput = formElement.querySelector('.popup__prof');
const nameText = document.querySelector('.profile__name');
const profText = document.querySelector('.profile__prof')

function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameText.textContent;
  profInput.value = profText.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
evt.preventDefault();
nameText.textContent = nameInput.value;
profText.textContent = profInput.value;
closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

