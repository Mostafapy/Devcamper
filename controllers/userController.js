require('colors');
/* Models */
const UserModel = require('../models/User');

const asyncHandler = require('../middlewares/asyncHandler');

const logger = require('../utils/logger')('Controllers:UserController');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all users
// @route GET /api/v1/users
// @access Private/admin
const getAllUsers = asyncHandler(
   async (req, res) => {
      res.status(200).json({ success: true, data: res.advancedResults });
   },
   logger,
   '@getAllUsers() [error: %s]'.red,
);

// @desc Get Single User
// @route GET /api/v1/users/:id
// @access Private
const getUser = asyncHandler(
   async (req, res, next) => {
      // Check for user
      const user = await UserModel.findById(req.params.id);

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
   '@getUser() [error: %s]'.red,
);

// @desc Create User
// @route POST /api/v1/users
// @access Private
const createUser = asyncHandler(
   async (req, res) => {
      // Create user
      const user = await UserModel.create(req.body);
      res.status(200).json({ success: true, data: user });
   },
   logger,
   '@createUser() [error: %s]'.red,
);

// @desc Update User
// @route PUT /api/v1/users/:id
// @access Private
const updateUser = asyncHandler(
   async (req, res) => {
      // Update user
      const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });

      res.status(200).json({ success: true, data: user });
   },
   logger,
   '@updateUser() [error: %s]'.red,
);

// @desc Delete User
// @route DELETE /api/v1/users/:id
// @access Private
const deleteUser = asyncHandler(
   async (req, res) => {
      // Delete user
      await UserModel.findByIdAndDelete(req.params.id);

      res.status(200).json({ success: true, data: null });
   },
   logger,
   '@updateUser() [error: %s]'.red,
);

module.exports = {
   getAllUsers,
   getUser,
   createUser,
   updateUser,
   deleteUser,
};
