/* eslint-disable arrow-body-style */
const ErrorResponse = require('../utils/errorResponse');

const logger = require('../utils/logger')('Middlewares:RoleAuthorization');

const roleAuthorization = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(res.user.role)) {
         return next(
            new ErrorResponse(
               `User role ${res.user.role} is Not authorized for that route`,
            ),
            403,
            logger,
            '@roleAuthorization() [error: role is not authorized]'.red,
         );
      }
      next();
   };
};

module.exports = roleAuthorization;
