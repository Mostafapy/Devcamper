const asyncHandler = require("./asyncHandler");

const bootcampOwnership = (bootcamp) => (req, res, next) => {
   if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(
       `User ${req.params.id} is not authorized to update this bootcamp`,
       401,
       logger,
       '@updateBootcampById() [error: %s]'.red,
    ))
   }
};

module.exports = bootcampOwnership;
