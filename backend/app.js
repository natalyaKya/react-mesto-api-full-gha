console.dir(err)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  login,
  createUser,
} = require('./controllers/users');
const { validationLogin, validationCreateUser } = require('./middlewares/validation');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(cors({ origin: ['http://localhost:3000', 'https://mesto.natalyakya.nomoredomainsrocks.ru', 'http://mesto.natalyakya.nomoredomainsrocks.ru'], credentials: true }));
app.use(
  rateLimit({
    windowMs: 40 * 60 * 1000,
    max: 70,
    message: 'Too many requests',
  }),
);
app.use(helmet());
app.use(express.json());


app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(cookieParser());
app.use(auth);
app.use('/users', routerUser);
app.use('/cards', routerCard);
app.use(errorLogger);
app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => { });
