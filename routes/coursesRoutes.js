const express = require('express');

const courseModel = require('./../models/Course');

const advancedResults = require('./../middlewares/advancedResults');

const router = express.Router({ mergeParams: true });

const {
   getCourses,
   getCourseById,
   addCourse,
   updateCourseById,
   deleteCourseById,
} = require('../controllers/coursesController');

router
   .route('/')
   .get(
      advancedResults(courseModel, {
         path: 'bootcamp',
         select: 'name description',
      }),
      getCourses,
   )
   .post(addCourse);

router
   .route('/:id')
   .get(getCourseById)
   .put(updateCourseById)
   .delete(deleteCourseById);

module.exports = router;
