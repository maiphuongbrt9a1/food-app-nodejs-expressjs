const express = require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const {
  getAllUserController,
  getUserByIdController,
  updateUserProfileController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require('../controllers/userControllers');

const router = express.Router();
// routers
// getAllUser
router.get('/getAllUser', authMiddleware, getAllUserController);

// getUserById
router.get('/:id', authMiddleware, getUserByIdController);

// updateProfile
router.patch('/updateUser', authMiddleware, updateUserProfileController);

// passwordUpdate
router.post('/updatePassword', authMiddleware, updatePasswordController);

// reset password
router.post('/resetPassword', authMiddleware, resetPasswordController);

// delete user
router.delete('/:id', authMiddleware, deleteUserController);

module.exports = router;
