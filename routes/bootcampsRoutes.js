const express = require('express');
/* DB Model */
const BootcampModel = require('./../models/Bootcamp');

/* Middlewares */
const advancedResults = require('./../middlewares/advancedResults');
const authProtect = require('./../middlewares/authProtect');
const roleAuthorization = require('./../middlewares/roleAuthorization');

/* Controllers */
const {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
   getBootcampsInRadius,
   bootcampPhotoUpload,
} = require('../controllers/bootcampsController');

// Include other resourse routers
const coursesRouter = require('./coursesRoutes');

const router = express.Router();

// Re-route other resourse routers
router.use('/:bootcampId/courses', coursesRouter);

router
   .route('/')
   .get(advancedResults(BootcampModel, 'courses'), getBootcamps)
   .post(authProtect, roleAuthorization('publisher', 'admin'), createBootcamp);

router.route('/:id/photo').put(authProtect, roleAuthorization('publisher', 'admin'), bootcampPhotoUpload);

router
   .route('/:id')
   .get(getBootcampById)
   .put(authProtect, roleAuthorization('publisher', 'admin'), updateBootcampById)
   .delete(authProtect, roleAuthorization('publisher', 'admin'), deleteBootcampById);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
