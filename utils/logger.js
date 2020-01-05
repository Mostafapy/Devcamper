const utils = require('util');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const customFormat = printf(({ message, moduleName, timestamp }) => {
  return `${timestamp} [${moduleName}] [${process.env.NODE_ENV}]: ${message}`;
});


const winstonLogger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    customFormat,
  ),
});



if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(new transports.Console());
}

if (process.env.NODE_ENV === 'production') {
  winstonLogger.add(
    new transports.File({ filename: 'error.log', level: 'error' }),
  );
  winstonLogger.add(
    new transports.File({ filename: 'out.log', level: 'info' }),
  );
}

module.exports = moduleName => {
  const childLogger = winstonLogger.child({ moduleName });
  const logger = {};

  // LOG
  logger.log = message => {
    childLogger.info(message);
  };

  // ERROR
  logger.error = (message, object = null) => {
    if (object) {
      childLogger.error(
        util.formatWithOptions({ colors: true }, `${message} %O`, object),
      );
    } else {
      childLogger.error(message);
    }
  };

  return logger;
};
