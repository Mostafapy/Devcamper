require('colors');
const { promisify } = require('util');
const fs = require('fs');

const logger = require('./../utils/logger')('Helpers:ReadJsonFiles');

const readJsonFilesData = async filePath => {
   try {
      const readFile = promisify(fs.readFile);

      const data = await readFile(filePath);

      // parse to JSON
      const jsonData = JSON.parse(data);

      return Promise.resolve(jsonData);
   } catch (err) {
      logger.error('@readJsonFilesData() [error: %s]'.red, err.message);

      return Promise.reject(err);
   }
};

module.exports = readJsonFilesData;
