const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const BootcampModel = require('../models/Bootcamp');

const logger = require('../utils/logger')(
   'Middlewares:CheckUserRoleForPublishingBootcamp',
);

const checkUserRoleForPublishingBootcamp = asyncHandler(
   async (req, res, next) => {
      try {
         // Check for published bootcamp
         const publishedBootcamp = await BootcampModel.findOne({
            user: req.body.user,
         });

         // If the user is not admin, they can only add one bootcamp
         if (publishedBootcamp && req.user.role !== 'admin') {
            return next(
               new ErrorResponse(
                  `The user with ID ${req.user.id} has already published a bootcamp`,
                  400,
                  logger,
                  '@checkUserRoleForPublishingBootcamp() [error: %s]'.red,
               ),
            );
         }
      } catch (err) {
         return next(
            new ErrorResponse('Checking User role failed'),
            401,
            logger,
            `@checkUserRoleForPublishingBootcamp() [error: ${err.stack}]`.red,
         );
      }
   },
   logger,
   '@checkUserRoleForPublishingBootcamp() [error: %s]'.red,
);

module.exports = checkUserRoleForPublishingBootcamp;
