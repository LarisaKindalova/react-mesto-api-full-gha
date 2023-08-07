import React from "react";
import { useEffect } from "react";


export default function Popup ({name, isOpen, onClose, children}) {

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
        {children}
      </div>
    </div>
  )
}