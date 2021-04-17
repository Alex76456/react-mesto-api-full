const router = require('express').Router();

const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  patchUser,
  patchUserAvatar,
  getMe,
} = require('../controllers/users');

const validateId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUserPatch = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((url) => {
      if (!validator.isURL(url)) {
        throw new CelebrateError('Неверный URL');
      }
      return url;
    }),
  }),
});

router.use(auth);
router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', validateId, getUserById);
router.patch('/me', validateUserPatch, patchUser);
router.patch('/me/avatar', validateUserAvatar, patchUserAvatar);

module.exports = router;
