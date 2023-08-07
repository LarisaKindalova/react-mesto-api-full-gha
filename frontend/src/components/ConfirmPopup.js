import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, onMouseDown, onConfirmDelete, isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    
     onConfirmDelete ();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onMouseDown={onMouseDown}
      
    />
  );
}
