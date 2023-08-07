const cardRouter = require('express').Router();
const {
  createCard, getCards, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validate');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.put('/:cardId/likes', validateCardId, putCardLike);
cardRouter.delete('/:cardId/likes', validateCardId, deleteCardLike);

module.exports = cardRouter;
