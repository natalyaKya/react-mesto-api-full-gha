import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar,
    });
  }

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="link-avatar"
        className="popup__text popup__text_type_link"
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
        onChange={handleAvatarChange}
      />
      <span className="link-avatar-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
