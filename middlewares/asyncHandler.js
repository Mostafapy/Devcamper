// eslint-disable-next-line implicit-arrow-linebreak
const asyncHandler = (fn, logger, loggerMessage) => (req, res, next) =>
   Promise.resolve(fn(req, res, next)).catch(err => {
      err.loggerObject = { logger, loggerMessage };

      next(err);
   });

module.exports = asyncHandler;
