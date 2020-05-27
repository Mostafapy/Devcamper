/* eslint-disable object-curly-newline */
require('colors');
/* Models */
const UserModel = require('./../models/User');

const asyncHandler = require('./../middlewares/asyncHandler');

const setTokenWithOptionsForCookie = require('./../helpers/setTokenWithOptionsForCookie');

const logger = require('./../utils/logger')('Controllers:AuthController');
const ErrorResponse = require('./../utils/errorResponse');

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

      // Get token fron DB, Create Cookie and Send it in response
      const { token, options } = setTokenWithOptionsForCookie();

      res.status(200)
         .cookie('token', token, options)
         .json({ success: true, token });
   },
   logger,
   '@login() [error: %s]'.red,
);

module.exports = { register, login };
