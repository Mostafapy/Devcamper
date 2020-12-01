const router = require('express').Router();
const apiRouters = require('express').Router();
const bootcampsRouter = require('./bootcampsRoutes');
const coursesRouter = require('./coursesRoutes');
const authRouter = require('./authRoutes');
const usersRouter = require('./usersRoutes');

// Routes
router.use('/api/v1', apiRouters);
apiRouters.use('/bootcamps', bootcampsRouter);
apiRouters.use('/courses', coursesRouter);
apiRouters.use('/auth', authRouter);
apiRouters.use('/users', usersRouter);

module.exports = router;
