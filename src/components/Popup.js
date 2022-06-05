export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this.closePopupByEsc);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.closePopupByEsc);
  }

  closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.closePopup();
    });

    this._popup.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("popup")) {
        this.closePopup();
      }
    });
  }
}
