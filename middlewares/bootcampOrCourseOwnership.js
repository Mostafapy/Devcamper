const asyncHandler = require("./asyncHandler");

const bootcampOrCourseOwnership = (bootcampOrCourse) => (req, res, next) => {
   if (bootcampOrCourse.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(
       `User ${req.user.id} is not authorized for this bootcamp`,
       401,
       logger,
       '@bootcampOrCourseOwnership() [error: %s]'.red,
    ))
   }
};

module.exports = bootcampOrCourseOwnership;
