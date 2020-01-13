require('colors');
const BootcampModel = require('./../models/Bootcamp');
const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middlewares/asyncHandler');

const logger = require('./../utils/logger')('Controllers:BootcampsController');
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = asyncHandler(
   async (_req, res) => {
      const bootcamps = await BootcampModel.find();

      res.status(200).json({
         success: true,
         count: bootcamps.length,
         data: bootcamps,
      });
   },
   logger,
   '@getBootcamps() [error: %s]'.red,
);

// @desc Get a single bootcamps by id
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcampById = asyncHandler(
   async (req, res, next) => {
      const bootcamp = await BootcampModel.findById(req.params.id);

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `Bootcamp not found with id of ${req.params.id}`,
               404,
               logger,
               '@getBootcampById() [error: %s]'.red,
            ),
         );
      }

      res.status(200).json({
         success: true,
         data: bootcamp,
      });
   },
   logger,
   '@getBootcampById() [error: %s]'.red,
);

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamp = asyncHandler(
   async (req, res) => {
      const newBootcamp = await BootcampModel.create(req.body);

      res.status(201).json({
         success: true,
         data: newBootcamp,
      });
   },
   logger,
   '@createBootcamp() [error: %s]'.red,
);

// @desc Update a single bootcamp by id
// @route PUT /api/v1/bootcamps/:id
// @access Private
const updateBootcampById = asyncHandler(
   async (req, res, next) => {
      const bootcamp = await BootcampModel.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         },
      );

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `Bootcamp not found with id of ${req.params.id}`,
               404,
               logger,
               '@updateBootcampById() [error: %s]'.red,
            ),
         );
      }

      res.status(200).json({
         success: true,
         data: bootcamp,
      });
   },
   logger,
   '@updateBootcampById() [error: %s]'.red,
);

// @desc Delete a single bootcamp by id
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcampById = asyncHandler(
   async (req, res, next) => {
      const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `Bootcamp not found with id of ${req.params.id}`,
               404,
               logger,
               '@deleteBootcampById() [error: %s]'.red,
            ),
         );
      }

      res.status(200).json({
         success: true,
         data: {},
      });
   },
   logger,
   '@deleteBootcampById() [error: %s]'.red,
);

module.exports = {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
};
