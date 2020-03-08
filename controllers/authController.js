require('colors');
/* Models */
// const UserModel = require('./../models/User');

// const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middlewares/asyncHandler');

// const logger = require('./../utils/logger')('Controllers:AuthController');

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public
const register = asyncHandler(async (_req, res) => {
   res.status(200).json({ success: true });
});

module.exports = { register };
