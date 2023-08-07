import React from "react";
import { useEffect } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  }) {
  
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      evt.key === "Escape" && onClose();
    }
    
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlayClose(evt) {
    evt.target === evt.currentTarget && onClose();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    onMouseDown={handleOverlayClose}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup__${name}`}
        >
          {children}
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="кнопка сохранить"
            onClick = {onSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
