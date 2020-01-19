/**
 * Helper function to reverse populate fields within the virtuals of a collection in mongoDB
 * @param {Object} modelSchema
 * @param {String} reverseModel
 * @param {String} refSchema
 * @param {String} foreignFieldKey
 * @param {Object} opt Optional field set by default to null
 */
const reversePopulateWithVirtuals = (
   modelSchema,
   reverseModel,
   refSchema,
   foreignFieldKey,
   opt = null,
) => {
   const options = {
      ref: refSchema,
      localField: '_id',
      foreignField: foreignFieldKey,
   };
   if (opt) {
      const finalOptions = { ...options, ...opt };

      modelSchema.virtual(reverseModel, finalOptions);
   } else {
      modelSchema.virtual(reverseModel, options);
   }
};

module.exports = reversePopulateWithVirtuals;
