const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');

const { createUser, login } = require('../controllers/users');

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateUserSignup, createUser);
router.post('/signin', validateUserLogin, login);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
