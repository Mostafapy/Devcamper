const ErrorResponse = require('./../utils/errorResponse');
/**
 * Middleware to handle errors of Asynchronous
 * @param err
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
   let customError = { ...err };

   customError.message = err.message;

   // Mongoose bad ObjectId
   if (err.name === 'CastError') {
      customError = {};

      const { logger, loggerMessage } = err.loggerObject;

      const message = `Bootcamp not found with id of ${err.value}`;

      customError = new ErrorResponse(message, 404, logger, loggerMessage);
   }

   // Mongoose Duplicate Key Error
   if (err.code === 11000) {
      customError = {};

      const { logger, loggerMessage } = err.loggerObject;

      const message = 'Duplicate field value entered';

      customError = new ErrorResponse(message, 400, logger, loggerMessage);
   }

   // Mongoose Validation error
   if (err.name === 'ValidationError') {
      customError = {};

      const { logger, loggerMessage } = err.loggerObject;

      // eslint-disable-next-line implicit-arrow-linebreak
      const message = Object.values(err.errors).map(val => val.message);

      customError = new ErrorResponse(message, 400, logger, loggerMessage);
   }

   const { logger, loggerMessage } = customError.loggerObject;

   logger.error(loggerMessage, err.message);

   res.status(customError.statusCode || 500).json({
      success: false,
      error: customError.message || 'Server Error',
   });
};

module.exports = errorHandler;
