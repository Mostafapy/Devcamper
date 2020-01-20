require('colors');
/* Models */
const CourseModel = require('./../models/Course');
const BootcampModel = require('../models/Bootcamp');

const ErrorResponse = require('./../utils/errorResponse');
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
         query = CourseModel.find().populate({
            path: 'bootcamp',
            select: 'name description',
         });
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

// @desc Get a single course by Id
// @route GET /api/v1/courses/:id
// @access Public
const getCourseById = asyncHandler(
   async (req, res, next) => {
      const course = CourseModel.findById(req.params.id).populate({
         path: 'bootcamp',
         select: 'name description',
      });

      // course doesn't exist
      if (!course) {
         return next(
            new ErrorResponse(
               `course not found with id of ${req.params.id}`,
               404,
               logger,
               '@getCourseById() [error: %s]'.red,
            ),
         );
      }

      res.status(200).json({
         success: true,
         data: course,
      });
   },
   logger,
   '@getCourses() [error: %s]'.red,
);

// @desc Add new course
// @route POST /api/v1/bootcamps/:bootcampId/courses
// @access Private
const addCourse = asyncHandler(
   async (req, res, next) => {
      req.body.bootcamp = req.params.bootcampId;

      const bootcamp = BootcampModel.findById(req.params.bootcampId);

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `bootcamp not found with id of ${req.params.bootcampId}`,
               404,
               logger,
               '@addCourse() [error: %s]'.red,
            ),
         );
      }

      const newCourse = await CourseModel.create(req.body);

      res.status(201).json({
         success: true,
         data: newCourse,
      });
   },
   logger,
   '@createBootcamp() [error: %s]'.red,
);

// @desc Update course by id
// @route PUT /api/v1/courses/:id
// @access Private
const updateCourseById = asyncHandler(
   async (req, res, next) => {
      let course = CourseModel.findById(req.params.id);

      // bootcamp doesn't exist
      if (!course) {
         return next(
            new ErrorResponse(
               `course not found with id of ${req.params.id}`,
               404,
               logger,
               '@updateCourseById() [error: %s]'.red,
            ),
         );
      }

      course = await CourseModel.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });

      res.status(200).json({
         success: true,
         data: course,
      });
   },
   logger,
   '@updateCourseById() [error: %s]'.red,
);

// @desc Delete course by id
// @route PUT /api/v1/courses/:id
// @access Private
const deleteCourseById = asyncHandler(
   async (req, res, next) => {
      const course = CourseModel.findById(req.params.id);

      // bootcamp doesn't exist
      if (!course) {
         return next(
            new ErrorResponse(
               `course not found with id of ${req.params.id}`,
               404,
               logger,
               '@deleteCourseById() [error: %s]'.red,
            ),
         );
      }

      await course.remove();

      res.status(200).json({
         success: true,
         data: course,
      });
   },
   logger,
   '@deleteCourseById() [error: %s]'.red,
);

module.exports = {
   getCourses,
   getCourseById,
   addCourse,
   updateCourseById,
   deleteCourseById,
};
