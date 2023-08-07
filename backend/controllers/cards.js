const Card = require('../models/card');
const { CREATE } = require('../utils/constants');
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');
const { BadRequest } = require('../errors/bad_request');
const { NotFound } = require('../errors/not_found');
const { ForbiddenError } = require('../errors/forbidden_err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(CREATE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданны некорретные даные при создании пользователя'));
      }
      return next(err);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res, next) => {
  // const { cardId } = req.params.cardId;
  Card.findById(req.params.cardId)
    .orFail(new NotFound('Карточка  с указаным id не найдена'))
    .then((card) => {
      if (String(card.owner) !== req.user._id) {
        console.log(card.owner, req.user._id);
        return Promise.reject(new ForbiddenError('Не возможно удалить чужую карточку'));
      }
      return Card.deleteOne(card)
        .then(() => res.send(card));
    })
    .catch(next);
};

module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log('не нашли');
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Карточка с указаным id не найдена'));
      }
      return next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        console.log('не нашли');
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Карточка  с указаным id не найдена'));
      }
      return next(err);
    });
};
