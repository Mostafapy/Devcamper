/* eslint-disable implicit-arrow-linebreak */
const mongoose = require('mongoose');

/**
 * Helper Function to establish a connection to mongo DB
 * @returns {Promise || Error}
 */
const mongooseConnection = () =>
   new Promise((resolve, reject) => {
      mongoose
         .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
         })
         .then(resolve)
         .catch(err => reject(err));
   });

module.exports = mongooseConnection;
