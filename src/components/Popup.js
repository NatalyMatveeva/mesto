export default class Popup {
  constructor(popupSelector) {
this._popupSelector = popupSelector;
this._popupCloseButton = this._popupSelector.querySelector(".popup__close-button");
  }

  openPopup() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener('keydown', this.closePopupByEsc);
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener('keydown', this.closePopupByEsc);
  }

  closePopupByEsc = (evt) => {
    if (evt.key === 'Escape'){
      this.closePopup();
    }
  }

    setEventListeners () {
      this._popupCloseButton.addEventListener('click', () => {
        this.closePopup();
    });

       this._popupSelector.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("popup")) {
        this.closePopup();
      }}
      )


    }



}
