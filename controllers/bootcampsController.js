require('colors');
const path = require('path');
const BootcampModel = require('./../models/Bootcamp');
const ErrorResponse = require('./../utils/errorResponse');
const asyncHandler = require('./../middlewares/asyncHandler');
const geocoder = require('./../utils/geocoder');

const logger = require('./../utils/logger')('Controllers:BootcampsController');

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = asyncHandler(
   async (req, res) => {
      // Copy req.query
      const reqQuery = { ...req.query };

      // Fields to exclude
      const removeFields = ['select', 'sort', 'page', 'limit'];

      // Loop over removeFields array and delete them from reqQuery
      // eslint-disable-next-line implicit-arrow-linebreak
      removeFields.forEach(param => delete reqQuery[param]);

      // Create query string
      let queryStr = JSON.stringify(reqQuery);

      // Create operator (gt, gte, etc)
      queryStr = queryStr.replace(
         /\b(gt|gte|lt|lte|in)\b/g,
         // eslint-disable-next-line implicit-arrow-linebreak
         match => `${match}`,
      );

      // Finding resources
      let query = BootcampModel.find(JSON.parse(queryStr)).populate('courses');

      // Select Fields
      if (req.query.select) {
         const fields = req.query.select.split(',').join(' ');
         query = query.select(fields);
      }

      // Sort
      if (req.query.sort) {
         const sortBy = req.query.sort.split(',').join(' ');
         query = query.sort(sortBy);
      } else {
         // Sort by date
         query = query.sort('-createdAt');
      }

      // Pagination
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 25;
      const startIndex = (page - 1) * limit;

      const endIndex = page * limit;

      const total = await BootcampModel.countDocuments();

      query.skip(startIndex).limit(limit);
      // Executing query
      const bootcamps = await query;

      // Pagination result
      const pagination = {};

      if (endIndex > total) {
         pagination.next = {
            page: page + 1,
            limit,
         };
      }
      if (startIndex > 0) {
         pagination.perv = {
            page: page - 1,
            limit,
         };
      }

      res.status(200).json({
         success: true,
         count: bootcamps.length,
         pagination,
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
      const bootcamp = await BootcampModel.findById(req.params.id);

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

      bootcamp.remove();

      res.status(200).json({
         success: true,
         data: {},
      });
   },
   logger,
   '@deleteBootcampById() [error: %s]'.red,
);

// @desc Get bootcamp within radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
const getBootcampsInRadius = asyncHandler(
   async (req, res) => {
      const { zipcode, distance } = req.params;

      // Get lat/lng from geocoder
      const geocoderGenerator = geocoder()();

      const loc = await geocoderGenerator.geocode(zipcode);
      const lat = loc[0].latitude;
      const lng = loc[0].longitude;

      // Caculate radius using radians
      // Divide distance by radius of Earth
      // Earth Radius  = 958.8 mi / 6,371 km
      const radius = distance / 3958.8;

      const bootcamps = await BootcampModel.find({
         location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
      });

      res.status(200).json({
         success: true,
         count: bootcamps.length,
         data: bootcamps,
      });
   },
   logger,
   '@getBootcampsInRadius() [error: %s]'.red,
);

// @desc Upload photo for bootcamp
// @route Put /api/v1/bootcamps/:id/photo
// @access Private
const bootcampPhotoUpload = asyncHandler(
   async (req, res, next) => {
      const bootcamp = await BootcampModel.findById(req.params.id);

      // bootcamp doesn't exist
      if (!bootcamp) {
         return next(
            new ErrorResponse(
               `Bootcamp not found with id of ${req.params.id}`,
               404,
               logger,
               '@bootcampPhotoUpload() [error: %s]'.red,
            ),
         );
      }

      if (!req.files) {
         return next(
            new ErrorResponse(
               'Please upload a file',
               400,
               logger,
               '@bootcampPhotoUpload() [error: %s]'.red,
            ),
         );
      }

      const imageFile = req.files.file;

      // Make sure that the image is a photo
      if (!imageFile.mimetype.startsWith('image')) {
         return next(
            new ErrorResponse(
               'Please upload an image file',
               400,
               logger,
               '@bootcampPhotoUpload() [error: %s]'.red,
            ),
         );
      }

      // Check file size
      if (imageFile.size > process.env.MAX_FILE_UPLOAD_SIZE) {
         return next(
            new ErrorResponse(
               `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD_SIZE}`,
               400,
               logger,
               '@bootcampPhotoUpload() [error: %s]'.red,
            ),
         );
      }

      // Create custom file name
      imageFile.name = `photo_${bootcamp._id}${path.parse(imageFile.name).ext}`;

      imageFile.mv(
         `${process.env.FILE_UPLOAD_PATH}/${imageFile.name}`,
         async err => {
            if (err) {
               return next(
                  new ErrorResponse(
                     'Problem with file upload',
                     500,
                     logger,
                     '@bootcampPhotoUpload() [error: %s]'.red,
                  ),
               );
            }

            await BootcampModel.findByIdAndUpdate(req.params.id, {
               photo: imageFile.name,
            });

            res.status(200).json({
               success: true,
               data: imageFile.name,
            });
         },
      );
   },
   logger,
   '@bootcampPhotoUpload() [error: %s]'.red,
);

module.exports = {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
   getBootcampsInRadius,
   bootcampPhotoUpload,
};
