const express = require('express');

const courseModel = require('./../models/Course');

const advancedResults = require('./../middlewares/advancedResults');
const authProtect = require('./../middlewares/authProtect');
const roleAuthorization = require('./../middlewares/roleAuthorization');

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
   .post(authProtect, roleAuthorization('publisher', 'admin'), addCourse);

router
   .route('/:id')
   .get(getCourseById)
   .put(authProtect, roleAuthorization('publisher', 'admin'), updateCourseById)
   .delete(
      authProtect,
      roleAuthorization('publisher', 'admin'),
      deleteCourseById,
   );

module.exports = router;
