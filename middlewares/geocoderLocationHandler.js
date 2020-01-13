const geocoder = require('../utils/geocoder');

const createGeocodeLocation = modelSchema => {
   // eslint-disable-next-line func-names
   modelSchema.pre('save', async function(next) {
      const geocoderGenerator = geocoder()();

      const loc = await geocoderGenerator.geocode(this.address);

      this.location = {
         type: 'Point',
         coordinates: [loc[0].longitude, loc[0].latitude],
         formattedAdress: loc[0].formattedAddress,
         street: loc[0].streetName,
         city: loc[0].city,
         state: loc[0].stateCode,
         zipcode: loc[0].zipcode,
         country: loc[0].countryCode,
      };

      // Do not save address in DB
      this.address = undefined;

      next();
   });
};

module.exports = createGeocodeLocation;
