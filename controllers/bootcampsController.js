const BootcampModel = require('./../models/Bootcamp');
const ErrorResponse = require('./../utils/errorResponse');
const logger = require('./../utils/logger')('Controllers:BootcampsController');
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = async (_req, res) => {
   try {
      const bootcamps = await BootcampModel.find();

      res.status(200).json({
         success: true,
         count: bootcamps.length,
         data: bootcamps,
      });
   } catch (err) {
      logger.error('@getBootcamps() [error: %0]'.red, err.message);

      res.status(400).json({
         success: false,
      });
   }
};

// @desc Get a single bootcamps by id
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcampById = async (req, res, next) => {
   try {
      const bootcamp = await BootcampModel.findById(req.params.id);

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `Bootcamp not found with id of ${req.params.id}`,
               404,
               logger,
               '@getBootcampById',
            ),
         );
      }

      res.status(200).json({
         success: true,
         data: bootcamp,
      });
   } catch (err) {
      err.loggerObject = {
         logger,
         loggerMessage: 'getBootcampById() [error: %0]'.red,
      };

      next(err);
   }
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamp = async (req, res) => {
   try {
      const newBootcamp = await BootcampModel.create(req.body);

      res.status(201).json({
         success: true,
         data: newBootcamp,
      });
   } catch (err) {
      logger.error('@createBootcamp() [error: %0]'.red, err.message);

      res.status(400).json({
         success: false,
      });
   }
};

// @desc Update a single bootcamp by id
// @route PUT /api/v1/bootcamps/:id
// @access Private
const updateBootcampById = async (req, res) => {
   try {
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
         res.status(400).json({
            success: false,
         });
      }

      res.status(200).json({
         success: true,
         data: bootcamp,
      });
   } catch (err) {
      logger.error('@updateBootcampById() [error: %0]'.red, err.message);

      res.status(400).json({
         success: false,
      });
   }
};

// @desc Delete a single bootcamp by id
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcampById = async (req, res) => {
   try {
      const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

      // bootcamp doesn't exist
      if (!bootcamp) {
         res.status(400).json({
            success: false,
         });
      }

      res.status(200).json({
         success: true,
         data: {},
      });
   } catch (err) {
      logger.error('@deleteBootcampById() [error: %0]'.red, err.message);

      res.status(400).json({
         success: false,
      });
   }
};

module.exports = {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
};
