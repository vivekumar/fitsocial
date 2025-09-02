const express = require('express');
const { register, login, resetPassword, socialLogin } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/reset-password', resetPassword);
router.post('/social-login', socialLogin);

module.exports = router;
