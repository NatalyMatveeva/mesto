const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__name');
let profInput = formElement.querySelector('.popup__prof');

let nameText = document.querySelector('.profile__name');
let profText = document.querySelector('.profile__prof')

function formSubmitHandler (evt) {
evt.preventDefault();
nameText.textContent = nameInput.value;
profText.textContent = profInput.value;
popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

