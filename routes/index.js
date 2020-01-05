const router = require('express').Router();
const apiRouters = require('express').Router();
const bootcampsRouter = require('./bootcampsRoutes');

// Routes
router.use('/api/v1', apiRouters);
apiRouters.use('/bootcamps', bootcampsRouter);

module.exports = router;
