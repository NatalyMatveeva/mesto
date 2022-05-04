export class FormValidator {
  constructor (params, formElement) {
this._inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
this._buttonElement = formElement.querySelector(params.submitButtonSelector);
this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
}

_showInputError = (inputElement, errorMessage, params) => {
  inputElement.classList.add(params.inputErrorClass);
  this._errorElement.textContent = errorMessage;
};

_hideInputError = (inputElement, params) => {
  inputElement.classList.remove(params.inputErrorClass);
  this._errorElement.textContent = "";
};


_makeButtonDisabled = (buttonElement,params) =>{
  buttonElement.classList.add(params.inactiveButtonClass);
  buttonElement.disabled = true;
}


_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


_isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    this._hideInputError(formElement, inputElement, params);
  }
};

_toggleButtonState = (inputList, buttonElement, params) => {
  if (this._hasInvalidInput(inputList)) {
    this._makeButtonDisabled(buttonElement,params);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

  setEventListeners = (formElement, params) => {
    this._toggleButtonState(this._inputList, this._buttonElement, params);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, params);
        this._toggleButtonState(this._inputList, this._buttonElement, params);
      });
    });
  };


}




















const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const makeButtonDisabled = (buttonElement,params) =>{
  buttonElement.classList.add(params.inactiveButtonClass);
  buttonElement.disabled = true;
}

const toggleButtonState = (inputList, buttonElement, params) => {
  if (hasInvalidInput(inputList)) {
    makeButtonDisabled(buttonElement,params);
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(
    formElement.querySelectorAll(params.inputSelector)
  );
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, params);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, params);
      toggleButtonState(inputList, buttonElement, params);
    });
  });
};

// Очистить форму


const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__style",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__style_error",
});


export const params = {
  formSelector: ".form",
  inputSelector: ".popup__style",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputErrorClass: "popup__style_error",
}
