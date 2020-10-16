const express = require('express');

const authProtect = require('../middlewares/authProtect');

/** Controllers */
const {
   register,
   login,
   getMe,
   forgetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', authProtect, getMe);

router.post('/forgetPassword', forgetPassword);

module.exports = router;
