var express = require('express'),
    bootstrapMiddleware = require('./bootstrap/middleware'),
    bootstrapRoutes = require('./bootstrap/routes'),
    bootstrapError = require('./bootstrap/error');

var app = express();

// ! sequence is important
bootstrapMiddleware(app);
bootstrapRoutes(app);
bootstrapError(app);

module.exports = app;
