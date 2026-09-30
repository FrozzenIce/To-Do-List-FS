const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const authController = require('../controller/authController');

router.post('/register', validationMiddleware.validateRegister, authController.register);
router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getMe);
router.put('/me', authMiddleware, validationMiddleware.validateUserUpdate, authController.editUserDetails);
router.put('/change-password', authMiddleware, validationMiddleware.validatePasswordChange, authController.changePassword);
router.delete('/me', authMiddleware, authController.deleteUser);

module.exports = router;