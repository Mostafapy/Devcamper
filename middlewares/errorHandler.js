const ErrorResposne = require('./../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
   let customError = { ...err };

   customError.message = err.message;

   if (err.name === 'CastError') {
      customError = {};

      const { logger, loggerMessage } = err.loggerObject;

      const message = `Bootcamp not found with id of ${err.value}`;

      customError = new ErrorResposne(message, 404, logger, loggerMessage);
   }

   const { logger, loggerMessage } = customError.loggerObject;

   logger.error(loggerMessage, err.message);

   res.status(customError.statusCode || 500).json({
      success: false,
      error: customError.message || 'Server Error',
   });
};

module.exports = errorHandler;
