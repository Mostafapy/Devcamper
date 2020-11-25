require('colors');
/* Models */
const UserModel = require('../models/User');

const asyncHandler = require('../middlewares/asyncHandler');

const logger = require('../utils/logger')('Controllers:UserController');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all users
// @route GET /api/v1/user/getAllUsers
// @access Private/admin
const getAllUsers = asyncHandler(
   async (req, res) => {
      res.status(200).json({ success: true, data: res.advancedResults });
   },
   logger,
   '@getAllUsers() [error: %s]'.red,
);

// @desc Get Single User
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

module.exports = {
   getAllUsers,
   getMe,
};
