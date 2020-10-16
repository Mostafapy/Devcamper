require('colors');
const logger = require('../utils/logger')('Middlewares:CascadeDelete');
/**
 *  Middleware to cascade delete process of relational collections in mongoDB
 * @param {Object} modelSchema
 * @param {String} deletedModelName
 * @param {Object} deletedRequiredField
 */
/* eslint-disable prefer-arrow-callback */
const cascadeDelete = (modelSchema, deletedModelName, deletedRequiredField) => {
   // eslint-disable-next-line func-names
   modelSchema.pre('remove', async function(next) {
      let loggerMessage;

      const deleteOptions = {};

      if (deletedRequiredField === 'bootcamp') {
         loggerMessage = `Courses being removed from bootcamp ${this._id}`.red;
         deleteOptions[deletedRequiredField] = this._id;
      }

      logger.log(loggerMessage);

      await this.model(deletedModelName).deleteMany(deleteOptions);
      next();
   });
};

module.exports = cascadeDelete;
