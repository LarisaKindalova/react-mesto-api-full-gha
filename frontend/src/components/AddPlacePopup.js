import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, onMouseDown, isLoading }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardName("");
    setCardLink(" ");
  }, [isOpen]);

  function handleCardName(evt) {
    setCardName(evt.target.value)
  }

  function handleCardLink(evt) {
    setCardLink(evt.target.value)
  }

  function handleSubmitMesto(evt) {
    evt.preventDefault();

    onAddPlace ({
        name: cardName,
        link: cardLink
    })
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitMesto}
      onMouseDown={onMouseDown}
    >
      <input
        required={true}
        minLength={2}
        maxLength={30}
        className="popup__input popup__input_value_card-name"
        id="card-name-input"
        type="text"
        name="name"
        value={cardName}
        placeholder="Название"
        onChange={handleCardName}
      />
      <span className="popup__input-error card-name-input-error" />
      <input
        required={true}
        className="popup__input popup__input_value_card-link"
        type="url"
        id="card-link-input"
        name={"link"}
        value={cardLink}
        placeholder="Ссылка на картинку"
        onChange={handleCardLink}
      />
      <span className="popup__input-error card-link-input-error" />
    </PopupWithForm>
  );
}
