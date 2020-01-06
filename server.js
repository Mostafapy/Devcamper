const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const logger = require('./utils/logger')('Server');

// DB
const connectDB = require('./config/db');

// Routes
const routes = require('./routes/index');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to MongoDB
connectDB();

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

// Mount the routes
app.use(routes);
// Port
const port = process.env.PORT || '3000';

// Listen
const server = app.listen(port, () =>
   logger.log(`App Listen Successfully To Port ${port}`),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', ex => {
   logger.error(ex.message, ex);
   app.use((_req, res) => {
      res.status(500).json({
         err: true,
         msg: '500 Internet Error',
         data: null,
      });
   });

   // eslint-disable-next-line implicit-arrow-linebreak
   server.close(() => process.exit(1));
});
