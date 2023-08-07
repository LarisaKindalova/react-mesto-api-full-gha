const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATE } = require('../utils/constants');
const { BadRequest } = require('../errors/bad_request');
const { NotFound } = require('../errors/not_found');
const { ConflictError } = require('../errors/conflict_err');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATE).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с такой почтой уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданны некорретные даные при создании пользователя'));
      }
      return next(err);
    });
};

// аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      console.log(token);
      // прикрепляем к cookie
      res.cookie('jwt', token, {
        maxAge: '360000', // 7 дней
        httpOnly: true, // доступ к cookie в рамках http запроса
        sameSite: true,
      }).send({
        _id: token,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Пользователь с указанным id не найден'));
      }
      return next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданны некорретные даные при обновлении данных пользователя'));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Пользователь с указанным id не найден'));
      }
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданны некорретные даные при обновлении аватара'));
      } if (err.name === 'DocumentNotFoundError') {
        return next(new NotFound('Пользователь с указанным id не найден'));
      }
      return next(err);
    });
};

module.exports.logOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Exit' });
};
