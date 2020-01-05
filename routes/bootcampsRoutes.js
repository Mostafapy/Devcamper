const express = require('express');

const router = express.Router();

const {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
} = require('../controllers/bootcampsController');

router
   .route('/')
   .get(getBootcamps)
   .post(createBootcamp);

router
   .route('/:id')
   .get(getBootcampById)
   .put(updateBootcampById)
   .delete(deleteBootcampById);

module.exports = router;
