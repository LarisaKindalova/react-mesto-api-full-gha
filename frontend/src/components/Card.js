import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ 
  card, 
  onCardClick, 
  onCardLike, 
  onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(card => card === currentUser._id);
  const cardLikeButtonClassName = `cards__like ${
    isLiked && "cards__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

    function handleLikeClick() {
      onCardLike(card);
    }

    function handleDeleteClick() {
      onCardDelete(card);
    } 
  
  return (
    <li className="cards__item">
      {isOwn && (
        <button
          className="cards__trash-btn"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="cards__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards_like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Лайк"
          />
          <span className="cards__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
