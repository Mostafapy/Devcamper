// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
const getBootcamps = (_req, res) => {
   res.status(200).json({ success: true, msg: 'Show all the bootcamps' });
};

// @desc Get a single bootcamps by id
// @route GET /api/v1/bootcamps/:id
// @access Public
const getBootcampById = (req, res) => {
   res.status(200).json({
      success: true,
      msg: `Get bootcamp ${req.params.id}`,
   });
};

// @desc Create new bootcamp
// @route POST /api/v1/bootcamps
// @access Private
const createBootcamp = (_req, res) => {
   res.status(200).json({ success: true, msg: 'Create new bootcamp' });
};

// @desc Update a single bootcamp by id
// @route PUT /api/v1/bootcamps/:id
// @access Private
const updateBootcampById = (req, res) => {
   res.status(200).json({
      success: true,
      msg: `Update a bootcamp ${req.params.id}`,
   });
};

// @desc Delete a single bootcamp by id
// @route DELETE /api/v1/bootcamps/:id
// @access Private
const deleteBootcampById = (req, res) => {
   res.status(200).json({
      success: true,
      msg: `Delete a bootcamp ${req.params.id}`,
   });
};

module.exports = {
   getBootcamps,
   getBootcampById,
   createBootcamp,
   updateBootcampById,
   deleteBootcampById,
};
