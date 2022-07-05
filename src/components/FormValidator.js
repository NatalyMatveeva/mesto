export class FormValidator {
  constructor(params, formElement) {
    this._formElement = formElement;
    this._inputElement = params.inputSelector;
    this._submitButton = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = this._formElement.querySelector(
      params.inputErrorClass
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputElement)
    );
    this._buttonElement = this._formElement.querySelector(this._submitButton);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  };

  makeButtonDisabled = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this.inputList)) {
      this.makeButtonDisabled(this.buttonElement);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}


