var express = require('express'),
    apiRouter = express.Router(),
    resourceApiRouter = express.Router(),
    passport = require('passport');

resourceApiRouter.use(passport.authenticate('bearer', {session: false}));
resourceApiRouter.use('/projects', require('./projects'));
resourceApiRouter.use('/users', require('./users'));
resourceApiRouter.use('/tasks', require('./tasks'));

apiRouter.use('/auth', require('./auth'));
apiRouter.use(resourceApiRouter);

module.exports = apiRouter;
