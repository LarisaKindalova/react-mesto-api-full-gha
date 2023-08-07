import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onMouseDown,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = React.useRef();

  function handleSubmitAvatar(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmitAvatar}
        onMouseDown={onMouseDown}
      >
        <input
          required={true}
          className="popup__input popup__input_value_avatar"
          name="avatar"
          id="avatar-input"
          type="url"
          placeholder="Ссылка на фото"
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-input-error" />
      </PopupWithForm>
  );
}
