/* eslint-disable prefer-arrow-callback */
const bcrypt = require('bcrypt');

/**
 * Middleware to Encrypt user password before saving it in the DB
 * @param {Object} modelSchema
 */
const encryptPassword = modelSchema => {
   // eslint-disable-next-line func-names
   modelSchema.pre('save', async function(next) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   });
};

module.exports = encryptPassword;
