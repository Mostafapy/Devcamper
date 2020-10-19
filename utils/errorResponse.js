/* eslint-disable space-before-function-paren */
class ErrorResponse extends Error {
   constructor(message, statusCode, logger, loggerMessage) {
      super(message);
      this.statusCode = statusCode;
      this.loggerObject = {
         logger,
         loggerMessage,
      };
   }
}

module.exports = ErrorResponse;
