import React from "react";
import Popup from "./Popup";
import  failImg from "../images/fail.png";
import  successImg from "../images/success.png"

export default function InfoTooltip ({
  isOpen, 
  onClose, 
  messageTooltip, 
  isSuccessMessage
}) {

  return (
    <Popup 
    name="infoTooltip"
    isOpen={isOpen}
    onClose={onClose}>
      <img 
      className="popup__img-toolTip" 
      alt="информация о результате регистрации"
      src={isSuccessMessage
        ? successImg
        :failImg
      }>

      </img>
      <h2 className="popup__title popup__title_tooltip">{messageTooltip}</h2>
    </Popup>
  )
}
