const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const logger = require('./utils/logger')('Server');

// Routes
const routes = require('./routes/index');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(bodyParser.json());

app.use(
   bodyParser.urlencoded({
      extended: false,
   }),
);

morgan((tokens, req, res) =>
   [
      `<${process.env.NODE_ENV}>`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
   ].join(' '),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', ex => {
   logger.error(ex.message, ex);
   app.use((_req, res) => {
      res.status(500).json({
         err: null,
         msg: '500 Internet Error',
         data: null,
      });
   });
   process.exit(1);
});

// Mount the routes
app.use(routes);
// Port
const port = process.env.PORT || '3000';

// Listen
app.listen(port, () => {
   logger.log(`App Listen Successfully To Port ${port}`);
});
