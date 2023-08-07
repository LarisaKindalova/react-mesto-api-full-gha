import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onMouseDown,
  onUpdateUser,
  isLoading,
}) {
  const [values, setValues] = React.useState({});
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  function handleChangeValues(evt) {
    const { name, value } = evt.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(values);
    setValues({ [evt.target.name]: "" });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
    >
      <input
        required={true}
        minLength={2}
        maxLength={40}
        className="popup__input popup__input_value_username"
        id="username-input"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={values.name || ""}
        onChange={handleChangeValues}
      />
      <span className="popup__input-error username-input-error" />
      <input
        required={true}
        minLength={2}
        maxLength={200}
        className="popup__input popup__input_value_job"
        id="job-input"
        type="text"
        name="about"
        value={values.about || ""}
        placeholder="Введите род занятий"
        onChange={handleChangeValues}
      />
      <span className="popup__input-error job-input-error" />
    </PopupWithForm>
  );
}
