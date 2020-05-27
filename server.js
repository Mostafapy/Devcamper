require('colors');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const logger = require('./utils/logger')('Server');

// DB
const connectDB = require('./config/db');

// Routes
const routes = require('./routes/index');

// Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to MongoDB
connectDB();

const app = express();

app.use(express.json());

// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
   app.use(
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
      ),
   );
}

// File Upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount the routes
app.use(routes);

// Error Handler
app.use(errorHandler);

// Port
const port = process.env.PORT || '3000';

// Listen
const server = app.listen(port, () =>
   logger.log(`App Listen Successfully To Port ${port}`.yellow.bold),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', ex => {
   logger.error(`${ex.message}`.red, ex);
   app.use((_req, res) => {
      res.status(500).json({
         success: false,
         msg: '500 Internet Error',
         data: null,
      });
   });

   // eslint-disable-next-line implicit-arrow-linebreak
   server.close(() => process.exit(1));
});
