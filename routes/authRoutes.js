const express = require('express');

const authProtect = require('../middlewares/authProtect');

/** Controllers */
const {
   register,
   login,
   getMe,
   forgetPassword,
   resetPassword,
   updateUserDetails,
   updatePassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', authProtect, getMe);

router.post('/forgetPassword', forgetPassword);

router.put('/resetPassword:resetToken', resetPassword);

router.put('/updateUserDetails', authProtect, updateUserDetails);

router.put('/updatePassword', authProtect, updatePassword);

module.exports = router;
