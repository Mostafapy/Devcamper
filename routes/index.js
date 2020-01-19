const router = require('express').Router();
const apiRouters = require('express').Router();
const bootcampsRouter = require('./bootcampsRoutes');
const coursesRouter = require('./coursesRoutes');

// Routes
router.use('/api/v1', apiRouters);
apiRouters.use('/bootcamps', bootcampsRouter);
apiRouters.use('/courses', coursesRouter);

module.exports = router;
