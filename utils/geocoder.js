const NodeGeocoder = require('node-geocoder');

// eslint-disable-next-line implicit-arrow-linebreak
const geocoder = () => () => {
   const options = {
      provider: process.env.GEOCODER_PROVIDER,
      httpAdapter: 'https',
      apiKey: process.env.GEOCODER_API_KEY,
      formatter: null,
   };

   const nodeGeocoder = NodeGeocoder(options);

   return nodeGeocoder;
};
module.exports = geocoder;
