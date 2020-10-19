/* eslint-disable object-curly-newline */
require('colors');
/* Models */
const UserModel = require('../models/User');

const asyncHandler = require('../middlewares/asyncHandler');

const setTokenWithOptionsForCookie = require('../helpers/setTokenWithOptionsForCookie');

const logger = require('../utils/logger')('Controllers:AuthController');
const ErrorResponse = require('../utils/errorResponse');

const sendEmail = require('../utils/sendEmail');

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
const register = asyncHandler(
   async (req, res) => {
      const { name, email, password, role } = req.body;

      // Create new user
      await UserModel.create({
         name,
         email,
         password,
         role,
      });

      // Create token
      const token = UserModel.getSignedJwtToken();

      res.status(200).json({ success: true, token });
   },
   logger,
   '@register() [error: %s]'.red,
);

// @desc Login User
// @route POST /api/v1/auth/login
// @access Public
const login = asyncHandler(
   async (req, res, next) => {
      const { email, password } = req.body;

      // Check for email and password
      if (!email && !password) {
         return next(
            new ErrorResponse('please provide an email and password'),
            400,
            logger,
            '@login() [error: please provide an email and password]'.red,
         );
      }

      // Check for user
      const user = await UserModel.findOne({ email }).select('+password');

      if (!user) {
         return next(
            new ErrorResponse('Invalid Credentials'),
            401,
            logger,
            '@login() [error: User is not found]'.red,
         );
      }

      const isMatch = await UserModel.matchPassword(password);

      if (!isMatch) {
         return next(
            new ErrorResponse('Invalid Credentials'),
            401,
            logger,
            '@login() [error: Password provided is not the same in the database]'
               .red,
         );
      }

      // Get token from DB, Create Cookie and Send it in response
      const { token, options } = setTokenWithOptionsForCookie();

      res.status(200)
         .cookie('token', token, options)
         .json({ success: true, token });
   },
   logger,
   '@login() [error: %s]'.red,
);

// @desc Get The Current Login User
// @route GET /api/v1/auth/me
// @access Private

const getMe = asyncHandler(
   async (req, res, next) => {
      // Check for user
      const user = await UserModel.findById(req.user.id);

      if (!user) {
         return next(
            new ErrorResponse('Invalid Credentials'),
            401,
            logger,
            '@getMe() [error: User is not found]'.red,
         );
      }

      res.status(200).json({ success: true, data: user });
   },
   logger,
   '@getMe() [error: %s]'.red,
);

// @desc Forget Password
// @route GET /api/v1/auth/forgetpassword
// @access Private

const forgetPassword = asyncHandler(
   async (req, res, next) => {
      const { email } = req.body;
      // Check for user by email
      const user = await UserModel.findOne({ email });

      if (!user) {
         return next(
            new ErrorResponse('Invalid Credentials'),
            401,
            logger,
            '@forgetPassword() [error: User is not found with that eamil]'.red,
         );
      }

      // Get reset token
      const resetToken = user.getResetPasswordToken();

      await user.save({ validateBeforeSave: false });

      // Create reset url
      const resetURL = `${req.protocol}://${req.get(
         'host',
      )}/api/v1/auth/resetPassword/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n \n ${resetURL}`;

      try {
         await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
         });
      } catch (err) {
         logger.error('@forgetPassword() [error: %s]'.red, err.message);

         user.resetPasswordToken = undefined;
         user.resetPasswordTokenxpire = undefined;

         await user.save({ validateBeforeSave: false });

         return next(
            new ErrorResponse('Email cannot be sent'),
            500,
            logger,
            '@login() [error: Email cannot be sent]'.red,
         );
      }

      res.status(200).json({
         success: true,
         data: { msg: 'message sent successfully' },
      });
   },
   logger,
   '@forgetPassword() [error: %s]'.red,
);

module.exports = { register, login, getMe, forgetPassword };
