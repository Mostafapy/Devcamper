require('colors');
const CourseModel = require('./../models/Course');
// const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middlewares/asyncHandler');

const logger = require('./../utils/logger')('Controllers:CoursesController');

// @desc Get courses
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @access Public
const getCourses = asyncHandler(
   async (req, res) => {
      const { bootcampId } = req.params;
      let query;

      if (bootcampId) {
         query = CourseModel.find({ bootcamp: bootcampId });
      } else {
         query = CourseModel.find();
      }

      const foundCourses = await query;

      res.status(200).json({
         success: true,
         count: foundCourses.length,
         data: foundCourses,
      });
   },
   logger,
   '@getCourses() [error: %s]'.red,
);

module.exports = {
   getCourses,
};
