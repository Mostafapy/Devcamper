/* Models */
const UserModel = require('./../models/User');

const setTokenWithOptionsForCookie = () => {
   // Create token
   const token = UserModel.getSignedJwtToken();

   const options = {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
   };

   if (process.env.NODE_ENV === 'production') {
      options.secure = true;
   }

   return { token, options };
};

module.exports = setTokenWithOptionsForCookie;
