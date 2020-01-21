const express = require('express');
/* DB Model */
const BootcampModel = require('./../models/Bootcamp');

/* Middlewares */
const advancedResults = require('./../middlewares/advancedResults');

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
   .post(createBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
   .route('/:id')
   .get(getBootcampById)
   .put(updateBootcampById)
   .delete(deleteBootcampById);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
