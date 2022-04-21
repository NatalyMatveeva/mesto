const showInputError = (formElement, inputElement, errorMessage, params) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;

};


const hideInputError = (formElement, inputElement, params) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.textContent = '';

};

const isValid = (formElement, inputElement, params ) => {
  if (!inputElement.validity.valid) {

    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {

    hideInputError(formElement, inputElement, params);
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
};


const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {

      evt.preventDefault();
    });
    setEventListeners (formElement, params);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__style',
  // submitButtonSelector: '.popup__button',
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__style_error',

});
