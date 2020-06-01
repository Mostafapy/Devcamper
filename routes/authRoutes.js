const express = require('express');

/** Controllers */
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', getMe);

module.exports = router;
