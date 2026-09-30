const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controller/authController');

router.post('/register', authController.createUser);
router.put('/login', authController.login);

router.get('/me', authMiddleware, authController.getMe);
router.put('/me', authMiddleware, authController.editUserDetails);
router.put('/change-password', authMiddleware, authController.changePassword);
router.delete('/me', authMiddleware, authController.deleteUser);

module.exports = router;