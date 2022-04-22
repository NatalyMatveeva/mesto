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
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      params
    );
  } else {
    hideInputError(formElement, inputElement, params);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, params) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
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
