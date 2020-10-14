const asyncHandler = require("./asyncHandler");

const bootcampOwnership = (bootcamp) => (req, res, next) => {
   if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(
       `User ${req.params.id} is not authorized for this bootcamp`,
       401,
       logger,
       '@bootcampOwnership() [error: %s]'.red,
    ))
   }
};

module.exports = bootcampOwnership;
