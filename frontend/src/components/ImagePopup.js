import React from "react";

export default function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div
      className={`popup popup_type_large-img ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container-large-img">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
