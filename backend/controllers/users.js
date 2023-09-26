const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthor-err');
const DublicateError = require('../errors/dublicate-err');
const { JWT_SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.returnUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

module.exports.returnCurrentUser = (req, res, next) => {
  console.log(req);
  const { _id } = req.user
  User.findOne({ _id })
    .orFail(new NotFoundError(`Пользователь с таким _id ${req.user._id} не найден`))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {

      return next(req.user);
    });
};

module.exports.returnUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError(`Пользователь с таким _id ${req.params.userId} не найден`))
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DublicateError('Пользователь с таким e-mail уже зарегистрирован'));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неверные логин или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неверные логин или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY, { expiresIn: '7d' });
          return res.cookie('jwt', token, { httpOnly: true })
            .send({ user }).end();
        });
    })
    .catch(next);
};
