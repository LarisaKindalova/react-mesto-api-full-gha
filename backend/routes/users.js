const userRouter = require('express').Router();
const {
  getUsers, getUserById, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateAvatar, validationGetUserId } = require('../middlewares/validate');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUpdateUser, updateUserInfo);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);
userRouter.get('/:userId', validationGetUserId, getUserById);

module.exports = userRouter;
