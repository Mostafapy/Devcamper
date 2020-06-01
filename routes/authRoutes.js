const express = require('express');

const authProtect = require('./../middlewares/authProtect');

/** Controllers */
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', authProtect, getMe);

module.exports = router;
