import React from "react";
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ isOpen, name, title, button, onSubmit, children }) {
  const Context = React.useContext(AppContext);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={Context.onClose}
          type="button"
        />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button
            className={`popup__button popup__button-${name} popup__button-load`}
            type="submit"
          >
            {Context.isLoading ? "Сохранение..." : `${button}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
