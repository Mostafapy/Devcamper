/* eslint-disable object-curly-newline */
require('colors');
/* Models */
const UserModel = require('./../models/User');

// const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middlewares/asyncHandler');

const logger = require('./../utils/logger')('Controllers:AuthController');

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
const register = asyncHandler(
   async (req, res) => {
      const { name, email, password, role } = req.body;

      // Create new user
      const createdUser = await UserModel.create({
         name,
         email,
         password,
         role,
      });

      res.status(200).json({ success: true, data: createdUser });
   },
   logger,
   '@register() [error: %s]'.red,
);

module.exports = { register };
