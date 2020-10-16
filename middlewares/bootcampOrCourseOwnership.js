/* eslint-disable prettier/prettier */
const ErrorResponse = require('../utils/errorResponse');

const logger = require('../utils/logger')(
   'Middlewares:BootcampOrCourseOwnership',
);

// eslint-disable-next-line implicit-arrow-linebreak
const bootcampOrCourseOwnership = bootcampOrCourse => (req, res, next) => {
   if (
      // eslint-disable-next-line operator-linebreak
      bootcampOrCourse.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
   ) {
      return next(
         new ErrorResponse(
            `User ${req.user.id} is not authorized for this bootcamp`,
            401,
            logger,
            '@bootcampOrCourseOwnership() [error: %s]'.red,
         ),
      );
   }
};

module.exports = bootcampOrCourseOwnership;
