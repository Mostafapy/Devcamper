const express = require('express');

const {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
   getBootcampsInRadius,
} = require('../controllers/bootcampsController');

// Include other resourse routers
const coursesRouter = require('./coursesRoutes');

const router = express.Router();

// Re-route other resourse routers
router.use('/:bootcampId/courses', coursesRouter);

router
   .route('/')
   .get(getBootcamps)
   .post(createBootcamp);

router
   .route('/:id')
   .get(getBootcampById)
   .put(updateBootcampById)
   .delete(deleteBootcampById);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
