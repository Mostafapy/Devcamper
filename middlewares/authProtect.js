require('colors');
const jwt = require('jsonwebtoken');

const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const UserModel = require('../models/User');

const logger = require('../utils/logger')('Middlewares:AuthProtect');

const authProtect = asyncHandler(
   async (req, res, next) => {
      let token;

      if (
         // eslint-disable-next-line operator-linebreak
         req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
      ) {
         token = req.headers.authorization.split(' ')[1];
      } // else if (req.cookies) {
      //      const cookiesToken = req.cookies.token;
      //      token = cookiesToken;
      //   }

      // Make sure token exists
      if (!token) {
         return next(
            new ErrorResponse('Not authorized for that route'),
            401,
            logger,
            '@authProtect() [error: Token does not exist]'.red,
         );
      }

      try {
         // Verify token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         logger.log(`decodedToken: ${decoded}`);

         req.user = await UserModel.findById(decoded.id);

         next();
      } catch (err) {
         return next(
            new ErrorResponse('Not authorized for that route'),
            401,
            logger,
            '@authProtect() [error: %s]'.red,
         );
      }
   },
   logger,
   '@authProtect() [error: %s]'.red,
);

module.exports = authProtect;
