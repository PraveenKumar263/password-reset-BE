const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

// Register a new user
userRouter.post('/registerUser', userController.registerUser);

// Verify login of a user
userRouter.post('/loginUser', userController.loginUser);

// Forgot password
userRouter.put('/forgotPassword', userController.forgotPassword);

// Reset password
userRouter.put('/resetPassword/:token', userController.resetPassword);

module.exports = userRouter;