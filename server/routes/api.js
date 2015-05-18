var express = require('express'),
    apiRouter = express.Router();

apiRouter.use('/projects', require('./api/projects'));

module.exports = apiRouter;