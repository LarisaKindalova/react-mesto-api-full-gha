require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000, MONGO_DB } = process.env;

const rateLimit = require('express-rate-limit'); // Для защиты от DoS-атак //https://www.npmjs.com/package/express-rate-limit
const helmet = require('helmet'); // https://expressjs.com/ru/advanced/best-practice-security.html
const { requestLogger, errortLogger } = require('./middlewares/logger');
const errorResponse = require('./middlewares/errorResponse');

const router = require('./routes');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://kind.nomoreparties.co'], credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger); // подклчаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

mongoose.connect(MONGO_DB)
  .then(() => { console.log('БД подключена'); })
  .catch(() => { console.log('Не удалось подключится к БД'); });

app.use(errortLogger); // полключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorResponse); // Централизованная обработка ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
