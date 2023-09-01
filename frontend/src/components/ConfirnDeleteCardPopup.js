import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function ConfirmDeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button="Да"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmDeleteCardPopup;
