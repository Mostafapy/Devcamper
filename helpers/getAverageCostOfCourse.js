require('colors');

const logger = require('../utils/logger')('Helpers:GetAverageCostOfCourse');

// eslint-disable-next-line func-names
module.exports = async function(bootcampId) {
   try {
      logger.log('Calculating avg cost ........'.blue);

      const obj = await this.aggregate([
         {
            $match: { bootcamp: bootcampId },
         },
         {
            $group: {
               _id: '$bootcamp',
               averageCost: { $avg: '$tuition' },
            },
         },
      ]);

      return Promise.resolve(obj);
   } catch (err) {
      logger.error('[error: %s]'.red, err.message);
   }
};
