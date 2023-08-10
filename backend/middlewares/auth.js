const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log(payload);
  } catch (err) {
    return next(new Unauthorized('Пользователь не авторизирован'));
  }
  req.user = payload;
  return next();
};
